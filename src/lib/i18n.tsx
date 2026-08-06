import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru";

const STORAGE_KEY = "hisobchi.lang";

export const dict = {
  appName: { uz: "Hisobchi", ru: "Hisobchi" },
  tagline: {
    uz: "Buxgalteriyani yodlab emas, tushunib o'rganing",
    ru: "Учите бухгалтерию с пониманием, а не зубрёжкой",
  },
  navAccounts: { uz: "Schotlar", ru: "Счета" },
  navModules: { uz: "Mavzular", ru: "Темы" },
  navReference: { uz: "Ma'lumotnoma", ru: "Справочник" },
  navProfile: { uz: "Profil", ru: "Профиль" },
  chartOfAccounts: { uz: "Schotlar rejasi", ru: "План счетов" },
  chartSub: {
    uz: "O'zbekiston Respublikasi buxgalteriya hisobi schyotlar rejasi (21-son BHMS)",
    ru: "План счетов бухгалтерского учета Республики Узбекистан (НСБУ № 21)",
  },
  allTypes: { uz: "Barchasi", ru: "Все" },
  read: { uz: "O'qish", ru: "Изучение" },
  test: { uz: "Test", ru: "Тест" },
  accounts: { uz: "Schotlar", ru: "Счета" },
  entries: { uz: "Pravodkalar", ru: "Проводки" },
  active: { uz: "Aktiv", ru: "Активный" },
  passive: { uz: "Passiv", ru: "Пассивный" },
  contra: { uz: "Kontr-aktiv", ru: "Контр-активный" },
  expense: { uz: "Xarajat (aktiv)", ru: "Расход (активный)" },
  income: { uz: "Daromad (passiv)", ru: "Доход (пассивный)" },
  why: { uz: "Nega shunday?", ru: "Почему так?" },
  more: { uz: "Batafsil", ru: "Подробнее" },
  locked: { uz: "Qulflangan", ru: "Закрыто" },
  current: { uz: "Joriy", ru: "Текущий" },
  done: { uz: "O'zlashtirilgan", ru: "Пройдено" },
  lockedMsg: {
    uz: "Bu mavzu hali ochilmagan — avvalgi testni 90% ga topshiring.",
    ru: "Тема пока закрыта — сдайте предыдущий тест на 90%.",
  },
  startTest: { uz: "Testni boshlash", ru: "Начать тест" },
  question: { uz: "Savol", ru: "Вопрос" },
  correct: { uz: "To'g'ri", ru: "Верно" },
  wrong: { uz: "Xato", ru: "Ошибка" },
  next: { uz: "Keyingi", ru: "Далее" },
  finish: { uz: "Yakunlash", ru: "Завершить" },
  result: { uz: "Natija", ru: "Результат" },
  passed: { uz: "Tabriklaymiz! Keyingi mavzu ochildi", ru: "Поздравляем! Следующая тема открыта" },
  failed: { uz: "90% dan past — mavzuni qayta ko'rib chiqing", ru: "Меньше 90% — повторите материал" },
  mistakes: { uz: "Xato qilingan savollar", ru: "Ошибочные ответы" },
  reviewMaterial: { uz: "Materialni qayta ko'rish", ru: "Повторить материал" },
  retryTest: { uz: "Testni qayta topshirish", ru: "Пересдать тест" },
  backToModules: { uz: "Mavzularga qaytish", ru: "К темам" },
  overallProgress: { uz: "Umumiy progress", ru: "Общий прогресс" },
  weakSpots: { uz: "Zaif joylar", ru: "Слабые места" },
  weakEmpty: { uz: "Hozircha xatolar yo'q — davom eting!", ru: "Пока ошибок нет — продолжайте!" },
  streak: { uz: "kun ketma-ket", ru: "дней подряд" },
  moduleStats: { uz: "Mavzular bo'yicha statistika", ru: "Статистика по темам" },
  notPassed: { uz: "topshirilmagan", ru: "не сдано" },
  standards: { uz: "BHMS", ru: "НСБУ" },
  laws: { uz: "Qonunlar", ru: "Законы" },
  chooseEntry: { uz: "Qaysi pravodka to'g'ri?", ru: "Какая проводка верна?" },
  chooseOp: { uz: "Bu pravodka qanday operatsiyani bildiradi?", ru: "Какую операцию отражает эта проводка?" },
  chooseType: { uz: "Bu schot qanday turga kiradi?", ru: "К какому типу относится этот счёт?" },
  findWrong: { uz: "Qaysi pravodka XATO?", ru: "Какая проводка ОШИБОЧНА?" },
  resetProgress: { uz: "Progressni tozalash", ru: "Сбросить прогресс" },
  errorsCount: { uz: "xato", ru: "ошибок" },
  flashcards: { uz: "Tezkor mashq", ru: "Быстрая тренировка" },
  showAnswer: { uz: "Javobni ko'rsatish", ru: "Показать ответ" },
  nextCard: { uz: "Keyingi kartochka", ru: "Следующая карточка" },
  search: { uz: "Qidirish...", ru: "Поиск..." },
  entriesCount: { uz: "pravodka", ru: "проводок" },
  accountsCount: { uz: "schot", ru: "счётов" },
  bestScore: { uz: "Eng yaxshi natija", ru: "Лучший результат" },
  review: { uz: "Takrorlash", ru: "Повторение" },
  reviewQuestions: {
    uz: "ta savol oldingi mavzulardan (takrorlash)",
    ru: "вопр. из предыдущих тем (повторение)",
  },
} as const;

export type DictKey = keyof typeof dict;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "uz",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "uz" || saved === "ru") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (key: DictKey) => dict[key][lang];
  const tr = (v: { uz: string; ru: string }) => v[lang];
  return { lang, setLang, t, tr };
}