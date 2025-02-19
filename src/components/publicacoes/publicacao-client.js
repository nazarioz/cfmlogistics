'use client';
import { useState } from 'react';
import PublicacaoView from './publicacao-view';
import PublicacaoSkeleton from './publicacao.skeleton';

export default function PublicacaoClient({ publicacao }) {
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <PublicacaoSkeleton />;
    }

    return <PublicacaoView publicacao={publicacao} />;
} 