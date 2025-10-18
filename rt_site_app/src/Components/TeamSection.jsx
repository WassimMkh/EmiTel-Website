import { useNavigate } from "react-router-dom";

import teamImg from "../assets/team_image.jpg";

export default function TeamSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 bg-gradient-to-r from-white via-gray-50 to-gray-100 border border-gray-200 z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="md:w-1/2 text-center md:text-left flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Découvrez Notre Équipe
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Notre équipe est composée d'étudiants passionnés de <b>l'École Mohammadia d'Ingénieurs</b>, 
            travaillant ensemble pour <span className="text-[var(--primary-dark)] font-medium">innover</span>, 
            <span className="text-[var(--primary-dark)] font-medium"> construire</span> et 
            <span className="text-[var(--primary-dark)] font-medium"> partager le savoir </span> 
            dans les réseaux et les télécommunications.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 border border-[var(--primary)] text-white rounded-lg transition ease-in-out duration-300 transform bg-[var(--primary-light)] hover:text-[var(--primary-dark)] hover:scale-110 text-sm sm:text-base"
            >
              Voir Tous les Membres
            </button>
          </div>
        </motion.div>
        <motion.div
          className="md:w-3/5 flex justify-center hover:scale-105 transition duration-500"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="w-[120%] max-w-none aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={teamImg}
              alt="Notre Équipe"
              className="w-full h-full object-cover transform "
            />
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
