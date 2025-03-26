'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gradient-to-b from-[#2f2f2f] to-[#646464] overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute left-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full -translate-x-1/2" />
            <div className="absolute right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2" />
            
            <div className="container max-w-7xl mx-auto px-4 relative">
                <RevealOnScroll>
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm uppercase">
                                {t('gallery.hero.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('gallery.hero.title')}
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            {t('gallery.hero.description')}
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 