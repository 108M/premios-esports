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
  getDoc,
  collection, // <--- FALTABA ESTO
  query,      // <--- FALTABA ESTO
  where,      // <--- FALTABA ESTO
  getDocs     // <--- FALTABA ESTO
} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
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

import logoImg from './assets/logo2.png'; 

// --- IMPORTS DE IMÁGENES ---

// Players
import elyoyaFoto from './assets/players/elyoya.jpg'; 
import razorkFoto from './assets/players/razork.png';
import supaFoto from './assets/players/supa.jpg';
import alvaroFoto from './assets/players/alvaro.jpg';
import myrwinFoto from './assets/players/myrwin.jpg';
import oscarininFoto from './assets/players/oscarinin.jpg';
import flakkedFoto from './assets/players/flakked.png';


// Revelacion
import thaygerFoto from './assets/revelacion/thayger.png';
import cronikFoto from './assets/revelacion/croniik.jpg';
import hydraFoto from './assets/revelacion/hydra.jpg';
import legolasFoto from './assets/revelacion/legolas.jpg';
import timeFoto from './assets/revelacion/time.jpg';
import rayitoFoto from './assets/revelacion/rayito.jpg';


// Staff
import melzhetFoto from './assets/staff/melzhet.jpeg';
import gaaxFoto from './assets/staff/gaax.jpg';
import guilhotoFoto from './assets/staff/guilhoto.jpg';
import machukiFoto from './assets/staff/machuki.jpeg';
import rodrigoFoto from './assets/staff/rodrigo.jpg';
import rhuckzFoto from './assets/staff/rhuckz.jpeg';
import mauroFoto from './assets/staff/mauro.jpg';
import ownerFoto from './assets/staff/owner.png';

//equipos
import fnaticFoto from './assets/equipos/fnatic.png';
import koiFoto from './assets/equipos/koi.jpg';
import hereticsFoto from './assets/equipos/heretics.jpeg';
import giantxFoto from './assets/equipos/giantx.png';
import follaculosFoto from './assets/equipos/follaculos.png';


//Personalidad
import SkainFoto from './assets/personalidad/skain.png';
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
import chinagapFoto from './assets/programa/chinagap.jpg';

//Caster
import bebecasterFoto from './assets/casters/bebecaster.jpg';
import noaFoto from './assets/casters/noa.jpg';
import fernandoFoto from './assets/casters/fernandocardenete.jpg';
import wolkFoto from './assets/casters/wolk.jpg';
import champi14Foto from './assets/casters/champi14.jpg';
import adreFoto from './assets/casters/adre.jpg';

//Costream
import koicostreamFoto from './assets/costream/koicoestream.jpeg';
import giantxcostreamFoto from './assets/costream/giantxcostream.jpeg';
import hereticscostreamFoto from './assets/costream/hereticscostream.jpeg';
import fnaticcostreamFoto from './assets/costream/jordiLMK.jpg';
import mfreakFoto from './assets/costream/mfreak.png';
import jetadirectaFoto from './assets/costream/jetadirecta.jpg';

//TW oficial
import giantxCMFoto from './assets/twoficial/giantx.jpg';
import koiCMFoto from './assets/twoficial/movistarkoi.jpg';
import hereticsCMFoto from './assets/twoficial/heretics.jpg';
import lecFoto from './assets/twoficial/lec.png';
import sheepFoto from './assets/twoficial/sheep.png';
import superligaFoto from './assets/twoficial/superliga.png';


// Roles
import iconJungle from './assets/roles/jungle.png'; 
import iconADC from './assets/roles/adc.png'; 
import iconTop from './assets/roles/toplane.png';
import iconSupp from './assets/roles/support.png';
import iconMid from './assets/roles/mid.png';
import iconStaff from './assets/roles/staff.png';
import iconPersonalidad from './assets/roles/personalidad.png';
import iconPrograma from './assets/roles/programa.png';
import iconCaster from './assets/roles/casteo.png';
import iconTwicht from './assets/roles/twitch.png';

// asociaciones
import elbarcoFoto from './assets/asociacion/elbarco.jpg';
import fanaticosFoto from './assets/asociacion/fanaticos.jpg';
import g2hispanoFoto from './assets/asociacion/g2hispano.jpeg';
import koinoborisFoto from './assets/asociacion/koinoboris.png';
import mareaFoto from './assets/asociacion/marea.jpeg';
import purpleboostFoto from './assets/asociacion/purpleboost.jpeg';

