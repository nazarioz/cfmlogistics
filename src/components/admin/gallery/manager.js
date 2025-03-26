'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import { toast } from 'react-hot-toast';
import { FaPlus, FaSpinner, FaTrash, FaPencilAlt, FaImages } from 'react-icons/fa';
import AlbumModal from './album-modal';
import ImageUploadModal from './image-upload-modal';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export default function GalleryManager() {
    const [albums, setAlbums] = useState([]);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlbumModal, setShowAlbumModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [currentAlbum, setCurrentAlbum] = useState(null);

    useEffect(() => {
        loadAlbums();
    }, []);

    useEffect(() => {
        if (currentAlbum) {
            loadImages(currentAlbum);
        }
    }, [currentAlbum]);

    const loadAlbums = async () => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();
            const albumsSnapshot = await db.collection('albums').orderBy('name').get();
            const albumsData = albumsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbums(albumsData);

            // Se tiver álbuns e nenhum álbum selecionado, seleciona o primeiro
            if (albumsData.length > 0 && !currentAlbum) {
                setCurrentAlbum(albumsData[0].id);
            }
        } catch (error) {
            console.error('Erro ao carregar álbuns:', error);
            toast.error('Erro ao carregar álbuns');
        } finally {
            setIsLoading(false);
        }
    };

    const loadImages = async (albumId) => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();
            const imagesSnapshot = await db.collection('gallery')
                .where('albumId', '==', albumId)
                .orderBy('createdAt', 'desc')
                .get();
            
            const imagesData = imagesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setImages(imagesData);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
            toast.error('Erro ao carregar imagens');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteImage = async (imageId, imageUrl) => {
        try {
            if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;

            setIsLoading(true);
            const db = firebase.firestore();
            const storage = getStorage();

            // Deletar imagem do Storage
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);

            // Deletar documento do Firestore
            await db.collection('gallery').doc(imageId).delete();

            toast.success('Imagem excluída com sucesso');
            loadImages(currentAlbum);
        } catch (error) {
            console.error('Erro ao excluir imagem:', error);
            toast.error('Erro ao excluir imagem');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAlbum = async (albumId) => {
        try {
            if (!confirm('Tem certeza que deseja excluir este álbum e todas as suas imagens?')) return;

            setIsLoading(true);
            const db = firebase.firestore();
            const storage = getStorage();

            // Buscar todas as imagens do álbum
            const imagesSnapshot = await db.collection('gallery')
                .where('albumId', '==', albumId)
                .get();

            // Deletar cada imagem do Storage e Firestore
            for (const doc of imagesSnapshot.docs) {
                const imageUrl = doc.data().url;
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
                await doc.ref.delete();
            }

            // Deletar o álbum
            await db.collection('albums').doc(albumId).delete();

            toast.success('Álbum excluído com sucesso');
            loadAlbums();
            setCurrentAlbum(null);
            setImages([]);
        } catch (error) {
            console.error('Erro ao excluir álbum:', error);
            toast.error('Erro ao excluir álbum');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <FaSpinner className="w-8 h-8 animate-spin text-[#221D5A]" />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Galeria de Fotos</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gerencie os álbuns e fotos da associação
                    </p>
                </div>
                <button
                    onClick={() => setShowAlbumModal(true)}
                    className="px-4 py-2 bg-[#646464] text-white rounded-md hover:bg-opacity-90 flex items-center gap-2"
                >
                    <FaPlus size={16} />
                    Criar Novo Álbum
                </button>
            </div>

            {/* Álbuns */}
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Álbuns</h2>
                {albums.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <FaImages className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum álbum criado</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Comece criando um novo álbum para organizar suas fotos
                        </p>
                        <button
                            onClick={() => setShowAlbumModal(true)}
                            className="mt-4 px-4 py-2 bg-[#221D5A] text-white rounded-md hover:bg-opacity-90"
                        >
                            Criar Álbum
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {albums.map(album => (
                            <div
                                key={album.id}
                                className={`bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                                    currentAlbum === album.id ? 'ring-2 ring-[#646464]' : ''
                                }`}
                                onClick={() => setCurrentAlbum(album.id)}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-gray-900">{album.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedAlbum(album);
                                                setShowAlbumModal(true);
                                            }}
                                            className="p-1.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                            title="Editar álbum"
                                        >
                                            <FaPencilAlt size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteAlbum(album.id);
                                            }}
                                            className="p-1.5 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
                                            title="Excluir álbum"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {images.filter(img => img.albumId === album.id).length} fotos
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Fotos do Álbum Selecionado */}
            {currentAlbum && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Fotos do Álbum: {albums.find(a => a.id === currentAlbum)?.name}
                        </h2>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                        >
                            <FaPlus size={16} />
                            Adicionar Fotos
                        </button>
                    </div>

                    {images.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <FaImages className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                Nenhuma foto neste álbum
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Comece adicionando algumas fotos ao álbum
                            </p>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Adicionar Fotos
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map(image => (
                                <div key={image.id} className="group relative">
                                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                                        <img
                                            src={image.url}
                                            alt={image.name || 'Imagem da galeria'}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                                        <button
                                            onClick={() => handleDeleteImage(image.id, image.url)}
                                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            title="Excluir imagem"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                    {image.name && (
                                        <p className="mt-2 text-sm text-gray-600 truncate">
                                            {image.name}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Modais */}
            <AlbumModal
                isOpen={showAlbumModal}
                onClose={() => {
                    setShowAlbumModal(false);
                    setSelectedAlbum(null);
                }}
                onSave={loadAlbums}
                album={selectedAlbum}
            />

            <ImageUploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                albumId={currentAlbum}
                onUploadComplete={() => loadImages(currentAlbum)}
            />
        </div>
    );
} 