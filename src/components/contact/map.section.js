'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function MapLocation() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('contact.map.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('contact.map.title')}
                            <span className="block font-light">{t('contact.map.highlight')}</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            {t('contact.map.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <div className="relative rounded-xl overflow-hidden shadow-lg h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1794.1152746634292!2d32.57773132842501!3d-25.975466331823856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU4JzMxLjciUyAzMsKwMzQnNDUuMiJF!5e0!3m2!1spt-PT!2smz!4v1709913046345!5m2!1spt-PT!2smz&markers=color:red%7C-25.975466331823856,32.57922132842501"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 