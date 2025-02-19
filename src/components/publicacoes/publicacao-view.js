'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaCopy, FaArrowLeft, FaArrowRight, FaEye } from 'react-icons/fa';
import RelatedPosts from './related-posts';
import Comments from './comments';

export default function PublicacaoView({ publicacao }) {
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        // Atualizar URL apenas no cliente
        setShareUrl(window.location.href);
    }, []);

    // Preparar texto para compartilhamento
    const shareText = `${publicacao.title}${publicacao.subtitle ? ` - ${publicacao.subtitle}` : ''}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedHashtags = encodeURIComponent('CFM LOGISTICS,Notícias');

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedHashtags}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedText}&summary=${encodeURIComponent(publicacao.excerpt || '')}&source=CFM LOGISTICS`,
        whatsapp: `https://wa.me/?text=${encodedText}%0A%0A${encodedUrl}`
    };

    const handleShare = (platform) => {
        const url = shareLinks[platform];
        window.open(url, '_blank', 'width=600,height=400');
    };

    const handleCopyLink = async () => {
        try {
            const textToShare = `${shareText}\n\n${shareUrl}`;
            await navigator.clipboard.writeText(textToShare);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <RevealOnScroll>
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><Link href="/" className="hover:text-[#646464]">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/publicacoes" className="hover:text-[#646464]">Publicações</Link></li>
                        <li>/</li>
                        <li className="text-[#646464]">{publicacao.title}</li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-[#646464] mb-4">
                        {publicacao.title}
                    </h1>
                    {publicacao.subtitle && (
                        <h2 className="text-xl text-gray-600 mb-6">
                            {publicacao.subtitle}
                        </h2>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                            <div className="flex items-center">
                                <span>{publicacao.author}</span>
                                <span className="mx-2">•</span>
                                <time dateTime={publicacao.createdAt.toISOString()}>
                                    {new Intl.DateTimeFormat('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    }).format(publicacao.createdAt)}
                                </time>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500" title="Visualizações">
                                <FaEye className="text-gray-400" />
                                <span>{publicacao.views?.toLocaleString('pt-BR') || 0}</span>
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Partilhar:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:bg-opacity-90 transition-colors"
                                    title="Compartilhar no Facebook"
                                >
                                    <FaFacebookF size={14} />
                                </button>
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-colors"
                                    title="Compartilhar no Twitter"
                                >
                                    <FaTwitter size={14} />
                                </button>
                                <button
                                    onClick={() => handleShare('linkedin')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-opacity-90 transition-colors"
                                    title="Compartilhar no LinkedIn"
                                >
                                    <FaLinkedinIn size={14} />
                                </button>
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-opacity-90 transition-colors"
                                    title="Compartilhar no WhatsApp"
                                >
                                    <FaWhatsapp size={14} />
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors relative group"
                                    title="Copiar link"
                                >
                                    <FaCopy size={14} />
                                    {copied && (
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                            Link copiado!
                                        </span>
                                    )}
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        Copiar link
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Imagem de Capa */}
                {publicacao.coverImage && (
                    <div className="relative aspect-[16/9] mb-12">
                        <img
                            src={publicacao.coverImage}
                            alt={publicacao.title}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                )}

                {/* Conteúdo */}
                <div 
                    className="prose max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: publicacao.content }}
                />

                {/* Tags */}
                <footer className="mb-0 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {publicacao.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </footer>

                {/* Posts Relacionados */}
                <RelatedPosts currentSlug={publicacao.slug} />

                {/* Seção de Comentários */}
                <Comments publicacaoId={publicacao.id} />
            </RevealOnScroll>
        </article>
    );
} 