'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useMode } from '@/context/ModeContext';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xeonrbev");
  const { t, isCodeMode } = useMode();

  // Erfolgsmeldung
  if (state.succeeded) {
    return (
      <div className="p-6 border-2 border-ikb dark:border-green-500 bg-white dark:bg-slate-900 text-center animate-in fade-in duration-500">
        <i className="fas fa-check-circle text-4xl text-ikb dark:text-green-500 mb-4"></i>
        <h3 className="font-serif text-2xl italic mb-2">{t.footer.successTitle}</h3>
        <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
          {t.footer.successText}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

      {/* NAME FIELD (NEU HINZUGEFÜGT) */}
      <div>
        <input
          id="name"
          type="text"
          name="name"
          placeholder={t.footer.placeholderName}
          required
          className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400 transition-colors"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      {/* EMAIL FIELD */}
      <div>
        <input
          id="email"
          type="email"
          name="email"
          placeholder={t.footer.placeholderMail}
          required
          className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400 transition-colors"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      {/* MESSAGE FIELD */}
      <div>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t.footer.placeholderMsg}
          required
          className="w-full px-4 py-3 font-mono text-sm border-2 border-white bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-ikb dark:focus:border-green-400 transition-colors"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-ikb dark:bg-green-600 text-white font-mono font-bold text-lg px-10 py-4 hover:bg-white dark:hover:bg-green-400 hover:text-ikb dark:hover:text-black transition duration-300 border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {state.submitting ? (
            t.footer.sending
        ) : (
            <>
                <i className="fas fa-search"></i>
                {t.footer.button}
            </>
        )}
      </button>
    </form>
  );
}