'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Pour des raisons de sécurité, nous vérifions simplement si l'email existe.
      // Dans un vrai système en production, il faudrait appeler une Cloud Function Supabase 
      // ou une API Edge Route pour envoyer un email sans exposer les données côté client.
      const { data, error } = await supabase
        .from('votes')
        .select('nip')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error; // Ignorer l'erreur si aucun résultat
      
      // Que l'email existe ou non, on affiche un message de succès (meilleure sécurité contre la déduction de comptes)
      setStatus('success');
      
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Une erreur est survenue lors de la tentative de récupération.");
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 flex justify-start px-4 sm:px-0">
        <Link href="/connexion" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la connexion
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          NIP oublié ?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 px-4">
          Votre mot de passe est votre NIP (Numéro d&apos;Identification Personnelle) à 10 chiffres. Vous le trouverez sur votre carte CIP physique.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {status === 'success' ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Instructions envoyées</h3>
              <p className="text-sm text-gray-500 mb-6">
                Si l&apos;adresse email <strong>{email}</strong> est associée à un engagement, vous recevrez bientôt un e-mail contenant les instructions pour retrouver votre NIP.
              </p>
              <Link
                href="/connexion"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
             <form className="space-y-6" onSubmit={handleReset}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse Email associée
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                >
                  {status === 'loading' ? 'Recherche...' : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Recevoir mon NIP
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
