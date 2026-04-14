import { useEffect, useState } from 'react';

export default function useTypewriterOnce(text, speed = 60, storageKey) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) {
      setDisplay(text);
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        sessionStorage.setItem(storageKey, 'true');
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, storageKey]);

  return display;
}