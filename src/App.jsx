import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  ChevronRight,
  Cog,
  Facebook,
  Gauge,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
} from 'lucide-react';

const phoneDisplay = '(667) 187 2721';
const phoneHref = 'tel:+526671872721';
const whatsappHref =
  'https://wa.me/526671872721?text=Hola%20Mr.%20Baleros%2C%20quiero%20cotizar%20una%20pieza%20para%20mi%20vehiculo.';
const mapHref =
  'https://www.google.com/maps/search/?api=1&query=Avenida%20Revoluci%C3%B3n%20%26%20Plan%20de%20Tuxtepec%2C%20Emiliano%20Zapata%2C%2080260%20Culiac%C3%A1n%20Rosales%2C%20Sin.';

const navItems = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Diagnóstico Express', href: '#diagnostico' },
  { label: 'Inventario', href: '#inventario' },
  { label: 'Ubicación', href: '#ubicacion' },
];

const services = [
  {
    title: 'Baleros espiga',
    description: 'Piezas de alta precisión para reparación, cambio y ajuste de sistemas de tracción en todas las marcas.',
    icon: Cog,
    accent: 'bg-orange-600/10 border border-orange-500/20 text-orange-400',
  },
  {
    title: 'Baleros tripoides',
    description: 'Soluciones especializadas para juntas, flechas y componentes de movimiento constante.',
    icon: Gauge,
    accent: 'bg-zinc-800 text-zinc-300 border border-white/5',
  },
  {
    title: 'Barras y cubrepolvos (botas)',
    description: 'Refacciones de calidad para proteger, sellar y mantener la vida útil de tus flechas homocinéticas.',
    icon: ShieldCheck,
    accent: 'bg-teal-700/10 border border-teal-500/20 text-teal-400',
  },
  {
    title: 'Especialista en MG, JAC y Chinos',
    description: 'Diagnóstico y refacciones directas para juntas homocinéticas y tripoides de MG5, MG ZS, JAC J7, SEI3 y más.',
    icon: Sparkles,
    accent: 'bg-gradient-to-br from-orange-600/20 to-amber-500/20 border border-orange-500/30 text-orange-400 shadow-lg shadow-orange-500/5',
  },
  {
    title: 'Caja, flechas y cardán a medida',
    description: 'Trabajo especializado a la medida para camionetas, vehículos 4x4 y proyectos industriales.',
    icon: Wrench,
    accent: 'bg-zinc-700/10 border border-zinc-500/20 text-zinc-300',
  },
  {
    title: 'Carros europeos y premium',
    description: 'Atención certificada para BMW, Audi, Mercedes-Benz, Volvo y más con baleros de alta gama.',
    icon: Star,
    accent: 'bg-zinc-950 text-orange-400 border border-orange-500/30',
  },
];

const gallery = [
  {
    src: '/images/inventario-1.jpeg',
    title: 'Tripoides y bases',
    caption: 'Piezas listas para revisión y cambio rápido.',
    className: 'md:col-span-2',
  },
  {
    src: '/images/inventario-2.jpeg',
    title: 'Flechas y barras',
    caption: 'Inventario para distintas marcas y medidas.',
    className: '',
  },
  {
    src: '/images/inventario-3.jpeg',
    title: 'Barras cardán',
    caption: 'Diseñadas para trabajo pesado y uso diario.',
    className: '',
  },
  {
    src: '/images/inventario-4.jpeg',
    title: 'Flechas completas',
    caption: 'Variedad para todo tipo de vehículos y 4x4.',
    className: 'md:col-span-2',
  },
  {
    src: '/images/inventario-5.jpeg',
    title: 'Mazas y tripoides',
    caption: 'Refacciones organizadas listas para instalar.',
    className: 'md:col-span-2',
  },
  {
    src: '/images/inventario-6.jpeg',
    title: 'Cardanes y soportes',
    caption: 'Piezas de alta durabilidad en nuestro taller.',
    className: '',
  },
];

