/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function CalendarContainer() {
  useEffect(() => {
    // Dynamic loading of the LeadConnector form embed script
    const script = document.createElement('script');
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Container with clean dashed modular frame per instructions */}
      <div 
        id="modular-calendar-box" 
        className="w-full relative bg-white border-2 border-dashed border-teal-500/30 rounded-3xl p-1 pb-2 shadow-sm transition-all duration-300"
      >
        {/* Dynamic header inside the calendar box */}
        <div className="absolute -top-3 left-6 bg-teal-650 text-white text-[9px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
          <Sparkles size={11} className="animate-pulse text-teal-200" />
          Calendario Especializado
        </div>

        <div className="pt-3 overflow-hidden rounded-2xl">
          {/* Calendar Appointment Booking iFrame integration */}
          <iframe 
            src="https://api.leadconnectorhq.com/widget/booking/FHJkhdJB1MsBSsFXhne5" 
            style={{ width: '100%', minHeight: '620px', border: 'none', overflow: 'hidden' }} 
            scrolling="no" 
            id="FHJkhdJB1MsBSsFXhne5_1780086992620"
            title="LeadConnector Booking widget"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
