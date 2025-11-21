'use client';
import { useMode } from '@/context/ModeContext';
import { motion } from 'framer-motion';

export default function LanguageSwitch() {
  const { language, setLanguage } = useMode();

  return (
    <div className="flex items-center gap-2 font-mono text-xs border border-black dark:border-green-500 rounded-full p-1 bg-white dark:bg-slate-900">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1 rounded-full transition-all duration-300 relative ${language === 'de' ? 'text-white' : 'text-gray-500 hover:text-black dark:hover:text-green-400'}`}
      >
        {language === 'de' && (
            <motion.div
                layoutId="lang-highlight"
                className="absolute inset-0 bg-ikb dark:bg-green-600 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <span className="relative z-10">DE</span>
      </button>

      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full transition-all duration-300 relative ${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-black dark:hover:text-green-400'}`}
      >
        {language === 'en' && (
            <motion.div
                layoutId="lang-highlight"
                className="absolute inset-0 bg-ikb dark:bg-green-600 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}