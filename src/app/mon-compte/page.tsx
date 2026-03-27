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

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/connexion');
    }
  }, [user, isLoading, router]);


  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Chargement sécurisé...</div>;
  }

  // N° Aléatoire formaté pour correspondre à l'apparence officielle 
  const documentId = `2078${user.nip || '002269'}521`;
  const expirationDate = '06/12/2030';

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Dashboard - Single Line on Mobile */}
        <div className="flex flex-row justify-between items-center bg-white p-3 sm:p-6 rounded-2xl shadow-sm gap-2">
          <div className="flex flex-col min-w-0">
            <h1 className="text-[12px] sm:text-2xl font-bold text-gray-900 truncate">Espace Personnel</h1>
            <p className="text-[10px] sm:text-base text-gray-500 truncate">Salut, {user.first_name}</p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
            <button 
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-800 transition-colors font-semibold px-2 py-1.5 text-[10px] sm:text-base rounded-md hover:bg-blue-50 border border-blue-100 sm:border-none"
            >
              Accueil
            </button>
            <button
              onClick={logout}
              className="flex items-center text-red-600 hover:text-red-800 transition-colors font-semibold px-2 py-1.5 text-[10px] sm:text-base rounded-md hover:bg-red-50 border border-red-100 sm:border-none"
            >
              <LogOut className="w-3 h-3 sm:w-5 sm:h-5 mr-1" />
              <span className="hidden xs:inline">Sortir</span>
              <span className="xs:hidden">Off</span>
            </button>
          </div>
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
              {/* Logo TRBR */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src="/tribr.jpeg"
                  alt="Logo TRBR"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Titres centraux */}
              <div className="flex flex-col items-center flex-1 mx-2 sm:mx-4 text-center">
                <h1 className="text-[10px] sm:text-[18px] font-extrabold text-[#1a1a1a] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2 w-full">
                  République du Bénin
                </h1>
                {/* Ligne Tricolore */}
                <div className="w-32 sm:w-48 h-1 sm:h-1.5 flex mb-1.5 sm:mb-3 shadow-sm rounded-sm overflow-hidden">
                  <div className="flex-1 bg-[#00A650]"></div>
                  <div className="flex-1 bg-[#FCD116]"></div>
                  <div className="flex-1 bg-[#EB1C24]"></div>
                </div>
                <h2 className="text-[10px] sm:text-[15px] font-bold text-[#333] uppercase whitespace-nowrap hidden sm:block tracking-wide">
                  TRBR PASS
                </h2>
                <h2 className="text-[9px] font-bold text-[#333] uppercase text-center leading-tight sm:hidden w-full">
                  TRBR<br />PASS
                </h2>
              </div>

              {/* Spacer pour l'équilibre */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0"></div>
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



              {/* Data list */}
              <div className="flex-1 ml-1 sm:ml-2 text-[8px] sm:text-[13px] leading-[1.5] sm:leading-[1.8] my-auto">
                <div className="flex mb-1 sm:mb-1.5">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Nom :</span>
                  <span className="font-bold uppercase flex-1 text-gray-900 tracking-wider">{user.last_name || 'XXXXXXXXXX'}</span>
                </div>
                {/* PRENOM EN NOIR */}
                <div className="flex mb-1 sm:mb-1.5">
                  <span className="w-[70px] sm:w-[130px] text-gray-500 font-medium whitespace-nowrap">Prénom(s) :</span>
                  <span className="font-bold flex-1 uppercase tracking-wider text-gray-900">{user.first_name || 'XXXXXXXXXX'}</span>
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
                    value={user.nip || '0000000000'}
                    style={{ width: '100%', height: '100%', maxWidth: '110px' }}
                    className="w-[55px] h-[55px] sm:w-[105px] sm:h-[105px]"
                    level="M"
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



          </div>
        </div>


      </div>
    </div>
  );
}
