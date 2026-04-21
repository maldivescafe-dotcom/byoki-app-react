export type Lang = 'ja' | 'en';
export type Screen = 'symptoms' | 'context' | 'results' | 'cpr';

export interface Symptom {
  id: string;
  cat: 'gen' | 'head' | 'chest' | 'abd' | 'limb' | 'skin';
  emergency: boolean;
  ja: string;
  en: string;
}

export interface AppCtx {
  chronic: boolean;
  pregnant: boolean;
  child: boolean;
}

export interface Dept {
  key: string;
  er: boolean;
}
