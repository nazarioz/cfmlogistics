'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';
import { LiaIndustrySolid, LiaHistorySolid, LiaLeafSolid, LiaShieldAltSolid } from "react-icons/lia";

export default function Differentials() {
    const { t } = useTranslation();

    const differentials = [
        {
            icon: <LiaIndustrySolid className="w-8 h-8" />,
            title: t('services.differentials.items.0.title'),
            description: t('services.differentials.items.0.description')
        },
        {
            icon: <LiaHistorySolid className="w-8 h-8" />,
            title: t('services.differentials.items.1.title'),
            description: t('services.differentials.items.1.description')
        },
        {
            icon: <LiaLeafSolid className="w-8 h-8" />,
            title: t('services.differentials.items.2.title'),
            description: t('services.differentials.items.2.description')
        },
        {
            icon: <LiaShieldAltSolid className="w-8 h-8" />,
            title: t('services.differentials.items.3.title'),
            description: t('services.differentials.items.3.description')
        }
    ];

    return (
        <section className="py-24 bg-[#646464] relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fc4c04]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4 relative">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('services.differentials.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('services.differentials.title')}
                            <span className="block font-light">{t('services.differentials.highlight')}</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {differentials.map((differential, index) => (
                        <RevealOnScroll key={index} delay={index * 0.1}>
                            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl 
                                          hover:bg-white/20 transition-all duration-300 group">
                                {/* Ícone */}
                                <div className="p-4 rounded-lg bg-[#fc4c04]/10 text-[#fc4c04] w-fit mb-6
                                              group-hover:bg-[#fc4c04] group-hover:text-white
                                              transition-all duration-300">
                                    {differential.icon}
                                </div>

                                {/* Título */}
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {differential.title}
                                </h3>

                                {/* Descrição */}
                                <p className="text-white/80 font-light leading-relaxed">
                                    {differential.description}
                                </p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    );
} 