const stats = [
  { value: 'MG & JAC', label: 'Especialidad en autos chinos' },
  { value: '4x4 & Europeos', label: 'Rendimiento y precisión premium' },
  { value: '1 llamada', label: 'Cotización rápida al instante' },
];

const brandFamilies = [
  'MG',
  'JAC',
  'BMW',
  'Audi',
  'Mercedes-Benz',
  'Toyota',
  'Nissan',
  'Ford',
  'Chevrolet',
  'Jeep',
  'Honda',
  'Volkswagen'
];

const issuesList = [
  { id: 'espiga', label: 'Ruido de golpeteo al dar vuelta (Junta Homocinética / Espiga)', text: 'ruido de golpeteo al dar vuelta (junta homocinética / espiga)' },
  { id: 'tripoide', label: 'Vibración al acelerar a más de 60 km/h (Tripoide o Flecha)', text: 'vibración al acelerar a más de 60 km/h (tripoide o flecha)' },
  { id: 'balero', label: 'Zumbido constante al avanzar (Balero de Rueda)', text: 'zumbido constante al avanzar (balero de rueda)' },
  { id: 'bota', label: 'Tiradero de grasa en la rueda (Cubrepolvo / Bota rota)', text: 'cubrepolvo o bota rota con tiradero de grasa' },
  { id: 'cardan', label: 'Golpe seco al meter velocidad o reversa (Barra Cardán / Soporte)', text: 'golpe seco al meter velocidad o reversa (barra cardán / soporte)' },
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/search/top?q=Mr%20Baleros%20Culiacan',
    icon: Facebook,
  },
  {
    label: 'WhatsApp',
    href: whatsappHref,
    icon: MessageCircle,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: Instagram,
  },
];

function Preloader({ finishLoading }) {
  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-zinc-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Glow behind */}
        <motion.div
          className="absolute h-36 w-36 rounded-full bg-orange-600/30 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Rotating ring */}
        <motion.div
          className="h-32 w-32 rounded-full border-t-2 border-r-2 border-orange-500 border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Logo in the center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img
            src="/images/logo-perrito.png"
            alt="Mr. Baleros Logo"
            className="h-16 w-16 rounded-full object-cover border-2 border-orange-500 shadow-[0_0_25px_rgba(255,106,0,0.5)]"
            animate={{
              scale: [0.93, 1.05, 0.93],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
      
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-black uppercase tracking-[0.25em] text-white">Mr. Baleros</h2>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-400">Venta e Instalación</p>
      </motion.div>
      
      {/* progress bar */}
      <div className="mt-8 h-1 w-52 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          onAnimationComplete={finishLoading}
        />
      </div>
    </motion.div>
  );
}

function ThreePerritos() {
  return (
    <div className="flex items-center -space-x-3.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative h-8 w-8 rounded-full border-2 border-orange-500/60 bg-zinc-950 overflow-hidden shadow-lg"
          whileHover={{ 
            y: -5, 
            zIndex: 10,
            scale: 1.2,
            borderColor: '#f97316',
            boxShadow: '0 10px 20px rgba(255, 106, 0, 0.4)'
          }}
          transition={{ 
            type: "spring", 
            stiffness: 450, 
            damping: 15,
            delay: 0.2 + i * 0.1 
          }}
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
        >
          <img 
            src="/images/logo-perrito.png" 
            alt={`Perrito ${i + 1}`} 
            className="h-full w-full object-cover" 
          />
        </motion.div>
      ))}
    </div>
  );
}

