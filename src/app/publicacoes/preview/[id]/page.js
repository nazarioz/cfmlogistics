'use client';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firebase } from '@/base';
import PublicacaoView from '@/components/publicacoes/publicacao-view';
import PreviewBanner from '@/components/publicacoes/preview-banner';
import PublicacaoSkeleton from '@/components/publicacoes/publicacao.skeleton';

export default function PublicacaoPreviewPage({ params }) {
    const [publicacao, setPublicacao] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPublicacao();
    }, [params.id]);

    const loadPublicacao = async () => {
        try {
            const docRef = doc(firebase.firestore(), 'publicacoes', params.id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setPublicacao({
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate()
                });
            }
        } catch (error) {
            console.error('Erro ao carregar publicação:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <PublicacaoSkeleton />;
    }

    if (!publicacao) {
        return <div>Publicação não encontrada</div>;
    }

    return (
        <>
            <PreviewBanner />
            <PublicacaoView publicacao={publicacao} />
        </>
    );
} 