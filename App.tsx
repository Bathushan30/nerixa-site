import { useEffect, useRef, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Road & Traffic imagery ───────────────── */
const heroFloaters = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', w: 200, h: 140, top: '52%', left: '1%',  speed: 0.30 },
  { src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80', w: 130, h: 100, top: '38%', left: '20%', speed: -0.20 },
  { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80', w: 250, h: 165, top: '46%', left: '40%', speed: 0.25 },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80', w: 150, h: 110, top: '15%', left: '45%', speed: -0.18 },
  { src: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&q=80', w: 175, h: 135, top: '10%', left: '80%', speed: 0.22 },
  { src: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=280&q=80', w: 190, h: 120, top: '72%', left: '15%', speed: -0.28 },
];

const mockupImgs = [
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80',
  'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=400&q=80',
  'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&q=80',
  'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400&q=80',
  'https://images.unsplash.com/photo-1574116405797-c4a89e62c8aa?w=400&q=80',
];

const whatImgs = [
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&q=80',
];

const brands = ['Bosch', 'NVIDIA', 'HERE Maps', 'TomTom', 'Qualcomm', 'MapBox', 'AWS', 'Continental', 'Mobileye'];

export default function App() {
  const heroRef      = useRef<HTMLElement>(null);
  const floatersRef  = useRef<HTMLDivElement>(null);
  const brandsRef    = useRef<HTMLDivElement>(null);
  const whatRef      = useRef<HTMLElement>(null);
  const dbRef        = useRef<HTMLElement>(null);
  const sbRef        = useRef<HTMLElement>(null);
  const aiRef        = useRef<HTMLElement>(null);
  const geRef        = useRef<HTMLElement>(null);
  const moodRef      = useRef<HTMLElement>(null);
  const wfRef        = useRef<HTMLElement>(null);
  const scRef        = useRef<HTMLElement>(null);
  const footerRef    = useRef<HTMLElement>(null);
  const liveMapRef   = useRef<HTMLElement>(null);
  const pricingRef   = useRef<HTMLElement>(null);
  const contactRef   = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Hero floater parallax ── */
      if (floatersRef.current) {
        gsap.utils.toArray<HTMLElement>('.floater').forEach((el, i) => {
          const spd = heroFloaters[i]?.speed ?? 0.2;
          gsap.to(el, {
            y: () => window.innerHeight * spd * 3,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        });
      }

      gsap.from('.hero-logo-big', { scale: 0.85, opacity: 0, duration: 1.2, ease: 'expo.out' });
      gsap.from('.hero-right', { x: 60, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.2 });

      gsap.from(brandsRef.current, {
        opacity: 0, y: 40,
        scrollTrigger: { trigger: brandsRef.current, start: 'top 85%' },
        duration: 0.8,
      });

      gsap.from('.what-phrase', {
        opacity: 0, y: 60,
        scrollTrigger: { trigger: whatRef.current, start: 'top 70%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.utils.toArray<HTMLElement>('.wi').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 50, scale: 0.95,
          scrollTrigger: { trigger: el, start: 'top 85%' },
          duration: 0.7, delay: i * 0.12, ease: 'expo.out',
        });
      });

      gsap.from('.database-title', {
        x: -100, opacity: 0,
        scrollTrigger: { trigger: dbRef.current, start: 'top 80%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.utils.toArray<HTMLElement>('.bubble').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, scale: 0.7,
          rotation: gsap.utils.random(-20, 20),
          scrollTrigger: { trigger: dbRef.current, start: 'top 60%' },
          duration: 0.6, delay: i * 0.1, ease: 'back.out(1.5)',
        });
        gsap.to(el, {
          y: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(2, 4),
          yoyo: true, repeat: -1, ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      gsap.from('.sb-title', {
        scale: 1.05, opacity: 0,
        scrollTrigger: { trigger: sbRef.current, start: 'top 75%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.from('.app-mockup', {
        x: 80, opacity: 0,
        scrollTrigger: { trigger: sbRef.current, start: 'top 65%' },
        duration: 1, ease: 'expo.out',
      });

      gsap.from('.big-circle', {
        scale: 0.7, opacity: 0,
        scrollTrigger: { trigger: aiRef.current, start: 'top 70%' },
        duration: 1.2, ease: 'expo.out',
      });
      gsap.from('.ai-title', {
        y: 60, opacity: 0,
        scrollTrigger: { trigger: aiRef.current, start: 'top 70%' },
        duration: 1, ease: 'expo.out',
      });

      gsap.from('.ge-title', {
        y: 50, opacity: 0,
        scrollTrigger: { trigger: geRef.current, start: 'top 75%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.utils.toArray<HTMLElement>('.ui-window').forEach((el, i) => {
        gsap.from(el, {
          y: 80, opacity: 0,
          scrollTrigger: { trigger: geRef.current, start: 'top 65%' },
          duration: 0.8, delay: i * 0.2, ease: 'expo.out',
        });
      });

      /* ── Persistent search hide trigger ── */
      gsap.to('.persistent-search', {
        opacity: 0,
        y: 20,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: liveMapRef.current,
          start: 'bottom 20%', // Hide when the bottom of the map section reaches 20% from top
          toggleActions: 'play none none reverse', // Fade back in if scrolling up
        },
      });

      gsap.utils.toArray<HTMLElement>('.mood-shape').forEach((el) => {
        gsap.to(el, {
          y: gsap.utils.random(-60, 60),
          x: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(-15, 15),
          ease: 'none',
          scrollTrigger: {
            trigger: moodRef.current,
            start: 'top bottom', end: 'bottom top', scrub: true,
          },
        });
      });

      gsap.from('.wf-title', {
        x: -80, opacity: 0,
        scrollTrigger: { trigger: wfRef.current, start: 'top 70%' },
        duration: 1, ease: 'expo.out',
      });

      gsap.from('.sc-title', {
        y: 50, opacity: 0,
        scrollTrigger: { trigger: scRef.current, start: 'top 75%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.utils.toArray<HTMLElement>('.collab-img').forEach((el, i) => {
        gsap.from(el, {
          scale: 0.8, opacity: 0,
          scrollTrigger: { trigger: scRef.current, start: 'top 65%' },
          duration: 0.7, delay: i * 0.15, ease: 'back.out(1.4)',
        });
      });

      gsap.from('.footer-giant-logo', {
        y: 120, opacity: 0,
        scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
        duration: 1.2, ease: 'expo.out',
      });

      /* ── Live Map section reveal ── */
      gsap.from('.lm-header-left', {
        x: -60, opacity: 0,
        scrollTrigger: { trigger: liveMapRef.current, start: 'top 75%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.utils.toArray<HTMLElement>('.lm-counter').forEach((el, i) => {
        gsap.from(el, {
          y: 30, opacity: 0,
          scrollTrigger: { trigger: liveMapRef.current, start: 'top 65%' },
          duration: 0.6, delay: i * 0.1, ease: 'back.out(1.4)',
        });
      });
      gsap.utils.toArray<HTMLElement>('.lm-feed-item').forEach((el, i) => {
        gsap.from(el, {
          x: -20, opacity: 0,
          scrollTrigger: { trigger: liveMapRef.current, start: 'top 55%' },
          duration: 0.5, delay: i * 0.12, ease: 'expo.out',
        });
      });
      gsap.from('.map-card', {
        scale: 0.8, opacity: 0, stagger: 0.15,
        scrollTrigger: { trigger: liveMapRef.current, start: 'top 60%' },
        duration: 0.7, ease: 'back.out(1.4)',
      });
      gsap.utils.toArray<HTMLElement>('.map-pin').forEach((el, i) => {
        gsap.from(el, {
          scale: 0, opacity: 0,
          scrollTrigger: { trigger: liveMapRef.current, start: 'top 65%' },
          duration: 0.5, delay: i * 0.08, ease: 'back.out(2)',
        });
      });

      /* ── Contact Section Reveal ── */
      gsap.from('.contact-left', {
        x: -50, opacity: 0,
        scrollTrigger: { trigger: contactRef.current, start: 'top 75%' },
        duration: 1, ease: 'expo.out',
      });
      gsap.from('.contact-right', {
        x: 50, opacity: 0,
        scrollTrigger: { trigger: contactRef.current, start: 'top 75%' },
        duration: 1, ease: 'expo.out',
      });


    });

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4 }}>
      <div className="grid-bg" />

      {/* ─── NAV ───────────────────────────────── */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/Logo.png" alt="Nerixa AI" className="logo-img" />
          </div>
          
          <div className="nav-center">
            <a href="#features">INTELLIGENCE</a>
            <a href="#fleet">FLEET OPS</a>
            <a href="#pricing">PRICING</a>
            <a href="#contact">PROTOCOL</a>
          </div>
          
          <div className="nav-right">
            <div className="nav-status">
              <span className="status-dot" />
              <span className="status-text">SECURE NODE :: ONLINE</span>
            </div>
            <a href="#" className="btn-terminal">
              <span>ACCESS COMMAND</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── PERSISTENT SEARCH BAR ─────────────── */}
      <div className="persistent-search">
        <input type="text" placeholder="SEARCH A ROAD, ZONE OR ROUTE…" defaultValue="" />
        <button className="search-btn">SEARCH ⌘/</button>
      </div>

      {/* ─── 1. HERO ───────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-left">
          <div className="hero-logo-big">Nerixa</div>
          <div className="hero-floaters" ref={floatersRef} style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
            {heroFloaters.map((f, i) => (
              <div key={i} className="floater"
                style={{ width: f.w, height: f.h, top: f.top, left: f.left }}>
                <img src={f.src} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right" style={{ zIndex: 10, position: 'relative' }}>
          <h1 className="hero-tagline">
            Smarter Roads.<br />Safer Journeys.<br />Zero Surprises.
          </h1>
          <a href="#" className="hero-cta">
            <div className="hero-cta-thumb">
              <img src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=100&q=80" alt="" />
            </div>
            JOIN THE WAITLIST
          </a>
        </div>
      </section>

      {/* ─── 2. BRANDS ─────────────────────────── */}
      <section className="brands" ref={brandsRef}>
        <p className="brands-label">Powering road intelligence with world-class technology</p>
        <div className="brands-track">
          <div className="brands-inner">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="brand-item">{b}</span>
            ))}
          </div>
          <div className="brands-inner" aria-hidden>
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="brand-item">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE MAP PREVIEW ──────────────────────── */}
      <section className="live-map-section" ref={liveMapRef}>

        {/* BAND 1 — Header */}
        <div className="lm-header">
          <div className="lm-header-left">
            <div className="lm-badge"><span className="lm-badge-dot" />Live Intelligence Feed</div>
            <h2 className="lm-title">Every incident.<br />Every road.<br /><em>Right now.</em></h2>
          </div>
          <div className="lm-header-right">
            <div className="lm-bigstat">
              <span className="lm-bigstat-num blue">1,547</span>
              <span className="lm-bigstat-label">Active Alerts</span>
            </div>
            <div className="lm-divider" />
            <div className="lm-bigstat">
              <span className="lm-bigstat-num orange">342</span>
              <span className="lm-bigstat-label">Police Zones</span>
            </div>
            <div className="lm-divider" />
            <div className="lm-bigstat">
              <span className="lm-bigstat-num red">89</span>
              <span className="lm-bigstat-label">Accidents</span>
            </div>
            <div className="lm-divider" />
            <div className="lm-bigstat">
              <span className="lm-bigstat-num green">4,201</span>
              <span className="lm-bigstat-label">Clear Routes</span>
            </div>
          </div>
        </div>

        {/* BAND 2 — Animated City Map */}
        <div className="lm-canvas-wrap">

          {/* City block SVG — watercolor light map style */}
          <svg className="lm-city-svg" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            {/* Water body */}
            <polygon points="0,380 180,340 260,390 320,360 380,420 280,480 0,480" fill="#daf0fa" opacity="0.7"/>
            {/* Parks */}
            <rect x="560" y="60" width="120" height="90" rx="6" fill="#d4edda" opacity="0.8"/>
            <rect x="1100" y="300" width="100" height="80" rx="6" fill="#d4edda" opacity="0.8"/>
            <rect x="800" y="420" width="80" height="60" rx="4" fill="#d4edda" opacity="0.8"/>
            {/* City blocks — varying sizes & gray shades */}
            <rect x="40"  y="60"  width="140" height="80"  rx="5" fill="#ececec"/>
            <rect x="200" y="60"  width="90"  height="80"  rx="5" fill="#e8e8e8"/>
            <rect x="310" y="60"  width="220" height="80"  rx="5" fill="#efefef"/>
            <rect x="700" y="60"  width="100" height="90"  rx="5" fill="#e6e6e6"/>
            <rect x="820" y="60"  width="240" height="90"  rx="5" fill="#ebebeb"/>
            <rect x="1080" y="60" width="140" height="90"  rx="5" fill="#e4e4e4"/>
            <rect x="1240" y="60" width="120" height="90"  rx="5" fill="#eeeeee"/>
            <rect x="40"  y="180" width="200" height="100" rx="5" fill="#e5e5e5"/>
            <rect x="260" y="180" width="80"  height="100" rx="5" fill="#eeeeee"/>
            <rect x="360" y="180" width="170" height="100" rx="5" fill="#e9e9e9"/>
            <rect x="550" y="180" width="100" height="100" rx="5" fill="#e7e7e7"/>
            <rect x="680" y="180" width="200" height="100" rx="5" fill="#ececec"/>
            <rect x="900" y="180" width="160" height="100" rx="5" fill="#e5e5e5"/>
            <rect x="1080" y="180" width="110" height="100" rx="5" fill="#eeeeee"/>
            <rect x="1210" y="180" width="150" height="100" rx="5" fill="#e8e8e8"/>
            <rect x="400"  y="310" width="130" height="90"  rx="5" fill="#e9e9e9"/>
            <rect x="550"  y="310" width="230" height="90"  rx="5" fill="#ebebeb"/>
            <rect x="800"  y="310" width="120" height="90"  rx="5" fill="#e6e6e6"/>
            <rect x="940"  y="310" width="140" height="90"  rx="5" fill="#eeeeee"/>
            <rect x="1100" y="310" width="90"  height="90"  rx="5" fill="#e5e5e5"/>
            <rect x="1210" y="310" width="150" height="90"  rx="5" fill="#ebebeb"/>
            <rect x="400"  y="430" width="370" height="80"  rx="5" fill="#e8e8e8"/>
            <rect x="900"  y="430" width="220" height="80"  rx="5" fill="#eeeeee"/>
            <rect x="1140" y="430" width="220" height="80"  rx="5" fill="#e5e5e5"/>
            {/* Major roads — white on light bg */}
            <line x1="0"    y1="160" x2="1400" y2="160" stroke="#fff" strokeWidth="10"/>
            <line x1="0"    y1="300" x2="1400" y2="300" stroke="#fff" strokeWidth="10"/>
            <line x1="0"    y1="420" x2="1400" y2="420" stroke="#fff" strokeWidth="8"/>
            <line x1="340"  y1="0"   x2="340"  y2="600" stroke="#fff" strokeWidth="10"/>
            <line x1="660"  y1="0"   x2="660"  y2="600" stroke="#fff" strokeWidth="10"/>
            <line x1="900"  y1="0"   x2="900"  y2="600" stroke="#fff" strokeWidth="10"/>
            <line x1="1200" y1="0"   x2="1200" y2="600" stroke="#fff" strokeWidth="8"/>
            {/* Minor roads */}
            <line x1="0"    y1="520" x2="1400" y2="520"  stroke="#fff" strokeWidth="5"/>
            <line x1="150"  y1="0"   x2="150"  y2="600"  stroke="#fff" strokeWidth="5"/>
            <line x1="500"  y1="0"   x2="500"  y2="600"  stroke="#fff" strokeWidth="5"/>
            <line x1="790"  y1="0"   x2="790"  y2="600"  stroke="#fff" strokeWidth="5"/>
            <line x1="1070" y1="0"   x2="1070" y2="600"  stroke="#fff" strokeWidth="5"/>
            {/* Road center lines */}
            <line x1="0"    y1="160" x2="1400" y2="160" stroke="rgba(200,200,200,0.4)" strokeWidth="1" strokeDasharray="18 18"/>
            <line x1="0"    y1="300" x2="1400" y2="300" stroke="rgba(200,200,200,0.4)" strokeWidth="1" strokeDasharray="18 18"/>
            <line x1="660"  y1="0"   x2="660"  y2="600" stroke="rgba(200,200,200,0.4)" strokeWidth="1" strokeDasharray="18 18"/>
            <line x1="900"  y1="0"   x2="900"  y2="600" stroke="rgba(200,200,200,0.4)" strokeWidth="1" strokeDasharray="18 18"/>
            {/* Animated traffic flow */}
            <line x1="0" y1="160" x2="1400" y2="160" stroke="rgba(232,127,44,0.25)" strokeWidth="3" strokeDasharray="24 36" style={{animation:'trafficFlow 3s linear infinite'}}/>
            <line x1="660" y1="0" x2="660" y2="600" stroke="rgba(0,194,255,0.2)" strokeWidth="3" strokeDasharray="24 36" style={{animation:'trafficFlow 4s linear infinite reverse'}}/>
          </svg>

          {/* Radar / sonar sweep overlay */}
          <div className="lm-radar">
            <div className="lm-radar-circle" />
            <div className="lm-radar-circle c2" />
            <div className="lm-radar-circle c3" />
            <div className="lm-radar-sweep" />
            <div className="lm-radar-cross-h" />
            <div className="lm-radar-cross-v" />
          </div>

          {/* Incident pins */}
          <div className="map-pin police"  style={{top:'26%', left:'24%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/><div className="map-pin-ring r3"/></div>
          <div className="map-pin police"  style={{top:'60%', left:'68%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/></div>
          <div className="map-pin traffic" style={{top:'50%', left:'40%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/><div className="map-pin-ring r3"/></div>
          <div className="map-pin traffic" style={{top:'22%', left:'58%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/></div>
          <div className="map-pin hazard"  style={{top:'70%', left:'30%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/><div className="map-pin-ring r3"/></div>
          <div className="map-pin hazard"  style={{top:'35%', left:'80%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/></div>
          <div className="map-pin clear"   style={{top:'55%', left:'52%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/></div>
          <div className="map-pin clear"   style={{top:'18%', left:'44%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/></div>
          <div className="map-pin traffic" style={{top:'42%', left:'88%'}}><div className="map-pin-core"/><div className="map-pin-ring r1"/><div className="map-pin-ring r2"/></div>

          {/* Floating glassmorphism alert cards */}
          <div className="map-card pop-1" style={{top:'14%', left:'18%'}}>
            <div className="map-card-label blue"><div className="map-card-dot"/>Police</div>
            <div className="map-card-title">NH-48 Checkpoint</div>
            <div className="map-card-sub">1 min ago · 94 verifications</div>
            <div className="map-card-arrow"/>
          </div>
          <div className="map-card pop-2" style={{top:'38%', left:'42%'}}>
            <div className="map-card-label orange"><div className="map-card-dot"/>Traffic</div>
            <div className="map-card-title">Ring Road — 4.1km Slow</div>
            <div className="map-card-sub">AI predicted · Est. delay 18 min</div>
            <div className="map-card-arrow"/>
          </div>
          <div className="map-card pop-3" style={{top:'60%', left:'16%'}}>
            <div className="map-card-label red"><div className="map-card-dot"/>Hazard</div>
            <div className="map-card-title">Pothole · Lane 3</div>
            <div className="map-card-sub">Airport Expressway · 7 reports</div>
            <div className="map-card-arrow"/>
          </div>
          <div className="map-card pop-4" style={{top:'10%', left:'62%'}}>
            <div className="map-card-label green"><div className="map-card-dot"/>Clear</div>
            <div className="map-card-title">Alternate via MG Road</div>
            <div className="map-card-sub">AI recommended · Save 14 min</div>
            <div className="map-card-arrow"/>
          </div>

          {/* Top-left live pill */}
          <div className="map-live-bar">
            <div className="map-live-indicator"><span className="map-live-dot"/>Live</div>
            <div className="map-live-sep"/>
            <div className="map-live-stat"><b>1,547</b> alerts</div>
            <div className="map-live-sep"/>
            <div className="map-live-stat">Updated <b>2s</b> ago</div>
          </div>

          {/* Zoom controls */}
          <div className="map-controls">
            <button className="map-ctrl-btn">+</button>
            <button className="map-ctrl-btn">−</button>
            <button className="map-ctrl-btn" style={{fontSize:'0.75rem'}}>⟳</button>
          </div>
        </div>

        {/* BAND 3 — Scrolling incident ticker */}
        <div className="lm-ticker">
          <div className="lm-ticker-label">
            <span className="lm-badge-dot" style={{background:'#00c2ff'}}/>
            Live Feed
          </div>
          <div className="lm-ticker-track">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="lm-ticker-inner">
                <div className="lm-ticker-item"><span className="lm-ticker-chip police">🚔 Police</span><span className="lm-ticker-text">NH-48, Gurugram</span><span className="lm-ticker-meta">1m ago · 94 verified</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip traffic">🚗 Traffic</span><span className="lm-ticker-text">Ring Road · 4.1km slow</span><span className="lm-ticker-meta">2m ago · AI alert</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip hazard">⚠️ Hazard</span><span className="lm-ticker-text">Airport Expressway · Lane 3</span><span className="lm-ticker-meta">4m ago · 7 reports</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip clear">✅ Clear</span><span className="lm-ticker-text">MG Road · All lanes open</span><span className="lm-ticker-meta">5m ago · verified</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip police">🚔 Police</span><span className="lm-ticker-text">Outer Ring Rd, Marathahalli</span><span className="lm-ticker-meta">7m ago · 61 verified</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip traffic">🚗 Traffic</span><span className="lm-ticker-text">Silk Board Junction · heavy</span><span className="lm-ticker-meta">9m ago · AI predicted</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip hazard">⚠️ Hazard</span><span className="lm-ticker-text">Bannerghatta Rd · Waterlogging</span><span className="lm-ticker-meta">11m ago · 12 reports</span></div>
                <div className="lm-ticker-item"><span className="lm-ticker-chip clear">✅ Clear</span><span className="lm-ticker-text">Hosur Rd · Incident resolved</span><span className="lm-ticker-meta">13m ago · verified</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHAT IS NERIXA ─────────────────── */}
      <section className="what-is-nerixa" ref={whatRef}>
        <p className="what-label">What is Nerixa</p>
        <p className="what-phrase">
          A new <span className="dot-icon" /> layer of intelligence on every road.<br />
          Built{' '}
          <span className="arrow-icon">
            <span /><span />
          </span>{' '}
          on live data, community reports, and AI predictions.
        </p>
        <div className="what-image-grid">
          {whatImgs.map((src, i) => (
            <div key={i} className="wi">
              <img src={src} alt="" />
            </div>
          ))}
        </div>
        <p className="showing-tag">Monitoring 11,286+ active road zones globally</p>
      </section>

      {/* ─── 4. DATABASE / LIVE COVERAGE ────────── */}
      <section className="database" ref={dbRef}>
        <p className="database-label">Live Coverage</p>
        <h2 className="database-title">Know every<br />road ahead</h2>
        <p className="database-sub">
          Nerixa taps into a live, ever-growing network of road events,<br />
          verified by drivers and enhanced by AI — so you always<br />
          know what's coming before you get there.
        </p>
        <div className="stat-bubbles">
          <div className="bubble orange" style={{ top: '8%', left: '42%' }}>1.5M+ alerts</div>
          <div className="bubble black" style={{ top: '55%', right: '10%' }}>98K checkpoints</div>
          <div className="bubble black rotated" style={{ top: '25%', left: '12%' }}>5.8K road zones</div>
          <div className="bubble black rotated2" style={{ top: '75%', left: '18%' }}>400K+ reports</div>
          <div className="bubble black" style={{ top: '42%', left: '38%' }}>150K hazard flags</div>
          <div className="bubble black" style={{ top: '65%', left: '55%' }}>5.5K live incidents</div>
        </div>
      </section>

      {/* ─── 5. DETECT INSTANTLY ────────────────── */}
      <section className="search-beautifully" ref={sbRef}>
        <div className="sb-left" style={{ position: 'relative' }}>
          <span className="platform-label">The Platform</span>
          <h2 className="sb-title">Detect<br />Instantly.<br />Navigate<br />Smartly.</h2>
          <p className="sb-sub">For drivers who refuse to be caught off guard by traffic, checkpoints, or unexpected road hazards.</p>
          <a href="#" className="learn-pricing">Explore the Platform</a>
        </div>
        <div className="sb-right">
          <div className="app-mockup">
            <div className="mockup-bar">
              <span className="mockup-logo">Nerixa</span>
              <span className="mockup-search">Route: Airport → Downtown</span>
              <div className="mockup-tags">
                {['Traffic','Alerts','Hazards','Police'].map(t => (
                  <span key={t} className="mockup-tag">{t}</span>
                ))}
              </div>
            </div>
            <p className="mockup-results-count">SHOWING 20 ▾ ACTIVE INCIDENTS IN ZONE</p>
            <div className="mockup-grid">
              {mockupImgs.map((src, i) => (
                <div key={i} className="mockup-img">
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. AI INTELLIGENCE (Green) ─────────── */}
      <section className="ai-tools" ref={aiRef}>
        <div className="ai-left">
          <div className="big-circle">
            <div className="circle-img">
              <img src="https://images.unsplash.com/photo-1574116405797-c4a89e62c8aa?w=600&q=80" alt="" />
            </div>
          </div>
        </div>
        <div className="ai-right">
          <p className="ai-label">AI Intelligence</p>
          <h2 className="ai-title">Predict.<br />Protect.<br />Proceed.</h2>
          <p className="ai-sub">AI that reads the road before you do.</p>
        </div>
      </section>

      {/* ─── 7. REAL-TIME ALERTS ────────────────── */}
      <section className="gen-edit" ref={geRef}>
        <div className="ge-left">
          <div className="ge-icon">
            <div className="ge-diamond" />
          </div>
          <h2 className="ge-title">Real-Time<br />Alerts</h2>
          <p className="ge-sub">Instant notifications for every road event — before you reach it, not after.</p>
        </div>
        <div className="ge-right">
          <div className="ui-window">
            <div className="ui-window-bar">
              <div className="ui-dots">
                <div className="ui-dot" /><div className="ui-dot" /><div className="ui-dot" />
              </div>
              <span className="ui-title-label">Active Incidents</span>
              <div className="ui-dot" />
            </div>
            <div className="ui-window-imgs">
              <div className="ui-window-img">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80" alt="" />
              </div>
              <div className="ui-window-img">
                <img src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=300&q=80" alt="" />
              </div>
            </div>
            <button className="generate-btn" style={{ marginTop: '0.75rem' }}>Report Incident ✦</button>
          </div>
          <div className="ui-window">
            <div className="ui-window-bar">
              <div className="ui-dots">
                <div className="ui-dot" /><div className="ui-dot" /><div className="ui-dot" />
              </div>
              <span className="ui-title-label">Alert Type</span>
              <div className="ui-dot" />
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              {['🚔 POLICE', '🚧 ROADBLOCK', '⚠️ HAZARD', '🚗 TRAFFIC', '🌧️ CONDITIONS'].map(p => (
                <span key={p} className="mood-chip">{p}</span>
              ))}
            </div>
            <div className="ui-window-img" style={{ marginTop: '0.75rem', height: '100px', borderRadius: '8px' }}>
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. HAZARD ZONES ────────────────────── */}
      <section className="moodboards" ref={moodRef} style={{ minHeight: '60vh' }}>
        <div className="mood-shapes">
          <div className="mood-shape" style={{ bottom: 0, left: '-2%', width: 180, height: 200, background: '#3ecc5f', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <div className="mood-shape" style={{ bottom: '10%', left: '8%', width: 130, height: 130, borderRadius: '50%', background: '#ccc' }} />
          <div className="mood-shape" style={{ bottom: '35%', left: '6%', width: 36, height: 36, borderRadius: '50%', background: '#111', border: '8px solid #ccc' }} />
          <div className="mood-shape" style={{ top: '8%', right: '5%', width: 90, height: 90, background: '#e87f2c', transform: 'rotate(45deg)' }} />
          <div className="mood-shape" style={{ top: '2%', right: '12%', width: 160, height: 90, background: '#ddd', borderRadius: '8px', transform: 'rotate(-8deg)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 500 }}>
          <p className="mood-label">Safety Intelligence</p>
          <div className="mood-tag">RISK ZONES</div>
          <h2 className="mood-title">Map every<br />danger zone</h2>

          <div className="ui-window" style={{ width: 260, position: 'relative' }}>
            <p className="ui-title-label" style={{ marginBottom: '0.5rem' }}>Drop a pin or select zone</p>
            <div style={{ height: 80, border: '1px dashed #ccc', borderRadius: 8 }} />
          </div>
        </div>
        <a href="#" className="learn-pricing" style={{ position: 'absolute', bottom: '7%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'inline-block' }}>
          View live hazard map
        </a>
      </section>

      {/* ─── 9. SMART ROUTING (Orange) ───────────── */}
      <section className="workflow" ref={wfRef}>
        <div className="wf-left">
          <p className="wf-label">Navigation</p>
          <h2 className="wf-title">Route<br />Smarter.<br />Arrive Safe.</h2>
          <p className="wf-sub">AI-optimized routes that adapt in real time to traffic, incidents, and hazards on your path.</p>
        </div>
        <div className="wf-right">
          <div className="big-circle" style={{ width: 'min(80%,460px)' }}>
            <div className="circle-img">
              <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. COMMUNITY REPORTING ─────────────── */}
      <section className="save-collaborate" ref={scRef}>
        <div className="sc-left">
          <p className="sc-label">Community</p>
          <h2 className="sc-title">Report.<br />Verify.<br />&amp; Protect.</h2>
          <p className="sc-sub">Every driver becomes a sensor. Community-verified reports keep the entire network one step ahead of every road event.</p>
        </div>
        <div className="sc-right">
          <div className="collab-board" style={{ height: 360 }}>
            <div className="collab-img" style={{ width: 170, height: 130, top: 30, left: 20 }}>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80" alt="" />
            </div>
            <div className="collab-img" style={{ width: 130, height: 90, top: 20, left: 200 }}>
              <img src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=300&q=80" alt="" />
            </div>
            <div className="collab-img" style={{ width: 175, height: 210, top: 100, left: 100 }}>
              <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80" alt="" />
            </div>
            <div className="cursor-tag" style={{ top: 145, left: 25 }}>Rahul — 2 min ago</div>
            <div className="save-badge" style={{ bottom: 20, left: 180 }}>
              VERIFIED ✓
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11. PRICING ────────────────────────── */}
      <section className="pricing-section" ref={pricingRef}>
        <div className="pricing-header">
          <p className="pricing-label">Strategic Advantage</p>
          <h2 className="pricing-title">Ready for every road.</h2>
          <p className="pricing-sub">Choose the level of intelligence that fits your mission.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="p-badge">INDIVIDUAL</div>
            <h3 className="p-name">Scout</h3>
            <div className="p-price">$0<span>/mo</span></div>
            <ul className="p-features">
              <li>Live community reports</li>
              <li>Standard traffic topography</li>
              <li>Basic hazard detection</li>
              <li>Public zone mapping</li>
            </ul>
            <a href="#" className="p-btn">Deploy Base Unit</a>
          </div>
          <div className="pricing-card featured">
            <div className="p-badge">ADVANCED COMMAND</div>
            <h3 className="p-name">Sentinel</h3>
            <div className="p-price">$12<span>/mo</span></div>
            <ul className="p-features">
              <li>Priority AI Neural Data</li>
              <li>Predictive Hazard Detection</li>
              <li>Stealth Checkpoint Alerts</li>
              <li>Offline Military-Grade Maps</li>
              <li>Dual-Core Routing Engine</li>
            </ul>
            <a href="#" className="p-btn">Initialize Protocol</a>
          </div>
          <div className="pricing-card">
            <div className="p-badge">ENTERPRISE FLEET</div>
            <h3 className="p-name">Vanguard</h3>
            <div className="p-price">Custom</div>
            <ul className="p-features">
              <li>Multi-Unit Fleet Control</li>
              <li>Encrypted Custom API</li>
              <li>High-Res Satellite Mesh</li>
              <li>24/7 Tactical Support</li>
              <li>Mass-Deploy Licenses</li>
            </ul>
            <a href="#" className="p-btn">Request Access</a>
          </div>
        </div>
      </section>



      {/* ─── 12. TESTIMONIALS (Marquee) ─────────── */}
      <section className="marquee-section">
        <div className="marquee-header">
          <p className="marquee-eyebrow">Social Proof</p>
          <h2 className="marquee-title">Trusted by <em>200K+</em> drivers.</h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="marquee-row">
          <div className="marquee-track marquee-left">
            {[
              { name: "Jessica R.", role: "Daily Commuter", stars: 5, text: "Saved me from three speed traps in a single week. The AI predictions are terrifyingly accurate." },
              { name: "Mark S.", role: "Logistics Manager", stars: 5, text: "We optimized our entire delivery fleet's routes using Nerixa. Reduced delays by 40%." },
              { name: "Arjun K.", role: "Road Warrior", stars: 5, text: "The hazard alerts for potholes and waterlogging are life-savers during monsoon season." },
              { name: "Sarah L.", role: "Ride-share Pilot", stars: 5, text: "I don't drive without Nerixa. The community verification gives me peace of mind." },
              { name: "Tom V.", role: "Long-Haul Driver", stars: 5, text: "Real-time re-routing saved me 2 hours on a cross-country trip. Never going back to old apps." },
              { name: "Priya N.", role: "City Commuter", stars: 5, text: "The offline maps are insanely detailed. Zero data, full intelligence — that's a miracle." },
              // Duplicate for seamless loop
              { name: "Jessica R.", role: "Daily Commuter", stars: 5, text: "Saved me from three speed traps in a single week. The AI predictions are terrifyingly accurate." },
              { name: "Mark S.", role: "Logistics Manager", stars: 5, text: "We optimized our entire delivery fleet's routes using Nerixa. Reduced delays by 40%." },
              { name: "Arjun K.", role: "Road Warrior", stars: 5, text: "The hazard alerts for potholes and waterlogging are life-savers during monsoon season." },
              { name: "Sarah L.", role: "Ride-share Pilot", stars: 5, text: "I don't drive without Nerixa. The community verification gives me peace of mind." },
              { name: "Tom V.", role: "Long-Haul Driver", stars: 5, text: "Real-time re-routing saved me 2 hours on a cross-country trip. Never going back to old apps." },
              { name: "Priya N.", role: "City Commuter", stars: 5, text: "The offline maps are insanely detailed. Zero data, full intelligence — that's a miracle." },
            ].map((t, i) => (
              <div key={i} className="mq-card">
                <div className="mq-stars">{"★".repeat(t.stars)}</div>
                <p className="mq-text">"{t.text}"</p>
                <div className="mq-user">
                  <div className="mq-avatar">{t.name[0]}</div>
                  <div>
                    <p className="mq-name">{t.name}</p>
                    <p className="mq-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-row">
          <div className="marquee-track marquee-right">
            {[
              { name: "Daniel O.", role: "Uber Driver", stars: 5, text: "Nerixa's checkpoint alerts are precise. My passengers have started asking what app I'm using." },
              { name: "Lin W.", role: "Fleet Manager", stars: 5, text: "Managing 80 vehicles got so much easier. The command dashboard is built for professionals." },
              { name: "Carlos M.", role: "Emergency Courier", stars: 5, text: "Speed + accuracy is everything in my line of work. Nerixa delivers both, every single time." },
              { name: "Aisha F.", role: "Remote Worker", stars: 5, text: "Mountain roads, zero signal. The offline satellite mesh kept me on track through the highlands." },
              { name: "Jake T.", role: "Weekend Explorer", stars: 5, text: "The predictive hazard system flagged a washed-out bridge 4 miles before I got there. Unbelievable." },
              { name: "Meera S.", role: "Delivery Partner", stars: 5, text: "Cut my delivery time by 28% in the first month. The AI routing is simply on another level." },
              // Duplicate for seamless loop
              { name: "Daniel O.", role: "Uber Driver", stars: 5, text: "Nerixa's checkpoint alerts are precise. My passengers have started asking what app I'm using." },
              { name: "Lin W.", role: "Fleet Manager", stars: 5, text: "Managing 80 vehicles got so much easier. The command dashboard is built for professionals." },
              { name: "Carlos M.", role: "Emergency Courier", stars: 5, text: "Speed + accuracy is everything in my line of work. Nerixa delivers both, every single time." },
              { name: "Aisha F.", role: "Remote Worker", stars: 5, text: "Mountain roads, zero signal. The offline satellite mesh kept me on track through the highlands." },
              { name: "Jake T.", role: "Weekend Explorer", stars: 5, text: "The predictive hazard system flagged a washed-out bridge 4 miles before I got there. Unbelievable." },
              { name: "Meera S.", role: "Delivery Partner", stars: 5, text: "Cut my delivery time by 28% in the first month. The AI routing is simply on another level." },
            ].map((t, i) => (
              <div key={i} className="mq-card mq-card-dark">
                <div className="mq-stars">{"★".repeat(t.stars)}</div>
                <p className="mq-text">"{t.text}"</p>
                <div className="mq-user">
                  <div className="mq-avatar mq-avatar-blue">{t.name[0]}</div>
                  <div>
                    <p className="mq-name">{t.name}</p>
                    <p className="mq-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. CONTACT PROTOCOL ───────────────── */}
      <section className="contact-section" ref={contactRef}>
        <div className="contact-grid">
          <div className="contact-left">
            <p className="contact-label">Secure Channel</p>
            <h2 className="contact-title">Establish Connection.</h2>
            <p className="contact-sub">Direct line to Nerixa AI Operations. Our specialists are ready to integrate intelligence into your fleet.</p>
            
            <div className="contact-nodes">
              <div className="c-node">
                <div className="c-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4>Base Coordinates</h4>
                  <p>Cybernetics Hub, Neo-Grid, Sector 4</p>
                </div>
              </div>
              <div className="c-node">
                <div className="c-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4>Comm Link</h4>
                  <p>command@nerixa.ai</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-right">
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-header">
                <span className="live-dot"></span>
                <span>SYSTEM SECURE. READY FOR TRANSMISSION.</span>
              </div>
              <div className="form-group">
                <label>OPERATOR IDENTIFICATION</label>
                <input type="text" placeholder="Enter Full Name" />
              </div>
              <div className="form-group">
                <label>COMM ID</label>
                <input type="email" placeholder="Enter Email Address" />
              </div>
              <div className="form-group">
                <label>TRANSMISSION LOG</label>
                <textarea rows={4} placeholder="Type your message..."></textarea>
              </div>
              <button type="submit" className="c-btn">Initiate Transfer</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────── */}
      <footer ref={footerRef}>
        <div className="footer-top">
          <div>
            <p className="footer-tagline">Smarter Roads.<br />Safer Journeys.<br />Zero Surprises.</p>
          </div>
          <div>
            <p className="newsletter-label">Join the Waitlist</p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" />
              <button type="submit">Join Now</button>
            </form>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-label">Product</p>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Roadmap</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Connect</p>
              <a href="#">Instagram</a>
              <a href="#">X (Twitter)</a>
              <a href="#">LinkedIn</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </div>
        <p className="footer-copy">© NERIXA AI, ALL RIGHTS RESERVED, 2025</p>
        <div className="footer-giant-logo">
          Neri
          <span className="logo-i-dot">
            x
            <div className="logo-i-dot-img">
              <img src="https://images.unsplash.com/photo-1574116405797-c4a89e62c8aa?w=500&q=80" alt="" />
            </div>
          </span>
          a
        </div>
      </footer>
    </ReactLenis>
  );
}
