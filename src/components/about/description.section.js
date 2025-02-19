'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import logo from '@/assets/logo/logo.png';

export default function Description() {
    const { t } = useTranslation();

    const stats = [
        { number: "100+", label: t('about.description.stats.tradition') },
        { number: "10", label: t('about.description.stats.ports') },
        { number: "50+", label: t('about.description.stats.projects') }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-[#2f2f2f] to-[#646464]">
            {/* Círculos decorativos */}
            <div className="absolute left-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4 relative">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Coluna da Esquerda - Logo e Título */}
                    <RevealOnScroll>
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 mb-2">
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                                <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                    {t('about.description.subtitle')}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                {t('about.description.title')}
                                <span className="block font-light mt-2">
                                    {t('about.description.highlight')}
                                </span>
                            </h2>

                            <div className="relative w-48 h-48 mx-auto md:mx-0">
                                <div className="absolute inset-0 bg-white/10 rounded-lg transform rotate-6 transition-transform group-hover:rotate-12" />
                                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-6 transform transition-transform group-hover:scale-105">
                                    <Image
                                        src={logo}
                                        alt="CFM LOGISTICS"
                                        fill
                                        className="object-contain brightness-0 invert p-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Coluna da Direita - Texto e Stats */}
                    <RevealOnScroll delay={0.2}>
                        <div className="space-y-8">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 relative overflow-hidden group">
                                {/* Círculo decorativo */}
                                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fc4c04]/5 
                                              rounded-full group-hover:scale-150 transition-transform duration-500" />
                                
                                <p className="text-white/90 text-lg leading-relaxed relative">
                                    {t('about.description.content.first')}
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
                                <p className="text-white/80 leading-relaxed">
                                    {t('about.description.content.second')}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-[#fc4c04] text-2xl font-bold mb-1">
                                            {stat.number}
                                        </div>
                                        <div className="text-white/70 text-sm">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
