'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/base';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch, FaSync, FaSort } from 'react-icons/fa';
import PublicacoesSkeletonLoader from './skeleton';

export default function PublicacoesContent() {
    const [publicacoes, setPublicacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all'); // all, published, draft
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(() => {
        loadPublicacoes();
    }, []);

    const loadPublicacoes = async () => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();
            const q = await db.collection('publicacoes')
                .orderBy('createdAt', 'desc')
                .get();
            const docs = q.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().createdAt.toDate().toLocaleDateString('pt-BR')
            }));
            
            setPublicacoes(docs);
        } catch (error) {
            console.error('Erro ao carregar Notícias:', error);
            alert('Erro ao carregar Notícias. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta publicação?')) {
            return;
        }

        try {
            setIsLoading(true);
            
            // Deletar documento
            await deleteDoc(doc(db, 'publicacoes', id));
            
            // Deletar imagens associadas
            const coverImageRef = ref(storage, `publicacoes/${id}/cover`);
            await deleteObject(coverImageRef).catch(() => {}); // Ignora erro se não existir
            
            // Recarregar lista
            await loadPublicacoes();
            
            alert('Publicação excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir publicação. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Tem certeza que deseja excluir ${selectedItems.length} Notícias?`)) {
            return;
        }

        try {
            setIsLoading(true);
            
            for (const id of selectedItems) {
                await deleteDoc(doc(db, 'publicacoes', id));
                const coverImageRef = ref(storage, `publicacoes/${id}/cover`);
                await deleteObject(coverImageRef).catch(() => {});
            }
            
            await loadPublicacoes();
            setSelectedItems([]);
            alert('Notícias excluídas com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir Notícias:', error);
            alert('Erro ao excluir Notícias. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredPublicacoes = publicacoes
        .filter(pub => {
            if (currentFilter === 'all') return true;
            return pub.status === currentFilter;
        })
        .filter(pub => 
            pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pub.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortField === 'title') {
                return sortDirection === 'asc' 
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            if (sortField === 'createdAt') {
                return sortDirection === 'asc'
                    ? a.createdAt.toDate() - b.createdAt.toDate()
                    : b.createdAt.toDate() - a.createdAt.toDate();
            }
            return 0;
        });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(publicacoes.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadPublicacoes();
        setIsRefreshing(false);
    };

    if (isLoading) {
        return <PublicacoesSkeletonLoader />;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Notícias
                </h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-2 text-gray-600 hover:text-[#221D5A] disabled:opacity-50 transition-colors"
                        title="Atualizar lista"
                    >
                        <FaSync className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                    <Link
                        href="/admin/publicacoes/nova"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#646464] hover:bg-opacity-90"
                    >
                        <FaPlus />
                        Nova Publicação
                    </Link>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
                    <span>{selectedItems.length} items selecionados</span>
                    <button
                        onClick={handleBulkDelete}
                        className="text-red-600 hover:text-red-800"
                    >
                        Excluir Selecionados
                    </button>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-4">
                        <select 
                            className="border border-gray-300 rounded-md px-3 py-2"
                            value={currentFilter}
                            onChange={(e) => setCurrentFilter(e.target.value)}
                        >
                            <option value="all">Todos os status</option>
                            <option value="published">Publicados</option>
                            <option value="draft">Rascunhos</option>
                        </select>
                    </div>

                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Pesquisar Notícias..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-12 px-4 py-3">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedItems.length === publicacoes.length}
                                />
                            </th>
                            <th 
                                className="px-4 py-3 text-left cursor-pointer"
                                onClick={() => handleSort('title')}
                            >
                                <div className="flex items-center gap-2">
                                    Título
                                    <FaSort className={sortField === 'title' ? 'text-[#221D5A]' : 'text-gray-400'} />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th 
                                className="px-4 py-3 text-left cursor-pointer"
                                onClick={() => handleSort('createdAt')}
                            >
                                <div className="flex items-center gap-2">
                                    Data
                                    <FaSort className={sortField === 'createdAt' ? 'text-[#221D5A]' : 'text-gray-400'} />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left">Autor</th>
                            <th className="px-4 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredPublicacoes.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12">
                                            <img
                                                src={item.coverImage}
                                                alt={item.title}
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <span className="font-medium">{item.title}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        item.status === 'published' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {item.status === 'published' ? 'Publicado' : 'Rascunho'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{item.date}</td>
                                <td className="px-4 py-3 text-gray-600">{item.author}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/publicacoes/preview/${item.id}`}
                                            className="text-gray-600 hover:text-[#221D5A]"
                                            title="Ver"
                                            target="_blank"
                                        >
                                            <FaEye size={18} />
                                        </Link>
                                        <Link
                                            href={`/admin/publicacoes/${item.id}/editar`}
                                            className="text-gray-600 hover:text-[#221D5A]"
                                            title="Editar"
                                        >
                                            <FaEdit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-gray-600 hover:text-red-600"
                                            title="Excluir"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <p className="text-gray-600">
                    Mostrando {filteredPublicacoes.length} de {publicacoes.length} resultados
                </p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        Anterior
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
} 