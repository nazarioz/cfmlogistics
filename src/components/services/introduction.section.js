'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function Introduction() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('services.introduction.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-6">
                            {t('services.introduction.title')}
                            <span className="block font-light">
                                {t('services.introduction.highlight')}
                            </span>
                        </h2>

                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            {t('services.introduction.description')}
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 