'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';

export default function MissionVision() {
    const { t } = useTranslation();

    const values = [
        {
            title: t('about.mission_vision.values.items.0.title'),
            description: t('about.mission_vision.values.items.0.description')
        },
        {
            title: t('about.mission_vision.values.items.1.title'),
            description: t('about.mission_vision.values.items.1.description')
        },
        {
            title: t('about.mission_vision.values.items.2.title'),
            description: t('about.mission_vision.values.items.2.description')
        },
        {
            title: t('about.mission_vision.values.items.3.title'),
            description: t('about.mission_vision.values.items.3.description')
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Missão e Visão */}
                <div id="missao-visao" className="grid md:grid-cols-2 gap-16 mb-32">
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

                {/* Valores */}
                <RevealOnScroll>
                    <div id="valores" className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('about.mission_vision.values.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('about.mission_vision.values.title')}
                            <span className="block font-light">{t('about.mission_vision.values.highlight')}</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            {t('about.mission_vision.values.description')}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#fc4c04]/5 rounded-full blur-3xl" />
                            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#646464]/5 rounded-full blur-3xl" />
                        </div>

                        <div className="relative grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <RevealOnScroll key={index} delay={index * 0.1}>
                                    <div className="group relative">
                                        {/* Card container */}
                                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl 
                                                      transition-all duration-500 relative overflow-hidden
                                                      border border-gray-100 h-full">
                                            {/* Hover effect background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#fc4c04]/5 to-transparent 
                                                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            {/* Content */}
                                            <div className="relative">

                                                {/* Title and description */}
                                                <h3 className="text-2xl font-bold text-[#646464] mb-4 
                                                             group-hover:text-[#fc4c04] transition-colors duration-300">
                                                    {value.title}
                                                </h3>
                                                
                                                <p className="text-gray-600 leading-relaxed">
                                                    {value.description}
                                                </p>

                                                {/* Bottom line indicator */}
                                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
                                                              from-[#fc4c04] to-transparent opacity-0 
                                                              group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>

                                        {/* Floating decorative elements */}
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#fc4c04]/10 
                                                      rounded-full group-hover:scale-150 transition-transform 
                                                      duration-500" />
                                        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#646464]/10 
                                                      rounded-full group-hover:scale-150 transition-transform 
                                                      duration-500" />
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 