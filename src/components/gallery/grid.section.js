'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';
import ImageModal from './modal';
import { firebase } from '@/base';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function GalleryGrid() {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('all');
    const [albums, setAlbums] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(null);
    const IMAGES_PER_PAGE = 12;

    // Carregar dados iniciais
    useEffect(() => {
        loadData();
    }, []);

    // Configurar Intersection Observer para lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
                    loadMoreImages();
                }
            },
            { threshold: 0.5 }
        );

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [hasMore, isLoading, isLoadingMore]);

    // Resetar paginação quando mudar de álbum ou termo de busca
    useEffect(() => {
        setCurrentPage(1);
        setHasMore(true);
        loadMoreImages();
    }, [selectedAlbum, searchTerm]);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();
            
            // Carregar álbuns
            const albumsSnapshot = await db.collection('albums')
                .orderBy('name')
                .get();
            
            const albumsData = albumsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbums(albumsData);

            // Carregar todas as imagens
            const imagesSnapshot = await db.collection('gallery')
                .orderBy('createdAt', 'desc')
                .get();

            const imagesData = await Promise.all(
                imagesSnapshot.docs.map(async (doc) => {
                    const imageData = { id: doc.id, ...doc.data() };
                    const album = albumsData.find(a => a.id === imageData.albumId);
                    return {
                        ...imageData,
                        albumName: album?.name || 'Sem álbum',
                        thumbnailUrl: imageData.url + '?w=300&h=300&fit=crop',
                        fullUrl: imageData.url + '?w=1200&h=1200&fit=crop'
                    };
                })
            );
            setImages(imagesData);
        } catch (error) {
            console.error('Erro ao carregar galeria:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreImages = useCallback(() => {
        if (isLoadingMore) return;

        setIsLoadingMore(true);
        try {
            // Filtrar imagens pelo álbum selecionado e termo de busca
            const filtered = images.filter(image => {
                const matchesSearch = searchTerm === '' || 
                    (image.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (image.albumName || '').toLowerCase().includes(searchTerm.toLowerCase());
                const matchesAlbum = selectedAlbum === 'all' || image.albumId === selectedAlbum;
                return matchesSearch && matchesAlbum;
            });

            const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
            const endIndex = startIndex + IMAGES_PER_PAGE;
            const newImages = filtered.slice(startIndex, endIndex);
            
            setImages(prevImages => {
                // Evitar duplicatas
                const existingIds = new Set(prevImages.map(img => img.id));
                const uniqueNewImages = newImages.filter(img => !existingIds.has(img.id));
                return [...prevImages, ...uniqueNewImages];
            });
            
            setCurrentPage(prev => prev + 1);
            setHasMore(endIndex < filtered.length);
        } finally {
            setIsLoadingMore(false);
        }
    }, [images, currentPage, searchTerm, selectedAlbum, isLoadingMore]);

    const handleAlbumChange = (albumId) => {
        setSelectedAlbum(albumId);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtrar imagens para exibição
    const filteredImages = images.filter(image => {
        const matchesSearch = searchTerm === '' || 
            (image.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (image.albumName || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAlbum = selectedAlbum === 'all' || image.albumId === selectedAlbum;
        return matchesSearch && matchesAlbum;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <FaSpinner className="w-8 h-8 animate-spin text-[#fc4c04]" />
            </div>
        );
    }

    return (
        <section className="py-12 bg-white">
            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    {/* Filtros */}
                    <div className="mb-12 space-y-6">
                        {/* Barra de pesquisa */}
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder={t('gallery.grid.search_placeholder')}
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-6 py-4 pl-12 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#fc4c04]/20 focus:ring-2 focus:ring-[#fc4c04]/20 transition-all duration-300"
                            />
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>

                        {/* Filtro de álbuns */}
                        <div className="flex justify-center gap-3 overflow-x-auto pb-2 -mx-2 px-2">
                            <button
                                onClick={() => handleAlbumChange('all')}
                                className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                                    selectedAlbum === 'all'
                                        ? 'bg-[#fc4c04] text-white shadow-lg shadow-[#fc4c04]/20'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {t('gallery.grid.all_albums')}
                            </button>
                            {albums.map((album) => (
                                <button
                                    key={album.id}
                                    onClick={() => handleAlbumChange(album.id)}
                                    className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                                        selectedAlbum === album.id
                                            ? 'bg-[#fc4c04] text-white shadow-lg shadow-[#fc4c04]/20'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {album.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid de Imagens */}
                    {filteredImages.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">
                                {t('gallery.grid.no_images')}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredImages.map((image) => (
                                <RevealOnScroll key={image.id}>
                                    <div
                                        onClick={() => setSelectedImage(image)}
                                        className="cursor-pointer group"
                                    >
                                        <div className="relative aspect-[1/1] overflow-hidden rounded-xl">
                                            {/* Overlay gradiente */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                            
                                            <Image
                                                src={image.thumbnailUrl}
                                                alt={image.name || t('gallery.grid.image_alt')}
                                                width={300}
                                                height={300}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                placeholder="blur"
                                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLzY3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzb/2wBDAR0dHR4eHR0aHSQtJCEkLzYvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                            />
                                            
                                            {/* Info da imagem */}
                                            <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                <p className="text-white/70 text-sm">
                                                    {image.albumName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    )}

                    {/* Indicador de carregamento */}
                    {hasMore && (
                        <div ref={loadingRef} className="flex justify-center py-8">
                            <FaSpinner className="w-8 h-8 animate-spin text-[#fc4c04]" />
                        </div>
                    )}
                </RevealOnScroll>
            </div>

            {/* Modal */}
            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </section>
    );
} 