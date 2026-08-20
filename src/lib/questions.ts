import { ACCOUNT_MAP, type AccountKind } from "@/data/accounts";
import { MODULES, type Entry, type L } from "@/data/modules";

export type QKind = "entry" | "op" | "type" | "wrong";

export type Question = {
  id: string;
  kind: QKind;
  fromModule: number;
  prompt: L;
  subject?: string;
  options: { uz: string; ru: string; mono?: boolean }[];
  correct: number;
  explain: L;
  tag: string;
  isReview?: boolean;
};

/** Pseudo-random generator (mulberry32) */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

const pair = (e: { dt: string; kt: string }) => `Dt ${e.dt} — Kt ${e.kt}`;

function kindLabel(kind: AccountKind): { uz: string; ru: string } {
  switch (kind) {
    case "active":
      return { uz: "Aktiv schot", ru: "Активный счёт" };
    case "expense":
      return { uz: "Xarajat schoti (aktiv xarakterli)", ru: "Счёт расходов (активный по характеру)" };
    case "passive":
      return { uz: "Passiv schot", ru: "Пассивный счёт" };
    case "income":
      return { uz: "Daromad schoti (passiv xarakterli)", ru: "Счёт доходов (пассивный по характеру)" };
    case "contra-active":
      return { uz: "Kontr-aktiv schot", ru: "Контр-активный счёт" };
  }
}

const TYPE_OPTIONS: AccountKind[] = ["active", "passive", "contra-active", "income"];

function buildForModule(moduleId: number, rand: () => number): Question[] {
  const mod = MODULES.find((m) => m.id === moduleId)!;
  const entries = mod.entries;

  // STRICT REQUIREMENT: Only use modules/entries/accounts taught UP TO current moduleId!
  const availableModules = MODULES.filter((m) => m.id <= moduleId);
  const availableEntries = availableModules.flatMap((m) => m.entries);
  const availableAccounts = Array.from(
    new Set(availableModules.flatMap((m) => m.accounts))
  );

  const out: Question[] = [];

  entries.forEach((e) => {
    // 1) Tavsif → to'g'ri Dt-Kt
    const candidateDistractors = availableEntries.filter(
      (x) => x.id !== e.id && !(x.dt === e.dt && x.kt === e.kt)
    );

    const distractOpts: { dt: string; kt: string }[] = shuffle(candidateDistractors, rand).slice(0, 3);

    // If availableEntries does not have 3 distractors yet, synthesize using ONLY studied accounts
    while (distractOpts.length < 3 && availableAccounts.length >= 2) {
      const dtAcc = availableAccounts[Math.floor(rand() * availableAccounts.length)]!;
      let ktAcc = availableAccounts[Math.floor(rand() * availableAccounts.length)]!;
      if (ktAcc === dtAcc) {
        ktAcc = availableAccounts[(availableAccounts.indexOf(dtAcc) + 1) % availableAccounts.length]!;
      }
      if (
        !(dtAcc === e.dt && ktAcc === e.kt) &&
        !distractOpts.some((d) => d.dt === dtAcc && d.kt === ktAcc)
      ) {
        distractOpts.push({ dt: dtAcc, kt: ktAcc });
      }
    }

    const allOptsForEntry = shuffle([e, ...distractOpts], rand);
    out.push({
      id: `${e.id}-entry`,
      kind: "entry",
      fromModule: moduleId,
      prompt: e.op,
      options: allOptsForEntry.map((o) => ({ uz: pair(o), ru: pair(o), mono: true })),
      correct: allOptsForEntry.findIndex((o) => o.dt === e.dt && o.kt === e.kt),
      explain: e.why,
      tag: e.id,
    });

    // 2) Dt-Kt → operatsiya
    const dOps = shuffle(
      availableEntries.filter((x) => x.id !== e.id && x.op.uz !== e.op.uz),
      rand
    ).slice(0, 3);
    const opts2 = shuffle([e, ...dOps], rand);
    out.push({
      id: `${e.id}-op`,
      kind: "op",
      fromModule: moduleId,
      prompt: { uz: pair(e), ru: pair(e) },
      subject: pair(e),
      options: opts2.map((o) => ({ uz: o.op.uz, ru: o.op.ru })),
      correct: opts2.findIndex((o) => o.id === e.id),
      explain: e.why,
      tag: e.id,
    });

    // 3) "Xato pravodkani top"
    // Distractor valid options must be valid entries strictly from availableEntries
    const validOthers = shuffle(
      availableEntries.filter((x) => x.id !== e.id),
      rand
    ).slice(0, 3);

    // Bad/wrong option MUST use studied accounts! E.g. inverted Dt/Kt or invalid pair of studied accounts
    let fakeDt = e.kt;
    let fakeKt = e.dt;
    if (fakeDt === e.dt && fakeKt === e.kt) {
      fakeDt = availableAccounts.find((a) => a !== e.dt) || e.dt;
      fakeKt = e.dt;
    }
    const fakePair = `Dt ${fakeDt} — Kt ${fakeKt}`;

    const wrongOpt = {
      uz: `${e.op.uz} → ${fakePair}`,
      ru: `${e.op.ru} → ${fakePair}`,
    };
    const goodOpts = validOthers.map((o) => ({
      uz: `${o.op.uz} → ${pair(o)}`,
      ru: `${o.op.ru} → ${pair(o)}`,
    }));

    const mixed = shuffle(
      [{ ...wrongOpt, bad: true }, ...goodOpts.map((g) => ({ ...g, bad: false }))],
      rand
    );

    out.push({
      id: `${e.id}-wrong`,
      kind: "wrong",
      fromModule: moduleId,
      prompt: {
        uz: "Quyidagilardan qaysi biri noto'g'ri yozilgan?",
        ru: "Какая из записей отражена неверно?",
      },
      options: mixed.map((m) => ({ uz: m.uz, ru: m.ru })),
      correct: mixed.findIndex((m) => m.bad),
      explain: {
        uz: `To'g'ri variant: ${pair(e)}. ${e.why.uz}`,
        ru: `Верный вариант: ${pair(e)}. ${e.why.ru}`,
      },
      tag: e.id,
    });
  });

  // 4) Schot turi savollari
  mod.accounts.forEach((code) => {
    const acc = ACCOUNT_MAP[code];
    if (!acc) return;
    const correctKind: AccountKind =
      acc.kind === "expense" ? "active" : acc.kind === "income" ? "passive" : acc.kind;
    const opts = shuffle(TYPE_OPTIONS, rand);
    out.push({
      id: `${mod.id}-${code}-type`,
      kind: "type",
      fromModule: moduleId,
      prompt: { uz: `${code} — ${acc.name.uz}`, ru: `${code} — ${acc.name.ru}` },
      subject: code,
      options: opts.map((k) => kindLabel(k)),
      correct: opts.indexOf(correctKind),
      explain: acc.note,
      tag: code,
    });
  });

  return shuffle(out, rand);
}

