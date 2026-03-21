'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { AlertCircle, LogIn, ArrowLeft } from 'lucide-react';

export default function ConnexionPage() {
  const [identifier, setIdentifier] = useState('');
  const [nip, setNip] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Rechercher dans Supabase (NIP)
      const { data, error: sbError } = await supabase
        .from('votes')
        .select('*')
        .eq('nip', nip.trim())
        .single();
      
      if (sbError || !data) {
        throw new Error('NIP incorrect ou inconnu.');
      }

      // Vérifier si l'identifiant (Nom ou Email) correspond
      const idUpper = identifier.toUpperCase().trim();
      const lastName = (data.last_name || '').toUpperCase();
      const email = (data.email || '').toUpperCase();

      if (lastName !== idUpper && email !== idUpper) {
        throw new Error('Les informations saisies ne correspondent pas.');
      }

      // Connexion réussie
      login(data);
      router.push('/mon-compte');

    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 flex justify-start px-4 sm:px-0">
        <Link href="/" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Accéder à mon espace
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Entrez vos informations pour consulter votre espace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Nom ou Email
              </label>
              <div className="mt-1">
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Dossou ou jean@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                NIP (Mot de passe)
              </label>
              <div className="mt-1">
                <input
                  id="nip"
                  type="password"
                  required
                  value={nip}
                  onChange={(e) => setNip(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Votre NIP (10 chiffres)"
                  maxLength={10}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
              >
                {isLoading ? 'Connexion en cours...' : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Se connecter
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-6 border-t border-gray-100 pt-6">
              <div className="text-sm">
                <Link href="/mot-de-passe-oublie" className="font-medium text-gray-500 hover:text-green-600 transition-colors">
                  NIP oublié ?
                </Link>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Pas encore engagé ? </span>
                <Link href="/#voter" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                  Je m'engage
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
