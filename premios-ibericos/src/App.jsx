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
import { getAnalytics } from "firebase/analytics";
// ¡IMPORTANTE! Asegúrate de haber instalado esto: npm install html2canvas
import html2canvas from 'html2canvas';

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
  Copy,
  Download,
  X,
  Sword,
  TreeDeciduous,
  Crosshair,
  ClipboardList,
  Users,
  Video,
  User,
  Twitter,
  Shield,
  MessageCircle,
  Frown,
  Citrus
} from 'lucide-react';
//LOGOS
import logoImg from './assets/logo2.png'; 

// --- IMPORTS DE IMÁGENES ---

// Players
import elyoyaFoto from './assets/players/elyoya.jpg'; 
import razorkFoto from './assets/players/razork.png';
import supaFoto from './assets/players/supa.jpg';
import alvaroFoto from './assets/players/alvaro.jpg';
import myrwinFoto from './assets/players/myrwin.jpg';
import oscarininFoto from './assets/players/oscarinin.jpg';

// Staff
import melzhetFoto from './assets/staff/melzhet.jpeg';
import gaaxFoto from './assets/staff/gaax.jpg';
import guilhotoFoto from './assets/staff/guilhoto.jpg';
import machukiFoto from './assets/staff/machuki.jpeg';
import rodrigoFoto from './assets/staff/rodrigo.jpg';
import rhuckzFoto from './assets/staff/rhuckz.jpeg';

//Personalidad
import ibaiFoto from './assets/personalidad/ibai.jpeg';
import toadFoto from './assets/personalidad/toad.png';
import jordilmkFoto from './assets/personalidad/jordilmk.jpg';
import charoFoto from './assets/personalidad/charo.png';
import th3antonioFoto from './assets/personalidad/th3antonio.png';
import werlybFoto from './assets/personalidad/werlyb.jpeg';


//Programa
import espmFoto from './assets/programa/esportmaniacos.jpg';
import diasFoto from './assets/programa/0dias.png';
import allioFoto from './assets/programa/allio.jpg';
import lt10Foto from './assets/programa/lt10.jpg';
import elpostpartidoFoto from './assets/programa/elpostpartido.jpeg';
import reportadosFoto from './assets/programa/reportados.jpg';

//Caster
import bebecasterFoto from './assets/casters/bebecaster.jpg';
import noaFoto from './assets/casters/noa.jpg';
import fernandoFoto from './assets/casters/fernandocardenete.jpg';
import wolkFoto from './assets/casters/wolk.jpg';
import champi14Foto from './assets/casters/champi14.jpg';


// Roles
import iconJungle from './assets/roles/jungle.png'; 
import iconADC from './assets/roles/adc.png'; 
import iconTop from './assets/roles/toplane.png';
import iconSupp from './assets/roles/support.png';
import iconStaff from './assets/roles/staff.png';
import iconPersonalidad from './assets/roles/personalidad.png';
import iconPrograma from './assets/roles/programa.png';
import iconCaster from './assets/roles/casteo.png';
// --- TU CONFIGURACIÓN REAL DE FIREBASE ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);
const db = getFirestore(app);

const appId = "premios-ibericos-web"; 


const TARGET_DATE = new Date('2026-01-07T18:00:00');



const FECHA_INICIO = new Date('2025-12-02T10:00:00'); 

// 2. La fecha de apertura será exactamente 7 días (1 semana) después de la fecha de inicio
const OPENING_DATE = new Date(FECHA_INICIO.getTime() + ( 8 * 24 * 60 * 60 * 1000));

