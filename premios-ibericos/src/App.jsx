import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';
import { 
  Trophy, 
  Gamepad2, 
  Mic2, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  LogIn,
  LogOut,
  Mail,
  Share2, 
  Copy
} from 'lucide-react';
import elyoyaFoto from './assets/players/elyoya.png'; // Ajusta el nombre y extensión
import razorkFoto from './assets/players/razork.png'; // Ajusta el nombre y extensión
import yikeFoto from './assets/players/yike.png'; // Ajusta el nombre y extensión
import supaFoto from './assets/players/supa.png'; // Ajusta el nombre y extensión



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

// ID de la aplicación
const appId = "premios-ibericos-web"; 

// --- FECHA OBJETIVO ---
const TARGET_DATE = new Date('2026-01-07T18:00:00');

// --- OBJETO DE ESTILOS (DESACOPLADOS) ---
const styles = {
  layout: {
    page: "min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black",
    navbar: "border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50",
    navContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between", 
    navLogoGroup: "flex items-center gap-3",
    navUserGroup: "flex items-center gap-4",
    main: "max-w-7xl mx-auto px-0 py-8 pb-24",
    footer: "fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-40",
    footerContainer: "max-w-7xl mx-auto flex items-center justify-between",
    footerDots: "flex gap-2",
    progressBarContainer: "mb-12 max-w-3xl mx-auto px-4",
    progressBarHeader: "flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-2",
    progressBarTrack: "h-4 w-full bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-700", 
    progressBarFill: "h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(234,179,8,0.5)]", 
    contentWrapper: "animate-fadeIn px-4",
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto",
    reviewContainer: "max-w-2xl mx-auto animate-fadeIn px-4",
    reviewList: "space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800",
    reviewItem: "flex items-center justify-between p-4 bg-black rounded-xl border border-gray-800 hover:border-gray-700 transition-colors",
    reviewItemLeft: "flex items-center gap-4",
    reviewIconBox: "text-yellow-600 bg-yellow-900/20 p-2 rounded-lg",
    reviewItemTitle: "text-xs text-gray-500 uppercase tracking-wider",
    reviewItemName: "text-white font-medium text-lg",
    reviewItemPlaceholder: "text-red-500 text-sm flex items-center gap-1",
    reviewEditBtn: "text-xs text-gray-500 hover:text-white underline decoration-gray-700 hover:decoration-white underline-offset-4",
    reviewVoteBtn: "text-xs px-3 py-1 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors",
  },
  text: {
    logo: "font-bold text-xl tracking-tighter uppercase",
    logoAccent: "text-yellow-500",
    heading: "text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight",
    subheading: "text-gray-400 max-w-xl mx-auto text-lg",
    sectionTitle: "text-center mb-12",
    introBadge: "text-yellow-500 font-bold tracking-widest uppercase text-sm",
    dateMonth: "block text-gray-500 text-2xl font-bold uppercase tracking-widest mb-2",
    // MODIFICADO: text-6xl en movil, text-8xl en escritorio
    dateDay: "block text-6xl md:text-8xl font-black text-white",
    dateHour: "block text-yellow-500 text-3xl font-bold mt-2",
    // MODIFICADO: Alineación izquierda en móvil, derecha en escritorio
    dateAlign: "text-left md:text-right",
  },
  components: {
    logoIcon: "bg-gradient-to-tr from-yellow-600 to-yellow-400 p-2 rounded-lg",
    userBadge: "flex items-center gap-3 bg-gray-900 py-2 px-5 rounded-full border border-gray-700",
    userOnlineDot: "w-2 h-2 bg-green-500 rounded-full animate-pulse",
    userEmail: "text-sm font-medium text-gray-300 hidden sm:block",
    logoutIconBtn: "text-gray-400 hover:text-white",
    loginBtn: "text-lg font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-3 px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-xl border border-yellow-500/30 transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    navBtnBase: "flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all text-sm sm:text-base",
    navBtnDisabled: "text-gray-600 cursor-not-allowed",
    navBtnActive: "text-white hover:bg-gray-800",
    navBtnNext: "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10",
    actionBtn: "flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base",
    shareBtn: "flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors",
    copyBtnBase: "flex items-center justify-center gap-2 py-3 font-bold rounded-xl transition-all border",
    copyBtnSuccess: "bg-green-500 border-green-500 text-white",
    copyBtnDefault: "bg-transparent border-gray-600 hover:bg-gray-800 text-gray-300",
    logoutBtn: "w-full py-3 text-gray-500 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm",
    dotBase: "w-2 h-2 rounded-full transition-all duration-300",
    dotActive: "bg-yellow-500 w-6",
    dotReview: "bg-green-500 w-6",
    dotInactive: "bg-yellow-800",
    dotPending: "bg-gray-800",
    categoryIconWrapper: "inline-flex items-center justify-center p-3 bg-yellow-500/10 text-yellow-500 rounded-full mb-4 ring-1 ring-yellow-500/50",
  },
  card: {
    base: "relative group cursor-pointer transition-all duration-300 transform rounded-xl overflow-hidden shadow-lg border border-gray-700",
    selected: "ring-4 ring-yellow-500 scale-105 bg-gray-800",
    unselected: "hover:scale-105 hover:bg-gray-800 bg-gray-900",
    gradientOverlay: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10",
    imageContainer: "h-48 w-full bg-gray-800 flex items-center justify-center text-6xl relative z-0",
    imageIcon: "transform group-hover:scale-110 transition-transform duration-500",
    content: "absolute bottom-0 left-0 right-0 p-4 z-20",
    footerRow: "flex items-end justify-between",
    teamName: "text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1",
    candidateName: "text-white text-xl font-bold font-sans leading-tight",
    roleTag: "text-gray-400 text-sm mt-1 flex items-center gap-1",
    roleDot: "w-2 h-2 rounded-full bg-blue-500",
    checkIndicator: "bg-yellow-500 text-black p-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]",
  },
  intro: {
    container: "max-w-4xl mx-auto mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-black border border-white/10 shadow-2xl",
    glow1: "absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none",
    glow2: "absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none",
    content: "relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start gap-8",
    leftColumn: "flex-1 space-y-6",
    badgeRow: "flex items-center gap-3 mb-2",
    badgeIcon: "bg-yellow-500 p-2 rounded-lg",
    title: "text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter",
    highlight: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700",
    desc: "text-gray-400 text-lg leading-relaxed max-w-xl border-l-4 border-yellow-500/30 pl-6",
    // MODIFICADO: Ajustada la caja de fecha para ser visible y flexible en móvil
    dateBox: "flex flex-col w-full md:w-auto items-start md:items-end justify-center border-t md:border-t-0 border-white/10 md:border-l pt-6 md:pt-0 md:pl-8 mt-6 md:mt-0",
  },
  countdown: {
    container: "w-full bg-black/50 border-b border-yellow-500/20 py-8 mb-8 backdrop-blur-sm",
    wrapper: "max-w-4xl mx-auto px-4 text-center",
    title: "text-white text-lg font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2",
    timerRow: "flex justify-center items-center",
    unitBox: "flex flex-col items-center mx-2 md:mx-4",
    number: "text-3xl md:text-5xl font-bold text-yellow-500 font-mono tracking-wider tabular-nums",
    label: "text-xs md:text-sm text-gray-500 uppercase tracking-widest mt-1",
    separator: "text-2xl md:text-4xl text-gray-600 font-bold -mt-6",
  },
  loading: {
    container: "min-h-screen bg-black text-white flex items-center justify-center",
    spinner: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"
  },
  modal: {
    overlay: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",
    container: "bg-[#111] border border-gray-800 p-8 rounded-2xl max-w-sm w-full shadow-2xl relative",
    closeBtn: "absolute top-4 right-4 text-gray-500 hover:text-white",
    header: "text-center mb-6",
    iconContainer: "w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700",
    title: "text-xl font-bold text-white mb-2",
    desc: "text-gray-400 text-sm",
    form: "space-y-4",
    input: "w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all",
    errorText: "text-red-500 text-xs mt-2 ml-1",
    submitBtn: "w-full bg-yellow-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors",
    footerText: "text-xs text-gray-600 text-center mt-4",
  },
  success: {
    page: "min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden",
    background: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0",
    card: "z-10 text-center max-w-lg w-full bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)]",
    icon: "w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce",
    title: "text-4xl font-bold mb-4 font-sans uppercase tracking-tighter",
    desc: "text-gray-300 mb-8 text-lg",
    highlight: "text-yellow-500 font-bold",
    listContainer: "space-y-4 mb-8",
    listHeader: "text-sm uppercase tracking-widest text-gray-500 border-b border-gray-700 pb-2 mb-4",
    listItem: "flex items-center justify-between text-left",
    itemLabel: "text-gray-400 text-sm",
    itemValue: "text-yellow-500 font-semibold",
    buttonsGrid: "grid grid-cols-2 gap-4 mb-6"
  }
};

