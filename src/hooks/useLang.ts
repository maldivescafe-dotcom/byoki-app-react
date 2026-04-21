import { useState, useCallback } from 'react';
import type { Lang } from '../types';

export function useLang() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('byoki_lang') as Lang) || 'ja'
  );

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next: Lang = prev === 'ja' ? 'en' : 'ja';
      localStorage.setItem('byoki_lang', next);
      return next;
    });
  }, []);

  return { lang, toggleLang };
}
