'use client';
import { FaTimes } from 'react-icons/fa';

export default function ImageModal({ image, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
            <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#221D5A] bg-white/80 rounded-full p-2 z-10 hover:opacity-75"
                >
                    <FaTimes size={24} />
                </button>
                
                <div className="relative aspect-[16/9]">
                    <img
                        src={image.url}
                        className="object-contain w-full h-full"
                    />
                </div>
                
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {image.albumName}
                    </h3>
                </div>
            </div>
        </div>
    );
} 