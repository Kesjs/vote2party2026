"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Home, User, Mail, MapPin, Smartphone, Hash, Calendar } from 'lucide-react';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nip: string;
  departement: string;
  commune: string;
  circonscription: string;
  arrondissement: string;
  created_at: string;
}

export default function ScanPage() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || '' ;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!id) {
          throw new Error('Aucun ID de bulletin fourni');
        }

        setLoading(true);
        setError('');
        
        const { data, error } = await supabase
          .from('votes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Bulletin non trouvé');
        
        setUserData(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Une erreur inconnue est survenue';
        setError(`Impossible de charger les informations du bulletin : ${message}`);
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des informations personnelles...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
          <p className="text-gray-600 mb-6">{error || 'Bulletin introuvable ou expiré'}</p>
          <Link href="/" className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  // Formater la date de création
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Informations personnelles
          </h1>
          <p className="text-gray-600">Détails de l&#39;utilisateur</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-green-100 border-b border-green-200">
            <h2 className="text-lg font-medium text-green-800">
              <User className="inline w-5 h-5 mr-2" />
              Profil utilisateur
            </h2>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.firstName} {userData.lastName}
                </dd>
              </div>
              
              {userData.email && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.email}
                  </dd>
                </div>
              )}

              {userData.phone && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Téléphone
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.phone}
                  </dd>
                </div>
              )}

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Hash className="w-4 h-4 mr-2" />
                  NIP
                </dt>
                <dd className="mt-1 text-sm font-mono text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.nip}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Localisation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.departement}
                  {userData.commune && `, ${userData.commune}`}
                  {userData.arrondissement && `, ${userData.arrondissement}`}
                  {userData.circonscription && ` (${userData.circonscription})`}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date d&apos;enregistrement
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(userData.created_at)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Home className="w-4 h-4 mr-2" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}