function BrandMark() {
  return (
    <a href="#inicio" className="group flex items-center gap-3.5" aria-label="Ir al inicio">
      <motion.div 
        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)] overflow-hidden"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src="/images/logo-perrito.png" 
          alt="Logo Mr. Baleros" 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </motion.div>
      <span className="leading-none">
        <span className="block text-lg font-black tracking-tight text-white group-hover:text-orange-400 transition-colors duration-300">Mr. Baleros</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400">Venta e instalación</span>
      </span>
    </a>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');

  const closeMenu = () => setIsMenuOpen(false);

  const getCustomWhatsappHref = () => {
    if (!selectedBrand && !selectedIssue) return whatsappHref;
    let text = 'Hola Mr. Baleros,';
    if (selectedBrand) {
      text += ` tengo un vehículo marca ${selectedBrand}`;
    }
    if (selectedIssue) {
      const issueText = issuesList.find(i => i.id === selectedIssue)?.text || '';
      text += selectedBrand ? ` que presenta ${issueText}` : ` mi auto presenta ${issueText}`;
    }
    text += '. Me gustaría cotizar la refacción y la instalación, por favor.';
    return `https://wa.me/526671872721?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div id="inicio" className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
        <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-zinc-950/80 text-white shadow-2xl backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8" aria-label="Principal">
            <div className="flex items-center gap-5">
              <BrandMark />
              <div className="hidden sm:block">
                <motion.div 
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3)] overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src="/images/chatgpt-image.png" 
                    alt="Logo Mr. Baleros ChatGPT" 
                    className="h-full w-full object-cover" 
                  />
                </motion.div>
              </div>
            </div>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3.5 lg:flex">
              <a className="icon-link" href={phoneHref} aria-label={`Llamar a Mr. Baleros ${phoneDisplay}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <motion.a 
                className="btn-primary" 
                href={whatsappHref} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Cotizar ahora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 lg:hidden"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          {isMenuOpen && (
            <motion.div 
              className="border-t border-white/5 bg-zinc-950 px-4 pb-6 pt-3 lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mx-auto grid max-w-7xl gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3.5 font-bold text-zinc-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a className="btn-primary mt-3 w-full" href={whatsappHref} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  Cotizar por WhatsApp
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </a>

                {/* Mobile menu perritos */}
                <div className="flex items-center justify-between mt-5 px-4 py-3 border-t border-white/5 bg-zinc-900/20 rounded-xl">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Mascotas Oficiales 🐾</span>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 overflow-hidden shadow"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src="/images/chatgpt-image.png" 
                        alt="Logo ChatGPT" 
                        className="h-full w-full object-cover" 
                      />
                    </motion.div>
                    <ThreePerritos />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </header>

        <main>
          {/* HERO SECTION */}
          <section className="hero-section relative min-h-screen overflow-hidden pt-28 lg:pt-36 text-white flex items-center">
            <div className="industrial-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24">
              <motion.div 
                className="max-w-3xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-400">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Especialidad en MG, JAC & Premium
                </div>

                <h1 className="mt-6 text-balance text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                  Mr. Baleros
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 drop-shadow-[0_0_35px_rgba(255,106,0,0.2)]">venta e instalación</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                  Líderes en Culiacán para baleros espiga, tripoides, barras homocinéticas y botas protectoras. Fabricación y adaptación a la medida para cuatrimotos, 4x4, MG, JAC, europeos y todas las marcas.
                </p>

                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                  <motion.a 
                    className="btn-primary" 
                    href={whatsappHref} 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Cotizar por WhatsApp
                  </motion.a>
                  <motion.a 
                    className="btn-secondary-dark" 
                    href={phoneHref}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Llamar {phoneDisplay}
                  </motion.a>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={stat.label} 
                      className="stat-tile relative overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    >
                      <div className="absolute right-2 top-2 opacity-5 pointer-events-none group-hover:opacity-15 transition-opacity duration-300">
                        <img src="/images/logo-perrito.png" alt="decoración perrito" className="h-6 w-6 rounded-full object-cover" />
                      </div>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* STUNNING 3D CARD SHOWCASE */}
              <div className="relative">
                <motion.div 
                  className="relative mx-auto w-full max-w-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 opacity-20 blur-2xl" />
                  
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative h-[380px] w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                      {/* Grid background behind the dog logo */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                      
                      <img
                        src="/images/logo-perrito.png"
                        alt="Logo de Mr. Baleros"
                        className="h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                      
                      {/* Floating Badges */}
                      <motion.div 
                        className="absolute top-4 left-4 rounded-xl bg-orange-600/90 border border-orange-400/20 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md shadow-lg"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        ¡Logo Oficial! 🐾
                      </motion.div>

                      <motion.div 
                        className="absolute top-4 right-4 rounded-xl bg-zinc-950/80 border border-white/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-orange-400 backdrop-blur-md shadow-lg"
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        MG, JAC & Europeos 🚗
                      </motion.div>

                      {/* Floating ChatGPT Badge */}
                      <motion.div 
                        className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-zinc-950/80 border border-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md shadow-lg"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      >
                        <img src="/images/chatgpt-image.png" alt="ChatGPT mini" className="h-5 w-5 rounded-md object-cover" />
                        <span>Edición 2026</span>
                      </motion.div>
                    </div>

                    <div className="bg-zinc-950/90 p-6 border-t border-white/5 backdrop-blur-md">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="inline-block rounded-md bg-orange-600/25 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-orange-400 border border-orange-500/20 mb-2">Garantizado</span>
                          <p className="text-2xl font-black tracking-tight text-white">Baleros, tripoides y cardán</p>
                          <p className="mt-1 text-sm text-zinc-400">Diagnóstico compatible con autos chinos, europeos y nacionales</p>
                        </div>
                        <motion.div 
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                          <img src="/images/logo-perrito.png" alt="mini logo" className="h-9 w-9 rounded-full object-cover border border-white/10" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="servicios" className="relative bg-zinc-950 py-20 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <p className="section-kicker">Catálogo y taller especializado</p>
                  <h2 className="section-title">Piezas correctas para volver al camino.</h2>
                </div>
                <p className="max-w-3xl text-base leading-8 text-zinc-400">
                  Encuentra componentes para mantenimiento, instalación y adaptaciones de alta complejidad. Somos especialistas en marcas chinas de nueva generación como <strong className="text-orange-400">MG</strong> y <strong className="text-orange-400">JAC</strong>, además de europeos premium (BMW, Audi, Mercedes-Benz) y marcas tradicionales.
                </p>
              </motion.div>

              {/* Brand strip with MG and JAC highlighted */}
              <motion.div 
                className="brand-strip mt-10" 
                aria-label="Marcas que atendemos"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {brandFamilies.map((brand) => (
                  <span 
                    key={brand} 
                    className={brand === 'MG' || brand === 'JAC' ? 'bg-orange-500! text-white! border-orange-400/40!' : ''}
                  >
                    {brand}
                  </span>
                ))}
              </motion.div>

              <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.article 
                      key={service.title} 
                      className="service-card relative overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      {/* Decorative small perrito watermark in card */}
                      <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none group-hover:opacity-15 transition-opacity duration-300">
                        <img src="/images/logo-perrito.png" alt="decoración perrito" className="h-8 w-8 rounded-full object-cover" />
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.accent}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <ChevronRight className="mt-auto h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </motion.article>
                  );
                })}
              </div>

              {/* Trust Badge with the Perrito Logo */}
              <motion.div 
                className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/5 bg-zinc-900/30 p-6 backdrop-blur-md sm:flex-row"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 shadow-lg overflow-hidden">
                    <img src="/images/logo-perrito.png" alt="Garantía de Calidad" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white flex items-center gap-2">
                      Sello de Calidad Mr. Baleros
                      <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">¡Respaldado! 🐾</span>
                    </h4>
                    <p className="text-sm text-zinc-400 mt-1">Garantía completa en mano de obra y refacciones seleccionadas para MG, JAC, europeos y nacionales.</p>
                  </div>
                </div>
                <motion.a 
                  href={whatsappHref} 
                  className="btn-primary py-3 text-xs shrink-0"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Consultar Garantía
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* INTERACTIVE EXPRESS DIAGNOSTIC */}
          <section id="diagnostico" className="relative bg-zinc-900/40 py-20 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="section-kicker">Cotización inteligente</p>
                <h2 className="section-title">Diagnóstico Express y Cotización Directa</h2>
                <p className="mt-3 text-sm text-zinc-400">
                  Selecciona la marca de tu vehículo y el síntoma para armar una cotización personalizada que llegará directo a nuestro taller por WhatsApp.
                </p>
              </div>

              <motion.div 
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Decorative background logo */}
                <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                  <img src="/images/logo-perrito.png" alt="watermark" className="h-64 w-64 rounded-full object-cover" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 relative z-10">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-orange-400 mb-2">1. Marca de tu Vehículo</label>
                    <select 
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-300"
                    >
                      <option value="">-- Seleccionar Marca --</option>
                      {brandFamilies.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                      <option value="Otra Marca">Otra Marca / No listada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-orange-400 mb-2">2. ¿Qué síntoma presenta?</label>
                    <select 
                      value={selectedIssue}
                      onChange={(e) => setSelectedIssue(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-sm text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-300"
                    >
                      <option value="">-- Seleccionar Síntoma --</option>
                      {issuesList.map((issue) => (
                        <option key={issue.id} value={issue.id}>{issue.label}</option>
                      ))}
                      <option value="otro">Otro síntoma / No sé qué tiene</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-6 sm:flex-row relative z-10">
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Detalles de tu consulta:</p>
                    <p className="text-sm font-black text-white mt-1">
                      {selectedBrand || 'Cualquier auto'} ➔ {selectedIssue ? issuesList.find(i => i.id === selectedIssue)?.label || 'Otro problema' : 'Diagnóstico general'}
                    </p>
                  </div>

                  <motion.a
                    href={getCustomWhatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary px-8 py-3.5 w-full sm:w-auto text-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="h-4 w-4 inline mr-1" />
                    Enviar a WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* INTERIM BANNER */}
          <section className="bg-zinc-950 py-16 text-white border-t border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <p className="section-kicker">Atención directa</p>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">¿Traes muestra o foto de tu pieza?</h2>
                <p className="text-sm text-zinc-400 mt-2">Mándanos un mensaje con la foto o el modelo exacto de tu carro y te cotizamos al momento.</p>
              </div>
              <motion.a 
                className="btn-primary shrink-0" 
                href={whatsappHref} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Enviar Mensaje Directo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>
          </section>

          {/* INVENTORY SECTION */}
          <section id="inventario" className="bg-zinc-950 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <p className="section-kicker">Inventario real garantizado</p>
                  <h2 className="section-title">Fotos de nuestro taller y refacciones.</h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" aria-hidden="true" />
                  Especialistas en junta homocinética
                </div>
              </motion.div>

              <div className="mt-12 grid auto-rows-[300px] gap-5 md:grid-cols-3">
                {gallery.map((item, index) => (
                  <motion.article 
                    key={item.src} 
                    className={`gallery-card group ${item.className}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <img src={item.src} alt={`${item.title} en Mr. Baleros`} loading="lazy" />
                    <div className="gallery-caption">
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS ROW */}
          <section className="bg-zinc-900/30 py-20 sm:py-28 border-t border-white/5">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="section-kicker">Facilidad para ti</p>
                <h2 className="section-title">De la falla a tu coche listo en 4 pasos.</h2>
                <p className="mt-5 text-base leading-8 text-zinc-400">
                  Nos enfocamos en un servicio directo y sin demoras. Identificamos tu pieza exacta mediante fotos o muestras físicas, cotizamos transparente y reparamos con estándares industriales.
                </p>
                
                <div className="mt-8 p-6 rounded-2xl bg-zinc-950 border border-white/5 flex items-center gap-4">
                  <img src="/images/logo-perrito.png" alt="Mr Baleros Dog Mascot" className="h-14 w-14 rounded-full border border-orange-500/25 object-cover" />
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-orange-400">Atención Personalizada</span>
                    <p className="text-sm font-bold text-zinc-300 mt-0.5">"Garantizamos que tu pieza encaje de forma exacta antes de instalarla".</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4">
                {[
                  'Nos mandas foto o traes tu muestra física.',
                  'Validamos medidas exactas y compatibilidad (MG, JAC, Premium).',
                  'Cotizamos la pieza o el servicio de instalación al mejor precio.',
                  'Sales rodando con refacciones de máxima durabilidad y garantía.'
                ].map((step, index) => (
                  <motion.div 
                    key={step} 
                    className="process-row relative overflow-hidden group"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p className="flex-1">{step}</p>
                    <div className="opacity-5 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none">
                      <img src="/images/logo-perrito.png" alt="decoración perrito" className="h-6 w-6 rounded-full object-cover" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* LOCATION SECTION */}
          <section id="ubicacion" className="bg-zinc-950 py-20 sm:py-28 border-t border-white/5">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="section-kicker">¿Dónde encontrarnos?</p>
                <h2 className="section-title">Visítanos en Culiacán Rosales.</h2>
                <div className="mt-8 space-y-4">
                  <div className="contact-line">
                    <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <strong>Avenida Revolución & Plan de Tuxtepec</strong>
                      <span>Col. Emiliano Zapata, 80260 Culiacán Rosales, Sin.</span>
                      <span className="block text-xs font-bold text-orange-400 mt-1 uppercase tracking-wider">¡Fácil acceso y estacionamiento!</span>
                    </div>
                  </div>
                  <div className="contact-line">
                    <Phone className="h-5 w-5 text-orange-500 shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <strong>{phoneDisplay}</strong>
                      <span>Llámanos o envíanos WhatsApp las 24 horas.</span>
                    </div>
                  </div>
                </div>
                <motion.a 
                  className="btn-outline mt-8 w-full sm:w-auto text-center" 
                  href={mapHref} 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Abrir Ruta en Google Maps
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.a>
              </motion.div>

              {/* STYLISH INTERACTIVE MAP ILLUSTRATION */}
              <motion.div 
                className="map-shell" 
                aria-label="Mapa de Mr. Baleros en Culiacán"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="map-road map-road-main">
                  <span>Avenida Revolución</span>
                </div>
                <div className="map-road map-road-cross">
                  <span>Plan de Tuxtepec</span>
                </div>
                <div className="map-road map-road-side" aria-hidden="true" />
                
                {/* Dog Logo Map Marker Pin */}
                <motion.div 
                  className="map-pin-card"
                  initial={{ y: 15, x: "-50%" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="map-pin-icon relative overflow-hidden">
                    <img src="/images/logo-perrito.png" alt="Mr. Baleros" className="h-full w-full object-cover rounded-xl" />
                  </span>
                  <p>Taller Oficial Mr. Baleros</p>
                  <strong>Avenida Revolución & Plan de Tuxtepec</strong>
                  <small>Emiliano Zapata, Culiacán Rosales, Sin.</small>
                </motion.div>
                
                <a className="map-open" href={mapHref} target="_blank" rel="noreferrer">
                  Abrir en Google Maps
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer id="contacto" className="bg-zinc-950 text-white border-t border-white/5">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <BrandMark />
              <p className="mt-3 max-w-xl text-zinc-400 text-sm text-center md:text-left leading-6">
                Especialistas en juntas homocinéticas, flechas, tripoides y cardán a la medida. 
                Atendemos autos de nueva generación (<strong className="text-orange-400">MG</strong>, <strong className="text-orange-400">JAC</strong>) y marcas de alto desempeño con el mejor servicio de Culiacán.
              </p>
              
              {/* Seal Mascot display inside footer */}
              <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/2 p-3.5 shadow-lg">
                <img src="/images/logo-perrito.png" alt="Sello perrito" className="h-10 w-10 rounded-full border border-orange-500/25 object-cover" />
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-wider text-orange-400">Garantía de Satisfacción</span>
                  <span className="block text-xs font-bold text-zinc-300">¡Calidad de confianza en cada pieza! 🐾</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 md:items-end justify-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a 
                      key={social.label} 
                      className="social-button" 
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label={social.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
              
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                &copy; {new Date().getFullYear()} Mr. Baleros. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
