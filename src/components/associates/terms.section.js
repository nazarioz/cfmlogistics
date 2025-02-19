import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { FaDownload } from 'react-icons/fa';

export default function TermosContent() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <RevealOnScroll>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Termos e Condições
                </h1>

                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                    <p className="text-gray-600 mb-6">
                        De acordo com os Estatutos da CFM LOGISTICS todos interessados em se juntar a CFM LOGISTICS devem reunir os seguintes requisitos:
                    </p>

                    <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                        <li>Fotocópia autenticada da certidão de registo comercial;</li>
                        <li>Perfil da empresa contendo a relação de projectos e trabalhos;</li>
                        <li>Curricula vitae dos membros da direcção e responsável da empresa;</li>
                        <li>Fotocopia de último balanço e demostração de resultados;</li>
                        <li>Ter mais de 50% de Directores e Técnicos Seniores com nacionalidade Moçambicana;</li>
                    </ul>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Custos de Adesão
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Comprovativo de pagamento de Jóia única de 750,00Mt e de quota mensal de:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>1.000,00Mt – 0 até 10 Trabalhadores</li>
                            <li>2.000,00Mt – 11 até 49 Trabalhadores</li>
                            <li>3.000,00Mt – 50 Trabalhadores em diante</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Envio de Documentação
                        </h2>
                        <p className="text-gray-600">
                            Os documentos acima mencionados devem ser enviados para a Presidente da Associação de Empresas Moçambicanas de Consultoria, as Engenheira Sarifa Izidine, para a Av. 25 de Setembro, 2526, Maputo, Moçambique
                        </p>
                    </div>

                    <div className="border-t pt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Código de Conduta
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Consulte nosso código de conduta para mais informações sobre as normas e práticas da CFM LOGISTICS.
                        </p>
                        <a
                            href="/docs/cdc.pdf"
                            download="CFM LOGISTICS-Codigo-de-Conduta.pdf"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#646464] text-white rounded-md hover:bg-opacity-90 transition-colors"
                        >
                            <FaDownload />
                            Baixar Código de Conduta
                        </a>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
} 