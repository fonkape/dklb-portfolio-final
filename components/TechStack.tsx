'use client';
import { Reveal } from "@/components/Reveal";

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900 border-b-2 border-black dark:border-green-500/30 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="grid md:grid-cols-12 gap-12 mb-20 border-b-2 border-black dark:border-green-500/30 pb-8">
          <div className="md:col-span-5">
            <Reveal>
                <h2 className="font-serif dark:font-mono text-5xl italic dark:not-italic leading-tight text-black dark:text-gray-100">
                Tech Stack<br/>& Certs
                </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 flex items-end">
            <Reveal delay={0.2}>
                <p className="font-mono text-lg pl-8 border-l-4 border-ikb dark:border-green-500 max-w-xl text-gray-700 dark:text-gray-300">
                Nicht nur Theorie. Handfeste technische Qualifikation und tägliche Werkzeuge.
                </p>
            </Reveal>
          </div>
        </div>

        {/* ZERTIFIKATE GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: "fa-cube", title: "Blockchain Architect", subtitle: "Certified (2026 Goal)" },
            { icon: "fa-python", title: "Python Associate", subtitle: "PCAP Certified (2025)" },
            { icon: "fa-aws", title: "Cloud Practitioner", subtitle: "AWS Certified (2025)" }
          ].map((cert, i) => (
            <Reveal key={i} delay={0.1 * i}>
                <div className="border-2 border-black dark:border-green-500/30 p-8 text-center hover:bg-gray-50 dark:hover:bg-slate-800 transition group">
                    <div className="h-20 flex items-center justify-center mb-6 text-gray-800 dark:text-gray-400 group-hover:text-ikb dark:group-hover:text-green-400 transition-colors">
                        <i className={`fab ${cert.icon} text-5xl`}></i>
                        {/* Fallback für fa-cube (ist solid, nicht brand) */}
                        {cert.icon === 'fa-cube' && <i className="fas fa-cube text-5xl"></i>}
                    </div>
                    <h3 className="font-serif dark:font-mono font-bold text-xl mb-2 text-black dark:text-white">{cert.title}</h3>
                    <p className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">{cert.subtitle}</p>
                </div>
            </Reveal>
          ))}
        </div>

        {/* TECH STACK LISTE */}
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 text-center">
            {[
                { title: "Languages", items: "Python, Solidity, JS, SQL" },
                { title: "Infra", items: "AWS, Docker, Terraform" },
                { title: "AI", items: "Llama, GPT-4, LangChain" },
                { title: "Web3", items: "Ethereum, Polygon, Hardhat" }
            ].map((stack, i) => (
                 <Reveal key={i} delay={0.3 + (0.1 * i)}>
                    <div>
                        <h4 className="font-mono font-bold uppercase mb-4 border-b border-black dark:border-green-500/50 pb-2 text-black dark:text-white">{stack.title}</h4>
                        <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{stack.items}</p>
                    </div>
                 </Reveal>
            ))}
        </div>

      </div>
    </section>
  );
}