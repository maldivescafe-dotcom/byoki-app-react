import type { Symptom } from '../types';

export const SYMPTOMS: Symptom[] = [
  { id: 'gen01',   cat: 'gen',   emergency: false, ja: '発熱',                         en: 'Fever' },
  { id: 'gen02',   cat: 'gen',   emergency: false, ja: '強い倦怠感・だるさ',           en: 'Severe fatigue / malaise' },
  { id: 'gen03',   cat: 'gen',   emergency: true,  ja: '意識がおかしい・ぼんやりする', en: 'Altered consciousness / confusion' },
  { id: 'gen04',   cat: 'gen',   emergency: false, ja: '急激な体重減少',               en: 'Rapid unexplained weight loss' },
  { id: 'head01',  cat: 'head',  emergency: false, ja: '頭痛',                         en: 'Headache' },
  { id: 'head02',  cat: 'head',  emergency: false, ja: 'めまい・立ちくらみ',           en: 'Dizziness / vertigo' },
  { id: 'head03',  cat: 'head',  emergency: true,  ja: '突然の激しい頭痛（今まで最悪）', en: 'Sudden severe headache (worst ever)' },
  { id: 'head04',  cat: 'head',  emergency: true,  ja: '顔の歪み・片側の麻痺',         en: 'Facial drooping / one-sided paralysis' },
  { id: 'head05',  cat: 'head',  emergency: false, ja: '目のかすみ・急な視力変化',     en: 'Blurred vision / sudden vision change' },
  { id: 'chest01', cat: 'chest', emergency: true,  ja: '胸の痛み・締め付け感',         en: 'Chest pain / tightness' },
  { id: 'chest02', cat: 'chest', emergency: true,  ja: '息苦しさ・呼吸困難',           en: 'Difficulty breathing' },
  { id: 'chest03', cat: 'chest', emergency: false, ja: '動悸・脈の乱れ',               en: 'Palpitations / irregular heartbeat' },
  { id: 'chest04', cat: 'chest', emergency: false, ja: '背中の強い痛み',               en: 'Severe back pain' },
  { id: 'chest05', cat: 'chest', emergency: true,  ja: '血を吐く・血が混じった痰',     en: 'Coughing up blood' },
  { id: 'abd01',   cat: 'abd',   emergency: false, ja: '腹痛',                         en: 'Abdominal pain' },
  { id: 'abd02',   cat: 'abd',   emergency: false, ja: '吐き気・嘔吐',                 en: 'Nausea / vomiting' },
  { id: 'abd03',   cat: 'abd',   emergency: false, ja: '下痢・血便',                   en: 'Diarrhea / bloody stool' },
  { id: 'abd04',   cat: 'abd',   emergency: false, ja: '尿が出ない・血尿',             en: 'Unable to urinate / blood in urine' },
  { id: 'abd05',   cat: 'abd',   emergency: true,  ja: '激しい腹痛（動けない）',       en: "Severe abdominal pain (can't move)" },
  { id: 'limb01',  cat: 'limb',  emergency: false, ja: '関節の腫れ・痛み',             en: 'Joint swelling / pain' },
  { id: 'limb02',  cat: 'limb',  emergency: false, ja: '手足のしびれ・脱力',           en: 'Numbness or weakness in limbs' },
  { id: 'limb03',  cat: 'limb',  emergency: true,  ja: '突然の片麻痺（腕・脚）',       en: 'Sudden one-sided weakness (arm/leg)' },
  { id: 'limb04',  cat: 'limb',  emergency: false, ja: '骨折・脱臼の疑い',             en: 'Suspected fracture / dislocation' },
  { id: 'skin01',  cat: 'skin',  emergency: false, ja: '発疹・じんましん',             en: 'Rash / hives' },
  { id: 'skin02',  cat: 'skin',  emergency: true,  ja: '顔・のどの急な腫れ（アレルギー）', en: 'Sudden face or throat swelling (allergy)' },
  { id: 'skin03',  cat: 'skin',  emergency: true,  ja: '出血が止まらない',             en: 'Uncontrollable bleeding' },
];

export const CATEGORIES: { key: Symptom['cat']; labelKey: string }[] = [
  { key: 'gen',   labelKey: 'catGen' },
  { key: 'head',  labelKey: 'catHead' },
  { key: 'chest', labelKey: 'catChest' },
  { key: 'abd',   labelKey: 'catAbd' },
  { key: 'limb',  labelKey: 'catLimb' },
  { key: 'skin',  labelKey: 'catSkin' },
];
