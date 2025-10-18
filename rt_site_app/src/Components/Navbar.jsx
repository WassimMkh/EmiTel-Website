import { useState, useEffect } from "react";
import { Menu, X, House, GraduationCap, UsersRound, Brain } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white border border-[var(--border)] px-6 py-3 ${
        scrolled ? "mx-20" : "mx-6"
      } my-2 rounded-xl shadow-lg flex items-center justify-between sticky top-0 z-50 transition-all duration-500`}
    >
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Emi Tel"
          className={`transition-all duration-500 ${
            scrolled ? "h-10" : "h-12"
          } w-auto`}
        />
      </div>

      <div className="hidden md:flex items-center gap-2 text-black">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-[var(--primary)] hover:bg-[var(--primary-bg)] active-link"
        >
          <House className="w-5 h-5" /> Accueil
        </Link>
        <Link
          to="/filiere"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"
        >
          <GraduationCap className="w-5 h-5" /> Filière
        </Link>
        <a
          href="/members"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"
        >
          <UsersRound className="w-5 h-5" /> Membres
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"
        >
          <Brain className="w-5 h-5" /> Projets
        </a>
      </div>
      <div className="hidden md:flex gap-3">
        <button className="px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary-light)] hover:text-white transition">
          Contact Us
        </button>
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full backdrop-blur-md bg-white/95 p-4 flex flex-col gap-4 md:hidden shadow-lg border-t border-[var(--border)] divide-y divide-[var(--border)]">
          <a href="#" className="flex items-center gap-2 px-3 py-2 hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"><House className="w-5 h-5" />Accueil</a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"><GraduationCap className="w-5 h-5" />Filiére</a>
          <a href="/members"className="flex items-center gap-2 px-3 py-2 hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"><UsersRound className="w-5 h-5" />Bureau</a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 hover:text-[var(--primary)] hover:bg-[var(--primary-bg)]"><Brain className="w-5 h-5" />Projets</a>
          <button className="px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary-light)] hover:text-white transition">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
}
