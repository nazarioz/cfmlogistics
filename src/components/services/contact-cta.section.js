'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import Link from 'next/link';
import Image from 'next/image';
import ctaImage from '@/assets/images/portocta.jpg';

export default function ContactCTA() {
    const { t } = useTranslation();

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={ctaImage}
                    alt={t('services.contact_cta.image_alt')}
                    fill
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#646464]/95 to-[#646464]/80" />
            </div>

            {/* Content */}
            <div className="container px-4 max-w-7xl mx-auto relative">
                <div className="max-w-3xl">
                    <RevealOnScroll>
                        {/* Decorative line */}
                        <div className="w-20 h-1 bg-[#fc4c04] mb-8" />

                        {/* Title */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {t('services.contact_cta.title')}
                            <span className="block font-light mt-2">
                                {t('services.contact_cta.highlight')}
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-white/90 text-xl font-light leading-relaxed mb-12">
                            {t('services.contact_cta.description')}
                        </p>

                        {/* CTA Button */}
                        <Link 
                            href="/contactos"
                            className="inline-flex items-center px-8 py-4 bg-[#fc4c04] text-white 
                                     rounded-full hover:bg-white hover:text-[#646464] 
                                     transition-all duration-300 group"
                        >
                            {t('services.contact_cta.cta')}
                            <svg 
                                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                />
                            </svg>
                        </Link>
                    </RevealOnScroll>

                    {/* Decorative Elements */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#fc4c04]/10 
                                  rounded-full translate-x-1/2 translate-y-1/2" />
                    <div className="absolute right-24 top-0 w-32 h-32 bg-white/5 
                                  rounded-full -translate-y-1/2" />
                </div>
            </div>
        </section>
    );
} 