'use client';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { firebase } from '@/base';
import NewsSkeleton from './news.skeleton';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function NewsSection() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const db = firebase.firestore();
            const snapshot = await db.collection('publicacoes')
                .where('status', '==', 'published')
                .orderBy('createdAt', 'desc')
                .get();
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                date: doc.data().createdAt.toDate().toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                coverImage: doc.data().coverImage,
                slug: doc.data().slug
            }));

            setNews(docs);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading news:", error);
            setIsLoading(false);
        }
    };

    if (isLoading) return <NewsSkeleton />;

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('publications.news.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('publications.news.title')}
                            <span className="block font-light">{t('publications.news.highlight')}</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* Grid de Notícias - Mantendo o design original dos cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <RevealOnScroll key={item.id} delay={index * 0.1}>
                            <Link
                                href={`/publicacoes/${item.slug}`}
                                className="block aspect-[4/3] relative rounded-xl overflow-hidden group"
                            >
                                <img
                                    src={item.coverImage}
                                    alt={item.title}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-white text-sm mb-2">
                                        <span className="underline decoration-[#fc4c04]">{item.date}</span>
                                    </p>
                                    <h3 className="text-white text-xl font-semibold">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
} 