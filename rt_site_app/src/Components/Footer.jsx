import { Instagram, MapPin } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-12">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-light)]/20 to-transparent pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-12 text-gray-700">
        
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)] bg-clip-text text-transparent mb-2">
            EMITEL
          </h3>
          <p className="text-sm font-medium">
            Le Club de Réseaux & Télécoms de{" "}
            <a
              href="https://www.emi.ac.ma/"
              className="font-bold text-[var(--primary-light)] underline"
            >
              l'École Mohammadia d'Ingénieurs</a>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 md:w-1/2 justify-end">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Liens rapides
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-600">Accueil</a></li>
              <li><a href="/filiere" className="hover:text-blue-600">Filière</a></li>
              <li><a href="/membres" className="hover:text-blue-600">Membres</a></li>
              <li><a href="/projets" className="hover:text-blue-600">Projets</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Contact
            </h3>
            <p className="text-sm"><MapPin className='inline '></MapPin>Rabat, Maroc</p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-between items-center max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
        <div>
          © {new Date().getFullYear()} EMI TEL. Tous droits réservés.
        </div>

        <div className="flex space-x-4">
          <a
            href="#"
            className="p-2 rounded-full bg-gray-200 hover:bg-[var(--primary-light)]/30 transition-colors"
          >
            <Instagram className="w-5 h-5 text-gray-700" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-gray-200 hover:bg-[var(--primary-light)]/30 transition-colors"
          >
            <Linkedin className="w-5 h-5 text-gray-700" />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-gray-200 hover:bg-[var(--primary-light)]/30 transition-colors"
          >
            <Mail className="w-5 h-5 text-gray-700" />
          </a>
        </div>
      </div>
    </footer>
  )
}
