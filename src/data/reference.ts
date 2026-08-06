import type { L } from "./modules";

export type RefItem = {
  id: string;
  code: L;
  title: L;
  body: L;
};

export const STANDARDS: RefItem[] = [
  {
    id: "bhms1",
    code: { uz: "BHMS 1", ru: "НСБУ 1" },
    title: { uz: "Hisob siyosati va moliyaviy hisobot", ru: "Учётная политика и финансовая отчётность" },
    body: {
      uz: "Korxona hisob siyosatini qanday shakllantirishi, hisobot davri, uzluksizlik va hisoblash (nachisleniye) prinsiplarini belgilaydi. Davr oxirida daromad va xarajatlar yakuniy natijaga yopilishi shu standartdan kelib chiqadi.",
      ru: "Определяет порядок формирования учётной политики, отчётный период, принципы непрерывности и начисления. Закрытие доходов и расходов на конечный результат вытекает из этого стандарта.",
    },
  },
  {
    id: "bhms2",
    code: { uz: "BHMS 2", ru: "НСБУ 2" },
    title: { uz: "Daromadlarni tan olish", ru: "Признание дохода" },
    body: {
      uz: "Daromad pul kelganda emas, tovarga bo'lgan mulk huquqi va asosiy risklar xaridorga o'tganda tan olinadi. Shu sababli oldindan olingan avans (6310) daromad emas, majburiyat hisoblanadi.",
      ru: "Доход признаётся не при поступлении денег, а при переходе права собственности и основных рисков к покупателю. Поэтому полученный аванс (6310) — обязательство, а не доход.",
    },
  },
  {
    id: "bhms4",
    code: { uz: "BHMS 4", ru: "НСБУ 4" },
    title: { uz: "Tovar-moddiy zaxiralar", ru: "Товарно-материальные запасы" },
    body: {
      uz: "TMZ tan narx (sotib olish narxi + tashish, bojxona va boshqa bevosita xarajatlar) bo'yicha baholanadi. Hisobga olinadigan QQS zaxira qiymatiga qo'shilmaydi. Sotilganda tannarx xarajatga (9120) o'tkaziladi.",
      ru: "ТМЗ оцениваются по себестоимости (цена покупки + доставка, пошлины и прочие прямые затраты). Зачётный НДС в стоимость запасов не включается. При реализации себестоимость списывается на 9120.",
    },
  },
  {
    id: "bhms5",
    code: { uz: "BHMS 5", ru: "НСБУ 5" },
    title: { uz: "Asosiy vositalar", ru: "Основные средства" },
    body: {
      uz: "Asosiy vosita boshlang'ich qiymatda tan olinadi; foydalanishga tayyor bo'lgunga qadar barcha xarajatlar 0710/0720/0820 da to'planadi. Eskirish foydali xizmat muddati davomida hisoblanadi va 02XX da to'planadi.",
      ru: "ОС признаются по первоначальной стоимости; до готовности к использованию затраты накапливаются на 0710/0720/0820. Износ начисляется в течение срока полезной службы и накапливается на 02XX.",
    },
  },
  {
    id: "bhms21",
    code: { uz: "BHMS 21", ru: "НСБУ 21" },
    title: { uz: "Schyotlar rejasi va qo'llash yo'riqnomasi", ru: "План счетов и инструкция по применению" },
    body: {
      uz: "Barcha schyotlar tarkibi va tipik pravodkalarni belgilaydi. Aktiv schyotlarda oshish debetda, passiv schyotlarda oshish kreditda aks etadi — bu butun ikki yoqlama yozuvning asosi.",
      ru: "Определяет состав счетов и типовые проводки. По активным счетам увеличение — по дебету, по пассивным — по кредиту: это основа двойной записи.",
    },
  },
];

export const LAWS: RefItem[] = [
  {
    id: "law-buxg",
    code: { uz: "\"Buxgalteriya hisobi to'g'risida\"gi qonun", ru: "Закон «О бухгалтерском учёте»" },
    title: { uz: "O'RQ-404-son", ru: "ЗРУ-404" },
    body: {
      uz: "Buxgalteriya hisobini yuritish majburiyati, birlamchi hujjatlar, ikki yoqlama yozuv, inventarizatsiya va hisobot muddatlari shu qonunda belgilangan.",
      ru: "Устанавливает обязанность ведения учёта, требования к первичным документам, двойную запись, инвентаризацию и сроки отчётности.",
    },
  },
  {
    id: "law-nk",
    code: { uz: "Soliq kodeksi", ru: "Налоговый кодекс" },
    title: { uz: "QQS, daromad solig'i, ijtimoiy soliq", ru: "НДС, НДФЛ, социальный налог" },
    body: {
      uz: "QQS bo'yicha hisoblangan soliq (6410) va hisobga olinadigan soliq (4410) farqi byudjetga to'lanadi. Jismoniy shaxs daromadidan soliq ushlab qolinadi (6420), ijtimoiy soliq esa ish beruvchi xarajati hisoblanadi (6520).",
      ru: "В бюджет уплачивается разница между начисленным (6410) и зачётным (4410) НДС. НДФЛ удерживается из дохода работника (6420), соцналог — расход работодателя (6520).",
    },
  },
  {
    id: "law-mehnat",
    code: { uz: "Mehnat kodeksi", ru: "Трудовой кодекс" },
    title: { uz: "Ish haqi va moddiy javobgarlik", ru: "Оплата труда и материальная ответственность" },
    body: {
      uz: "Mehnat haqini to'lash muddatlari va oylikdan ushlab qolish chegaralarini belgilaydi. Moddiy zarar aybdor xodimdan qonunda belgilangan tartibda undiriladi (4730).",
      ru: "Определяет сроки выплаты зарплаты и пределы удержаний. Материальный ущерб взыскивается с виновного работника в установленном порядке (4730).",
    },
  },
  {
    id: "law-kassa",
    code: { uz: "Naqd pul bilan ishlash tartibi", ru: "Порядок работы с наличностью" },
    title: { uz: "Kassa operatsiyalari qoidalari", ru: "Правила кассовых операций" },
    body: {
      uz: "Kassa kirim/chiqim orderlari, kassa kitobi, naqd tushumni bankka topshirish (inkassatsiya) va hisobdor summalar bo'yicha hisobot berish tartibi.",
      ru: "Приходные/расходные ордера, кассовая книга, сдача выручки в банк (инкассация) и порядок отчёта по подотчётным суммам.",
    },
  },
  {
    id: "law-inv",
    code: { uz: "Inventarizatsiya nizomi", ru: "Положение об инвентаризации" },
    title: { uz: "Kamomad va ortiqchani rasmiylashtirish", ru: "Оформление недостач и излишков" },
    body: {
      uz: "Inventarizatsiya natijasi solishtirma qaydnomada rasmiylashtiriladi. Kamomad avval 5910 ga olinadi, keyin aybdorga (4730) yoki xarajatga (9430) yopiladi.",
      ru: "Результат инвентаризации оформляется сличительной ведомостью. Недостача сначала относится на 5910, затем на виновного (4730) или в расходы (9430).",
    },
  },
];

export const REF_MAP: Record<string, RefItem> = Object.fromEntries(
  [...STANDARDS, ...LAWS].map((r) => [r.id, r]),
);