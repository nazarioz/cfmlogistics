import PublicacaoEditor from '@/components/admin/publicacoes/editor';

export const metadata = {
    title: "Editar Publicação | Admin CFM LOGISTICS",
    description: "Editar publicação existente",
}

export default function EditarPublicacaoPage({ params }) {
    return <PublicacaoEditor id={params.id} />;
} 