// --- OBJETO DE ESTILOS ---
const styles = {
  layout: {
    page: "min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black relative",
    navbar: "border-b border-gray-800 bg-black/60 backdrop-blur-md sticky top-0 z-50",
    navContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between", 
    navLogoGroup: "flex items-center gap-3",
    navUserGroup: "flex items-center gap-4",
    main: "max-w-7xl mx-auto px-0 py-8 pb-32",
    footer: "fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-40",
    footerContainer: "max-w-7xl mx-auto flex flex-row items-center justify-between gap-4",
    footerDots: "flex gap-2",
    progressBarContainer: "mb-12 max-w-3xl mx-auto px-4",
    progressBarHeader: "flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-2",
    progressBarTrack: "h-4 w-full bg-gray-900/80 rounded-full overflow-hidden shadow-inner border border-gray-700", 
    progressBarFill: "h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(234,179,8,0.5)]", 
    contentWrapper: "animate-fadeIn px-4",
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto",
    reviewContainer: "max-w-4xl mx-auto animate-fadeIn px-4", 
    reviewList: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900/40 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm",
    reviewItem: "flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors",
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
    dateDay: "block text-6xl md:text-8xl font-black text-white",
    dateHour: "block text-yellow-500 text-3xl font-bold mt-2",
    dateAlign: "text-left md:text-right",
  },
  components: {
    logoIcon: "bg-gradient-to-tr from-yellow-600 to-yellow-400 p-2 rounded-lg",
    userBadge: "flex items-center gap-3 bg-gray-900/80 backdrop-blur-md py-2 px-5 rounded-full border border-gray-700",
    userOnlineDot: "w-2 h-2 bg-green-500 rounded-full animate-pulse",
    userEmail: "text-sm font-medium text-gray-300 hidden sm:block",
    logoutIconBtn: "text-gray-400 hover:text-white",
    loginBtn: "text-lg font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-3 px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-xl border border-yellow-500/30 transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    navBtnBase: "flex items-center justify-center gap-2 px-4 py-3 sm:px-6 rounded-xl font-bold transition-all text-sm sm:text-base flex-1 sm:flex-none",
    navBtnDisabled: "text-gray-600 cursor-not-allowed",
    navBtnActive: "text-white hover:bg-gray-800",
    navBtnNext: "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10",
actionBtn: "flex items-center justify-center gap-2 px-4 py-3 sm:px-8 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-base w-full sm:w-auto",    shareBtn: "flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors w-full sm:w-auto",
    copyBtnBase: "flex items-center justify-center gap-2 py-3 font-bold rounded-xl transition-all border w-full sm:w-auto",
    copyBtnSuccess: "bg-green-500 border-green-500 text-white",
    copyBtnDefault: "bg-transparent border-gray-600 hover:bg-gray-800 text-gray-300",
    logoutBtn: "w-full py-3 text-gray-500 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm",
    dotBase: "w-2 h-2 rounded-full transition-all duration-300",
    dotActive: "bg-yellow-500 w-6",
    dotReview: "bg-green-500 w-6",
    dotInactive: "bg-yellow-800",
    dotPending: "bg-gray-800",
    categoryIconWrapper: "inline-flex items-center justify-center p-3 bg-yellow-500/10 text-yellow-500 rounded-full mb-4 ring-1 ring-yellow-500/50",
    logoImage: "h-12 w-auto object-contain",
    logoIntro: "h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]",
  },
  card: {
    base: "relative group cursor-pointer transition-all duration-300 transform rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-gray-900/40 backdrop-blur-sm",
    selected: "ring-4 ring-yellow-500 scale-105 bg-gray-800",
    unselected: "hover:scale-105 hover:bg-gray-800/80",
    gradientOverlay: "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10",
    imageContainer: "h-48 w-full bg-gray-800 relative z-0 overflow-hidden", 
    imageIcon: "block w-full h-full transform group-hover:scale-110 transition-transform duration-500",
    content: "absolute bottom-0 left-0 right-0 p-4 z-20",
    footerRow: "flex items-end justify-between",
    teamName: "text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1",
    candidateName: "text-white text-xl font-bold font-sans leading-tight",
    roleTag: "text-gray-400 text-sm mt-1 flex items-center gap-2",
    roleIcon: "w-4 h-4 object-contain opacity-70", 
    checkIndicator: "bg-yellow-500 text-black p-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]",
  },
  intro: {
    container: "max-w-4xl mx-auto mb-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a]/80 via-[#0d0d0d]/80 to-black/80 border border-white/10 shadow-2xl backdrop-blur-md",
    glow1: "absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none",
    glow2: "absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-600/5 blur-[120px] rounded-full pointer-events-none",
    content: "relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start gap-8",
    leftColumn: "flex-1 space-y-6",
    badgeRow: "flex items-center gap-3 mb-2",
    badgeIcon: "bg-yellow-500 p-2 rounded-lg",
    title: "text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter",
    highlight: "text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700",
    desc: "text-gray-400 text-lg leading-relaxed max-w-xl border-l-4 border-yellow-500/30 pl-6",
    dateBox: "hidden md:flex flex-col items-end justify-center h-full border-l border-white/10 pl-8 py-4 min-w-[200px]",
    dateAlign: "text-right",
    dateMonth: "block text-gray-500 text-sm font-bold uppercase tracking-widest mb-1",
    dateDay: "block text-5xl font-black text-white",
    dateHour: "block text-yellow-500 text-xl font-bold mt-2",
  },
  preLaunch: {
    container: "min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden p-4",
    bg: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.15),transparent_70%)]",
    content: "z-10 text-center max-w-5xl w-full",
    title: "text-xl md:text-2xl text-yellow-500 font-bold uppercase tracking-[0.3em] mb-12 animate-pulse",
    timerWrapper: "flex flex-wrap justify-center gap-4 md:gap-12 mb-16",
    unitBox: "flex flex-col items-center",
    number: "text-6xl md:text-9xl font-black text-white tabular-nums leading-none",
    label: "text-sm md:text-xl text-gray-500 font-bold uppercase tracking-widest mt-4",
    message: "text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
  },
  countdown: {
    container: "w-full border-b border-yellow-500/20 py-8 mb-8 backdrop-blur-sm",
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
    form: "space-y-8",
    input: "w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all",
    errorText: "text-red-500 text-xs mt-2 ml-1",
    submitBtn: "w-full bg-yellow-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors",
    footerText: "text-xs text-gray-600 text-center mt-4",
  },
  success: {
    page: "min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden",
    background: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0",
    card: "z-10 text-center max-w-4xl w-full bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)] max-h-[90vh] overflow-y-auto custom-scrollbar",
    icon: "w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce",
    title: "text-4xl font-bold mb-4 font-sans uppercase tracking-tighter",
    desc: "text-gray-300 mb-8 text-lg",
    highlight: "text-yellow-500 font-bold",
    // MODIFICADO: Grid de 3 columnas para que quede compacto y centrado
    listContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8",
    listHeader: "text-sm uppercase tracking-widest text-gray-500 border-b border-gray-700 pb-2 mb-4",
    // MODIFICADO: Elementos centrados con flex-col
    listItem: "flex flex-col items-center justify-center text-center p-4 rounded-xl border border-gray-800 bg-black/40 h-full",
    itemLabel: "text-gray-500 text-[10px] uppercase tracking-wider mb-1 text-center w-full",
    itemValue: "text-yellow-500 font-bold text-lg text-center w-full break-words",
    buttonsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-lg mx-auto",
    closeBtn: "absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer",
    overlay: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn",
  },
  shareCard: {
    container: "fixed top-0 left-[-9999px] w-[1080px] bg-[#0a0a0a] p-12 text-white border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden z-50", 
    background: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-[#0a0a0a] to-[#050505] z-0",
    content: "relative z-10 flex flex-col items-center text-center",
    header: "flex items-center gap-4 mb-6",
    logo: "h-20 w-auto object-contain",
    title: "font-bold text-4xl uppercase tracking-tighter",
    subtitle: "text-yellow-500 text-lg uppercase tracking-widest mb-10",
    list: "w-full grid grid-cols-3 gap-4 bg-black/50 p-6 rounded-2xl border border-gray-800/50",
    item: "flex items-center gap-3 bg-black/60 p-4 rounded-xl border border-gray-800/60",
    itemLeft: "flex items-center gap-3 w-full",
    itemIcon: "text-yellow-500 bg-yellow-500/10 p-2 rounded-lg shrink-0",
    catTitle: "text-[10px] text-gray-400 uppercase tracking-wider text-left truncate block",
    candName: "font-bold text-base text-left leading-tight",
    candTeam: "block text-xs text-gray-500 font-normal", 
    footer: "mt-8 text-gray-500 text-base flex items-center gap-2",
  }
};

