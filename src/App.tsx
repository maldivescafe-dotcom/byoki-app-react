import { useState, useCallback } from 'react';
import { useLang } from './hooks/useLang';
import { calculateUrgency } from './utils/urgency';
import { SymptomScreen } from './components/SymptomScreen';
import { ContextScreen }  from './components/ContextScreen';
import { ResultsScreen }  from './components/ResultsScreen';
import { CprScreen }      from './components/CprScreen';
import type { Screen, AppCtx } from './types';

export default function App() {
  const { lang, toggleLang } = useLang();

  const [screen, setScreen]             = useState<Screen>('symptoms');
  const [selectedSymptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity]         = useState<string | null>(null);
  const [duration, setDuration]         = useState<string | null>(null);
  const [ctx, setCtx]                   = useState<AppCtx>({ chronic: false, pregnant: false, child: false });

  const toggleSymptom = useCallback((id: string) => {
    setSymptoms(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const toggleCtx = useCallback((key: keyof AppCtx) => {
    setCtx(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const reset = useCallback(() => {
    setSymptoms([]);
    setSeverity(null);
    setDuration(null);
    setCtx({ chronic: false, pregnant: false, child: false });
    setScreen('symptoms');
  }, []);

  const tier = calculateUrgency(selectedSymptoms, severity, duration, ctx);

  return (
    <>
      {screen === 'symptoms' && (
        <SymptomScreen
          lang={lang}
          selected={selectedSymptoms}
          onToggle={toggleSymptom}
          onNext={() => setScreen('context')}
          onCpr={() => setScreen('cpr')}
          onLang={toggleLang}
        />
      )}
      {screen === 'context' && (
        <ContextScreen
          lang={lang}
          severity={severity}
          duration={duration}
          ctx={ctx}
          onSeverity={setSeverity}
          onDuration={setDuration}
          onCtx={toggleCtx}
          onBack={() => setScreen('symptoms')}
          onResults={() => setScreen('results')}
          onLang={toggleLang}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          lang={lang}
          tier={tier}
          selectedSymptoms={selectedSymptoms}
          onBack={() => setScreen('context')}
          onReset={reset}
          onLang={toggleLang}
        />
      )}
      {screen === 'cpr' && (
        <CprScreen
          lang={lang}
          onBack={() => setScreen('symptoms')}
          onLang={toggleLang}
        />
      )}
    </>
  );
}
