'use client';
import { useState } from 'react';
import { firebase } from '../../../base'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            if (userData.role === 'admin') {
                sessionStorage.setItem('user', JSON.stringify(userData));
                router.push('/admin');
            } else {
                setError('Você não tem permissão para acessar esta área');
            }
        } catch (error) {
            setError('Credenciais inválidas');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Image
                        src={logo}
                        alt="CFM LOGISTICS Logo"
                        width={150}
                        height={50}
                        className="h-12 w-auto"
                    />
                </div>
                <h1 className="text-2xl font-semibold text-center text-[#646464] mb-8">
                    Área Administrativa
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#646464] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
} 