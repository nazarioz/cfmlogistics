'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import { FaBold, FaItalic, FaListUl, FaListOl, FaQuoteLeft, FaLink, FaImage, FaUndo, FaRedo } from 'react-icons/fa';

const MenuBar = ({ editor, onImageUpload }) => {
    if (!editor) {
        return null;
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await onImageUpload(file);
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        }
    };

    const setLink = () => {
        const url = window.prompt('URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2">
            {/* Texto */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
                title="Negrito"
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
                title="Itálico"
            >
                <FaItalic />
            </button>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* Listas */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
                title="Lista não ordenada"
            >
                <FaListUl />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
                title="Lista ordenada"
            >
                <FaListOl />
            </button>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* Citação */}
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-100' : ''}`}
                title="Citação"
            >
                <FaQuoteLeft />
            </button>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* Link e Imagem */}
            <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
                title="Inserir link"
            >
                <FaLink />
            </button>
            <label className="cursor-pointer">
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <div className="p-2 rounded hover:bg-gray-100" title="Inserir imagem">
                    <FaImage />
                </div>
            </label>

            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* Desfazer/Refazer */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-gray-100"
                title="Desfazer"
            >
                <FaUndo />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-gray-100"
                title="Refazer"
            >
                <FaRedo />
            </button>
        </div>
    );
};

export default function RichTextEditor({ value, onChange, onImageUpload }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Atualizar o editor quando o valor muda externamente
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [editor, value]);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <MenuBar editor={editor} onImageUpload={onImageUpload} />
            <EditorContent 
                editor={editor} 
                className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
            />
        </div>
    );
} 