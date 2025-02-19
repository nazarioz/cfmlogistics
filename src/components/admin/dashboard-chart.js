'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        // Dados de exemplo
        const data = {
            labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            datasets: [
                {
                    label: 'Visitas',
                    data: [150, 200, 180, 250, 220, 300, 280],
                    borderColor: '#646464',
                    backgroundColor: 'rgba(34, 29, 90, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="h-[300px]">
            <canvas ref={chartRef} />
        </div>
    );
} 