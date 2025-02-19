'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import Image from 'next/image';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { FaBuilding, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import DetailsSkeletonLoader from './details.skeleton';

export default function AssociateDetails({ id }) {
    const [associado, setAssociado] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAssociado();
    }, [id]);

    const loadAssociado = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const db = firebase.firestore();
            const doc = await db.collection('associados').doc(id).get();

            if (!doc.exists) {
                setError('Associado não encontrado');
                return;
            }

            setAssociado({
                id: doc.id,
                ...doc.data()
            });
        } catch (error) {
            console.error('Erro ao carregar associado:', error);
            setError('Erro ao carregar dados do associado');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <DetailsSkeletonLoader />;
    }

    if (error || !associado) {
        return (
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center py-12">
                    <p className="text-red-500">{error || 'Associado não encontrado'}</p>
                    <Link href="/associados" className="text-[#646464] hover:underline mt-4 inline-block">
                        Voltar para lista de associados
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <RevealOnScroll>
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><Link href="/" className="hover:text-[#646464]">Home</Link></li>
                        <li>/</li>
                        <li><Link href="/associados" className="hover:text-[#646464]">Associados</Link></li>
                        <li>/</li>
                        <li className="text-[#646464]">{associado.nome}</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative w-32 h-32 flex-shrink-0">
                            {associado.logo ? (
                                <Image
                                    src={associado.logo}
                                    alt={associado.nome}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <FaBuilding className="text-gray-400 text-4xl" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {associado.nome}
                            </h1>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {associado.categorias?.map(cat => (
                                    <span
                                        key={cat}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6">
                                {associado.descricao}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {associado.email && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaEnvelope className="text-[#646464]" />
                                        <a href={`mailto:${associado.email}`} className="hover:text-[#646464]">
                                            {associado.email}
                                        </a>
                                    </div>
                                )}
                                
                                {associado.telefone && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaPhone className="text-[#646464]" />
                                        <a href={`tel:${associado.telefone}`} className="hover:text-[#646464]">
                                            {associado.telefone}
                                        </a>
                                    </div>
                                )}
                                
                                {associado.website && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaGlobe className="text-[#646464]" />
                                        <a 
                                            href={associado.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="hover:text-[#646464]"
                                        >
                                            {associado.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}
                                
                                {associado.endereco && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaMapMarkerAlt className="text-[#646464]" />
                                        <span>
                                            {associado.endereco}, {associado.cidade}, {associado.provincia}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pessoa de Contato */}
                {associado.pessoaContato && (
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Pessoa de Contato
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Nome</p>
                                <p className="font-medium">{associado.pessoaContato.nome}</p>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Cargo</p>
                                <p className="font-medium">{associado.pessoaContato.cargo}</p>
                            </div>
                            
                            {associado.pessoaContato.email && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email</p>
                                    <a 
                                        href={`mailto:${associado.pessoaContato.email}`}
                                        className="text-[#646464] hover:underline"
                                    >
                                        {associado.pessoaContato.email}
                                    </a>
                                </div>
                            )}
                            
                            {associado.pessoaContato.telefone && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Telefone</p>
                                    <a 
                                        href={`tel:${associado.pessoaContato.telefone}`}
                                        className="text-[#646464] hover:underline"
                                    >
                                        {associado.pessoaContato.telefone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </RevealOnScroll>
        </section>
    );
} 