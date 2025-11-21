'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from '@/context/ModeContext';

export default function UseCaseGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isCodeMode, t } = useMode(); // Wir holen uns das Wörterbuch

  // Hier laden wir die Daten dynamisch basierend auf der gewählten Sprache
  const cases = t.cases.items;

  const accentColor = isCodeMode ? "text-green-400" : "text-ikb";
  const borderColor = isCodeMode ? "border-green-500/30" : "border-black";
  const activeBorderColor = isCodeMode ? "border-green-400" : "border-ikb";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {cases.map((item) => {
        const isActive = activeId === item.id;

        return (
          <motion.div
            layout
            key={item.id}
            onClick={() => setActiveId(isActive ? null : item.id)}
            className={`bg-white dark:bg-slate-900 border-2 p-8 cursor-pointer relative group overflow-hidden transition-colors duration-500
              ${isActive ? `md:col-span-2 ${activeBorderColor} shadow-2xl` : `${borderColor} hover:border-gray-400 dark:hover:border-green-500/60`}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* HEADER BEREICH */}
            <motion.div layout="position" className="flex justify-between items-start mb-4">
               <div>
                 <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${isCodeMode ? 'text-green-500/60' : 'text-gray-400'}`}>
                    CASE {item.id}
                 </div>
                 <h3 className={`font-serif dark:font-mono text-2xl md:text-3xl ${isActive ? accentColor : 'text-black dark:text-gray-100'}`}>
                    {item.title}
                 </h3>
               </div>

               {/* Toggle Icon */}
               <motion.div
                 layout
                 className={`text-2xl ${isActive ? accentColor : 'text-gray-300 group-hover:text-black dark:group-hover:text-green-400'}`}
                 animate={{ rotate: isActive ? 45 : 0 }}
               >
                 <i className="fas fa-plus"></i>
               </motion.div>
            </motion.div>

            {/* INITIAL VIEW (Zusammenfassung) */}
            {!isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                >
                    <p className="font-mono text-sm text-gray-600 dark:text-gray-400 border-l-2 border-black dark:border-green-500/30 pl-4">
                        <span className="uppercase font-bold text-xs block mb-1 opacity-50">Problem:</span>
                        {item.hook}
                    </p>
                    <p className={`font-mono text-sm ${accentColor} border-l-2 border-transparent pl-4`}>
                         <span className="uppercase font-bold text-xs block mb-1 opacity-50 text-black dark:text-white">Lösung:</span>
                        {item.solution}
                    </p>
                </motion.div>
            )}

            {/* EXPANDED VIEW (Die 3-Akt Story) */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-12"
                >
                  <div className="grid md:grid-cols-3 gap-12 relative z-10">

                    {/* AKT 1: KONFLIKT */}
                    <div className="bg-white dark:bg-slate-900">
                        <div className={`w-8 h-8 rounded-full border-2 ${activeBorderColor} bg-white dark:bg-slate-900 flex items-center justify-center mb-6 font-mono font-bold text-xs z-10 relative`}>I</div>
                        <h4 className="font-serif dark:font-mono italic dark:not-italic text-lg mb-4 text-gray-500 dark:text-gray-400">Der Konflikt.</h4>
                        <h5 className="font-bold text-sm uppercase mb-2 tracking-wide opacity-70">{item.story.conflict.title}</h5>
                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {item.story.conflict.text}
                        </p>
                    </div>

                    {/* AKT 2: WENDE */}
                    <div className="bg-white dark:bg-slate-900">
                        <div className={`w-8 h-8 rounded-full border-2 ${activeBorderColor} ${isCodeMode ? 'bg-green-500 text-black' : 'bg-ikb text-white'} flex items-center justify-center mb-6 font-mono font-bold text-xs z-10 relative`}>II</div>
                        <h4 className={`font-serif dark:font-mono italic dark:not-italic text-lg mb-4 ${accentColor}`}>Die Architektur.</h4>
                        <h5 className="font-bold text-sm uppercase mb-2 tracking-wide opacity-70">{item.story.turning.title}</h5>
                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                             {item.story.turning.text}
                        </p>
                    </div>

                    {/* AKT 3: AUFLÖSUNG */}
                    <div className="bg-white dark:bg-slate-900">
                        <div className={`w-8 h-8 rounded-full border-2 ${activeBorderColor} bg-white dark:bg-slate-900 flex items-center justify-center mb-6 font-mono font-bold text-xs z-10 relative`}>III</div>
                        <h4 className="font-serif dark:font-mono italic dark:not-italic text-lg mb-4 text-black dark:text-white">Der Return.</h4>
                        <h5 className="font-bold text-sm uppercase mb-2 tracking-wide opacity-70">{item.story.resolution.title}</h5>
                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                             {item.story.resolution.text}
                        </p>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}