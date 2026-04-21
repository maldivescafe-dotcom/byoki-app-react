import { useState } from 'react';
import { T } from '../data/i18n';
import { getDepartments, getTimingAdvice, getHomeTips } from '../utils/urgency';
import type { Lang } from '../types';

interface Props {
  lang: Lang;
  tier: number;
  selectedSymptoms: string[];
  onBack: () => void;
  onReset: () => void;
  onLang: () => void;
}

const TIER_EMOJIS = ['🚨', '🔴', '🟡', '🟢', '💚'];

export function ResultsScreen({ lang, tier, selectedSymptoms, onBack, onReset, onLang }: Props) {
  const t = T[lang];
  const [toastVisible, setToastVisible] = useState(false);

  const depts   = getDepartments(tier, selectedSymptoms);
  const timing  = getTimingAdvice(tier, lang);
  const tips    = getHomeTips(selectedSymptoms, lang);

  const share = () => {
    const tierLabels = ['tier0label','tier1label','tier2label','tier3label','tier4label'] as const;
    const text = t.shareText + ' ' + t[tierLabels[tier]];
    if (navigator.share) {
      navigator.share({ title: t.appTitle, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
      }).catch(() => {});
    }
  };

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

        <div className={`urgency-card tier-${tier}`}>
          <span className="tier-emoji">{TIER_EMOJIS[tier]}</span>
          <span className="tier-label">{t[`tier${tier}label` as keyof typeof t]}</span>
          <span className="tier-sub">{t[`tier${tier}sub` as keyof typeof t]}</span>
        </div>

        <div className="result-card">
          <h3>{t.timingTitle}</h3>
          <p className="timing-text">{timing}</p>
        </div>

        <div className="result-card">
          <h3>{t.deptTitle}</h3>
          <div className="dept-pills">
            {depts.map(d => (
              <div key={d.key} className={`dept-pill${d.er ? ' er' : ''}`}>
                {t[d.key as keyof typeof t]}
              </div>
            ))}
          </div>
        </div>

        {tier > 1 && tips.length > 0 && (
          <div className="result-card">
            <h3>{t.tipsTitle}</h3>
            <ul className="tips-list">
              {tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        )}

        <button className="btn-share" onClick={share}>{t.btnShare}</button>
        <button className="btn-reset" onClick={onReset}>{t.btnReset}</button>
      </div>

      <div id="toast" className={toastVisible ? 'show' : ''}>{t.shareCopied}</div>
    </div>
  );
}
