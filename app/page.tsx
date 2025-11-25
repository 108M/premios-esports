'use client';

import { useState } from 'react';

// --- DATOS DE EJEMPLO (ACTUALIZADOS CON TUS FOTOS) ---
const CATEGORIAS = [
  {
    id: 'mejor-player',
    titulo: 'Mejor Jugador del Año',
    candidatos: [
      { 
        id: 'p1', 
        nombre: 'Elyoya', 
        equipo: 'Movistar KOI', 
        // Ruta corregida: apunta a public/img/elyoya.jpg
        img: '/img/elyoya.jpg' 
      },
      { 
        id: 'p2', 
        nombre: 'Flakked', 
        equipo: 'Team Heretics', 
        // Ruta corregida: apunta a public/img/flakked.jpg
        img: '/img/flakked.jpg' 
      },
      { 
        id: 'p3', 
        nombre: 'Razork', 
        equipo: 'Fnatic', 
        // Ruta corregida: apunta a public/img/razork.jpg
        img: '/img/razork.jpg' 
      },
    ],
  },
  {
    id: 'mejor-streamer',
    titulo: 'Co stream del Año',
    candidatos: [
      { 
        id: 's1', 
        nombre: 'Knekro', 
        equipo: 'KOI', 
        // Nota: Si subes una foto ibai.jpg a la carpeta img, cambia esto a: '/img/ibai.jpg'
        img: 'https://via.placeholder.com/150/ea580c/ffffff?text=Ibai' 
      },
      { 
        id: 's2', 
        nombre: 'Werlyb', 
        equipo: 'Heretics', 
        img: 'https://via.placeholder.com/150/16a34a/ffffff?text=Nil' 
      },
    ],
  },
];

export default function VotacionesEsports() {
  // Estado para guardar los votos seleccionados: { 'mejor-player': 'p1', ... }
  const [votos, setVotos] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Manejar selección de candidato
  const seleccionarCandidato = (categoriaId: string, candidatoId: string) => {
    setVotos((prev) => ({
      ...prev,
      [categoriaId]: candidatoId,
    }));
  };

  // Manejar el envío del formulario
  const enviarVotos = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje('');

    // Validación básica: obligar a votar en todas las categorías
    if (Object.keys(votos).length < CATEGORIAS.length) {
      setMensaje('⚠️ Por favor, vota en todas las categorías antes de enviar.');
      setEnviando(false);
      return;
    }

    try {
      const response = await fetch('/api/votar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, votos }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('✅ ¡Votos registrados correctamente! Gracias por participar.');
        setVotos({}); // Limpiar votos
        setEmail(''); // Limpiar email
      } else {
        // Mostramos el error que viene del servidor (ej: "Email ya usado")
        setMensaje(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMensaje('❌ Hubo un error de conexión. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="py-10 text-center bg-gradient-to-b from-purple-900/20 to-slate-900">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            PREMIOS
          </span>{' '}
          IBERICOS
        </h1>
        <p className="text-slate-400">Vota por tus favoritos de la temporada</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        <form onSubmit={enviarVotos}>
          
          {/* Lista de Categorías */}
          {CATEGORIAS.map((cat) => (
            <section key={cat.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-purple-500 pl-4">
                {cat.titulo}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.candidatos.map((cand) => {
                  const isSelected = votos[cat.id] === cand.id;
                  return (
                    <div
                      key={cand.id}
                      onClick={() => seleccionarCandidato(cat.id, cand.id)}
                      className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 group ${
                        isSelected
                          ? 'border-purple-500 bg-purple-900/20 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* IMPORTANTE: Aquí usamos una etiqueta img normal.
                           Asegúrate de que las rutas en CATEGORIAS empiecen por '/'
                           y que los archivos existan en la carpeta 'public'.
                        */}
                        <img 
                          src={cand.img} 
                          alt={cand.nombre} 
                          className="w-16 h-16 rounded-full object-cover border border-slate-600 bg-slate-700"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{cand.nombre}</h3>
                          <p className="text-sm text-slate-400">{cand.equipo}</p>
                        </div>
                      </div>
                      
                      {/* Checkmark icon si está seleccionado */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-purple-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Sección de Validación (Email) */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 mt-10">
            <h3 className="text-xl font-bold mb-4">Confirma tu voto</h3>
            <p className="text-slate-400 text-sm mb-6">
              Para evitar spam, necesitamos verificar que eres una persona real. 
              Tu correo solo se usará para validar que no has votado dos veces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 text-white"
              />
              <button
                type="submit"
                disabled={enviando}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 transition-all shadow-lg"
              >
                {enviando ? 'Procesando...' : 'Enviar Votos 🚀'}
              </button>
            </div>

            {/* Mensajes de feedback (éxito o error) */}
            {mensaje && (
              <div className={`mt-4 p-4 rounded-lg text-center font-medium ${
                mensaje.includes('Error') || mensaje.includes('⚠️') 
                  ? 'bg-red-900/30 text-red-300' 
                  : 'bg-green-900/30 text-green-300'
              }`}>
                {mensaje}
              </div>
            )}
          </div>

        </form>
      </main>
    </div>
  );
}