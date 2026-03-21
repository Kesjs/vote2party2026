'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import dynamic from 'next/dynamic';
import { LogOut } from 'lucide-react';

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

export default function MonComptePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://voteparty2026.com';
      setReferralLink(`${baseUrl}/ref/${encodeURIComponent(user.first_name?.toLowerCase() || '')}-${encodeURIComponent(user.last_name?.toLowerCase() || '')}`);
    }
  }, [user]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Chargement sécurisé...</div>;
  }

  // N° Aléatoire formaté pour correspondre à l'apparence officielle 
  const documentId = `2078${user.nip || '002269'}521`;
  const expirationDate = '06/12/2030';

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Dashboard */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mon Espace Personnel</h1>
            <p className="text-sm sm:text-base text-gray-500">Bienvenue, {user.first_name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors font-medium px-3 py-2 text-sm sm:text-base rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Déconnexion
          </button>
        </div>

        {/* Section Carte CIP Exact Replica */}
        <div className="bg-white p-4 sm:p-12 rounded-2xl shadow-sm flex flex-col items-center overflow-x-auto">

          <div
            ref={cardRef}
            className="relative w-[340px] h-[310px] sm:w-[650px] sm:h-[480px] bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-300 flex-shrink-0"
            style={{
              fontFamily: "'Arial', sans-serif"
            }}
          >
            {/* Background filigrane (très subtil) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)' }}>
            </div>

            {/* En-tête : Logos et République */}
            <div className="flex items-center justify-between px-3 sm:px-8 pt-3 sm:pt-6 relative z-10 w-full">
              {/* Logo ANIP */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="https://www.peacefm.bj/upload/images/059730366532001710964307.jpg"
                  alt="Logo ANIP"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Titres centraux */}
              <div className="flex flex-col items-center flex-1 mx-4">
                <h1 className="text-[12px] sm:text-[18px] font-extrabold text-[#1a1a1a] tracking-[0.2em] uppercase mb-1 sm:mb-2">
                  République du Bénin
                </h1>
                {/* Ligne Tricolore */}
                <div className="w-32 sm:w-48 h-1 sm:h-1.5 flex mb-1.5 sm:mb-3 shadow-sm rounded-sm overflow-hidden">
                  <div className="flex-1 bg-[#00A650]"></div>
                  <div className="flex-1 bg-[#FCD116]"></div>
                  <div className="flex-1 bg-[#EB1C24]"></div>
                </div>
                <h2 className="text-[10px] sm:text-[15px] font-bold text-[#333] uppercase whitespace-nowrap hidden sm:block tracking-wide">
                  TRIBR CARD
                </h2>
                <h2 className="text-[9px] font-bold text-[#333] uppercase text-center leading-tight sm:hidden">
                  TIBR<br />CARD
                </h2>
              </div>

              {/* Armoiries */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.op_8airZj0hLmdCzuOvdHwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Armoiries du Bénin"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Ligne grise N° et NIP */}
            <div className="mt-2 sm:mt-4 w-full flex text-[9px] sm:text-[13px] h-5 sm:h-9 items-center border-t border-b border-gray-300 bg-gray-200 shadow-sm">
              <div className="h-full px-2 sm:px-6 flex items-center w-[35%] sm:w-[35%] border-r border-[#d1d5db]">
                <span className="font-bold mr-1 sm:mr-4 text-gray-700">N°</span>
                <span className="font-mono font-bold tracking-widest text-black text-[9px] sm:text-[14px]">{documentId}</span>
              </div>
              <div className="flex-1 flex justify-between items-center px-1 sm:px-6 bg-white h-full relative overflow-hidden">
                <span className="font-bold whitespace-nowrap text-gray-800 tracking-wide text-[7px] sm:text-[12px] ml-1 sm:ml-0">Numéro Personnel d'Identification :</span>
                <span className="font-extrabold text-[#C8102E] text-[10px] sm:text-[18px] tracking-wider absolute right-2 sm:right-6">{user.nip || '0000000000'}</span>
              </div>
            </div>

            {/* Corps central (Photo, infos, Code QR) */}
            <div className="flex px-3 sm:px-6 mt-3 sm:mt-6 relative z-10 w-full h-[90px] sm:h-[145px]">

              {/* Code barre vertical à l'extrême gauche */}
              <div className="w-5 sm:w-8 flex flex-col items-center justify-center mr-2 sm:mr-4 h-[80px] sm:h-[135px] my-auto">
                <div className="w-full h-full border-[1.5px] border-black opacity-80 rounded-sm"
                  style={{
                    background: 'repeating-linear-gradient(0deg, #000, #000 1.5px, transparent 1.5px, transparent 3px, #000 3px, #000 5px, transparent 5px, transparent 8px)'
                  }}>
                </div>
              </div>

              {/* Photo Area */}
              <div className="w-[65px] h-[85px] sm:w-[110px] sm:h-[140px] bg-[#333] ml-1 sm:ml-2 flex-shrink-0 relative overflow-hidden flex flex-col justify-end rounded-md shadow-md border border-gray-400">
                {user.photo_url ? (
                  <img src={user.photo_url} alt="Photo CIP" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Data list */}
              <div className="flex-1 ml-4 sm:ml-8 text-[8px] sm:text-[13px] leading-[1.5] sm:leading-[1.8] my-auto">
                <div className="flex mb-1 sm:mb-1.5">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Nom :</span>
                  <span className="font-bold uppercase flex-1 text-gray-900 tracking-wider">{user.last_name || 'XXXXXXXXXX'}</span>
                </div>
                {/* PRENOM EN NOIR */}
                <div className="flex mb-1 sm:mb-1.5">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Prénom(s) :</span>
                  <span className="font-bold flex-1 uppercase tracking-wider text-gray-900">{user.first_name || 'XXXXXXXXXX'}</span>
                </div>
                <div className="flex mb-1 sm:mb-1.5">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Date de naissance :</span>
                  <span className="font-bold flex-1 text-gray-900">
                    {user.date_naissance ? new Date(user.date_naissance).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }) : '23 novembre 1965'}
                  </span>
                </div>
                {/* LIEU SANS VIL */}
                <div className="flex mb-1 sm:mb-1.5">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Lieu de naissance :</span>
                  <span className="font-bold flex-1 uppercase tracking-tight text-gray-900">{user.lieu_naissance || 'SAINT JEAN GBEDIGA'}</span>
                </div>
                <div className="flex mb-1 sm:mb-1.5 items-center">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Nationalité :</span>
                  <span className="font-bold uppercase text-[7px] sm:text-[11px] text-gray-900 tracking-widest">BENIN</span>
                </div>
                <div className="flex">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Téléphone :</span>
                  <span className="font-bold flex-1 text-gray-900 tracking-wider">{user.phone || ''}</span>
                </div>
              </div>

              {/* QR Code à droite */}
              <div className="flex flex-col items-center justify-start pr-1 sm:pr-4 pt-1 sm:pt-2 h-full">
                <div className="bg-white p-1 sm:p-1.5 border-[2px] border-black rounded-sm shadow-sm">
                  <QRCode
                    value={referralLink || user.nip}
                    style={{ width: '100%', height: '100%', maxWidth: '110px' }}
                    className="w-[55px] h-[55px] sm:w-[105px] sm:h-[105px]"
                    level="L"
                    fgColor="#000000"
                  />
                </div>
              </div>

            </div>

            {/* Partie Basse (Adresses et Informations Électorales) */}
            <div className="px-3 sm:px-8 mt-4 sm:mt-6 text-[8px] sm:text-[12px] w-full flex gap-1 sm:gap-2">
              
              {/* Adresse block à gauche */}
              <div className="w-[50%] pr-2">
                <div className="font-bold italic mb-1 sm:mb-1.5 text-[8.5px] sm:text-[13px] text-gray-900">Adresse de résidence</div>
                <div className="w-[85%] h-[1.5px] bg-gray-500 mb-1.5 sm:mb-3"></div>
                
                <div className="leading-[1.3] sm:leading-[1.4] mb-2 sm:mb-3 text-gray-800 font-medium whitespace-normal">
                  <div className="uppercase">Com. : <span className="font-bold">{user.commune || 'ABOMEY-CALAVI'}</span> / Arr. : <span className="font-bold">{user.arrondissement || 'ABOMEY-CALAVI'}</span></div>
                  <div className="uppercase mt-0.5 sm:mt-1">Qt. : <span className="font-bold">SEME</span></div>
                  <div className="uppercase mt-0.5 sm:mt-1">Lieu : <span className="font-bold">{user.departement ? `DEP. ${user.departement}` : 'LOT 258 L&Y M/QUENUM'}</span></div>
                </div>
              </div>

              {/* Elections block à droite */}
              <div className="w-[50%] pl-2 sm:pl-4 border-l border-gray-200">
                <div className="font-bold italic mb-1 sm:mb-1.5 text-[8.5px] sm:text-[13px] text-[#00A650]">Informations Électorales</div>
                <div className="w-[85%] h-[1.5px] bg-[#00A650] mb-1.5 sm:mb-3 opacity-50"></div>
                
                <div className="leading-[1.3] sm:leading-[1.4] mb-2 sm:mb-3 text-gray-800 font-medium whitespace-normal">
                  <div className="uppercase flex items-start">
                    <span className="text-gray-500 w-[45px] sm:w-[65px] flex-shrink-0">Centre :</span> 
                    <span className="font-bold flex-1 text-[#1a1a1a]">{user.centre_vote || `EPP ${user.arrondissement || 'ABOMEY-CALAVI'}`}</span>
                  </div>
                  <div className="uppercase flex items-start mt-1 sm:mt-2">
                    <span className="text-gray-500 w-[45px] sm:w-[65px] flex-shrink-0">Bureau :</span> 
                    <span className="font-bold flex-1 text-[#1a1a1a]">{user.bureau_vote || 'BUREAU N° 01'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Expiration */}
            <div className="absolute bottom-1.5 sm:bottom-3 left-3 sm:left-6 text-[8.5px] sm:text-[12px] font-bold text-gray-800 tracking-wide">
               Expire le : <span className="text-[#C8102E] font-mono ml-1 sm:ml-2">{expirationDate}</span>
            </div>

          </div>
        </div>

        {/* Section de parrainage explicit */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-green-800 font-semibold mb-1">Votre lien de parrainage</h3>
            <p className="text-sm text-green-600 mb-2">Invitez vos proches à nous rejoindre en utilisant ce lien unique.</p>
            <code className="bg-white px-3 py-1.5 rounded border border-green-200 text-green-700 text-sm break-all font-mono shadow-sm">
              {referralLink}
            </code>
          </div>
          <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm">
            <QRCode
              value={referralLink}
              size={100}
              level="H"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
