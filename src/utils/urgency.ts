import { SYMPTOMS } from '../data/symptoms';
import { TIPS } from '../data/tips';
import { T } from '../data/i18n';
import type { Lang, AppCtx, Dept } from '../types';

export function calculateUrgency(
  selectedSymptoms: string[],
  severity: string | null,
  duration: string | null,
  ctx: AppCtx,
): number {
  const hasEmergency = selectedSymptoms.some(id => {
    const s = SYMPTOMS.find(x => x.id === id);
    return s?.emergency;
  });
  if (hasEmergency) return 0;

  const sevScore: Record<string, number> = { mild: 1, moderate: 3, strong: 6, unbearable: 9 };
  const durScore: Record<string, number> = { today: 0, days23: 1, week: 2 };

  let score = sevScore[severity ?? ''] ?? 1;
  score += durScore[duration ?? ''] ?? 0;
  if (ctx.chronic || ctx.pregnant || ctx.child) score += 2;
  if (selectedSymptoms.length >= 5) score += 2;
  else if (selectedSymptoms.length >= 3) score += 1;

  if (score >= 8) return 1;
  if (score >= 5) return 2;
  if (score >= 3) return 3;
  return 4;
}

export function getDepartments(tier: number, selectedSymptoms: string[]): Dept[] {
  const catMap: Record<string, Dept[]> = {
    gen:   [{ key: 'deptInternal', er: false }],
    head:  [{ key: 'deptNeuro', er: false }, { key: 'deptNeurosurg', er: false }],
    chest: [{ key: 'deptCardio', er: false }, { key: 'deptResp', er: false }],
    abd:   [{ key: 'deptGastro', er: false }],
    limb:  [{ key: 'deptOrtho', er: false }],
    skin:  [{ key: 'deptDerma', er: false }, { key: 'deptSurgery', er: false }],
  };
  const special: Record<string, string> = {
    abd04:  'deptUro',
    head05: 'deptInternal',
    skin02: 'deptInternal',
    skin03: 'deptSurgery',
  };
  const skipCatMap = new Set(['skin02', 'skin03']);

  const seen = new Set<string>();
  const result: Dept[] = [];

  if (tier <= 1) {
    result.push({ key: 'deptER', er: true });
    seen.add('deptER');
  }

  type CatKey = 'gen' | 'head' | 'chest' | 'abd' | 'limb' | 'skin';
  const cats = [...new Set(
    selectedSymptoms
      .filter(id => !skipCatMap.has(id))
      .map(id => SYMPTOMS.find(x => x.id === id)?.cat)
      .filter((c): c is CatKey => Boolean(c))
  )];

  for (const id of selectedSymptoms) {
    if (special[id] && !seen.has(special[id])) {
      result.push({ key: special[id], er: false });
      seen.add(special[id]);
    }
  }
  for (const cat of cats) {
    for (const dept of catMap[cat] ?? []) {
      if (!seen.has(dept.key) && result.length < 3) {
        result.push(dept);
        seen.add(dept.key);
      }
    }
  }
  if (result.length === 0) result.push({ key: 'deptInternal', er: false });
  return result;
}

export function getTimingAdvice(tier: number, lang: Lang): string {
  const now = new Date();
  const hour = now.getHours();
  const dow = now.getDay();
  const isWeekend     = dow === 0 || dow === 6;
  const isNight       = hour >= 22 || hour < 6;
  const isEvening     = hour >= 18 && hour < 22;
  const isClinicHours = hour >= 9 && hour < 18 && !isWeekend;
  void isEvening; // used implicitly via else branch

  if (tier <= 1) return isNight ? T[lang].timingNightUrgent : T[lang].timingUrgent;
  if (tier === 2) {
    if (isClinicHours) return T[lang].timingClinic;
    if (isNight)       return T[lang].timingNight;
    if (isWeekend)     return T[lang].timingWeekend;
    return T[lang].timingEvening;
  }
  if (isClinicHours) return T[lang].timingClinic;
  if (isWeekend)     return T[lang].timingOffhoursWeekend;
  return T[lang].timingOffhours;
}

export function getHomeTips(selectedSymptoms: string[], lang: Lang): string[] {
  type CatKey = 'gen' | 'head' | 'chest' | 'abd' | 'limb' | 'skin';
  const cats = [...new Set(
    selectedSymptoms
      .map(id => SYMPTOMS.find(x => x.id === id)?.cat)
      .filter((c): c is CatKey => Boolean(c))
  )];
  const tips: string[] = [];
  for (const cat of cats) {
    const arr = TIPS[cat as keyof typeof TIPS]?.[lang] ?? [];
    for (const t of arr) {
      if (!tips.includes(t) && tips.length < 5) tips.push(t);
    }
  }
  return tips;
}
