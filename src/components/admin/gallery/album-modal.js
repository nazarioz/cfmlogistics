'use client';
import { useState, useEffect } from 'react';
import { firebase } from '@/base';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

export default function AlbumModal({ isOpen, onClose, onSave, album }) {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (album) {
            setName(album.name);
        } else {
            setName('');
        }
    }, [album]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const db = firebase.firestore();

            if (album) {
                await db.collection('albums').doc(album.id).update({
                    name,
                    updatedAt: new Date()
                });
                toast.success('Álbum atualizado com sucesso');
            } else {
                await db.collection('albums').add({
                    name,
                    createdAt: new Date()
                });
                toast.success('Álbum criado com sucesso');
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar álbum:', error);
            toast.error('Erro ao salvar álbum');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    {album ? 'Editar Álbum' : 'Novo Álbum'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome do Álbum
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-[#221D5A] text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <FaSpinner className="animate-spin" />
                            ) : album ? (
                                'Atualizar'
                            ) : (
                                'Criar'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 