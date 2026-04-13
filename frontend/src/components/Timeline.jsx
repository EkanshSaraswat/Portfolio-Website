import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useInView } from '../hooks/useInView';
import './Timeline.css';

const timelineItems = [
  {
    type: 'education',
    
    title: 'Secondary (10th)',
    org: 'Childerns Academy',
    period: '2020 - 2021',
    description: 'Completed with 85% aggregate, with early interest in programming and computers.',
    side: 'left',
  },
  {
    type: 'education',
    
    title: 'Higher Secondary (12th)',
    org: 'Childerns Academy',
    period: '2022 - 2023',
    description: 'Science stream with Mathematics, Physics, and Computer Science. Scored 80% aggregate.',
    side: 'right',
  },
  {
    type: 'education',
    
    title: 'B.Tech in Computer Science Engineering',
    org: 'JKLU',
    period: '2023 — 2027',
    description: 'Specializing in full-stack web development, data structures, algorithms, and database management.',
    side: 'left',
  },
  {
    type: 'work',
    
    title: 'Full Stack Intern',
    org: 'Globe Asia Transport Pvt. Ltd',
    period: 'Jun 2025 — Aug 2025',
    description: 'Built a full-stack Employee Management System using the MERN stack. Designed REST APIs for CRUD operations on employee and leave records, implemented JWT-based authentication with role-based access control, and developed responsive React.js dashboards. Integrated MongoDB for real-time data management and conducted end-to-end testing.',
    side: 'right',
  },
];

// Floating torus knot 3D model for the timeline section
function ThreeTorusKnot({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const geo = new THREE.TorusKnotGeometry(1.1, 0.32, 140, 18);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1030'),
      roughness: 0.3,
      metalness: 0.85,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a78bfa'),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const knot = new THREE.Mesh(geo, mat);
    const knotWire = new THREE.Mesh(geo, wireMat);
    scene.add(knot, knotWire);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const light1 = new THREE.PointLight(0xa78bfa, 10, 12);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xf59e0b, 5, 10);
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
      knot.rotation.x = t * 0.18;
      knot.rotation.y = t * 0.22;
      knotWire.rotation.copy(knot.rotation);
      light1.position.x = Math.sin(t * 0.6) * 4;
      light1.position.y = Math.cos(t * 0.5) * 3;
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

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const canvasRef = useRef(null);

  return (
    <section id="timeline" className="section timeline" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          05 — Timeline
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Education &amp;<br />
          <span className="accent">Experience</span>
        </motion.h2>

        {/* 3D decoration */}
        <div className="timeline__3d-wrap">
          <canvas ref={canvasRef} className="timeline__canvas" />
          <ThreeTorusKnot canvasRef={canvasRef} />
        </div>

        <div className="timeline__wrapper">
          {/* Center line */}
          <motion.div
            className="timeline__line"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />

          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              className={`timeline__item timeline__item--${item.side}`}
              initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (item.side === 'left' ? -50 : 50) }}
              transition={{ duration: 0.7, delay: i * 0.15 + 0.3 }}
            >
              <div className="timeline__card">
                <div className="timeline__card-header">
                  <span className="timeline__icon">{item.icon}</span>
                  <div>
                    <span className={`timeline__type-badge mono ${item.type}`}>
                      {item.type}
                    </span>
                    <p className="timeline__period mono">{item.period}</p>
                  </div>
                </div>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__org accent">{item.org}</p>
                <p className="timeline__desc">{item.description}</p>
              </div>

              <div className="timeline__dot">
                <div className="timeline__dot-inner" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
