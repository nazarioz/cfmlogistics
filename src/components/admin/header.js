'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaUserCircle, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { firebase } from '@/base';
import PasswordChange from '@/components/admin/password-change';
import { toast } from 'react-hot-toast';

export default function AdminHeader() {
    const [userName, setUserName] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                
                if (user) {
                    const db = firebase.firestore();
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        setUserName(userDoc.data().name);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        };

        loadUserData();
    }, []);

    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            router.push('/admin/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const handlePasswordChangeComplete = () => {
        setShowPasswordChange(false);
        toast.success('Senha alterada com sucesso!');
    };

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Image
                            src={logo}
                            alt="CFML Logo"
                            width={120}
                            height={40}
                            className="h-8 w-auto"
                        />

                        {/* Menu de Perfil */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center space-x-3 text-gray-700 hover:text-[#221D5A]">
                                <FaUserCircle className="h-6 w-6" />
                                <span className="text-sm font-medium">{userName}</span>
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {/* Opção Redefinir Senha */}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => setShowPasswordChange(true)}
                                                    className={`${
                                                        active ? 'bg-gray-100' : ''
                                                    } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    <FaKey className="mr-3 h-4 w-4" />
                                                    Redefinir Senha
                                                </button>
                                            )}
                                        </Menu.Item>

                                        {/* Separador */}
                                        <div className="border-t border-gray-100" />

                                        {/* Opção Sair */}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => setShowLogoutModal(true)}
                                                    className={`${
                                                        active ? 'bg-gray-100' : ''
                                                    } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                >
                                                    <FaSignOutAlt className="mr-3 h-4 w-4" />
                                                    Sair
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </header>

            {/* Modal de Confirmação de Logout */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Confirmar Saída
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tem certeza que deseja sair do sistema?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-[#221D5A] text-white rounded-md hover:bg-opacity-90"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Alteração de Senha */}
            {showPasswordChange && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <PasswordChange 
                            onComplete={handlePasswordChangeComplete}
                            onCancel={() => setShowPasswordChange(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
} 