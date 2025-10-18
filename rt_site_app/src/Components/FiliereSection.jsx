import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Wifi,
  ShieldCheck,
  Cloud,
  Network,
  Cpu,
  Satellite,
} from "lucide-react";

export default function FiliereSection() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [x, setX] = useState(0);
  const speed = 0.03;

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (!isHovered) setX((prev) => (prev - speed < -50 ? 0 : prev - speed));
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const features = [
    {
      icon: <Wifi className="w-7 h-7 text-[var(--primary-light)]" />,
      title: "Transmission & Communication",
      items: [
        "Propagation guidée et fibres optiques",
        "Transmission des données",
        "Techniques de modulation analogiques et numériques",
      ],
    },
    {
      icon: <Network className="w-7 h-7 text-[var(--primary-light)]" />,
      title: "Réseaux & Protocoles",
      items: [
        "Réseaux LAN, WAN et MPLS",
        "Protocoles de routage IP et BGP",
        "Réseaux d’opérateurs et virtualisation",
      ],
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[var(--primary-light)]" />,
      title: "Cybersécurité & Cloud",
      items: [
        "Sécurité des réseaux et cryptographie",
        "Audit et gouvernance de la cybersécurité",
        "Cloud computing et administration des datacenters",
      ],
    },
    {
      icon: <Satellite className="w-7 h-7 text-[var(--primary-light)]" />,
      title: "Télécommunications Avancées",
      items: [
        "Systèmes radio mobiles (4G/5G)",
        "Systèmes hyperfréquences et antennes",
        "Radio logicielle et communications satellitaires",
      ],
    },
    {
      icon: <Cpu className="w-7 h-7 text-[var(--primary-light)]" />,
      title: "IoT & Technologies Emergentes",
      items: [
        "Objets connectés et réseaux de capteurs (WSN)",
        "Linux embarqué et systèmes temps réel",
        "Intelligence artificielle appliquée aux réseaux",
      ],
    },
  ];

  const doubled = [...features, ...features];

  return (
    <section className="relative py-24 text-white bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] overflow-hidden">
    
      <div className="max-w-5xl mx-auto px-6 text-center mb-16 relative z-10">
        <p className="text-indigo-300 uppercase tracking-widest text-sm mb-3">
          FILIÈRE RT
        </p>
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Ingénierie Réseaux & Télécoms
        </h2>
        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          La filière <strong>Réseaux et Télécommunications</strong> forme des
          ingénieurs capables de concevoir, déployer et sécuriser les
          infrastructures de communication modernes. Elle couvre un large spectre :
          transmission, protocoles, cybersécurité, cloud computing et IoT. Les
          étudiants acquièrent des compétences techniques solides et une vision
          d’ensemble des systèmes connectés de demain.
        </p>
        <button
          onClick={() => navigate("/filiere")}
          className="px-6 py-3 border border-[var(--primary)] text-white rounded-lg transition ease-in-out duration-300 transform bg-[var(--primary-dark)] hover:text-[var(--primary-light)] hover:scale-110 text-sm sm:text-base"
        >
          Explorer la Filière
        </button>
      </div>

      <div
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredIndex(null);
        }}
      >
        <motion.div style={{ x: `${x}%` }} className="flex gap-6 w-max">
          {doubled.map((card, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`min-w-[320px] p-6 rounded-2xl border backdrop-blur-md transition-all duration-300
                ${
                  hoveredIndex === index
                    ? "bg-white/15 border-[var(--primary-light)] shadow-[0_0_30px_-5px_var(--primary-light)]"
                    : "bg-white/5 border-white/10 shadow-none"
                }`}
            >
              <div className="flex items-center gap-3 mb-4 justify-center">
                {card.icon}
                <h3 className="text-xl font-semibold">{card.title}</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm text-left">
                {card.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--primary)] to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--primary-dark)] to-transparent"></div>
      </div>
    </section>
  );
}
