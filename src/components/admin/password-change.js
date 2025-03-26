'use client';
import { useState } from 'react';
import { firebase } from '@/base';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';

export default function PasswordChange({ onComplete, onCancel }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Se tiver onCancel, significa que está sendo usado como modal
    const isModal = Boolean(onCancel);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        setIsLoading(true);

        try {
            const auth = firebase.auth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            await updatePassword(user, newPassword);

            // Atualizar o flag needsPasswordChange no Firestore
            const db = firebase.firestore();
            await db.collection('users').doc(user.uid).update({
                needsPasswordChange: false
            });

            // Atualizar na sessão
            const userData = JSON.parse(sessionStorage.getItem('user'));
            userData.needsPasswordChange = false;
            sessionStorage.setItem('user', JSON.stringify(userData));

            toast.success('Senha alterada com sucesso!');
            onComplete();
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            setError('Erro ao alterar senha. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={isModal ? "" : "min-h-screen flex items-center justify-center bg-gray-100"}>
            <div className={`bg-white ${!isModal && 'p-8 rounded-lg shadow-md'} w-full max-w-md`}>
                {!isModal && (
                    <div className="flex justify-center mb-8">
                        <Image
                            src={logo}
                            alt="CFML Logo"
                            width={150}
                            height={50}
                            className="h-12 w-auto"
                        />
                    </div>
                )}
                
                <h1 className="text-2xl font-semibold text-center text-[#221D5A] mb-4">
                    Alterar Senha
                </h1>
                
                <p className="text-gray-600 text-center mb-8">
                    Digite sua nova senha
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#221D5A]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#221D5A]"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <div className="flex gap-3">
                        {isModal && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isModal ? 'flex-1' : 'w-full'} bg-[#221D5A] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50`}
                        >
                            {isLoading ? 'Alterando...' : 'Alterar Senha'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 