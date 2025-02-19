'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/base';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import AssociadosSkeletonLoader from './skeleton';
import { toast } from 'react-hot-toast';
import { CATEGORIAS } from './editor/categories';

export default function AssociadosContent() {
    const [associados, setAssociados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all'); // all, active, inactive
    const [categoriaFilter, setCategoriaFilter] = useState('all'); // Novo estado

    useEffect(() => {
        loadAssociados();
    }, []);

    const loadAssociados = async () => {
        try {
            setIsLoading(true);
            const db = firebase.firestore();

            const snapshot = await db.collection('associados')
                .orderBy('createdAt', 'desc')
                .get();

            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().createdAt?.toDate().toLocaleDateString('pt-BR')
            }));

            setAssociados(docs);
        } catch (error) {
            console.error('Erro ao carregar associados:', error);
            alert('Erro ao carregar associados. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este associado?')) {
            return;
        }

        try {
            setIsLoading(true);

            // Deletar documento
            await deleteDoc(doc(db, 'associados', id));

            // Deletar logo se existir
            const logoRef = ref(storage, `associados/${id}/logo`);
            await deleteObject(logoRef).catch(() => { }); // Ignora erro se não existir

            // Recarregar lista
            await loadAssociados();

            alert('Associado excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir:', error);
            alert('Erro ao excluir associado. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDelete = async () => {
        if (!window.confirm(`Tem certeza que deseja excluir ${selectedItems.length} associados?`)) {
            return;
        }

        try {
            setIsLoading(true);

            for (const id of selectedItems) {
                await deleteDoc(doc(db, 'associados', id));
                const logoRef = ref(storage, `associados/${id}/logo`);
                await deleteObject(logoRef).catch(() => { });
            }

            await loadAssociados();
            setSelectedItems([]);
            alert('Associados excluídos com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir associados:', error);
            alert('Erro ao excluir associados. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredAssociados = associados
        .filter(item => {
            if (currentFilter === 'all') return true;
            return item.status === currentFilter;
        })
        .filter(item => {
            if (categoriaFilter === 'all') return true;
            return item.categorias?.includes(categoriaFilter);
        })
        .filter(item =>
            item.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nuit?.includes(searchTerm)
        );

    if (isLoading) {
        return <AssociadosSkeletonLoader />;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#646464]">Associados</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Gerencie os associados da CFM LOGISTICS
                    </p>
                </div>
                <Link
                    href="/admin/associados/novo"
                    className="bg-[#646464] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors flex items-center gap-2"
                >
                    <FaPlus size={14} />
                    Novo Associado
                </Link>
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
                    <div className="flex flex-wrap gap-4">
                        <select
                            className="border border-gray-300 rounded-md px-3 py-2"
                            value={currentFilter}
                            onChange={(e) => setCurrentFilter(e.target.value)}
                        >
                            <option value="all">Todos os status</option>
                            <option value="active">Ativos</option>
                            <option value="inactive">Inativos</option>
                        </select>

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
                    </div>

                    <div className="relative flex-1 max-w-md">
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
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedItems(associados.map(item => item.id));
                                        } else {
                                            setSelectedItems([]);
                                        }
                                    }}
                                    checked={selectedItems.length === associados.length}
                                />
                            </th>
                            <th className="px-4 py-3 text-left">Associado</th>
                            <th className="px-4 py-3 text-left">Categorias</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Data de Adesão</th>
                            <th className="px-4 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredAssociados.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => {
                                            setSelectedItems(prev => {
                                                if (prev.includes(item.id)) {
                                                    return prev.filter(id => id !== item.id);
                                                } else {
                                                    return [...prev, item.id];
                                                }
                                            });
                                        }}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12">
                                            {item.logo ? (
                                                <Image
                                                    src={item.logo}
                                                    alt={item.nome}
                                                    fill
                                                    className="object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-xl font-medium text-gray-500">
                                                        {item.nome?.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-medium block">{item.nome}</span>
                                            <span className="text-sm text-gray-500">{item.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1">
                                        {item.categorias?.slice(0, 2).map(cat => (
                                            <span
                                                key={cat}
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                        {item.categorias?.length > 2 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                                                +{item.categorias.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {item.status === 'active' ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{item.date}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/associados/${item.id}`}
                                            className="text-gray-600 hover:text-[#646464]"
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
                    Mostrando {filteredAssociados.length} de {associados.length} resultados
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