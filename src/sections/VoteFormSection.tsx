'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, AlertCircle, Copy, Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Chargement dynamique du QRCode
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });
import { departements, getCommunes, getCirconscriptions, getArrondissements } from '@/data/beninLocations';
import { supabase } from '@/lib/supabase';

type FormData = {
  lastName: string;
  firstName: string;
  nip: string;
  phone: string;
  email: string;
  departement: string;
  commune: string;
  circonscription: string;
  arrondissement: string;
  captcha: string;
  submit?: string;
};

const VoteFormSection = () => {
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    nip: '',
    phone: '',
    email: '',
    departement: '',
    commune: '',
    circonscription: '',
    arrondissement: '',
    captcha: ''
  });

  const [communes, setCommunes] = useState<Array<{id: string, name: string}>>([]);
  const [circonscriptions, setCirconscriptions] = useState<Array<{id: string, name: string}>>([]);
  const [arrondissements, setArrondissements] = useState<Array<{id: string, name: string}>>([]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Générer un nouveau captcha aléatoire
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Initialiser ou régénérer le captcha
  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
  };
  
  // Générer le captcha initial
  useEffect(() => {
    // Utilisation de la fonction directement dans le useEffect pour éviter la dépendance
    setCaptchaText(generateCaptcha());
  }, []); // Pas besoin de dépendances car generateCaptcha est stable
  
  // Créer un identifiant unique pour le lien (une seule fois)
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  // Générer le lien de parrainage avec les vrais noms
  const generateReferralLink = (firstName: string, lastName: string) => {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://voteparty2026.com';
    
    return `${baseUrl}/ref/${encodeURIComponent(firstName.toLowerCase())}-${encodeURIComponent(lastName.toLowerCase())}-${Date.now()}`;
  };
  
  
  const handleCopyLink = useCallback(() => {
    if (!referralLink) return;
    
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        setErrors(prev => ({ ...prev, submit: 'Impossible de copier le lien' }));
      });
  }, [referralLink]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est obligatoire';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est obligatoire';
    }

    if (!formData.nip) {
      newErrors.nip = 'Le NIP est obligatoire';
    } else if (!/^\d{10}$/.test(formData.nip)) {
      newErrors.nip = 'Le NIP doit contenir exactement 10 chiffres';
    }

    if (formData.phone && !/^\d{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Le téléphone doit contenir entre 8 et 15 chiffres';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.departement) {
      newErrors.departement = 'Veuillez choisir un département';
    }

    if (!formData.commune) {
      newErrors.commune = 'Veuillez choisir une commune';
    }

    if (!formData.circonscription) {
      newErrors.circonscription = 'Veuillez choisir une circonscription';
    }

    if (!formData.arrondissement) {
      newErrors.arrondissement = 'Veuillez choisir un arrondissement';
    }

    if (!formData.captcha) {
      newErrors.captcha = 'Veuillez entrer le code de vérification';
    } else if (formData.captcha.toUpperCase() !== captchaText) {
      newErrors.captcha = 'Code de vérification incorrect';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fonction pour vérifier si une valeur existe déjà dans la base de données (conservée pour une utilisation future)
  // const checkIfExists = async (field: string, value: string): Promise<boolean> => {
  //   if (!value) return false;
  //   
  //   const { data, error } = await supabase
  //     .from('votes')
  //     .select()
  //     .eq(field, value)
  //     .maybeSingle();
  //   
  //   return !!data && !error;
  // };

  const checkIfExists = async (field: string, value: string): Promise<boolean> => {
    if (!value) return false;
    
    const { data, error } = await supabase
      .from('votes')
      .select()
      .eq(field, value)
      .maybeSingle();
    
    return !!data && !error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrors({});

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Afficher un indicateur de chargement
      setErrors(prev => ({ ...prev, submit: 'Vérification en cours...' }));

      // Préparer les données pour l'envoi
      const firstName = formData.firstName.trim();
      const lastName = formData.lastName.trim();
      const nip = formData.nip.trim();
      const email = formData.email?.trim().toLowerCase() || null;
      const phone = formData.phone?.trim() || null;
      const referralLink = generateReferralLink(firstName, lastName);

      // Vérifier les doublons
      const [nipExists, emailExists, phoneExists] = await Promise.all([
        checkIfExists('nip', nip),
        email ? checkIfExists('email', email) : Promise.resolve(false),
        phone ? checkIfExists('phone', phone) : Promise.resolve(false)
      ]);

      // Gérer les erreurs de doublon
      const newErrors: Partial<FormData> = {};
      if (nipExists) newErrors.nip = 'Ce NIP est déjà enregistré';
      if (emailExists) newErrors.email = 'Cet email est déjà enregistré';
      if (phoneExists) newErrors.phone = 'Ce numéro de téléphone est déjà enregistré';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      // Si pas de doublon, préparer les données pour l'insertion
      setErrors(prev => ({ ...prev, submit: 'Enregistrement en cours...' }));

      const voteData = {
        first_name: firstName,
        last_name: lastName,
        nip: nip,
        phone: phone,
        email: email,
        departement: formData.departement,
        commune: formData.commune,
        circonscription: formData.circonscription,
        arrondissement: formData.arrondissement,
        captcha: formData.captcha.toUpperCase(),
        referral_link: referralLink,
        created_at: new Date().toISOString()
      };
      
      // Mettre à jour le lien de parrainage pour l'affichage
      setReferralLink(referralLink);

      console.log('Données à envoyer:', voteData);

      // Envoyer les données à Supabase
      const { data, error } = await supabase
        .from('votes')
        .insert([voteData])
        .select();

      if (error) {
        console.error('Erreur Supabase:', error);
        throw new Error(error.message || 'Erreur lors de l\'enregistrement');
      }

      console.log('Réponse de Supabase:', data); // Log pour débogage

      // Afficher le message de succès
      setShowSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        lastName: '',
        firstName: '',
        nip: '',
        phone: '',
        email: '',
        departement: '',
        commune: '',
        circonscription: '',
        arrondissement: '',
        captcha: ''
      });
      
      // Réinitialiser les listes déroulantes
      setCommunes([]);
      setCirconscriptions([]);
      setArrondissements([]);
      
      // Régénérer un nouveau captcha
      refreshCaptcha();

    } catch (error) {
      console.error('Erreur complète:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: error instanceof Error ? error.message : 'Une erreur inconnue est survenue' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Créer une copie des données du formulaire
    const newData = {
      ...formData,
      [field]: value
    };

    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Gérer les mises à jour en cascade des champs dépendants
    if (field === 'departement') {
      const selectedCommunes = getCommunes(value);
      setCommunes(selectedCommunes);
      setCirconscriptions([]);
      setArrondissements([]);
      newData.commune = '';
      newData.circonscription = '';
      newData.arrondissement = '';
    } else if (field === 'commune') {
      const selectedCirconscriptions = getCirconscriptions(value);
      setCirconscriptions(selectedCirconscriptions);
      setArrondissements([]);
      newData.circonscription = '';
      newData.arrondissement = '';
    } else if (field === 'circonscription') {
      const selectedArrondissements = getArrondissements(value);
      setArrondissements(selectedArrondissements);
      newData.arrondissement = '';
    }

    setFormData(newData);
  };

  if (showSuccess) {
    return (
      <section id="voter" className="py-12 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre vote a été enregistré avec succès !</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  Partagez votre lien de parrainage ci-dessous pour inviter d&apos;autres personnes à voter.
                </p>

                {/* QR Code */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm mx-auto">
                  <div className="bg-green-50 p-4 border-b border-green-100">
                    <h3 className="text-green-800 text-lg font-semibold text-center">Votre bulletin de vote</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 p-4 bg-white rounded-lg">
                        <QRCode
                          value={referralLink}
                          size={180}
                          level="H"
                          fgColor="#000000"
                          bgColor="#ffffff"
                          className="mx-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-500 text-center max-w-xs">
                        Scannez ce QR code avec votre appareil pour afficher les informations de vote
                      </p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Données sécurisées</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lien de parrainage */}
                <div className="w-full max-w-2xl">
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Votre lien de parrainage</h3>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 font-mono overflow-x-auto whitespace-nowrap">
                      {referralLink}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap min-w-[120px]"
                    >
                      <Copy className="w-4 h-4" />
                      Copier
                    </button>
                  </div>
                  
                  <div className="mt-6 flex justify-center gap-3">
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'Rejoignez-moi sur Vote Party',
                            text: `Rejoignez-moi sur Vote Party en utilisant mon lien de parrainage : ${referralLink}`,
                            url: referralLink,
                          });
                        }
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Partager
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setIsSubmitted(false);
                      }}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Accueil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="voter" className="py-20 bg-gray-50">
