'use client';
import { FaTimes } from 'react-icons/fa';

export default function AdesaoDetails({ adesao, onClose, onAprovar, onReprovar, isProcessing }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Detalhes do Pedido
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dados da Empresa */}
                        <div>
                            <h3 className="font-medium text-gray-900 mb-4">Dados da Empresa</h3>
                            <dl className="space-y-3">
                                <div>
                                    <dt className="text-sm text-gray-500">Nome</dt>
                                    <dd className="text-gray-900">{adesao.nome}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">NUIT</dt>
                                    <dd className="text-gray-900">{adesao.nuit}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Email</dt>
                                    <dd className="text-gray-900">{adesao.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Telefone</dt>
                                    <dd className="text-gray-900">{adesao.telefone}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Endereço</dt>
                                    <dd className="text-gray-900">{adesao.endereco}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Cidade</dt>
                                    <dd className="text-gray-900">{adesao.cidade}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Província</dt>
                                    <dd className="text-gray-900">{adesao.provincia}</dd>
                                </div>
                                {adesao.website && (
                                    <div>
                                        <dt className="text-sm text-gray-500">Website</dt>
                                        <dd className="text-gray-900">{adesao.website}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* Pessoa de Contato */}
                        <div>
                            <h3 className="font-medium text-gray-900 mb-4">Pessoa de Contato</h3>
                            <dl className="space-y-3">
                                <div>
                                    <dt className="text-sm text-gray-500">Nome</dt>
                                    <dd className="text-gray-900">{adesao.pessoaContato.nome}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Cargo</dt>
                                    <dd className="text-gray-900">{adesao.pessoaContato.cargo}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Email</dt>
                                    <dd className="text-gray-900">{adesao.pessoaContato.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Telefone</dt>
                                    <dd className="text-gray-900">{adesao.pessoaContato.telefone}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-medium text-gray-900 mb-4">Informações Adicionais</h3>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm text-gray-500">Categorias</dt>
                                <dd className="text-gray-900">
                                    {adesao.categorias.join(', ')}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Número de Trabalhadores</dt>
                                <dd className="text-gray-900">{adesao.numeroTrabalhadores}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Periodicidade de Pagamento</dt>
                                <dd className="text-gray-900">{adesao.periodicidade}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Data do Pedido</dt>
                                <dd className="text-gray-900">
                                    {new Date(adesao.createdAt.toDate()).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {adesao.status === 'pending' && (
                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                onClick={() => onReprovar(adesao)}
                                disabled={isProcessing}
                                className="px-4 py-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                            >
                                Reprovar
                            </button>
                            <button
                                onClick={() => onAprovar(adesao)}
                                disabled={isProcessing}
                                className="px-4 py-2 bg-[#646464] text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
                            >
                                Aprovar
                            </button>
                        </div>
                    )}

                    {adesao.status === 'rejected' && (
                        <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                            <h4 className="text-sm font-medium text-red-800">Justificativa da Reprovação</h4>
                            <p className="mt-2 text-sm text-red-700">{adesao.justificativa}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 