'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { FaImage, FaSpinner } from 'react-icons/fa';

export default function ImageUploader({ value, onChange, aspectRatio = 1 }) {
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        try {
            await onChange(file);
        } finally {
            setIsUploading(false);
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
                className={`relative border-2 border-dashed rounded-lg overflow-hidden w-full h-[500px] ${
                    isDragActive ? 'border-[#646464]' : 'border-gray-300'
                }`}
            >
                <input {...getInputProps()} />
                
                {value ? (
                    <img
                        src={value}
                        alt="Preview"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {isUploading ? (
                            <FaSpinner className="animate-spin text-[#646464] text-3xl" />
                        ) : (
                            <div className="text-center">
                                <FaImage className="mx-auto text-gray-400 text-3xl mb-2" />
                                <p className="text-gray-500">
                                    {isDragActive ? 
                                        "Solte a imagem aqui..." : 
                                        "Arraste uma imagem ou clique para selecionar"
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 