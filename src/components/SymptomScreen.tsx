import { T } from '../data/i18n';
import { SYMPTOMS, CATEGORIES } from '../data/symptoms';
import type { Lang } from '../types';

interface Props {
  lang: Lang;
  selected: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
  onCpr: () => void;
  onLang: () => void;
}

export function SymptomScreen({ lang, selected, onToggle, onNext, onCpr, onLang }: Props) {
  const t = T[lang];
  const hasEmergency = selected.some(id => SYMPTOMS.find(s => s.id === id)?.emergency);

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
        <div className="cpr-btn-wrap">
          <button className="btn-cpr-main" onClick={onCpr}>{t.cprBtn}</button>
        </div>

        {hasEmergency && (
          <div id="emergency-banner">{t.emergencyBanner}</div>
        )}

        <div className="intro-card">
          <h2>{t.introTitle}</h2>
          <p>{t.introText}</p>
        </div>

        <div id="symptom-categories">
          {CATEGORIES.map(cat => (
            <div key={cat.key} className="symptom-category">
              <div className="category-label">{t[cat.labelKey]}</div>
              <div className="symptom-grid">
                {SYMPTOMS.filter(s => s.cat === cat.key).map(s => (
                  <div
                    key={s.id}
                    className={[
                      'symptom-card',
                      s.emergency ? 'emergency-symptom' : '',
                      selected.includes(s.id) ? 'selected' : '',
                    ].join(' ').trim()}
                    role="button"
                    tabIndex={0}
                    onClick={() => onToggle(s.id)}
                    onKeyDown={e => e.key === 'Enter' && onToggle(s.id)}
                  >
                    {s.emergency && <span className="emerg-mark">🚨</span>}
                    <span className="sym-label">{s[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky-bar">
        <div className="selected-count">
          <span>
            {selected.length === 0
              ? t.countNone
              : t.countSome.replace('{n}', String(selected.length))}
          </span>
        </div>
        <button
          className="btn-next"
          disabled={selected.length === 0}
          onClick={onNext}
        >
          {t.btnNext}
        </button>
      </div>
    </div>
  );
}
