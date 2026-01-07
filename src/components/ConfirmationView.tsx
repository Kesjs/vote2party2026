'use client';

import { CheckCircle2, Copy, Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Chargement dynamique du QRCode
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

interface ConfirmationViewProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    city: string;
  };
}

const ConfirmationView = ({ formData }: ConfirmationViewProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const referralLink = `https://votresite.com/parrainage/${formData.firstName.toLowerCase()}-${formData.lastName.toLowerCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Informations personnelles */}
          <div className="md:w-2/3 space-y-6">
            <div className="flex items-center space-x-2 text-green-600 mb-6">
              <CheckCircle2 className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Votre vote a été enregistré !</h2>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Récapitulatif</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="font-medium">{formData.city}, {formData.department}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Votre lien de parrainage</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 font-mono overflow-x-auto">
                  {referralLink}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
                <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center justify-center gap-2 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Partager</span>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">Partagez ce lien avec vos amis pour les inviter à voter</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <QRCode
                value={referralLink}
                size={200}
                level="H"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Scannez ce QR code pour accéder à votre lien de parrainage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationView;
