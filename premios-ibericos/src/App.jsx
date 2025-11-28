import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged, 
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection 
} from 'firebase/firestore';
import { 
  Trophy, 
  Gamepad2, 
  Mic2, 
  Sword, 
  Shield, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  LogIn,
  LogOut,
  User,
  Mail
} from 'lucide-react';

// --- TU CONFIGURACIÓN REAL DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAE1umwHioWzOYuYy_aNulPY6m6j5mWdVo",
  authDomain: "premiosibericos.firebaseapp.com",
  projectId: "premiosibericos",
  storageBucket: "premiosibericos.firebasestorage.app",
  messagingSenderId: "591868154216",
  appId: "1:591868154216:web:520b40aa5e0cd21093c6dd",
  measurementId: "G-5KE7VDQKC3"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ID de la aplicación para guardar los datos (fijo para local)
const APP_ID = "premios-ibericos-web"; 

// --- DATOS DE EJEMPLO (CATEGORÍAS Y CANDIDATOS) ---
const DATA = {
  categories: [
    {
      id: 'mvp',
      title: 'MVP de la Temporada',
      icon: <Trophy className="w-6 h-6" />,
      description: 'El jugador más valioso que ha dominado la Grieta del Invocador.',
      candidates: [
        { id: 'c1', name: 'Elyoya', team: 'MAD Lions', role: 'Jungla', img: '🦁' },
        { id: 'c2', name: 'Yike', team: 'G2 Esports', role: 'Jungla', img: '⚔️' },
        { id: 'c3', name: 'Razork', team: 'Fnatic', role: 'Jungla', img: '🔥' },
        { id: 'c4', name: 'Supa', team: 'Movistar KOI', role: 'ADC', img: '🐟' },
      ]
    },
    {
      id: 'rookie',
      title: 'Rookie del Año',
      icon: <Zap className="w-6 h-6" />,
      description: 'La nueva promesa que ha llegado para quedarse.',
      candidates: [
        { id: 'r1', name: 'Myrwn', team: 'MAD Lions', role: 'Top', img: '🏰' },
        { id: 'r2', name: 'Alvaro', team: 'MAD Lions', role: 'Support', img: '🛡️' },
        { id: 'r3', name: 'Freskowy', team: 'MAD Lions', role: 'Mid', img: '🧙' },
        { id: 'r4', name: 'Oscarinin', team: 'Fnatic', role: 'Top', img: '🤺' },
      ]
    },
    {
      id: 'caster',
      title: 'Mejor Caster',
      icon: <Mic2 className="w-6 h-6" />,
      description: 'La voz que nos ha emocionado en cada jugada.',
      candidates: [
        { id: 'ca1', name: 'Ibai', team: 'Streamer', role: 'Caster', img: '👑' },
        { id: 'ca2', name: 'Toad', team: 'LVP', role: 'Play-by-play', img: '🐸' },
        { id: 'ca3', name: 'Champi', team: 'LVP', role: 'Color', img: '🍄' },
        { id: 'ca4', name: 'Noa', team: 'LVP', role: 'Analista', img: '🎙️' },
      ]
    },
    {
      id: 'coach',
      title: 'Mejor Coach',
      icon: <Gamepad2 className="w-6 h-6" />,
      description: 'El cerebro detrás de las estrategias ganadoras.',
      candidates: [
        { id: 'co1', name: 'Melzhet', team: 'MAD Lions', role: 'Head Coach', img: '🧠' },
        { id: 'co2', name: 'Guilhoto', team: 'GiantX', role: 'Head Coach', img: '📝' },
        { id: 'co3', name: 'Brailer', team: 'Heretics', role: 'Coach', img: '📊' },
        { id: 'co4', name: 'Falco', team: 'Movistar KOI', role: 'Coach', img: '🦅' },
      ]
    }
  ]
};

// --- COMPONENTES UI ---

