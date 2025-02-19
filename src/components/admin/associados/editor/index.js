'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { firebase } from '@/base';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import EditorHeader from './header';
import ImageUploader from './image-uploader';
import { toast } from 'react-hot-toast';
import { CATEGORIAS, PLANOS } from './categories';
import { PROVINCIAS } from './provinces';
import { Toaster } from 'react-hot-toast';
import { CARGOS } from './positions';

export default function AssociadoEditor({ id, associadoData }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [associado, setAssociado] = useState({
        id: id || uuidv4(),
        nome: '',
        email: '',
        telefone: '',
        nuit: '',
        endereco: '',
        cidade: '',
        provincia: '',
        website: '',
        descricao: '',
        logo: null,
        status: 'active',
        categorias: [],
        plano: '',
        numeroTrabalhadores: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        pessoaContato: {
            nome: '',
            cargo: '',
            email: '',
            telefone: ''
        },
        ...associadoData
    });

    const isEdit = Boolean(associadoData);

    const validateFields = () => {
        const newErrors = {};
        
        if (!associado.nome.trim()) {
            newErrors.nome = 'O nome é obrigatório';
        } else if (associado.nome.trim().length < 3) {
            newErrors.nome = 'O nome deve ter pelo menos 3 caracteres';
        }
        
        if (!associado.email.trim()) {
            newErrors.email = 'O email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(associado.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!associado.nuit?.trim()) {
            newErrors.nuit = 'O NUIT é obrigatório';
        } else if (!/^\d{9}$/.test(associado.nuit)) {
            newErrors.nuit = 'O NUIT deve ter exatamente 9 dígitos';
        }

        if (associado.telefone && !/^(\+258|258)?\d{9}$/.test(associado.telefone.replace(/\s/g, ''))) {
            newErrors.telefone = 'Formato inválido. Use: +258 XX XXX XXXX ou apenas 9 dígitos';
        }

        if (associado.website && !isValidUrl(associado.website)) {
            newErrors.website = 'URL inválida. Inclua http:// ou https://';
        }

        if (associado.categorias.length === 0) {
            newErrors.categorias = 'Selecione pelo menos uma categoria';
        }

        if (!associado.plano) {
            newErrors.plano = 'Selecione um plano';
        }

        if (!associado.numeroTrabalhadores) {
            newErrors.numeroTrabalhadores = 'Informe o número de trabalhadores';
        }

        if (!associado.pessoaContato?.nome?.trim()) {
            newErrors.pessoaContatoNome = 'O nome da pessoa de contato é obrigatório';
        }

        if (!associado.pessoaContato?.cargo) {
            newErrors.pessoaContatoCargo = 'O cargo é obrigatório';
        }

        if (!associado.pessoaContato?.email?.trim()) {
            newErrors.pessoaContatoEmail = 'O email da pessoa de contato é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(associado.pessoaContato.email)) {
            newErrors.pessoaContatoEmail = 'Email inválido';
        }

        if (associado.pessoaContato?.telefone && 
            !/^(\+258|258)?\d{9}$/.test(associado.pessoaContato.telefone.replace(/\s/g, ''))) {
            newErrors.pessoaContatoTelefone = 'Formato inválido. Use: +258 XX XXX XXXX ou apenas 9 dígitos';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const formatTelefone = (value) => {
        const numbers = value.replace(/\D/g, '');
        
        if (numbers.length <= 9) {
            return numbers.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim();
        } else {
            return `+${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`;
        }
    };

    const handleSave = async (status = associado.status) => {
        if (!validateFields()) {
            toast.error('Por favor, corrija os erros antes de salvar');
            return;
        }

        try {
            setIsLoading(true);
            const db = firebase.firestore();
            const docRef = db.collection('associados').doc(associado.id);
            
            const dadosParaSalvar = {
                ...associado,
                status,
                updatedAt: new Date(),
                createdAt: associado.createdAt || new Date()
            };

            Object.keys(dadosParaSalvar).forEach(key => {
                if (dadosParaSalvar[key] === undefined || dadosParaSalvar[key] === null) {
                    delete dadosParaSalvar[key];
                }
            });

            await docRef.set(dadosParaSalvar);

            toast.success('Associado salvo com sucesso!');
            router.push('/admin/associados');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            toast.error('Erro ao salvar associado');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogoUpload = async (file) => {
        if (!file) return;

        try {
            setIsLoading(true);
            const storage = getStorage();
            const logoRef = ref(storage, `associados/${associado.id}/logo`);
            
            const snapshot = await uploadBytes(logoRef, file);
            const url = await getDownloadURL(snapshot.ref);
            
            setAssociado(prev => ({
                ...prev,
                logo: url
            }));

            return url;
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            toast.error('Erro ao fazer upload da logo');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoriaChange = (categoria) => {
        setAssociado(prev => ({
            ...prev,
            categorias: prev.categorias.includes(categoria)
                ? prev.categorias.filter(c => c !== categoria)
                : [...prev.categorias, categoria]
        }));
    };

    const handlePlanoChange = (planoId) => {
        const plano = PLANOS.find(p => p.id === planoId);
        setAssociado(prev => ({
            ...prev,
            plano: planoId
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <EditorHeader
                isLoading={isLoading}
                onSave={() => handleSave('active')}
                onSaveAsDraft={() => handleSave('inactive')}
                isEdit={isEdit}
            />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Coluna Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Informações Básicas */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Informações Básicas</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nome da Empresa
                                    </label>
                                    <input
                                        type="text"
                                        value={associado.nome}
                                        onChange={(e) => setAssociado(prev => ({
                                            ...prev,
                                            nome: e.target.value
                                        }))}
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
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={associado.email}
                                        onChange={(e) => setAssociado(prev => ({
                                            ...prev,
                                            email: e.target.value
                                        }))}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="empresa@exemplo.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        NUIT
                                    </label>
                                    <input
                                        type="text"
                                        value={associado.nuit}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                                            setAssociado(prev => ({
                                                ...prev,
                                                nuit: value
                                            }));
                                        }}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.nuit ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="123456789"
                                    />
                                    {errors.nuit && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nuit}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        value={associado.telefone}
                                        onChange={(e) => setAssociado(prev => ({
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={associado.website}
                                        onChange={(e) => setAssociado(prev => ({
                                            ...prev,
                                            website: e.target.value
                                        }))}
                                        onBlur={(e) => {
                                            if (e.target.value && !e.target.value.startsWith('http')) {
                                                setAssociado(prev => ({
                                                    ...prev,
                                                    website: `https://${e.target.value}`
                                                }));
                                            }
                                        }}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.website ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="https://www.exemplo.com"
                                    />
                                    {errors.website && (
                                        <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Endereço</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Endereço
                                    </label>
                                    <input
                                        type="text"
                                        value={associado.endereco}
                                        onChange={(e) => setAssociado(prev => ({
                                            ...prev,
                                            endereco: e.target.value
                                        }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cidade
                                        </label>
                                        <input
                                            type="text"
                                            value={associado.cidade}
                                            onChange={(e) => setAssociado(prev => ({
                                                ...prev,
                                                cidade: e.target.value
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Província
                                        </label>
                                        <select
                                            value={associado.provincia}
                                            onChange={(e) => setAssociado(prev => ({
                                                ...prev,
                                                provincia: e.target.value
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Selecione uma província</option>
                                            {PROVINCIAS.map(provincia => (
                                                <option key={provincia} value={provincia}>
                                                    {provincia}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Descrição</h2>
                            
                            <textarea
                                value={associado.descricao}
                                onChange={(e) => setAssociado(prev => ({
                                    ...prev,
                                    descricao: e.target.value
                                }))}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Descreva a empresa..."
                            />
                        </div>

                        {/* Categorias */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Categorias</h2>
                            
                            {errors.categorias && (
                                <p className="text-red-500 text-sm mb-2">{errors.categorias}</p>
                            )}
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {CATEGORIAS.map(categoria => (
                                    <label
                                        key={categoria}
                                        className="flex items-center space-x-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={associado.categorias.includes(categoria)}
                                            onChange={() => handleCategoriaChange(categoria)}
                                            className="rounded border-gray-300 text-[#646464] focus:ring-[#646464]"
                                        />
                                        <span>{categoria}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Plano e Número de Trabalhadores */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Plano de Associação</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Número de Trabalhadores
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={associado.numeroTrabalhadores}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setAssociado(prev => ({
                                                ...prev,
                                                numeroTrabalhadores: value,
                                                plano: value ? (
                                                    value <= 10 ? 'plano1' :
                                                    value <= 49 ? 'plano2' : 'plano3'
                                                ) : ''
                                            }));
                                        }}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.numeroTrabalhadores ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.numeroTrabalhadores && (
                                        <p className="text-red-500 text-sm mt-1">{errors.numeroTrabalhadores}</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Plano
                                    </label>
                                    {errors.plano && (
                                        <p className="text-red-500 text-sm">{errors.plano}</p>
                                    )}
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {PLANOS.map((plano) => (
                                            <div
                                                key={plano.id}
                                                className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
                                                    associado.plano === plano.id
                                                        ? 'border-[#646464] bg-[#646464]/5'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                                onClick={() => handlePlanoChange(plano.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {plano.descricao}
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {plano.valor.toLocaleString('pt-BR')} MT
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        checked={associado.plano === plano.id}
                                                        onChange={() => handlePlanoChange(plano.id)}
                                                        className="h-4 w-4 text-[#646464] border-gray-300 focus:ring-[#646464]"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pessoa de Contato */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Pessoa de Contato</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        value={associado.pessoaContato?.nome || ''}
                                        onChange={(e) => setAssociado(prev => ({
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
                                        Cargo
                                    </label>
                                    <select
                                        value={associado.pessoaContato?.cargo || ''}
                                        onChange={(e) => setAssociado(prev => ({
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
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={associado.pessoaContato?.email || ''}
                                        onChange={(e) => setAssociado(prev => ({
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
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        value={associado.pessoaContato?.telefone || ''}
                                        onChange={(e) => setAssociado(prev => ({
                                            ...prev,
                                            pessoaContato: {
                                                ...prev.pessoaContato,
                                                telefone: formatTelefone(e.target.value)
                                            }
                                        }))}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.pessoaContatoTelefone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.pessoaContatoTelefone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.pessoaContatoTelefone}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Logo</h2>
                            <ImageUploader
                                value={associado.logo}
                                onChange={handleLogoUpload}
                                aspectRatio={1}
                            />
                        </div>

                        {/* Status */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4">Status</h2>
                            <select
                                value={associado.status}
                                onChange={(e) => setAssociado(prev => ({
                                    ...prev,
                                    status: e.target.value
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="active">Ativo</option>
                                <option value="inactive">Inativo</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 