/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartPulse, Check, Sparkles } from 'lucide-react';
import { PreFormPatient } from '../types';

interface HeaderProps {
  patient: PreFormPatient;
  hasBooked: boolean;
}

export default function Header({ patient, hasBooked }: HeaderProps) {
  return (
    <header className="bg-slate-950 text-white w-full text-sans relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-800/40 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />

      <div className="max-w-md mx-auto px-5 pt-8 pb-7 relative z-10">
        
        {/* Clinica Logo Line */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <HeartPulse size={16} className="animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">Portal Clínico</span>
              <div className="text-xs text-teal-400 font-bold tracking-wide uppercase -mt-0.5">Dr. Gerardo López</div>
            </div>
          </div>
        </div>

        {/* Big Serif Medical Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight leading-10">
            {hasBooked ? 'Cita Confirmada' : 'Reserva de Turno'}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-[340px]">
            {hasBooked 
              ? 'Tu plaza en la agenda del especialista ha sido reservada con éxito.' 
              : <>Selecciona <strong className="text-teal-400 font-semibold">hora y día</strong> en el que deseas ser atendido. Una vez <strong className="text-teal-400 font-semibold">confirmada tu cita</strong>, te enviaremos un mensaje vía <strong className="text-teal-400 font-semibold">WhatsApp</strong> para enviarte los <strong className="text-teal-400 font-semibold">datos de la consulta</strong>.</>
            }
          </p>
        </div>

        {/* Linked Data Badge (Pill shapes per rule) */}
        {!hasBooked && (
          <div className="mt-5 flex justify-end">
            <span className="inline-block text-[10px] uppercase tracking-widest font-extrabold px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 shadow-sm font-mono">
              PASO 2 DE 3
            </span>
          </div>
        )}

      </div>
    </header>
  );
}
