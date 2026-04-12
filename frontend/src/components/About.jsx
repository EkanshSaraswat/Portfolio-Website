import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import './About.css';
import img from '/Portfolio.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  }),
};

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '5+', label: 'Certifications' },
  { value: '3+', label: 'Years Coding' },
  { value: '1', label: 'Internships' },
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          variants={fadeUp} custom={0}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          02 — About Me
        </motion.p>

        <div className="about__grid">
          {/* Left — Text */}
          <div className="about__text">
            <motion.h2
              className="section-title"
              variants={fadeUp} custom={1}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              Crafting code<br />
              <span className="accent">with purpose</span>
            </motion.h2>

            <motion.p
              className="about__bio"
              variants={fadeUp} custom={2}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              I'm a passionate full-stack developer and final-year B.Tech student 
              specializing in Computer Science. I love building end-to-end web applications 
              using the MERN stack — from clean, responsive UIs to robust REST APIs and 
              scalable databases.
            </motion.p>
            <motion.p
              className="about__bio"
              variants={fadeUp} custom={3}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              When I'm not shipping features, I'm exploring open-source projects, 
              participating in hackathons, and learning the latest in web technologies. 
              I believe great software is both technically excellent and delightful to use.
            </motion.p>

            <motion.div
              className="about__meta"
              variants={fadeUp} custom={4}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
            >
              <div className="about__meta-item">
                <span className="about__meta-icon">📍</span>
                <span>Jaipur, India</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-icon">🎓</span>
                <span>Third Year B.Tech CSE Student</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-icon">💼</span>
                <span>Open to Opportunities</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-icon">⚡</span>
                <span>Available for Freelance</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Photo + Stats */}
          <motion.div
            className="about__right"
            variants={fadeUp} custom={2}
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <div className="about__photo-wrapper">
              <div className="about__photo-frame">
                {/* <div className="about__photo-placeholder">
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="32" r="16" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5"/>
                    <path d="M10 72c0-16.569 13.431-30 30-30s30 13.431 30 30" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5"/>
                  </svg>
                  <p className="mono" style={{color:'var(--text-muted)',fontSize:'0.7rem',marginTop:'0.5rem'}}>
                    Add your photo
                  </p>
                </div> */}
                <img src = {img} />
                {/* Replace above with: <img src="/assets/profile.jpg" alt="Your Name" /> */}
              </div>
              <div className="about__photo-border" />
            </div>

            <div className="about__stats">
              {stats.map(({ value, label }) => (
                <div key={label} className="about__stat">
                  <span className="about__stat-value accent">{value}</span>
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