export const QUESTIONS_PER_TEST = 30;

/** Oldingi mavzulardan aralashtiriladigan savollar soni: 5 dan 10 gacha. */
const REVIEW_MIN = 5;
const REVIEW_MAX = 10;

/** Modul testi: joriy mavzu savollari + 5-10 ta oldingi mavzulardan takrorlash (esdan chiqmasligi uchun). */
export function generateTest(moduleId: number, seed?: number): Question[] {
  const finalSeed = seed !== undefined ? seed : Math.floor(Math.random() * 1000000);
  const rand = rng(finalSeed);
  const current = buildForModule(moduleId, rand);

  // prevPool comes strictly from modules < moduleId
  const prevPool = shuffle(
    MODULES.filter((m) => m.id < moduleId).flatMap((m) => buildForModule(m.id, rand)),
    rand
  );

  // 5-10 ta oldingi savollar aralashtiriladi (agar mavjud bo'lsa)
  let prevCount: number;
  if (moduleId === 1 || prevPool.length === 0) {
    prevCount = 0;
  } else {
    // Aim for a random value between REVIEW_MIN and REVIEW_MAX, capped by available pool
    const target = REVIEW_MIN + Math.floor(rand() * (REVIEW_MAX - REVIEW_MIN + 1));
    prevCount = Math.min(target, prevPool.length);
  }

  const curCount = QUESTIONS_PER_TEST - prevCount;

  const cur: Question[] = [];
  let i = 0;
  while (cur.length < curCount && current.length > 0) {
    const q = current[i % current.length] as Question;
    // Re-shuffle options if duplicated to vary choice positions
    const shuffledOpts = shuffle(q.options, rand);
    const targetOpt = q.options[q.correct];
    const newCorrect = targetOpt ? shuffledOpts.findIndex((o) => o.uz === targetOpt.uz) : q.correct;
    cur.push({
      ...q,
      id: i < current.length ? q.id : `${q.id}-r${Math.floor(i / current.length)}`,
      options: shuffledOpts,
      correct: newCorrect,
      isReview: false,
    });
    i++;
  }

  // Mark review questions so the UI can visually distinguish them
  const reviewQuestions = prevPool.slice(0, prevCount).map((q) => ({
    ...q,
    isReview: true,
  }));

  return shuffle([...cur, ...reviewQuestions], rand);
}

export type PracticeQuestion = {
  id: string;
  fromModule: number;
  prompt: L;
  expectedDt: string;
  expectedKt: string;
  explain: L;
  isReview: boolean;
};

export function generateModulePracticeQuestions(moduleId: number, seed?: number): PracticeQuestion[] {
  const finalSeed = seed !== undefined ? seed : Math.floor(Math.random() * 1000000);
  const rand = rng(finalSeed);

  const curMod = MODULES.find((m) => m.id === moduleId);
  if (!curMod) return [];

  const curEntries = curMod.entries;
  const prevModules = MODULES.filter((m) => m.id < moduleId);
  const prevEntries = prevModules.flatMap((m) => m.entries);

  let targetCurCount = 15;
  let targetPrevCount = 5;

  if (moduleId === 1 || prevEntries.length === 0) {
    targetCurCount = 20;
    targetPrevCount = 0;
  }

  const out: PracticeQuestion[] = [];

  for (let i = 0; i < targetCurCount; i++) {
    const e = curEntries[i % curEntries.length]!;
    out.push({
      id: `p-${moduleId}-${i}-${e.id}`,
      fromModule: moduleId,
      prompt: e.op,
      expectedDt: e.dt,
      expectedKt: e.kt,
      explain: e.why,
      isReview: false,
    });
  }

  for (let i = 0; i < targetPrevCount; i++) {
    const e = prevEntries[Math.floor(rand() * prevEntries.length)]!;
    out.push({
      id: `p-rev-${moduleId}-${i}-${e.id}`,
      fromModule: 1,
      prompt: e.op,
      expectedDt: e.dt,
      expectedKt: e.kt,
      explain: e.why,
      isReview: true,
    });
  }

  return shuffle(out, rand);
}