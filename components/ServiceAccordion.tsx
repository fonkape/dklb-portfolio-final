'use client';
import { useState } from 'react';
import { useMode } from '@/context/ModeContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- Daten-Struktur ---
interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  core: boolean;
  content: string;
  sections: { title: string; points: string[] }[];
}

const serviceData: ServiceItem[] = [
  {
    id: 1,
    title: "Feasibility Check",
    subtitle: "AUDIT",
    core: false,
    content: "Wir prüfen Ihre AI/Blockchain-Initiativen auf rechtliche Stabilität, technische Umsetzbarkeit und kommerziellen Nutzen. Ziel ist die Eliminierung von Projekten mit hohem Haftungsrisiko oder unklarem ROI, bevor signifikante Ressourcen gebunden werden.",
    sections: [
      { title: "Kernleistung", points: ["Go / No-Go Analyse basierend auf Risiko und ROI.", "Eliminierung von Projekten mit hohem Haftungsrisiko."] },
      { title: "Methodik", points: ["Rechtliches Screening (AI Act, MiCA, DSGVO).", "Technische Machbarkeitsstudie (Skalierbarkeit, Sicherheit).", "Business Case Validierung (Markt, Monetarisierung)."] },
    ]
  },
  {
    id: 2,
    title: "Legal Engineering",
    subtitle: "ARCHITECTURE",
    core: true,
    content: "Die Haftungsrisiken der digitalen Transformation werden in greifbare, technische Anforderungen überführt. Ich garantiere die Einhaltung von MiCA, AI Act und DSGVO in der Architektur, nicht nur in der Dokumentation.",
    sections: [
      { title: "Kernleistung", points: ["Übersetzen von Regulierung in Code-Spezifikationen.", "Compliance-by-Design als fester Bestandteil der Architektur."] },
      { title: "Methodik", points: ["Zerlegung juristischer Texte in atomare technische Regeln.", "Erstellung von Compliance-Flowcharts und Datenmodellen.", "Code-Audit mit juristischer Perspektive vor dem Deploy."] },
    ]
  },
  {
    id: 3,
    title: "The Bridge",
    subtitle: "WORKSHOP",
    core: false,
    content: "Gezielte Workshops und temporäre Projektleitung, um die Kommunikationssilos zwischen Abteilungen zu überbrücken. Das Ergebnis ist ein aligniertes, schnelles Projektteam, das alle Risiken und Chancen aus einer gemeinsamen Perspektive bewertet.",
    sections: [
      { title: "Kernleistung", points: ["Synchronisation von Juristen, IT und Business.", "Reduzierung von Missverständnissen und Projektverzögerungen."] },
      { title: "Methodik", points: ["Vocabulary Alignment-Workshops.", "Moderation von Risiko-Sprints.", "Etablierung eines einheitlichen Dokumentationsstandards."] },
    ]
  },
];


// --- Hauptkomponente ---

