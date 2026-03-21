import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Voter', href: '#voter' },
    { name: 'Résultats', href: '#resultats' }
  ];

  const legalLinks = [
    { name: "Conditions d'utilisation", href: '#' },
    { name: 'Politique de confidentialité', href: '#' },
    { name: 'Mentions légales', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Slogan */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start mb-4">
              <a href="#accueil" className="block mb-2">
                <Image 
                  src="/logo.png" 
                  alt="Logo E-Vote" 
                  width={200} 
                  height={80}
                  className="w-24 h-24 object-contain hover:opacity-90 transition-opacity"
                />
              </a>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Le pouls de la démocratie. Une plateforme citoyenne pour exprimer votre opinion.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens légaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Liens légaux</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <a
                  href="mailto:contact@epsond.com"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                   tribrmag@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-gray-300"> +229 01 49 94 44 44</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1" />
                <span className="text-gray-300">Bénin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Vote Party. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
