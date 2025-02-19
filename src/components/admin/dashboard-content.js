'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import DashboardCard from './dashboard-card';
import { FaUsers, FaNewspaper, FaUserPlus } from 'react-icons/fa';

export default function AdminDashboardContent() {
    const [stats, setStats] = useState({
        totalAssociados: 0,
        associadosAtivos: 0,
        totalPublicacoes: 0,
        pedidosPendentes: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const db = firebase.firestore();
                const publicacoesRef = db.collection('publicacoes');

                const publicacoesSnapshot = await publicacoesRef.get();

                setStats({
                    totalPublicacoes: publicacoesSnapshot.size,
                });
            } catch (error) {
                console.error('Erro ao carregar estatísticas:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Card de Publicações */}
                <DashboardCard
                    title="Publicações"
                    value={stats.totalPublicacoes}
                    icon={<FaNewspaper className="h-6 w-6" />}
                    loading={isLoading}
                    color="bg-green-500"
                />

                
            </div>
        </div>
    );
} 