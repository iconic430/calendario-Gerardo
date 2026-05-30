/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PreFormPatient {
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  priority: 'normal' | 'alta' | 'urgente';
  notes?: string;
  insuranceProvider?: string;
}

export interface AppointmentSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export interface BookedAppointment {
  id: string; // MD-XXXX
  patient: PreFormPatient;
  slot: AppointmentSlot;
  createdAt: string;
}