// --- DATA COMPLETA (Todas las categorías) ---
const DATA = {
  categories: [
    // 1. Jugador Iberico de la LEC
    {
      id: 'jugador_lec',
      title: 'Jugador Ibérico LEC',
      icon: <Trophy className="w-6 h-6" />,
      description: 'El jugador más destacado en la máxima competición europea.',
      candidates: [
        { id: 'p1', name: 'Supa', team: 'Movistar KOI', role: 'ADC', roleIcon: iconADC, img: <img src={supaFoto} alt="Supa" className="w-full h-full object-cover object-top" /> },
        { id: 'p2', name: 'Myrwn', team: 'Movistar KOI', role: 'Top', roleIcon: iconTop, img: <img src={myrwinFoto} alt="Myrwin" className="w-full h-full object-cover object-top" /> },
        { id: 'p3', name: 'Oscarinin', team: 'Fnatic', role: 'Top', roleIcon: iconTop, img: <img src={oscarininFoto} alt="Oscarinin" className="w-full h-full object-cover object-top" /> },
        { id: 'p4', name: 'Razork', team: 'Fnatic', role: 'Jungla', roleIcon: iconJungle, img: <img src={razorkFoto} alt="Razork" className="w-full h-full object-cover object-top" /> },
        { id: 'p5', name: 'Alvaro', team: 'Movistar KOI', role: 'Support', roleIcon: iconSupp, img: <img src={alvaroFoto} alt="Alvaro" className="w-full h-full object-cover object-top" /> },
        { id: 'p6', name: 'Elyoya', team: 'Movistar KOI', role: 'Jungla', roleIcon: iconJungle, img: <img src={elyoyaFoto} alt="Elyoya" className="w-full h-full object-cover object-top" /> },
      ]
    },
    // 2. Staff Iberico de la LEC
    {
      id: 'staff_lec',
      title: 'Staff Ibérico LEC',
      icon: <ClipboardList className="w-6 h-6" />,
      description: 'Los cerebros detrás de las estrategias en la LEC.',
      candidates: [
        { id: 's1', name: 'Melzhet', team: 'Movistar Koi', role: 'Head Coach', roleIcon: iconStaff, img: <img src={melzhetFoto} alt="Melzhet" className="w-full h-full object-cover object-center" /> },
        { id: 's2', name: 'Gaax', team: 'Fnatic', role: 'Assistant', roleIcon: iconStaff, img: <img src={gaaxFoto} alt="Gaax" className="w-full h-full object-cover object-top" /> },
        { id: 's3', name: 'Guilhoto', team: 'GiantX', role: 'Head Coach', roleIcon: iconStaff, img: <img src={guilhotoFoto} alt="Guilhoto" className="w-full h-full object-cover object-top" /> },
        { id: 's4', name: 'Machuki', team: 'Team Heretics', role: 'Assistant', roleIcon: iconStaff, img: <img src={machukiFoto} alt="Machuki" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} /> },
        { id: 's5', name: 'Rodrigo', team: 'G2 Esports', role: 'Staff',  roleIcon: iconStaff, img: <img src={rodrigoFoto} alt="Rodrigo" className="w-full h-full object-cover object-left" /> },
        { id: 's6', name: 'Rhuckz', team: 'Fnatic', role: 'Staff', roleIcon: iconStaff, img: <img src={rhuckzFoto} alt="Rhuckz" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} /> },]
    },
    // 3. Equipo del año
    {
      id: 'equipo_ano',
      title: 'Equipo del Año',
      icon: <Shield className="w-6 h-6" />,
      description: 'La organización que ha marcado la diferencia este año.',
      candidates: [
        { id: 't1', name: 'Movistar KOI', team: 'KOI', role: 'Org', roleIcon: <Shield className={styles.card.roleIcon} />, img: '🟣' },
        { id: 't2', name: 'Fnatic', team: 'FNC', role: 'Org', roleIcon: <Shield className={styles.card.roleIcon} />, img: '🧡' },
        { id: 't3', name: 'GiantX', team: 'GX', role: 'Org', roleIcon: <Shield className={styles.card.roleIcon} />, img: '🟥' },
        { id: 't4', name: 'Team Heretics', team: 'TH', role: 'Org', roleIcon: <Shield className={styles.card.roleIcon} />, img: '🦁' },
        { id: 't5', name: 'Follaculos', team: 'FO', role: 'Org', roleIcon: <Shield className={styles.card.roleIcon} />, img: '🦁' },
      ]
    },
    // 4. Costreaming of the Year
    {
      id: 'costreaming',
      title: 'Costreaming del Año',
      icon: <Video className="w-6 h-6" />,
      description: 'La mejor retransmisión alternativa de la competición.',
      candidates: [
        { id: 'cs1', name: 'Knekro', team: 'Stream', role: 'Costream', roleIcon: <Video className={styles.card.roleIcon} />, img: '🟣' },
        { id: 'cs2', name: 'ESPM', team: 'Stream', role: 'Costream', roleIcon: <Video className={styles.card.roleIcon} />, img: '📺' },
        { id: 'cs3', name: 'GiantX', team: 'Stream', role: 'Costream', roleIcon: <Video className={styles.card.roleIcon} />, img: '🟥' },
        { id: 'cs4', name: 'Team Heretics', team: 'Stream', role: 'Costream', roleIcon: <Video className={styles.card.roleIcon} />, img: '🦁' },
        { id: 'cs5', name: 'Fnatic', team: 'Stream', role: 'Costream', roleIcon: <Video className={styles.card.roleIcon} />, img: '🧡' },
      ]
    },
    // 5. Personalidad
    {
      id: 'personalidad',
      title: 'Personalidad Esports',
      icon: <User className="w-6 h-6" />,
      description: 'La figura más influyente y carismática del año.',
      candidates: [
        { id: 'per1', name: 'Ibai', team: 'Movistar KOI', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={ibaiFoto} alt="Ibai" className="w-full h-full object-cover object-center"  style={{ objectPosition: '50% 20%' }}/> },
        { id: 'per2', name: 'Toad', team: 'Lyon Gaming', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={toadFoto} alt="Toad Amarillo" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }} /> },
        { id: 'per3', name: 'JordiLMK', team: 'Content', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={jordilmkFoto} alt="JordiLMK" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }} /> },
        { id: 'per4', name: 'Charo Villarejo', team: 'Content', role: 'Talent', roleIcon: iconPersonalidad, img: <img src={charoFoto} alt="Charo Villarejo" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }} /> },
        { id: 'per5', name: 'Th3Antonio', team: 'Giantx', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={th3antonioFoto} alt="Th3 Antonio" className="w-full h-full object-cover" style={{ objectPosition: '50% 05%' }} /> },
        { id: 'per6', name: 'Werlyb', team: 'Team Heretics', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={werlybFoto} alt="Werlyb" className="w-full h-full object-cover" style={{ objectPosition: '50% 25%' }} /> },
      ]
    },
    // 6. Mejor Programa
    {
      id: 'programa',
      title: 'Mejor Programa',
      icon: <Mic2 className="w-6 h-6" />,
      description: 'El contenido más entretenido e informativo.',
      candidates: [
        { id: 'pr1', name: 'ESPM', team: 'Podcast', role: 'Show', roleIcon: iconPrograma, img: <img src={espmFoto} alt="Esportmaniacos" className="w-full h-full object-cover object-center" /> },
        { id: 'pr2', name: 'AL Lio Podcast', team: 'Podcast', role: 'Show', roleIcon: iconPrograma, img: <img src={allioFoto} alt="Al Lio" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 40%' }}/>,},
        { id: 'pr3', name: 'Postpartido Mellado', team: 'Podcast', role: 'Show', roleIcon: iconPrograma, img: <img src={elpostpartidoFoto} alt="PostPartido" className="w-full h-90  object-center" style={{ objectPosition: '50% 50%' }}/>, },
        { id: 'pr4', name: 'Tertulia de los 10', team: 'Podcast', role: 'Show', roleIcon:iconPrograma , img: <img src={lt10Foto} alt="La Tertulia de los 10" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 30%' }}/>, },
        { id: 'pr5', name: '0 dias', team: 'Debate', role: 'Podcast', roleIcon:iconPrograma, img: <img src={diasFoto} alt="O dias" className="w-full h-full object-center" /> },
        { id: 'pr6', name: 'Reportados', team: 'Debate', role: 'Show', roleIcon:iconPrograma , img: <img src={reportadosFoto} alt="Reportados" className="w-full h-full object-cover object-center" /> },
      ]
    },
    // 7. Caster del Año
    {
      id: 'caster_streaming',
      title: 'Caster del Año',
      icon: <Zap className="w-6 h-6" />,
      description: 'La voz y el rostro de las retransmisiones oficiales.',
      candidates: [
        { id: 'ts1', name: 'BebeCaster', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={bebecasterFoto} alt="BebeCaster" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 30%' }}/> },
        { id: 'ts2', name: 'Noa', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={noaFoto} alt="Noa" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 30%' }}/> },
        { id: 'ts3', name: 'Fernando Cardenete', team: 'Caster', role: 'Caster', roleIcon: iconCaster, img: <img src={fernandoFoto} alt="Fernando Cardenete" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }}/> },
        { id: 'ts4', name: 'Wolk', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={wolkFoto} alt="Wolk" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 30%' }}/> },
        { id: 'ts5', name: 'Champi14', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={champi14Foto} alt="Champi14" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }}/> },
      ]
    },
    // 8. Cuenta Twitter
    {
      id: 'twitter_cuenta',
      title: 'Twitter Oficial',
      icon: <Twitter className="w-6 h-6" />,
      description: 'La mejor gestión de redes sociales de equipo u organización.',
      candidates: [
        { id: 'tw1', name: 'Movistar KOI', team: 'KOI', role: 'Social', roleIcon: <Twitter className={styles.card.roleIcon} />, img: '🟣' },
        { id: 'tw2', name: 'GiantX', team: 'GX', role: 'Social', roleIcon: <Twitter className={styles.card.roleIcon} />, img: '🟥' },
        { id: 'tw3', name: 'Team Heretics', team: 'TH', role: 'Social', roleIcon: <Twitter className={styles.card.roleIcon} />, img: '🦁' },
        { id: 'tw4', name: 'LVP', team: 'LVP', role: 'Social', roleIcon: <Twitter className={styles.card.roleIcon} />, img: '🏆' },
        { id: 'tw5', name: 'Sheep Esports ES', team: 'News', role: 'Media', roleIcon: <Twitter className={styles.card.roleIcon} />, img: '🐑' },
      ]
    },
    // 9. Twittero
    {
      id: 'twittero',
      title: 'Twittero del Año',
      icon: <User className="w-6 h-6" />,
      description: 'El usuario que ha reinado en la comunidad de Twitter España.',
      candidates: [
        { id: 'twt1', name: 'Hylisangista', team: 'Twitter', role: 'User', roleIcon: <User className={styles.card.roleIcon} />, img: '🐦' },
        { id: 'twt2', name: 'Razorkismo', team: 'Twitter', role: 'User', roleIcon: <User className={styles.card.roleIcon} />, img: '🗡️' },
        { id: 'twt3', name: 'Jakose', team: 'Twitter', role: 'User', roleIcon: <User className={styles.card.roleIcon} />, img: '🎭' },
        { id: 'twt4', name: 'Erixger', team: 'Twitter', role: 'User', roleIcon: <User className={styles.card.roleIcon} />, img: '📱' },
      ]
    },
    // 10. Fans de equipo
    {
      id: 'fans',
      title: 'Fan del Año',
      icon: <Users className="w-6 h-6" />,
      description: 'El seguidor más apasionado y leal.',
      candidates: [
        { id: 'f1', name: 'Vicotrew', team: 'Fan', role: 'Superfan', roleIcon: <Users className={styles.card.roleIcon} />, img: '🔥' },
        { id: 'f2', name: 'IndarGuasones', team: 'Fan', role: 'Superfan', roleIcon: <Users className={styles.card.roleIcon} />, img: '🃏' },
        { id: 'f3', name: 'Dropick', team: 'Fan', role: 'Superfan', roleIcon: <Users className={styles.card.roleIcon} />, img: '💧' },
      ]
    },
    // 11. Tweet del Año
    {
      id: 'tweet_year',
      title: 'Tweet del Año',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'El mensaje que rompió internet este año.',
      candidates: [
        { id: 'msg1', name: 'Twittlonger Cabra a IWD', team: 'Cabra', role: 'Tweet', roleIcon: <MessageCircle className="w-4 h-4" />, img: '📜' },
        { id: 'msg2', name: 'Tweet de Ibai', team: 'Ibai', role: 'Tweet', roleIcon: <MessageCircle className="w-4 h-4" />, img: '💬' },
      ]
    },
    // 12. Premios Aparte (Agrupados o última categoría)
    {
      id: 'mejor_iniciativa',
      title: 'Mejor Iniciativa',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Reconocimientos únicos de la comunidad.',
      candidates: [
        { id: 'pe1', name: 'Discord de Mujeres', team: 'Pili y Anna', role: 'Comunidad', roleIcon: <Users className="w-4 h-4" />, img: '👯‍♀️' },
        { id: 'pe2', name: 'RIFTY Fantasy Lol', team: '@Rifty', role: 'Comunidad', roleIcon: <Frown className="w-4 h-4" />, img: '🤡' },
        { id: 'pe3', name: 'Movidas Esports', team: '@MovidasEsports', role: 'Comunidad', roleIcon: <Citrus className="w-4 h-4" />, img: '🍋' },
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
          <img src={logoImg} alt="Logo" className={styles.components.logoIntro} /> 
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

// --- NUEVO: Pantalla de Espera (Pre-Launch) ---
const PreLaunchScreen = ({ onOpen }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +OPENING_DATE - +new Date();
      
      if (difference <= 0) {
        clearInterval(timer);
        onOpen(); // Desbloquear la web automáticamente
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onOpen]);

  const TimeUnit = ({ value, label }) => (
    <div className={styles.preLaunch.unitBox}>
      <div className={styles.preLaunch.number}>
        {String(value).padStart(2, '0')}
      </div>
      <span className={styles.preLaunch.label}>{label}</span>
    </div>
  );

  return (
    <div className={styles.preLaunch.container}>
      <div className={styles.preLaunch.bg} />
      
      <div className={styles.preLaunch.content}>
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="Logo" className="h-32 w-auto object-contain" />
        </div>

        <h2 className={styles.preLaunch.title}>
          En {timeLeft.days} días se abrirán las votaciones
        </h2>

        <div className={styles.preLaunch.timerWrapper}>
          <TimeUnit value={timeLeft.days} label="Días" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>

        <p className={styles.preLaunch.message}>
          Prepárate para elegir a los mejores de la comunidad. <br />
          La gala de los Premios Ibéricos 2025 está a punto de comenzar.
        </p>
      </div>
    </div>
  );
};


const CandidateCard = ({ candidate, isSelected, onSelect }) => (
  <div 
    onClick={() => onSelect(candidate.id)}
    className={`
      ${styles.card.base} group
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
            <img 
                src={candidate.roleIcon} 
                alt={candidate.role} 
                className={styles.card.roleIcon} 
            />
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

const VoteSummaryCardHidden = ({ votes, data }) => {
  return (
    <div id="vote-summary-card-hidden" className={styles.shareCard.container}>
      <div className={styles.shareCard.background}></div>
      <div className={styles.shareCard.content}>
        <div className={styles.shareCard.header}>
            <img src={logoImg} alt="Logo" className={styles.shareCard.logo} />
            <h1 className={styles.shareCard.title}>Premios <span className="text-yellow-500">Ibéricos</span></h1>
        </div>
        <p className={styles.shareCard.subtitle}>Mis Votos Oficiales 2025</p>
        
        <div className={styles.shareCard.list}>
          {data.categories.map(cat => {
            const selected = cat.candidates.find(c => c.id === votes[cat.id]);
            if (!selected) return null;
            return (
              <div key={cat.id} className={styles.shareCard.item}>
                <div className={styles.shareCard.itemLeft}>
                  <div className={styles.shareCard.itemIcon}>{cat.icon}</div>
                  <div>
                      <div className={styles.shareCard.catTitle}>{cat.title}</div>
                      <div className={styles.shareCard.candName}>
                           {selected.name}
                           <span className={styles.shareCard.candTeam}>({selected.team})</span>
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.shareCard.footer}>
          <CheckCircle2 size={16} className="text-yellow-500"/> Voto certificado el {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false); 

  const [emailInput, setEmailInput] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const titleRef = useRef(null);
  
  const backgroundStyle = {
    backgroundColor: '#050505',
    backgroundImage: `
      radial-gradient(circle at 50% 10%, rgba(234, 179, 8, 0.15), transparent 40%),
      radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '100% 100%, 32px 32px'
  };

  useEffect(() => {
    if (new Date() >= OPENING_DATE) {
      setIsVotingOpen(true);
    }
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      const yOffset = -120;
      const element = titleRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // --- CORRECCIÓN IMPORTANTE: NO MOSTRAR SUCCESS AL CARGAR ---
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
              // setShowSuccessView(true); // <--- ELIMINADO PARA QUE NO SALTE AL RECARGAR
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
    setShowSuccessView(false); 
    setVoterEmail('');
    setEmailInput('');
    setCurrentStep(0);
    setGeneratedImage(null);
    setShowShareModal(false);
    setGeneratingImage(false);
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
        appId: appId
      });
      setHasSubmitted(true);
      setShowSuccessView(true); // Aquí sí queremos que salte al terminar de votar
    } catch (error) {
      console.error("Error guardando votos:", error);
      alert("Hubo un error al enviar tus votos. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyClipboard = async () => {
    const text = "🗳️ Mis votos para los #PremiosIbéricos...";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleGenerateImage = async () => {
        if (typeof html2canvas === 'undefined') {
            alert("Para generar la imagen, necesitas instalar html2canvas en tu proyecto local: npm install html2canvas");
            return;
        }
        setGeneratingImage(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const element = document.getElementById('vote-summary-card-hidden');
            if (!element) {
                setGeneratingImage(false);
                return;
            }
            const canvas = await html2canvas(element, {
                backgroundColor: '#0a0a0a', 
                scale: 2, 
                useCORS: true, 
                allowTaint: true, 
                logging: true,
                x: 0,
                y: 0,
                width: 1080, // WIDTH AJUSTADO AL NUEVO TAMAÑO DE TARJETA
                height: element.offsetHeight
            });
            const image = canvas.toDataURL("image/png");
            setGeneratedImage(image);
            setShowSuccessView(false); 
            setShowShareModal(true); 
        } catch (error) {
            console.error("Error generando imagen:", error);
            alert("Error al generar la imagen: " + error.message);
        } finally {
            setGeneratingImage(false);
        }
    };

  const downloadImage = () => {
      if (!generatedImage) return;
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'MisVotosPremiosIbericos.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const openTwitterIntent = () => {
        const text = "¡Estos son mis votos para los #PremiosIbéricos! 🗳️\n\n(Adjunta tu imagen copiada aquí 👇)";
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setShowShareModal(false); 
  }

  const handleShareTwitter = () => {
    openTwitterIntent();
  };

  if (loading) {
    return (
      <div className={styles.loading.container}>
        <div className={styles.loading.spinner}></div>
      </div>
    );
  }

  // --- PANTALLA DE ESPERA ---
  if (!isVotingOpen) {
    return <PreLaunchScreen onOpen={() => setIsVotingOpen(true)} />;
  }

  // --- APP NORMAL ---
  const currentCategoryData = DATA.categories[currentStep];
  const isReviewStep = currentStep === DATA.categories.length;

  return (
    <div className={styles.layout.page} style={backgroundStyle}>
      {/* NAVBAR */}
      <nav className={styles.layout.navbar}>
        <div className={styles.layout.navContainer}>
          <div className={styles.layout.navLogoGroup}>
            <img src={logoImg} alt="Logo" className={styles.components.logoImage} /> 
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

      {/* CONTENIDO */}
      <main className={styles.layout.main}>
        {hasSubmitted && !showSuccessView && (
             <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-between max-w-5xl mx-auto">
                 <span className="text-yellow-500 font-bold flex items-center gap-2">
                    <CheckCircle2 size={20} /> Ya has votado
                 </span>
                 <button onClick={() => setShowSuccessView(true)} className="text-sm underline hover:text-white text-gray-400">
                    Ver resumen
                 </button>
             </div>
        )}

        {!hasSubmitted && !isReviewStep && currentStep === 0 && (
          <div className={styles.layout.contentWrapper}>
            <IntroductionCard />
          </div>
        )}

        {!hasSubmitted && !isReviewStep && (
          <CountdownTimer />
        )}

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

            {/* MODIFICADO: GRID DE 2 COLUMNAS */}
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

      {/* FOOTER */}
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
              {isSubmitting ? 'Enviando...' : ''} <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* LOGIN MODAL */}
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

            <form onSubmit={handleLogin} className={styles.modal.form}>
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

              {/* CORREGIDO: Usando el objeto de estilos */}
              <button type="submit" className={styles.modal.submitBtn}>
                Continuar <ChevronRight size={18} />
              </button>
            </form>

            <p className={styles.modal.footerText}>
              * Tu correo se usará solo para verificar la autenticidad del voto.
            </p>
          </div>
        </div>
      )}

      {/* OVERLAY DE ÉXITO */}
      {hasSubmitted && showSuccessView && (
        <div className={styles.success.overlay}>
            <div className={styles.success.card}>
            <button 
                onClick={() => setShowSuccessView(false)} 
                className={styles.success.closeBtn}
                title="Cerrar y ver candidatos"
            >
                <X size={24} />
            </button>

            <Trophy className={styles.success.icon} />
            <h1 className={styles.success.title}>
                ¡Votos Enviados!
            </h1>
            <p className={styles.success.desc}>
                Gracias por participar en los <span className={styles.success.highlight}>Premios Ibéricos</span>.
                Tus elecciones han sido registradas correctamente.
            </p>
            
            {/* RESUMEN EN EL MODAL DE ÉXITO TAMBIÉN EN GRID (OPCIONAL) */}
            <div className={`${styles.success.listContainer} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                {DATA.categories.map(cat => {
                const selectedCandidate = cat.candidates.find(c => c.id === votes[cat.id]);
                return (
                    <div key={cat.id} className={`${styles.success.listItem} border border-gray-800/50 bg-gray-900/30 p-3 rounded-lg`}>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-gray-500 tracking-wider">{cat.title}</span>
                        <span className={styles.success.itemValue}>{selectedCandidate?.name || '-'}</span>
                    </div>
                    </div>
                );
                })}
            </div>

            <div className={styles.success.buttonsGrid}>
                <button 
                    onClick={handleGenerateImage} 
                    disabled={generatingImage}
                    className={styles.components.shareBtn}
                >
                <Share2 size={18} /> {generatingImage ? 'Generando...' : 'Compartir Imagen'}
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
      )}

      {/* MODAL SHARE */}
      {showShareModal && generatedImage && (
        <div className={styles.modal.overlay} style={{zIndex: 70}}>
          <div className={`${styles.modal.container} max-w-md`}>
             <button onClick={() => setShowShareModal(false)} className={styles.modal.closeBtn}>
              <X size={20} />
            </button>

             <div className="text-center mb-4">
                <h3 className={styles.modal.title}>¡Imagen Lista!</h3>
                <p className="text-sm text-gray-400">Copia la imagen y adjúntala en Twitter.</p>
            </div>

            <div className="mb-6 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                 <img src={generatedImage} alt="Resumen de Votos" className="w-full h-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                    onClick={downloadImage}
                    className={`${styles.components.navBtnBase} bg-gray-800 hover:bg-gray-700 text-white w-full justify-center`}
                >
                     <Download size={18} /> Descargar
                </button>
                <button 
                    onClick={openTwitterIntent}
                    className={`${styles.components.shareBtn} w-full justify-center`}
                >
                     <Share2 size={18} /> Abrir Twitter
                </button>
            </div>
          </div>
        </div>
      )}
      
      {/* CARD OCULTA PARA GENERACIÓN */}
      {hasSubmitted && (
          <VoteSummaryCardHidden votes={votes} data={DATA} />
      )}
    </div>
  );
}