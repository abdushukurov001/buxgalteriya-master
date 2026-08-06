export type AccountKind = "active" | "passive" | "contra-active" | "expense" | "income";

export type Account = {
  code: string;
  name: { uz: string; ru: string };
  kind: AccountKind;
  note: { uz: string; ru: string };
};

/** O'zbekiston Respublikasi buxgalteriya hisobi schyotlar rejasi (asosiy schyotlar). */
export const ACCOUNTS: Account[] = [
  {
    code: "0130",
    name: { uz: "Asosiy vositalar (mashinalar va uskunalar)", ru: "Основные средства (машины и оборудование)" },
    kind: "active",
    note: {
      uz: "Bino, uskuna, transport kabi uzoq muddatli aktivlar boshlang'ich qiymatda yuritiladi (0110 — binolar, 0120 — inshootlar, 0130 — mashinalar, 0140 — transport, 0150 — mebel va jihozlar, 0160 — ko'p yillik daraxtlar, 0170 — ishchi va mahsuldor hayvonlar, 0190 — boshqa AV). Kirim — debet, chiqim — kredit.",
      ru: "Здания, оборудование, транспорт учитываются по первоначальной стоимости (0110 — здания, 0120 — сооружения, 0130 — машины, 0140 — транспорт, 0150 — мебель, 0160 — многолетние насаждения, 0170 — рабочий скот, 0190 — прочие ОС). Поступление — дебет, выбытие — кредит.",
    },
  },
  {
    code: "0230",
    name: { uz: "Asosiy vositalar eskirishi (amortizatsiya)", ru: "Износ основных средств (амортизация)" },
    kind: "contra-active",
    note: {
      uz: "Kontr-aktiv (passiv xarakterli) schyot (0210 — binolar eskirishi, 0220 — inshootlar, 0230 — mashinalar, 0240 — transport, 0250 — mebel, 0290 — boshqa AV eskirishi): eskirish hisoblanganda kreditlanadi, aktiv chiqib ketganda debetlanadi.",
      ru: "Контр-активный (пассивный по характеру) счёт (0210 — износ зданий, 0220 — сооружений, 0230 — машин, 0240 — транспорта, 0250 — мебели, 0290 — прочих ОС): начисление износа — кредит, списание при выбытии — дебет.",
    },
  },
  {
    code: "0710",
    name: { uz: "Tugallanmagan qurilish", ru: "Незавершённое строительство" },
    kind: "active",
    note: {
      uz: "Qurilish jarayonidagi obyektga to'plangan xarajatlar. Obyekt ishga tushganda 0130 ga o'tkaziladi.",
      ru: "Накопленные затраты по строящемуся объекту. При вводе объект переносится на 0130.",
    },
  },
  {
    code: "0720",
    name: { uz: "O'rnatiladigan uskunalar", ru: "Оборудование к установке" },
    kind: "active",
    note: {
      uz: "Sotib olingan, lekin hali o'rnatilmagan uskunalar. O'rnatilgach 0130 ga o'tadi.",
      ru: "Приобретённое, но ещё не смонтированное оборудование. После монтажа переходит на 0130.",
    },
  },
  {
    code: "0820",
    name: { uz: "Uzoq muddatli aktivlarni sotib olish (kapital qo'yilmalar)", ru: "Приобретение долгосрочных активов (капвложения)" },
    kind: "active",
    note: {
      uz: "Aktiv foydalanishga tayyor bo'lgunga qadar barcha xarajatlar shu yerda to'planadi.",
      ru: "Здесь накапливаются все затраты до момента готовности актива к использованию.",
    },
  },
  {
    code: "1010",
    name: { uz: "Xomashyo va materiallar", ru: "Сырьё и материалы" },
    kind: "active",
    note: {
      uz: "Ishlab chiqarishga sarflanadigan zaxiralar. Kirim — debet, sarf — kredit.",
      ru: "Запасы для производства. Поступление — дебет, расход — кредит.",
    },
  },
  {
    code: "1080",
    name: { uz: "Boshqa materiallar (inventar, ehtiyot qismlar)", ru: "Прочие материалы (инвентарь, запчасти)" },
    kind: "active",
    note: {
      uz: "Asosiy vosita darajasiga yetmaydigan mayda inventar va materiallar.",
      ru: "Мелкий инвентарь и материалы, не достигающие критериев основных средств.",
    },
  },
  {
    code: "2010",
    name: { uz: "Asosiy ishlab chiqarish", ru: "Основное производство" },
    kind: "active",
    note: {
      uz: "Mahsulot tannarxini shakllantiruvchi kalkulyatsiya schyoti: xarajatlar debetda to'planadi.",
      ru: "Калькуляционный счёт себестоимости: затраты накапливаются по дебету.",
    },
  },
  {
    code: "2810",
    name: { uz: "Omberdagi tayyor mahsulot", ru: "Готовая продукция на складе" },
    kind: "active",
    note: {
      uz: "Ishlab chiqarilgan va sotishga tayyor mahsulot zaxirasi.",
      ru: "Запас изготовленной и готовой к продаже продукции.",
    },
  },
  {
    code: "2910",
    name: { uz: "Omberdagi tovarlar", ru: "Товары на складе" },
    kind: "active",
    note: {
      uz: "Qayta sotish uchun sotib olingan tovarlar. Sotilganda tannarx sifatida hisobdan chiqariladi.",
      ru: "Товары, купленные для перепродажи. При продаже списываются в себестоимость.",
    },
  },
  {
    code: "4010",
    name: { uz: "Xaridorlardan olinadigan schyotlar", ru: "Счета к получению от покупателей" },
    kind: "active",
    note: {
      uz: "Debitorlik qarzi: xaridor bizga qarzdor. Qarz paydo bo'lsa — debet, to'lansa — kredit.",
      ru: "Дебиторская задолженность: покупатель должен нам. Возникновение — дебет, погашение — кредит.",
    },
  },
  {
    code: "4210",
    name: { uz: "Xodimlarga berilgan avanslar (hisobdor summalar)", ru: "Авансы, выданные персоналу (подотчётные суммы)" },
    kind: "active",
    note: {
      uz: "Xodim hisobdor summani qaytarishi yoki hisobot berishi shart — shuning uchun bu debitorlik.",
      ru: "Работник обязан отчитаться или вернуть сумму — поэтому это дебиторка.",
    },
  },
  {
    code: "4310",
    name: { uz: "Ta'minotchilarga berilgan avanslar", ru: "Авансы, выданные поставщикам" },
    kind: "active",
    note: {
      uz: "Oldindan to'langan pul — ta'minotchi bizga tovar/xizmat qarzdor bo'lib qoladi.",
      ru: "Предоплата — поставщик остаётся должен нам товар/услугу.",
    },
  },
  {
    code: "4410",
    name: { uz: "Byudjetga to'langan avanslar (hisobga olinadigan QQS)", ru: "Авансовые платежи в бюджет (зачётный НДС)" },
    kind: "active",
    note: {
      uz: "Kirim QQS va boshqa avans soliq to'lovlari — kelajakda majburiyatdan hisobga olinadi.",
      ru: "Входящий НДС и авансовые налоговые платежи — в будущем зачитываются из обязательства.",
    },
  },
  {
    code: "4610",
    name: { uz: "Ta'sischilarning ustav kapitaliga ulush bo'yicha qarzi", ru: "Задолженность учредителей по вкладам в уставный капитал" },
    kind: "active",
    note: {
      uz: "Ta'sis hujjatida e'lon qilingan, lekin hali kiritilmagan ulush — ta'sischi qarzi.",
      ru: "Объявленный, но ещё не внесённый вклад — долг учредителя.",
    },
  },
  {
    code: "4730",
    name: { uz: "Xodimlarning moddiy zararni qoplash bo'yicha qarzi", ru: "Задолженность персонала по возмещению ущерба" },
    kind: "active",
    note: {
      uz: "Aybdor xodimga yuklangan kamomad summasi — u qoplab berishi kerak.",
      ru: "Сумма недостачи, отнесённая на виновное лицо — подлежит возмещению.",
    },
  },
  {
    code: "5010",
    name: { uz: "Kassa", ru: "Касса" },
    kind: "active",
    note: {
      uz: "Naqd pul. Kirim — debet, chiqim — kredit. Qoldiq faqat debet bo'ladi.",
      ru: "Наличные деньги. Приход — дебет, расход — кредит. Остаток только дебетовый.",
    },
  },
  {
    code: "5110",
    name: { uz: "Hisob-kitob (bank) schyoti", ru: "Расчётный счёт" },
    kind: "active",
    note: {
      uz: "Bankdagi milliy valyutadagi mablag'. Tushum — debet, to'lov — kredit.",
      ru: "Средства в банке в нацвалюте. Поступление — дебет, платёж — кредит.",
    },
  },
  {
    code: "5710",
    name: { uz: "Yo'ldagi pul o'tkazmalari", ru: "Денежные переводы в пути" },
    kind: "active",
    note: {
      uz: "Kassadan chiqqan, lekin bank hisobiga hali tushmagan pul (inkassatsiya).",
      ru: "Деньги, сданные из кассы, но ещё не зачисленные банком (инкассация).",
    },
  },
  {
    code: "5720",
    name: { uz: "Maxsus hisobvaraqlardagi pul (plastik/ekvayring)", ru: "Денежные средства на спецсчетах (карты/эквайринг)" },
    kind: "active",
    note: {
      uz: "To'lov terminali orqali tushgan, bank hisobiga o'tkazilishi kutilayotgan mablag'.",
      ru: "Средства, полученные через терминал и ожидающие зачисления на расчётный счёт.",
    },
  },
  {
    code: "5910",
    name: { uz: "Aniqlangan kamomad va qimmatliklar yo'qotilishi", ru: "Недостачи и потери ценностей" },
    kind: "active",
    note: {
      uz: "Tranzit (yig'uvchi) aktiv schyot: kamomad avval bu yerga yig'iladi, keyin aybdorga yoki xarajatga yopiladi.",
      ru: "Транзитный активный счёт: недостача сначала собирается здесь, затем относится на виновного или в расходы.",
    },
  },
  {
    code: "6010",
    name: { uz: "Ta'minotchilarga to'lanadigan schyotlar", ru: "Счета к оплате поставщикам" },
    kind: "passive",
    note: {
      uz: "Kreditorlik qarzi: biz ta'minotchiga qarzdormiz. Qarz oshsa — kredit, to'lansa — debet.",
      ru: "Кредиторская задолженность перед поставщиком. Рост — кредит, погашение — дебет.",
    },
  },
  {
    code: "6310",
    name: { uz: "Xaridorlardan olingan avanslar", ru: "Авансы, полученные от покупателей" },
    kind: "passive",
    note: {
      uz: "Oldindan olingan pul daromad emas, majburiyat: biz tovar/xizmat qarzdormiz.",
      ru: "Полученная предоплата — не доход, а обязательство поставить товар/услугу.",
    },
  },
  {
    code: "6410",
    name: { uz: "Byudjetga to'lanadigan soliqlar (QQS va b.)", ru: "Налоги к уплате в бюджет (НДС и др.)" },
    kind: "passive",
    note: {
      uz: "Soliq majburiyati: hisoblanganda kredit, hisobga olinganda yoki to'langanda debet.",
      ru: "Налоговое обязательство: начисление — кредит, зачёт или уплата — дебет.",
    },
  },
  {
    code: "6420",
    name: { uz: "Jismoniy shaxslardan ushlangan daromad solig'i", ru: "Удержанный НДФЛ" },
    kind: "passive",
    note: {
      uz: "Xodim daromadidan ushlangan soliq — korxona uni byudjetga o'tkazishi shart.",
      ru: "Налог, удержанный из дохода работника — предприятие обязано перечислить его в бюджет.",
    },
  },
  {
    code: "6520",
    name: { uz: "Ijtimoiy sug'urta (ijtimoiy soliq) bo'yicha to'lovlar", ru: "Расчёты по социальному страхованию (соцналог)" },
    kind: "passive",
    note: {
      uz: "Ish beruvchi hisoblaydigan majburiyat, xodim oyligidan ushlanmaydi — xarajatga kiradi.",
      ru: "Обязательство работодателя, не удерживается из зарплаты — включается в расходы.",
    },
  },
  {
    code: "6530",
    name: { uz: "Jamg'arib boriladigan pension badallari", ru: "Накопительные пенсионные взносы" },
    kind: "passive",
    note: {
      uz: "Xodimning shaxsiy jamg'arma hisobiga o'tkaziladigan majburiyat.",
      ru: "Обязательство к перечислению на индивидуальный накопительный счёт работника.",
    },
  },
  {
    code: "6710",
    name: { uz: "Xodimlar bilan mehnat haqi bo'yicha hisob-kitob", ru: "Расчёты с персоналом по оплате труда" },
    kind: "passive",
    note: {
      uz: "Hisoblangan oylik — kredit (majburiyat oshdi), to'langan yoki ushlangan summa — debet.",
      ru: "Начисленная зарплата — кредит, выплата или удержание — дебет.",
    },
  },
  {
    code: "6980",
    name: { uz: "Boshqa majburiyatlar (deponentlangan mehnat haqi)", ru: "Прочие обязательства (депонированная зарплата)" },
    kind: "passive",
    note: {
      uz: "Belgilangan muddatda olinmagan oylik shu yerga o'tkaziladi.",
      ru: "Не полученная в срок зарплата переносится сюда.",
    },
  },
  {
    code: "8330",
    name: { uz: "Ustav kapitali", ru: "Уставный капитал" },
    kind: "passive",
    note: {
      uz: "Egalar oldidagi majburiyat — ta'sis hujjatidagi e'lon qilingan kapital.",
      ru: "Обязательство перед собственниками — объявленный в уставе капитал.",
    },
  },
  {
    code: "9020",
    name: { uz: "Tovar va mahsulot sotishdan daromad", ru: "Доход от реализации товаров и продукции" },
    kind: "income",
    note: {
      uz: "Daromad schyoti passiv xarakterli: daromad kreditga yoziladi.",
      ru: "Счёт дохода пассивный по характеру: доход отражается по кредиту.",
    },
  },
  {
    code: "9120",
    name: { uz: "Sotilgan tovarlarning tannarxi", ru: "Себестоимость реализованных товаров" },
    kind: "expense",
    note: {
      uz: "Xarajat schyoti aktiv xarakterli: xarajat debetga yoziladi.",
      ru: "Счёт расходов активный по характеру: расход отражается по дебету.",
    },
  },
  {
    code: "9420",
    name: { uz: "Ma'muriy xarajatlar", ru: "Административные расходы" },
    kind: "expense",
    note: {
      uz: "Boshqaruv apparati bilan bog'liq davr xarajatlari, tannarxga kirmaydi.",
      ru: "Расходы периода на управление, в себестоимость не включаются.",
    },
  },
  {
    code: "9430",
    name: { uz: "Boshqa operatsion xarajatlar", ru: "Прочие операционные расходы" },
    kind: "expense",
    note: {
      uz: "Bank komissiyasi, kamomad, jarima kabi asosiy faoliyatdan tashqari xarajatlar.",
      ru: "Банковская комиссия, недостачи, штрафы и прочие расходы вне основной деятельности.",
    },
  },
  {
    code: "9910",
    name: { uz: "Yakuniy moliyaviy natija", ru: "Конечный финансовый результат" },
    kind: "passive",
    note: {
      uz: "Yil oxirida barcha daromad va xarajat schyotlari shu yerga yopiladi.",
      ru: "В конце периода все счета доходов и расходов закрываются сюда.",
    },
  },
];

export const ACCOUNT_MAP: Record<string, Account> = Object.fromEntries(
  ACCOUNTS.map((a) => [a.code, a]),
);

export function isActiveKind(kind: AccountKind) {
  return kind === "active" || kind === "expense";
}