// Componente de Tarjeta de Candidato
const CandidateCard = ({ candidate, isSelected, onSelect }) => (
  <div 
    onClick={() => onSelect(candidate.id)}
    className={`
      relative group cursor-pointer transition-all duration-300 transform
      ${isSelected 
        ? 'ring-4 ring-yellow-500 scale-105 bg-gray-800' 
        : 'hover:scale-105 hover:bg-gray-800 bg-gray-900'
      }
      rounded-xl overflow-hidden shadow-lg border border-gray-700
    `}
  >
    {/* Fondo con gradiente sutil */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10" />
    
    {/* Imagen / Avatar Placeholder */}
    <div className="h-48 w-full bg-gray-800 flex items-center justify-center text-6xl relative z-0">
      <span className="transform group-hover:scale-110 transition-transform duration-500">
        {candidate.img}
      </span>
    </div>

    {/* Contenido */}
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1">
            {candidate.team}
          </p>
          <h3 className="text-white text-xl font-bold font-sans leading-tight">
            {candidate.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {candidate.role}
          </p>
        </div>
        {isSelected && (
          <div className="bg-yellow-500 text-black p-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]">
            <CheckCircle2 size={20} />
          </div>
        )}
      </div>
    </div>
  </div>
);

// Componente Principal
export default function App() {
  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState({}); // { categoryId: candidateId }
  const [currentStep, setCurrentStep] = useState(0); // Índice de categoría
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para el Email
  const [emailInput, setEmailInput] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // --- LÓGICA DE AUTENTICACIÓN Y CARGA ---
  useEffect(() => {
    // Escuchar cambios de estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Si hay usuario, intentamos cargar sus votos previos
        try {
          // Usamos una ruta simple para tu proyecto local
          const userDocRef = doc(db, 'votos', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.ballot) {
              setVotes(data.ballot);
              setHasSubmitted(true); // Ya votó
              if (data.userEmail) {
                setVoterEmail(data.userEmail);
              }
            }
          }
        } catch (error) {
          console.error("Error cargando votos:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Función para manejar el Login con Email
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError('Por favor, introduce un correo válido.');
      return;
    }

    try {
      setEmailError('');
      // Autenticación anónima en Firebase para seguridad de la sesión
      await signInAnonymously(auth); 
      // Guardamos el email validado en el estado local
      setVoterEmail(emailInput);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setEmailError('Error de conexión. Inténtalo de nuevo.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setVotes({});
    setHasSubmitted(false);
    setVoterEmail('');
    setEmailInput('');
    setCurrentStep(0);
  };

  // --- LÓGICA DE VOTACIÓN ---
  const handleVote = (candidateId) => {
    if (hasSubmitted) return;
    const categoryId = DATA.categories[currentStep].id;
    setVotes(prev => ({
      ...prev,
      [categoryId]: candidateId
    }));
  };

  const nextCategory = () => {
    if (currentStep < DATA.categories.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevCategory = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitVotes = async () => {
    // Verificamos si tenemos usuario y email
    if (!user || !voterEmail) {
      setShowLoginModal(true);
      return;
    }

    // Validar que se hayan votado todas las categorías
    const allVoted = DATA.categories.every(cat => votes[cat.id]);
    if (!allVoted) {
      alert("Por favor, vota en todas las categorías antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Guardar en Firestore (Ruta simplificada para local): /votos/{uid}
      await setDoc(doc(db, 'votos', user.uid), {
        ballot: votes,
        submittedAt: new Date().toISOString(),
        userEmail: voterEmail, 
        status: 'verified',
        appId: APP_ID
      });
      setHasSubmitted(true);
    } catch (error) {
      console.error("Error guardando votos:", error);
      alert("Hubo un error al enviar tus votos. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDERIZADO ---

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
    </div>;
  }

  // PANTALLA DE ÉXITO (YA VOTADO)
  if (hasSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0"></div>
        
        <div className="z-10 text-center max-w-lg w-full bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold mb-4 font-sans uppercase tracking-tighter">
            ¡Votos Enviados!
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            Gracias por participar en los <span className="text-yellow-500 font-bold">Premios Ibéricos</span>.
            Tus elecciones han sido registradas correctamente.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 border-b border-gray-700 pb-2 mb-4">Tu Selección</h3>
            {DATA.categories.map(cat => {
              const selectedCandidate = cat.candidates.find(c => c.id === votes[cat.id]);
              return (
                <div key={cat.id} className="flex items-center justify-between text-left">
                  <span className="text-gray-400 text-sm">{cat.title}</span>
                  <span className="text-yellow-500 font-semibold">{selectedCandidate?.name || '-'}</span>
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleLogout}
            className="mt-8 w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  const currentCategoryData = DATA.categories[currentStep];
  const isReviewStep = currentStep === DATA.categories.length;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black">
      {/* --- NAVBAR --- */}
      <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-yellow-600 to-yellow-400 p-2 rounded-lg">
              <Trophy className="text-black w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase">Premios <span className="text-yellow-500">Ibéricos</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            {voterEmail ? (
              <div className="flex items-center gap-3 bg-gray-900 py-1.5 px-4 rounded-full border border-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-300 hidden sm:block">
                  {voterEmail}
                </span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-sm font-medium text-yellow-500 hover:text-yellow-400 flex items-center gap-2"
              >
                Identifícate <LogIn size={16} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        
        {/* Barra de Progreso */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-2">
            <span>Progreso</span>
            <span>{Math.round((Object.keys(votes).length / DATA.categories.length) * 100)}% Completado</span>
          </div>
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-500 ease-out"
              style={{ width: `${(Object.keys(votes).length / DATA.categories.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* --- VISTA: LISTA DE CANDIDATOS --- */}
        {!isReviewStep ? (
          <div className="animate-fadeIn">
            {/* Cabecera de Categoría */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 text-yellow-500 rounded-full mb-4 ring-1 ring-yellow-500/50">
                {currentCategoryData.icon}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">
                {currentCategoryData.title}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">
                {currentCategoryData.description}
              </p>
            </div>

            {/* Grid de Candidatos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentCategoryData.candidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={votes[currentCategoryData.id] === candidate.id}
                  onSelect={handleVote}
                />
              ))}
            </div>
          </div>
        ) : (
          /* --- VISTA: RESUMEN (REVIEW) --- */
          <div className="max-w-2xl mx-auto animate-fadeIn">
             <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Resumen de Votación</h2>
              <p className="text-gray-400">Revisa tus elecciones antes de enviar.</p>
            </div>

            <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
              {DATA.categories.map((cat) => {
                const selected = cat.candidates.find(c => c.id === votes[cat.id]);
                return (
                  <div key={cat.id} className="flex items-center justify-between p-4 bg-black rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-yellow-600 bg-yellow-900/20 p-2 rounded-lg">
                        {cat.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{cat.title}</div>
                        <div className="text-white font-medium text-lg">
                          {selected ? selected.name : <span className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={14} /> Sin selección</span>}
                        </div>
                      </div>
                    </div>
                    {selected ? (
                      <button 
                        onClick={() => setCurrentStep(DATA.categories.findIndex(c => c.id === cat.id))}
                        className="text-xs text-gray-500 hover:text-white underline decoration-gray-700 hover:decoration-white underline-offset-4"
                      >
                        Editar
                      </button>
                    ) : (
                       <button 
                        onClick={() => setCurrentStep(DATA.categories.findIndex(c => c.id === cat.id))}
                        className="text-xs px-3 py-1 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Votar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER DE NAVEGACIÓN --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={prevCategory}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
              ${currentStep === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-gray-800'
              }`}
          >
            <ChevronLeft size={20} /> <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Indicador de Puntos */}
          <div className="flex gap-2">
            {DATA.categories.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${idx === currentStep ? 'bg-yellow-500 w-6' : 
                    idx < currentStep ? 'bg-yellow-800' : 'bg-gray-800'
                  }`}
              />
            ))}
             <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isReviewStep ? 'bg-green-500 w-6' : 'bg-gray-800'}`} />
          </div>

          {!isReviewStep ? (
            <button 
              onClick={nextCategory}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
            >
              <span className="hidden sm:inline">Siguiente</span> <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={submitVotes}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Votos'} <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* --- MODAL LOGIN (NUEVO: FORMULARIO EMAIL) --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <LogOut size={20} className="rotate-180" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <Mail className="text-yellow-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Introduce tu Email</h3>
              <p className="text-gray-400 text-sm">
                Para validar tus votos, necesitamos un correo electrónico de contacto.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                  autoFocus
                />
                {emailError && <p className="text-red-500 text-xs mt-2 ml-1">{emailError}</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
              >
                Continuar <ChevronRight size={18} />
              </button>
            </form>

            <p className="text-xs text-gray-600 text-center mt-4">
              * Tu correo se usará solo para verificar la autenticidad del voto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}