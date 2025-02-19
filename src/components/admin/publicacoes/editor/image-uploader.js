'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { FaImage, FaSpinner, FaTrash } from 'react-icons/fa';

export default function ImageUploader({ 
    value, 
    onChange, 
    onRemove,
    isUploading = false,
    aspectRatio = 16/9 
}) {
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            await onChange(file);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        multiple: false,
        disabled: isUploading
    });

    return (
        <div>
            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-lg overflow-hidden transition-colors w-full h-[500px] ${                    
                isDragActive ? 'border-[#646464] bg-gray-50' : 'border-gray-300'
                } ${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}
            >
                <input {...getInputProps()} />
                
                {value ? (
                    <>
                        <img    
                            src={value}
                            alt="Cover"
                            className="object-cover w-full h-full"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove();
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                            <FaTrash size={14} />
                        </button>
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {isUploading ? (
                            <div className="flex flex-col items-center">
                                <FaSpinner className="animate-spin text-[#646464] text-3xl mb-2" />
                                <p className="text-gray-500 text-center">Carregando imagem...</p>
                            </div>
                        ) : (
                            <div className="text-center p-4">
                                <FaImage className="mx-auto text-gray-400 text-3xl mb-2" />
                                <p className="text-gray-500">
                                    {isDragActive ? 
                                        "Solte a imagem aqui..." : 
                                        "Arraste uma imagem ou clique para selecionar"
                                    }
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Tamanho recomendado: 1920x1080px
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Remover botão de remover aqui, agora está dentro da imagem */}
        </div>
    );
} 