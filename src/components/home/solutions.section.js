'use client';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { useTranslation } from 'react-i18next';
import { FaTrain, FaWarehouse, FaOilCan, FaProjectDiagram, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function SolutionsSection() {
    const { t } = useTranslation();

    const solutions = [
        {
            icon: <FaTrain className="text-[#fc4c04] text-4xl" />,
            title: t('home.solutions.items.0.title'),
            description: t('home.solutions.items.0.description'),
            href: "/servicos/transporte"
        },
        {
            icon: <FaWarehouse className="text-[#fc4c04] text-4xl" />,
            title: t('home.solutions.items.1.title'),
            description: t('home.solutions.items.1.description'),
            href: "/servicos/armazenagem"
        },
        {
            icon: <FaOilCan className="text-[#fc4c04] text-4xl" />,
            title: t('home.solutions.items.2.title'),
            description: t('home.solutions.items.2.description'),
            href: "/servicos/petroleo-gas"
        },
        {
            icon: <FaProjectDiagram className="text-[#fc4c04] text-4xl" />,
            title: t('home.solutions.items.3.title'),
            description: t('home.solutions.items.3.description'),
            href: "/servicos/gestao-projetos"
        }
    ];

    return (
        <section className="py-16 bg-[#f8f9fa]">
            <div className="container px-4 max-w-7xl mx-auto">
                {/* Cabeçalho da Seção */}
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="h-[2px] w-8 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium">{t('home.solutions.subtitle')}</span>
                            <div className="h-[2px] w-8 bg-[#fc4c04]" />
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#646464] mb-6 leading-tight">
                            {t('home.solutions.title')}
                            <span className="bg-gradient-to-r from-[#fc4c04] to-[#646464] bg-clip-text text-transparent">
                                {' '}{t('home.solutions.highlight')}
                            </span>
                        </h2>

                        <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto relative">
                            {t('home.solutions.description')}
                            <span className="absolute -bottom-4 left-1/2 w-24 h-1 bg-[#fc4c04]/20 transform -translate-x-1/2" />
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Grid de Soluções */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {solutions.map((solution, index) => (
                        <RevealOnScroll key={index} delay={index * 0.1}>
                            <Link
                                href={solution.href}
                                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                            >
                                {/*Decorative circle*/}
                                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc4c04]/5 
                                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                                {/* Overlay de hover */}
                                <div className="absolute inset-0 bg-[#646464] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                                <div className="flex flex-col items-center text-center h-full">
                                    {/* Ícone */}
                                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {solution.icon}
                                    </div>

                                    {/* Título */}
                                    <h3 className="text-xl font-semibold text-[#646464] mb-3 group-hover:text-[#fc4c04] transition-colors duration-300">
                                        {solution.title}
                                    </h3>

                                    {/* Descrição */}
                                    <p className="text-gray-600 font-light leading-relaxed flex-grow mb-4">
                                        {solution.description}
                                    </p>

                                    {/* Seta - aparece apenas no hover */}
                                    <div className="flex items-center justify-center mt-auto">
                                        <FaArrowRight className="text-[#fc4c04] transform translate-x-0 group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
} 