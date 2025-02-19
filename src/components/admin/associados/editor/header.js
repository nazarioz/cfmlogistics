'use client';
import Link from 'next/link';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function EditorHeader({ isLoading, onSave, onSaveAsDraft, isEdit }) {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link
                            href="/admin/associados"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaArrowLeft size={20} />
                        </Link>
                        <h1 className="ml-4 text-lg font-medium">
                            {isEdit ? 'Editar Associado' : 'Novo Associado'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onSaveAsDraft}
                            disabled={isLoading}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            Salvar como Inativo
                        </button>
                        <button
                            onClick={onSave}
                            disabled={isLoading}
                            className="px-4 py-2 text-white bg-[#646464] rounded-md hover:bg-opacity-90 disabled:opacity-50 flex items-center gap-2"
                        >
                            <FaSave />
                            {isLoading ? 'Salvando...' : 'Salvar e Ativar'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
} 