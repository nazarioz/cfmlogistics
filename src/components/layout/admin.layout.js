'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { firebase } from '../../base';
import AdminSidebar from '@/components/admin/sidebar';
import AdminHeader from '@/components/admin/header';

export default function AdminLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (firebase?.auth().currentUser) {
            setIsLoading(false);
            setIsVisible(true);
        } else {
            router.push('/admin/login');
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#221D5A]"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {isVisible &&
                <>
                    <div className="min-h-screen bg-gray-100">
                        <AdminHeader />
                        <div className="flex">
                            <AdminSidebar />
                            <main className="flex-1 p-8">
                                {children}
                            </main>
                        </div>
                    </div>
                </>
            }
        </div>
    );
} 