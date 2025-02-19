'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/ui/reveal.animation';

export default function RelatedPosts({ currentSlug }) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadRelatedPosts();
    }, [currentSlug]);

    const loadRelatedPosts = async () => {
        try {
            const db = firebase.firestore();
            
            // Primeiro, pegamos mais posts do que precisamos
            const snapshot = await db.collection('publicacoes')
                .where('status', '==', 'published')
                .orderBy('createdAt', 'desc')
                .limit(10)
                .get();

            // Depois filtramos o slug atual e pegamos apenas 3
            const docs = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().createdAt.toDate().toLocaleDateString('pt-BR')
                }))
                .filter(post => post.slug !== currentSlug)
                .slice(0, 3);

            setPosts(docs);
        } catch (error) {
            console.error('Erro ao carregar posts relacionados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || posts.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#646464] mb-8">
                Posts Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <RevealOnScroll key={post.id}>
                        <Link href={`/publicacoes/${post.slug}`} className="block group">
                            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-medium text-gray-900 group-hover:text-[#646464] transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">{post.date}</p>
                        </Link>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
} 