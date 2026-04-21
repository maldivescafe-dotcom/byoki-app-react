import type { Lang } from '../types';

type CatKey = 'gen' | 'head' | 'chest' | 'abd' | 'limb' | 'skin';

export const TIPS: Record<CatKey, Record<Lang, string[]>> = {
  gen: {
    ja: [
      '横になって安静にし、こまめに水分を補給しましょう。',
      '発熱時は市販の解熱剤（アセトアミノフェンなど）を用量通りに使用できます。',
      '部屋の温度・湿度を適切に保ち、体を冷やしすぎないようにしましょう。',
      '食欲がなくても、経口補水液やスポーツドリンクで水分・塩分は補給してください。',
      '症状が3日以上続く場合や悪化する場合は受診してください。',
    ],
    en: [
      'Rest and drink fluids frequently.',
      'Fever-reducing medication (e.g. acetaminophen) can be used as directed.',
      'Keep room temperature and humidity comfortable.',
      'Even if you lack appetite, stay hydrated with electrolyte drinks.',
      'See a doctor if symptoms last more than 3 days or worsen.',
    ],
  },
  head: {
    ja: [
      '静かな暗い部屋で目を閉じて横になりましょう。',
      'こめかみや首筋を冷たいタオルで軽く冷やすと楽になることがあります。',
      '市販の鎮痛剤（イブプロフェン・アセトアミノフェン）を用量通りに使用できます。',
      'スマートフォン・パソコンの使用を控え、目を休めましょう。',
      'カフェイン摂取量を減らし、水分を十分に摂りましょう。',
    ],
    en: [
      'Lie down in a quiet, dark room with eyes closed.',
      'A cool towel on the temples or neck may ease headaches.',
      'OTC pain relievers (ibuprofen, acetaminophen) can be used as directed.',
      'Reduce screen time and rest your eyes.',
      'Cut back on caffeine and stay well hydrated.',
    ],
  },
  chest: {
    ja: [
      'ゆっくり座るか横になり、深くゆっくり呼吸してください（4秒吸って8秒で吐く）。',
      '締め付けるような衣服はゆるめ、楽な姿勢を保ちましょう。',
      'カフェイン・アルコールは控えてください。',
      'ストレスや過労後であれば、まず十分な休息をとりましょう。',
      '息苦しさが続く・悪化する場合はすぐに受診してください。',
    ],
    en: [
      'Sit or lie down and breathe slowly and deeply (4 sec in, 8 sec out).',
      'Loosen any tight clothing and maintain a comfortable position.',
      'Avoid caffeine and alcohol.',
      'If stress or fatigue triggered symptoms, rest thoroughly first.',
      'Seek care immediately if breathing difficulty persists or worsens.',
    ],
  },
  abd: {
    ja: [
      '食事を一時控え、経口補水液で水分・電解質を補給しましょう。',
      '下痢・嘔吐が続く場合は脱水に注意してください。',
      '腹部を温めると（湯たんぽなど）腹痛が和らぐことがあります（激痛時は不可）。',
      '刺激物・油物・乳製品を一時的に避けましょう。',
      '血便・黒色便がある場合は必ず受診してください。',
    ],
    en: [
      'Avoid solid food temporarily and replenish fluids with oral rehydration solution.',
      'Watch for signs of dehydration if vomiting or diarrhea continue.',
      'Applying gentle warmth to the abdomen may relieve pain (not for severe pain).',
      'Temporarily avoid spicy foods, fatty foods, and dairy.',
      'See a doctor immediately if you have bloody or black stools.',
    ],
  },
  limb: {
    ja: [
      '患部を安静にし、無理に動かさないようにしましょう。',
      '急性の腫れ・痛みには冷却（15〜20分）が有効です。慢性の場合は温熱が効果的。',
      '足首・膝は心臓より高く挙上して腫れを軽減しましょう。',
      '市販の消炎鎮痛剤（外用・内服）を用量通りに使用できます。',
      '骨折・脱臼の疑いがある場合は動かさず、固定して受診してください。',
    ],
    en: [
      'Rest the affected area and avoid moving it unnecessarily.',
      'Apply ice (15–20 min) for acute swelling. Use heat for chronic pain.',
      'Elevate ankle or knee above heart level to reduce swelling.',
      'OTC anti-inflammatory medication (topical or oral) can be used as directed.',
      'If fracture or dislocation is suspected, immobilize and see a doctor.',
    ],
  },
  skin: {
    ja: [
      '傷口は流水で十分に洗い流し、清潔なガーゼで保護しましょう。',
      '軽いやけどは流水で15分以上冷やしてください。氷・氷水は直接当てないでください。',
      'じんましん・かゆみには市販の抗ヒスタミン薬が使えます。',
      '発疹が広がる・発熱を伴う場合はすぐに受診してください。',
      'やけどが広範囲・深い場合は必ず受診してください。',
    ],
    en: [
      'Rinse wounds thoroughly with running water and cover with clean gauze.',
      'For minor burns, cool with running water for at least 15 minutes. Do not apply ice.',
      'OTC antihistamines can relieve hives and itching.',
      'See a doctor if the rash spreads or is accompanied by fever.',
      'See a doctor for extensive or deep burns.',
    ],
  },
};
