/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PreFormPatient } from './types';

// Get next N starting days from today
export function getAvailableDays(count: number = 7): string[] {
  const days: string[] = [];
  const today = new Date();
  
  let i = 0;
  while (days.length < count) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    // 0 is Sunday, let's keep it but flag it or skip it, skipping Sunday is more realistic for medical appointments
    if (nextDay.getDay() !== 0) {
      days.push(nextDay.toISOString().split('T')[0]);
    }
    i++;
  }
  return days;
}

export function formatLocalDate(isoString: string): string {
  const [year, month, day] = isoString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('es-ES', options);
}

export function getDayNameShort(isoString: string): string {
  const [year, month, day] = isoString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const daysShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return daysShort[date.getDay()];
}

export function getDayNumber(isoString: string): number {
  const [year, month, day] = isoString.split('-').map(Number);
  return day;
}

export function getMonthNameShort(isoString: string): string {
  const [year, month, day] = isoString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const monthsShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return monthsShort[date.getMonth()];
}

export function generateAppointmentId(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prefix = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

export const DEFAULT_PATIENTS: PreFormPatient[] = [
  {
    name: "Sofía Martínez",
    email: "sofia.martinez@email.com",
    phone: "+34 612 345 678",
    service: "Medicina General",
    doctor: "Dr. Alejandro Ruiz (Clínico)",
    priority: "normal",
    notes: "Control anual rutinario y revisión de análisis.",
    insuranceProvider: "Sanitas Platinum"
  },
  {
    name: "Mateo Silva",
    email: "mateo.silva@email.com",
    phone: "+34 678 901 234",
    service: "Odontología Preventiva",
    doctor: "Dra. Carolina Gómez (Odontopediatra)",
    priority: "normal",
    notes: "Limpieza profunda semestral.",
    insuranceProvider: "Adeslas Completa"
  },
  {
    name: "Valeria Mendoza",
    email: "valeria.mendoza@email.com",
    phone: "+34 654 321 098",
    service: "Neurología de Alta Complejidad",
    doctor: "Dr. Carlos Benítez (Neurocirujano)",
    priority: "urgente",
    notes: "Seguimiento de migrañas crónicas refractarias.",
    insuranceProvider: "Mapfre Salud"
  },
  {
    name: "Gabriel Fontana",
    email: "g.fontana@email.com",
    phone: "+34 699 888 777",
    service: "Kinesiología y Rehabilitación",
    doctor: "Lic. María Elena Paz (Kinesióloga)",
    priority: "alta",
    notes: "Sesión 4 de rehabilitación de esguince de tobillo grado II.",
    insuranceProvider: "Particular (Reembolso)"
  }
];

export function getPatientFromURL(searchParams: URLSearchParams): PreFormPatient {
  const name = searchParams.get('name') || "Santiago Norco";
  const email = searchParams.get('email') || "santiagonorco@gmail.com";
  const phone = searchParams.get('phone') || "+34 600 123 456";
  const service = searchParams.get('service') || "Cardiología Avanzada";
  const doctor = searchParams.get('doctor') || "Dra. Elena Albarracín";
  const priorityParam = searchParams.get('priority') || "normal";
  const priority = (priorityParam === 'urgente' || priorityParam === 'alta' || priorityParam === 'normal') 
    ? priorityParam 
    : 'normal';
  const notes = searchParams.get('notes') || "Derivación para chequeo preventivo por antecedentes familiares.";
  const insuranceProvider = searchParams.get('insurance') || "OSDE 310";

  return { name, email, phone, service, doctor, priority, notes, insuranceProvider };
}
