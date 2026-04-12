import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
      textAlign: 'center', padding: '2rem',
    }}>
      <motion.p
        className="mono accent"
        style={{ fontSize: '0.8rem', letterSpacing: '0.15em' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404 — PAGE NOT FOUND
      </motion.p>
      <motion.h1
        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Oops.<br /><span className="accent">Lost?</span>
      </motion.h1>
      <motion.p
        style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '1rem' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        This page doesn't exist. Let's get you back to safety.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </motion.div>
    </div>
  );
}
