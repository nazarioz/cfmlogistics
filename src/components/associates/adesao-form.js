'use client';
import { useState } from 'react';
import { firebase } from '@/base';
import { v4 as uuidv4 } from 'uuid';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { toast, Toaster } from 'react-hot-toast';
import { CATEGORIAS } from '@/components/admin/associados/editor/categories';
import { PROVINCIAS } from '@/components/admin/associados/editor/provinces';
import { CARGOS } from '@/components/admin/associados/editor/positions';
import { PLANOS } from '@/components/admin/associados/editor/categories';
import { PERIODICIDADES } from '@/components/admin/associados/editor/payment-periods';

// Componente de Loading Overlay
function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#646464] border-t-transparent"></div>
                <span className="text-gray-700">Enviando pedido...</span>
            </div>
        </div>
    );
}

export default function AdesaoForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: uuidv4(),
        nome: '',
        email: '',
        telefone: '',
        nuit: '',
        endereco: '',
        cidade: '',
        provincia: '',
        website: '',
        descricao: '',
        categorias: [],
        numeroTrabalhadores: '',
        pessoaContato: {
            nome: '',
            cargo: '',
            email: '',
            telefone: ''
        },
        status: 'pending',
        createdAt: new Date(),
        aceitaTermos: false
    });

    const validateFields = () => {
        const newErrors = {};
        
        if (!formData.nome.trim()) {
            newErrors.nome = 'O nome da empresa é obrigatório';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'O email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.nuit?.trim()) {
            newErrors.nuit = 'O NUIT é obrigatório';
        } else if (!/^\d{9}$/.test(formData.nuit)) {
            newErrors.nuit = 'O NUIT deve ter exatamente 9 dígitos';
        }

        if (!formData.telefone) {
            newErrors.telefone = 'O telefone é obrigatório';
        } else if (!/^(\+258|258)?\d{9}$/.test(formData.telefone.replace(/\s/g, ''))) {
            newErrors.telefone = 'Formato inválido. Use: +258 XX XXX XXXX ou apenas 9 dígitos';
        }

        if (!formData.endereco?.trim()) {
            newErrors.endereco = 'O endereço é obrigatório';
        }

        if (!formData.cidade?.trim()) {
            newErrors.cidade = 'A cidade é obrigatória';
        }

        if (!formData.provincia) {
            newErrors.provincia = 'A província é obrigatória';
        }

        if (!formData.numeroTrabalhadores) {
            newErrors.numeroTrabalhadores = 'O número de trabalhadores é obrigatório';
        }

        if (formData.categorias.length === 0) {
            newErrors.categorias = 'Selecione pelo menos uma categoria';
        }

        if (!formData.pessoaContato.nome?.trim()) {
            newErrors.pessoaContatoNome = 'O nome da pessoa de contato é obrigatório';
        }

        if (!formData.pessoaContato.cargo) {
            newErrors.pessoaContatoCargo = 'O cargo é obrigatório';
        }

        if (!formData.pessoaContato.email?.trim()) {
            newErrors.pessoaContatoEmail = 'O email da pessoa de contato é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.pessoaContato.email)) {
            newErrors.pessoaContatoEmail = 'Email inválido';
        }

        if (!formData.pessoaContato.telefone) {
            newErrors.pessoaContatoTelefone = 'O telefone da pessoa de contato é obrigatório';
        } else if (!/^(\+258|258)?\d{9}$/.test(formData.pessoaContato.telefone.replace(/\s/g, ''))) {
            newErrors.pessoaContatoTelefone = 'Formato inválido. Use: +258 XX XXX XXXX ou apenas 9 dígitos';
        }

        if (!formData.aceitaTermos) {
            newErrors.aceitaTermos = 'Você precisa aceitar os termos para continuar';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatTelefone = (value) => {
        const numbers = value.replace(/\D/g, '');
        
        if (numbers.length <= 9) {
            return numbers.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim();
        } else {
            return `+${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            toast.error('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        setIsSubmitting(true);

        try {
            const db = firebase.firestore();
            await db.collection('adesoes').doc(formData.id).set({
                ...formData,
                status: 'pending',
                createdAt: new Date()
            });

            toast.success('Pedido de adesão enviado com sucesso! Entraremos em contato em breve.');
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            toast.error('Erro ao enviar pedido. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNumeroTrabalhadoresChange = (value) => {
        let planoId = '';
        let planoValor = '';

        if (value >= 0 && value <= 10) {
            planoId = 'plano1';
            planoValor = '1.000,00 MT';
        } else if (value >= 11 && value <= 49) {
            planoId = 'plano2';
            planoValor = '2.000,00 MT';
        } else if (value >= 50) {
            planoId = 'plano3';
            planoValor = '3.000,00 MT';
        }

        setFormData(prev => ({
            ...prev,
            numeroTrabalhadores: value,
            plano: planoId
        }));

        return planoValor;
    };

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            {isSubmitting && <LoadingOverlay />}
            <Toaster position="top-right" />
            <RevealOnScroll>
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Pedido de Adesão
                    </h1>

                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Dados da Empresa */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    Dados da Empresa
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nome da Empresa *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData(prev => ({...prev, nome: e.target.value}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.nome ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.nome && (
                                            <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            NUIT *
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={9}
                                            value={formData.nuit}
                                            onChange={(e) => setFormData(prev => ({...prev, nuit: e.target.value.replace(/\D/g, '')}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.nuit ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.nuit && (
                                            <p className="text-red-500 text-sm mt-1">{errors.nuit}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Telefone *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.telefone}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                telefone: formatTelefone(e.target.value)
                                            }))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.telefone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="+258 XX XXX XXXX"
                                        />
                                        {errors.telefone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Endereço *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.endereco}
                                            onChange={(e) => setFormData(prev => ({...prev, endereco: e.target.value}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.endereco ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.endereco && (
                                            <p className="text-red-500 text-sm mt-1">{errors.endereco}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cidade *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cidade}
                                            onChange={(e) => setFormData(prev => ({...prev, cidade: e.target.value}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.cidade ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.cidade && (
                                            <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Província *
                                        </label>
                                        <select
                                            value={formData.provincia}
                                            onChange={(e) => setFormData(prev => ({...prev, provincia: e.target.value}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.provincia ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Selecione uma província</option>
                                            {PROVINCIAS.map(provincia => (
                                                <option key={provincia} value={provincia}>
                                                    {provincia}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.provincia && (
                                            <p className="text-red-500 text-sm mt-1">{errors.provincia}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData(prev => ({...prev, website: e.target.value}))}
                                            placeholder="https://www.exemplo.com"
                                            className="w-full px-3 py-2 border rounded-md border-gray-300"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Opcional</p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Número de Trabalhadores *
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                            <div>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={formData.numeroTrabalhadores}
                                                    onChange={(e) => handleNumeroTrabalhadoresChange(e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-md ${
                                                        errors.numeroTrabalhadores ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {errors.numeroTrabalhadores && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.numeroTrabalhadores}</p>
                                                )}
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-md">
                                                <p className="text-sm text-gray-600">Plano correspondente:</p>
                                                <p className="font-medium text-[#646464]">
                                                    {formData.numeroTrabalhadores ? (
                                                        <>
                                                            {formData.numeroTrabalhadores <= 10 && 'Plano Básico - 1.000,00 MT'}
                                                            {formData.numeroTrabalhadores > 10 && formData.numeroTrabalhadores <= 49 && 'Plano Intermediário - 2.000,00 MT'}
                                                            {formData.numeroTrabalhadores >= 50 && 'Plano Avançado - 3.000,00 MT'}
                                                        </>
                                                    ) : 'Informe o número de trabalhadores'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Periodicidade de Pagamento *
                                        </label>
                                        <select
                                            value={formData.periodicidade}
                                            onChange={(e) => setFormData(prev => ({...prev, periodicidade: e.target.value}))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.periodicidade ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Selecione a periodicidade</option>
                                            {PERIODICIDADES.map(periodo => (
                                                <option key={periodo.id} value={periodo.id}>
                                                    {periodo.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.periodicidade && (
                                            <p className="text-red-500 text-sm mt-1">{errors.periodicidade}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Categorias de Atuação *
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {CATEGORIAS.map(categoria => (
                                                <label key={categoria} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.categorias.includes(categoria)}
                                                        onChange={(e) => {
                                                            const newCategorias = e.target.checked
                                                                ? [...formData.categorias, categoria]
                                                                : formData.categorias.filter(cat => cat !== categoria);
                                                            setFormData(prev => ({...prev, categorias: newCategorias}));
                                                        }}
                                                        className="rounded border-gray-300 text-[#646464] focus:ring-[#646464]"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">{categoria}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.categorias && (
                                            <p className="text-red-500 text-sm mt-1">{errors.categorias}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pessoa de Contato */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    Pessoa de Contato
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nome Completo *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.pessoaContato.nome}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                pessoaContato: {
                                                    ...prev.pessoaContato,
                                                    nome: e.target.value
                                                }
                                            }))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.pessoaContatoNome ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.pessoaContatoNome && (
                                            <p className="text-red-500 text-sm mt-1">{errors.pessoaContatoNome}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cargo *
                                        </label>
                                        <select
                                            value={formData.pessoaContato.cargo}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                pessoaContato: {
                                                    ...prev.pessoaContato,
                                                    cargo: e.target.value
                                                }
                                            }))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.pessoaContatoCargo ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Selecione um cargo</option>
                                            {CARGOS.map(cargo => (
                                                <option key={cargo} value={cargo}>
                                                    {cargo}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.pessoaContatoCargo && (
                                            <p className="text-red-500 text-sm mt-1">{errors.pessoaContatoCargo}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.pessoaContato.email}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                pessoaContato: {
                                                    ...prev.pessoaContato,
                                                    email: e.target.value
                                                }
                                            }))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.pessoaContatoEmail ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.pessoaContatoEmail && (
                                            <p className="text-red-500 text-sm mt-1">{errors.pessoaContatoEmail}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Telefone *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.pessoaContato.telefone}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                pessoaContato: {
                                                    ...prev.pessoaContato,
                                                    telefone: formatTelefone(e.target.value)
                                                }
                                            }))}
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.pessoaContatoTelefone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="+258 XX XXX XXXX"
                                        />
                                        {errors.pessoaContatoTelefone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.pessoaContatoTelefone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Informação sobre Pessoa de Contato */}
                            <div className="md:col-span-2 bg-blue-50 border-l-4 border-[#646464] p-4 mb-6">
                                <h3 className="font-medium text-[#646464] mb-2">Informação Importante</h3>
                                <p className="text-gray-600">
                                    A pessoa de contato indicada será a administradora da conta na CFM LOGISTICS. 
                                    O email fornecido será utilizado para acesso ao sistema e comunicações importantes.
                                </p>
                            </div>

                            {/* Termos e Condições */}
                            <div className="md:col-span-2 mt-6">
                                <label className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.aceitaTermos}
                                        onChange={(e) => setFormData(prev => ({...prev, aceitaTermos: e.target.checked}))}
                                        className="mt-1 rounded border-gray-300 text-[#646464] focus:ring-[#646464]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Li e concordo com os{' '}
                                        <a
                                            href="/docs/cdc.pdf"
                                            download="CFM LOGISTICS-Codigo-de-Conduta.pdf"
                                            className="text-[#646464] underline hover:text-opacity-80"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            termos e código de conduta
                                        </a>
                                        {' '}da CFM LOGISTICS *
                                    </span>
                                </label>
                                {errors.aceitaTermos && (
                                    <p className="text-red-500 text-sm mt-1">{errors.aceitaTermos}</p>
                                )}
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#646464] text-white px-8 py-3 rounded-md hover:bg-opacity-90 disabled:opacity-50 font-medium"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
} 