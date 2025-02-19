'use client';
import { useState } from 'react';
import { FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

export default function FileUploader({ label, onChange, accept = '.pdf,.doc,.docx' }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
                setError('Arquivo muito grande. Máximo 5MB.');
                return;
            }
            
            setFile(selectedFile);
            setError(null);
            onChange(selectedFile);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#646464] transition-colors">
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="text-center">
                    {file ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                            <FaCheck />
                            <span>{file.name}</span>
                        </div>
                    ) : (
                        <div className="text-gray-600">
                            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-1">Clique ou arraste o arquivo aqui</p>
                            <p className="text-sm text-gray-500">PDF, DOC até 5MB</p>
                        </div>
                    )}
                </div>
            </div>
            
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
} 