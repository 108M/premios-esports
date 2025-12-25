import React, { useState, useEffect } from 'react';
import logoImg from './assets/logo2.png'; 



function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-black text-yellow-500 mb-2">{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-sm md:text-lg uppercase tracking-widest text-gray-400">Días</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-black text-yellow-500 mb-2">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-sm md:text-lg uppercase tracking-widest text-gray-400">Horas</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-black text-yellow-500 mb-2">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-sm md:text-lg uppercase tracking-widest text-gray-400">Minutos</div>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-black text-yellow-500 mb-2">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-sm md:text-lg uppercase tracking-widest text-gray-400">Segundos</div>
      </div>
    </div>
  );
}

export default function App() {
  const TARGET_DATE = new Date('2026-12-09T12:00:00');  
  
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <nav className="p-4 flex justify-between items-center border-b border-white/5 bg-black/60 backdrop-blur-md sticky top-0 z-[100]">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Logo" className="h-6" />
          <span className="font-black uppercase tracking-tighter text-lg">
            Premios <span className="text-yellow-500">Ibéricos</span>
          </span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start max-w-5xl mx-auto w-full px-4 py-4 md:py-8">
          <div className="text-center py-20 animate-fade-in w-full">
            <img src={logoImg} alt="Logo" className="h-32 mx-auto mb-8 drop-shadow-[0_0_40px_rgba(234,179,8,0.4)]" />
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-[0.9]">
              NOS VEMOS EN 2026
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Creado por: @MisterWarrin @IndarGuasones
            </p>
          </div>
          <div className="w-full mb-12">
            <Countdown targetDate={TARGET_DATE} />
          </div>
      </main>
    </div>
  );
}