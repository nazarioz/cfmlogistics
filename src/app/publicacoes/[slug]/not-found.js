import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-[#646464] mb-4">
                    Publicação não encontrada
                </h1>
                <p className="text-gray-600 mb-8">
                    A publicação que você está procurando não existe ou foi removida.
                </p>
                <Link
                    href="/publicacoes"
                    className="inline-block bg-[#646464] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Ver todas as publicações
                </Link>
            </div>
        </div>
    );
} 