'use client';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import logistica from '@/assets/images/cfm_carrousel_1.JPG';
import transporte from '@/assets/images/cfm_carrousel_2.JPG';
import sustentabilidade from '@/assets/images/cfm_carrousel_3.jpg';
import padroesGlobais from '@/assets/images/cfm_carrousel_4.jpg';
import construindoFuturo from '@/assets/images/cfm_carrousel_5.jpeg';

const SLIDE_DURATION = 5000;

export default function HeroSection() {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slides = [
        {
            ...t('home.hero.slides.0', { returnObjects: true }),
            image: logistica
        },
        {
            ...t('home.hero.slides.1', { returnObjects: true }),
            image: transporte
        },
        {
            ...t('home.hero.slides.2', { returnObjects: true }),
            image: sustentabilidade
        },
        {
            ...t('home.hero.slides.3', { returnObjects: true }),
            image: padroesGlobais
        },
        {
            ...t('home.hero.slides.4', { returnObjects: true }),
            image: construindoFuturo
        }
    ];

    const changeSlide = useCallback((direction) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        
        if (direction === 'next') {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        } else {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }

        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning, slides.length]);

    useEffect(() => {
        const timer = setInterval(() => changeSlide('next'), SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [changeSlide]);

    return (
        <section className="relative h-[92vh] w-full overflow-hidden">
            {/* Setas de Navegação */}
            <button 
                className="absolute left-8 top-1/2 z-10 w-12 h-12 flex items-center justify-center
                         bg-black/20 backdrop-blur-sm rounded-full text-white
                         hover:bg-[#fc4c04] transform -translate-y-1/2 transition-all duration-300
                         focus:outline-none group"
                onClick={() => changeSlide('prev')}
                disabled={isTransitioning}
            >
                <svg 
                    className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                className="absolute right-8 top-1/2 z-10 w-12 h-12 flex items-center justify-center
                         bg-black/20 backdrop-blur-sm rounded-full text-white
                         hover:bg-[#fc4c04] transform -translate-y-1/2 transition-all duration-300
                         focus:outline-none group"
                onClick={() => changeSlide('next')}
                disabled={isTransitioning}
            >
                <svg 
                    className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Slides */}
            <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out
                               ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === currentSlide}
                            className="object-cover"
                            quality={90}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />

            {/* Conteúdo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <RevealOnScroll>
                    <div className="text-center text-white px-4 max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 mb-6">
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                                <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                    {t('home.hero.welcome')}
                                </span>
                                <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider
                                       transition-all duration-700 ease-in-out">
                                {slides[currentSlide].title}
                            </h2>

                            <p className="text-xl md:text-2xl text-white/90 font-light transition-all duration-700">
                                {slides[currentSlide].subtitle}
                            </p>

                            <div className="mt-8">
                                <button className="px-8 py-3 border-2 border-[#fc4c04] text-white rounded-full
                                               hover:bg-[#fc4c04] transition-all duration-300 group">
                                    {t('cta.learn_more')}
                                    <svg 
                                        className="inline-block ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Indicadores de Slide */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 
                                  ${currentSlide === index 
                                    ? 'w-8 bg-[#fc4c04]' 
                                    : 'bg-white/50 hover:bg-white/80'}`}
                        onClick={() => setCurrentSlide(index)}
                        disabled={isTransitioning}
                    />
                ))}
            </div>
        </section>
    );
} 