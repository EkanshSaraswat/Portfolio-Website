import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useInView } from '../hooks/useInView';
import './Certifications.css';

const certs = [
  {
    title: 'C Programming',
    issuer: 'Infosys',
    date: 'March 2024',
    color: '#a78bfa',
    File: 'C Programming.pdf',
  },
  {
    title: 'MySQL Database with PHP',
    issuer: 'Coursera',
    date: 'Sep 2024',
    color: '#f59e0b',
    File: 'MySQL Database with PHP.pdf',
  },
  {
    title: 'Python Programming',
    issuer: 'Coursera',
    date: 'Nov 2023',
    color: '#00ed64',
    link: 'Python Programming.pdf',
  },
  {
    title: 'Red Hat System Administration',
    issuer: 'Red Hat',
    date: 'Apr 2025',
    color: '#a78bfa',
    link: 'Red Hat System Administration I.pdf',
  },
  {
    title: 'Sparks Fundamentals',
    issuer: 'Cognitive Class',
    date: 'Nov 2025',
    color: '#f59e0b',
    link: 'Spark Fundamentals.pdf',
  },
  
];

const achievements = [
  { icon: '🥇', title: '2 Time Coder of the Week', desc: "Top Performance in College's weekly coding contest" },
  
  { icon: '⭐', title: '1 Time Coder of the Month', desc: "Best Performance in College's weekly coding contest for a month" },
  
];

// Floating icosahedron 3D model for this section
function ThreeIcosahedron({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const geo = new THREE.IcosahedronGeometry(1.3, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1030'),
      roughness: 0.2,
      metalness: 0.9,
      flatShading: true,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#f59e0b'),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ico = new THREE.Mesh(geo, mat);
    const icoWire = new THREE.Mesh(geo, wireMat);
    scene.add(ico, icoWire);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const light1 = new THREE.PointLight(0xa78bfa, 12, 12);
    light1.position.set(2, 3, 3);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xf59e0b, 6, 10);
    light2.position.set(-3, -2, 1);
    scene.add(light2);

    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      ico.rotation.x = t * 0.14;
      ico.rotation.y = t * 0.19;
      icoWire.rotation.copy(ico.rotation);
      light1.position.x = Math.sin(t * 0.5) * 3;
      light1.position.y = Math.cos(t * 0.4) * 3;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [canvasRef]);

  return null;
}

export default function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const canvasRef = useRef(null);

  return (
    <section id="certs" className="section certs" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          06 — Certificates
        </motion.p>

        <div className="certs__header-row">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Certificates &amp;<br />
            <span className="accent">Achievements</span>
          </motion.h2>

          {/* 3D model beside title */}
          <div className="certs__3d-wrap">
            <canvas ref={canvasRef} className="certs__canvas" />
            <ThreeIcosahedron canvasRef={canvasRef} />
          </div>
        </div>

        {/* Certificate cards */}
        <div className="certs__grid">
          {certs.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="cert-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.5, delay: i * 0.08 + 0.2 }}
              style={{ '--cert-color': cert.color }}
            >
              <span className="cert-card__badge">{cert.badge}</span>
              <div>
                <h3 className="cert-card__title">{cert.title}</h3>
                <div className="cert-card__meta">
                  <span className="cert-card__issuer">{cert.issuer}</span>
                  <span className="cert-card__date mono">{cert.date}</span>
                </div>
              </div>
              <svg className="cert-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Achievements & Awards subsection */}
        <motion.h3
          className="certs__ach-title"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Achievements &amp; Awards
        </motion.h3>

        <div className="achievements__grid">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              className="achievement-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
            >
              <span className="achievement-card__icon">{ach.icon}</span>
              <div>
                <h4 className="achievement-card__title">{ach.title}</h4>
                <p className="achievement-card__desc">{ach.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
