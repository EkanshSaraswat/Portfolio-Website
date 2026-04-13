import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './Hero.css';

const ROLES = [
  'MERN Stack Developer',
  'React.js Engineer',
  'Node.js Developer',
  'MongoDB Architect',
  'Full Stack Builder',
];

const API_URL = import.meta.env.VITE_API_URL || '/api';

function TypewriterName() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showLast, setShowLast] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('nameTyped')) {
      setFirstName('Ekansh');
      setLastName('Saraswat');
      setShowLast(true);
      return;
    }

    let i = 0;
    const first = 'Ekansh';
    const last = 'Saraswat';

    const firstTimer = setInterval(() => {
      setFirstName(first.slice(0, i + 1));
      i++;
      if (i === first.length) {
        clearInterval(firstTimer);
        setShowLast(true);
        let j = 0;
        const lastTimer = setInterval(() => {
          setLastName(last.slice(0, j + 1));
          j++;
          if (j === last.length) {
            clearInterval(lastTimer);
            sessionStorage.setItem('nameTyped', 'true');
          }
        }, 100);
      }
    }, 100);

    return () => clearInterval(firstTimer);
  }, []);

  return (
    <>
      {firstName}<br />
      {showLast && <span className="accent glow">{lastName}</span>}
    </>
  );
}
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function ThreeSphere({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.5;

    // Geometry with displacement
    const geo = new THREE.SphereGeometry(1.2, 128, 128);
    const positions = geo.attributes.position;
    const originalPositions = new Float32Array(positions.array);

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0a0f'),
      roughness: 0.4,
      metalness: 0.8,
      wireframe: false,
    });

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a78bfa'),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const sphere = new THREE.Mesh(geo, mat);
    const wire = new THREE.Mesh(geo, wireMat);
    scene.add(sphere, wire);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const accentLight = new THREE.PointLight(0xa78bfa, 8, 10);
    accentLight.position.set(2, 2, 3);
    scene.add(accentLight);

    const fillLight = new THREE.PointLight(0xf59e0b, 3, 10);
    fillLight.position.set(-3, -1, 1);
    scene.add(fillLight);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const onMouseMove = e => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Organic displacement
      for (let i = 0; i < positions.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len;
        const ny = oy / len;
        const nz = oz / len;
        const noise =
          Math.sin(nx * 3.5 + t * 0.6) *
          Math.cos(ny * 3.5 + t * 0.4) *
          Math.sin(nz * 2.5 + t * 0.5) * 0.15;
        positions.setXYZ(i, ox + nx * noise, oy + ny * noise, oz + nz * noise);
      }
      positions.needsUpdate = true;
      geo.computeVertexNormals();

      // Gentle rotation + mouse parallax
      sphere.rotation.y = t * 0.12 + mouse.x * 0.3;
      sphere.rotation.x = mouse.y * 0.2;
      wire.rotation.copy(sphere.rotation);

      accentLight.position.x = Math.sin(t * 0.5) * 3;
      accentLight.position.y = Math.cos(t * 0.4) * 2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [canvasRef]);

  return null;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const role = useTypewriter(ROLES);

  const handleDownload = async (type) => {
    try {
      window.open(`${API_URL}/cv/${type}`, '_blank');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <ThreeSphere canvasRef={canvasRef} />

      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__greeting mono">
            <span className="accent">01</span> — Hello, World
          </p>

          <h1 className="hero__name">
            {/* Ekansh<br />
            <span className="accent glow">Saraswat</span> */}
            <TypewriterName />
          </h1>

          <div className="hero__role">
            <span className="mono">&gt;&nbsp;</span>
            <span className="hero__typewriter">{role}</span>
            <span className="hero__cursor">|</span>
          </div>

          <p className="hero__sub">
            Building scalable full-stack applications with the MERN stack.
            Turning ideas into elegant, performant digital products.
          </p>

          <div className="hero__actions">
            <button className="btn btn-primary" onClick={() => handleDownload('pdf')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV (PDF)
            </button>
            <button className="btn btn-ghost" onClick={() => handleDownload('docx')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Download CV (.docx)
            </button>
            <a className="btn btn-ghost" href="#projects">
              View Projects ↓
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero__scroll-hint">
        <span className="mono">scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
