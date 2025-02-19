'use client';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { RevealOnScroll } from '@/components/ui/reveal.animation';
import { firebase } from '@/base';

export default function ContactForm() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const db = firebase.firestore();
            await db.collection('contacts').add({
                ...formData,
                createdAt: new Date()
            });
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus('error');
        }

        setIsSubmitting(false);
    };

    return (
        <section className="py-24 bg-white">
            <div className="container max-w-7xl mx-auto px-4">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                            <span className="text-[#fc4c04] font-medium tracking-wider text-sm">
                                {t('contact.form.subtitle')}
                            </span>
                            <span className="h-[1px] w-12 bg-[#fc4c04]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#646464] mb-4">
                            {t('contact.form.title')}
                            <span className="block font-light">{t('contact.form.highlight')}</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            {t('contact.form.description')}
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll>
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.form.fields.name')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fc4c04] focus:ring-2 focus:ring-[#fc4c04]/20 outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.form.fields.email')} *
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fc4c04] focus:ring-2 focus:ring-[#fc4c04]/20 outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.form.fields.phone')} *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fc4c04] focus:ring-2 focus:ring-[#fc4c04]/20 outline-none transition-all"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('contact.form.fields.company')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fc4c04] focus:ring-2 focus:ring-[#fc4c04]/20 outline-none transition-all"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('contact.form.fields.subject')} *
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fc4c04] focus:ring-2 focus:ring-[#fc4c04]/20 outline-none transition-all"
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            >
                                <option value="">{t('form.select_subject')}</option>
                                <option value="general">{t('contact.form.subjects.general')}</option>
                                <option value="services">{t('contact.form.subjects.services')}</option>
                                <option value="partnership">{t('contact.form.subjects.partnership')}</option>
                                <option value="careers">{t('contact.form.subjects.careers')}</option>
                                <option value="other">{t('contact.form.subjects.other')}</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t('contact.form.fields.message')} *
                            </label>
                            <textarea
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#fc4c04] focus:ring-2 focus:ring-[#fc4c04]/20 outline-none transition-all"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                * {t('contact.form.fields.required')}
                            </span>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 bg-[#fc4c04] text-white rounded-full 
                                         hover:bg-[#646464] transition-all duration-300
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('contact.form.button')}
                            </button>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                                {t('contact.form.success')}
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {t('contact.form.error')}
                            </div>
                        )}
                    </form>
                </RevealOnScroll>
            </div>
        </section>
    );
} 