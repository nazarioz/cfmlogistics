'use client';
import { FaSave, FaEye, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

export default function EditorHeader({ isLoading, onSaveDraft, onPublish, publicacao }) {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link
                            href="/admin/publicacoes"
                            className="text-gray-500 hover:text-[#646464]"
                        >
                            ← Voltar
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Preview */}
                        <Link
                            href={`/publicacoes/preview/${publicacao.id}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            target="_blank"
                        >
                            <FaEye className="mr-2" />
                            Visualizar
                        </Link>

                        {/* Salvar Rascunho */}
                        <button
                            onClick={onSaveDraft}
                            disabled={isLoading}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <FaSave className="mr-2" />
                            )}
                            Salvar Rascunho
                        </button>

                        {/* Publicar */}
                        <button
                            onClick={onPublish}
                            disabled={isLoading}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#646464] hover:bg-opacity-90"
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <span className="mr-2">•</span>
                            )}
                            Publicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 