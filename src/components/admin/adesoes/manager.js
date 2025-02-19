'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import { toast, Toaster } from 'react-hot-toast';
import AdesaoDetails from './details';
import { Tab } from '@headlessui/react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AdesaoSkeleton from './skeleton';

export default function AdesoesManager() {
    const [adesoes, setAdesoes] = useState({ pending: [], responded: [] });
    const [selectedAdesao, setSelectedAdesao] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [justificativa, setJustificativa] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        loadAdesoes();
    }, []);

    const loadAdesoes = async () => {
        try {
            const db = firebase.firestore();
            const snapshot = await db.collection('adesoes').get();
            
            const pending = [];
            const responded = [];
            
            snapshot.forEach(doc => {
                const adesao = { id: doc.id, ...doc.data() };
                if (adesao.status === 'pending') {
                    pending.push(adesao);
                } else {
                    responded.push(adesao);
                }
            });

            setAdesoes({ 
                pending: pending.sort((a, b) => b.createdAt - a.createdAt),
                responded: responded.sort((a, b) => b.createdAt - a.createdAt)
            });
        } catch (error) {
            console.error('Erro ao carregar adesões:', error);
            toast.error('Erro ao carregar pedidos de adesão');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAprovar = async (adesao) => {
        setIsProcessing(true);
        try {
            const db = firebase.firestore();
            
            // Criar novo associado
            const associadoData = {
                ...adesao,
                status: 'inactive',
                createdAt: new Date(),
            };
            delete associadoData.aceitaTermos;
            
            await db.collection('associados').doc(adesao.id).set(associadoData);
            
            // Atualizar status da adesão
            await db.collection('adesoes').doc(adesao.id).update({
                status: 'approved',
                respondedAt: new Date()
            });

            toast.success('Pedido aprovado com sucesso');
            loadAdesoes();
            setSelectedAdesao(null);
        } catch (error) {
            console.error('Erro ao aprovar pedido:', error);
            toast.error('Erro ao aprovar pedido');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReprovar = async (adesao) => {
        if (!justificativa.trim()) {
            toast.error('Por favor, forneça uma justificativa');
            return;
        }

        setIsProcessing(true);
        try {
            const db = firebase.firestore();
            await db.collection('adesoes').doc(adesao.id).update({
                status: 'rejected',
                justificativa,
                respondedAt: new Date()
            });

            toast.success('Pedido reprovado');
            loadAdesoes();
            setShowModal(false);
            setSelectedAdesao(null);
            setJustificativa('');
        } catch (error) {
            console.error('Erro ao reprovar pedido:', error);
            toast.error('Erro ao reprovar pedido');
        } finally {
            setIsProcessing(false);
        }
    };

    // Função para paginar os resultados
    const paginateResults = (items) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    };

    // Função para renderizar a paginação
    const Pagination = ({ totalItems }) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}</span> a{' '}
                            <span className="font-medium">{Math.min(totalItems, currentPage * itemsPerPage)}</span> de{' '}
                            <span className="font-medium">{totalItems}</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:opacity-50"
                            >
                                <span className="sr-only">Anterior</span>
                                <FaChevronLeft className="h-4 w-4" />
                            </button>
                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                            currentPage === page
                                                ? 'z-10 bg-[#646464] text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#646464]'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:opacity-50"
                            >
                                <span className="sr-only">Próxima</span>
                                <FaChevronRight className="h-4 w-4" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        );
    };

    // Atualizar o filtro para incluir paginação
    const filteredAdesoes = {
        pending: paginateResults(
            adesoes?.pending?.filter(adesao => 
                adesao?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                adesao?.nuit?.includes(searchTerm) ||
                adesao?.email?.toLowerCase().includes(searchTerm.toLowerCase())
            ) || []
        ),
        responded: paginateResults(
            adesoes?.responded?.filter(adesao => 
                adesao?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                adesao?.nuit?.includes(searchTerm) ||
                adesao?.email?.toLowerCase().includes(searchTerm.toLowerCase())
            ) || []
        ),
        totalPending: adesoes?.pending?.filter(adesao => 
            adesao?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            adesao?.nuit?.includes(searchTerm) ||
            adesao?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )?.length || 0,
        totalResponded: adesoes?.responded?.filter(adesao => 
            adesao?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            adesao?.nuit?.includes(searchTerm) ||
            adesao?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )?.length || 0
    };

    // Resetar página quando mudar a pesquisa
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50/30">
                <div className="p-8">
                    <div className="mx-auto">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6">
                                <AdesaoSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/30">
            <div className="p-8">
                <Toaster position="top-right" />
                
                <div className="mx-auto">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Pedidos de Adesão
                                </h1>

                                {/* Barra de Pesquisa */}
                                <div className="relative w-64">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#646464] focus:border-transparent"
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
                                    <Tab className={({ selected }) =>
                                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                                        ${selected 
                                            ? 'bg-white text-[#646464] shadow'
                                            : 'text-gray-600 hover:text-[#646464]'
                                        }`
                                    }>
                                        Pendentes ({filteredAdesoes.totalPending})
                                    </Tab>
                                    <Tab className={({ selected }) =>
                                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                                        ${selected 
                                            ? 'bg-white text-[#646464] shadow'
                                            : 'text-gray-600 hover:text-[#646464]'
                                        }`
                                    }>
                                        Respondidos ({filteredAdesoes.totalResponded})
                                    </Tab>
                                </Tab.List>

                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="bg-white rounded-lg">
                                            {filteredAdesoes.pending.length === 0 ? (
                                                <p className="text-center text-gray-500 py-8">
                                                    {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum pedido pendente'}
                                                </p>
                                            ) : (
                                                <div className="divide-y">
                                                    {filteredAdesoes.pending.map(adesao => (
                                                        <div
                                                            key={adesao.id}
                                                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                                                            onClick={() => setSelectedAdesao(adesao)}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="font-medium text-gray-900">
                                                                        {adesao.nome}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        NUIT: {adesao.nuit}
                                                                    </p>
                                                                </div>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(adesao?.createdAt?.toDate()).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <Pagination totalItems={filteredAdesoes.totalPending} />
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        <div className="bg-white rounded-lg">
                                            {filteredAdesoes.responded.length === 0 ? (
                                                <p className="text-center text-gray-500 py-8">
                                                    {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum pedido respondido'}
                                                </p>
                                            ) : (
                                                <div className="divide-y">
                                                    {filteredAdesoes.responded.map(adesao => (
                                                        <div
                                                            key={adesao.id}
                                                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                                                            onClick={() => setSelectedAdesao(adesao)}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="font-medium text-gray-900">
                                                                        {adesao.nome}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        NUIT: {adesao.nuit}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <span className={`text-sm px-2 py-1 rounded ${
                                                                        adesao.status === 'approved'
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                        {adesao.status === 'approved' ? 'Aprovado' : 'Reprovado'}
                                                                    </span>
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        {new Date(adesao?.respondedAt?.toDate()).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <Pagination totalItems={filteredAdesoes.totalResponded} />
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modais existentes */}
            {selectedAdesao && (
                <AdesaoDetails
                    adesao={selectedAdesao}
                    onClose={() => setSelectedAdesao(null)}
                    onAprovar={handleAprovar}
                    onReprovar={() => setShowModal(true)}
                    isProcessing={isProcessing}
                />
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Justificativa da Reprovação
                        </h3>
                        <textarea
                            value={justificativa}
                            onChange={(e) => setJustificativa(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            rows={4}
                            placeholder="Digite o motivo da reprovação..."
                        />
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setJustificativa('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleReprovar(selectedAdesao)}
                                disabled={isProcessing}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            >
                                {isProcessing ? 'Processando...' : 'Reprovar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 