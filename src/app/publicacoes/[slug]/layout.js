export async function generateMetadata({ params }) {
    try {
        const db = firebase.firestore();
        const q = await db.collection('publicacoes')
            .where('slug', '==', params.slug)
            .where('status', '==', 'published')
            .limit(1)
            .get();

        if (q.empty) {
            return {
                title: 'Publicação não encontrada | CFM LOGISTICS',
                description: 'A publicação que você está procurando não existe ou foi removida.'
            };
        }

        const publicacao = q.docs[0].data();

        return {
            title: `${publicacao.title} | CFM LOGISTICS`,
            description: publicacao.excerpt || publicacao.seo?.description,
            openGraph: {
                title: publicacao.seo?.title || publicacao.title,
                description: publicacao.seo?.description || publicacao.excerpt,
                images: [publicacao.coverImage],
            },
        };
    } catch (error) {
        return {
            title: 'CFM LOGISTICS',
            description: 'Associação de Empresas Moçambicanas de Consultoria'
        };
    }
}

export default function PublicacaoLayout({ children }) {
    return children;
} 