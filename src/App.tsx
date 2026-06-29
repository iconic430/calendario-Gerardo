/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getPatientFromURL } from './utils';
import { PreFormPatient } from './types';
import { 
  MessageCircle, 
  Calendar, 
  CheckCircle, 
  Sparkles,
  Smile
} from 'lucide-react';

export default function App() {
  // Read and parse URL query parameters for Patient metadata to personalize the screen
  const [patient, setPatient] = useState<PreFormPatient>(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    return getPatientFromURL(params);
  });

  // Sync state if URL query parameters change (e.g. simulation or redirected params)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setPatient(getPatientFromURL(params));
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  return (
    <div id="app-root-container" className="min-h-screen bg-[#A2C4D9] text-slate-900 flex flex-col justify-between selection:bg-[#F3D8B8] selection:text-slate-950 font-sans overflow-x-hidden relative">
      
      {/* Background Subtle Highlights using requested palette */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F1E3D1]/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#C9D3DD]/60 rounded-full blur-[120px] pointer-events-none translate-y-1/3" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#F3D8B8]/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-[#C9D3DD]/80 bg-white/70 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A2C4D9]/20 flex items-center justify-center border border-[#A2C4D9]/30 text-slate-800">
              <Smile size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-600">Portal de Reserva</div>
              <div className="text-sm font-serif font-bold text-slate-900 tracking-wide">Dr. Gerardo López</div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F1E3D1]/55 border border-[#C9D3DD]/90 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-700 font-bold">Reserva Segura</span>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-16 relative z-10 flex flex-col items-center justify-center">
        
        {/* Animated Badge & Intro */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4 max-w-3xl"
        >
          {patient.name && (
            <div className="inline-flex items-center gap-2 bg-white/70 border border-[#C9D3DD] px-4 py-1.5 rounded-full text-xs text-slate-800 font-semibold mb-2 shadow-sm">
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
              Hola, {patient.name}
            </div>
          )}

          {/* Core Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight md:leading-tight">
            ¡Gracias por solicitar tu{' '}
            <span className="text-slate-900 block md:inline-block font-extrabold relative">
              Evaluación Dental!
              <span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#F3D8B8] rounded-full z-[-1]" />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-850 font-mono text-xs md:text-sm font-extrabold uppercase tracking-widest pt-2">
            EN UNOS INSTANTES RECIBIRÁS UN WHATSAPP PARA CONFIRMAR TU CITA
          </p>

          <p className="text-slate-700 text-xs md:text-sm tracking-wide max-w-2xl mx-auto pt-1 font-semibold">
            MIENTRAS TANTO, LEE LOS PASOS PARA SABER QUÉ SIGUE Y CÓMO PREPARARTE:
          </p>
        </motion.div>

        {/* 3 Step Interactive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mt-12 md:mt-16">
          
          {/* STEP 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl relative border-2 border-transparent hover:border-[#F3D8B8] transition-all duration-300 group flex flex-col justify-between min-h-[250px]"
          >
            <div>
              {/* Step bubble circle */}
              <div className="w-12 h-12 rounded-full bg-[#F3D8B8] text-slate-900 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-950 mt-6 mb-3">
                Paso 1
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Revisa tu WhatsApp. En unos segundos recibirás un mensaje de nuestro equipo con dirección, horarios y datos para agendar tu cita.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono tracking-wider font-bold text-slate-500">INSTANTÁNEO</span>
              <MessageCircle size={16} className="text-[#A2C4D9] group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl relative border-2 border-transparent hover:border-[#F3D8B8] transition-all duration-300 group flex flex-col justify-between min-h-[250px]"
          >
            <div>
              {/* Step bubble circle */}
              <div className="w-12 h-12 rounded-full bg-[#F3D8B8] text-slate-900 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-950 mt-6 mb-3">
                Paso 2
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Ten a mano tu agenda para elegir el día y hora que más te acomode.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono tracking-wider font-bold text-slate-500 font-bold">PREPARACIÓN</span>
              <Calendar size={16} className="text-[#A2C4D9] group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white text-slate-900 rounded-3xl p-8 shadow-xl relative border-2 border-transparent hover:border-[#F3D8B8] transition-all duration-300 group flex flex-col justify-between min-h-[250px]"
          >
            <div>
              {/* Step bubble circle */}
              <div className="w-12 h-12 rounded-full bg-[#F3D8B8] text-slate-900 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-950 mt-6 mb-3">
                Paso 3
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Confirma tu asistencia o reagenda a través de WhatsApp.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono tracking-wider font-bold text-slate-500 font-bold">SOPORTE</span>
              <CheckCircle size={16} className="text-[#A2C4D9] group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>



      </main>

      {/* Footer */}
      <footer className="border-t border-[#C9D3DD] py-6 px-6 bg-[#A2C4D9]/45 text-center text-xs text-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-serif font-bold text-sm">Odontología Integral</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-[10px] font-bold">DR. GERARDO LÓPEZ</span>
          </div>
          <p className="font-medium text-slate-700">© {new Date().getFullYear()} Clínica Odontológica. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
