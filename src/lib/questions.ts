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
};

/** Deterministik pseudo-random (mulberry32) — savollar har safar bir xil bo'lishi uchun. */
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

const pair = (e: Entry) => `Dt ${e.dt} — Kt ${e.kt}`;

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
  const all = MODULES.flatMap((m) => m.entries);
  const out: Question[] = [];

  entries.forEach((e, i) => {
    // 1) Tavsif → to'g'ri Dt-Kt
    const distract = shuffle(
      all.filter((x) => x.id !== e.id && !(x.dt === e.dt && x.kt === e.kt)),
      rand,
    ).slice(0, 3);
    const opts = shuffle([e, ...distract], rand);
    out.push({
      id: `${e.id}-entry`,
      kind: "entry",
      fromModule: moduleId,
      prompt: e.op,
      options: opts.map((o) => ({ uz: pair(o), ru: pair(o), mono: true })),
      correct: opts.findIndex((o) => o.id === e.id),
      explain: e.why,
      tag: e.id,
    });

    // 2) Dt-Kt → operatsiya
    const dOps = shuffle(
      all.filter((x) => x.id !== e.id && x.op.uz !== e.op.uz),
      rand,
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
    if (entries.length >= 2) {
      const others = shuffle(
        all.filter((x) => x.id !== e.id),
        rand,
      ).slice(0, 3);
      const fake = (all.find((x) => x.dt !== e.dt && x.kt !== e.kt) ?? all[0]) as Entry;
      const wrongOpt = {
        uz: `${e.op.uz} → ${`Dt ${fake.dt} — Kt ${e.kt}`}`,
        ru: `${e.op.ru} → ${`Dt ${fake.dt} — Kt ${e.kt}`}`,
      };
      const goodOpts = others.map((o) => ({
        uz: `${o.op.uz} → ${pair(o)}`,
        ru: `${o.op.ru} → ${pair(o)}`,
      }));
      const mixed = shuffle([{ ...wrongOpt, bad: true }, ...goodOpts.map((g) => ({ ...g, bad: false }))], rand);
      out.push({
        id: `${e.id}-wrong`,
        kind: "wrong",
        fromModule: moduleId,
        prompt: { uz: "Quyidagilardan qaysi biri noto'g'ri yozilgan?", ru: "Какая из записей отражена неверно?" },
        options: mixed.map((m) => ({ uz: m.uz, ru: m.ru })),
        correct: mixed.findIndex((m) => m.bad),
        explain: {
          uz: `To'g'ri variant: ${pair(e)}. ${e.why.uz}`,
          ru: `Верный вариант: ${pair(e)}. ${e.why.ru}`,
        },
        tag: e.id,
      });
    }
    void i;
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

/** Modul testi: ~75% joriy modul, ~25% oldingi modullardan takrorlash. */
export function generateTest(moduleId: number): Question[] {
  const rand = rng(moduleId * 7919 + 13);
  const current = buildForModule(moduleId, rand);
  const prevPool = shuffle(
    MODULES.filter((m) => m.id < moduleId).flatMap((m) => buildForModule(m.id, rand)),
    rand,
  );

  const prevCount = moduleId === 1 ? 0 : Math.min(Math.round(QUESTIONS_PER_TEST * 0.25), prevPool.length);
  const curCount = QUESTIONS_PER_TEST - prevCount;

  const cur: Question[] = [];
  let i = 0;
  while (cur.length < curCount && current.length > 0) {
    const q = current[i % current.length] as Question;
    cur.push(i < current.length ? q : { ...q, id: `${q.id}-r${Math.floor(i / current.length)}` });
    i++;
  }

  return shuffle([...cur, ...prevPool.slice(0, prevCount)], rand);
}