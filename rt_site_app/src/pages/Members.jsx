import { useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Crown, Calendar, Cpu, Users, Star } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const cellules = [
  { name: "Cellule Présidentielle", icon: <Crown className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Évènement", icon: <Calendar className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Sponsoring", icon: <Star className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Média", icon: <Users className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Revue", icon: <Users className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Conception", icon: <Cpu className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Logistique", icon: <Users className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule IT", icon: <Cpu className="w-5 h-5 text-blue-600" /> },
  { name: "Network Training", icon: <Users className="w-5 h-5 text-blue-600" /> },
  { name: "Telecommnunication Training", icon: <Users className="w-5 h-5 text-blue-600" /> },
  { name: "Cellule Projet", icon: <Users className="w-5 h-5 text-blue-600" /> },
];

const members = {
  "Cellule Présidentielle": [
    { name: "EL KABRITI Yassine", role: "Président", image: "", linkedin: "https://www.linkedin.com/in/yassine-el-kabriti-10438a247?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BwumvQwoHQ%2BiSPEMsfCZOLg%3D%3D" },
    { name: "TAHIRI Zakariae", role: "Vice-président", image: "", linkedin: "https://www.linkedin.com/in/tahirizakariae?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bzl2xX2QxSaueHpxY398eQA%3D%3D" },
    { name: "AISSOUNI Wiam", role: "Secrétaire Générale", image: "", linkedin: "#" },
  ],
  "Cellule Évènement": [
    { name: "BEN MCHICHE Yousra", role: "Responsable Évènements", image: "", linkedin: "#" },
  ],
  "Cellule Sponsoring": [
    { name: "OUELDA Chaimae", role: "Responsable Sponsoring", image: "", linkedin: "#" },
  ],
  "Cellule Média": [
    { name: "BBA Marwa", role: "Responsable Média", image: "", linkedin: "#" },
  ],
  "Cellule Revue": [
    { name: "EL FADI Anas", role: "Responsable Revue", image: "", linkedin: "#" },
  ],
  "Cellule Conception": [
    { name: "ZAIDOURY Najlae", role: "Responsable Conception", image: "", linkedin: "#" },
  ],
  "Cellule Logistique": [
    { name: "ESSAGHYR Mohamed", role: "Responsable Revue", image: "", linkedin: "#" },
  ],
  "Cellule IT": [
    { name: "MAKHOUKHI Wassim", role: "Responsable IT", image: "", linkedin: "#" },
  ],
  "Network Training": [
    { name: "LAGHDAS Salma", role: "Network Trainers", image: "", linkedin: "#" },
    { name: "KERROUCHI Mohamed", role: "Network Trainers", image: "", linkedin: "#" },
  ],
  "Telecommnunication Training": [
    { name: "EN-NIYA Zouhier", role: "Telecommnunication Trainers", image: "", linkedin: "#" },
    { name: "NAHASSE Adam", role: "Telecommnunication Trainers", image: "", linkedin: "#" },
  ],
  "Cellule Projet": [
    { name: "HEJELI Hajar", role: "Responsable Projet", image: "", linkedin: "#" },
    { name: "KHADIM EDDINE Zaid", role: "Responsable Projet", image: "", linkedin: "#" },
  ],
};

export default function Members() {
  const [index, setIndex] = useState(0);
  const currentCellule = cellules[index];

  const next = () => setIndex((prev) => (prev + 1) % cellules.length);
  const prev = () => setIndex((prev) => (prev - 1 + cellules.length) % cellules.length);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 text-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-3">Meet the Team</h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Découvrez les membres passionnés et les différentes cellules d'EMITEL qui façonnent l'avenir des télécommunications.
      </p>

      <div className="flex justify-center items-center space-x-8 mb-10">
        <button
          onClick={prev}
          className="p-2 text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2]" />
        </button>

        <motion.div
          key={currentCellule.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white shadow-sm border border-blue-100"
        >
          {currentCellule.icon}
          <span className="text-lg font-semibold text-blue-700">{currentCellule.name}</span>
        </motion.div>

        <button
          onClick={next}
          className="p-2 text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 stroke-[2]" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCellule.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-10"
        >
          {members[currentCellule.name]?.map((m) => (
            <motion.div
              key={m.name}
              whileHover={{ scale: 1.05 }}
              className="w-64 bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5"
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
              />
              <h3 className="text-lg font-semibold text-blue-700">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.role}</p>
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3">
                <Linkedin className="w-5 h-5 text-blue-600 hover:text-blue-800 mx-auto" />
              </a>
            </motion.div>
          )) || (
            <p className="text-gray-500 italic">Aucun membre trouvé pour cette cellule.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
