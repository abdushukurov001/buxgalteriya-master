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
  navPractices: { uz: "Amaliy mashqlar", ru: "Практикум" },
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
  practiceTab: { uz: "Amaliy mashq", ru: "Практикум" },
  recommendedTime: { uz: "Vaqt: 20 daqiqa", ru: "Время: 20 минут" },
  stopwatchLabel: { uz: "Vaqt", ru: "Время" },
  countdownTimer: { uz: "Qolgan vaqt (20 daqiqa)", ru: "Осталось времени (20 минут)" },
  timeUpFail: { uz: "Vaqt tugadi! 20 daqiqa ichida ulgurmadingiz.", ru: "Время вышло! Вы не успели за 20 минут." },
  restartPractice: { uz: "Boshidan qayta boshlash", ru: "Начать заново" },
  checkAnswer: { uz: "Tekshirish", ru: "Проверить" },
  attempt: { uz: "Urinish", ru: "Попытка" },
  dtError: { uz: "Dt schot raqami xato!", ru: "Ошибка в Дт счете!" },
  ktError: { uz: "Kt schot raqami xato!", ru: "Ошибка в Кт счете!" },
  summaError: { uz: "Summa xato kiritildi!", ru: "Ошибка в сумме!" },
  dtKtError: { uz: "Dt va Kt schotlari xato!", ru: "Ошибки в Дт и Кт счетах!" },
  practiceNotice: { uz: "Bu mashq keyingi modul ochilishiga ta'sir qilmaydi (ixtiyoriy pishitish).", ru: "Это упражнение не влияет на открытие следующего модуля." },
  startPractice: { uz: "Mashqni boshlash", ru: "Начать практику" },
  firstTryScore: { uz: "Birinchi urinishda to'g'ri", ru: "Верно с первой попытки" },
  practiceScoreLabel: { uz: "Amaliy mashqlar balli", ru: "Баллы практических кейсов" },
  practiceStats: { uz: "Amaliy mashqlar statistikasi", ru: "Статистика практических кейсов" },
  nextOperation: { uz: "Keyingi operatsiya", ru: "Следующая операция" },
  finishCase: { uz: "Case'ni yakunlash", ru: "Завершить кейс" },
  autoScrollNext: { uz: "Keyingi operatsiyaga o'tish", ru: "Перейти к следующей операции" },
  finalReviewTitle: { uz: "Yakuniy natija va xatolar tahlili", ru: "Итоговый результат и разбор ошибок" },
  skipCheck: { uz: "O'tkazib yuborish", ru: "Пропустить" },
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
  timeLimit: { uz: "Vaqt: 15 daqiqa", ru: "Время: 15 минут" },
  timeLeft: { uz: "Qolgan vaqt", ru: "Осталось времени" },
  timeUp: { uz: "Vaqt tugadi!", ru: "Время вышло!" },
  timeUpMsg: {
    uz: "Vaqt tugadi — javob berilgan savollar bo'yicha natija hisoblandi.",
    ru: "Время вышло — результат подсчитан по отвеченным вопросам.",
  },
  // ─── Auth & Management ────────────────────────────────────────────
  loginTitle: { uz: "Tizimga kirish", ru: "Вход в систему" },
  loginSubtitle: { uz: "Login yoki telefon raqam va parolingizni kiriting", ru: "Введите логин или номер телефона и пароль" },
  loginField: { uz: "Login / Telefon raqam", ru: "Логин / Номер телефона" },
  passwordField: { uz: "Parol", ru: "Пароль" },
  loginButton: { uz: "Kirish", ru: "Войти" },
  logoutButton: { uz: "Chiqish", ru: "Выйти" },
  registerTitle: { uz: "Ro'yxatdan o'tish", ru: "Регистрация" },
  registerSubtitle: { uz: "O'quv markaz tizimiga qo'shiling", ru: "Присоединяйтесь к учебному центру" },
  fullNameField: { uz: "Ism va Familiya", ru: "Имя и Фамилия" },
  phoneField: { uz: "Telefon raqam", ru: "Номер телефона" },
  registerButton: { uz: "Ro'yxatdan o'tish", ru: "Зарегистрироваться" },
  alreadyRegistered: { uz: "Allaqachon ro'yxatdan o'tganmisiz?", ru: "Уже зарегистрированы?" },
  superadminDashboard: { uz: "SuperAdmin Panel", ru: "Панель SuperAdmin" },
  learningCenters: { uz: "O'quv markazlar", ru: "Учебные центры" },
  addCenter: { uz: "O'quv markaz qo'shish", ru: "Добавить учебный центр" },
  centerName: { uz: "O'quv markaz nomi", ru: "Название учебного центра" },
  centerLogin: { uz: "Login", ru: "Логин" },
  centerPassword: { uz: "Parol", ru: "Пароль" },
  create: { uz: "Yaratish", ru: "Создать" },
  cancel: { uz: "Bekor qilish", ru: "Отмена" },
  delete: { uz: "O'chirish", ru: "Удалить" },
  groups: { uz: "Guruhlar", ru: "Группы" },
  studentsLabel: { uz: "O'quvchilar", ru: "Ученики" },
  addGroup: { uz: "Guruh qo'shish", ru: "Добавить группу" },
  groupName: { uz: "Guruh nomi", ru: "Название группы" },
  copyLink: { uz: "Havolani nusxalash", ru: "Копировать ссылку" },
  linkCopied: { uz: "Havola nusxalandi!", ru: "Ссылка скопирована!" },
  adminDashboard: { uz: "Admin Panel", ru: "Панель Admin" },
  noGroups: { uz: "Hali guruhlar yo'q", ru: "Пока нет групп" },
  noStudents: { uz: "Hali o'quvchilar yo'q", ru: "Пока нет учеников" },
  noCenters: { uz: "Hali o'quv markazlar yo'q", ru: "Пока нет учебных центров" },
  statistics: { uz: "Statistika", ru: "Статистика" },
  totalGroups: { uz: "Jami guruhlar", ru: "Всего групп" },
  totalStudents: { uz: "Jami o'quvchilar", ru: "Всего учеников" },
  registeredAt: { uz: "Ro'yxatdan o'tgan", ru: "Зарегистрирован" },
  centerInfo: { uz: "Markaz ma'lumotlari", ru: "Информация о центре" },
  allGroups: { uz: "Barcha guruhlar", ru: "Все группы" },
  welcomeCenter: { uz: "O'quv markazi", ru: "Учебный центр" },
  phone: { uz: "Telefon", ru: "Телефон" },
  group: { uz: "Guruh", ru: "Группа" },
  name: { uz: "Nomi", ru: "Название" },
  actions: { uz: "Amallar", ru: "Действия" },
  confirmDelete: { uz: "Haqiqatan o'chirmoqchimisiz?", ru: "Вы уверены, что хотите удалить?" },
  passwordMinLength: { uz: "Parol kamida 6 ta belgi bo'lishi kerak", ru: "Пароль должен содержать минимум 6 символов" },
  centerNotFound: { uz: "O'quv markaz topilmadi", ru: "Учебный центр не найден" },
  groupNotFound: { uz: "Guruh topilmadi", ru: "Группа не найдена" },
  registerSuccess: { uz: "Muvaffaqiyatli ro'yxatdan o'tdingiz!", ru: "Вы успешно зарегистрировались!" },
  musicControlTitle: { uz: "Fon musiqasi", ru: "Фоновая музыка" },
  musicVolume: { uz: "Musiqa ovozi", ru: "Громкость музыки" },
  musicStatusMuted: { uz: "O'chirilgan", ru: "Выкл" },
  musicStatusLow: { uz: "Past", ru: "Тихо" },
  musicStatusMedium: { uz: "O'rtacha", ru: "Средне" },
  musicStatusHigh: { uz: "Baland", ru: "Громко" },
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