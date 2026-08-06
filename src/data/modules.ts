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
    accounts: ["4610", "8330", "5110", "0810", "1080", "1010", "0130"],
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
        dt: "0810",
        kt: "4610",
        op: {
          uz: "Ta'sischi ulushi sifatida uzoq muddatli aktiv (uskuna, transport) kiritildi — kapital qo'yilma sifatida qabul qilindi.",
          ru: "В качестве вклада учредителя внесён долгосрочный актив (оборудование, транспорт) — принят как капвложение.",
        },
        why: {
          uz: "0810 aktiv — aktivni olishga sarflangan qiymat to'plandi → debet. 4610 aktiv kamaydi (qarz yopildi) → kredit. Aktiv 0130 ga faqat foydalanishga tayyor bo'lganda o'tkaziladi.",
          ru: "0810 активный — накоплена стоимость приобретения актива → дебет. 4610 актив уменьшился (долг погашен) → кредит. На 0130 переносится только при готовности к использованию.",
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
    accounts: ["0130", "0210", "0230", "0710", "0720", "0810", "0820", "6010", "6990", "9420", "2010"],
    entries: [
      {
        id: "m2e1",
        dt: "0130",
        kt: "0810",
        op: {
          uz: "Qurilishi va tayyorlanishi tugagan obyekt (AV) foydalanishga topshirildi (boshlang'ich qiymat shakllandi).",
          ru: "Завершённый строительством/монтажом объект ОС введён в эксплуатацию (сформирована первоначальная стоимость).",
        },
        why: {
          uz: "Ikkalasi ham aktiv schyot: 0130 oshdi → debet, 0810 dagi to'plangan xarajat yopildi, ya'ni kamaydi → kredit.",
          ru: "Оба счёта активные: 0130 вырос → дебет, накопленные затраты на 0810 списаны → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e2",
        dt: "0810",
        kt: "0720",
        op: {
          uz: "O'rnatilgan va montaj qilingan asbob-uskuna ob'ekt (AV) qiymatiga o'tkazildi.",
          ru: "Установленное и смонтированное оборудование включено в стоимость объекта ОС.",
        },
        why: {
          uz: "0810 aktiv oshdi → debet; 0720 aktiv (o'rnatilishdagi uskuna) kamaydi → kredit.",
          ru: "0810 актив вырос → дебет; 0720 (оборудование в монтаже) уменьшился → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e3",
        dt: "0710",
        kt: "6010",
        op: {
          uz: "O'rnatiladigan/montaj talab qiladigan asbob-uskunalar sotib olindi va omborga kirim qilindi.",
          ru: "Приобретено и оприходовано на склад оборудование к установке (требующее монтажа).",
        },
        why: {
          uz: "0710 aktiv oshdi → debet; 6010 passiv majburiyat oshdi → kredit.",
          ru: "0710 актив вырос → дебет; 6010 обязательство выросло → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e4",
        dt: "9420",
        kt: "0230",
        op: {
          uz: "Ma'muriy maqsadda ishlatiladigan mashina va asbob-uskunalar bo'yicha oylik eskirish hisoblandi.",
          ru: "Начислен месячный износ по машинам и оборудованию административного назначения.",
        },
        why: {
          uz: "9420 xarajat (aktiv xarakterli) — xarajat oshdi → debet. 0230 kontr-aktiv — eskirish to'plandi → kredit.",
          ru: "9420 расход вырос → дебет. 0230 контр-активный — износ накоплен → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e5",
        dt: "2010",
        kt: "0230",
        op: {
          uz: "Ishlab chiqarish uskunalari bo'yicha eskirish hisoblanib, mahsulot tannarxiga qo'shildi.",
          ru: "Начислен износ производственного оборудования с включением в себестоимость продукции.",
        },
        why: {
          uz: "2010 aktiv — tannarx xarajati oshdi → debet. 0230 kontr-aktiv oshdi → kredit.",
          ru: "2010 активный — затраты выросли → дебет. 0230 контр-активный вырос → кредит.",
        },
        ref: "bhms4",
      },
      {
        id: "m2e6",
        dt: "0810",
        kt: "6010",
        op: {
          uz: "Yetkazib beruvchidan asosiy vosita (AV) sotib olindi.",
          ru: "Приобретено основное средство (ОС) от поставщика.",
        },
        why: {
          uz: "0810 aktiv oshdi → debet. 6010 passiv — ta'minotchi oldidagi qarz oshdi → kredit.",
          ru: "0810 актив вырос → дебет. 6010 пассивный — долг перед поставщиком вырос → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e7",
        dt: "0810",
        kt: "6990",
        op: {
          uz: "Asosiy vositani yetkazib berish va o'rnatish bo'yicha transport va pudratchi xizmatlari aks ettirildi.",
          ru: "Отражены транспортные услуги и работы подрядчиков по монтажу/доставке ОС.",
        },
        why: {
          uz: "0810 aktiv — obyekt qiymati oshdi → debet. 6990 passiv — pudratchiga qarz oshdi → kredit.",
          ru: "0810 актив — стоимость объекта выросла → дебет. 6990 пассив — долг подрядчику вырос → кредит.",
        },
        ref: "bhms5",
      },
      {
        id: "m2e8",
        dt: "0720",
        kt: "0710",
        op: {
          uz: "Asbob-uskuna ombordan montaj qilish va o'rnatish uchun topshirildi.",
          ru: "Оборудование передано со склада в монтаж и установку.",
        },
        why: {
          uz: "0720 aktiv (montajdagilar) oshdi → debet, 0710 aktiv (ombordagi) kamaydi → kredit.",
          ru: "0720 актив вырос → дебет, 0710 актив уменьшился → кредит.",
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
    accounts: ["1010", "2010", "2910", "6520", "9420", "6010", "4410", "4310", "5110"],
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
          uz: "2010 aktiv — затраты выросли → debet. 6520 passiv — majburiyat oshdi → kredit.",
          ru: "2010 актив — затраты выросли → дебет. 6520 пассив — обязательство выросло → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m3e2",
        dt: "9420",
        kt: "6520",
        op: {
          uz: "Ma'muriy xodimlarning mehnat haqidan ijtimoiy soliq hisoblandi.",
          ru: "Начислен социальный налог с оплаты труда административного персонала.",
        },
        why: {
          uz: "9420 xarajat oshdi → debet; 6520 passiv majburiyat oshdi → kredit.",
          ru: "9420 расход вырос → дебет; 6520 обязательство выросло → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m3e3",
        dt: "2910",
        kt: "6010",
        op: {
          uz: "Ta'minotchidan sotib olingan tovarlar omborga kirim qilindi.",
          ru: "Оприходованы покупные товары от поставщика на склад.",
        },
        why: {
          uz: "2910 aktiv — tovar oshdi → debet. 6010 passiv — qarz oshdi → kredit.",
          ru: "2910 актив — товары выросли → дебет. 6010 пассив — долг вырос → кредит.",
        },
        ref: "bhms4",
      },
      {
        id: "m3e4",
        dt: "4410",
        kt: "6010",
        op: {
          uz: "Xarid qilingan tovar/xizmatlar bo'yicha QQS aks ettirildi (kiruvchi QQS).",
          ru: "Отражён входящий НДС по приобретённым товарам/услугам.",
        },
        why: {
          uz: "4410 aktiv — hisobga olish huquqi oshdi → debet. 6010 passiv — ta'minotchi qarzining QQS qismi oshdi → kredit.",
          ru: "4410 актив — право на зачёт выросло → дебет. 6010 пассив — часть долга с НДС выросла → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m3e5",
        dt: "6010",
        kt: "4310",
        op: {
          uz: "Avval berilgan avans tovarlar kelgach o'zaro yopildi (zachyot).",
          ru: "Зачтён ранее выданный аванс поставщику при поступлении товаров.",
        },
        why: {
          uz: "6010 passiv — qarz kamaydi → debet. 4310 aktiv — berilgan avans (debitorlik) yopildi → kredit.",
          ru: "6010 пассив — долг уменьшился → дебет. 4310 актив — выданный аванс закрыт → кредит.",
        },
        ref: "bhms21",
      },
      {
        id: "m3e6",
        dt: "6010",
        kt: "5110",
        op: {
          uz: "Yetkazib beruvchiga bajarilgan ish/tovar uchun pul o'tkazildi.",
          ru: "Перечислены денежные средства поставщику за товары/услуги.",
        },
        why: {
          uz: "6010 passiv — majburiyat kamaydi → debet. 5110 aktiv — bankdagi pul kamaydi → kredit.",
          ru: "6010 пассив — обязательство уменьшилось → дебет. 5110 актив — деньги уменьшились → кредит.",
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
    accounts: ["6710", "6410", "6420", "6530", "6520", "5110", "5010", "6720"],
    entries: [
      {
        id: "m4e1",
        dt: "6710",
        kt: "6410",
        op: {
          uz: "Xodimlarning ish haqidan jismoniy shaxslar daromad solig'i (JSHDS) ushlandi.",
          ru: "Удержан НДФЛ из заработной платы работников.",
        },
        why: {
          uz: "6710 passiv — xodimga to'lanadigan oylik kamaydi → debet. 6410 passiv — byudjetga qarz oshdi → kredit.",
          ru: "6710 пассив — сумма к выплате работнику уменьшилась → дебет. 6410 пассив — возник долг перед бюджетом → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e2",
        dt: "6710",
        kt: "6530",
        op: {
          uz: "Ish haqidan INPS (shaxsiy jamg'arib boriladigan pensiya) ushlandi.",
          ru: "Удержаны накопительные пенсионные взносы (ИНПС) из зарплаты.",
        },
        why: {
          uz: "6710 passiv — xodimlarga to'lov kamaydi → debet, 6530 passiv — INPS jamg'armasiga majburiyat oshdi → kredit.",
          ru: "6710 пассив — выплата уменьшилась → дебет, 6530 пассив — обязательство по ИНПС выросло → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e3",
        dt: "6410",
        kt: "5110",
        op: {
          uz: "QQS va boshqa soliqlar bo'yicha qarzlar budjetga to'lab berildi.",
          ru: "Перечислены налоги в бюджет с расчётного счёта.",
        },
        why: {
          uz: "6410 passiv — majburiyat yopildi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "6410 пассив — обязательство погашено → дебет. 5110 актив — деньги уменьшились → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m4e4",
        dt: "6530",
        kt: "5110",
        op: {
          uz: "Jamg'arib boriladigan pension badallari bank orqali o'tkazildi.",
          ru: "Перечислены накопительные пенсионные взносы через банк.",
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
          uz: "Ijtimoiy soliq budjetga o'tkazildi.",
          ru: "Перечислен социальный налог в бюджет.",
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
          uz: "Bankdan kassaga naqd pul olindi (ish haqi, xo'jalik xarajatlariga).",
          ru: "Получены наличные деньги из банка в кассу (на зарплату, хоз. расходы).",
        },
        why: {
          uz: "5010 (kassa) oshdi → debet, 5110 (bank) kamaydi → kredit.",
          ru: "5010 (касса) вырос → дебет, 5110 (банк) уменьшился → кредит.",
        },
        ref: "law-kassa",
      },
      {
        id: "m4e7",
        dt: "6710",
        kt: "5010",
        op: {
          uz: "Xodimlarga naqd pulda (yoki plastikka) ish haqi to'landi.",
          ru: "Выплачена заработная плата сотрудникам наличными (или на карту).",
        },
        why: {
          uz: "6710 passiv — xodimlar oldidagi majburiyat kamaydi → debet. 5010 aktiv — naqd pul kamaydi → kredit.",
          ru: "6710 пассив — обязательство уменьшилось → дебет. 5010 актив — наличные уменьшились → кредит.",
        },
        ref: "law-kassa",
      },
      {
        id: "m4e8",
        dt: "6710",
        kt: "6720",
        op: {
          uz: "Belgilangan muddatda olinmagan mehnat haqi deponentlandi.",
          ru: "Не полученная в срок заработная плата депонирована (счёт 6720).",
        },
        why: {
          uz: "6710 passiv yopildi → debet, 6720 passiv deponent majburiyati paydo bo'ldi → kredit.",
          ru: "6710 пассив закрыт → дебет, возникло обязательство 6720 → кредит.",
        },
      },
      {
        id: "m4e9",
        dt: "6720",
        kt: "5110",
        op: {
          uz: "Deponentlangan mehnat haqi xodimga bank orqali o'tkazib berildi.",
          ru: "Депонированная зарплата перечислена работнику через банк.",
        },
        why: {
          uz: "6720 passiv — majburiyat yopildi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "6720 пассив — обязательство закрыто → дебет. 5110 актив — деньги уменьшились → кредит.",
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
    accounts: ["4220", "4310", "4730", "5910", "6710", "5110", "5010"],
    entries: [
      {
        id: "m5e1",
        dt: "4220",
        kt: "5110",
        op: {
          uz: "Hisobdor shaxsga xo'jalik yoki xizmat safari uchun pul bank orqali berildi.",
          ru: "Выданы денежные средства подотчётному лицу на командировку через банк.",
        },
        why: {
          uz: "4220 aktiv — hisobdor shaxs qarzi oshdi → debet. 5110 aktiv — bank mablag'i kamaydi → kredit.",
          ru: "4220 актив — задолженность подотчётника выросла → дебет. 5110 актив — деньги уменьшились → кредит.",
        },
      },
      {
        id: "m5e2",
        dt: "4220",
        kt: "5010",
        op: {
          uz: "Hisobdor shaxsga xo'jalik yoki xizmat safari uchun kassadan naqd pul berildi.",
          ru: "Выданы денежные средства подотчётному лицу из кассы наличными.",
        },
        why: {
          uz: "4220 aktiv oshdi → debet, 5010 aktiv kamaydi → kredit.",
          ru: "4220 актив вырос → дебет, 5010 актив уменьшился → кредит.",
        },
        ref: "law-kassa",
      },
      {
        id: "m5e3",
        dt: "6710",
        kt: "4220",
        op: {
          uz: "Vaqtida qaytarilmagan hisobdor summa xodimning mehnat haqidan ushlab qolindi.",
          ru: "Невозвращённая подотчётная сумма удержана из зарплаты работника.",
        },
        why: {
          uz: "6710 passiv — to'lanadigan majburiyat kamaydi → debet. 4220 aktiv — xodim qarzi yopildi → kredit.",
          ru: "6710 пассив — обязательство уменьшилось → дебет. 4220 актив — долг работника погашен → кредит.",
        },
      },
      {
        id: "m5e4",
        dt: "4310",
        kt: "5110",
        op: {
          uz: "Yetkazib beruvchiga bo'lajak tovarlar uchun avans o'tkazildi.",
          ru: "Перечислен аванс поставщику под предстоящую поставку.",
        },
        why: {
          uz: "4310 aktiv — ta'minotchi bizga qarzdor bo'ldi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "4310 актив — поставщик стал должен нам → дебет. 5110 актив — деньги уменьшились → кредит.",
        },
        ref: "bhms21",
      },
      {
        id: "m5e5",
        dt: "4730",
        kt: "5910",
        op: {
          uz: "Moddiy zararni qoplash bo'yicha kamomad summasi aybdor xodim zimmasiga yuklandi.",
          ru: "Задолженность по возмещению ущерба отнесёна на виновное лицо.",
        },
        why: {
          uz: "4730 aktiv — xodimdan undiriladigan qarz paydo bo'ldi → debet. 5910 aktiv — kamomad yopildi → kredit.",
          ru: "4730 актив — возникла задолженность к взысканию → дебет. 5910 актив — недостача списана → кредит.",
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
          ru: "6710 пассив — зарплата уменьшилась → дебет. 4730 актив — долг работника погашен → кредит.",
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
          uz: "Sotilgan tovarlarning xarid qiymati (tannarxi) hisobdan chiqarildi.",
          ru: "Списана покупная стоимость (себестоимость) реализованных товаров.",
        },
        why: {
          uz: "9120 xarajat (aktiv xarakterli) oshdi → debet. 2910 aktiv — ombordagi tovar kamaydi → kredit.",
          ru: "9120 расход вырос → дебет. 2910 актив — товар на складе уменьшился → кредит.",
        },
        ref: "bhms4",
      },
      {
        id: "m6e2",
        dt: "4010",
        kt: "9020",
        op: {
          uz: "Xaridorga tovar sotildi va unga debitorlik qarzi yozildi (daromad aks ettirildi).",
          ru: "Отражена реализация товаров покупателю и возникновение дебиторской задолженности.",
        },
        why: {
          uz: "4010 aktiv — xaridor qarzi oshdi → debet. 9020 daromad (passiv xarakterli) → kredit.",
          ru: "4010 актив — дебиторка покупателя выросла → дебет. 9020 доход (пассивный) → кредит.",
        },
        ref: "bhms2",
      },
      {
        id: "m6e3",
        dt: "9020",
        kt: "6410",
        op: {
          uz: "Sotilgan mahsulot/tovardan QQS hisoblandi (chiquvchi QQS).",
          ru: "Начислен НДС с реализации товаров/услуг.",
        },
        why: {
          uz: "9020 daromad kamayadi → debet. 6410 passiv — byudjet oldidagi soliq majburiyati oshdi → kredit.",
          ru: "9020 доход уменьшается → дебет. 6410 пассив — налоговое обязательство выросло → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m6e4",
        dt: "6410",
        kt: "4410",
        op: {
          uz: "Kiruvchi QQS hisobga (zachyotga) olindi.",
          ru: "Принят к зачёту входящий НДС.",
        },
        why: {
          uz: "6410 passiv — majburiyat kamaydi → debet. 4410 aktiv — hisobga olish huquqi kamaydi → kredit.",
          ru: "6410 пассив — обязательство уменьшилось → дебет. 4410 актив — право на зачёт использовано → кредит.",
        },
        ref: "law-nk",
      },
      {
        id: "m6e5",
        dt: "6410",
        kt: "5110",
        op: {
          uz: "QQS bo'yicha soliq budjetga to'lab berildi.",
          ru: "Перечислен НДС в бюджет.",
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
          uz: "Xaridordan hisob-kitob varaqasiga pul tushdi.",
          ru: "Поступила оплата от покупателя на расчётный счёт.",
        },
        why: {
          uz: "5110 aktiv oshdi → debet, 4010 aktiv (debitorlik) kamaydi → kredit.",
          ru: "5110 актив вырос → дебет, 4010 (дебиторка) уменьшилась → кредит.",
        },
        ref: "bhms2",
      },
      {
        id: "m6e7",
        dt: "5010",
        kt: "9020",
        op: {
          uz: "Chakana savdoda tovar sotishdan naqd pul tushdi.",
          ru: "Поступила наличная выручка от реализации товаров в рознице.",
        },
        why: {
          uz: "5010 aktiv — kassadagi pul oshdi → debet. 9020 daromad → kredit.",
          ru: "5010 актив — наличные выросли → дебет. 9020 доход → кредит.",
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
          uz: "Xaridordan oldindan to'lov (avans) olindi.",
          ru: "Получена предоплата (аванс) от покупателя.",
        },
        why: {
          uz: "5110 aktiv — pul oshdi → debet. 6310 passiv — xaridor oldidagi majburiyat oshdi → kredit.",
          ru: "5110 актив — деньги выросли → дебет. 6310 пассив — обязательство перед покупателем выросло → кредит.",
        },
        ref: "bhms2",
      },
      {
        id: "m7e2",
        dt: "6310",
        kt: "4010",
        op: {
          uz: "Avval olingan avans o'zaro hisob-kitob orqali yopildi (zachyot).",
          ru: "Зачтён ранее полученный аванс от покупателя.",
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
      uz: "Inkassatsiya, yo'ldagi pul, korporativ karta orqali to'lovlar va bank komissiyasi.",
      ru: "Инкассация, деньги в пути, платежи корпоративной картой и банковская комиссия.",
    },
    accounts: ["5710", "5010", "5530", "9020", "5110", "9430"],
    entries: [
      {
        id: "m8e1",
        dt: "5710",
        kt: "5010",
        op: {
          uz: "Kassadagi naqd pul tushumi inkassatsiya qilinib bankka topshirildi (yo'ldagi pul).",
          ru: "Сдана наличная выручка из кассы в банк (денежные переводы в пути).",
        },
        why: {
          uz: "5710 aktiv — yo'ldagi pul oshdi → debet. 5010 aktiv — kassadagi naqd kamaydi → kredit.",
          ru: "5710 актив — деньги в пути выросли → дебет. 5010 актив — наличные в кассе уменьшились → кредит.",
        },
        ref: "law-kassa",
      },
      {
        id: "m8e2",
        dt: "5530",
        kt: "5110",
        op: {
          uz: "Korporativ bank kartasi (KBK) hisobiga pul o'tkazildi.",
          ru: "Перечислены средства на корпоративную банковскую карту (КБК).",
        },
        why: {
          uz: "5530 aktiv — korporativ kartadagi pul oshdi → debet. 5110 aktiv — hisob-kitob schyotidan pul kamaydi → kredit.",
          ru: "5530 актив — средства на КБК выросли → дебет. 5110 актив — деньги с расчётного счёта уменьшились → кредит.",
        },
        ref: "bhms2",
      },
      {
        id: "m8e3",
        dt: "5110",
        kt: "5710",
        op: {
          uz: "Yo'ldagi pul mablag'lari (o'tkazmalar) bank hisobiga tushdi.",
          ru: "Денежные переводы в пути зачислены на расчётный счёт.",
        },
        why: {
          uz: "5110 aktiv oshdi → debet, 5710 aktiv yopildi → kredit.",
          ru: "5110 актив вырос → дебет, 5710 закрыт → кредит.",
        },
      },
      {
        id: "m8e4",
        dt: "9430",
        kt: "5110",
        op: {
          uz: "Bank xizmatlari uchun komissiya xarajatga olindi.",
          ru: "Списана банковская комиссия в расходы.",
        },
        why: {
          uz: "9430 xarajat oshdi → debet. 5110 aktiv — pul kamaydi → kredit.",
          ru: "9430 расход вырос → дебет. 5110 актив уменьшился → кредит.",
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
          uz: "Kamomadlar va qiymatliklarning buzilishidan yo'qotishlar (tovarlar bo'yicha) aniqlandi.",
          ru: "Отражена недостача и порча товаров при инвентаризации.",
        },
        why: {
          uz: "5910 aktiv — yo'qotish qayd etildi → debet. 2910 aktiv — tovar zaxirasi kamaydi → kredit.",
          ru: "5910 актив — потеря зафиксирована → дебет. 2910 актив — запас уменьшился → кредит.",
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
          uz: "5910 aktiv oshdi → debet, 1010 aktiv kamaydi → kredit.",
          ru: "5910 вырос → дебет, 1010 уменьшился → кредит.",
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
          uz: "5910 aktiv → debet; 2810 aktiv — mahsulot kamaydi → kredit.",
          ru: "5910 → дебет; 2810 актив — продукция уменьшилась → кредит.",
        },
        ref: "law-inv",
      },
      {
        id: "m9e4",
        dt: "9430",
        kt: "5910",
        op: {
          uz: "Tovar-moddiy zaxiralarning kamomadi va buzilishidan ko'rilgan zarar xarajatga olindi.",
          ru: "Списан убыток от недостачи и порчи ТМЦ в расходы.",
        },
        why: {
          uz: "9430 xarajat oshdi → debet. 5910 aktiv yopildi → kredit.",
          ru: "9430 расход вырос → дебет. 5910 закрыт → кредит.",
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
    accounts: ["9910", "9410", "9420", "9120", "9430", "9020"],
    entries: [
      {
        id: "m10e1",
        dt: "9910",
        kt: "9420",
        op: {
          uz: "Davr xarajatlari (ma'muriy) moliyaviy natijaga yopildi.",
          ru: "Списаны административные расходы периода на конечный финансовый результат.",
        },
        why: {
          uz: "9420 xarajat schyoti debet qoldig'iga ega, uni yopish uchun kreditlanadi. 9910 esa debetlanadi.",
          ru: "9420 имеет дебетовое сальдо, для закрытия кредитуется. 9910 дебетуется.",
        },
        ref: "bhms1",
      },
    ],
  },
];

export const ALL_ENTRIES = MODULES.flatMap((m) => m.entries.map((e) => ({ ...e, moduleId: m.id })));
export const TOTAL_MODULES = MODULES.length;