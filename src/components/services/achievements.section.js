'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { LiaShipSolid, LiaMapMarkedAltSolid, LiaUsersSolid, LiaAwardSolid } from "react-icons/lia";

export default function AchievementsSection() {
    const { t } = useTranslation();

    const achievements = [
        {
            icon: <LiaShipSolid className="w-10 h-10" />,
            number: t('services.achievements.items.0.number'),
            label: t('services.achievements.items.0.label'),
            description: t('services.achievements.items.0.description')
        },
        {
            icon: <LiaMapMarkedAltSolid className="w-10 h-10" />,
            number: t('services.achievements.items.1.number'),
            label: t('services.achievements.items.1.label'),
            description: t('services.achievements.items.1.description')
        },
        {
            icon: <LiaUsersSolid className="w-10 h-10" />,
            number: t('services.achievements.items.2.number'),
            label: t('services.achievements.items.2.label'),
            description: t('services.achievements.items.2.description')
        },
        {
            icon: <LiaAwardSolid className="w-10 h-10" />,
            number: t('services.achievements.items.3.number'),
            label: t('services.achievements.items.3.label'),
            description: t('services.achievements.items.3.description')
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Conteúdo à esquerda */}
                    <RevealOnScroll className="lg:w-1/3">
                        <div className="text-left">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-[2px] w-12 bg-[#fc4c04]" />
                                <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                    {t('services.achievements.subtitle')}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-6">
                                {t('services.achievements.title')}
                                <span className="block font-light mt-2">
                                    {t('services.achievements.highlight')}
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg font-light leading-relaxed">
                                {t('services.achievements.description')}
                            </p>

                            {/* Linha decorativa */}
                            <div className="w-24 h-1 bg-[#fc4c04]/20 mt-8" />
                        </div>
                    </RevealOnScroll>

                    {/* Números à direita */}
                    <div className="lg:w-2/3 grid grid-cols-2 gap-8">
                        {achievements.map((achievement, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div className="group flex items-start gap-6 p-6 rounded-xl
                                              hover:bg-white/80 transition-all duration-300
                                              relative">
                                    {/* Ícone */}
                                    <div className="p-4 rounded-xl bg-[#fc4c04]/10 text-[#fc4c04]
                                                  group-hover:bg-[#fc4c04] group-hover:text-white
                                                  transition-all duration-300 flex-shrink-0">
                                        {achievement.icon}
                                    </div>

                                    <div>
                                        {/* Número */}
                                        <div className="text-4xl font-bold text-[#646464] mb-2 
                                                      group-hover:text-[#fc4c04] transition-colors duration-300">
                                            {achievement.number}
                                        </div>

                                        {/* Label */}
                                        <div className="text-lg font-semibold text-[#646464] mb-2">
                                            {achievement.label}
                                        </div>

                                        {/* Descrição */}
                                        <p className="text-gray-600 font-light text-sm">
                                            {achievement.description}
                                        </p>
                                    </div>

                                    {/* Linha decorativa */}
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fc4c04]/20 
                                                  group-hover:w-full transition-all duration-500" />
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 