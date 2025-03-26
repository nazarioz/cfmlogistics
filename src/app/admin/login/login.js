'use client';
import { useState } from 'react';
import { firebase } from '../../../base'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';
import PasswordChange from '@/components/admin/password-change';
import { Modal, Form, Input } from 'antd';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [resetModalVisible, setResetModalVisible] = useState(false);
    const [resetForm] = Form.useForm();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = firebase.auth();
        const db = firebase.firestore();
        setIsLoading(true);
        setError('');
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'users', user.user.uid));
            const userData = userDoc.data();
            
            if ((userData.role === 'admin' || userData.role === 'member') && userData.active === true) {
                sessionStorage.setItem('user', JSON.stringify(userData));
                
                if (userData.needsPasswordChange) {
                    setShowPasswordChange(true);
                } else {
                    router.push('/admin');
                }
            } else {
                setError('Você não tem permissão para acessar esta área');
            }
        } catch (error) {
            setError('Credenciais inválidas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (values) => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();
            const auth = firebase.auth();

            // Verificar se o email existe e tem permissão
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', values.email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error('Email não encontrado no sistema');
                return;
            }

            const userData = querySnapshot.docs[0].data();
            if ((userData.role !== 'admin' && userData.role !== 'member') || userData.active === false) {
                toast.error('Este email não tem permissão para acessar o sistema');
                return;
            }

            // Enviar email de redefinição
            await sendPasswordResetEmail(auth, values.email);
            toast.success('Email de redefinição enviado com sucesso!');
            setResetModalVisible(false);
            resetForm.resetFields();
        } catch (error) {
            console.error('Erro ao resetar senha:', error);
            toast.error('Erro ao enviar email de redefinição');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChangeComplete = () => {
        router.push('/admin');
    };

    if (showPasswordChange) {
        return <PasswordChange onComplete={handlePasswordChangeComplete} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Image
                        src={logo}
                        alt="CFML Logo"
                        width={150}
                        height={50}
                        className="h-12 w-auto"
                    />
                </div>
                <h1 className="text-2xl font-semibold text-center text-[#646464] mb-8">
                    Bem-vindo à Área Privada
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#646464]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#646464]"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setResetModalVisible(true)}
                            className="text-sm text-[#646464] hover:underline"
                        >
                            Esqueceu sua senha?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#646464] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {/* Modal de Reset de Senha */}
                <Modal
                    title="Recuperar Senha"
                    open={resetModalVisible}
                    onCancel={() => {
                        setResetModalVisible(false);
                        resetForm.resetFields();
                    }}
                    footer={null}
                    centered
                >
                    <Form
                        form={resetForm}
                        onFinish={handleResetPassword}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Por favor insira seu email' },
                                { type: 'email', message: 'Email inválido' }
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setResetModalVisible(false);
                                    resetForm.resetFields();
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#646464] hover:bg-opacity-90 disabled:opacity-50"
                            >
                                {isLoading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
} 