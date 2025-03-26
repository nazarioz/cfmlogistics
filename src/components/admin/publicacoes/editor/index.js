'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { firebase } from '@/base';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import EditorHeader from './header';
import EditorSidebar from './sidebar';
import ImageUploader from './image-uploader';
import { FaSpinner } from 'react-icons/fa';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { doc, getDoc } from 'firebase/firestore';

// Editor rico carregado dinamicamente para melhor performance
const RichTextEditor = dynamic(() => import('./rich-text'), {
    loading: () => <div className="h-96 flex items-center justify-center">
        <FaSpinner className="animate-spin text-[#221D5A] text-2xl" />
    </div>,
    ssr: false
});

export default function PublicacaoEditor({ id }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [publicacao, setPublicacao] = useState({
        id: uuidv4(),
        title: '',
        subtitle: '',
        slug: '',
        coverImage: null,
        content: '',
        excerpt: '',
        status: 'draft',
        author: 'Admin', // Depois pegar do contexto de autenticação
        categories: [],
        tags: [],
        seo: {
            title: '',
            description: '',
            keywords: ''
        },
        createdAt: new Date(),
        updatedAt: new Date()
    });

    useEffect(() => {
        if (id) {
            loadPublicacao();
        }
    }, [id]);

    const loadPublicacao = async () => {
        try {
            setIsLoading(true);
            const docRef = doc(firebase.firestore(), 'publicacoes', id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPublicacao({
                    id: docSnap.id,
                    ...data,
                    // Garantir que as datas sejam objetos Date
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                    // Garantir que o conteúdo seja string
                    content: data.content || '',
                    // Garantir que o SEO exista
                    seo: {
                        title: '',
                        description: '',
                        keywords: '',
                        ...data.seo
                    },
                    // Garantir que arrays existam
                    categories: data.categories || [],
                    tags: data.tags || []
                });
            } else {
                router.push('/admin/publicacoes');
            }
        } catch (error) {
            console.error('Erro ao carregar publicação:', error);
            alert('Erro ao carregar publicação. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    // Validação dos campos
    const validateFields = () => {
        const newErrors = {};
        
        // Apenas campos essenciais são obrigatórios
        if (!publicacao.title.trim()) {
            newErrors.title = 'O título é obrigatório';
        }
        
        if (!publicacao.content.trim()) {
            newErrors.content = 'O conteúdo é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handler para upload da imagem de capa com loading state
    const [isImageUploading, setIsImageUploading] = useState(false);

    const handleCoverImageUpload = async (file) => {
        if (!file) return;
        setIsImageUploading(true);

        try {
            const storage = getStorage();
            const imageRef = ref(storage, `publicacoes/${publicacao.id}/cover`);

            // Comprimir imagem antes do upload
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920
            });

            const snapshot = await uploadBytes(imageRef, compressedFile);
            const url = await getDownloadURL(snapshot.ref);

            setPublicacao(prev => ({
                ...prev,
                coverImage: url
            }));

            return url;
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            alert('Erro ao fazer upload da imagem. Tente novamente.');
            return null;
        } finally {
            setIsImageUploading(false);
        }
    };

    // Handler para remover imagem
    const handleRemoveImage = () => {
        if (window.confirm('Tem certeza que deseja remover a imagem?')) {
            setPublicacao(prev => ({
                ...prev,
                coverImage: null
            }));
        }
    };

    // Handler para upload de imagens do editor
    const handleContentImageUpload = useCallback(async (file) => {
        try {
            const options = {
                maxSizeMB: 1, // Tamanho máximo do arquivo em MB
                maxWidthOrHeight: 800, // Tamanho máximo de largura ou altura
                useWebWorker: true, // Usar Web Worker para compressão em segundo plano
            };

            const storage = getStorage();
            const fileRef = ref(storage, `publicacoes/${publicacao.id}/content/${uuidv4()}`);
            const compressedFile = await imageCompression(file, options);
            await uploadBytes(fileRef, compressedFile);
            const url = await getDownloadURL(fileRef);
            
            setPublicacao(prev => ({
                ...prev,
                content: prev.content.replace(/<img[^>]*>/g, (match) => match.replace(/src="[^"]*"/g, `src="${url}"`))
            }));
            
            return url;
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            return null;
        }
    }, [publicacao.id]);

    // Gerar slug automático do título
    const generateSlug = useCallback((title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }, []);

    // Handler para salvar publicação
    const handleSave = async (status = 'draft') => {
        if (!validateFields()) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        setIsLoading(true);
        try {
            const db = firebase.firestore();
            const now = new Date();
            
            const publicacaoData = {
                ...publicacao,
                status,
                updatedAt: now,
                slug: publicacao.slug || generateSlug(publicacao.title)
            };

            await db.collection('publicacoes').doc(publicacao.id).set(publicacaoData);
            
            router.push('/admin/publicacoes');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar a publicação. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <EditorHeader 
                isLoading={isLoading}
                onSaveDraft={() => handleSave('draft')}
                onPublish={() => handleSave('published')}
                publicacao={publicacao}
            />
            
            <div className="flex gap-6 p-6">
                <div className="flex-1">
                    {/* Título e Subtítulo */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <input
                            type="text"
                            placeholder="Título da publicação *"
                            value={publicacao.title}
                            onChange={(e) => setPublicacao(prev => ({
                                ...prev,
                                title: e.target.value
                            }))}
                            className={`w-full text-3xl font-semibold mb-4 p-2 border-b ${
                                errors.title ? 'border-red-500' : 'border-gray-200'
                            } focus:outline-none focus:border-[#221D5A]`}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                        
                        <input
                            type="text"
                            placeholder="Subtítulo (opcional)"
                            value={publicacao.subtitle}
                            onChange={(e) => setPublicacao(prev => ({
                                ...prev,
                                subtitle: e.target.value
                            }))}
                            className="w-full text-xl text-gray-600 p-2 border-b border-gray-200 focus:outline-none focus:border-[#221D5A]"
                        />
                    </div>

                    {/* Imagem de Capa */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-medium mb-4">Imagem de Capa</h2>
                        <ImageUploader
                            value={publicacao.coverImage}
                            onChange={handleCoverImageUpload}
                            onRemove={handleRemoveImage}
                            isUploading={isImageUploading}
                            aspectRatio={16/9}
                        />
                    </div>

                    {/* Editor Rico */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {errors.content && (
                            <p className="text-red-500 text-sm mb-2">{errors.content}</p>
                        )}
                        <RichTextEditor
                            value={publicacao.content}
                            onChange={(content) => setPublicacao(prev => ({
                                ...prev,
                                content
                            }))}
                            onImageUpload={handleContentImageUpload}
                        />
                    </div>
                </div>

                <EditorSidebar
                    publicacao={publicacao}
                    onChange={setPublicacao}
                    errors={errors}
                />
            </div>
        </div>
    );
} 