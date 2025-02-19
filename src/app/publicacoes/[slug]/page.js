import { firebase } from '@/base';
import PublicacaoClient from '@/components/publicacoes/publicacao-client';
import { notFound } from 'next/navigation';

// Metadata dinâmico
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
        console.error('Erro ao gerar metadata:', error);
        return {
            title: 'CFM LOGISTICS',
            description: 'Associação de Empresas Moçambicanas de Consultoria'
        };
    }
}

// Gerar rotas estáticas no build
export async function generateStaticParams() {
    try {
        const db = firebase.firestore();
        const snapshot = await db.collection('publicacoes')
            .where('status', '==', 'published')
            .get();

        return snapshot.docs.map(doc => ({
            slug: doc.data().slug
        }));
    } catch (error) {
        console.error('Erro ao gerar rotas estáticas:', error);
        return [];
    }
}

// Adicione no topo do arquivo
export const revalidate = 3600; // Revalidar a cada hora

// Função para incrementar visualizações
async function incrementViews(docRef) {
    try {
        await docRef.update({
            views: firebase.firestore.FieldValue.increment(1)
        });
    } catch (error) {
        console.error('Erro ao incrementar visualizações:', error);
    }
}

// Página principal com dados do servidor
export default async function PublicacaoPage({ params }) {
    try {
        const db = firebase.firestore();
        const q = await db.collection('publicacoes')
            .where('slug', '==', params.slug)
            .where('status', '==', 'published')
            .limit(1)
            .get();

        if (q.empty) {
            notFound();
        }

        const doc = q.docs[0];
        const docRef = doc.ref;
        const data = doc.data();
        
        // Incrementar visualizações
        incrementViews(docRef);
        
        const publicacao = {
            id: doc.id,
            ...data,
            views: (data.views || 0) + 1, // Atualizar contagem localmente para feedback imediato
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate()
        };

        return <PublicacaoClient publicacao={publicacao} />;
    } catch (error) {
        console.error('Erro ao carregar publicação:', error);
        notFound();
    }
} 