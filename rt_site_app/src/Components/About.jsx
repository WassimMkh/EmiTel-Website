    import { Users, Layers, Calendar, Rocket, UserRound} from "lucide-react";

    export default function About() {
    return (
        <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="font-bold bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)] bg-clip-text text-transparent mb-2">
                EMITEL
            </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
            EMI TEL est le club{" "}
            <span className="font-semibold relative inline-block">
                Réseaux & Télécoms
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary-dark)] animate-blink"></span>
            </span>{" "}
            de l'École Mohammadia d'Ingénieurs. Nous réunissons des étudiants
            passionnés par les technologies de communication afin d'apprendre,
            innover et développer des projets concrets dans le domaine des réseaux,
            télécommunications et du digital.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { number: "+13", label: "Membres actifs", icon: <UserRound size={32} className="" /> },
                { number: "+4", label: "Projets réalisés", icon: <Rocket size={32} className="" /> },
                { number: "2014", label: "Année de création", icon: <Calendar size={32} className="" /> },
            ].map((item, index) => (
                <div
                key={index}
                className="relative rounded-2xl overflow-hidden group 
                            transition-all duration-500 transform 
                            bg-white border-[0.5px] border-gray-400 hover:bg-transparent hover:scale-105"
                >
                <div className=" bg-white border-[0.5px] absolute inset-0 rounded-2xl opacity-0   group-hover:opacity-100 
                                border-[0.5px] border-[var(--primary-light)]/75 bg-gradient-to-br from-[var(--primary-light)]/25 via-[var(--primary-light)]/10 to-white
                                p-[2px] transition duration-500">
                </div>
                <div className="relative z-10 p-6 flex flex-col items-center">
                    <div className="flex gap-3 justify-center">
                        <div className="mb-2">{item.icon}</div>
                        <h3 className="text-2xl font-bold ">{item.number}</h3>
                    </div>
                    <p className="text-gray-600">{item.label}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }
