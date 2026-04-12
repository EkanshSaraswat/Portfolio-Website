import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useInView } from '../hooks/useInView';
import './Skills.css';

const skillGroups = [
  {
    category: 'Frontend',
    icon: '◈',
    skills: ['React.js', 'JavaScript ES6+', 'HTML5 / CSS3', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: '◉',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Mongoose ODM', 'JWT Auth'],
  },
  {
    category: 'Tools & Tech',
    icon: '◇',
    skills: ['Git & GitHub', 'Docker', 'Postman', 'Figma', 'Vercel / Render', 'VS Code'],
  },
];

// Floating octahedron 3D model for Skills section
function ThreeOctahedron({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // Outer octahedron wireframe
    const geo = new THREE.OctahedronGeometry(1.4, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1030'),
      roughness: 0.2,
      metalness: 0.95,
      flatShading: true,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a78bfa'),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const oct = new THREE.Mesh(geo, mat);
    const octWire = new THREE.Mesh(geo, wireMat);
    scene.add(oct, octWire);

    // Inner smaller octahedron rotated opposite
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#f59e0b'),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const innerOct = new THREE.Mesh(innerGeo, innerWireMat);
    scene.add(innerOct);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const light1 = new THREE.PointLight(0xa78bfa, 14, 12);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xf59e0b, 6, 10);
    light2.position.set(-3, -2, 2);
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
      oct.rotation.x = t * 0.2;
      oct.rotation.y = t * 0.28;
      octWire.rotation.copy(oct.rotation);
      // Counter-rotate inner
      innerOct.rotation.x = -t * 0.35;
      innerOct.rotation.y = -t * 0.25;
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

export default function Skills() {
  const [ref, inView] = useInView();
  const canvasRef = useRef(null);

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <div className="skills__header-row">
          <div>
            <motion.p
              className="section-label"
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              03 — Skills
            </motion.p>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              What I work<br />
              <span className="accent">with</span>
            </motion.h2>
          </div>

          {/* 3D Octahedron */}
          <div className="skills__3d-wrap">
            <canvas ref={canvasRef} className="skills__canvas" />
            <ThreeOctahedron canvasRef={canvasRef} />
          </div>
        </div>

        <div className="skills__groups">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="skills__group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: gi * 0.15 + 0.2 }}
            >
              <h3 className="skills__group-title">
                <span className="accent">{group.icon}</span> {group.category}
              </h3>
              <div className="skills__tags">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.85 }}
                    transition={{ duration: 0.35, delay: gi * 0.12 + si * 0.06 + 0.3 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
