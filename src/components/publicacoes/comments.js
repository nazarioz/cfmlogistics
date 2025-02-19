'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { FaSpinner, FaChevronDown } from 'react-icons/fa';

export default function Comments({ publicacaoId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const COMMENTS_PER_PAGE = 5;

    useEffect(() => {
        loadComments();
    }, [publicacaoId]);

    const loadComments = async (loadMore = false) => {
        try {
            setIsLoadingMore(loadMore);
            if (!loadMore) setIsLoading(true);

            const db = firebase.firestore();
            let query = db.collection('comments')
                .where('publicacaoId', '==', publicacaoId)
                .orderBy('createdAt', 'desc')
                .limit(COMMENTS_PER_PAGE);

            if (loadMore && lastVisible) {
                query = query.startAfter(lastVisible);
            }

            const snapshot = await query.get();
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate()
            }));

            // Atualizar o último documento visível para paginação
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            
            // Verificar se há mais comentários
            setHasMore(snapshot.docs.length === COMMENTS_PER_PAGE);

            if (loadMore) {
                setComments(prev => [...prev, ...docs]);
            } else {
                setComments(docs);
            }
        } catch (error) {
            console.error('Erro ao carregar comentários:', error);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (!isLoadingMore && hasMore) {
            loadComments(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const db = firebase.firestore();
            await db.collection('comments').add({
                publicacaoId,
                content: newComment,
                author: 'Anônimo', // Depois integrar com autenticação
                createdAt: new Date()
            });

            setNewComment('');
            // Recarregar apenas os primeiros comentários
            await loadComments();
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert('Erro ao enviar comentário. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mt-12">
            <h2 className="text-2xl font-semibold text-[#646464] mb-8">
                Comentários
            </h2>

            {/* Formulário de Comentário */}
            <RevealOnScroll>
                <form onSubmit={handleSubmit} className="mb-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Deixe seu comentário..."
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#646464] focus:border-transparent"
                        rows={4}
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 px-6 py-3 bg-[#646464] text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <FaSpinner className="animate-spin inline mr-2" />
                                Enviando...
                            </>
                        ) : (
                            'Enviar Comentário'
                        )}
                    </button>
                </form>
            </RevealOnScroll>

            {/* Lista de Comentários */}
            {isLoading ? (
                <div className="flex justify-center">
                    <FaSpinner className="animate-spin text-[#646464] text-2xl" />
                </div>
            ) : comments.length > 0 ? (
                <>
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <RevealOnScroll key={comment.id}>
                                <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#646464] text-white flex items-center justify-center">
                                                {comment.author.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium">{comment.author}</span>
                                        </div>
                                        <time className="text-sm text-gray-500">
                                            {new Intl.DateTimeFormat('pt-BR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }).format(comment.createdAt)}
                                        </time>
                                    </div>
                                    <p className="text-gray-600">{comment.content}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>

                    {/* Botão "Carregar Mais" */}
                    {hasMore && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoadingMore}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {isLoadingMore ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Carregando...
                                    </>
                                ) : (
                                    <>
                                        <FaChevronDown />
                                        Ver mais comentários
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-500">
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                </p>
            )}
        </section>
    );
} 