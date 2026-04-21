import { useRef, useEffect } from 'react';
import { T } from '../data/i18n';
import { useCpr } from '../hooks/useCpr';
import type { Lang } from '../types';

interface Props {
  lang: Lang;
  onBack: () => void;
  onLang: () => void;
}

const CPR_RED_PCT_X = 0.499;
const CPR_RED_PCT_Y = 0.578;

export function CprScreen({ lang, onBack, onLang }: Props) {
  const t = T[lang];
  const { running, count, muted, showFlash, flashText, toggle, reset, toggleMute } = useCpr(lang);

  const imgRef    = useRef<HTMLImageElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const positionCircle = () => {
    const img    = imgRef.current;
    const circle = circleRef.current;
    if (!img || !circle) return;
    circle.style.left = (img.offsetLeft + img.offsetWidth  * CPR_RED_PCT_X) + 'px';
    circle.style.top  = (img.offsetTop  + img.offsetHeight * CPR_RED_PCT_Y) + 'px';
  };

  useEffect(() => {
    requestAnimationFrame(positionCircle);
    window.addEventListener('resize', positionCircle);
    return () => window.removeEventListener('resize', positionCircle);
  }, []);

  const handleBack = () => { reset(); onBack(); };

  return (
    <div className="screen active" id="screen-cpr">
      <header className="app-header">
        <div className="app-title">
          {t.cprTitle}
          <span>{t.cprSub}</span>
        </div>
        <button className="btn-lang" onClick={onLang}>{t.langBtn}</button>
      </header>

      <div className="cpr-body">
        <button className="back-btn" onClick={handleBack}>{t.cprBackBtn}</button>

        {/* STEP 1 */}
        <div className="cpr-step">
          <div className="step-num">{t.cprS1num}</div>
          <div className="step-title">{t.cprS1title}</div>
          <div className="step-text">{t.cprS1text}</div>
        </div>

        {/* STEP 2 */}
        <div className="cpr-step">
          <div className="step-num">{t.cprS2num}</div>
          <div className="step-title">{t.cprS2title}</div>
          <div className="step-text">{t.cprS2text}</div>
        </div>

        {/* STEP 3 */}
        <div className="cpr-step">
          <div className="step-num">{t.cprS3num}</div>
          <div className="step-title">{t.cprS3title}</div>
          <div className="step-text">{t.cprS3text}</div>
        </div>

        {/* STEP 4 */}
        <div className="cpr-step active-step">
          <div className="step-num">{t.cprS4num}</div>
          <div className="step-title">{t.cprS4title}</div>
          <div className="step-text">{t.cprS4text}</div>
          <a href="tel:119" className="btn-call119">{t.cprCall}</a>
        </div>

        {/* STEP 5 */}
        <div className="cpr-step">
          <div className="step-num">{t.cprS5num}</div>
          <div className="step-title">{t.cprS5title}</div>
          <div className="step-text">{t.cprS5text}</div>
        </div>

        {/* STEP 6 — CPR compressions */}
        <div className="cpr-step active-step">
          <div className="step-num">{t.cprS6num}</div>
          <div className="step-title">{t.cprS6title}</div>
          <div className="step-text">{t.cprS6text}</div>

          <div
            className="mute-warning"
            dangerouslySetInnerHTML={{ __html: t.muteWarning }}
          />

          {/* Image with overlay circle */}
          <div className="cpr-img-wrap">
            <img
              ref={imgRef}
              src="/cpr-guide.jpg"
              alt="胸骨圧迫の位置"
              className="cpr-guide-img"
              onLoad={positionCircle}
            />
            <div
              ref={circleRef}
              className={`compress-circle${running ? ' beating' : ''}`}
            >
              {t.cprCircleText}
            </div>
          </div>

          <div className="compress-visual">
            <div className="compress-counter">{count}</div>
            <div className="compress-counter-label">{t.cprCountLabel}</div>
          </div>

          <div className="depth-hint">{t.cprDepth}</div>

          {showFlash && (
            <div id="cycle-flash">{flashText}</div>
          )}

          <div className="cpr-controls">
            <button className="btn-start-cpr" onClick={toggle}>
              {running ? t.cprBtnPause : t.cprBtnStart}
            </button>
            <button className="btn-mute" onClick={toggleMute}>
              {muted ? t.cprBtnMuteOff : t.cprBtnMuteOn}
            </button>
          </div>
        </div>

        {/* STEP 7 */}
        <div className="cpr-step aed-step">
          <div className="step-num">{t.cprS7num}</div>
          <div className="step-title">{t.cprS7title}</div>
          <div className="step-text">{t.cprS7text}</div>
        </div>

        <div className="cpr-bottom-pad" />
      </div>
    </div>
  );
}
