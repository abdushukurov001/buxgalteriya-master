import type { L } from "./modules";

export type RefItem = {
  id: string;
  code: L;
  title: L;
  body: L;
  regInfo?: L;
  articles?: L;
};

export const STANDARDS: RefItem[] = [
  {
    id: "bhms1",
    code: { uz: "1-son BHMS (BHMS 1)", ru: "НСБУ № 1" },
    title: {
      uz: "Hisob siyosati va moliyaviy hisobot",
      ru: "Учётная политика и финансовая отчётность",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 14.08.1998 y. ro'yxat raqami 474, kuchga kirish sanasi: 14.08.1998",
      ru: "МФ РУз: от 14.08.1998 г. рег. № 474, дата вступления в силу: 14.08.1998",
    },
    body: {
      uz: "Korxona hisob siyosatini shakllantirish, hisobot davri, uzluksizlik va hisoblash (nachisleniya) prinsiplarini belgilaydi. Davr oxirida daromad va xarajatlarni yakuniy moliyaviy natijaga (9910) yopish ushbu standartdan kelib chiqadi.",
      ru: "Определяет порядок формирования учётной политики, отчётный период, принципы непрерывности и начисления. Закрытие доходов и расходов на конечный финансовый результат (9910) вытекает из этого стандарта.",
    },
  },
  {
    id: "bhms2",
    code: { uz: "2-son BHMS (BHMS 2)", ru: "НСБУ № 2" },
    title: {
      uz: "Asosiy xo'jalik faoliyatidan tushgan daromadlar",
      ru: "Доходы от основной хозяйственной деятельности",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 26.08.1998 y. ro'yxat raqami 483, kuchga kirish sanasi: 26.08.1998",
      ru: "МФ РУз: от 26.08.1998 г. рег. № 483, дата вступления в силу: 26.08.1998",
    },
    body: {
      uz: "Daromad pul kelib tushganda emas, balki tovarga bo'lgan mulk huquqi va asosiy xavf-xatarlar xaridorga o'tganda tan olinadi. Olingan bo'nak (6310) daromad emas, majburiyat hisoblanadi.",
      ru: "Доход признаётся не при поступлении денег, а при переходе права собственности и основных рисков к покупателю. Полученный аванс (6310) является обязательством, а не доходом.",
    },
  },
  {
    id: "bhms3",
    code: { uz: "3-son BHMS (BHMS 3)", ru: "НСБУ № 3" },
    title: {
      uz: "Moliyaviy natijalar to'g'risida hisobot",
      ru: "Отчёт о финансовых результатах",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 26.08.1998 y. ro'yxat raqami 484, kuchga kirish sanasi: 26.08.1998",
      ru: "МФ РУз: от 26.08.1998 г. рег. № 484, дата вступления в силу: 26.08.1998",
    },
    body: {
      uz: "Mahsulot (tovar, ish, xizmat) sotishdan tushgan sof tushum, sotilgan mahsulot tannarxi, davr xarajatlari (sotish, ma'muriy, boshqa operatsion xarajatlar) va soliq to'langandan keyingi sof foydani shakllantirish va hisobotda ko'rsatish tartibini belgilaydi.",
      ru: "Определяет порядок отражения чистой выручки от реализации товаров (работ, услуг), себестоимости реализованной продукции, расходов периода (реализация, административные, прочие операционные) и чистой прибыли после налогообложения.",
    },
  },
  {
    id: "bhms4",
    code: { uz: "4-son BHMS (BHMS 4)", ru: "НСБУ № 4" },
    title: {
      uz: "Tovar-moddiy zaxiralar",
      ru: "Товарно-материальные запасы",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 30.06.2020 y. ro'yxat raqami 3259, kuchga kirish sanasi: 30.06.2020",
      ru: "Приказ МФ РУз: от 30.06.2020 г. рег. № 3259, дата вступления в силу: 30.06.2020",
    },
    body: {
      uz: "TMZ xarid tannarxi (xarid narxi + transport + bojxona va boshqa bevosita xarajatlar) bo'yicha baholanadi. Hisobga olinadigan QQS zaxira qiymatiga qo'shilmaydi. Sotilganda tannarx xarajatga (9110/9120) o'tkaziladi.",
      ru: "ТМЗ оцениваются по себестоимости приобретения (цена покупки + доставка, пошлины и прочие прямые затраты). Зачётный НДС в стоимость запасов не включается. При реализации себестоимость списывается на 9110/9120.",
    },
  },
  {
    id: "bhms5",
    code: { uz: "5-son BHMS (BHMS 5)", ru: "НСБУ № 5" },
    title: {
      uz: "Asosiy vositalar",
      ru: "Основные средства",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 20.01.2004 y. ro'yxat raqami 1299, kuchga kirish sanasi: 30.01.2004",
      ru: "Приказ МФ РУз: от 20.01.2004 г. рег. № 1299, дата вступления в силу: 30.01.2004",
    },
    body: {
      uz: "Asosiy vositalar boshlang'ich qiymatida tan olinadi; foydalanishga tayyor bo'lgunga qadar sinov va o'rnatish xarajatlari 0710/0820 da to'planadi. Eskirish (amortizatsiya) foydali xizmat muddati davomida hisoblanadi va 0230 schyotida to'planadi (0110 — binolar, 0120 — inshootlar, 0130 — mashinalar, 0140 — transport, 0150 — mebel, 0190 — boshqa AV; 0210 — binolar eskirishi, 0220 — inshootlar, 0230 — mashinalar, 0240 — transport, 0250 — mebel, 0290 — boshqa AV eskirishi).",
      ru: "ОС признаются по первоначальной стоимости; до готовности к эксплуатации затраты накапливаются на 0710/0820. Износ начисляется в течение срока полезной службы и накапливается на счёте 0230 (0210 — здания, 0220 — сооружения, 0230 — машины, 0240 — транспорт, 0250 — мебель, 0290 — прочие ОС).",
    },
  },
  {
    id: "bhms6",
    code: { uz: "6-son BHMS (BHMS 6)", ru: "НСБУ № 6" },
    title: {
      uz: "Ijara hisobi",
      ru: "Учёт аренды",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 24.04.2009 y. ro'yxat raqami 1946, kuchga kirish sanasi: 04.05.2009",
      ru: "Приказ МФ РУз: от 24.04.2009 г. рег. № 1946, дата вступления в силу: 04.05.2009",
    },
    body: {
      uz: "Operativ va moliyaviy (lizing) ijarani farqlaydi. Moliyaviy ijarada obyekt ijaraga oluvchining balansiga olinadi va eskirish hisoblanadi. Operativ ijarada ijara to'lovi davr xarajatlariga olib boriladi.",
      ru: "Разграничивает операционную и финансовую (лизинговую) аренду. При финансовой аренде объект принимается на баланс арендатора с начислением амортизации. При операционной — платежи относятся на расходы периода.",
    },
  },
  {
    id: "bhms7",
    code: { uz: "7-son BHMS (BHMS 7)", ru: "НСБУ № 7" },
    title: {
      uz: "Nomoddiy aktivlar",
      ru: "Нематериальные активы",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 27.06.2005 y. ro'yxat raqami 1485, kuchga kirish sanasi: 07.07.2005",
      ru: "Приказ МФ РУз: от 27.06.2005 г. рег. № 1485, дата вступления в силу: 07.07.2005",
    },
    body: {
      uz: "Moddiy-ashyoviy shaklga ega bo'lmagan, uzoq muddat foydalaniladigan aktivlar (dasturiy ta'minot, patentlar, savdo belgilari, litsenziyalar) hisobi. Amortizatsiya 0520 schyotida aks ettiriladi (0510 — patentlar, 0520 — savdo belgilari, 0530 — litsenziyalar, 0590 — boshqa NA).",
      ru: "Учёт долгосрочных активов, не имеющих материально-вещественной формы (программное обеспечение, патенты, товарные знаки, лицензии). Амортизация отражается на счёте 0520 (0510 — патенты, 0520 — товарные знаки, 0530 — лицензии, 0590 — прочие НА).",
    },
  },
  {
    id: "bhms8",
    code: { uz: "8-son BHMS (BHMS 8)", ru: "НСБУ № 8" },
    title: {
      uz: "Jamlangan moliyaviy hisobotlar va sho'ba xo'jalik jamiyatlariga sarmoyalarni hisobga olish",
      ru: "Консолидированные финансовые отчёты и учёт инвестиций в дочерние хозяйственные общества",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 28.12.1998 y. ro'yxat raqami 580, kuchga kirish sanasi: 28.12.1998",
      ru: "МФ РУз: от 28.12.1998 г. рег. № 580, дата вступления в силу: 28.12.1998",
    },
    body: {
      uz: "Bosh korxona va uning sho'ba jamiyatlarining moliyaviy hisobotlarini yagona jamlangan (konsolidatsiyalashgan) hisobotga birlashtirish, ichki guruh operatsiyalarini chiqarib tashlash tartibini belgilaydi.",
      ru: "Определяет порядок объединения финансовой отчётности головного предприятия и его дочерних обществ в единый консолидированный отчёт с исключением внутригрупповых операций.",
    },
  },
  {
    id: "bhms9",
    code: { uz: "9-son BHMS (BHMS 9)", ru: "НСБУ № 9" },
    title: {
      uz: "Pul oqimi to'g'risidagi hisobot",
      ru: "Отчёт о движении денежных средств",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 04.11.1998 y. ro'yxat raqami 519, kuchga kirish sanasi: 04.11.1998",
      ru: "МФ РУз: от 04.11.1998 г. рег. № 519, дата вступления в силу: 04.11.1998",
    },
    body: {
      uz: "Pul mablag'larining uchta asosiy yo'nalish — operatsion, investitsion va moliyaviy faoliyat bo'yicha kelib tushishi va sarflanishi to'g'risidagi hisobotni (4-son shakl) shakllantirish tartibi.",
      ru: "Порядок формирования отчёта о движении денежных средств (форма № 4) по трём основным направлениям: операционной, инвестиционной и финансовой деятельности.",
    },
  },
  {
    id: "bhms10",
    code: { uz: "10-son BHMS (BHMS 10)", ru: "НСБУ № 10" },
    title: {
      uz: "Davlat subsidiyalarining hisobi va davlat yordami bo'yicha ko'rsatiladigan ma'lumotlar",
      ru: "Учёт государственных субсидий и раскрытие информации о государственной помощи",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 03.12.1998 y. ro'yxat raqami 562, kuchga kirish sanasi: 03.12.1998",
      ru: "МФ РУз: от 03.12.1998 г. рег. № 562, дата вступления в силу: 03.12.1998",
    },
    body: {
      uz: "Davlat tomonidan berilgan grantlar, subsidiyalar va subvensiyalarni maqsadli moliyalashtirish (8850) sifatida va shartlar bajarilgach, daromadga (9380) o'tkazish tartibini belgilaydi.",
      ru: "Устанавливает порядок отражения государственных грантов, субсидий и субвенций как целевого финансирования (8850) и их списания на доходы (9380) по мере выполнения условий.",
    },
  },
  {
    id: "bhms11",
    code: { uz: "11-son BHMS (BHMS 11)", ru: "НСБУ № 11" },
    title: {
      uz: "Ilmiy-tadqiqot va tajriba-konstruktorlik ishlab chiqishlarga xarajatlar",
      ru: "Затраты на научно-исследовательские и опытно-конструкторские работы",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 28.12.1998 y. ro'yxat raqami 581, kuchga kirish sanasi: 28.12.1998",
      ru: "МФ РУз: от 28.12.1998 г. рег. № 581, дата вступления в силу: 28.12.1998",
    },
    body: {
      uz: "Ilmiy-tadqiqot (tadqiqot bosqichi) xarajatlarini darhol davr xarajatlariga olib borish, muvaffaqiyatli tajriba-konstruktorlik ishlarini esa aktiv sifatida kapitallashtirish mezonlari.",
      ru: "Критерии отнесения научно-исследовательских затрат на расходы периода и капитализации успешных опытно-конструкторских разработок в качестве нематериального актива.",
    },
  },
  {
    id: "bhms12",
    code: { uz: "12-son BHMS (BHMS 12)", ru: "НСБУ № 12" },
    title: {
      uz: "Moliyaviy sarmoyalarni hisobga olish",
      ru: "Учёт финансовых инвестиций",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 16.01.1999 y. ro'yxat raqami 596, kuchga kirish sanasi: 16.01.1999",
      ru: "МФ РУз: от 16.01.1999 г. рег. № 596, дата вступления в силу: 16.01.1999",
    },
    body: {
      uz: "Qisqa va uzoq muddatli moliyaviy investitsiyalar (aktsiyalar, obligatsiyalar, ustav kapitalidagi ulushlar)ni xarid qilish, baholash va ular bo'yicha dividend va foizlarni hisobga olish tartibi.",
      ru: "Порядок приобретения, оценки и учёта краткосрочных и долгосрочных финансовых инвестиций (акций, облигаций, долей в уставном капитале), а также дивидендов и процентов по ним.",
    },
  },
  {
    id: "bhms14",
    code: { uz: "14-son BHMS (BHMS 14)", ru: "НСБУ № 14" },
    title: {
      uz: "Xususiy kapital to'g'risida hisobot",
      ru: "Отчёт о собственном капитале",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 07.04.2004 y. ro'yxat raqami 1335, kuchga kirish sanasi: 17.04.2004",
      ru: "Приказ МФ РУз: от 07.04.2004 г. рег. № 1335, дата вступления в силу: 17.04.2004",
    },
    body: {
      uz: "Xususiy kapital tarkibi: ustav kapitali (8330), qo'shilgan kapital (8410), rezerv kapitali (8520) va taqsimlanmagan foyda (8710) harakati to'g'risidagi hisobotni (5-son shakl) tuzish tartibi.",
      ru: "Порядок составления отчёта о собственном капитале (форма № 5): динамика уставного (8330), добавленного (8410), резервного (8520) капитала и нераспределённой прибыли (8710).",
    },
  },
  {
    id: "bhms15",
    code: { uz: "15-son BHMS (BHMS 15)", ru: "НСБУ № 15" },
    title: {
      uz: "Buxgalteriya balansi",
      ru: "Бухгалтерский баланс",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 20.03.2003 y. ro'yxat raqami 1226, kuchga kirish sanasi: 30.03.2003",
      ru: "Приказ МФ РУз: от 20.03.2003 г. рег. № 1226, дата вступления в силу: 30.03.2003",
    },
    body: {
      uz: "Buxgalteriya balansini (1-son shakl) tuzish, aktivlar va majburiyatlarni uzoq muddatli (uzoq muddatli aktivlar/majburiyatlar) va joriy (joriy aktivlar/majburiyatlar)ga ajratish qoidalari.",
      ru: "Правила составления бухгалтерского баланса (форма № 1), группировки активов и обязательств на долгосрочные и текущие (краткосрочные).",
    },
  },
  {
    id: "bhms16",
    code: { uz: "16-son BHMS (BHMS 16)", ru: "НСБУ № 16" },
    title: {
      uz: "Buxgalteriya balansi tuzilgan sanadan keyingi xo'jalik faoliyatining nazarda tutilmagan holatlari va yuz beradigan hodisalari",
      ru: "Непредвиденные обстоятельства и события, происшедшие после даты составления бухгалтерского баланса",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 23.12.1998 y. ro'yxat raqami 578, kuchga kirish sanasi: 23.12.1998",
      ru: "МФ РУз: от 23.12.1998 г. рег. № 578, дата вступления в силу: 23.12.1998",
    },
    body: {
      uz: "Hisobot yili tugagandan so'ng, lekin balans tasdiqlanguncha sodir bo'lgan hodisalarni (tuzatish kiritiladigan va tuzatish kiritilmaydigan hodisalar) moliyaviy hisobotda yoritish qoidalari.",
      ru: "Правила отражения в финансовой отчётности событий, произошедших после окончания отчётного года, но до утверждения баланса (корректирующие и некорректирующие события).",
    },
  },
  {
    id: "bhms17",
    code: { uz: "17-son BHMS (BHMS 17)", ru: "НСБУ № 17" },
    title: {
      uz: "Kapital qurilishga oid pudrat shartnomalari",
      ru: "Договоры подряда на капитальное строительство",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 23.12.1998 y. ro'yxat raqami 579, kuchga kirish sanasi: 23.12.1998",
      ru: "МФ РУз: от 23.12.1998 г. рег. № 579, дата вступления в силу: 23.12.1998",
    },
    body: {
      uz: "Kapital qurilish sohasida pudratchi va buyurtmachi o'rtasidagi daromad va xarajatlarni tayyorlik darajasi usuli (foiz bajarilish) bo'yicha tan olish va hisobga olish tartibi.",
      ru: "Порядок признания доходов и расходов подрядчика и заказчика в сфере капитального строительства по методу процента готовности объектов.",
    },
  },
  {
    id: "bhms19",
    code: { uz: "19-son BHMS (BHMS 19)", ru: "НСБУ № 19" },
    title: {
      uz: "Inventarizatsiyani tashkil etish va o'tkazish",
      ru: "Организация и проведение инвентаризации",
    },
    regInfo: {
      uz: "O'zR Moliya vazirligi: 02.11.1999 y. ro'yxat raqami 833, kuchga kirish sanasi: 02.11.1999",
      ru: "МФ РУз: от 02.11.1999 г. рег. № 833, дата вступления в силу: 02.11.1999",
    },
    body: {
      uz: "Mulk va majburiyatlarni inventarizatsiya qilish muddatlari, komissiya ishi, solishtirma qaydnomalar va aniqlangan kamomad yoki ortiqchalarni (5910/4730/9380) hisobda aks ettirish tartibi.",
      ru: "Сроки проведения инвентаризации имущества и обязательств, порядок работы комиссии, составление сличительных ведомостей и отражение недостач/излишков (5910/4730/9380).",
    },
  },
  {
    id: "bhms20",
    code: { uz: "20-son BHMS (BHMS 20)", ru: "НСБУ № 20" },
    title: {
      uz: "Kichik tadbirkorlik subyektlari tomonidan buxgalteriya hisobini yuritishning soddalashtirilgan tartibi",
      ru: "Упрощённый порядок ведения бухгалтерского учёта субъектами малого предпринимательства",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 14.08.2013 y. ro'yxat raqami 2501, kuchga kirish sanasi: 19.08.2013",
      ru: "Приказ МФ РУз: от 14.08.2013 г. рег. № 2501, дата вступления в силу: 19.08.2013",
    },
    body: {
      uz: "Kichik biznes va mikrofirmalar uchun soddalashtirilgan hisob registrlar (daftarlar), ikki tomonlama soddalashtirilgan pravodkalar va qisqartirilgan yillik moliyaviy hisobot tuzish qoidalari.",
      ru: "Упрощённый порядок ведения регистров бухучёта, упрощённые системы проводок и правила составления сокращённой годовой отчётности для субъектов малого бизнеса.",
    },
  },
  {
    id: "bhms21",
    code: { uz: "21-son BHMS (BHMS 21)", ru: "НСБУ № 21" },
    title: {
      uz: "Xo'jalik yurituvchi subyektlarning moliya-xo'jalik faoliyati buxgalteriya hisobi hisoblar rejasi va uni qo'llash bo'yicha yo'riqnoma",
      ru: "План счетов бухгалтерского учёта финансово-хозяйственной деятельности хозяйствующих субъектов и инструкция по его применению",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 23.10.2002 y. ro'yxat raqami 1181, kuchga kirish sanasi: 02.11.2002",
      ru: "Приказ МФ РУз: от 23.10.2002 г. рег. № 1181, дата вступления в силу: 02.11.2002",
    },
    body: {
      uz: "Barcha 4 xonali schyotlar (0100-9900), ularning debet/kredit qoldiqlari, tipik pravodkalar va qo'llanilishining to'liq yo'riqnomasi. Barcha buxgalteriya pravodkalarining yagona manbai.",
      ru: "Полный состав 4-значных счетов (0100–9900), их дебетовые и кредитовые обороты, типовые проводки и инструкция по применению. Единый источник всех бухгалтерских проводок.",
    },
  },
  {
    id: "bhms22",
    code: { uz: "22-son BHMS (BHMS 22)", ru: "НСБУ № 22" },
    title: {
      uz: "Chet el valyutasida ifodalangan aktivlar va majburiyatlarning hisobi",
      ru: "Учёт активов и обязательств, выраженных в иностранной валюте",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 21.05.2004 y. ro'yxat raqami 1364, kuchga kirish sanasi: 31.05.2004",
      ru: "Приказ МФ РУз: от 21.05.2004 г. рег. № 1364, дата вступления в силу: 31.05.2004",
    },
    body: {
      uz: "Valyuta hisobvaraqlaridagi pullar, valyutadagi debitor va kredit qarzdorlikni MB kursi bo'yicha baholash hamda kurs farqini (9540 musbat kurs farqi daromadi, 9640 salbiy kurs farqi xarajati) aks ettirish.",
      ru: "Оценка средств на валютных счетах, валютной дебиторской и кредиторской задолженности по курсу ЦБ и отражение курсовых разниц (9540 доход от курсовой разницы, 9640 расход).",
    },
  },
  {
    id: "bhms23",
    code: { uz: "23-son BHMS (BHMS 23)", ru: "НСБУ № 23" },
    title: {
      uz: "Qayta tashkil etishni amalga oshirishda moliyaviy hisobotni shakllantirish",
      ru: "Формирование финансовой отчётности при осуществлении реорганизации",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 27.06.2005 y. ro'yxat raqami 1484, kuchga kirish sanasi: 07.07.2005",
      ru: "Приказ МФ РУз: от 27.06.2005 г. рег. № 1484, дата вступления в силу: 07.07.2005",
    },
    body: {
      uz: "Korxona qo'shilish, ajralib chiqish, bo'linish va qayta tuzilish orqali qayta tashkil etilganda topshirish dalolatnomasi, bo'lish balansi va moliyaviy hisobotlarni tuzish tartibi.",
      ru: "Порядок составления передаточных актов, разделительных балансов и финансовой отчётности при реорганизации (слияние, присоединение, разделение, выделение, преобразование).",
    },
  },
  {
    id: "bhms24",
    code: { uz: "24-son BHMS (BHMS 24)", ru: "НСБУ № 24" },
    title: {
      uz: "Qarzlar bo'yicha xarajatlar hisobi",
      ru: "Учёт затрат по займам",
    },
    regInfo: {
      uz: "O'zR Moliya vazirining buyrug'i: 18.08.2009 y. ro'yxat raqami 1996, kuchga kirish sanasi: 28.08.2009",
      ru: "Приказ МФ РУз: от 18.08.2009 г. рег. № 1996, дата вступления в силу: 28.08.2009",
    },
    body: {
      uz: "Olingan bank kreditlari va qarzlar bo'yicha foiz xarajatlarini (9610) davr xarajatlariga olib borish yoki malakali aktivlar (masalan, qurilayotgan bino) tannarxiga kapitallashtirish qoidalari.",
      ru: "Правила отнесения процентных расходов по банковским кредитам и займам (9610) на расходы периода или капитализации в стоимость квалифицируемых активов (например, строящееся здание).",
    },
  },
];