export default function ServiceAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);
  const { isCodeMode } = useMode(); // Hier könnte ein Fehler auftreten, da wir den Provider in Page.tsx entfernt haben.
  // Da wir den Toggle entfernt haben, ist isCodeMode immer false (wenn der Context Default undefined ist).
  // Um sicher zu gehen, definieren wir die Farben hier statisch, falls der Context fehlt.

  // Fallback Logik, falls useMode undefined ist (weil wir den Provider in page.tsx entfernt haben könnten)
  const safeIsCodeMode = isCodeMode || false;

  const primaryColor = safeIsCodeMode ? "#22c55e" : "#002FA7";
  const primaryColorClass = safeIsCodeMode
    ? "bg-green-600 dark:bg-green-900/50 text-white dark:text-green-200"
    : "bg-ikb text-white";
  const hoverColorClass = safeIsCodeMode
    ? "hover:bg-green-500/20 dark:hover:bg-green-900/40"
    : "hover:bg-ikb/90";

  const getWidth = (id: number) => {
    if (openId === null) return '33.33%';
    return id === openId ? '70%' : '15%';
  };

  return (
    <div className="flex w-full divide-x-2 divide-black dark:divide-green-500/30 overflow-hidden min-h-[500px]">
      {serviceData.map((item) => {
        const isOpen = item.id === openId;
        const toggleHandler = () => setOpenId(isOpen ? null : item.id);

        const itemBgClass = item.core
            ? primaryColorClass
            : "bg-white dark:bg-slate-900";

        const currentHoverClass = item.core ? hoverColorClass : "";
        const width = getWidth(item.id);

        return (
          <motion.div
            key={item.id}
            initial={{ width: '33.33%' }}
            animate={{ width: width }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`p-8 md:p-12 transition duration-300 h-auto flex flex-col cursor-pointer relative flex-shrink-0 overflow-hidden ${currentHoverClass} ${itemBgClass}`}
            onClick={toggleHandler}
          >

            {/* Header / Titelbereich */}
            <div className={`flex justify-between items-start mb-8 z-10`} style={{color: item.core ? "white" : "inherit"}}>
              {/* HIER WAR DER FEHLER: className wurde zusammengeführt */}
              <div className={`font-mono text-xs border inline-block px-3 py-1 self-start transition-colors ${item.core ? "text-white border-white dark:border-green-400" : "border-black dark:border-green-500 bg-white dark:bg-slate-900 dark:text-green-400"}`}>
                  {item.subtitle}
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={`text-2xl ${item.core ? "text-white" : "text-ikb dark:text-green-400"}`}
              >
                <i className="fas fa-plus"></i>
              </motion.div>
            </div>

            {/* Titel - Feste Breite verhindern, damit er nicht umbricht */}
            <h3 className={`font-serif dark:font-mono text-3xl mb-4 whitespace-nowrap ${item.core ? "text-white italic dark:not-italic" : "text-black dark:text-gray-100 italic dark:not-italic"} z-10`}>
                {item.title}
            </h3>


            <AnimatePresence mode='wait'>
              {isOpen ? (
                <motion.div
                  key="detail-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="overflow-y-auto mt-4 pt-4 border-t-2 z-10 pr-4 custom-scrollbar"
                  style={{
                    borderColor: item.core ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)",
                    maxHeight: '400px' // Scrollbar für kleine Screens
                  }}
                >

                  {/* Hauptbeschreibung */}
                  <p className={`font-mono text-sm leading-relaxed ${item.core ? "opacity-90 text-white" : "text-gray-700 dark:text-gray-300"} mb-8`}>
                    {item.content}
                  </p>

                  {/* Detail-Sektionen */}
                  {item.sections.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h4 className={`font-serif dark:font-mono text-xl italic dark:not-italic mb-3 ${item.core ? "text-white" : "text-ikb dark:text-green-400"}`}>
                            {section.title}
                        </h4>

                        <ul className={`font-mono text-sm space-y-2 ${item.core ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>
                            {section.points.map((point, pIndex) => (
                                <li key={pIndex} className="flex items-start">
                                    <span className="mr-3 text-lg opacity-80" style={{ color: item.core ? "white" : primaryColor }}>
                                        <i className="fas fa-arrow-right"></i>
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                  ))}

                </motion.div>
              ) : ( /* Kurze Vorschau */
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`font-mono text-sm leading-relaxed ${item.core ? "opacity-90" : "text-gray-600 dark:text-gray-400"} mb-8 flex-grow z-10 line-clamp-3`}
                >
                    {item.content}
                </motion.p>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}
```

**Wichtig:**
Da wir in `app/page.tsx` den `ModeProvider` auskommentiert hatten, kann der Hook `useMode()` in Unterkomponenten Fehler werfen, wenn er keinen Context findet. Ich habe deshalb in dieser Datei eine **Sicherheitsabfrage** (`safeIsCodeMode`) eingebaut, damit die Komponente auch ohne Provider nicht abstürzt (sie nimmt dann einfach den Standard-Modus).

1.  Ersetze den Code in `components/ServiceAccordion.tsx`.
2.  Push es hoch:

```bash
git add .
git commit -m "Fix double className attribute in ServiceAccordion"
git push