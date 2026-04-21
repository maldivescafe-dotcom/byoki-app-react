import { useState, useRef, useCallback, useEffect } from 'react';
import type { Lang } from '../types';
import { T } from '../data/i18n';

export function useCpr(lang: Lang) {
  const [running, setRunning]     = useState(false);
  const [count, setCount]         = useState(0);
  const [muted, setMuted]         = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const audioCtxRef  = useRef<AudioContext | null>(null);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleRef     = useRef(0);
  const flashTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutedRef     = useRef(false);

  // keep mutedRef in sync
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch { /* silent */ }
    }
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();
  }, []);

  const beep = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    try {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch { /* silent */ }
  }, []);

  const tick = useCallback(() => {
    setCount(c => c + 1);
    cycleRef.current += 1;
    if (!mutedRef.current) beep();
    if (cycleRef.current >= 30) {
      cycleRef.current = 0;
      setShowFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setShowFlash(false), 2000);
    }
  }, [beep]);

  const stop = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setRunning(false);
  }, []);

  const toggle = useCallback(() => {
    setRunning(prev => {
      if (prev) {
        stop();
        return false;
      }
      if (!mutedRef.current) initAudio();
      intervalRef.current = setInterval(tick, 545);
      return true;
    });
  }, [stop, initAudio, tick]);

  const reset = useCallback(() => {
    stop();
    setCount(0);
    cycleRef.current = 0;
    setShowFlash(false);
  }, [stop]);

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m;
      if (!next) initAudio();
      return next;
    });
  }, [initAudio]);

  const flashText = T[lang].cycleFlash;

  // cleanup on unmount
  useEffect(() => () => { stop(); }, [stop]);

  return { running, count, muted, showFlash, flashText, toggle, reset, toggleMute };
}
