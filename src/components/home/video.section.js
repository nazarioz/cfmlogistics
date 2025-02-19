'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function VideoSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
            {/* Círculos decorativos */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc4c04]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#646464]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('home.video.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('home.video.title')}
                            <span className="block font-light">{t('home.video.highlight')}</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            {t('home.video.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <div className="max-w-5xl mx-auto">
                        <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
                            {/* Decoração de fundo */}
                            <div className="absolute -right-4 -bottom-4 w-full h-full border-2 
                                          border-[#646464] rounded-xl opacity-20" />
                            
                            {/* Video Container */}
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                <video 
                                    className="w-full h-full object-cover"
                                    controls
                                    poster="/cfml.jpg"
                                >
                                    <source src="/video/cfml.mp4" type="video/mp4" />
                                    <track
                                        src="/videos/captions-pt.vtt"
                                        kind="subtitles"
                                        srcLang="pt"
                                        label="Português"
                                    />
                                    <track
                                        src="/videos/captions-en.vtt"
                                        kind="subtitles"
                                        srcLang="en"
                                        label="English"
                                    />
                                    Seu navegador não suporta o elemento de vídeo.
                                </video>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}