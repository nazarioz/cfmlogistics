'use client';
import { useTranslation } from 'react-i18next';
import { RevealOnScroll, StaggerChildren } from '@/components/ui/reveal.animation';
import { LiaIndustrySolid, LiaShipSolid, LiaUserTieSolid, LiaAnchorSolid } from "react-icons/lia";
import Link from 'next/link';

export default function TimelineSection() {
    const { t } = useTranslation();

    const timelineEvents = [
        {
            year: "24/08/2023",
            title: t('about.timeline.events.0.title'),
            description: t('about.timeline.events.0.description'),
            icon: <LiaIndustrySolid className="w-8 h-8" />,
            link: "/about#timeline"
        },
        {
            year: "03/11/2023",
            title: t('about.timeline.events.1.title'),
            description: t('about.timeline.events.1.description'),
            icon: <LiaUserTieSolid className="w-8 h-8" />,
            link: "/about#timeline"
        },
        {
            year: "01/01/2024",
            title: t('about.timeline.events.2.title'),
            description: t('about.timeline.events.2.description'),
            icon: <LiaShipSolid className="w-8 h-8" />,
            link: "/about#timeline"
        },
        {
            year: "13/07/2024",
            title: t('about.timeline.events.3.title'),
            description: t('about.timeline.events.3.description'),
            icon: <LiaAnchorSolid className="w-8 h-8" />,
            link: "/about#timeline"
        }
    ];

    return (
        <section id="timeline" className="pb-24 pt-12 bg-gradient-to-b from-[#f8f9fa] to-white">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Cabeçalho */}
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('about.timeline.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('about.timeline.title')}
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            {t('about.timeline.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Nova Timeline */}
                <div className="relative">
                    {/* Linha do tempo central */}
                    <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#fc4c04]/20 via-[#fc4c04] to-[#fc4c04]/20 
                                  transform -translate-x-1/2 hidden md:block" />

                    <StaggerChildren>
                        {timelineEvents.map((event, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div className={`relative flex items-center mb-16 last:mb-0 
                                               ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Conector */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex 
                                                  items-center justify-center z-20">
                                        <div className="w-4 h-4 rounded-full bg-[#fc4c04] border-4 border-white" />
                                    </div>

                                    {/* Ano e Conteúdo */}
                                    <div className="w-full md:w-1/2 flex items-center 
                                                  gap-8 relative">
                                        <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                            <div className="bg-white rounded-xl p-8 shadow-sm group
                                                          hover:shadow-lg transition-all duration-300">
                                                {/* Ano */}
                                                <div className="inline-flex items-center gap-3 mb-4">
                                                    <span className="text-[#fc4c04] text-2xl font-bold">
                                                        {event.year}
                                                    </span>
                                                    <span className="h-[1px] w-8 bg-[#fc4c04]/30" />
                                                </div>

                                                {/* Título e Ícone */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="p-3 rounded-lg bg-[#fc4c04]/10 text-[#fc4c04]
                                                                  group-hover:bg-[#fc4c04] group-hover:text-white
                                                                  transition-all duration-300">
                                                        {event.icon}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-[#646464] 
                                                               group-hover:text-[#fc4c04] transition-colors duration-300">
                                                        {event.title}
                                                    </h3>
                                                </div>

                                                {/* Descrição */}
                                                <p className="text-gray-600 leading-relaxed pl-[3.25rem] mb-6">
                                                    {event.description}
                                                </p>

                                                {/* Botão Ver Mais */}
                                                <Link 
                                                    href={event.link}
                                                    className="inline-flex items-center gap-2 text-[#fc4c04] font-medium
                                                               opacity-0 group-hover:opacity-100 transition-all duration-300
                                                               hover:gap-3 pl-[3.25rem]"
                                                >
                                                    {t('cta.learn_more')}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" 
                                                         viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" 
                                                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                                                              clipRule="evenodd" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </StaggerChildren>
                </div>
            </div>
        </section>
    );
} 