export const LAWS: RefItem[] = [
  {
    id: "law-buxg",
    code: {
      uz: "O'zR \"Buxgalteriya hisobi to'g'risida\"gi Qonuni",
      ru: "Закон РУз «О бухгалтерском учёте»",
    },
    regInfo: {
      uz: "Qonun hujjatlari manbai: O'RQ-404-son (yangi tahriri), 13.04.2016 y.",
      ru: "Источник: ЗРУ-404 (новая редакция), от 13.04.2016 г.",
    },
    title: {
      uz: "Tegishli moddalar: 6, 7, 9, 10, 11, 14, 16, 28-moddalar",
      ru: "Соответствующие статьи: 6, 7, 9, 10, 11, 14, 16, 28",
    },
    articles: {
      uz: "6, 7, 9, 10, 11, 14, 16, 28-moddalar",
      ru: "Статьи 6, 7, 9, 10, 11, 14, 16, 28",
    },
    body: {
      uz: "• 6-modda: Buxgalteriya hisobini tashkil etish va yuritish bo'yicha rahbarning majburiyati.\n• 7-modda: Bosh buxgalterning huquqlari, majburiyatlari va imzo huquqi.\n• 9-modda: Birlamchi hisob hujjatlarining zarur rekvizitlari va tuzilish tartibi.\n• 10-modda: Hisob registrlari va elektron hujjat aylanishi.\n• 11-modda: Ikki yoqlama yozuv prinsipi asosida hisob yuritish.\n• 14-modda: Aktivlar va majburiyatlarni inventarizatsiya qilish majburiyati.\n• 16-modda: Yillik moliyaviy hisobot tarkibi va topshirish muddatlari.\n• 28-modda: Buxgalteriya hujjatlarini kamida 5 yil davomida saqlash majburiyati.",
      ru: "• Статья 6: Обязанность руководителя по организации и ведению бухучёта.\n• Статья 7: Права, обязанности и право подписи главного бухгалтера.\n• Статья 9: Обязательные реквизиты и порядок составления первичных учётных документов.\n• Статья 10: Ведение регистров бухучёта и электронный документооборот.\n• Статья 11: Ведение учёта на основе принципа двойной записи.\n• Статья 14: Обязательность инвентаризации активов и обязательств.\n• Статья 16: Состав годовой финансовой отчётности и сроки сдачи.\n• Статья 28: Хранение бухгалтерских документов не менее 5 лет.",
    },
  },
  {
    id: "law-nk",
    code: {
      uz: "O'zbekiston Respublikasi Soliq kodeksi",
      ru: "Налоговый кодекс Республики Узбекистан",
    },
    regInfo: {
      uz: "Soliq Kodeksi (yangi tahriri), O'RQ-599-son, 30.12.2019 y.",
      ru: "Налоговый кодекс (новая редакция), ЗРУ-599, от 30.12.2019 г.",
    },
    title: {
      uz: "Tegishli moddalar: 130-132, 237-269, 305-317, 365-381, 403-408-moddalar",
      ru: "Соответствующие статьи: 130-132, 237-269, 305-317, 365-381, 403-408",
    },
    articles: {
      uz: "130-132, 237-269, 305-317, 365-381, 403-408-moddalar",
      ru: "Статьи 130-132, 237-269, 305-317, 365-381, 403-408",
    },
    body: {
      uz: "• 130-132-moddalar: Soliq hisobi, soliq hisob siyosati va daromad/xarajatlarni tan olish.\n• 237-269-moddalar: QQS stavkasi (12%), soliq solinadigan baza, hisob-fakturalar va hisobga olish (4410/6410).\n• 305-317-moddalar: Foyda solig'i bo'yicha chegiriladigan va chegirilmaydigan xarajatlar tasnifi.\n• 365-381-moddalar: JSHDS (12%) ushlab qolish va foydalanilgan imtiyozlar.\n• 403-408-moddalar: Ijtimoiy soliq (12%) hisoblash va mehnatga haq to'lash fondidan to'lash.",
      ru: "• Статьи 130-132: Налоговый учёт, налоговая политика и признание доходов/расходов.\n• Статьи 237-269: Ставка НДС (12%), облагаемая база, счета-фактуры и зачёт (4410/6410).\n• Статьи 305-317: Вычитаемые и невычитаемые расходы по налогу на прибыль.\n• Статьи 365-381: Удержание НДФЛ (12%) и применение льгот.\n• Статьи 403-408: Расчёт и уплата социального налога (12%) с фонда оплаты труда.",
    },
  },
  {
    id: "law-mehnat",
    code: {
      uz: "O'zbekiston Respublikasi Mehnat kodeksi",
      ru: "Трудовой кодекс Республики Узбекистан",
    },
    regInfo: {
      uz: "Mehnat Kodeksi (yangi tahriri), O'RQ-798-son, 28.10.2022 y.",
      ru: "Трудовой кодекс (новая редакция), ЗРУ-798, от 28.10.2022 г.",
    },
    title: {
      uz: "Tegishli moddalar: 243-269, 337-348-moddalar",
      ru: "Соответствующие статьи: 243-269, 337-348",
    },
    articles: {
      uz: "243-269, 337-348-moddalar",
      ru: "Статьи 243-269, 337-348",
    },
    body: {
      uz: "• 243-256-moddalar: Mehnatga haq to'lash tizimlari, tungi va bayram kunlaridagi ish uchun to'lovlar.\n• 253-modda: Ish haqi to'lash muddatlari (oyda kamida 2 marta).\n• 269-modda: Ish haqidan ushlab qolish tartibi va 50%lik maksimal cheklov.\n• 337-348-moddalar: Xodimning moddiy javobgarligi va etkazilgan zararni qoplash (4730 schyot).",
      ru: "• Статьи 243-256: Системы оплаты труда, оплата за работу в ночное время и праздничные дни.\n• Статья 253: Сроки выплаты заработной платы (не реже 2 раз в месяц).\n• Статья 269: Порядок и пределы удержаний из зарплаты (не более 50%).\n• Статьи 337-348: Материальная ответственность работника и возмещение ущерба (счёт 4730).",
    },
  },
  {
    id: "law-fk",
    code: {
      uz: "O'zbekiston Respublikasi Fuqarolik kodeksi",
      ru: "Гражданский кодекс Республики Узбекистан",
    },
    regInfo: {
      uz: "Fuqarolik kodeksi, 29.08.1996 y. N 256-I (yangilangan)",
      ru: "Гражданский кодекс, от 29.08.1996 г. № 256-I (с изм.)",
    },
    title: {
      uz: "Tegishli moddalar: 353-385, 386-424, 631-655, 732-758-moddalar",
      ru: "Соответствующие статьи: 353-385, 386-424, 631-655, 732-758",
    },
    articles: {
      uz: "353-385, 386-424, 631-655, 732-758-moddalar",
      ru: "Статьи 353-385, 386-424, 631-655, 732-758",
    },
    body: {
      uz: "• 353-385-moddalar: Shartnoma tuzish, majburiyatlarning bajarilishi va neustoykalar.\n• 386-424-moddalar: Oldi-sotdi shartnomalari va mulk huquqining xaridorga o'tishi.\n• 631-655-moddalar: Pudrat shartnomasi bo'yicha ishlarni bajarish va topshirish.\n• 732-758-moddalar: Qarz va kredit shartnomalari, foizlar hisoblash tartibi.",
      ru: "• Статьи 353-385: Заключение договора, исполнение обязательств и неустойка.\n• Статьи 386-424: Договор купли-продажи и переход права собственности.\n• Статьи 631-655: Выполнение и сдача работ по договору подряда.\n• Статьи 732-758: Договоры займа и кредита, порядок начисления процентов.",
    },
  },
  {
    id: "law-kassa",
    code: {
      uz: "Naqd pul bilan ishlash va kassa operatsiyalari qoidalari",
      ru: "Правила ведения кассовых операций",
    },
    regInfo: {
      uz: "Adliya vazirligi tomonidan ro'yxatdan o'tkazilgan: 24.01.1999 y. N 565",
      ru: "Зарегистрировано Минюстом: от 24.01.1999 г. № 565",
    },
    title: {
      uz: "Tegishli bandlar: 1, 4, 8, 12, 18, 22, 27, 34-bandlar",
      ru: "Соответствующие пункты: 1, 4, 8, 12, 18, 22, 27, 34",
    },
    articles: {
      uz: "1-45-bandlar",
      ru: "Пункты 1-45",
    },
    body: {
      uz: "• 1-4-bandlar: Kassa xonasini jihozlash va kassir bilan to'liq moddiy javobgarlik shartnomasi tuzish.\n• 8-12-bandlar: Kirim (KO-1) va Chiqim (KO-2) kassa orderlarini tuzish.\n• 18-22-bandlar: Kassa kitobini (KO-4) yuritish va sahifalarni muhrlash.\n• 27-34-bandlar: Hisobdor shaxslarga naqd pul berish va bo'nak hisobotini (avansovyy otchyot) 3 kun ichida topshirish.",
      ru: "• Пункты 1-4: Оборудование кассы и заключение договора о полной мат. ответственности с кассиром.\n• Пункты 8-12: Оформление Приходных (КО-1) и Расходных (КО-2) кассовых ордеров.\n• Пункты 18-22: Ведение и опечатывание кассовой книги (КО-4).\n• Пункты 27-34: Выдача наличных подотчётным лицам и сдача авансового отчёта в течение 3 дней.",
    },
  },
  {
    id: "law-inv",
    code: {
      uz: "Inventarizatsiyani tashkil etish va o'tkazish qoidalari",
      ru: "Правила организации и проведения инвентаризации",
    },
    regInfo: {
      uz: "19-son BHMS, AV ro'yxat raqami 833, 02.11.1999 y.",
      ru: "НСБУ № 19, Рег. № 833 от 02.11.1999 г.",
    },
    title: {
      uz: "Tegishli bandlar: 1.3, 1.8, 2.4, 3.1, 4.2-bandlar",
      ru: "Соответствующие пункты: 1.3, 1.8, 2.4, 3.1, 4.2",
    },
    articles: {
      uz: "1.3, 1.8, 2.4, 3.1, 4.2-bandlar",
      ru: "Пункты 1.3, 1.8, 2.4, 3.1, 4.2",
    },
    body: {
      uz: "• 1.3-band: Majburiy inventarizatsiya hollari (yillik hisobot oldidan, moddiy javobgar shaxs almashganda, kamomad yoki qayta tashkil etishda).\n• 2.4-band: Inventarizatsiya komissiyasini shakllantirish buyrug'i.\n• 3.1-band: TMZ va asosiy vositalarni haqiqiy sanoqdan o'tkazish va ro'yxat tuzish.\n• 4.2-band: Solishtirma qaydnoma tuzish, kamomad (5910 -> 4730/9430) va ortiqchani (9380) hisobga olish.",
      ru: "• Пункт 1.3: Обязательные случаи проведения инвентаризации (перед годовой отчётностью, при смене МОЛ, выявление недостач, реорганизация).\n• Пункт 2.4: Приказ о формировании инвентаризационной комиссии.\n• Пункт 3.1: Фактический пересчёт и опись остатков ТМЗ и основных средств.\n• Пункт 4.2: Составление сличительной ведомости, удержание недостач (5910 -> 4730/9430) и оприходование излишков (9380).",
    },
  },
];

export const REF_MAP: Record<string, RefItem> = Object.fromEntries(
  [...STANDARDS, ...LAWS].map((r) => [r.id, r]),
);