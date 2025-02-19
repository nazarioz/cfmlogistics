'use client';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import aboutHero from '@/assets/images/about-hero.jpg';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="relative h-[70vh] w-full overflow-hidden">
            {/* Background Image */}
            <Image
                src={aboutHero}
                alt="CFM LOGISTICS Team"
                fill
                priority
                className="object-cover scale-105"
            />
            
            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            {/* Conteúdo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <RevealOnScroll>
                    <div className="text-center text-white px-4 max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {/* Linha decorativa superior */}
                            <div className="inline-flex items-center gap-3 mb-6">
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                                <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                    {t('about.hero.subtitle')}
                                </span>
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            </div>

                            {/* Título */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
                                {t('about.hero.title')}
                            </h1>

                            {/* Subtítulo */}
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                                {t('about.hero.description')}
                            </p>

                            {/* Linha decorativa inferior */}
                            <div className="w-24 h-1 bg-[#fc4c04]/20 mx-auto mt-8" />
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 