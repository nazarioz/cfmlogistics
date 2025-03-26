'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartBar, FaNewspaper, FaUsers, FaCog, FaUserPlus, FaImages } from 'react-icons/fa';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Dashboard', href: '/admin', icon: <FaChartBar /> },
        { label: 'Publicações', href: '/admin/publicacoes', icon: <FaNewspaper /> },
        {
            label: 'Galeria de Fotos',
            href: '/admin/galeria',
            icon: <FaImages />,
        },
    ];

    return (
        <aside className="w-64 bg-white shadow-sm min-h-screen">
            <nav className="mt-8">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#646464] ${
                            pathname === item.href ? 'bg-gray-50 text-[#646464] border-r-4 border-[#646464]' : ''
                        }`}
                    >
                        <span className="material-icons-outlined mr-3">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
} 