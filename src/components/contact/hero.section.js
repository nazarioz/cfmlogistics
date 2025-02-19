'use client';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import contactHero from '@/assets/images/contact-hero.JPG';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="relative h-[70vh] w-full overflow-hidden">
            {/* Background Image */}
            <Image
                src={contactHero}
                alt={t('contact.hero.image_alt')}
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
                                    {t('contact.hero.subtitle')}
                                </span>
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            </div>

                            {/* Título */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
                                {t('contact.hero.title')}
                                <span className="block font-light mt-2">
                                    {t('contact.hero.highlight')}
                                </span>
                            </h1>

                            {/* Subtítulo */}
                            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                                {t('contact.hero.description')}
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