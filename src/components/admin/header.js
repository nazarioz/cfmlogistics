'use client';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';

export default function AdminHeader() {
    const handleLogout = async () => {
        window.location.href = '/';
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Image
                        src={logo}
                        alt="CFM LOGISTICS Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                    />
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-[#646464]"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
} 