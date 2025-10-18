import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import {
  Check,
  XCircle,
  UserRound,
  Network,
  Mail,
  ArrowLeft,
  ArrowRight,
  Send,
  Phone,
} from "lucide-react";
import logo from "../assets/logo2.png";

export default function StepperForm({ onClose }) {
  const steps = [
    { label: "Informations", icon: <UserRound className="w-5 h-5" /> },
    { label: "Cellule", icon: <Network className="w-5 h-5" /> },
    { label: "Confirmation", icon: <Send className="w-5 h-5" /> },
  ];

  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState([false, false, false]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    filiere: "",
    cellule: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const filieres = [
    "Civil",
    "Electrique",
    "Industriel",
    "Informatique",
    "Mecanique",
    "Mineral",
    "MIS",
    "Procédé Industriel",
    "Réseaux & Télécoms",
  ].sort((a, b) => a.localeCompare(b));

  
  const canSubmit = () => {
    try {
      const last = localStorage.getItem("lastSubmitTime");
      if (!last) return true;
      return Date.now() - parseInt(last) > 2 * 60 * 1000; 
    } catch {
      return true;
    }
  };

  useEffect(() => {
    let timeout;
    if (active === steps.length - 1 && completed[steps.length - 2]) {
      if (!canSubmit()) {
        alert("Vous avez déjà soumis récemment. Réessayez plus tard.");
        setActive(0);
        return;
      }

      setLoading(true);

      
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          DOMPurify.sanitize(value),
        ])
      );

      
      const allowedKeys = ["name", "email", "phone", "filiere", "cellule"];
      const finalData = Object.fromEntries(
        Object.entries(sanitizedData).filter(([k]) => allowedKeys.includes(k))
      );

      fetch("http://localhost:10000/api/NewMembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(finalData),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok && data.success) {
            localStorage.setItem("lastSubmitTime", Date.now().toString());
            setSuccess(true);
          } else {
            throw new Error(data.message || "Erreur d'envoi");
          }
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
          timeout = setTimeout(() => onClose && onClose(), 2000);
        });
    }
    return () => clearTimeout(timeout);
  }, [active, completed]);

  const handleChange = (e) => {
    const clean = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: clean });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone.trim());

  const canProceed = () => {
    if (active === 0)
      return (
        formData.name.trim().length >= 2 &&
        isValidEmail(formData.email) &&
        isValidPhone(formData.phone) &&
        formData.filiere
      );
    if (active === 1) return !!formData.cellule;
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    const newCompleted = [...completed];
    newCompleted[active] = true;
    setCompleted(newCompleted);
    setTimeout(() => {
      if (active < steps.length - 1) setActive((s) => s + 1);
    }, 300);
  };

  const handlePrev = () => {
    if (active > 0) setActive((s) => s - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative"
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Rejoignez le Club
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Complétez les étapes pour finaliser votre inscription
          </p>
        </div>

      
        <div className="flex items-center justify-between mb-12 px-6">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              <div
                className={`z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  completed[i]
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : active === i
                    ? "bg-white text-[var(--primary)] border-[var(--primary)]"
                    : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                {completed[i] ? <Check className="w-6 h-6" /> : step.icon}
              </div>
              <div
                className={`mt-3 text-sm ${
                  active >= i || completed[i]
                    ? "text-[var(--primary)]"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </div>
              {i < steps.length - 1 && (
                <div className="absolute top-6 right-[-50%] w-full">
                  <div className="h-[4px] bg-gray-200 w-full relative rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: completed[i] ? "100%" : "0%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="h-[4px] bg-[var(--primary)] absolute left-0 top-0 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        
        {active === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="grid gap-4"
          >
            <div className="flex items-center border rounded-lg px-4 py-2">
              <UserRound className="w-5 h-5 text-gray-400 mr-2" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom complet"
                autoComplete="off"
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-2">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                autoComplete="off"
                className={`w-full outline-none ${
                  isValidEmail(formData.email)
                    ? "text-gray-800"
                    : "text-red-500"
                }`}
              />
            </div>

            <div className="flex items-center border rounded-lg px-4 py-2">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Numéro de téléphone"
                type="tel"
                maxLength="10"
                autoComplete="off"
                className="w-full outline-none"
              />
            </div>

            <select
              name="filiere"
              value={formData.filiere}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">Sélectionnez votre filière</option>
              {filieres.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        
        {active === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                "Conception",
                "Événement",
                "IT",
                "Logistique",
                "Média",
                "Network Training",
                "Projet",
                "Revue",
                "Sponsoring",
                "Telecommunication training",
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFormData({ ...formData, cellule: c })}
                  className={`py-3 rounded-lg border text-sm font-medium transition ${
                    formData.cellule === c
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        
        {active === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col items-center py-8"
          >
            {loading && (
              <>
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-gray-700">Envoi des données...</div>
              </>
            )}
            {!loading && success && (
              <>
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="text-green-600 font-medium">
                  Candidature envoyée avec succès
                </div>
              </>
            )}
            {!loading && error && (
              <>
                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-3">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-red-600 font-medium">
                  Une erreur est survenue. Veuillez réessayer.
                </div>
              </>
            )}
          </motion.div>
        )}

        
        {!loading && !success && !error && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={active === 0}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg ${
                active === 0
                  ? "bg-gray-100 text-gray-300"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </button>

            {active < steps.length - 1 && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white ${
                  canProceed()
                    ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
                    : "bg-[var(--primary)]/40 cursor-not-allowed"
                }`}
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