//fans
import dropickFoto from './assets/fans/dropick.jpg';
import gsnsbarcelonaFoto from './assets/fans/gsnsbarcelona.jpg';
import xtittanFoto from './assets/fans/titan.jpg';
import hassskyFoto from './assets/fans/hassky.jpg';
import kharasuFoto from './assets/fans/kharasu.jpg';

//iniciativa
import fnaticasdc from './assets/iniciativa/fnaticas.png';
import rifty from './assets/iniciativa/rifty.jpg';
import movidas from './assets/iniciativa/movidas.png';
import recaudar from './assets/iniciativa/recaudarfondos.png';
//movida 
import ireneFoto from './assets/movida/irene.png';
import koifuera from './assets/movida/koifueravct.png';
import koimermelada from './assets/movida/koimermelada.jpeg';
import maurocardonetti from './assets/movida/maurocardonetti.png';  
import tweetcabra from './assets/movida/tweetcabra.png';


//twittero
import haskkytw from './assets/twittero/hasskky.png';
import jakose from './assets/twittero/jakose.png';
import razorkismo from './assets/twittero/razorkismo.png';
import shirotw from './assets/twittero/shiro.png';
import sonri from './assets/twittero/sonri.png';

// ===========================================
// CONFIGURACIÓN DE FIREBASE Y FECHAS
// ===========================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);
const db = getFirestore(app);

const appId = "premios-ibericos-web"; 
const LOCAL_VOTOS_KEY = 'PREMIOS_VOTOS'; // CLAVE USADA PARA LOCALSTORAGE

const TARGET_DATE = new Date('2025-12-18T00:00:00');
const FECHA_INICIO = new Date('2025-12-02T12:00:00'); 
const OPENING_DATE = new Date(FECHA_INICIO.getTime() + ( 0 * 24 * 60 * 60 * 1000));

// ===========================================
// OBJETO DE ESTILOS
// ===========================================