// --- DATOS DE EJEMPLO ---
const DATA = {
  categories: [
    {
      id: 'mvp',
      title: 'MVP de la Temporada',
      icon: <Trophy className="w-6 h-6" />,
      description: 'El jugador más valioso que ha dominado la Grieta del Invocador.',
      candidates: [
        { id: 'c1', name: 'Elyoya', team: 'MAD Lions', role: 'Jungla', img: <img src={elyoyaFoto} alt="Elyoya" className="w-full h-full object-cover" /> },
        { id: 'c2', name: 'Yike', team: 'G2 Esports', role: 'Jungla',img: <img src={yikeFoto} alt="Yike" className="w-full h-full object-cover" /> },
        { id: 'c3', name: 'Razork', team: 'Fnatic', role: 'Jungla', img: <img src={razorkFoto} alt="Razork" className="w-full h-full object-cover" /> },
        { id: 'c4', name: 'Supa', team: 'Movistar KOI', role: 'ADC', img: <img src={supaFoto} alt="Supa" className="w-full h-full object-cover" /> },
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

const IntroductionCard = () => (
  <div className={styles.intro.container}>
    <div className={styles.intro.glow1}></div>
    <div className={styles.intro.glow2}></div>

    <div className={styles.intro.content}>
      <div className={styles.intro.leftColumn}>
        <div className={styles.intro.badgeRow}>
          <div className={styles.intro.badgeIcon}>
             <Trophy className="text-black w-6 h-6" />
          </div>
          <span className={styles.text.introBadge}>Premios Ibéricos</span>
        </div>

        <h1 className={styles.intro.title}>
          BIENVENIDOS A <br />
          <span className={styles.intro.highlight}>
            LA GALA 2025
          </span>
        </h1>
        
        <p className={styles.intro.desc}>
          Los Premios Ibéricos vienen este año para unir a jugadores, creadores y equipos en una celebración inolvidable.
          Tu voz define la historia de nuestra comunidad.
        </p>
      </div>

      {/* MODIFICADO: Se usa la clase 'dateBox' del styles para que sea visible en móvil */}
      <div className={styles.intro.dateBox}>
        <div className={styles.text.dateAlign}>
          <span className={styles.text.dateMonth}>Enero</span>
          <span className={styles.text.dateDay}>7</span>
          <span className={styles.text.dateHour}>18:00 CET</span>
        </div>
      </div>
    </div>
  </div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className={styles.countdown.unitBox}>
      <div className={styles.countdown.number}>
        {String(value).padStart(2, '0')}
      </div>
      <span className={styles.countdown.label}>{label}</span>
    </div>
  );

  return (
    <div className={styles.countdown.container}>
      <div className={styles.countdown.wrapper}>
        <h3 className={styles.countdown.title}>
           Las votaciones cierran en
        </h3>
        <div className={styles.countdown.timerRow}>
          <TimeUnit value={timeLeft.days} label="Días" />
          <span className={styles.countdown.separator}>:</span>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <span className={styles.countdown.separator}>:</span>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <span className={styles.countdown.separator}>:</span>
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>
      </div>
    </div>
  );
};

const CandidateCard = ({ candidate, isSelected, onSelect }) => (
  <div 
    onClick={() => onSelect(candidate.id)}
    className={`
      ${styles.card.base}
      ${isSelected ? styles.card.selected : styles.card.unselected}
    `}
  >
    <div className={styles.card.gradientOverlay} />
    
    <div className={styles.card.imageContainer}>
      <span className={styles.card.imageIcon}>
        {candidate.img}
      </span>
    </div>

    <div className={styles.card.content}>
      <div className={styles.card.footerRow}>
        <div>
          <p className={styles.card.teamName}>
            {candidate.team}
          </p>
          <h3 className={styles.card.candidateName}>
            {candidate.name}
          </h3>
          <p className={styles.card.roleTag}>
            <span className={styles.card.roleDot}></span>
            {candidate.role}
          </p>
        </div>
        {isSelected && (
          <div className={styles.card.checkIndicator}>
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
  const [votes, setVotes] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Referencia para scroll automático
  const titleRef = useRef(null);

  useEffect(() => {
    // Cuando cambiamos de paso (currentStep), ejecutamos el scroll
    if (titleRef.current) {
      const yOffset = -120;
      const element = titleRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // --- LÓGICA DE AUTENTICACIÓN Y CARGA ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'votes', 'selection');
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.ballot) {
              setVotes(data.ballot);
              setHasSubmitted(true);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError('Por favor, introduce un correo válido.');
      return;
    }

    try {
      setEmailError('');
      await signInAnonymously(auth); 
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

  const handleVote = (candidateId) => {
    if (hasSubmitted) return;
    const categoryId = DATA.categories[currentStep].id;
    setVotes(prev => ({ ...prev, [categoryId]: candidateId }));
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
    if (!user || !voterEmail) {
      setShowLoginModal(true);
      return;
    }
    const allVoted = DATA.categories.every(cat => votes[cat.id]);
    if (!allVoted) {
      alert("Por favor, vota en todas las categorías antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'votes', 'selection'), {
        ballot: votes,
        submittedAt: new Date().toISOString(),
        userEmail: voterEmail, 
        status: 'verified',
        appId: appId
      });
      setHasSubmitted(true);
    } catch (error) {
      console.error("Error guardando votos:", error);
      alert("Hubo un error al enviar tus votos. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateShareText = () => {
    let text = "🗳️ Mis votos para los #PremiosIbéricos:\n\n";
    DATA.categories.forEach(cat => {
      const selectedId = votes[cat.id];
      const candidate = cat.candidates.find(c => c.id === selectedId);
      if (candidate) {
        text += `${cat.title}: ${candidate.name} ${candidate.img}\n`;
      }
    });
    return text;
  };

  const handleShareTwitter = () => {
    const text = generateShareText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // --- RENDERIZADO ---
  if (loading) {
    return (
      <div className={styles.loading.container}>
        <div className={styles.loading.spinner}></div>
      </div>
    );
  }

  // PANTALLA DE ÉXITO (YA VOTADO)
  if (hasSubmitted) {
    return (
      <div className={styles.success.page}>
        <div className={styles.success.background}></div>
        
        <div className={styles.success.card}>
          <Trophy className={styles.success.icon} />
          <h1 className={styles.success.title}>
            ¡Votos Enviados!
          </h1>
          <p className={styles.success.desc}>
            Gracias por participar en los <span className={styles.success.highlight}>Premios Ibéricos</span>.
            Tus elecciones han sido registradas correctamente.
          </p>
          
          <div className={styles.success.listContainer}>
            <h3 className={styles.success.listHeader}>Tu Selección</h3>
            {DATA.categories.map(cat => {
              const selectedCandidate = cat.candidates.find(c => c.id === votes[cat.id]);
              return (
                <div key={cat.id} className={styles.success.listItem}>
                  <span className={styles.success.itemLabel}>{cat.title}</span>
                  <span className={styles.success.itemValue}>{selectedCandidate?.name || '-'}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.success.buttonsGrid}>
            <button onClick={handleShareTwitter} className={styles.components.shareBtn}>
              <Share2 size={18} /> Twittear
            </button>
            <button 
              onClick={handleCopyClipboard} 
              className={`${styles.components.copyBtnBase} ${copied ? styles.components.copyBtnSuccess : styles.components.copyBtnDefault}`}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>

          <button onClick={handleLogout} className={styles.components.logoutBtn}>
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  const currentCategoryData = DATA.categories[currentStep];
  const isReviewStep = currentStep === DATA.categories.length;

  return (
    <div className={styles.layout.page}>
      {/* --- NAVBAR --- */}
      <nav className={styles.layout.navbar}>
        <div className={styles.layout.navContainer}>
          <div className={styles.layout.navLogoGroup}>
            <div className={styles.components.logoIcon}>
              <Trophy className="text-black w-5 h-5" />
            </div>
            <span className={styles.text.logo}>Premios <span className={styles.text.logoAccent}>Ibéricos</span></span>
          </div>
          
          <div className={styles.layout.navUserGroup}>
            {voterEmail ? (
              <div className={styles.components.userBadge}>
                <div className={styles.components.userOnlineDot}></div>
                <span className={styles.components.userEmail}>{voterEmail}</span>
                <button onClick={handleLogout} className={styles.components.logoutIconBtn}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLoginModal(true)} className={styles.components.loginBtn}>
                Identifícate <LogIn size={16} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className={styles.layout.main}>
        
        {!hasSubmitted && !isReviewStep && currentStep === 0 && (
          <div className={styles.layout.contentWrapper}>
            <IntroductionCard />
          </div>
        )}

        {!hasSubmitted && !isReviewStep && (
          <CountdownTimer />
        )}

        {/* Barra de Progreso */}
        <div className={styles.layout.progressBarContainer}>
          <div className={styles.layout.progressBarHeader}>
            <span>Progreso</span>
            <span>{Math.round((Object.keys(votes).length / DATA.categories.length) * 100)}% Completado</span>
          </div>
          <div className={styles.layout.progressBarTrack}>
            <div 
              className={styles.layout.progressBarFill}
              style={{ width: `${(Object.keys(votes).length / DATA.categories.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {!isReviewStep ? (
          <div className={styles.layout.contentWrapper}>
            <div ref={titleRef} className={styles.text.sectionTitle}>
              <div className={styles.components.categoryIconWrapper}>
                {currentCategoryData.icon}
              </div>
              <h2 className={styles.text.heading}>{currentCategoryData.title}</h2>
              <p className={styles.text.subheading}>{currentCategoryData.description}</p>
            </div>

            <div className={styles.layout.grid}>
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
          <div className={styles.layout.reviewContainer}>
             <div ref={titleRef} className={styles.text.sectionTitle}>
              <h2 className={styles.text.heading}>Resumen de Votación</h2>
              <p className={styles.text.subheading}>Revisa tus elecciones antes de enviar.</p>
            </div>

            <div className={styles.layout.reviewList}>
              {DATA.categories.map((cat) => {
                const selected = cat.candidates.find(c => c.id === votes[cat.id]);
                return (
                  <div key={cat.id} className={styles.layout.reviewItem}>
                    <div className={styles.layout.reviewItemLeft}>
                      <div className={styles.layout.reviewIconBox}>
                        {cat.icon}
                      </div>
                      <div>
                        <div className={styles.layout.reviewItemTitle}>{cat.title}</div>
                        <div className={styles.layout.reviewItemName}>
                          {selected ? selected.name : <span className={styles.layout.reviewItemPlaceholder}><AlertCircle size={14} /> Sin selección</span>}
                        </div>
                      </div>
                    </div>
                    {selected ? (
                      <button 
                        onClick={() => setCurrentStep(DATA.categories.findIndex(c => c.id === cat.id))}
                        className={styles.layout.reviewEditBtn}
                      >
                        Editar
                      </button>
                    ) : (
                        <button 
                        onClick={() => setCurrentStep(DATA.categories.findIndex(c => c.id === cat.id))}
                        className={styles.layout.reviewVoteBtn}
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
      <div className={styles.layout.footer}>
        <div className={styles.layout.footerContainer}>
          <button 
            onClick={prevCategory}
            disabled={currentStep === 0}
            className={`${styles.components.navBtnBase} ${currentStep === 0 ? styles.components.navBtnDisabled : styles.components.navBtnActive}`}
          >
            <ChevronLeft size={20} /> <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className={styles.layout.footerDots}>
            {DATA.categories.map((_, idx) => (
              <div 
                key={idx}
                className={`${styles.components.dotBase} ${idx === currentStep ? styles.components.dotActive : idx < currentStep ? styles.components.dotInactive : styles.components.dotPending}`}
              />
            ))}
             <div className={`${styles.components.dotBase} ${isReviewStep ? styles.components.dotReview : styles.components.dotPending}`} />
          </div>

          {!isReviewStep ? (
            <button 
              onClick={nextCategory}
              className={`${styles.components.navBtnBase} ${styles.components.navBtnNext}`}
            >
              <span className="hidden sm:inline">Siguiente</span> <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={submitVotes}
              disabled={isSubmitting}
              className={styles.components.actionBtn}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Votos'} <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* --- MODAL LOGIN --- */}
      {showLoginModal && (
        <div className={styles.modal.overlay}>
          <div className={styles.modal.container}>
            <button onClick={() => setShowLoginModal(false)} className={styles.modal.closeBtn}>
              <LogOut size={20} className="rotate-180" />
            </button>
            
            <div className={styles.modal.header}>
              <div className={styles.modal.iconContainer}>
                <Mail className="text-yellow-500 w-8 h-8" />
              </div>
              <h3 className={styles.modal.title}>Introduce tu Email</h3>
              <p className="modal-desc">
                Para validar tus votos, necesitamos un correo electrónico de contacto.
              </p>
            </div>

            <form onSubmit={handleLogin} className="modal-form">
              <div>
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={styles.modal.input}
                  autoFocus
                />
                {emailError && <p className="modal-error-text">{emailError}</p>}
              </div>

              <button type="submit" className="modal-submitBtn">
                Continuar <ChevronRight size={18} />
              </button>
            </form>

            <p className="modal-footerText">
              * Tu correo se usará solo para verificar la autenticidad del voto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}