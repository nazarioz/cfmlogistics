'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';

export default function MissionVision() {
    const { t } = useTranslation();

    const objectives = [
        {
            title: t('about.mission_vision.objectives.0.title'),
            description: t('about.mission_vision.objectives.0.description')
        },
        {
            title: t('about.mission_vision.objectives.1.title'),
            description: t('about.mission_vision.objectives.1.description')
        },
        {
            title: t('about.mission_vision.objectives.2.title'),
            description: t('about.mission_vision.objectives.2.description')
        },
        {
            title: t('about.mission_vision.objectives.3.title'),
            description: t('about.mission_vision.objectives.3.description')
        },
        {
            title: t('about.mission_vision.objectives.4.title'),
            description: t('about.mission_vision.objectives.4.description')
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Missão e Visão */}
                <div className="grid md:grid-cols-2 gap-16 mb-32">
                    {/* Missão */}
                    <RevealOnScroll>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-3">
                                    <span className="h-[1px] w-12 bg-[#fc4c04]" />
                                    <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                        {t('about.mission_vision.mission.subtitle')}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold text-[#646464]">
                                    {t('about.mission_vision.mission.title')}
                                    <span className="block font-light">{t('about.mission_vision.mission.highlight')}</span>
                                </h2>
                            </div>
                            
                            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md 
                                          transition-all duration-300 relative group">
                                <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#fc4c04]/5 
                                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                                <p className="text-gray-600 text-lg leading-relaxed relative">
                                    {t('about.mission_vision.mission.description')}
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Visão */}
                    <RevealOnScroll delay={0.2}>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-3">
                                    <span className="h-[1px] w-12 bg-[#fc4c04]" />
                                    <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                        {t('about.mission_vision.vision.subtitle')}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold text-[#646464]">
                                    {t('about.mission_vision.vision.title')}
                                    <span className="block font-light">{t('about.mission_vision.vision.highlight')}</span>
                                </h2>
                            </div>
                            
                            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md 
                                          transition-all duration-300 relative group">
                                <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#646464]/5 
                                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                                <p className="text-gray-600 text-lg leading-relaxed relative">
                                    {t('about.mission_vision.vision.description')}
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Objetivos */}
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('about.mission_vision.objectives.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('about.mission_vision.objectives.title')}
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            {t('about.mission_vision.objectives.description')}
                        </p>
                    </div>

                    <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {objectives.map((objective, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg 
                                              transition-all duration-300 group relative overflow-hidden
                                              border border-gray-100">
                                    {/* Decorative elements */}
                                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#fc4c04]/5 
                                                  rounded-full group-hover:scale-150 transition-transform duration-500" />
                                    <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-[#646464]/5 
                                                  rounded-full opacity-0 group-hover:opacity-100 
                                                  transition-all duration-500" />
                                    
                                    {/* Número do objetivo */}
                                    <div className="text-[#fc4c04]/20 text-6xl font-bold absolute top-4 right-4 
                                                  group-hover:scale-125 transition-transform duration-300">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>

                                    {/* Conteúdo */}
                                    <div className="relative">
                                        {/* Linha decorativa */}
                                        <div className="w-12 h-1 bg-gradient-to-r from-[#fc4c04] to-[#fc4c04]/20 
                                                      mb-6 group-hover:w-16 transition-all duration-300" />
                                        
                                        <h3 className="text-xl font-bold text-[#646464] mb-4 group-hover:text-[#fc4c04] 
                                                     transition-colors duration-300">
                                            {objective.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 leading-relaxed">
                                            {objective.description}
                                        </p>

                                        {/* Hover indicator */}
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#fc4c04] 
                                                      group-hover:w-16 transition-all duration-300" />
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </StaggerChildren>
                </RevealOnScroll>
            </div>
        </section>
    );
} 