'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import creationImage from '@/assets/images/start.jpg';

export default function CreationSection() {
    const { t } = useTranslation();

    return (
        <section id="origem" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Conteúdo */}
                    <RevealOnScroll>
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 mb-2">
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                                <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                    {t('about.creation.subtitle')}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[#646464] leading-tight">
                                {t('about.creation.title')}
                                <span className="block font-light mt-2">{t('about.creation.highlight')}</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-xl shadow-sm group hover:shadow-lg 
                                              transition-all duration-300 relative overflow-hidden">
                                    {/* Círculo decorativo */}
                                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc4c04]/5 
                                                  rounded-full group-hover:scale-150 transition-transform duration-500" />
                                    
                                    <p className="text-gray-600 text-lg leading-relaxed relative">
                                        {t('about.creation.content.first')}
                                    </p>
                                </div>

                                <div className="bg-white p-8 rounded-xl shadow-sm group hover:shadow-lg 
                                              transition-all duration-300 relative overflow-hidden">
                                    {/* Círculo decorativo */}
                                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#646464]/5 
                                                  rounded-full group-hover:scale-150 transition-transform duration-500" />
                                    
                                    <p className="text-gray-600 text-lg leading-relaxed relative">
                                        {t('about.creation.content.second')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Imagem */}
                    <RevealOnScroll delay={0.2}>
                        <div className="relative h-[550px] rounded-xl overflow-hidden group">
                            {/* Decoração de fundo */}
                            <div className="absolute -right-4 -bottom-4 w-full h-full border-2 
                                          border-[#646464] rounded-xl opacity-20" />
                            
                            <div className="relative h-full w-full rounded-xl overflow-hidden">
                                <Image
                                    src={creationImage}
                                    alt={t('about.creation.image_alt')}
                                    fill
                                    className="object-cover transition-transform duration-700 
                                             group-hover:scale-110"
                                />
                                {/* Overlay Gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-r 
                                              from-[#646464]/40 to-transparent opacity-0 
                                              group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
} 