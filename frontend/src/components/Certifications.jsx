import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useInView } from '../hooks/useInView';
import './Certifications.css';

const certs = [
  {
    title: 'The Complete Web Developer Bootcamp',
    issuer: 'Udemy',
    date: 'Jan 2024',
    badge: '🏆',
    color: '#a78bfa',
    link: 'https://udemy.com/certificate/your-cert-id',
  },
  {
    title: 'React — The Complete Guide',
    issuer: 'Udemy',
    date: 'Mar 2024',
    badge: '⚛️',
    color: '#f59e0b',
    link: 'https://udemy.com/certificate/your-cert-id',
  },
  {
    title: 'MongoDB for JavaScript Developers',
    issuer: 'MongoDB University',
    date: 'Apr 2024',
    badge: '🍃',
    color: '#00ed64',
    link: 'https://university.mongodb.com/course/completion/certificate',
  },
  {
    title: 'Node.js, Express & MongoDB Bootcamp',
    issuer: 'Udemy',
    date: 'May 2024',
    badge: '🟢',
    color: '#a78bfa',
    link: 'https://udemy.com/certificate/your-cert-id',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'AWS / Coursera',
    date: 'Jun 2024',
    badge: '☁️',
    color: '#f59e0b',
    link: 'https://coursera.org/verify/your-cert-id',
  },
  {
    title: 'Data Structures & Algorithms',
    issuer: 'NPTEL',
    date: 'Aug 2024',
    badge: '📊',
    color: '#a78bfa',
    link: 'https://nptel.ac.in/noc/certificates',
  },
];

const achievements = [
  { icon: '🥇', title: 'Smart India Hackathon 2024', desc: 'Finalist — Top 10 nationally' },
  { icon: '🥈', title: 'HackWithIndia 2023', desc: '2nd Place — Web Category' },
  { icon: '⭐', title: 'GitHub Arctic Code Vault', desc: 'Contributor' },
  { icon: '🎯', title: '500+ LeetCode Problems', desc: 'DSA Enthusiast' },
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
