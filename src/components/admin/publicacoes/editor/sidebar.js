'use client';
import { useState } from 'react';
import { FaCog, FaTags, FaImage, FaSeo } from 'react-icons/fa';

export default function EditorSidebar({ publicacao, onChange }) {
    const [activeTab, setActiveTab] = useState('seo');

    const updateSeo = (field, value) => {
        onChange(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [field]: value
            }
        }));
    };

    const handleAddTag = (tag) => {
        if (!publicacao.tags.includes(tag)) {
            onChange(prev => ({
                ...prev,
                tags: [...prev.tags, tag]
            }));
        }
    };

    const handleRemoveTag = (tag) => {
        onChange(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }));
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-sm h-fit">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('seo')}
                    className={`flex-1 py-3 text-sm font-medium ${
                        activeTab === 'seo' 
                            ? 'text-[#221D5A] border-b-2 border-[#221D5A]' 
                            : 'text-gray-500'
                    }`}
                >
                    SEO
                </button>
                <button
                    onClick={() => setActiveTab('tags')}
                    className={`flex-1 py-3 text-sm font-medium ${
                        activeTab === 'tags' 
                            ? 'text-[#221D5A] border-b-2 border-[#221D5A]' 
                            : 'text-gray-500'
                    }`}
                >
                    Tags
                </button>
                <button
                    onClick={() => setActiveTab('config')}
                    className={`flex-1 py-3 text-sm font-medium ${
                        activeTab === 'config' 
                            ? 'text-[#221D5A] border-b-2 border-[#221D5A]' 
                            : 'text-gray-500'
                    }`}
                >
                    Config
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {activeTab === 'seo' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Título
                            </label>
                            <input
                                type="text"
                                value={publicacao.seo.title}
                                onChange={(e) => updateSeo('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Descrição
                            </label>
                            <textarea
                                value={publicacao.seo.description}
                                onChange={(e) => updateSeo('description', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Palavras-chave
                            </label>
                            <input
                                type="text"
                                value={publicacao.seo.keywords}
                                onChange={(e) => updateSeo('keywords', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Separadas por vírgula"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'tags' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Adicionar Tag
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Nova tag"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddTag(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {publicacao.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 text-gray-500 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'config' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={publicacao.slug}
                                onChange={(e) => onChange(prev => ({
                                    ...prev,
                                    slug: e.target.value
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Resumo
                            </label>
                            <textarea
                                value={publicacao.excerpt}
                                onChange={(e) => onChange(prev => ({
                                    ...prev,
                                    excerpt: e.target.value
                                }))}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 