const styles = {
  layout: {
    page: "min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black relative",
    navbar: "border-b border-gray-800 bg-black/60 backdrop-blur-md sticky top-0 z-50",
    navContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between", 
    navLogoGroup: "flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity",
    navUserGroup: "flex items-center gap-4",
    main: "max-w-7xl mx-auto px-0 py-8 pb-32",
    footer: "fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-40",
    footerContainer: "max-w-7xl mx-auto flex flex-row items-center justify-between gap-2",
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
    footerDots: "flex flex-row gap-2 justify-center",
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
    loginBtn: "text-lg font-bold text-yellow-500 hover:text-yellow-400 flex items-center gap-3 px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-xl border  border-yellow-500/30 transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    navBtnBase: "flex items-center justify-center gap-2 px-3 py-2 sm:px-6 rounded-xl font-bold transition-all text-sm sm:text-base",
    navBtnDisabled: "text-gray-600 cursor-not-allowed",
    navBtnActive: "text-white hover:bg-gray-800",
    navBtnNext: "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10",
    actionBtn: "flex items-center justify-center gap-2 p-3 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base",
    shareBtn: "flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors w-full sm:w-auto",
    copyBtnBase: "flex items-center justify-center gap-2 py-3 font-bold rounded-xl transition-all border w-full sm:w-auto",
    copyBtnSuccess: "bg-green-500 border-green-500 text-white",
    copyBtnDefault: "bg-transparent border-gray-600 hover:bg-gray-800 text-gray-300",
    logoutBtn: "w-full py-3 text-gray-500 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm",
    dotBase: "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125",
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
    listContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8",
    listHeader: "text-sm uppercase tracking-widest text-gray-500 border-b border-gray-700 pb-2 mb-4",
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



// AÑADE ESTA FUNCIÓN AQUÍ:
const getInitialVotes = () => {
    try {
        const savedVotes = localStorage.getItem(LOCAL_VOTOS_KEY);
        // El cambio clave: Si parsed es null, usamos {}
        const parsed = savedVotes ? JSON.parse(savedVotes) : {};
        return parsed || {}; 
    } catch (e) {
        console.error("Error al cargar votos iniciales:", e);
        return {};
    }
};


// ===========================================
// DATA (CANDIDATOS Y CATEGORÍAS)
// ===========================================

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
        { id: 'p7', name: 'Flakked', team: 'Team Heretics', role: 'ADC', roleIcon: iconADC, img: <img src={flakkedFoto} alt="Flakked" className="w-full h-full object-cover object-top" /> },
      ]
    },

    // 1. Jugador REVELACION
    {
      id: 'jugador_revelacion',
      title: 'Jugador Revelacion 2025',
      icon: <Trophy className="w-6 h-6" />,
      description: 'El jugador que mas ha sorprendido esta temporada.',
      candidates: [
        { id: 'p1', name: 'Thayger', team: 'Navi', role: 'Jungla', roleIcon: iconJungle, img: <img src={thaygerFoto} alt="Thayger" className="w-full h-full object-cover object-top" /> },
        { id: 'p2', name: 'Legolas', team: 'Barça', role: 'ADC', roleIcon: iconADC, img: <img src={legolasFoto} alt="Legolas" className="w-full h-full object-cover object-top" /> },
        { id: 'p3', name: 'CRoNiiK', team: 'Izidream', role: 'Jungla', roleIcon: iconJungle, img: <img src={cronikFoto} alt="CRoNiiK" className="w-full h-full object-cover object-top" /> },
        { id: 'p4', name: 'Hydra', team: 'LUA Gaming', role: 'Mid', roleIcon: iconMid, img: <img src={hydraFoto} alt="Hydra" className="w-full h-full object-cover "style={{ objectPosition: '10% 15%' }} />  },
        { id: 'p5', name: 'Time', team: 'Veni Vidi Vici', role: 'Jungla', roleIcon: iconJungle, img: <img src={timeFoto} alt="Time" className="w-full h-full object-cover object-top" /> },
        { id: 'p6', name: 'Rayito', team: 'Veni Vidi Vici', role: 'ADC', roleIcon: iconADC, img: <img src={rayitoFoto} alt="Rayito" className="w-full h-full object-cover object-top" style={{ objectPosition: '10% 25%' }}/> },
        
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
        { id: 's6', name: 'Rhuckz', team: 'Giantx', role: 'Staff', roleIcon: iconStaff, img: <img src={rhuckzFoto} alt="Rhuckz" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} /> },
        { id: 's7', name: 'Mauro Garih', team: 'SK Gaming', role:'Assistant', roleIcon: iconStaff, img: <img src={mauroFoto} alt="Mauro Garih" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} /> },
        { id: 's8', name: 'Owner', team: 'SK Gaming', role: 'Head Coach', roleIcon: iconStaff, img: <img src={ownerFoto} alt="Owner" className="w-full h-full object-cover" style={{ objectPosition: '100% 10%' }} /> },]

      },
    // 3. Equipo del año
    {
      id: 'equipo_ano',
      title: 'Equipo del Año',
      icon: <Shield className="w-6 h-6" />,
      description: 'La organización que ha marcado la diferencia este año.',
      candidates: [
        { id: 't1', name: 'Movistar KOI', team: 'MKOI', role: 'Org', roleIcon: iconStaff, img: <img src={koiFoto} alt="Movistar KOI" className="w-full h-full object-cover object-center" /> },
        { id: 't2', name: 'Fnatic', team: 'FNC', role: 'Org', roleIcon: iconStaff, img: <img src={fnaticFoto} alt="Fnatic" className="w-full h-full object-cover object-center" /> },
        { id: 't3', name: 'GiantX', team: 'GX', role: 'Org', roleIcon: iconStaff, img: <img src={giantxFoto} alt="GiantX" className="w-full h-full object-cover object-center" /> },
        { id: 't4', name: 'Team Heretics', team: 'TH', role: 'Org', roleIcon: iconStaff, img: <img src={hereticsFoto} alt="Team Heretics" className="w-full h-full object-cover object-center" /> },
        { id: 't5', name: 'Follaculos', team: 'FO', role: 'Org', roleIcon: iconStaff, img: <img src={follaculosFoto} alt="Follaculos" className="w-full h-full object-cover object-center" /> },
      ]
    },
    // 4. Costreaming of the Year
    {
      id: 'costreaming',
      title: 'Costreaming del Año',
      icon: <Video className="w-6 h-6" />,
      description: 'La mejor retransmisión alternativa de la competición.',
      candidates: [
        { id: 'cs1', name: 'Movistar Koi', team: 'Stream Knekro', role: 'Costream', roleIcon: iconTwicht, img: <img src={koicostreamFoto} alt="Stream MKOI" className="w-full h-full object-cover object-center" /> },
        { id: 'cs3', name: 'GiantX', team: 'Stream Th3Antonio', role: 'Costream', roleIcon: iconTwicht, img: <img src={giantxcostreamFoto} alt="Stream GiantX" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }} /> },
        { id: 'cs4', name: 'Team Heretics', team: 'Stream Werlyb / TheGrefg', role: 'Costream', roleIcon: iconTwicht, img: <img src={hereticscostreamFoto} alt="Stream Heretics" className="w-full h-full object-cover object-center" /> },
        { id: 'cs5', name: 'FNATIC', team: 'Stream JordiLMK / Esportmaniacos', role: 'Costream', roleIcon: iconTwicht, img: <img src={jordilmkFoto} alt="Stream FNATIC" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }} /> },
        { id: 'cs6', name: 'DplusKIA', team: 'Stream Mfreak', role: 'Costream', roleIcon: iconTwicht, img: <img src={mfreakFoto} alt="Stream DPLUS" className="w-full h-full object-cover object-center" /> },
        { id: 'cs7', name: 'LYON Gaming', team: 'Stream Jetadirecta', role: 'Costream', roleIcon: iconTwicht, img: <img src={jetadirectaFoto} alt="JordiLMK" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }} /> },
        
      ]
    },
    // 5. Personalidad
    {
      id: 'personalidad',
      title: 'Personalidad Esports',
      icon: <User className="w-6 h-6" />,
      description: 'La figura más influyente y carismática del año.',
      candidates: [
        { id: 'per1', name: 'Skain', team: 'Free', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={SkainFoto} alt="Skain" className="w-full h-full object-cover object-center"  style={{ objectPosition: '50% 20%' }}/> },
        { id: 'per2', name: 'Toad', team: 'Lyon Gaming', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={toadFoto} alt="Toad Amarillo" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }} /> },
        { id: 'per3', name: 'JordiLMK', team: 'Content', role: 'Creator', roleIcon: iconPersonalidad, img: <img src={jordilmkFoto} alt="JordiLMK" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }} /> },
        { id: 'per4', name: 'Charo Villarejo', team: 'Content', role: 'Madre', roleIcon: iconPersonalidad, img: <img src={charoFoto} alt="Charo Villarejo" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }} /> },
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
        { id: 'pr7', name: 'Chinagap', team: 'Debate', role: 'Show', roleIcon:iconPrograma , img: <img src={chinagapFoto} alt="Chinagap" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 30%' }}/> },
        
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
        { id: 'ts3', name: 'Fernando Cardenete', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={fernandoFoto} alt="Fernando Cardenete" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }}/> },
        { id: 'ts4', name: 'Wolk', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={wolkFoto} alt="Wolk" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 30%' }}/> },
        { id: 'ts5', name: 'Champi14', team: 'LVP', role: 'Caster', roleIcon: iconCaster, img: <img src={champi14Foto} alt="Champi14" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }}/> },
        { id: 'ts6', name: 'Adreplays', team: 'Free', role: 'Caster', roleIcon: iconCaster, img: <img src={adreFoto} alt="Adreplays" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 20%' }}/> },
        
      ]
    },
    // 8. Cuenta Twitter
    {
      id: 'twitter_cuenta',
      title: 'Twitter Oficial',
      icon: <Twitter className="w-6 h-6" />,
      description: 'La mejor gestión de redes sociales de equipo u organización.',
      candidates: [
        { id: 'tw1', name: 'Movistar KOI', team: 'KOI', role: 'Social', roleIcon: iconCaster, img: <img src={koiCMFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'tw2', name: 'GiantX', team: 'GX', role: 'Social', roleIcon: iconCaster, img: <img src={giantxCMFoto} alt="Giantx" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'tw3', name: 'Team Heretics', team: 'TH', role: 'Social', roleIcon: iconCaster, img: <img src={hereticsCMFoto} alt="Team heretics" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'tw4', name: 'LVP', team: 'LVP', role: 'Social', roleIcon: iconCaster, img: <img src={superligaFoto} alt="LVP" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'tw5', name: 'Sheep Esports ES', team: 'Sheep Esports', role: 'Media', roleIcon: iconCaster, img: <img src={sheepFoto} alt="Sheep Esports" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'tw6', name: 'LEC', team: 'KC', role: 'Media',roleIcon: iconCaster, img: <img src={lecFoto} alt="LEC" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 60%' }}/> },
      ]
    },
    // 9. Twittero
    {
      id: 'twittero',
      title: 'Twittero del Año',
      icon: <User className="w-6 h-6" />,
      description: 'El usuario que ha reinado en la comunidad de Twitter España.',
      candidates: [
        { id: 'twt1', name: 'Shiro', team: '@Shirolamperouge', role: 'User', roleIcon: iconCaster, img: <img src={shirotw} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'twt2', name: 'Razorkismo', team: '@razorkismo_', role: 'User', roleIcon: iconCaster, img: <img src={razorkismo} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'twt3', name: 'Jakose', team: '@Jakose', role: 'User', roleIcon: iconCaster, img: <img src={jakose} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'twt4', name: 'Sonridi', team: '@sonridesigual', role: 'User', roleIcon: iconCaster, img: <img src={sonri} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
      ]
    },
    

    {
      id: 'asociacion',
      title: 'Asociacion de Fans del Año',
      icon: <Users className="w-6 h-6" />,
      description: 'La mejor agrupacion que lo da todo por sus equipos.',
      candidates: [
        { id: 'af1', name: 'El Barco', team: 'Team Heretics', role: 'Asociacion', roleIcon: iconCaster, img: <img src={elbarcoFoto} alt="Team Heretics" className="w-full h-full object-cover object-center" /> },
        { id: 'af2', name: 'La Marea', team: 'GiantX', role: 'Asociacion', roleIcon: iconCaster, img: <img src={mareaFoto} alt="Giantx" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 60%' }}/> },
        { id: 'af3', name: 'FanaticosESP', team: 'Fnatic', role: 'Asociacion', roleIcon: iconCaster, img: <img src={fanaticosFoto} alt="Fnatic" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 60%' }}/> },
        { id: 'af4', name: 'G2 Hispano', team: 'G2 esports', role: 'Asociacion', roleIcon: iconCaster, img: <img src={g2hispanoFoto} alt="G2 esports" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'af5', name: 'KOI Noboris', team: 'Movistar Koi', role: 'Asociacion', roleIcon: iconCaster, img: <img src={koinoborisFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'af6', name: 'Purple Boost', team: 'Movistar Koi', role: 'Asociacion', roleIcon: iconCaster, img: <img src={purpleboostFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
      ]
    },
    
    // 10. Fans de equipo
    
    {
      id: 'fans',
      title: 'Fan del Año',
      icon: <Users className="w-6 h-6" />,
      description: 'El seguidor más apasionado y leal.',
      candidates: [
        { id: 'f1', name: 'XTittan', team: 'Fan Team Heretics', role: 'Superfan', roleIcon: iconCaster, img: <img src={xtittanFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 40%' }}/> },
        { id: 'f2', name: 'GSNS Barcelona', team: 'Fan Guasones', role: 'Superfan', roleIcon: iconCaster, img: <img src={gsnsbarcelonaFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'f3', name: 'Dropick', team: 'Fan Rogue/Navi', role: 'Superfan', roleIcon: iconCaster, img: <img src={dropickFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'f4', name: 'Hasssky', team: 'Fan', role: 'Superfan', roleIcon: iconCaster, img: <img src={haskkytw} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'f5', name: 'Kharasu', team: 'Fan KC', role: 'Superfan', roleIcon: iconCaster, img: <img src={kharasuFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },

      ]
    },
    // 11. movida del Año
    {
      id: 'movida_year',
      title: 'Movida del Año',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'La movida que rompio internet este año.',
      candidates: [
        { id: 'msg1', name: 'Twittlonger Cabra a IWD', team: 'Cabra', role: 'Tweet', roleIcon: iconCaster, img: <img src={tweetcabra} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'msg2', name: 'Cardonetti vs Mauro Garih', team: 'Cardonetti / Mauro', role: 'Tweet', roleIcon: iconCaster, img: <img src={maurocardonetti} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'msg3', name: 'Poses Cute T1', team: 'Irenerawr', role: 'Tweet', roleIcon: iconCaster, img: <img src={ireneFoto} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'msg4', name: 'Koi fuera de VCT', team: 'Movistar Koi', role: 'Tweet', roleIcon: iconCaster, img: <img src={koifuera} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'msg5', name: 'Tarros Mermelada', team: 'Movistar Koi', role: 'Tweet', roleIcon: iconCaster, img: <img src={koimermelada} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
      ]
    },
    // 12. Premios Aparte (Agrupados o última categoría)
    {
      id: 'mejor_iniciativa',
      title: 'Mejor Iniciativa',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Reconocimientos únicos de la comunidad.',
      candidates: [
        { id: 'pe1', name: 'Discord de fnaticAs', team: 'Pili y Anna', role: 'Comunidad', roleIcon: iconCaster, img: <img src={fnaticasdc} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'pe2', name: 'RIFTY Fantasy Lol', team: '@Rifty', role: 'Comunidad', roleIcon: iconCaster, img: <img src={rifty} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 50%' }}/> },
        { id: 'pe3', name: 'Movidas Esports', team: '@MovidasEsports', role: 'Comunidad', roleIcon: iconCaster, img: <img src={movidas} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
        { id: 'pe4', name: 'Recaudacion de Fondos LEC Expo', team: '@KOINOBORIS', role: 'Asociacion de fans', roleIcon: iconCaster, img: <img src={recaudar} alt="Movistar Koi" className="w-full h-full object-cover object-center" style={{ objectPosition: '50% 10%' }}/> },
      ]
    }
  ]
};

// ===========================================
// COMPONENTES UI AUXILIARES
// ===========================================

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
          <span className={styles.text.dateMonth}>Diciembre</span>
          <span className={styles.text.dateDay}>18</span>
          <span className={styles.text.dateHour}>00:00 CET</span>
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


// ===========================================
// COMPONENTE PRINCIPAL
// ===========================================

export default function App() {
  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState(getInitialVotes);
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
  const [forceScrollTop, setForceScrollTop] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [voterEmail, setVoterEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const currentCategoryData = DATA.categories[currentStep];
  const isReviewStep = currentStep === DATA.categories.length;
const isAllVoted = votes && DATA.categories.every(cat => votes[cat.id]);
  const titleRef = useRef(null);
  
  const backgroundStyle = {
    backgroundColor: '#050505',
    backgroundImage: `
      radial-gradient(circle at 50% 10%, rgba(234, 179, 8, 0.15), transparent 40%),
      radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '100% 100%, 32px 32px'
  };


// ... (Tu función App) ...

  // 1. Efecto de control de apertura de votación
  useEffect(() => {
    if (new Date() >= OPENING_DATE) {
      setIsVotingOpen(true);
    }
  }, []);


  // 2. Efecto de MIGRACIÓN Y CARGA LOCAL DE VOTOS


  // 3. Efecto de SCROLL
  useEffect(() => {
    if (forceScrollTop) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       setForceScrollTop(false);
    } else if (currentStep > 0 && titleRef.current) {
      const yOffset = -120;
      const element = titleRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, forceScrollTop]);


  // 4. Efecto de AUTENTICACIÓN Y CARGA DE FIREBASE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'votes', 'selection');
          const docSnap = await getDoc(userDocRef);
          
          if (docSnap.exists()) {
            // Carga de Firestore (Votos definitivos y logueados)
            const data = docSnap.data();
            if (data.ballot) {
              setVotes(data.ballot || {});
              setHasSubmitted(true);
              if (data.userEmail) {
                setVoterEmail(data.userEmail);
              }
            }
          } 
          /* // Si el usuario llega con votos en localStorage (por migración), pero no en Firestore, 
          // ya tiene los votos en el estado gracias al useEffect de migración anterior.
          // Solo necesitamos asegurarnos de que el formulario de login/email se mantenga.
          */

        } catch (error) {
          console.error("Error cargando votos de Firestore:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


const findVotesByEmail = async (email) => {

    if (!email) {
        return null;
    }

    // VERIFICACIÓN DE AUTH: ¿Quién está preguntando?
    const currentUser = auth.currentUser;

    try {
        const usersCollectionRef = collection(db, 'artifacts', appId, 'users');
        
        // Creamos la query
        const q = query(usersCollectionRef, where('userEmail', '==', email));

        const querySnapshot = await getDocs(q);
        

        if (querySnapshot.empty) {
            return null; 
        }

        // Si encontramos al usuario
        const userDoc = querySnapshot.docs[0];
        const uid = userDoc.id;

        // Buscamos la papeleta
        const votesRef = doc(db, 'artifacts', appId, 'users', uid, 'votes', 'selection');
        const voteSnap = await getDoc(votesRef);

        if (voteSnap.exists()) {
            const data = voteSnap.data();
            return data;
        } else {
            return null;
        }

    } catch (error) {
        // AQUÍ ES DONDE ESTABA FALLANDO
       
        
        if (error.code === 'permission-denied') {
            console.warn("[DEBUG] BLOQUEADO POR REGLAS DE FIREBASE. Revisa la consola de Firebase.");
        }
        return null;
    }
};

const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        setEmailError('Por favor, introduce un correo válido.');
        return;
    }
    
    // TRUCO IMPORTANTE: Pasamos a minúsculas y quitamos espacios extra
    const emailLimpio = emailInput.toLowerCase().trim();

    setEmailError('');
    try {
        // 1. Iniciar sesión anónimamente
        const userCredential = await signInAnonymously(auth);
        const uid = userCredential.user.uid;
        const userDocRef = doc(db, 'artifacts', appId, 'users', uid, 'votes', 'selection');
        
        let finalVotes = votes || {};
        let isFinalSubmitted = false;

        // 2. Buscar usando el email LIMPIO
        // Puse un console.log para que veas en la consola qué está buscando
        console.log("Buscando votos para:", emailLimpio);
        const existingVoteData = await findVotesByEmail(emailLimpio);
        
        if (existingVoteData) {
            // ¡ENCONTRADO!
            const remoteVotes = existingVoteData.ballot || {};
            
            if (Object.keys(remoteVotes).length > 0) {
                finalVotes = remoteVotes;
                isFinalSubmitted = true;
                // ALERT TEMPORAL: Para confirmar que funciona
              
            } else {
                isFinalSubmitted = false;
                console.log("Usuario encontrado pero sin votos válidos. Permitiendo revotación.");
            }

            // Guardamos los datos recuperados en el usuario actual
            await setDoc(userDocRef, existingVoteData, { merge: true });
            
        } else {
            // NO ENCONTRADO
            console.log("No se encontraron votos previos para este email.");
            
            // Si no encuentra nada, verificamos si el usuario actual tenía votos pendientes de enviar
            if (Object.keys(finalVotes).length > 0) { 
                await setDoc(userDocRef, {
                    ballot: finalVotes,
                    submittedAt: new Date().toISOString(),
                    userEmail: emailLimpio, // Guardamos el email limpio
                    appId: appId
                }, { merge: true });
                isFinalSubmitted = true; 
            } else {
                // Si no encuentra votos y no tenía nada seleccionado, NO está submitted
                isFinalSubmitted = false;
            }
        }
        
        // 3. Actualizar React
        setVotes(finalVotes);
        setHasSubmitted(isFinalSubmitted);
        setVoterEmail(emailLimpio);
        setShowLoginModal(false);

    } catch (error) {
        console.error("Error handleLogin:", error);
        alert("Error: " + error.message); 
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
        // 1. Guardar VOTO COMPLETO en la subcolección (como antes)
        await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'votes', 'selection'), {
            ballot: votes,
            submittedAt: new Date().toISOString(),
            userEmail: voterEmail,
            appId: appId
        }, { merge: true });

        // 2. NUEVO: Guardar EMAIL en el documento PADRE (para que el buscador lo encuentre)
        await setDoc(doc(db, 'artifacts', appId, 'users', user.uid), {
            userEmail: voterEmail,
            submittedAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        }, { merge: true });
        
        setHasSubmitted(true);
        setShowSuccessView(true); 
    } catch (error) {
        console.error("Error guardando votos:", error);
        alert("Hubo un error al enviar tus votos: " + error.message);
    } finally {
        setIsSubmitting(false);
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
    localStorage.removeItem(LOCAL_VOTOS_KEY); // Limpiamos local storage también
  };

  const handleVote = (candidateId) => {
    if (hasSubmitted) return;
    const categoryId = DATA.categories[currentStep].id;
    const newVotes = { ...votes, [categoryId]: candidateId };
    setVotes(newVotes);
    
    // Guardar en LocalStorage después de cada voto (persistencia inmediata)
    localStorage.setItem(LOCAL_VOTOS_KEY, JSON.stringify(newVotes));
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


  const handleSmartShare = async () => {
    if (typeof html2canvas === 'undefined') return;
    
    setGeneratingImage(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const element = document.getElementById('vote-summary-card-hidden');
      
      if (!element) {
        setGeneratingImage(false);
        return;
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
        logging: false,
        width: 1080,
        height: element.offsetHeight
      });

      const dataUrl = canvas.toDataURL("image/png");
      setGeneratedImage(dataUrl);

      // Lógica de Copiado/Compartido
      canvas.toBlob(async (blob) => {
        let copySuccess = false;
        
        const isMobileShareSupported = navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], "votos.png", { type: "image/png" })] });
        const isDesktop = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        try {
          if (isMobileShareSupported && !isDesktop) {
             // --- OPCIÓN A: MÓVIL (Compartir nativo) ---
             await navigator.share({
               files: [new File([blob], "votos.png", { type: "image/png" })],
               title: 'Mis Votos Premios Ibéricos',
               text: '¡Mis votos para los #PremiosIbéricos! 🗳️'
             });
             copySuccess = true;
          } else {
             // --- OPCIÓN B: PC (Copiar al Portapapeles) ---
             const item = new ClipboardItem({ "image/png": blob });
             await navigator.clipboard.write([item]);
             copySuccess = true;
             setCopied(true);
             setTimeout(() => setCopied(false), 3000);
             
             const text = "¡Estos son mis votos para los #PremiosIbéricos! 🗳️\n\n(Pega tu imagen aquí 👇)";
             const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
             window.open(url, '_blank');
          }
        } catch (err) {
          console.warn("Copiado/Compartir falló o fue cancelado:", err);
          copySuccess = false;
        }

        // 3. Si el proceso de Compartir/Copiar falla, mostramos el modal de respaldo
        if (!copySuccess) {
            setShowSuccessView(false);
            setShowShareModal(true);
        }
        
        setGeneratingImage(false);
      });

    } catch (error) {
      console.error("Error en smart share:", error);
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


  return (
    <div className={styles.layout.page} style={backgroundStyle}>
      {/* NAVBAR */}
      <nav className={styles.layout.navbar}>
        <div className={styles.layout.navContainer}>
          <div 
          className={styles.layout.navLogoGroup} 
          onClick={() => {
            setCurrentStep(0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ cursor: 'pointer' }} 
          >
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

            
            <div className={
              currentCategoryData.candidates.length > 6
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-7xl mx-auto"
                : styles.layout.grid
            }>
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
                onClick={() => setCurrentStep(idx)} 
                className={`${styles.components.dotBase} ${idx === currentStep ? styles.components.dotActive : idx < currentStep ? styles.components.dotInactive : styles.components.dotPending}`}
              />
            ))}
             <div 
                onClick={() => setCurrentStep(DATA.categories.length)}
                className={`${styles.components.dotBase} ${isReviewStep ? styles.components.dotReview : styles.components.dotPending}`} 
             />
          </div>


          
          {!isReviewStep ? (
             isAllVoted ? (
                // Botón para ir directo al final
                <button 
                  onClick={() => setCurrentStep(DATA.categories.length)}
                  className={`${styles.components.navBtnBase} ${styles.components.navBtnNext} bg-yellow-500 hover:bg-yellow-400 text-black border-none`}
                >
                  <span className="hidden sm:inline">Ver Resumen</span> <CheckCircle2 size={20} />
                </button>
             ) : (
                // Botón Siguiente normal
                <button 
                  onClick={nextCategory}
                  className={`${styles.components.navBtnBase} ${styles.components.navBtnNext}`}
                >
                  <span className="hidden sm:inline">Siguiente</span> <ChevronRight size={20} />
                </button>
             )
          ) : (
            // ESTAMOS EN EL RESUMEN
            <button 
              onClick={submitVotes}
              disabled={isSubmitting}
              className={styles.components.actionBtn}
              title={isSubmitting ? 'Enviando...' : 'Confirmar Votos'} 
            >
              
              <span className="hidden sm:inline">
                  {isSubmitting ? 'Enviando...' : 'Confirmar Votos'}
              </span> 
              <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>

      
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

            
            <div className={`${styles.success.listContainer} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`}>
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
                  onClick={handleSmartShare}  
                  disabled={generatingImage}
                  className={styles.components.shareBtn}
              >
                  <Twitter size={18} /> {generatingImage ? 'Procesando...' : 'Compartir en Twitter'}
              </button>
              <button 
                  onClick={handleCopyClipboard} 
                  className={`${styles.components.copyBtnBase} ${copied ? styles.components.copyBtnSuccess : styles.components.copyBtnDefault}`}
              >
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copied ? 'Copiar Texto' : 'Copiar Texto'}
              </button>
            </div>

            <button onClick={handleLogout} className={styles.components.logoutBtn}>
                <LogOut size={16} /> Cerrar Sesión
            </button>
            </div>
        </div>
      )}

      
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
      
      
      {hasSubmitted && (
          <VoteSummaryCardHidden votes={votes} data={DATA} />
      )}
    </div>
  );
}