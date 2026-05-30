/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getPatientFromURL
} from './utils';
import { PreFormPatient } from './types';

// Importing Custom Layout Components
import Header from './components/Header';
import CalendarContainer from './components/CalendarContainer';

import { 
  AlertTriangle, 
  ShieldAlert
} from 'lucide-react';

export default function App() {
  // Read and parse URL query parameters for Patient metadata to personalize the header
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
    <div id="app-root-container" className="min-h-screen bg-slate-100 flex flex-col justify-start">
      
      {/* Device Wrapper Mockup to focus on PHONE visual design constraint 
          - On screens md+ it mimics a sleek slate device frame.
          - On mobile screens, it renders full bleed.
      */}
      <div className="w-full max-w-md mx-auto bg-slate-50 flex-1 shadow-2xl relative flex flex-col overflow-hidden min-h-[100vh] border-x border-slate-200/50">
        
        {/* Active colored ribbon */}
        <div className="bg-teal-500 h-1 w-full" />

        {/* Dynamic header personalized with parsed CRM variables */}
        <Header patient={patient} hasBooked={false} />

        <main className="flex-1 pb-10 px-5 pt-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="scheduler-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Conditional Clinical Alert: Urgencia / Prioridad Alta */}
              {patient.priority === 'urgente' && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <ShieldAlert size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-red-800 uppercase tracking-wide font-sans">
                      Orden Prioritaria Detectada
                    </h4>
                    <p className="text-[11px] text-red-600 leading-relaxed mt-0.5 font-medium">
                      Este turno se requiere a la brevedad. Selecciona el bloque habilitado más cercano en el calendario de abajo.
                    </p>
                  </div>
                </div>
              )}

              {patient.priority === 'alta' && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-wide font-sans">
                      Remisión Preferente Asignada
                    </h4>
                    <p className="text-[11px] text-amber-600 leading-relaxed mt-0.5 font-medium">
                      Su acceso ha sido prioritario debido a los antecedentes completados en el formulario de origen.
                    </p>
                  </div>
                </div>
              )}

              {/* The Modular embedded CRM calendar iframe container */}
              <CalendarContainer />

            </motion.div>
          </AnimatePresence>
        </main>
        
      </div>
    </div>
  );
}
