'use client';
import { useState } from 'react';
import { firebase } from '@/base';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-hot-toast';
import { FaSpinner, FaUpload } from 'react-icons/fa';

export default function ImageUploadModal({ isOpen, onClose, albumId, onUploadComplete }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = async () => {
        if (files.length === 0) {
            toast.error('Selecione pelo menos uma imagem');
            return;
        }

        try {
            setUploading(true);
            const storage = getStorage();
            const db = firebase.firestore();
            const totalFiles = files.length;

            for (let i = 0; i < totalFiles; i++) {
                const file = files[i];
                const fileName = `${Date.now()}_${file.name}`;
                const storageRef = ref(storage, `gallery/${albumId}/${fileName}`);

                // Upload do arquivo
                await uploadBytes(storageRef, file);
                
                // Obter URL do arquivo
                const url = await getDownloadURL(storageRef);
                
                // Criar documento na galeria
                await db.collection('gallery').add({
                    url,
                    name: file.name,
                    albumId,
                    createdAt: new Date()
                });

                // Atualizar progresso
                setProgress(((i + 1) / totalFiles) * 100);
            }

            toast.success('Upload concluído com sucesso');
            onUploadComplete();
            onClose();
        } catch (error) {
            console.error('Erro no upload:', error);
            toast.error('Erro ao fazer upload das imagens');
        } finally {
            setUploading(false);
            setProgress(0);
            setFiles([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Upload de Fotos</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selecione as imagens
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setFiles(Array.from(e.target.files))}
                        className="w-full"
                    />
                </div>

                {uploading && (
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Upload em progresso: {Math.round(progress)}%
                        </p>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={uploading}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading || files.length === 0}
                        className="px-4 py-2 bg-[#221D5A] text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 flex items-center gap-2"
                    >
                        {uploading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <FaUpload />
                                Fazer Upload
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
} 