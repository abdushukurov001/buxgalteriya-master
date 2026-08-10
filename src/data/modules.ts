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
    title: {
      uz: "1-Mavzu: Ustav kapitalini shakllantirish va ulushlar kiritish",
      ru: "Тема 1: Формирование уставного капитала и внесение вкладов",
    },
    summary: {
      uz: "Ustav kapitalining e'lon qilinishi, ta'sischilar qarzi hamda ulushlarning pul, asosiy vositalar va materiallar ko'rinishida kiritilishi.",
      ru: "Объявление уставного капитала, задолженность учредителей и внесение вкладов деньгами, ОС и материалами.",
    },
    accounts: ["4610", "8330", "5110", "0820", "1080", "1010"],
    entries: [
      {
        id: "m1e1",
        dt: "4610",
        kt: "8330",
        op: {
          uz: "Ustav kapitalini shakllantirish bo'yicha tasischilar qarzdorligi.",
          ru: "Задолженность учредителей по формированию уставного капитала.",
        },
        why: {
          uz: "4610 — debitorlik (aktiv) oshdi → debet. 8330 — ustav kapitali (passiv) oshdi → kredit.",
          ru: "4610 — дебиторка (активный) выросла → дебет. 8330 — уставный капитал (пассивный) вырос → кредит.",
        },
      },
      {
        id: "m1e2",
        dt: "5110",
        kt: "4610",
        op: {
          uz: "Tasischi ustav kapitaliga bank orqali pul o'tkazdi.",
          ru: "Учредитель внёс деньги в уставный капитал через банк.",
        },
        why: {
          uz: "5110 (bankdagi pul) oshdi → debet. 4610 (ta'sischi qarzi) yopildi → kredit.",
          ru: "5110 (деньги в банке) выросли → дебет. 4610 (долг учредителя) погашен → кредит.",
        },
      },
      {
        id: "m1e3",
        dt: "0820",
        kt: "4610",
        op: {
          uz: "Tasischi ustav kapitaliga asosiy vosita (uskuna/mashina) berdi.",
          ru: "Учредитель внёс в уставный капитал основное средство (оборудование/машину).",
        },
        why: {
          uz: "0820 (kapital qo'yilmalar) oshdi → debet. 4610 (ta'sischi qarzi) kamaydi → kredit.",
          ru: "0820 (капвложения) выросли → дебет. 4610 (долг учредителя) уменьшился → кредит.",
        },
      },
      {
        id: "m1e4",
        dt: "1080",
        kt: "4610",
        op: {
          uz: "Tasischi ustav kapitaliga qurilish materiallari berdi.",
          ru: "Учредитель внёс в уставный капитал строительные материалы (инвентарь).",
        },
        why: {
          uz: "1080 (inventar va materiallar) oshdi → debet. 4610 (ta'sischi qarzi) kamaydi → kredit.",
          ru: "1080 (инвентарь и материалы) выросли → дебет. 4610 (долг учредителя) уменьшился → кредит.",
        },
      },
      {
        id: "m1e5",
        dt: "1010",
        kt: "4610",
        op: {
          uz: "Tasischi ustav kapitaliga xomashyo va materiallar kiritdi.",
          ru: "Учредитель внёс в уставный капитал сырьё и материалы.",
        },
        why: {
          uz: "1010 (xomashyo zaxirasi) oshdi → debet. 4610 (ta'sischi qarzi) kamaydi → kredit.",
          ru: "1010 (запас сырья) вырос → дебет. 4610 (долг учредителя) уменьшился → кредит.",
        },
      },
    ],
  },
  {
    id: 2,
    title: {
      uz: "2-Mavzu: Ish haqi, Soliqlar va Hisobdor shaxslar",
      ru: "Тема 2: Заработная плата, Налоги и Подотчётные лица",
    },
    summary: {
      uz: "Ish haqi bo'yicha ijtimoiy soliq, JSHDS, INPS, to'lovlar hamda hisobdor shaxslar bilan hisob-kitoblar.",
      ru: "Социальный налог, НДФЛ, ИНПС, выплаты зарплаты и расчёты с подотчётными лицами.",
    },
    accounts: ["9420", "6520", "2010", "6420", "6530", "6710", "5110", "5010", "4210", "9910"],
    entries: [
      {
        id: "m2e1",
        dt: "9420",
        kt: "6520",
        op: {
          uz: "Ma'muriy xodimlar uchun Ijtimoiy soliq (12%) hisoblandi.",
          ru: "Начислен социальный налог (12%) для административного персонала.",
        },
        why: {
          uz: "9420 (ma'muriy xarajat) oshdi → debet. 6520 (ijtimoiy soliq majburiyati) oshdi → kredit.",
          ru: "9420 (админ. расход) вырос → дебет. 6520 (обязательство по соцналогу) выросло → кредит.",
        },
      },
      {
        id: "m2e2",
        dt: "2010",
        kt: "6520",
        op: {
          uz: "Ishlab chiqarish xodimlari uchun Ijtimoiy soliq (12%) hisoblandi.",
          ru: "Начислен социальный налог (12%) для производственных рабочих.",
        },
        why: {
          uz: "2010 (ishlab chiqarish tannarxi) oshdi → debet. 6520 (ijtimoiy soliq majburiyati) oshdi → kredit.",
          ru: "2010 (себестоимость) выросла → дебет. 6520 (обязательство) выросло → кредит.",
        },
      },
      {
        id: "m2e3",
        dt: "6420",
        kt: "6530",
        op: {
          uz: "JSHDS tarkibidan INPS (0.1%) ajratildi.",
          ru: "Выделены ИНПС (0.1%) из состава НДФЛ.",
        },
        why: {
          uz: "6420 (byudjetga JSHDS qarzi) kamaydi → debet. 6530 (INPS pension badali) oshdi → kredit.",
          ru: "6420 (долг по НДФЛ) уменьшился → дебет. 6530 (взнос ИНПС) вырос → кредит.",
        },
      },
      {
        id: "m2e4",
        dt: "6710",
        kt: "6420",
        op: {
          uz: "Ish haqidan JSHDS (12%) ushlandi.",
          ru: "Удержан НДФЛ (12%) из заработной платы.",
        },
        why: {
          uz: "6710 (xodimga to'lanadigan oylik) kamaydi → debet. 6420 (JSHDS soliq qarzi) oshdi → kredit.",
          ru: "6710 (зарплата к выплате) уменьшилась → дебет. 6420 (долг по НДФЛ) вырос → кредит.",
        },
      },
      {
        id: "m2e5",
        dt: "6420",
        kt: "5110",
        op: {
          uz: "JSHDS / soliqlar bankdan budjetga to'landi.",
          ru: "НДФЛ / налоги перечислены в бюджет с расчётного счёта.",
        },
        why: {
          uz: "6420 (soliq majburiyati) yopildi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6420 (налоговое обязательство) погашено → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
      {
        id: "m2e6",
        dt: "6530",
        kt: "5110",
        op: {
          uz: "INPS to'lovi bankdan Xalq bankiga o'tkazildi.",
          ru: "Пенсионные взносы ИНПС перечислены в Халк банк.",
        },
        why: {
          uz: "6530 (INPS majburiyati) kamaydi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6530 (обязательство ИНПС) уменьшилось → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
      {
        id: "m2e7",
        dt: "6520",
        kt: "5110",
        op: {
          uz: "Ijtimoiy soliq bankdan to'landi.",
          ru: "Социальный налог уплачен с расчётного счёта.",
        },
        why: {
          uz: "6520 (ijtimoiy soliq majburiyati) yopildi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6520 (обязательство) погашено → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
      {
        id: "m2e8",
        dt: "5010",
        kt: "5110",
        op: {
          uz: "Bankdan kassaga naqd pul olindi.",
          ru: "Получены наличные деньги из банка в кассу.",
        },
        why: {
          uz: "5010 (kassadagi pul) oshdi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "5010 (наличные) выросли → дебет. 5110 (деньги в банке) уменьшились → кредит.",
        },
      },
      {
        id: "m2e9",
        dt: "6710",
        kt: "5010",
        op: {
          uz: "Ish haqi kassadan naqd pulda berildi.",
          ru: "Выплачена заработная плата наличными из кассы.",
        },
        why: {
          uz: "6710 (ish haqi majburiyati) kamaydi → debet. 5010 (kassa) kamaydi → kredit.",
          ru: "6710 (обязательство по зарплате) уменьшилось → дебет. 5010 (касса) уменьшилась → кредит.",
        },
      },
      {
        id: "m2e10",
        dt: "4210",
        kt: "5110",
        op: {
          uz: "Hisobdor shaxsga (xizmat safari uchun) bankdan pul o'tkazildi.",
          ru: "Выданы денежные средства подотчётному лицу (на командировку) из банка.",
        },
        why: {
          uz: "4210 (hisobdor shaxs qarzi) oshdi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "4210 (дебиторка подотчётника) выросла → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
      {
        id: "m2e11",
        dt: "4210",
        kt: "5010",
        op: {
          uz: "Hisobdor shaxsga kassadan naqd pul berildi.",
          ru: "Выданы наличные деньги подотчётному лицу из кассы.",
        },
        why: {
          uz: "4210 (hisobdor shaxs qarzi) oshdi → debet. 5010 (kassa) kamaydi → kredit.",
          ru: "4210 (дебиторка подотчётника) выросла → дебет. 5010 (касса) уменьшилась → кредит.",
        },
      },
      {
        id: "m2e12",
        dt: "6710",
        kt: "4210",
        op: {
          uz: "Berilgan avans/bo'nak ish haqidan yopildi.",
          ru: "Выданный аванс удержан/зачтён из заработной платы.",
        },
        why: {
          uz: "6710 (ish haqi majburiyati) kamaydi → debet. 4210 (hisobdor shaxs qarzi) yopildi → kredit.",
          ru: "6710 (зарплата) уменьшилась → дебет. 4210 (дебиторка подотчётника) закрыта → кредит.",
        },
      },
      {
        id: "m2e13",
        dt: "9910",
        kt: "9420",
        op: {
          uz: "Davr oxirida ma'muriy xarajatlar moliyaviy natijaga yopildi.",
          ru: "В конце периода административные расходы списаны на финансовый результат.",
        },
        why: {
          uz: "9910 (moliyaviy natija) debetlanadi. 9420 (ma'muriy xarajat) yopildi → kredit.",
          ru: "9910 (фин. результат) дебетуется. 9420 (админ. расход) закрыт → кредит.",
        },
      },
    ],
  },
  {
    id: 3,
    title: {
      uz: "3-Mavzu: Boshqa ushlanmalar, Mukofot puli (Bonus) va Dekret to'lovlari",
      ru: "Тема 3: Прочие удержания, Премии (Бонусы) и Декретные выплаты",
    },
    summary: {
      uz: "Kasaba uyushmasi va ijro varaqasi bo'yicha ushlanmalar, mukofot pullari hamda dekret nafaqasining hisoblanishi va to'lanishi.",
      ru: "Удержания по профсоюзам и исп. листам, начисление и выплата премий и декретных пособий.",
    },
    accounts: ["6710", "6980", "5110", "9420", "6510"],
    entries: [
      {
        id: "m3e1",
        dt: "6710",
        kt: "6980",
        op: {
          uz: "Ish haqidan kasaba uyushmasi (yoki boshqa ijro varaqasi) ushlandi.",
          ru: "Удержаны профсоюзные взносы (или удержания по исполнительному листу) из зарплаты.",
        },
        why: {
          uz: "6710 (oylik majburiyati) kamaydi → debet. 6980 (boshqa majburiyat) oshdi → kredit.",
          ru: "6710 (зарплата) уменьшилась → дебет. 6980 (прочие обязательства) выросли → кредит.",
        },
      },
      {
        id: "m3e2",
        dt: "6980",
        kt: "5110",
        op: {
          uz: "Ushlab qolingan summalar bankdan tegishli tashkilotga o'tkazildi.",
          ru: "Удержанные суммы перечислены с расчётного счёта соответствующей организации.",
        },
        why: {
          uz: "6980 (majburiyat) yopildi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6980 (обязательство) погашено → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
      {
        id: "m3e3",
        dt: "9420",
        kt: "6710",
        op: {
          uz: "Xodimlarga mukofot puli (bonus) hisoblandi.",
          ru: "Начислена премия (бонус) сотрудникам.",
        },
        why: {
          uz: "9420 (ma'muriy xarajat) oshdi → debet. 6710 (xodim oldidagi majburiyat) oshdi → kredit.",
          ru: "9420 (расход) вырос → дебет. 6710 (обязательство перед работником) выросло → кредит.",
        },
      },
      {
        id: "m3e4",
        dt: "6510",
        kt: "6710",
        op: {
          uz: "Xodimga dekret (homiladorlik va tug'ish) nafaqasi hisoblandi (FSS hisobidan).",
          ru: "Начислено пособие по беременности и родам (декретные) за счёт ФСС.",
        },
        why: {
          uz: "6510 (FSS bo'yicha talab/qarz) debetlandi. 6710 (xodimga to'lanadigan dekret puli) oshdi → kredit.",
          ru: "6510 (расчёты с ФСС) дебетуются. 6710 (декретные к выплате) выросли → кредит.",
        },
      },
      {
        id: "m3e5",
        dt: "6710",
        kt: "5110",
        op: {
          uz: "Mukofot va dekret pullari xodimning plastigiga o'tkazib berildi.",
          ru: "Премии и декретные выплаты перечислены на пластиковую карту сотрудника.",
        },
        why: {
          uz: "6710 (xodim oldidagi majburiyat) yopildi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6710 (обязательство перед сотрудником) закрыто → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
    ],
  },
  {
    id: 4,
    title: {
      uz: "4-Mavzu: Tovarlar sotib olish va Yetkazib beruvchilar bilan hisob-kitob",
      ru: "Тема 4: Приобретение товаров и Расчёты с поставщиками",
    },
    summary: {
      uz: "Yetkazib beruvchiga avans to'lash, tovarlarni kirim qilish, kiruvchi QQS hamda avans va qarzni yopish.",
      ru: "Выплата аванса поставщику, приход товаров, входящий НДС и зачёт аванса/оплата.",
    },
    accounts: ["4310", "5110", "2910", "6010", "4410"],
    entries: [
      {
        id: "m4e1",
        dt: "4310",
        kt: "5110",
        op: {
          uz: "Yetkazib beruvchiga avans to'landi.",
          ru: "Перечислен аванс поставщику с расчётного счёта.",
        },
        why: {
          uz: "4310 (berilgan avans / debitorlik) oshdi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "4310 (выданный аванс) вырос → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
      {
        id: "m4e2",
        dt: "2910",
        kt: "6010",
        op: {
          uz: "Tovar sotib olindi.",
          ru: "Оприходованы приобретённые товары на склад.",
        },
        why: {
          uz: "2910 (ombordagi tovar zaxirasi) oshdi → debet. 6010 (ta'minotchiga qarz) oshdi → kredit.",
          ru: "2910 (товары на складе) выросли → дебет. 6010 (долг поставщику) вырос → кредит.",
        },
      },
      {
        id: "m4e3",
        dt: "4410",
        kt: "6010",
        op: {
          uz: "Sotib olingan tovar bo'yicha QQS (12% НДС) hisobga olindi.",
          ru: "Отражён входящий НДС (12%) по приобретённым товарам.",
        },
        why: {
          uz: "4410 (kiruvchi QQS / zachyot huquqi) oshdi → debet. 6010 (ta'minotchi qarzining QQS qismi) oshdi → kredit.",
          ru: "4410 (входящий НДС) вырос → дебет. 6010 (долг с НДС) вырос → кредит.",
        },
      },
      {
        id: "m4e4",
        dt: "6010",
        kt: "4310",
        op: {
          uz: "Berilgan avans yopildi.",
          ru: "Зачтён ранее выданный аванс поставщику.",
        },
        why: {
          uz: "6010 (ta'minotchi qarzi) kamaydi → debet. 4310 (berilgan avans) yopildi → kredit.",
          ru: "6010 (долг поставщику) уменьшился → дебет. 4310 (выданный аванс) закрыт → кредит.",
        },
      },
      {
        id: "m4e5",
        dt: "6010",
        kt: "5110",
        op: {
          uz: "Yetkazib beruvchiga bankdan to'lov qilindi.",
          ru: "Остаток задолженности перечислен поставщику с расчётного счёта.",
        },
        why: {
          uz: "6010 (ta'minotchi qarzi) yopildi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6010 (долг поставщику) погашен → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
    ],
  },
  {
    id: 5,
    title: {
      uz: "5-Mavzu: Ulgurji savdo (Tovar sotish) va QQS Hisob-kitobi",
      ru: "Тема 5: Оптовая торговля (Реализация) и Расчёт НДС",
    },
    summary: {
      uz: "Xaridordan avans olish, tovar sotish, tannarxni chiqarish, QQS hisoblash, zachyot va budjetga to'lov.",
      ru: "Аванс от покупателя, реализация товаров, списание себестоимости, НДС, зачёт и уплата в бюджет.",
    },
    accounts: ["5110", "6310", "9120", "2910", "4010", "9020", "6410", "4410"],
    entries: [
      {
        id: "m5e1",
        dt: "5110",
        kt: "6310",
        op: {
          uz: "Xaridordan avans olindi.",
          ru: "Получен аванс от покупателя на расчётный счёт.",
        },
        why: {
          uz: "5110 (bankdagi pul) oshdi → debet. 6310 (olingan avans majburiyati) oshdi → kredit.",
          ru: "5110 (деньги) выросли → дебет. 6310 (полученный аванс) вырос → кредит.",
        },
      },
      {
        id: "m5e2",
        dt: "9120",
        kt: "2910",
        op: {
          uz: "Sotilgan tovarniy tannarxi hisobdan chiqarildi.",
          ru: "Списана себестоимость реализованных товаров.",
        },
        why: {
          uz: "9120 (sotilgan tovarlar tannarxi xarajati) oshdi → debet. 2910 (ombordagi tovar) kamaydi → kredit.",
          ru: "9120 (себестоимость) выросла → дебет. 2910 (товар на складе) уменьшился → кредит.",
        },
      },
      {
        id: "m5e3",
        dt: "4010",
        kt: "9020",
        op: {
          uz: "Ulgurji sotuv tushumi (QQS-siz).",
          ru: "Отражена выручка от оптовой реализации товаров (без НДС).",
        },
        why: {
          uz: "4010 (xaridor debitorlik qarzi) oshdi → debet. 9020 (tovar sotishdan daromad) oshdi → kredit.",
          ru: "4010 (дебиторка покупателя) выросла → дебет. 9020 (доход от продаж) вырос → кредит.",
        },
      },
      {
        id: "m5e4",
        dt: "4010",
        kt: "6410",
        op: {
          uz: "Sotuvdan QQS (12%) hisoblandi.",
          ru: "Начислен НДС (12%) с оптовой продажи.",
        },
        why: {
          uz: "4010 (xaridordan olinadigan umumiy summa QQS bilan) oshdi → debet. 6410 (QQS soliq qarzi) oshdi → kredit.",
          ru: "4010 (сумма с НДС к получению) выросла → дебет. 6410 (долг по НДС) вырос → кредит.",
        },
      },
      {
        id: "m5e5",
        dt: "6310",
        kt: "4010",
        op: {
          uz: "Olingan avans yopildi.",
          ru: "Зачтён ранее полученный аванс от покупателя.",
        },
        why: {
          uz: "6310 (olingan avans majburiyati) kamaydi → debet. 4010 (xaridor qarzi) yopildi → kredit.",
          ru: "6310 (полученный аванс) закрыт → дебет. 4010 (дебиторка) уменьшилась → кредит.",
        },
      },
      {
        id: "m5e6",
        dt: "5110",
        kt: "4010",
        op: {
          uz: "Xaridor qolgan qarzdorlikni bankka to'ladi.",
          ru: "Покупатель перечислил остаток задолженности на расчётный счёт.",
        },
        why: {
          uz: "5110 (bankdagi pul) oshdi → debet. 4010 (xaridor debitorligi) yopildi → kredit.",
          ru: "5110 (деньги) выросли → дебет. 4010 (дебиторка) закрыта → кредит.",
        },
      },
      {
        id: "m5e7",
        dt: "6410",
        kt: "4410",
        op: {
          uz: "Kirish QQS (4410) zachyot qilindi (hisobga olindi).",
          ru: "Принят к зачёту входящий НДС (4410).",
        },
        why: {
          uz: "6410 (to'lanadigan QQS qarzi) kamaydi → debet. 4410 (kiruvchi QQS zachyoti) yopildi → kredit.",
          ru: "6410 (долг по НДС) уменьшился → дебет. 4410 (входящий НДС) зачтён → кредит.",
        },
      },
      {
        id: "m5e8",
        dt: "6410",
        kt: "5110",
        op: {
          uz: "QQS bo'yicha qolgan budjet qarzi bankdan to'landi.",
          ru: "Остаток задолженности по НДС уплачен в бюджет с расчётного счёта.",
        },
        why: {
          uz: "6410 (soliq qarzi) yopildi → debet. 5110 (bankdagi pul) kamaydi → kredit.",
          ru: "6410 (налоговый долг) уплачен → дебет. 5110 (деньги) уменьшились → кредит.",
        },
      },
    ],
  },
  {
    id: 6,
    title: {
      uz: "6-Mavzu: Chakana savdo (Naqd va Terminal orqali sotuv)",
      ru: "Тема 6: Розничная торговля (Наличные и Терминал)",
    },
    summary: {
      uz: "Chakana sotuv tannarxini chiqarish, naqd va terminal (Uzcard/Humo) tushumi, inkassatsiya hamda ekvayring komissiyasi.",
      ru: "Списание себестоимости в рознице, наличная и терминальная выручка, инкассация и комиссия эквайринга.",
    },
    accounts: ["9120", "2910", "5010", "9020", "5720", "5710", "5110", "9430"],
    entries: [
      {
        id: "m6e1",
        dt: "9120",
        kt: "2910",
        op: {
          uz: "Sotilgan tovar tannarxi hisobdan chiqarildi.",
          ru: "Списана себестоимость реализованных товаров.",
        },
        why: {
          uz: "9120 (tannarx xarajati) oshdi → debet. 2910 (ombordagi tovar) kamaydi → kredit.",
          ru: "9120 (себестоимость) выросла → дебет. 2910 (товар на складе) уменьшился → кредит.",
        },
      },
      {
        id: "m6e2",
        dt: "5010",
        kt: "9020",
        op: {
          uz: "Kassaga naqd sotuv tushumi kelib tushdi.",
          ru: "Поступила наличная выручка от продаж в кассу.",
        },
        why: {
          uz: "5010 (kassa) oshdi → debet. 9020 (tovar sotishdan daromad) oshdi → kredit.",
          ru: "5010 (касса) выросла → дебет. 9020 (доход от реализации) вырос → кредит.",
        },
      },
      {
        id: "m6e3",
        dt: "5720",
        kt: "9020",
        op: {
          uz: "Terminal (Uzcard/Humo/Payme) orqali sotuv amalga oshirildi.",
          ru: "Отражена реализация товаров через платёжный терминал (Uzcard/Humo/Payme).",
        },
        why: {
          uz: "5720 (plastik/ekvayring hisobvarag'i) oshdi → debet. 9020 (daromad) oshdi → kredit.",
          ru: "5720 (спецсчёт/терминал) вырос → дебет. 9020 (доход) вырос → кредит.",
        },
      },
      {
        id: "m6e4",
        dt: "5710",
        kt: "5010",
        op: {
          uz: "Kassadagi naqd pul inkassatsiyaga topshirildi (Yo'ldagi pul).",
          ru: "Наличная выручка сдана инкассатору (денежные переводы в пути).",
        },
        why: {
          uz: "5710 (yo'ldagi pul mablag'lari) oshdi → debet. 5010 (kassa) kamaydi → kredit.",
          ru: "5710 (переводы в пути) выросли → дебет. 5010 (касса) уменьшилась → кредит.",
        },
      },
      {
        id: "m6e5",
        dt: "5110",
        kt: "5710",
        op: {
          uz: "Inkassatsiyadagi naqd pul bank hisob-raqamiga kelib tushdi.",
          ru: "Инкассированная выручка зачислена на расчётный счёт в банке.",
        },
        why: {
          uz: "5110 (bankdagi pul) oshdi → debet. 5710 (yo'ldagi pul) yopildi → kredit.",
          ru: "5110 (деньги в банке) выросли → дебет. 5710 (переводы в пути) закрыты → кредит.",
        },
      },
      {
        id: "m6e6",
        dt: "9430",
        kt: "5720",
        op: {
          uz: "Terminal xizmati (ekvayring komissiyasi) xarajatga olindi.",
          ru: "Списана комиссия терминала (эквайринга) в прочие операционные расходы.",
        },
        why: {
          uz: "9430 (operatsion xarajat) oshdi → debet. 5720 (terminal hisobvarag'i) ushlanma summasiga kamaydi → kredit.",
          ru: "9430 (операционный расход) вырос → дебет. 5720 (терминал) уменьшился → кредит.",
        },
      },
    ],
  },
  {
    id: 7,
    title: {
      uz: "7-Mavzu: Inventarizatsiya, Kamomad va Moddiy zarar",
      ru: "Тема 7: Инвентаризация, Недостачи и Материальный ущерб",
    },
    summary: {
      uz: "Inventarizatsiyada tovar, material hamda tayyor mahsulot kamomadini hisobga olish, aybdorga yuklash va hisobdan chiqarish.",
      ru: "Выявление недостач ТМЦ, материалов, готовой продукции, отнесение на виновного и списание.",
    },
    accounts: ["5910", "2910", "1010", "2810", "4730", "9430", "6710"],
    entries: [
      {
        id: "m7e1",
        dt: "5910",
        kt: "2910",
        op: {
          uz: "Tovar kamomadi aniqlandi.",
          ru: "Выявлена недостача товаров при инвентаризации.",
        },
        why: {
          uz: "5910 (kamomadlar yig'uvchi schyoti) oshdi → debet. 2910 (ombordagi tovar) kamaydi → kredit.",
          ru: "5910 (недостачи) выросла → дебет. 2910 (товар на складе) уменьшился → кредит.",
        },
      },
      {
        id: "m7e2",
        dt: "5910",
        kt: "1010",
        op: {
          uz: "Xomashyo/Material kamomadi aniqlandi.",
          ru: "Выявлена недостача сырья и материалов.",
        },
        why: {
          uz: "5910 (kamomadlar) oshdi → debet. 1010 (xomashyo zaxirasi) kamaydi → kredit.",
          ru: "5910 (недостачи) выросла → дебет. 1010 (материалы) уменьшились → кредит.",
        },
      },
      {
        id: "m7e3",
        dt: "5910",
        kt: "2810",
        op: {
          uz: "Tayyor mahsulot kamomadi aniqlandi.",
          ru: "Выявлена недостача готовой продукции.",
        },
        why: {
          uz: "5910 (kamomadlar) oshdi → debet. 2810 (tayyor mahsulot) kamaydi → kredit.",
          ru: "5910 (недостачи) выросла → дебет. 2810 (готовая продукция) уменьшилась → кредит.",
        },
      },
      {
        id: "m7e4",
        dt: "4730",
        kt: "5910",
        op: {
          uz: "Kamomad aybdor xodim zimmasiga yuklatildi.",
          ru: "Сумма недостачи отнесена на виновное лицо.",
        },
        why: {
          uz: "4730 (aybdor xodimlarning moddiy zararni qoplash qarzi) oshdi → debet. 5910 (kamomad schyoti) yopildi → kredit.",
          ru: "4730 (дебиторка виновного лица) выросла → дебет. 5910 (недостачи) закрыта → кредит.",
        },
      },
      {
        id: "m7e5",
        dt: "9430",
        kt: "5910",
        op: {
          uz: "Aybdori topilmagan kamomad korxona xarajatiga olindi.",
          ru: "Недостача при неустановленных виновных списана в прочие операционные расходы.",
        },
        why: {
          uz: "9430 (operatsion xarajat) oshdi → debet. 5910 (kamomad schyoti) yopildi → kredit.",
          ru: "9430 (расход) вырос → дебет. 5910 (недостачи) закрыта → кредит.",
        },
      },
      {
        id: "m7e6",
        dt: "6710",
        kt: "4730",
        op: {
          uz: "Kamomad summasi aybdor xodimning ish haqidan ushlab qolindi.",
          ru: "Сумма недостачи удержана из заработной платы виновного сотрудника.",
        },
        why: {
          uz: "6710 (ish haqi majburiyati) kamaydi → debet. 4730 (xodim qarzi) qoplandi → kredit.",
          ru: "6710 (зарплата) уменьшилась → дебет. 4730 (долг сотрудника) погашен → кредит.",
        },
      },
    ],
  },
  {
    id: 8,
    title: {
      uz: "8-Mavzu: Asosiy Vositalar (AV) xaridi, Amortizatsiya va Ishga tushirish",
      ru: "Тема 8: Приобретение ОС, Амортизация и Ввод в эксплуатацию",
    },
    summary: {
      uz: "Asosiy vositalar va ularga o'rnatiladigan uskunalarni sotib olish, pudrat xizmati, foydalanishga topshirish hamda eskirish hisoblash.",
      ru: "Покупка основных средств, оборудования, услуг подрядчиков, ввод в эксплуатацию и начисление амортизации.",
    },
    accounts: ["0820", "6010", "0710", "0720", "4410", "01xx", "9420", "02xx", "2010", "1510", "1010", "2910", "9210"],
    entries: [
      {
        id: "m8e1",
        dt: "0820",
        kt: "6010",
        op: {
          uz: "Asosiy vosita (uskuna/jihoz) sotib olindi.",
          ru: "Приобретено основное средство (оборудование/инвентарь) от поставщика.",
        },
        why: {
          uz: "0820 (asosiy vositalarni xarid qilish kapvlogeniya) oshdi → debet. 6010 (ta'minotchiga qarz) oshdi → kredit.",
          ru: "0820 (приобретение ОС) выросло → дебет. 6010 (долг поставщику) вырос → кредит.",
        },
      },
      {
        id: "m8e2",
        dt: "0710",
        kt: "6010",
        op: {
          uz: "O'rnatiladigan uskunalar xarid qilindi.",
          ru: "Приобретено оборудование к установке.",
        },
        why: {
          uz: "0710 (o'rnatiladigan uskunalar) oshdi → debet. 6010 (ta'minotchiga qarz) oshdi → kredit.",
          ru: "0710 (оборудование к установке) выросло → дебет. 6010 (долг поставщику) вырос → кредит.",
        },
      },
      {
        id: "m8e3",
        dt: "0720",
        kt: "6010",
        op: {
          uz: "Qurilish va montaj ishlari bo'yicha pudrat xizmati olindi.",
          ru: "Получены услуги подрядчиков по строительству и монтажу.",
        },
        why: {
          uz: "0720 (montajdagi uskunalar/xarajatlar) oshdi → debet. 6010 (pudratchiga qarz) oshdi → kredit.",
          ru: "0720 (оборудование в монтаже) выросло → дебет. 6010 (долг подрядчику) вырос → кредит.",
        },
      },
      {
        id: "m8e4",
        dt: "4410",
        kt: "6010",
        op: {
          uz: "Asosiy vositalar xarididagi QQS (12%) hisobga olindi.",
          ru: "Отражён входящий НДС (12%) при покупке основных средств.",
        },
        why: {
          uz: "4410 (kiruvchi QQS zachyot huquqi) oshdi → debet. 6010 (ta'minotchi qarzining QQS qismi) oshdi → kredit.",
          ru: "4410 (входящий НДС) вырос → дебет. 6010 (долг с НДС) вырос → кредит.",
        },
      },
      {
        id: "m8e5",
        dt: "01xx",
        kt: "0820",
        op: {
          uz: "Asosiy vosita foydalanishga topshirildi (0100 schyotlarga o'tdi).",
          ru: "Основное средство введено в эксплуатацию (переведено на счёт 01xx).",
        },
        why: {
          uz: "01xx (mashina va uskunalar boshlang'ich qiymati) oshdi → debet. 0820 (kapital qo'yilmalar) yopildi → kredit.",
          ru: "01xx (первоначальная стоимость ОС) выросла → дебет. 0820 (капвложения) закрыты → кредит.",
        },
      },
      {
        id: "m8e6",
        dt: "9420",
        kt: "02xx",
        op: {
          uz: "Ma'muriy binolar va jihozlar uchun eskirish (amortizatsiya) hisoblandi.",
          ru: "Начислена амортизация административных зданий и оборудования.",
        },
        why: {
          uz: "9420 (ma'muriy xarajat) oshdi → debet. 02xx (eskirish kontr-aktiv) oshdi → kredit.",
          ru: "9420 (админ. расход) вырос → дебет. 02xx (износ) вырос → кредит.",
        },
      },
      {
        id: "m8e7",
        dt: "2010",
        kt: "02xx",
        op: {
          uz: "Ishlab chiqarish uskunalari uchun eskirish hisoblandi.",
          ru: "Начислена амортизация производственного оборудования.",
        },
        why: {
          uz: "2010 (ishlab chiqarish tannarxi) oshdi → debet. 02xx (eskirish kontr-aktiv) oshdi → kredit.",
          ru: "2010 (себестоимость) выросла → дебет. 02xx (износ) вырос → кредит.",
        },
      },
      {
        id: "m8e8",
        dt: "1510",
        kt: "6010",
        op: {
          uz: "Qo'shimcha xarajat sotib olindi — 1510 tayyorlash schyotiga olindi.",
          ru: "Приобретены дополнительные расходы — оприходованы на счёт заготовления 1510.",
        },
        why: {
          uz: "Xarid vaqtida aktivning turi hali aniqlanmagan: 1510 (tayyorlash va xarid) oshdi → debet. 6010 (ta'minotchiga qarz) oshdi → kredit.",
          ru: "В момент покупки вид актива ещё не определён: 1510 (заготовление и приобретение) выросло → дебет. 6010 (долг поставщику) вырос → кредит.",
        },
      },
      {
        id: "m8e9",
        dt: "0820",
        kt: "1510",
        op: {
          uz: "Qo'shimcha xarajat asosiy vosita tarkibiga kiritildi.",
          ru: "Дополнительные расходы отнесены в состав основных средств.",
        },
        why: {
          uz: "Aktiv 1 yildan ortiq xizmat qilsa — kapital qo'yilma: 0820 oshdi → debet. 1510 yopildi → kredit.",
          ru: "Если срок службы более года — это капвложение: 0820 выросло → дебет. 1510 закрыт → кредит.",
        },
      },
      {
        id: "m8e10",
        dt: "1010",
        kt: "1510",
        op: {
          uz: "Qo'shimcha xarajat xom ashyo/materiallar tarkibiga kiritildi.",
          ru: "Дополнительные расходы отнесены в состав сырья/материалов.",
        },
        why: {
          uz: "Aktiv ishlab chiqarishda sarflansa — material: 1010 oshdi → debet. 1510 yopildi → kredit.",
          ru: "Если актив расходуется в производстве — это материал: 1010 выросло → дебет. 1510 закрыт → кредит.",
        },
      },
      {
        id: "m8e11",
        dt: "2910",
        kt: "1510",
        op: {
          uz: "Qo'shimcha xarajat tovar sifatida omborga kiritildi.",
          ru: "Дополнительные расходы оприходованы как товар на складе.",
        },
        why: {
          uz: "Aktiv qayta sotish uchun olingan bo'lsa — tovar: 2910 oshdi → debet. 1510 yopildi → kredit.",
          ru: "Если актив куплен для перепродажи — это товар: 2910 выросло → дебет. 1510 закрыт → кредит.",
        },
      },
      {
        id: "m8e12",
        dt: "9210",
        kt: "01xx",
        op: {
          uz: "Asosiy vositaning boshlang'ich qiymati chiqib ketishga o'tkazildi.",
          ru: "Первоначальная стоимость ОС списана на выбытие.",
        },
        why: {
          uz: "9210 (asosiy vositalar chiqib ketishi) — chiqim qismi debetda to'planadi. 01xx (aktiv) kamaydi → kredit.",
          ru: "9210 (выбытие ОС) — списываемая стоимость собирается по дебету. 01xx (актив) уменьшился → кредит.",
        },
      },
      {
        id: "m8e13",
        dt: "02xx",
        kt: "9210",
        op: {
          uz: "Chiqib ketayotgan asosiy vositaning jamlangan eskirishi hisobdan chiqarildi.",
          ru: "Списан накопленный износ выбывающего основного средства.",
        },
        why: {
          uz: "02xx kontr-aktiv: kamayishi debetda. 9210 kreditlanadi — shu bilan qoldiq (balans) qiymat aniqlanadi.",
          ru: "02xx контр-активный: уменьшение по дебету. 9210 кредитуется — так определяется остаточная стоимость.",
        },
      },
    ],
  },
  {
    id: 9,
    title: {
      uz: "9-Mavzu: Nomoddiy aktivlar (NMA) — xaridi, foydalanishga qabul qilish va amortizatsiya",
      ru: "Тема 9: Нематериальные активы (НМА) — покупка, ввод в эксплуатацию и амортизация",
    },
    summary: {
      uz: "Litsenziya, dasturiy ta'minot va boshqa nomoddiy aktivlarni sotib olish, 0830 orqali 04xx ga o'tkazish va 05xx bo'yicha amortizatsiya hisoblash.",
      ru: "Покупка лицензий, ПО и прочих НМА, перевод через 0830 на 04xx и начисление амортизации по 05xx.",
    },
    accounts: ["0830", "04xx", "05xx", "6010", "9420", "2010"],
    entries: [
      {
        id: "m9e1",
        dt: "0830",
        kt: "6010",
        op: {
          uz: "Nomoddiy aktiv sotib olindi.",
          ru: "Приобретён нематериальный актив.",
        },
        why: {
          uz: "0830 (NMA xarid qilish — kapital qo'yilma) oshdi → debet. 6010 (ta'minotchiga qarz) oshdi → kredit.",
          ru: "0830 (приобретение НМА — капвложение) выросло → дебет. 6010 (долг поставщику) вырос → кредит.",
        },
      },
      {
        id: "m9e2",
        dt: "04xx",
        kt: "0830",
        op: {
          uz: "Nomoddiy aktiv foydalanishga qabul qilindi.",
          ru: "Нематериальный актив принят к использованию.",
        },
        why: {
          uz: "04xx (NMA boshlang'ich qiymati) oshdi → debet. 0830 dagi to'plangan xarajat yopildi → kredit.",
          ru: "04xx (первоначальная стоимость НМА) выросла → дебет. Накопленные затраты 0830 закрыты → кредит.",
        },
      },
      {
        id: "m9e3",
        dt: "9420",
        kt: "05xx",
        op: {
          uz: "NMA bo'yicha amortizatsiya ma'muriy xarajatga hisoblandi.",
          ru: "Начислена амортизация НМА в состав административных расходов.",
        },
        why: {
          uz: "9420 (ma'muriy xarajat) oshdi → debet. 05xx (NMA amortizatsiyasi, kontr-aktiv) oshdi → kredit.",
          ru: "9420 (админ. расход) вырос → дебет. 05xx (амортизация НМА, контр-актив) выросла → кредит.",
        },
      },
      {
        id: "m9e4",
        dt: "2010",
        kt: "05xx",
        op: {
          uz: "NMA amortizatsiyasi ishlab chiqarish xarajatiga qo'shildi.",
          ru: "Амортизация НМА отнесена на производственные затраты.",
        },
        why: {
          uz: "Agar NMA ishlab chiqarishda ishlatilsa: 2010 (tannarx) oshdi → debet. 05xx (kontr-aktiv) oshdi → kredit.",
          ru: "Если НМА используется в производстве: 2010 (себестоимость) выросла → дебет. 05xx (контр-актив) выросла → кредит.",
        },
      },
    ],
  },
];


export const ALL_ENTRIES = MODULES.flatMap((m) => m.entries.map((e) => ({ ...e, moduleId: m.id })));
export const TOTAL_MODULES = MODULES.length;