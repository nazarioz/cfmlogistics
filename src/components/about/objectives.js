'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import objectiveBg from '@/assets/images/objectives-bg.webp';
export default function ObjectivesSection() {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const objectives = [
        {
            title: t('about.mission_vision.objectives.0.title'),
            description: t('about.mission_vision.objectives.0.description')
        },
        {
            title: t('about.mission_vision.objectives.1.title'),
            description: t('about.mission_vision.objectives.1.description')
        },
        {
            title: t('about.mission_vision.objectives.2.title'),
            description: t('about.mission_vision.objectives.2.description')
        },
        {
            title: t('about.mission_vision.objectives.3.title'),
            description: t('about.mission_vision.objectives.3.description')
        },
        {
            title: t('about.mission_vision.objectives.4.title'),
            description: t('about.mission_vision.objectives.4.description')
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % objectives.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [objectives.length]);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div id="objetivos" className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('about.mission_vision.objectives.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('about.mission_vision.objectives.title')}
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            {t('about.mission_vision.objectives.description')}
                        </p>
                    </div>

                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <Image
                                src={objectiveBg}
                                alt="CFM Logistics Objectives"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                        </div>

                        {/* Objectives Carousel */}
                        <div className="relative h-full max-w-2xl p-8 flex flex-col justify-center">
                            <div className="relative">
                                {objectives.map((objective, index) => (
                                    <div 
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                            index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                                        }`}
                                    >
                                        <div className="space-y-6">
                                            {/* Number indicator */}
                                            <div className="w-16 h-16 bg-[#fc4c04]/20 rounded-full flex items-center 
                                                          justify-center">
                                                <span className="text-2xl font-bold text-white">
                                                    {index + 1}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-3xl font-bold text-white">
                                                {objective.title}
                                            </h3>
                                            <p className="text-white/80 text-lg leading-relaxed">
                                                {objective.description}
                                            </p>

                                            {/* Progress dots */}
                                            <div className="flex gap-2">
                                                {objectives.map((_, dotIndex) => (
                                                    <div 
                                                        key={dotIndex}
                                                        className={`h-1 rounded-full transition-all duration-300
                                                                   ${index === dotIndex ? 'bg-[#fc4c04] w-8' : 'bg-white/30 w-4'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
} 