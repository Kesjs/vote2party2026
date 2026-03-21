'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { departements, getCommunes, getCirconscriptions, getArrondissements } from '@/data/beninLocations';

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
  const [captchaText] = useState('SD4J6LM1');

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
    } else if (formData.captcha !== captchaText) {
      newErrors.captcha = 'Code de vérification incorrect';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setShowSuccess(true);
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
        setCommunes([]);
        setCirconscriptions([]);
        setArrondissements([]);
      }, 1000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    const newData = {
      ...formData,
      [field]: value
    };

    // Gérer la mise à jour en cascade des champs dépendants
    if (field === 'departement') {
      newData.commune = '';
      newData.circonscription = '';
      newData.arrondissement = '';
      const selectedCommunes = getCommunes(value);
      setCommunes(selectedCommunes);
      setCirconscriptions([]);
      setArrondissements([]);
    } else if (field === 'commune') {
      newData.circonscription = '';
      newData.arrondissement = '';
      const selectedCirconscriptions = getCirconscriptions(value);
      setCirconscriptions(selectedCirconscriptions);
      setArrondissements([]);
    } else if (field === 'circonscription') {
      newData.arrondissement = '';
      const selectedArrondissements = getArrondissements(value);
      setArrondissements(selectedArrondissements);
    }

    setFormData(newData);
  };

  if (showSuccess) {
  return (
    <section id="voter" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Vote enregistré avec succès !
            </h3>
            <p className="text-green-700 mb-6">
              Merci pour votre participation. Votre vote a été pris en compte 
              de manière anonyme et sécurisée.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                setIsSubmitted(false);
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Voter à nouveau
            </button>
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
            Je m’inscris à la <span className="text-green-600">vote party</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Inscris toi et participe à la tombola 
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIP (10 chiffres) *
                </label>
                <input
                  type="text"
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
                {errors.nip && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nip}
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
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
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Un code de vérification vous sera envoyé
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
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 px-4 py-3 rounded-lg font-mono text-lg font-bold text-gray-700 select-none border-2 border-gray-200">
                    {captchaText}
                  </div>
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
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.captcha}
                  </p>
                )}
              </div>
            </div>

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
