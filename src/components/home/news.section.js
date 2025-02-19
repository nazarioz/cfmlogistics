'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
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
                .limit(3)
                .get();

            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                date: doc.data().createdAt.toDate().toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, '.'),
                image: doc.data().coverImage,
                slug: doc.data().slug
            }));

            setNews(docs);
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            // Em caso de erro, manter a seção vazia
            setNews([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <NewsSkeleton />;
    }

    // Se não houver notícias, não renderiza a seção
    if (news.length === 0) {
        return null;
    }

    const [mainNews, ...secondaryNews] = news;

    return (
        <section className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
            <div className="container px-4 max-w-7xl mx-auto">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('home.news.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('home.news.title')}
                        </h2>

                        <p className="text-gray-600 text-lg font-light">
                            {t('home.news.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Notícia Principal */}
                    <div className="lg:w-1/2">
                        <Link
                            href={`/publicacoes/${mainNews.slug}`}
                            className="group relative block h-[600px] lg:h-[617px] overflow-hidden"
                        >
                            <img
                                src={mainNews.image}
                                alt={mainNews.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-white text-sm mb-2">
                                    <span className="underline decoration-[#fc4c04]">{mainNews.date}</span>
                                </p>
                                <h3 className="text-white text-2xl font-semibold">
                                    {mainNews.title}
                                </h3>
                            </div>
                        </Link>
                    </div>

                    {/* Notícias Secundárias */}
                    <div className="lg:w-1/2 flex flex-col gap-4">
                        {secondaryNews.map((item) => (
                            <Link
                                key={item.id}
                                href={`/publicacoes/${item.slug}`}
                                className="group relative block h-[300px] overflow-hidden"
                            >
                                <img
                                    src={item.image}
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
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/publicacoes"
                        className="text-[#fc4c04] hover:underline inline-flex items-center"
                    >
                        {t('home.news.view_all')}
                    </Link>
                </div>
            </div>
        </section>
    );
} 