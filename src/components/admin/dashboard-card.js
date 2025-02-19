"use client";
import { FaChartBar, FaNewspaper, FaUsers, FaCog } from 'react-icons/fa';
import Link from 'next/link';

export default function DashboardCard({ title, value, icon, trend, loading, color = 'bg-blue-500', href }) {
    const CardContent = () => (
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
                    {icon}
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="animate-pulse">
                        <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
                        {trend && <div className="h-4 w-16 bg-gray-200 rounded"></div>}
                    </div>
                ) : (
                    <>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {value}
                        </p>
                        {trend && (
                            <p className="text-sm text-gray-500">
                                {trend}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                <CardContent />
            </Link>
        );
    }

    return <CardContent />;
} 