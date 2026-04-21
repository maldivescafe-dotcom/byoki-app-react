import { T } from '../data/i18n';
import type { Lang, AppCtx } from '../types';

interface Props {
  lang: Lang;
  severity: string | null;
  duration: string | null;
  ctx: AppCtx;
  onSeverity: (v: string) => void;
  onDuration: (v: string) => void;
  onCtx: (key: keyof AppCtx) => void;
  onBack: () => void;
  onResults: () => void;
  onLang: () => void;
}

export function ContextScreen({
  lang, severity, duration, ctx,
  onSeverity, onDuration, onCtx, onBack, onResults, onLang,
}: Props) {
  const t = T[lang];
  const canProceed = severity !== null && duration !== null;

  return (
    <div className="screen active">
      <header className="app-header">
        <div className="app-title">
          {t.appTitle}
          <span>{t.appSub}</span>
        </div>
        <button className="btn-lang" onClick={onLang}>{t.langBtn}</button>
      </header>

      <div className="screen-body">
        <button className="back-btn" onClick={onBack}>{t.btnBack}</button>

        <div className="section-label">{t.severityLabel}</div>
        <div className="btn-group">
          {(['mild','moderate','strong','unbearable'] as const).map((val, i) => (
            <button
              key={val}
              className={`sel-btn sev-btn${severity === val ? ' selected' : ''}`}
              onClick={() => onSeverity(val)}
            >
              {t[`sev${i}` as keyof typeof t]}
            </button>
          ))}
        </div>

        <div className="section-label">{t.durationLabel}</div>
        <div className="btn-group">
          {(['today','days23','week'] as const).map((val, i) => (
            <button
              key={val}
              className={`sel-btn dur-btn${duration === val ? ' selected' : ''}`}
              onClick={() => onDuration(val)}
            >
              {t[`dur${i}` as keyof typeof t]}
            </button>
          ))}
        </div>

        <div className="section-label">{t.contextLabel}</div>
        <div className="btn-group col1">
          {(['chronic','pregnant','child'] as const).map((key, i) => (
            <button
              key={key}
              className={`sel-btn ctx-btn ctx${ctx[key] ? ' selected' : ''}`}
              onClick={() => onCtx(key)}
            >
              {t[`ctx${i}` as keyof typeof t]}
            </button>
          ))}
        </div>

        <button
          className="btn-results"
          disabled={!canProceed}
          onClick={onResults}
        >
          {t.btnResults}
        </button>
      </div>
    </div>
  );
}
