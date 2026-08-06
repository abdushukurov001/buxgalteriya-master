export type L = { uz: string; ru: string };

export type Entry = {
  id: string;
  dt: string;
  kt: string;
  op: L;
  why: L;
  ref?: string; // reference item id (BHMS / qonun)
};

export type Module = {
  id: number;
  title: L;
  summary: L;
  accounts: string[];
  entries: Entry[];
};

export const MODULES: Module[] = [
  {
    id: 1,
    title: { uz: "Tashkil etish va ta'sis kapitali", ru: "Учреждение и уставный капитал" },
    summary: {
      uz: "Korxona tashkil etilishi, ustav kapitalining e'lon qilinishi va ta'sischilar ulushining kiritilishi.",
      ru: "Создание предприятия, объявление уставного капитала и внесение вкладов учредителями.",
    },
    accounts: ["4610", "8330", "5110", "0820", "1080", "1010", "01XX"],
    entries: [
      {
        id: "m1e1",
        dt: "4610",
        kt: "8330",
        op: {
          uz: "Ta'sis hujjatlariga muvofiq ustav kapitali e'lon qilindi va ta'sischilar qarzi qayd etildi.",
          ru: "Согласно учредительным документам объявлен уставный капитал и отражена задолженность учредителей.",
        },
        why: {
          uz: "4610 — aktiv schyot, ta'sischi qarzi (debitorlik) paydo bo'ldi, aktiv oshdi → debet. 8330 — passiv schyot, egalar oldidagi majburiyat oshdi → kredit.",
          ru: "4610 — активный счёт, возникла дебиторка учредителей, актив вырос → дебет. 8330 — пассивный, обязательство перед собственниками выросло → кредит.",
        },
        ref: "bhms21",
      },
      {
        id: "m1e2",
        dt: "5110",
        kt: "4610",
        op: {
          uz: "Ta'sischi o'z ulushini pul ko'rinishida hisob-kitob schyotiga o'tkazdi.",
          ru: "Учредитель внёс свою долю деньгами на расчётный счёт.",
        },
        why: {
          uz: "5110 aktiv — bankdagi pul oshdi → debet. 4610 ham aktiv, lekin ta'sischi qarzi yopildi, aktiv kamaydi → kredit.",
          ru: "5110 активный — деньги в банке выросли → дебет. 4610 тоже активный, но долг учредителя погашен, актив уменьшился → кредит.",
        },
        ref: "bhms21",
      },
      {
        id: "m1e3",
        dt: "0820",
        kt: "4610",
        op: {
          uz: "Ta'sischi ulushi sifatida uzoq muddatli aktiv (uskuna, transport) kiritildi — kapital qo'yilma sifatida qabul qilindi.",
          ru: "В качестве вклада учредителя внесён долгосрочный актив (оборудование, транспорт) — принят как капвложение.",
        },
        why: {
          uz: "0820 aktiv — aktivni olishga sarflangan qiymat to'plandi → debet. 4610 aktiv kamaydi (qarz yopildi) → kredit. Aktiv 01XX ga faqat foydalanishga tayyor bo'lganda o'tkaziladi.",
          ru: "0820 активный — накоплена стоимость приобретения актива → дебет. 4610 актив уменьшился (долг погашен) → кредит. На 01XX переносится только при готовности к использованию.",
        },
        ref: "bhms5",
      },
      {
        id: "m1e4",
        dt: "1080",
        kt: "4610",
        op: {
          uz: "Ta'sischi ulushi inventar va boshqa materiallar ko'rinishida kiritildi.",
          ru: "Вклад учредителя внесён инвентарём и прочими материалами.",
        },
        why: {
          uz: "1080 aktiv — ombordagi zaxira oshdi → debet. 4610 aktiv — ta'sischi qarzi kamaydi → kredit.",
          ru: "1080 активный — запасы выросли → дебет. 4610 активный — долг учредителя уменьшился → кредит.",
        },
        ref: "bhms4",
      },
      {
        id: "m1e5",
        dt: "1010",
        kt: "4610",
        op: {
          uz: "Ta'sischi ulushi xomashyo va materiallar bilan qoplandi.",
          ru: "Доля учредителя погашена сырьём и материалами.",
        },
        why: {
          uz: "1010 aktiv — material zaxirasi kirim qilindi → debet. 4610 aktiv kamaydi → kredit. Baholash BHMS 4 bo'yicha kelishilgan qiymatda.",
          ru: "1010 активный — материалы оприходованы → дебет. 4610 актив уменьшился → кредит. Оценка по согласованной стоимости, НСБУ 4.",
        },
        ref: "bhms4",
      },
    ],
  },
  {
    id: 2,
    title: { uz: "Asosiy vositalar", ru: "Основные средства" },
    summary: {
      uz: "Uzoq muddatli aktivlarni olish, qurish, ishga tushirish, eskirish va chiqarish hisobi.",
      ru: "Учёт приобретения, строительства, ввода, износа и выбытия долгосрочных активов.",
    },
    accounts: ["01XX", "02XX", "0710", "0720", "0820", "6010", "9420", "2010"],
    entries: [
      {
        id: "m2e1",
        dt: "01XX",
        kt: "0710",
        op: {
          uz: "Qurilishi tugagan obyekt asosiy vositalar tarkibiga qabul qilindi (ishga tushirildi).",
          ru: "Завершённый строительством объект принят в состав основных средств (введён в эксплуатацию).",
        },
        why: {
          uz: "Ikkalasi ham aktiv schyot: 01XX oshdi → debet, 0710 dagi to'plangan xarajat yopildi, ya'ni kamaydi → kredit. Bu qiymatning bir aktivdan boshqasiga ko'chishi.",
          ru: "Оба счёта активные: 01XX вырос → дебет, накопленные затраты на 0710 списаны → кредит. Это перенос стоимости из одного актива в другой.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e2",
        dt: "01XX",
        kt: "0720",
        op: {
          uz: "O'rnatilgan uskuna asosiy vositalar tarkibiga o'tkazildi.",
          ru: "Смонтированное оборудование переведено в состав основных средств.",
        },
        why: {
          uz: "01XX aktiv oshdi → debet; 0720 aktiv (o'rnatilishi kutilayotgan uskuna) kamaydi → kredit.",
          ru: "01XX актив вырос → дебет; 0720 (оборудование к установке) уменьшился → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e3",
        dt: "01XX",
        kt: "0820",
        op: {
          uz: "Sotib olingan asosiy vosita barcha xarajatlari bilan foydalanishga qabul qilindi.",
          ru: "Приобретённое основное средство со всеми затратами принято к эксплуатации.",
        },
        why: {
          uz: "0820 da to'plangan boshlang'ich qiymat (narx + tashish + o'rnatish) 01XX ga o'tadi: bir aktiv oshdi (debet), boshqasi yopildi (kredit).",
          ru: "Накопленная на 0820 первоначальная стоимость (цена + доставка + монтаж) переносится на 01XX: один актив вырос (дебет), другой закрыт (кредит).",
        },
        ref: "bhms5",
      },
      {
        id: "m2e4",
        dt: "9420",
        kt: "02XX",
        op: {
          uz: "Ma'muriy maqsadda ishlatiladigan asosiy vositalar bo'yicha oylik eskirish hisoblandi.",
          ru: "Начислен месячный износ по основным средствам административного назначения.",
        },
        why: {
          uz: "9420 xarajat (aktiv xarakterli) — xarajat oshdi → debet. 02XX kontr-aktiv (passiv xarakterli) — eskirish to'plandi → kredit. 01XX ning o'zi o'zgarmaydi.",
          ru: "9420 расход (активный по характеру) вырос → дебет. 02XX контр-активный — износ накоплен → кредит. Сам 01XX не меняется.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e5",
        dt: "2010",
        kt: "02XX",
        op: {
          uz: "Ishlab chiqarish uskunalari bo'yicha eskirish hisoblanib, mahsulot tannarxiga qo'shildi.",
          ru: "Начислен износ производственного оборудования с включением в себестоимость продукции.",
        },
        why: {
          uz: "2010 aktiv (kalkulyatsiya) — tannarx xarajati oshdi → debet. 02XX kontr-aktiv oshdi → kredit.",
          ru: "2010 активный (калькуляционный) — затраты выросли → дебет. 02XX контр-активный вырос → кредит.",
        },
        ref: "bhms4",
      },
      {
        id: "m2e6",
        dt: "0820",
        kt: "6010",
        op: {
          uz: "Ta'minotchidan asosiy vosita sotib olindi (QQSsiz qiymat kapital qo'yilmaga olindi).",
          ru: "У поставщика приобретено основное средство (стоимость без НДС отнесена на капвложения).",
        },
        why: {
          uz: "0820 aktiv oshdi → debet. 6010 passiv — ta'minotchi oldidagi qarz oshdi → kredit. Pul hali to'lanmagan, faqat majburiyat paydo bo'ldi.",
          ru: "0820 актив вырос → дебет. 6010 пассивный — долг перед поставщиком вырос → кредит. Деньги ещё не уплачены, возникло лишь обязательство.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e7",
        dt: "0710",
        kt: "6010",
        op: {
          uz: "Pudratchi bajargan qurilish-montaj ishlari tugallanmagan qurilish qiymatiga olindi.",
          ru: "Выполненные подрядчиком СМР отнесены на незавершённое строительство.",
        },
        why: {
          uz: "0710 aktiv — obyekt qiymati oshdi → debet. 6010 passiv — pudratchiga qarz oshdi → kredit.",
          ru: "0710 актив — стоимость объекта выросла → дебет. 6010 пассив — долг подрядчику вырос → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e8",
        dt: "0720",
        kt: "6010",
        op: {
          uz: "O'rnatishni talab qiladigan uskuna ta'minotchidan qabul qilindi.",
          ru: "От поставщика получено оборудование, требующее монтажа.",
        },
        why: {
          uz: "0720 aktiv oshdi → debet, 6010 passiv majburiyat oshdi → kredit. Uskuna hali asosiy vosita emas, chunki foydalanishga tayyor emas.",
          ru: "0720 актив вырос → дебет, 6010 обязательство выросло → кредит. Оборудование ещё не ОС, т.к. не готово к эксплуатации.",
        },
        ref: "bhms5",
      },
    ],
  },
  {
    id: 3,
    title: { uz: "TMZ va ta'minotchilar bilan hisob-kitob", ru: "ТМЗ и расчёты с поставщиками" },
    summary: {
      uz: "Tovar-moddiy zaxiralarni olish, kirim QQS, ta'minotchi qarzini yopish va ish haqi ustidan ijtimoiy soliq.",
      ru: "Поступление ТМЗ, входящий НДС, погашение долга поставщику и соцналог на оплату труда.",
    },
    accounts: ["2010", "2910", "6520", "9420", "6010", "4410", "4310", "5110"],
    entries: [
      {
        id: "m3e1",
        dt: "2010",
        kt: "6520",
        op: {
          uz: "Ishlab chiqarish xodimlarining mehnat haqidan ijtimoiy soliq hisoblanib, tannarxga kiritildi.",
          ru: "Начислен социальный налог с оплаты труда производственных рабочих и включён в себестоимость.",
        },
        why: {
          uz: "2010 aktiv — ishlab chiqarish xarajati oshdi → debet. 6520 passiv — davlat oldidagi majburiyat oshdi → kredit. Bu soliq xodim oyligidan ushlanmaydi, ish beruvchi xarajati.",
          ru: "2010 актив — затраты производства выросли → дебет. 6520 пассив — обязательство перед государством выросло → кредит. Это расход работодателя, а не удержание.",
        },
        ref: "law-nk",
      },
      {
        id: "m3e2",
        dt: "9420",
        kt: "6520",
        op: {
          uz: "Ma'muriy xodimlar mehnat haqidan ijtimoiy soliq hisoblandi.",
          ru: "Начислен социальный налог с оплаты труда административного персонала.",
        },
        why: {
          uz: "9420 xarajat oshdi → debet; 6520 passiv majburiyat oshdi → kredit. Farqi faqat xarajat qayerga tegishli ekanida.",
          ru: "9420 расход вырос → дебет; 6520 обязательство выросло → кредит. Отличие только в отнесении расхода.",
        },
        ref: "law-nk",
      },
      {
        id: "m3e3",
        dt: "2910",
        kt: "6010",
        op: {
          uz: "Ta'minotchidan qayta sotish uchun tovarlar QQSsiz qiymatda kirim qilindi.",
          ru: "От поставщика оприходованы товары для перепродажи по стоимости без НДС.",
        },
        why: {
          uz: "2910 aktiv — ombordagi tovar oshdi → debet. 6010 passiv — to'lanadigan qarz oshdi → kredit.",
          ru: "2910 актив — товары на складе выросли → дебет. 6010 пассив — задолженность к оплате выросла → кредит.",
        },
        ref: "bhms4",
      },
      {
        id: "m3e4",
        dt: "4410",
        kt: "6010",
        op: {
          uz: "Ta'minotchi hisob-fakturasidagi kirim QQS hisobga olish uchun aks ettirildi.",
          ru: "Отражён входящий НДС по счёту-фактуре поставщика для зачёта.",
        },
        why: {
          uz: "4410 aktiv — byudjetdan hisobga olinadigan huquq (aktiv) oshdi → debet. 6010 passiv — ta'minotchiga umumiy qarz QQS bilan birga oshdi → kredit. Kirim QQS tovar tannarxiga qo'shilmaydi.",
          ru: "4410 актив — право на зачёт выросло → дебет. 6010 пассив — общий долг поставщику вместе с НДС вырос → кредит. Входящий НДС в себестоимость не включается.",
        },
        ref: "law-nk",
      },
      {
        id: "m3e5",
        dt: "6010",
        kt: "4310",
        op: {
          uz: "Ilgari ta'minotchiga berilgan avans yetkazib berilgan tovar qarzi hisobiga o'tkazildi (o'zaro hisob-kitob).",
          ru: "Ранее выданный поставщику аванс зачтён в счёт задолженности за поставленный товар.",
        },
        why: {
          uz: "6010 passiv — qarz kamaydi → debet. 4310 aktiv — berilgan avans (debitorlik) yopildi, aktiv kamaydi → kredit.",
          ru: "6010 пассив — долг уменьшился → дебет. 4310 актив — выданный аванс закрыт, актив уменьшился → кредит.",
        },
        ref: "bhms21",
      },
      {
        id: "m3e6",
        dt: "6010",
        kt: "5110",
        op: {
          uz: "Ta'minotchiga qarz bank hisob-kitob schyotidan to'landi.",
          ru: "Задолженность поставщику погашена с расчётного счёта.",
        },
        why: {
          uz: "6010 passiv — majburiyat kamaydi → debet. 5110 aktiv — bankdagi pul kamaydi → kredit.",
          ru: "6010 пассив — обязательство уменьшилось → дебет. 5110 актив — деньги в банке уменьшились → кредит.",
        },
        ref: "bhms21",
      },
    ],
  },
  {
    id: 4,
    title: { uz: "Mehnat haqi va ijtimoiy sug'urta", ru: "Оплата труда и социальное страхование" },
    summary: {
      uz: "Oylikni hisoblash, soliq va badallarni ushlash, to'lash va deponentlash.",
      ru: "Начисление зарплаты, удержания налогов и взносов, выплата и депонирование.",
    },
    accounts: ["6710", "6420", "6530", "6520", "5110", "5010", "6980"],
    entries: [
      {
        id: "m4e1",
        dt: "6710",
        kt: "6420",
        op: {
          uz: "Xodim daromadidan jismoniy shaxslardan olinadigan daromad solig'i ushlab qolindi.",
          ru: "Из дохода работника удержан НДФЛ.",
        },
        why: {
          uz: "6710 passiv — xodimga to'lanadigan summa kamaydi → debet. 6420 passiv — byudjetga qarz paydo bo'ldi → kredit. Bu ushlab qolish, korxona xarajati emas.",
          ru: "6710 пассив — сумма к выплате работнику уменьшилась → дебет. 6420 пассив — возникло обязательство перед бюджетом → кредит. Это удержание, а не расход предприятия.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e2",
        dt: "6420",
        kt: "6530",
        op: {
          uz: "Ushlangan daromad solig'ining bir qismi xodimning jamg'arib boriladigan pension badaliga yo'naltirildi.",
          ru: "Часть удержанного НДФЛ направлена на накопительные пенсионные взносы работника.",
        },
        why: {
          uz: "Ikkala schyot ham passiv: 6420 bo'yicha byudjetga qarz kamaydi → debet, 6530 bo'yicha jamg'arma oldidagi qarz oshdi → kredit. Majburiyat bir kreditordan boshqasiga ko'chdi.",
          ru: "Оба счёта пассивные: долг по 6420 уменьшился → дебет, долг по 6530 вырос → кредит. Обязательство перешло от одного кредитора к другому.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e3",
        dt: "6420",
        kt: "5110",
        op: {
          uz: "Ushlangan daromad solig'i byudjetga bank orqali o'tkazildi.",
          ru: "Удержанный НДФЛ перечислен в бюджет с расчётного счёта.",
        },
        why: {
          uz: "6420 passiv — majburiyat yopildi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "6420 пассив — обязательство погашено → дебет. 5110 актив — деньги уменьшились → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e4",
        dt: "6530",
        kt: "5110",
        op: {
          uz: "Jamg'arib boriladigan pension badallari o'tkazildi.",
          ru: "Перечислены накопительные пенсионные взносы.",
        },
        why: {
          uz: "6530 passiv — majburiyat kamaydi → debet. 5110 aktiv — bank mablag'i kamaydi → kredit.",
          ru: "6530 пассив — обязательство уменьшилось → дебет. 5110 актив — средства уменьшились → кредит.",
        },
      },
      {
        id: "m4e5",
        dt: "6520",
        kt: "5110",
        op: {
          uz: "Ijtimoiy soliq byudjetga to'landi.",
          ru: "Социальный налог уплачен в бюджет.",
        },
        why: {
          uz: "6520 passiv — majburiyat kamaydi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "6520 пассив — обязательство уменьшилось → дебет. 5110 актив — деньги уменьшились → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e6",
        dt: "5010",
        kt: "5110",
        op: {
          uz: "Mehnat haqini naqd berish uchun bankdan kassaga pul olindi.",
          ru: "С расчётного счёта получены наличные в кассу для выплаты зарплаты.",
        },
        why: {
          uz: "Ikkalasi ham aktiv: 5010 (kassa) oshdi → debet, 5110 (bank) kamaydi → kredit. Aktivlar tarkibi o'zgardi, balans valyutasi o'zgarmadi.",
          ru: "Оба счёта активные: 5010 (касса) вырос → дебет, 5110 (банк) уменьшился → кредит. Изменилась структура активов, валюта баланса — нет.",
        },
        ref: "law-kassa",
      },
      {
        id: "m4e7",
        dt: "6710",
        kt: "5010",
        op: {
          uz: "Xodimlarga mehnat haqi kassadan naqd to'landi.",
          ru: "Зарплата выплачена работникам наличными из кассы.",
        },
        why: {
          uz: "6710 passiv — xodimlar oldidagi majburiyat kamaydi → debet. 5010 aktiv — naqd pul kamaydi → kredit.",
          ru: "6710 пассив — обязательство перед работниками уменьшилось → дебет. 5010 актив — наличные уменьшились → кредит.",
        },
        ref: "law-kassa",
      },
      {
        id: "m4e8",
        dt: "6710",
        kt: "6980",
        op: {
          uz: "Belgilangan muddatda olinmagan mehnat haqi deponentlandi.",
          ru: "Не полученная в срок заработная плата депонирована.",
        },
        why: {
          uz: "Ikkala schyot passiv: 6710 bo'yicha oylik majburiyati yopildi → debet, 6980 bo'yicha deponent majburiyati paydo bo'ldi → kredit.",
          ru: "Оба счёта пассивные: обязательство по 6710 закрыто → дебет, возникло депонентское обязательство по 6980 → кредит.",
        },
      },
      {
        id: "m4e9",
        dt: "6980",
        kt: "5110",
        op: {
          uz: "Deponentlangan mehnat haqi xodimga bank orqali o'tkazib berildi.",
          ru: "Депонированная зарплата перечислена работнику через банк.",
        },
        why: {
          uz: "6980 passiv — majburiyat yopildi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "6980 пассив — обязательство закрыто → дебет. 5110 актив — деньги уменьшились → кредит.",
        },
      },
    ],
  },
  {
    id: 5,
    title: { uz: "Avanslar va boshqa hisob-kitoblar", ru: "Авансы и прочие расчёты" },
    summary: {
      uz: "Hisobdor summalar, ta'minotchiga avans va aybdor xodimdan zararni undirish.",
      ru: "Подотчётные суммы, авансы поставщикам и взыскание ущерба с виновных лиц.",
    },
    accounts: ["4210", "4310", "4730", "5910", "6710", "5110", "5010"],
    entries: [
      {
        id: "m5e1",
        dt: "4210",
        kt: "5110",
        op: {
          uz: "Xodimga xizmat safari yoki xo'jalik ehtiyoji uchun avans karta/bank orqali berildi.",
          ru: "Работнику выдан аванс на командировку или хознужды через банк/карту.",
        },
        why: {
          uz: "4210 aktiv — hisobdor shaxs qarzi oshdi → debet. 5110 aktiv — bank mablag'i kamaydi → kredit.",
          ru: "4210 актив — задолженность подотчётника выросла → дебет. 5110 актив — средства в банке уменьшились → кредит.",
        },
      },
      {
        id: "m5e2",
        dt: "4210",
        kt: "5010",
        op: {
          uz: "Hisobdor summa kassadan naqd berildi.",
          ru: "Подотчётная сумма выдана наличными из кассы.",
        },
        why: {
          uz: "4210 aktiv oshdi → debet, 5010 aktiv kamaydi → kredit. Ikkala tomon ham aktiv, shuning uchun balans summasi o'zgarmaydi.",
          ru: "4210 актив вырос → дебет, 5010 актив уменьшился → кредит. Обе стороны активные, валюта баланса не меняется.",
        },
        ref: "law-kassa",
      },
      {
        id: "m5e3",
        dt: "6710",
        kt: "4210",
        op: {
          uz: "Vaqtida qaytarilmagan hisobdor summa xodimning mehnat haqidan ushlab qolindi.",
          ru: "Невозвращённая подотчётная сумма удержана из зарплаты работника.",
        },
        why: {
          uz: "6710 passiv — xodimga to'lanadigan majburiyat kamaydi → debet. 4210 aktiv — xodim qarzi yopildi → kredit.",
          ru: "6710 пассив — обязательство перед работником уменьшилось → дебет. 4210 актив — долг работника погашен → кредит.",
        },
      },
      {
        id: "m5e4",
        dt: "4310",
        kt: "5110",
        op: {
          uz: "Ta'minotchiga shartnoma bo'yicha oldindan to'lov (avans) o'tkazildi.",
          ru: "Поставщику перечислена предоплата по договору.",
        },
        why: {
          uz: "4310 aktiv — ta'minotchi bizga qarzdor bo'ldi → debet. 5110 aktiv — pul kamaydi → kredit. Avans xarajat emas!",
          ru: "4310 актив — поставщик стал должен нам → дебет. 5110 актив — деньги уменьшились → кредит. Аванс — не расход!",
        },
        ref: "bhms21",
      },
      {
        id: "m5e5",
        dt: "4730",
        kt: "5910",
        op: {
          uz: "Aniqlangan kamomad summasi aybdor xodim zimmasiga yuklandi.",
          ru: "Сумма выявленной недостачи отнесена на виновное лицо.",
        },
        why: {
          uz: "4730 aktiv — xodimdan undiriladigan qarz paydo bo'ldi → debet. 5910 aktiv — yig'uvchi schyotdagi kamomad yopildi → kredit.",
          ru: "4730 актив — возникла задолженность к взысканию → дебет. 5910 актив — недостача со сборного счёта списана → кредит.",
        },
        ref: "law-mehnat",
      },
      {
        id: "m5e6",
        dt: "6710",
        kt: "4730",
        op: {
          uz: "Moddiy zarar summasi xodimning mehnat haqidan ushlab qolindi.",
          ru: "Сумма материального ущерба удержана из зарплаты работника.",
        },
        why: {
          uz: "6710 passiv — to'lanadigan oylik kamaydi → debet. 4730 aktiv — xodim qarzi qoplandi → kredit.",
          ru: "6710 пассив — зарплата к выплате уменьшилась → дебет. 4730 актив — долг работника погашен → кредит.",
        },
        ref: "law-mehnat",
      },
    ],
  },
  {
    id: 6,
    title: { uz: "Sotish, daromad va QQS", ru: "Реализация, доход и НДС" },
    summary: {
      uz: "Tovar sotish, daromadni tan olish, QQS hisoblash, hisobga olish va to'lash.",
      ru: "Реализация товаров, признание дохода, начисление, зачёт и уплата НДС.",
    },
    accounts: ["9120", "2910", "4010", "9020", "6410", "4410", "5110", "5010"],
    entries: [
      {
        id: "m6e1",
        dt: "9120",
        kt: "2910",
        op: {
          uz: "Sotilgan tovarlarning tannarxi hisobdan chiqarildi.",
          ru: "Списана себестоимость реализованных товаров.",
        },
        why: {
          uz: "9120 xarajat (aktiv xarakterli) oshdi → debet. 2910 aktiv — ombordagi tovar kamaydi → kredit. Daromadni tan olish bilan bir vaqtda yoziladi (moslik prinsipi).",
          ru: "9120 расход вырос → дебет. 2910 актив — товар на складе уменьшился → кредит. Отражается одновременно с признанием дохода (принцип соответствия).",
        },
        ref: "bhms4",
      },
      {
        id: "m6e2",
        dt: "4010",
        kt: "9020",
        op: {
          uz: "Xaridorga tovar sotildi, sotish daromadi (QQSsiz) tan olindi.",
          ru: "Товар реализован покупателю, признан доход от реализации (без НДС).",
        },
        why: {
          uz: "4010 aktiv — xaridor qarzi oshdi → debet. 9020 daromad (passiv xarakterli) → kredit. Daromad pul kelganda emas, mulk huquqi o'tganda tan olinadi.",
          ru: "4010 актив — дебиторка покупателя выросла → дебет. 9020 доход (пассивный по характеру) → кредит. Доход признаётся при переходе права собственности, а не при оплате.",
        },
        ref: "bhms2",
      },
      {
        id: "m6e3",
        dt: "4010",
        kt: "6410",
        op: {
          uz: "Sotuv summasi ustidan QQS hisoblandi va xaridorga qo'yildi.",
          ru: "Начислен НДС с суммы реализации и предъявлен покупателю.",
        },
        why: {
          uz: "4010 aktiv — xaridordan olinadigan umumiy summa QQS bilan oshdi → debet. 6410 passiv — byudjet oldidagi soliq majburiyati oshdi → kredit. QQS daromad emas.",
          ru: "4010 актив — общая сумма к получению с НДС выросла → дебет. 6410 пассив — налоговое обязательство выросло → кредит. НДС не является доходом.",
        },
        ref: "law-nk",
      },
      {
        id: "m6e4",
        dt: "6410",
        kt: "4410",
        op: {
          uz: "Kirim QQS hisobga olinib, to'lanadigan QQS majburiyati kamaytirildi.",
          ru: "Входящий НДС зачтён, обязательство по НДС к уплате уменьшено.",
        },
        why: {
          uz: "6410 passiv — majburiyat kamaydi → debet. 4410 aktiv — hisobga olish huquqi ishlatildi, aktiv kamaydi → kredit. Byudjetga faqat farq to'lanadi.",
          ru: "6410 пассив — обязательство уменьшилось → дебет. 4410 актив — право на зачёт использовано → кредит. В бюджет платится только разница.",
        },
        ref: "law-nk",
      },
      {
        id: "m6e5",
        dt: "6410",
        kt: "5110",
        op: {
          uz: "Hisoblangan QQS (yoki boshqa soliq) byudjetga to'landi.",
          ru: "Начисленный НДС (или иной налог) уплачен в бюджет.",
        },
        why: {
          uz: "6410 passiv — majburiyat yopildi → debet. 5110 aktiv — bank mablag'i kamaydi → kredit.",
          ru: "6410 пассив — обязательство погашено → дебет. 5110 актив — средства уменьшились → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m6e6",
        dt: "5110",
        kt: "4010",
        op: {
          uz: "Xaridordan tovar uchun to'lov hisob-kitob schyotiga tushdi.",
          ru: "От покупателя на расчётный счёт поступила оплата за товар.",
        },
        why: {
          uz: "5110 aktiv oshdi → debet, 4010 aktiv (debitorlik) kamaydi → kredit. Bu yerda yangi daromad tan olinmaydi — daromad avval yozilgan.",
          ru: "5110 актив вырос → дебет, 4010 (дебиторка) уменьшилась → кредит. Новый доход не признаётся — он был отражён ранее.",
        },
        ref: "bhms2",
      },
      {
        id: "m6e7",
        dt: "5010",
        kt: "9020",
        op: {
          uz: "Chakana savdoda tovar naqd pulga sotildi.",
          ru: "В розничной торговле товар продан за наличные.",
        },
        why: {
          uz: "5010 aktiv — kassadagi pul oshdi → debet. 9020 daromad → kredit. Debitorlik umuman paydo bo'lmaydi, chunki to'lov darhol amalga oshdi.",
          ru: "5010 актив — наличные выросли → дебет. 9020 доход → кредит. Дебиторка не возникает, оплата произведена сразу.",
        },
        ref: "bhms2",
      },
    ],
  },
  {
    id: 7,
    title: { uz: "Olingan avanslar va majburiyatlar", ru: "Полученные авансы и обязательства" },
    summary: {
      uz: "Xaridordan oldindan to'lov olish va uni keyinchalik sotuv qarziga hisobga olish.",
      ru: "Получение предоплаты от покупателя и её последующий зачёт.",
    },
    accounts: ["5110", "6310", "4010"],
    entries: [
      {
        id: "m7e1",
        dt: "5110",
        kt: "6310",
        op: {
          uz: "Xaridordan kelgusi yetkazib berish uchun oldindan to'lov olindi.",
          ru: "От покупателя получена предоплата за будущую поставку.",
        },
        why: {
          uz: "5110 aktiv — pul oshdi → debet. 6310 passiv — xaridor oldidagi majburiyat (tovar berish) oshdi → kredit. Bu daromad emas, chunki tovar hali berilmagan.",
          ru: "5110 актив — деньги выросли → дебет. 6310 пассив — обязательство перед покупателем выросло → кредит. Это не доход, поставки ещё не было.",
        },
        ref: "bhms2",
      },
      {
        id: "m7e2",
        dt: "6310",
        kt: "4010",
        op: {
          uz: "Tovar yetkazib berilgach, olingan avans xaridor qarziga hisobga olindi.",
          ru: "После поставки полученный аванс зачтён в счёт задолженности покупателя.",
        },
        why: {
          uz: "6310 passiv — majburiyat bajarildi, kamaydi → debet. 4010 aktiv — xaridor debitorligi yopildi → kredit.",
          ru: "6310 пассив — обязательство исполнено → дебет. 4010 актив — дебиторка покупателя закрыта → кредит.",
        },
        ref: "bhms2",
      },
    ],
  },
  {
    id: 8,
    title: { uz: "Kassa va bank harakatlari", ru: "Кассовые и банковские операции" },
    summary: {
      uz: "Inkassatsiya, yo'ldagi pul, terminal orqali tushum va bank komissiyasi.",
      ru: "Инкассация, деньги в пути, поступления через терминал и банковская комиссия.",
    },
    accounts: ["5710", "5010", "5720", "9020", "5110", "9430"],
    entries: [
      {
        id: "m8e1",
        dt: "5710",
        kt: "5010",
        op: {
          uz: "Kassadagi naqd tushum inkassatsiya qilinib bankka topshirildi (hali hisobga tushmagan).",
          ru: "Наличная выручка сдана инкассатору (ещё не зачислена банком).",
        },
        why: {
          uz: "5710 aktiv — yo'ldagi pul oshdi → debet. 5010 aktiv — kassadagi naqd kamaydi → kredit. Pul yo'qolmadi, faqat joyi o'zgardi.",
          ru: "5710 актив — деньги в пути выросли → дебет. 5010 актив — наличные в кассе уменьшились → кредит. Деньги не исчезли, изменилось их место.",
        },
        ref: "law-kassa",
      },
      {
        id: "m8e2",
        dt: "5720",
        kt: "9020",
        op: {
          uz: "Plastik karta (terminal) orqali tovar sotildi.",
          ru: "Товар продан через платёжный терминал (карта).",
        },
        why: {
          uz: "5720 aktiv — ekvayring bo'yicha talab oshdi → debet. 9020 daromad → kredit.",
          ru: "5720 актив — требование по эквайрингу выросло → дебет. 9020 доход → кредит.",
        },
        ref: "bhms2",
      },
      {
        id: "m8e3",
        dt: "5110",
        kt: "5710",
        op: {
          uz: "Yo'ldagi pul bank hisob-kitob schyotiga tushdi.",
          ru: "Деньги в пути зачислены на расчётный счёт.",
        },
        why: {
          uz: "5110 aktiv oshdi → debet, 5710 aktiv yopildi → kredit. 5710 vaqtinchalik (tranzit) schyot, oy oxirida qoldiq qolmasligi kerak.",
          ru: "5110 актив вырос → дебет, 5710 закрыт → кредит. 5710 транзитный счёт, на конец месяца остатка быть не должно.",
        },
      },
      {
        id: "m8e4",
        dt: "9430",
        kt: "5720",
        op: {
          uz: "Bank/ekvayring komissiyasi tushumdan ushlab qolindi.",
          ru: "Банковская (эквайринговая) комиссия удержана из выручки.",
        },
        why: {
          uz: "9430 xarajat oshdi → debet. 5720 aktiv — tushumdan ushlangan qism kamaydi → kredit.",
          ru: "9430 расход вырос → дебет. 5720 актив уменьшился на удержанную часть → кредит.",
        },
      },
    ],
  },
  {
    id: 9,
    title: { uz: "Kamomad, yo'qotishlar va zaxiralar", ru: "Недостачи, потери и резервы" },
    summary: {
      uz: "Inventarizatsiyada aniqlangan kamomadni yig'ish va uni xarajat yoki aybdorga yopish.",
      ru: "Сбор выявленных при инвентаризации недостач и их отнесение на расходы или виновных.",
    },
    accounts: ["5910", "2910", "1010", "2810", "9430"],
    entries: [
      {
        id: "m9e1",
        dt: "5910",
        kt: "2910",
        op: {
          uz: "Inventarizatsiyada tovarlar bo'yicha kamomad aniqlandi.",
          ru: "При инвентаризации выявлена недостача товаров.",
        },
        why: {
          uz: "5910 aktiv (yig'uvchi) — aniqlangan yo'qotish qayd etildi → debet. 2910 aktiv — haqiqiy tovar zaxirasi kamaydi → kredit.",
          ru: "5910 (сборный актив) — потеря зафиксирована → дебет. 2910 актив — фактический запас уменьшился → кредит.",
        },
        ref: "law-inv",
      },
      {
        id: "m9e2",
        dt: "5910",
        kt: "1010",
        op: {
          uz: "Xomashyo va materiallar bo'yicha kamomad aniqlandi.",
          ru: "Выявлена недостача сырья и материалов.",
        },
        why: {
          uz: "5910 aktiv oshdi → debet, 1010 aktiv kamaydi → kredit. Sabab aniqlanmaguncha summa 5910 da turadi.",
          ru: "5910 вырос → дебет, 1010 уменьшился → кредит. До выяснения причин сумма числится на 5910.",
        },
        ref: "law-inv",
      },
      {
        id: "m9e3",
        dt: "5910",
        kt: "2810",
        op: {
          uz: "Tayyor mahsulot bo'yicha kamomad yoki yo'qotish qayd etildi.",
          ru: "Отражена недостача (потеря) готовой продукции.",
        },
        why: {
          uz: "5910 aktiv → debet; 2810 aktiv — ombordagi mahsulot kamaydi → kredit.",
          ru: "5910 → дебет; 2810 актив — продукция на складе уменьшилась → кредит.",
        },
        ref: "law-inv",
      },
      {
        id: "m9e4",
        dt: "9430",
        kt: "5910",
        op: {
          uz: "Aybdorlar aniqlanmagan kamomad korxona xarajatiga o'tkazildi.",
          ru: "Недостача при неустановленных виновных отнесена на расходы предприятия.",
        },
        why: {
          uz: "9430 xarajat oshdi → debet. 5910 aktiv — yig'uvchi schyot yopildi → kredit. Bu foydani kamaytiradi.",
          ru: "9430 расход вырос → дебет. 5910 сборный счёт закрыт → кредит. Это уменьшает прибыль.",
        },
        ref: "law-inv",
      },
    ],
  },
  {
    id: 10,
    title: { uz: "Moliyaviy natijani yopish", ru: "Закрытие финансового результата" },
    summary: {
      uz: "Hisobot davri oxirida daromad va xarajat schyotlarini yakuniy natijaga yopish.",
      ru: "Закрытие счетов доходов и расходов на конечный финансовый результат.",
    },
    accounts: ["9910", "9420", "9120", "9430", "9020"],
    entries: [
      {
        id: "m10e1",
        dt: "9910",
        kt: "9420",
        op: {
          uz: "Hisobot davri oxirida ma'muriy xarajatlar yakuniy moliyaviy natijaga yopildi.",
          ru: "В конце отчётного периода административные расходы закрыты на конечный финансовый результат.",
        },
        why: {
          uz: "9420 xarajat schyoti debet qoldig'iga ega, uni yopish uchun kreditlanadi. 9910 esa debetlanadi, chunki xarajat foydani kamaytiradi. Yil oxirida 9400 guruh schyotlarida qoldiq qolmasligi kerak.",
          ru: "9420 имеет дебетовое сальдо, для закрытия кредитуется. 9910 дебетуется, т.к. расход уменьшает прибыль. На конец года по счетам группы 9400 сальдо быть не должно.",
        },
        ref: "bhms1",
      },
    ],
  },
];

export const ALL_ENTRIES = MODULES.flatMap((m) => m.entries.map((e) => ({ ...e, moduleId: m.id })));
export const TOTAL_MODULES = MODULES.length;