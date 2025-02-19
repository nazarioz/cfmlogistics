'use client';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo/logo.png';
import bgImage from '@/assets/images/porto.jpg';

export default function AboutSection() {
    const { t } = useTranslation();

    return (
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Conteúdo à esquerda */}
                    <div className="relative z-10">
                        <RevealOnScroll>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-[2px] w-8 bg-[#fc4c04]" />
                                <span className="text-[#fc4c04] font-medium">{t('home.about.subtitle')}</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#646464] mb-4 leading-tight">
                                {t('home.about.title')} <br />
                                <span className="font-light">{t('home.about.highlight')}</span>
                            </h2>
                            
                            <p className="text-xl text-gray-600 mb-8 font-light">
                                {t('home.about.description')}
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="space-y-6 text-gray-600 font-light">
                                <p>
                                    {t('home.about.content.first')}
                                </p>
                                <p>
                                    {t('home.about.content.second')}
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Lado direito com ícones animados */}
                    <div className="relative">
                        <RevealOnScroll delay={0.4}>
                            <div className="relative aspect-square">
                                {/* Círculo central com imagem de fundo */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    {/* Imagem de fundo */}
                                    <Image
                                        src={bgImage}
                                        alt="Background"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay mais escuro */}
                                    <div className="absolute inset-0 bg-black/30" />

                                    {/* Logo em branco */}
                                    <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-32 h-32">
                                        <Image
                                            src={logo}
                                            alt="CFM Logistics"
                                            width={128}
                                            height={128}
                                            className="object-contain brightness-0 invert"
                                        />
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
} 