import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/EkanshSaraswat',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ekansh-saraswat-a2a883285/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ekansh.saraswat/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.log(err);
      setStatus('error');
      setErrMsg(err.message);
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          07 — Contact
        </motion.p>

        <div className="contact__grid">
          {/* Left — text */}
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -40 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="section-title">
              Let's work<br />
              <span className="accent">together</span>
            </h2>
            <p className="contact__intro">
              Have a project in mind? Want to collaborate? Or just want to say hi?
              My inbox is always open — drop me a message and I'll get back to you.
            </p>

            <div className="contact__info">
              <a href="mailto:Ekanshsaraswat1234@gmail.com" className="contact__email">
                Ekanshsaraswat1234@gmail.com
              </a>
              <div className="contact__socials">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact__social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="contact__right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {status === 'success' ? (
              <div className="contact__success">
                <span className="contact__success-icon">✓</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn btn-ghost" onClick={() => setStatus('idle')}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__field">
                  <label className="contact__label mono" htmlFor="name">Name</label>
                  <input
                    id="name" name="name" type="text"
                    className="contact__input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label mono" htmlFor="email">Email</label>
                  <input
                    id="email" name="email" type="email"
                    className="contact__input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="contact__field">
                  <label className="contact__label mono" htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message"
                    className="contact__textarea"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <p className="contact__error">⚠ {errMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <><span className="contact__spinner"/> Sending...</>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <p className="mono">
          Built with React · Node.js · MongoDB · Three.js · Framer Motion
        </p>
        <p className="mono">© 2026 Ekansh Saraswat. Designed &amp; Developed by me.</p>
      </div>
    </section>
  );
}
