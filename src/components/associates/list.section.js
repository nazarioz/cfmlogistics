'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { FaSearch, FaBuilding } from 'react-icons/fa';
import { CATEGORIAS } from '@/components/admin/associados/editor/categories';
import { PROVINCIAS } from '@/components/admin/associados/editor/provinces';
import AssociatesListSkeleton from './list.skeleton';

export default function AssociatesList() {
    const [associados, setAssociados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoriaFilter, setCategoriaFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showAll, setShowAll] = useState(false);
    const INITIAL_DISPLAY_COUNT = 9;

    useEffect(() => {
        loadAssociados();
    }, []);

    const loadAssociados = async () => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();
            const snapshot = await db.collection('associados')
                .where('status', '==', 'active')
                .orderBy('createdAt', 'desc')
                .get();

            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setAssociados(docs);
        } catch (error) {
            console.error('Erro ao carregar associados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const sortAssociados = (items) => {
        return [...items].sort((a, b) => {
            const comparison = a.nome.localeCompare(b.nome);
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    };

    const filteredAssociados = sortAssociados(
        associados
            .filter(item => {
                if (categoriaFilter === 'all') return true;
                return item.categorias?.includes(categoriaFilter);
            })
            .filter(item =>
                item.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    const displayedAssociados = showAll 
        ? filteredAssociados 
        : filteredAssociados.slice(0, INITIAL_DISPLAY_COUNT);

    const truncateDescription = (text, maxLength = 120) => {
        if (!text) return '';
        text = text.trim();
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    if (isLoading) {
        return <AssociatesListSkeleton />;
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <RevealOnScroll>
                <h2 className="text-2xl font-semibold text-[#646464] mb-8">
                    Nossos Associados
                </h2>

                {/* Filtros em uma linha */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Barra de pesquisa */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Pesquisar associados..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaSearch />
                            </span>
                        </div>

                        {/* Filtro de categoria */}
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2"
                            value={categoriaFilter}
                            onChange={(e) => setCategoriaFilter(e.target.value)}
                        >
                            <option value="all">Todas as categorias</option>
                            {CATEGORIAS.map(categoria => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </select>

                        {/* Ordenação A-Z / Z-A */}
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                </div>

                {/* Grid de Associados */}
                {filteredAssociados.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            Nenhum associado encontrado para sua busca.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedAssociados.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/associados/${item.id}`}
                                    className="block group"
                                >
                                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-16 h-16">
                                                {item.logo ? (
                                                    <Image
                                                        src={item.logo}
                                                        alt={item.nome}
                                                        fill
                                                        className="object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <FaBuilding className="text-gray-400 text-2xl" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg text-gray-900 group-hover:text-[#646464]">
                                                    {item.nome}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.provincia}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.categorias?.slice(0, 3).map(cat => (
                                                <span
                                                    key={cat}
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                            {item.categorias?.length > 3 && (
                                                <span 
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#646464] text-white"
                                                    title={item.categorias.slice(3).join(', ')}
                                                >
                                                    +{item.categorias.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {truncateDescription(item.descricao)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {!showAll && filteredAssociados.length > INITIAL_DISPLAY_COUNT && (
                            <div className="text-center mt-8">
                                <button 
                                    onClick={() => setShowAll(true)}
                                    className="inline-flex items-center px-4 py-2 border border-[#646464] text-[#646464] rounded-md hover:bg-[#646464] hover:text-white transition-colors"
                                >
                                    Ver Mais
                                </button>
                            </div>
                        )}
                    </>
                )}
            </RevealOnScroll>
        </section>
    );
} 