<div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Je m’engage à  <span className="text-green-600">voter </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Inscris toi et tente ta chance de remporter un cadeau 
        </p>

        </div>

        <div className="max-w-2xl mx-auto">
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.lastName 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  } text-gray-800 placeholder-gray-400`}
                  placeholder="Votre nom"
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.firstName 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  } text-gray-800 placeholder-gray-400`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                  placeholder="Votre prénom"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* NIP */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    NIP (10 chiffres) *
                  </label>
                  {errors.nip && (
                    <span className="text-xs text-red-600">
                      {errors.nip}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="nip"
                  value={formData.nip}
                  onChange={(e) => handleInputChange('nip', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.nip 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  } text-gray-800 placeholder-gray-400`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                  placeholder="1234567890"
                  maxLength={10}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Votre NIP doit être unique et ne doit pas avoir été utilisé auparavant.
                </p>
              </div>

              {/* Téléphone */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  {errors.phone && (
                    <span className="text-xs text-red-600">
                      {errors.phone}
                    </span>
                  )}
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.phone 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  } text-gray-800 placeholder-gray-400`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                  placeholder="12345678"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Facultatif, mais doit être unique si fourni.
                </p>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  {errors.email && (
                    <span className="text-xs text-red-600">
                      {errors.email}
                    </span>
                  )}
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value.toLowerCase())}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.email 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  } text-gray-800 placeholder-gray-400`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                  placeholder="votre@email.com"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Facultatif, mais doit être unique si fourni. Un code de vérification vous sera envoyé.
                </p>
              </div>

              {/* Département */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Département *
                </label>
                <select
                  value={formData.departement}
                  onChange={(e) => handleInputChange('departement', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.departement 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  } text-gray-800`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  <option value="">Choisir un département</option>
                  {departements.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.departement && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.departement}
                  </p>
                )}
              </div>

              {/* Commune */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commune *
                </label>
                <select
                  value={formData.commune}
                  onChange={(e) => handleInputChange('commune', e.target.value)}
                  disabled={!formData.departement}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.commune 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white disabled:bg-gray-100 disabled:opacity-50'
                  } text-gray-800`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  <option value="">Choisir une commune</option>
                  {communes.map((commune) => (
                    <option key={commune.id} value={commune.id}>
                      {commune.name}
                    </option>
                  ))}
                </select>
                {errors.commune && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.commune}
                  </p>
                )}
              </div>

              {/* Circonscription */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Circonscription *
                </label>
                <select
                  value={formData.circonscription}
                  onChange={(e) => handleInputChange('circonscription', e.target.value)}
                  disabled={!formData.commune}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.circonscription 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white disabled:bg-gray-100 disabled:opacity-50'
                  } text-gray-800`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  <option value="">Choisir une circonscription</option>
                  {circonscriptions.map((circo) => (
                    <option key={circo.id} value={circo.id}>
                      {circo.name}
                    </option>
                  ))}
                </select>
                {errors.circonscription && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.circonscription}
                  </p>
                )}
              </div>

              {/* Arrondissement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arrondissement *
                </label>
                <select
                  value={formData.arrondissement}
                  onChange={(e) => handleInputChange('arrondissement', e.target.value)}
                  disabled={!formData.circonscription}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors ${
                    errors.arrondissement 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white disabled:bg-gray-100 disabled:opacity-50'
                  } text-gray-800`}
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  }}
                >
                  <option value="">Choisir un arrondissement</option>
                  {arrondissements.map((arr) => (
                    <option key={arr.id} value={arr.id}>
                      {arr.name}
                    </option>
                  ))}
                </select>
                {errors.arrondissement && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.arrondissement}
                  </p>
                )}
              </div>

              {/* CAPTCHA */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAPTCHA *
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg font-mono text-lg font-bold text-gray-700 select-none border-2 border-gray-200 flex-1 text-center">
                      {captchaText}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                      title="Rafraîchir le code"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formData.captcha}
                      onChange={(e) => handleInputChange('captcha', e.target.value)}
                      className="flex-1 px-4 py-3 border-2 rounded-lg focus:ring-0 focus:border-blue-500 transition-colors border-gray-300 hover:border-gray-400 bg-white text-gray-800 placeholder-gray-400"
                      style={{
                        fontSize: '1rem',
                        lineHeight: '1.5',
                      }}
                      placeholder="Entrez le code ci-dessus"
                    />
                  </div>
                </div>
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.captcha}
                  </p>
                )}
              </div>
            </div>

            {/* Message d'erreur */}
            {errors.submit && (
              <div className="md:col-span-2 p-4 bg-red-50 text-red-700 rounded-lg">
                <p className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitted ? 'Envoi en cours...' : 'Soumettre le formulaire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VoteFormSection;
