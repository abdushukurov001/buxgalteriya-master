export type AccountType = "A" | "KA" | "P" | "KP" | "D" | "KD" | "X";

export type AccountItem = {
  code: string;
  name: { uz: string; ru: string };
  type: AccountType;
  isGroupHeader?: boolean;
};

export type Division = {
  id: number;
  title: { uz: string; ru: string };
  groups: {
    headerCode: string;
    headerName: { uz: string; ru: string };
    type: AccountType;
    accounts: AccountItem[];
  }[];
};

export type Part = {
  id: number;
  title: { uz: string; ru: string };
  divisions: Division[];
};

export const FULL_CHART_OF_ACCOUNTS: Part[] = [
  {
    id: 1,
    title: { uz: "I QISM. UZOQ MUDDATLI AKTIVLAR", ru: "РАЗДЕЛ I. ВНЕОБОРОТНЫЕ АКТИВЫ" },
    divisions: [
      {
        id: 1,
        title: {
          uz: "1-bo'lim. Asosiy vositalar, nomoddiy aktivlar va boshqa uzoq muddatli aktivlar",
          ru: "1-я группа. Основные средства, нематериальные активы и прочие долгосрочные активы",
        },
        groups: [
          {
            headerCode: "0100",
            headerName: { uz: "ASOSIY VOSITALAR", ru: "ОСНОВНЫЕ СРЕДСТВА" },
            type: "A",
            accounts: [
              { code: "0110", name: { uz: "Yer", ru: "Земля" }, type: "A" },
              { code: "0111", name: { uz: "Yerni obodonlashtirish", ru: "Благоустройство земли" }, type: "A" },
              { code: "0112", name: { uz: "Moliyaviy ijara shartnomasi bo'yicha olingan asosiy vositalarni obodonlashtirish", ru: "Благоустройство основных средств, полученных по договору финансовой аренды" }, type: "A" },
              { code: "0120", name: { uz: "Binolar, inshootlar va uzatuvchi moslamalar", ru: "Здания, сооружения и передаточные устройства" }, type: "A" },
              { code: "0130", name: { uz: "Mashina va asbob-uskunalar", ru: "Машины и оборудование" }, type: "A" },
              { code: "0140", name: { uz: "Mebel va ofis jihozlari", ru: "Мебель и офисное оборудование" }, type: "A" },
              { code: "0150", name: { uz: "Kompyuter jihozlari va hisoblash texnikasi", ru: "Компьютерное оборудование и вычислительная техника" }, type: "A" },
              { code: "0160", name: { uz: "Transport vositalari", ru: "Транспортные средства" }, type: "A" },
              { code: "0170", name: { uz: "Ishchi va mahsuldor hayvonlar", ru: "Рабочий и продуктивный скот" }, type: "A" },
              { code: "0180", name: { uz: "Ko'p yillik o'simliklar", ru: "Многолетние насаждения" }, type: "A" },
              { code: "0190", name: { uz: "Boshqa asosiy vositalar", ru: "Прочие основные средства" }, type: "A" },
              { code: "0199", name: { uz: "Konservatsiya qilingan asosiy vositalar", ru: "Законсервированные основные средства" }, type: "A" },
            ],
          },
          {
            headerCode: "0200",
            headerName: { uz: "ASOSIY VOSITALARNING ESKIRISHI", ru: "ИЗНОС ОСНОВНЫХ СРЕДСТВ" },
            type: "KA",
            accounts: [
              { code: "0211", name: { uz: "Yerni obodonlashtirishning eskirishi", ru: "Износ благоустройства земли" }, type: "KA" },
              { code: "0212", name: { uz: "Moliyaviy ijara shartnomasi bo'yicha olingan asosiy vositalarni obodonlashtirishning eskirishi", ru: "Износ благоустройства ОС, полученных по финансовой аренде" }, type: "KA" },
              { code: "0220", name: { uz: "Bino, inshoot va uzatuvchi moslamalarning eskirishi", ru: "Износ зданий, сооружений и передаточных устройств" }, type: "KA" },
              { code: "0230", name: { uz: "Mashina va asbob-uskunalarning eskirishi", ru: "Износ машин и оборудования" }, type: "KA" },
              { code: "0240", name: { uz: "Mebel va ofis jihozlarining eskirishi", ru: "Износ мебели и офисного оборудования" }, type: "KA" },
              { code: "0250", name: { uz: "Kompyuter jihozlari va hisoblash texnikasining eskirishi", ru: "Износ компьютерного оборудования и вычислительной техники" }, type: "KA" },
              { code: "0260", name: { uz: "Transport vositalarining eskirishi", ru: "Износ транспортных средств" }, type: "KA" },
              { code: "0270", name: { uz: "Ishchi hayvonlarning eskirishi", ru: "Износ рабочего скота" }, type: "KA" },
              { code: "0280", name: { uz: "Ko'p yillik o'simliklarning eskirishi", ru: "Износ многолетних насаждений" }, type: "KA" },
              { code: "0290", name: { uz: "Boshqa asosiy vositalarning eskirishi", ru: "Износ прочих основных средств" }, type: "KA" },
              { code: "0299", name: { uz: "Moliyaviy ijara shartnomasi bo'yicha olingan asosiy vositalarning eskirishi", ru: "Износ ОС, полученных по финансовой аренде" }, type: "KA" },
            ],
          },
          {
            headerCode: "0300",
            headerName: { uz: "MOLIYAVIY IJARA SHARTNOMASI BO'YICHA OLINGAN ASOSIY VOSITALAR", ru: "ОСНОВНЫЕ СРЕДСТВА, ПОЛУЧЕННЫЕ ПО ДОГОВОРУ ФИНАНСОВОЙ АРЕНДЫ" },
            type: "A",
            accounts: [
              { code: "0310", name: { uz: "Moliyaviy ijara shartnomasi bo'yicha olingan asosiy vositalar", ru: "Основные средства, полученные по финансовой аренде" }, type: "A" },
            ],
          },
          {
            headerCode: "0400",
            headerName: { uz: "NOMODDIY AKTIVLAR", ru: "НЕМАТЕРИАЛЬНЫЕ АКТИВЫ" },
            type: "A",
            accounts: [
              { code: "0410", name: { uz: "Patentlar, litsenziyalar va nou-xau", ru: "Патенты, лицензии и ноу-хау" }, type: "A" },
              { code: "0420", name: { uz: "Savdo markalari, tovar belgilari va sanoat namunalari", ru: "Товарные знаки и промышленные образцы" }, type: "A" },
              { code: "0430", name: { uz: "Dasturiy ta'minot", ru: "Программное обеспечение" }, type: "A" },
              { code: "0440", name: { uz: "Yer va tabiat resurslaridan foydalanish huquqlari", ru: "Права пользования землёй и природными ресурсами" }, type: "A" },
              { code: "0450", name: { uz: "Tashkiliy xarajatlar", ru: "Организационные расходы" }, type: "A" },
              { code: "0460", name: { uz: "Franchayz", ru: "Франчайз" }, type: "A" },
              { code: "0470", name: { uz: "Mualliflik huquqlari", ru: "Авторские права" }, type: "A" },
              { code: "0480", name: { uz: "Gudvill", ru: "Гудвилл" }, type: "A" },
              { code: "0490", name: { uz: "Boshqa nomoddiy aktivlar", ru: "Прочие нематериальные активы" }, type: "A" },
            ],
          },
          {
            headerCode: "0500",
            headerName: { uz: "NOMODDIY AKTIVLAR AMORTIZATSIYASI", ru: "АМОРТИЗАЦИЯ НЕМАТЕРИАЛЬНЫХ АКТИВОВ" },
            type: "KA",
            accounts: [
              { code: "0510", name: { uz: "Patentlar, litsenziyalar va nou-xauning amortizatsiyasi", ru: "Амортизация патентов, лицензий и ноу-хау" }, type: "KA" },
              { code: "0520", name: { uz: "Savdo markalari, tovar belgilari va sanoat namunalarining amortizatsiyasi", ru: "Амортизация товарных знаков и промышленных образцов" }, type: "KA" },
              { code: "0530", name: { uz: "Dasturiy ta'minotning amortizatsiyasi", ru: "Амортизация программного обеспечения" }, type: "KA" },
              { code: "0540", name: { uz: "Yer va tabiat resurslaridan foydalanish huquqlarining amortizatsiyasi", ru: "Амортизация прав пользования землёй и природными ресурсами" }, type: "KA" },
              { code: "0550", name: { uz: "Tashkiliy xarajatlarning amortizatsiyasi", ru: "Амортизация организационных расходов" }, type: "KA" },
              { code: "0560", name: { uz: "Franchayzning amortizatsiyasi", ru: "Амортизация франчайза" }, type: "KA" },
              { code: "0570", name: { uz: "Mualliflik huquqlarining amortizatsiyasi", ru: "Амортизация авторских прав" }, type: "KA" },
              { code: "0590", name: { uz: "Boshqa nomoddiy aktivlarning amortizatsiyasi", ru: "Амортизация прочих нематериальных активов" }, type: "KA" },
            ],
          },
          {
            headerCode: "0600",
            headerName: { uz: "UZOQ MUDDATLI INVESTITSIYALAR", ru: "ДОЛГОСРОЧНЫЕ ИНВЕСТИЦИИ" },
            type: "A",
            accounts: [
              { code: "0610", name: { uz: "Qimmatli qog'ozlar", ru: "Ценные бумаги" }, type: "A" },
              { code: "0620", name: { uz: "Sho'ba xo'jalik jamiyatlariga investitsiyalar", ru: "Инвестиции в дочерние общества" }, type: "A" },
              { code: "0630", name: { uz: "Qaram xo'jalik jamiyatlariga investitsiyalar", ru: "Инвестиции в зависимые общества" }, type: "A" },
              { code: "0640", name: { uz: "Chet el kapitali mavjud bo'lgan korxonalarga investitsiyalar", ru: "Инвестиции в предприятия с иностранным капиталом" }, type: "A" },
              { code: "0690", name: { uz: "Boshqa uzoq muddatli investitsiyalar", ru: "Прочие долгосрочные инвестиции" }, type: "A" },
            ],
          },
          {
            headerCode: "0700",
            headerName: { uz: "O'RNATILADIGAN ASBOB-USKUNALAR", ru: "ОБОРУДОВАНИЕ К УСТАНОВКЕ" },
            type: "A",
            accounts: [
              { code: "0710", name: { uz: "O'rnatiladigan asbob-uskunalar — mahalliy", ru: "Оборудование к установке — отечественное" }, type: "A" },
              { code: "0720", name: { uz: "O'rnatiladigan asbob-uskunalar — xorijiy", ru: "Оборудование к установке — импортное" }, type: "A" },
            ],
          },
          {
            headerCode: "0800",
            headerName: { uz: "KAPITAL QO'YILMALAR", ru: "КАПИТАЛЬНЫЕ ВЛОЖЕНИЯ" },
            type: "A",
            accounts: [
              { code: "0810", name: { uz: "Tugallanmagan qurilish", ru: "Незавершённое строительство" }, type: "A" },
              { code: "0820", name: { uz: "Asosiy vositalarni xarid qilish", ru: "Приобретение основных средств" }, type: "A" },
              { code: "0830", name: { uz: "Nomoddiy aktivlarni xarid qilish", ru: "Приобретение нематериальных активов" }, type: "A" },
              { code: "0840", name: { uz: "Asosiy podani tashkil qilish", ru: "Формирование основного стада" }, type: "A" },
              { code: "0850", name: { uz: "Yerni obodonlashtirishga kapital qo'yilmalar", ru: "Капвложения в благоустройство земли" }, type: "A" },
              { code: "0860", name: { uz: "Moliyaviy ijara shartnomasi bo'yicha olingan asosiy vositalarga kapital qo'yilmalar", ru: "Капвложения в ОС по финансовой аренде" }, type: "A" },
              { code: "0890", name: { uz: "Boshqa kapital qo'yilmalar", ru: "Прочие капитальные вложения" }, type: "A" },
            ],
          },
          {
            headerCode: "0900",
            headerName: { uz: "UZOQ MUDDATLI DEBITOR QARZLARI VA KECHIKTIRILGAN XARAJATLAR", ru: "ДОЛГОСРОЧНАЯ ДЕБИТОРСКАЯ ЗАДОЛЖЕННОСТЬ И ОТСРОЧЕННЫЕ РАСХОДЫ" },
            type: "A",
            accounts: [
              { code: "0910", name: { uz: "Olingan veksellar", ru: "Векселя полученные" }, type: "A" },
              { code: "0920", name: { uz: "Moliyaviy ijara bo'yicha olinadigan to'lovlar", ru: "Платежи к получению по финансовой аренде" }, type: "A" },
              { code: "0930", name: { uz: "Xodimlarning uzoq muddatli qarzlari", ru: "Долгосрочная задолженность персонала" }, type: "A" },
              { code: "0940", name: { uz: "Boshqa uzoq muddatli debitor qarzi", ru: "Прочая долгосрочная дебиторская задолженность" }, type: "A" },
              { code: "0950", name: { uz: "Vaqtinchalik farqlar bo'yicha kechiktirilgan foyda solig'i", ru: "Отсроченный налог на прибыль по временным разницам" }, type: "A" },
              { code: "0960", name: { uz: "Diskont (chegirma)lar bo'yicha uzoq muddatli kechiktirilgan xarajatlar", ru: "Долгосрочные отсроченные расходы по дисконту" }, type: "A" },
              { code: "0990", name: { uz: "Boshqa uzoq muddatli kechiktirilgan xarajatlar", ru: "Прочие долгосрочные отсроченные расходы" }, type: "A" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: { uz: "II QISM. JORIY AKTIVLAR", ru: "РАЗДЕЛ II. ТЕКУЩИЕ АКТИВЫ" },
    divisions: [
      {
        id: 2,
        title: {
          uz: "2-bo'lim. Tovar-moddiy zaxiralar",
          ru: "2-я группа. Товарно-материальные запасы",
        },
        groups: [
          {
            headerCode: "1000",
            headerName: { uz: "MATERIALLAR", ru: "МАТЕРИАЛЫ" },
            type: "A",
            accounts: [
              { code: "1010", name: { uz: "Xomashyo va materiallar", ru: "Сырьё и материалы" }, type: "A" },
              { code: "1020", name: { uz: "Sotib olingan yarim tayyor mahsulotlar va butlovchi buyumlar", ru: "Покупные полуфабрикаты и комплектующие" }, type: "A" },
              { code: "1030", name: { uz: "Yoqilg'i", ru: "Топливо" }, type: "A" },
              { code: "1040", name: { uz: "Ehtiyot qismlar", ru: "Запасные части" }, type: "A" },
              { code: "1050", name: { uz: "Qurilish materiallari", ru: "Строительные материалы" }, type: "A" },
              { code: "1060", name: { uz: "Idish va idishbop materiallar", ru: "Тара и тарные материалы" }, type: "A" },
              { code: "1070", name: { uz: "Chetga qayta ishlash uchun berilgan materiallar", ru: "Материалы, переданные в переработку на сторону" }, type: "A" },
              { code: "1080", name: { uz: "Inventar va xo'jalik jihozlari", ru: "Инвентарь и хозяйственные принадлежности" }, type: "A" },
              { code: "1090", name: { uz: "Boshqa materiallar", ru: "Прочие материалы" }, type: "A" },
            ],
          },
          {
            headerCode: "1100",
            headerName: { uz: "O'STIRISHDAGI VA BO'QUVDAGI HAYVONLAR", ru: "ЖИВОТНЫЕ НА ВЫРАЩИВАНИИ И ОТКОРМЕ" },
            type: "A",
            accounts: [
              { code: "1110", name: { uz: "O'stirishdagi hayvonlar", ru: "Животные на выращивании" }, type: "A" },
              { code: "1120", name: { uz: "Bo'roqdidagi hayvonlar", ru: "Животные на откорме" }, type: "A" },
            ],
          },
          {
            headerCode: "1500",
            headerName: { uz: "MATERIALLARNI TAYYORLASH VA XARID QILISH", ru: "ЗАГОТОВЛЕНИЕ И ПРИОБРЕТЕНИЕ МАТЕРИАЛОВ" },
            type: "A",
            accounts: [
              { code: "1510", name: { uz: "Materiallarni tayyorlash va xarid qilish", ru: "Заготовление и приобретение материалов" }, type: "A" },
            ],
          },
          {
            headerCode: "1600",
            headerName: { uz: "MATERIALLAR QIYMATIDAGI FARQLAR", ru: "ОТКЛОНЕНИЯ В СТОИМОСТИ МАТЕРИАЛОВ" },
            type: "A",
            accounts: [
              { code: "1610", name: { uz: "Materiallar qiymatidagi farqlar", ru: "Отклонения в стоимости материалов" }, type: "A" },
            ],
          },
          {
            headerCode: "2000",
            headerName: { uz: "ASOSIY ISHLAB CHIQARISH", ru: "ОСНОВНОЕ ПРОИЗВОДСТВО" },
            type: "A",
            accounts: [
              { code: "2010", name: { uz: "Asosiy ishlab chiqarish", ru: "Основное производство" }, type: "A" },
            ],
          },
          {
            headerCode: "2100",
            headerName: { uz: "O'ZIDA ISHLAB CHIQARILGAN YARIM TAYYOR MAHSULOTLAR", ru: "ПОЛУФАБРИКАТЫ СОБСТВЕННОГО ПРОИЗВОДСТВА" },
            type: "A",
            accounts: [
              { code: "2110", name: { uz: "O'zida ishlab chiqarilgan yarim tayyor mahsulotlar", ru: "Полуфабрикаты собственного производства" }, type: "A" },
            ],
          },
          {
            headerCode: "2300",
            headerName: { uz: "YORDAMCHI ISHLAB CHIQARISH", ru: "ВСПОМОГАТЕЛЬНОЕ ПРОИЗВОДСТВО" },
            type: "A",
            accounts: [
              { code: "2310", name: { uz: "Yordamchi ishlab chiqarish", ru: "Вспомогательное производство" }, type: "A" },
            ],
          },
          {
            headerCode: "2500",
            headerName: { uz: "UMUMISHLAB CHIQARISH XARAJATLARI", ru: "ОБЩЕПРОИЗВОДСТВЕННЫЕ РАСХОДЫ" },
            type: "A",
            accounts: [
              { code: "2510", name: { uz: "Umumishlab chiqarish xarajatlari", ru: "Общепроизводственные расходы" }, type: "A" },
            ],
          },
          {
            headerCode: "2600",
            headerName: { uz: "ISHLAB CHIQARISHDAGI YAROQSIZ MAHSULOTLAR", ru: "БРАК В ПРОИЗВОДСТВЕ" },
            type: "A",
            accounts: [
              { code: "2610", name: { uz: "Ishlab chiqarishdagi yaroqsiz mahsulotlar", ru: "Брак в производстве" }, type: "A" },
            ],
          },
          {
            headerCode: "2700",
            headerName: { uz: "XIZMAT KO'RSATUVCHI XO'JALIKLAR", ru: "ОБСЛУЖИВАЮЩИЕ ХОЗЯЙСТВА" },
            type: "A",
            accounts: [
              { code: "2710", name: { uz: "Xizmat ko'rsatuvchi xo'jaliklar", ru: "Обслуживающие хозяйства" }, type: "A" },
            ],
          },
          {
            headerCode: "2800",
            headerName: { uz: "TAYYOR MAHSULOTLAR", ru: "ГОТОВАЯ ПРОДУКЦИЯ" },
            type: "A",
            accounts: [
              { code: "2810", name: { uz: "Ombordagi tayyor mahsulotlar", ru: "Готовая продукция на складе" }, type: "A" },
              { code: "2820", name: { uz: "Ko'rgazmadagi tayyor mahsulotlar", ru: "Готовая продукция на выставке" }, type: "A" },
              { code: "2830", name: { uz: "Komissiyaga berilgan tayyor mahsulotlar", ru: "Готовая продукция, переданная на комиссию" }, type: "A" },
            ],
          },
          {
            headerCode: "2900",
            headerName: { uz: "TOVARLAR", ru: "ТОВАРЫ" },
            type: "A",
            accounts: [
              { code: "2910", name: { uz: "Ombordagi tovarlar", ru: "Товары на складе" }, type: "A" },
              { code: "2920", name: { uz: "Chakana savdodagi tovarlar", ru: "Товары в розничной торговле" }, type: "A" },
              { code: "2930", name: { uz: "Ko'rgazmadagi tovarlar", ru: "Товары на выставке" }, type: "A" },
              { code: "2940", name: { uz: "Prokatdagi buyumlar", ru: "Предметы проката" }, type: "A" },
              { code: "2950", name: { uz: "Tovarlar bilan band va bo'sh idishlar", ru: "Тара под товаром и порожняя" }, type: "A" },
              { code: "2960", name: { uz: "Komissiyaga berilgan tovarlar", ru: "Товары переданные на комиссию" }, type: "A" },
              { code: "2970", name: { uz: "Yo'ldagi tovarlar", ru: "Товары в пути" }, type: "A" },
              { code: "2980", name: { uz: "Savdo ustamasi", ru: "Торговая наценка" }, type: "KA" },
              { code: "2990", name: { uz: "Boshqa tovarlar", ru: "Прочие товары" }, type: "A" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: {
          uz: "3-bo'lim. Kelgusi davr xarajatlari va kechiktirilgan xarajatlar — joriy qismi",
          ru: "3-я группа. Расходы будущих периодов и отсроченные расходы — текущая часть",
        },
        groups: [
          {
            headerCode: "3100",
            headerName: { uz: "KELGUSI DAVR XARAJATLARI", ru: "РАСХОДЫ БУДУЩИХ ПЕРИОДОВ" },
            type: "A",
            accounts: [
              { code: "3110", name: { uz: "Oldindan to'langan operativ ijara haqi", ru: "Арендная плата, оплаченная вперёд" }, type: "A" },
              { code: "3120", name: { uz: "Oldindan to'langan xizmat haqi", ru: "Оплата услуг, внесённая вперёд" }, type: "A" },
              { code: "3190", name: { uz: "Boshqa kelgusi davr xarajatlari", ru: "Прочие расходы будущих периодов" }, type: "A" },
            ],
          },
          {
            headerCode: "3200",
            headerName: { uz: "KECHIKTIRILGAN XARAJATLAR", ru: "ОТСРОЧЕННЫЕ РАСХОДЫ" },
            type: "A",
            accounts: [
              { code: "3210", name: { uz: "Vaqtinchalik farqlar bo'yicha kechiktirilgan foyda solig'i", ru: "Отсроченный налог на прибыль по временным разницам" }, type: "A" },
              { code: "3220", name: { uz: "Diskont (chegirma)lar bo'yicha kechiktirilgan xarajatlar", ru: "Отсроченные расходы по дисконту" }, type: "A" },
              { code: "3290", name: { uz: "Boshqa kechiktirilgan xarajatlar", ru: "Прочие отсроченные расходы" }, type: "A" },
            ],
          },
        ],
      },
      {
        id: 4,
        title: {
          uz: "4-bo'lim. Olinadigan schyotlar — joriy qismi",
          ru: "4-я группа. Счета к получению — текущая часть",
        },
        groups: [
          {
            headerCode: "4000",
            headerName: { uz: "OLINADIGAN SCHYOTLAR", ru: "СЧЕТА К ПОЛУЧЕНИЮ" },
            type: "A",
            accounts: [
              { code: "4010", name: { uz: "Xaridorlar va buyurtmachilardan olinadigan schyotlar", ru: "Счета к получению от покупателей и заказчиков" }, type: "A" },
              { code: "4020", name: { uz: "Olingan veksellar", ru: "Векселя полученные" }, type: "A" },
            ],
          },
          {
            headerCode: "4100",
            headerName: { uz: "AJRATILGAN BO'LINMALAR, SHO'BA VA QARAM XO'JALIK JAMIYATLARIDAN OLINADIGAN SCHYOTLAR", ru: "СЧЕТА К ПОЛУЧЕНИЮ ОТ ДОЧЕРНИХ И ЗАВИСИМЫХ ОБЩЕСТВ" },
            type: "A",
            accounts: [
              { code: "4110", name: { uz: "Ajratilgan bo'linmalardan olinadigan schyot", ru: "Счета к получению от обособленных подразделений" }, type: "A" },
              { code: "4120", name: { uz: "Sho'ba va qaram xo'jalik jamiyatlaridan olinadigan schyot", ru: "Счета к получению от дочерних и зависимых обществ" }, type: "A" },
            ],
          },
          {
            headerCode: "4200",
            headerName: { uz: "XODIMLARGA BERILGAN BO'NAKLAR", ru: "АВАНСЫ, ВЫДАННЫЕ ПЕРСОНАЛУ" },
            type: "A",
            accounts: [
              { code: "4210", name: { uz: "Mehnat haqi bo'yicha berilgan bo'naklar", ru: "Авансы по оплате труда" }, type: "A" },
              { code: "4220", name: { uz: "Xizmat safarlariga berilgan bo'naklar", ru: "Авансы на командировочные расходы" }, type: "A" },
              { code: "4230", name: { uz: "Umumxo'jalik xarajatlari uchun berilgan bo'naklar", ru: "Авансы на общехозяйственные расходы" }, type: "A" },
              { code: "4290", name: { uz: "Xodimlarga berilgan boshqa bo'naklar", ru: "Прочие авансы, выданные персоналу" }, type: "A" },
            ],
          },
          {
            headerCode: "4300",
            headerName: { uz: "MOL YETKAZIB BERUVCHILAR VA PUDRATCHILARGA BERILGAN BO'NAKLAR", ru: "АВАНСЫ, ВЫДАННЫЕ ПОСТАВЩИКАМ И ПОДРЯДЧИКАМ" },
            type: "A",
            accounts: [
              { code: "4310", name: { uz: "TMQlar uchun mol yetkazib beruvchilar va pudratchilarga berilgan bo'naklar", ru: "Авансы, выданные под ТМЦ" }, type: "A" },
              { code: "4320", name: { uz: "Uzoq muddatli aktivlar uchun mol yetkazib beruvchilar va pudratchilarga berilgan bo'naklar", ru: "Авансы, выданные под долгосрочные активы" }, type: "A" },
              { code: "4330", name: { uz: "Boshqa berilgan bo'naklar", ru: "Прочие выданные авансы" }, type: "A" },
            ],
          },
          {
            headerCode: "4400",
            headerName: { uz: "BYUDJETGA BO'NAK TO'LOVLARI", ru: "АВАНСОВЫЕ ПЛАТЕЖИ В БЮДЖЕТ" },
            type: "A",
            accounts: [
              { code: "4410", name: { uz: "Byudjetga soliqlar va boshqa majburiy to'lovlar bo'yicha bo'nak to'lovlari", ru: "Авансовые платежи в бюджет по налогам" }, type: "A" },
            ],
          },
          {
            headerCode: "4500",
            headerName: { uz: "MAQSADLI DAVLAT JAMG'ARMALARIGA VA SUG'URTALAR BO'YICHA BO'NAK TO'LOVLARI", ru: "АВАНСОВЫЕ ПЛАТЕЖИ В ГОСФОНДЫ И ПО СТРАХОВАНИЮ" },
            type: "A",
            accounts: [
              { code: "4510", name: { uz: "Sug'urtalar bo'yicha bo'nak to'lovlari", ru: "Авансовые платежи по страхованию" }, type: "A" },
              { code: "4520", name: { uz: "Maqsadli davlat jamg'armalariga bo'nak to'lovlari", ru: "Авансовые платежи в целевые госфонды" }, type: "A" },
            ],
          },
          {
            headerCode: "4600",
            headerName: { uz: "USTAV KAPITALIGA TA'SISCHILARNING ULUSHLARI BO'YICHA QARZI", ru: "ЗАДОЛЖЕННОСТЬ УЧРЕДИТЕЛЕЙ ПО ВКЛАДАМ В УСТАВНЫЙ КАПИТАЛ" },
            type: "A",
            accounts: [
              { code: "4610", name: { uz: "Ustav kapitaliga ta'sischilarning ulushlari bo'yicha qarzi", ru: "Задолженность учредителей по вкладам в уставный капитал" }, type: "A" },
            ],
          },
          {
            headerCode: "4700",
            headerName: { uz: "XODIMLARNING BOSHQA OPERATSIYALAR BO'YICHA QARZI", ru: "ЗАДОЛЖЕННОСТЬ ПЕРСОНАЛА ПО ПРОЧИМ ОПЕРАЦИЯМ" },
            type: "A",
            accounts: [
              { code: "4710", name: { uz: "Kreditga sotilgan tovarlar bo'yicha xodimlarning qarzi", ru: "Задолженность персонала по товарам, проданным в кредит" }, type: "A" },
              { code: "4720", name: { uz: "Berilgan qarzlar bo'yicha xodimlarning qarzi", ru: "Задолженность персонала по выданным займам" }, type: "A" },
              { code: "4730", name: { uz: "Moddiy zararni qoplash bo'yicha xodimlarning qarzi", ru: "Задолженность персонала по возмещению ущерба" }, type: "A" },
              { code: "4790", name: { uz: "Xodimlarning boshqa qarzlari", ru: "Прочая задолженность персонала" }, type: "A" },
            ],
          },
          {
            headerCode: "4800",
            headerName: { uz: "TURLI DEBITORLAR QARZLARI", ru: "ЗАДОЛЖЕННОСТЬ ПРОЧИХ ДЕБИТОРОВ" },
            type: "A",
            accounts: [
              { code: "4810", name: { uz: "Moliyaviy ijara bo'yicha olinadigan to'lovlar — joriy qismi", ru: "Платежи к получению по финансовой аренде — текущая часть" }, type: "A" },
              { code: "4820", name: { uz: "Operativ ijara bo'yicha olinadigan to'lovlar", ru: "Платежи к получению по оперативной аренде" }, type: "A" },
              { code: "4830", name: { uz: "Olinadigan foizlar", ru: "Проценты к получению" }, type: "A" },
              { code: "4840", name: { uz: "Olinadigan dividendlar", ru: "Дивиденды к получению" }, type: "A" },
              { code: "4850", name: { uz: "Olinadigan royalti", ru: "Роялти к получению" }, type: "A" },
              { code: "4860", name: { uz: "Da'volar bo'yicha olinadigan schyotlar", ru: "Счета к получению по претензиям" }, type: "A" },
              { code: "4890", name: { uz: "Boshqa debitorlar qarzlari", ru: "Задолженность прочих дебиторов" }, type: "A" },
            ],
          },
          {
            headerCode: "4900",
            headerName: { uz: "DARGUMON QARZLAR BO'YICHA REZERV", ru: "РЕЗЕРВ ПО СОМНИТЕЛЬНЫМ ДОЛГАМ" },
            type: "KP",
            accounts: [
              { code: "4910", name: { uz: "Dargumon qarzlar bo'yicha rezerv", ru: "Резерв по сомнительным долгам" }, type: "KP" },
            ],
          },
        ],
      },
      {
        id: 5,
        title: {
          uz: "5-bo'lim. Pul mablag'lari, qisqa muddatli investitsiyalar va boshqa joriy aktivlar",
          ru: "5-я группа. Денежные средства, краткосрочные инвестиции и прочие текущие активы",
        },
        groups: [
          {
            headerCode: "5000",
            headerName: { uz: "KASSADAGI PUL MABLAG'LARI", ru: "ДЕНЕЖНЫЕ СРЕДСТВА В КАССЕ" },
            type: "A",
            accounts: [
              { code: "5010", name: { uz: "Milliy valyutadagi pul mablag'lari", ru: "Денежные средства в национальной валюте" }, type: "A" },
              { code: "5020", name: { uz: "Chet el valyutasidagi pul mablag'lari", ru: "Денежные средства в иностранной валюте" }, type: "A" },
            ],
          },
          {
            headerCode: "5100",
            headerName: { uz: "HISOB-KITOB SCHYOTIDAGI PUL MABLAG'LARI", ru: "ДЕНЕЖНЫЕ СРЕДСТВА НА РАСЧЁТНОМ СЧЁТЕ" },
            type: "A",
            accounts: [
              { code: "5110", name: { uz: "Hisob-kitob schyoti", ru: "Расчётный счёт" }, type: "A" },
            ],
          },
          {
            headerCode: "5200",
            headerName: { uz: "CHET EL VALYUTASIDAGI PUL MABLAG'LARI", ru: "ДЕНЕЖНЫЕ СРЕДСТВА В ИНОСТРАННОЙ ВАЛЮТЕ" },
            type: "A",
            accounts: [
              { code: "5210", name: { uz: "Mamlakat ichidagi valyuta schyotlari", ru: "Валютные счета внутри страны" }, type: "A" },
              { code: "5220", name: { uz: "Chet eldagi valyuta schyotlari", ru: "Валютные счета за рубежом" }, type: "A" },
            ],
          },
          {
            headerCode: "5500",
            headerName: { uz: "BANKDAGI MAXSUS SCHYOTLARDAGI PUL MABLAG'LARI", ru: "ДЕНЕЖНЫЕ СРЕДСТВА НА СПЕЦСЧЕТАХ В БАНКЕ" },
            type: "A",
            accounts: [
              { code: "5510", name: { uz: "Akkreditivlar", ru: "Аккредитивы" }, type: "A" },
              { code: "5520", name: { uz: "Chek daftarchalari", ru: "Чековые книжки" }, type: "A" },
              { code: "5530", name: { uz: "Boshqa maxsus schyotlar", ru: "Прочие спецсчета" }, type: "A" },
            ],
          },
          {
            headerCode: "5600",
            headerName: { uz: "PUL EKVIVALENTLARI", ru: "ДЕНЕЖНЫЕ ЭКВИВАЛЕНТЫ" },
            type: "A",
            accounts: [
              { code: "5610", name: { uz: "Pul ekvivalentlari (turlari bo'yicha)", ru: "Денежные эквиваленты (по видам)" }, type: "A" },
            ],
          },
          {
            headerCode: "5700",
            headerName: { uz: "YO'LDAGI PUL MABLAG'LARI (O'TKAZMALAR)", ru: "ДЕНЕЖНЫЕ ПЕРЕВОДЫ В ПУТИ" },
            type: "A",
            accounts: [
              { code: "5710", name: { uz: "Yo'ldagi pul mablag'lari (o'tkazmalar)", ru: "Денежные переводы в пути" }, type: "A" },
            ],
          },
          {
            headerCode: "5800",
            headerName: { uz: "QISQA MUDDATLI INVESTITSIYALAR", ru: "КРАТКОСРОЧНЫЕ ИНВЕСТИЦИИ" },
            type: "A",
            accounts: [
              { code: "5810", name: { uz: "Qimmatli qog'ozlar", ru: "Ценные бумаги" }, type: "A" },
              { code: "5820", name: { uz: "Berilgan qisqa muddatli qarzlar", ru: "Выданные краткосрочные займы" }, type: "A" },
              { code: "5890", name: { uz: "Boshqa joriy investitsiyalar", ru: "Прочие текущие инвестиции" }, type: "A" },
            ],
          },
          {
            headerCode: "5900",
            headerName: { uz: "KAMOMADLAR VA QIYMATLIKLARNING BUZILISHIDAN YO'QOTISHLAR VA BOSHQA JORIY AKTIVLAR", ru: "НЕДОСТАЧИ И ПОТЕРИ ОТ ПОРЧИ ЦЕННОСТЕЙ И ПРОЧИЕ ТЕКУЩИЕ АКТИВЫ" },
            type: "A",
            accounts: [
              { code: "5910", name: { uz: "Kamomadlar va qiymatliklarning buzilishidan yo'qotishlar", ru: "Недостачи и потери от порчи ценностей" }, type: "A" },
              { code: "5920", name: { uz: "Boshqa joriy aktivlar", ru: "Прочие текущие активы" }, type: "A" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: { uz: "III QISM. MAJBURITYATLAR", ru: "РАЗДЕЛ III. ОБЯЗАТЕЛЬСТВА" },
    divisions: [
      {
        id: 6,
        title: {
          uz: "6-bo'lim. Joriy majburiyatlar",
          ru: "6-я группа. Текущие обязательства",
        },
        groups: [
          {
            headerCode: "6000",
            headerName: { uz: "MOL YETKAZIB BERUVCHILAR VA PUDRATCHILARGA TO'LANADIGAN SCHYOTLAR", ru: "СЧЕТА К ОПЛАТЕ ПОСТАВЩИКАМ И ПОДРЯДЧИКАМ" },
            type: "P",
            accounts: [
              { code: "6010", name: { uz: "Mol yetkazib beruvchilar va pudratchilarga to'lanadigan schyotlar", ru: "Счета к оплате поставщикам и подрядчикам" }, type: "P" },
              { code: "6020", name: { uz: "Berilgan veksellar", ru: "Векселя выданные" }, type: "P" },
            ],
          },
          {
            headerCode: "6100",
            headerName: { uz: "AJRATILGAN BO'LINMALAR, SHO'BA VA QARAM XO'JALIK JAMIYATLARIGA TO'LANADIGAN SCHYOTLAR", ru: "СЧЕТА К ОПЛАТЕ ДОЧЕРНИМ И ЗАВИСИМЫМ ОБЩЕСТВАМ" },
            type: "P",
            accounts: [
              { code: "6110", name: { uz: "Ajratilgan bo'linmalarga to'lanadigan schyotlar", ru: "Счета к оплате обособленным подразделениям" }, type: "P" },
              { code: "6120", name: { uz: "Sho'ba va qaram xo'jalik jamiyatlariga to'lanadigan schyotlar", ru: "Счета к оплате дочерним и зависимым обществам" }, type: "P" },
            ],
          },
          {
            headerCode: "6200",
            headerName: { uz: "OLIY VA QUYI TASHKILOTLARGA TO'LANADIGAN SCHYOTLAR", ru: "СЧЕТА К ОПЛАТЕ ВЫШЕСТОЯЩИМ И НИЖЕСТОЯЩИМ ОРГАНИЗАЦИЯМ" },
            type: "P",
            accounts: [
              { code: "6210", name: { uz: "Oliy tashkilotlarga to'lanadigan schyotlar", ru: "Счета к оплате вышестоящим организациям" }, type: "P" },
              { code: "6220", name: { uz: "Quyi tashkilotlarga to'lanadigan schyotlar", ru: "Счета к оплате нижестоящим организациям" }, type: "P" },
            ],
          },
          {
            headerCode: "6300",
            headerName: { uz: "OLINGAN BO'NAKLAR", ru: "АВАНСЫ ПОЛУЧЕННЫЕ" },
            type: "P",
            accounts: [
              { code: "6310", name: { uz: "Xaridorlar va buyurtmachilardan olingan bo'naklar", ru: "Авансы, полученные от покупателей и заказчиков" }, type: "P" },
              { code: "6390", name: { uz: "Boshqa olingan bo'naklar", ru: "Прочие полученные авансы" }, type: "P" },
            ],
          },
          {
            headerCode: "6400",
            headerName: { uz: "BYUDJETGA TO'LOVLAR BO'YICHA QARZLAR", ru: "ЗАДОЛЖЕННОСТЬ ПО ПЛАТЕЖАМ В БЮДЖЕТ" },
            type: "P",
            accounts: [
              { code: "6410", name: { uz: "Byudjetga to'lovlar bo'yicha qarzlar (QQS, foyda solig'i)", ru: "Задолженность по налогам в бюджет (НДС, налог на прибыль)" }, type: "P" },
              { code: "6420", name: { uz: "Jismoniy shaxslardan ushlab qolinadigan daromad solig'i", ru: "Удержанный НДФЛ" }, type: "P" },
            ],
          },
          {
            headerCode: "6500",
            headerName: { uz: "MAQSADLI DAVLAT JAMG'ARMALARIGA VA SUG'URTALAR BO'YICHA QARZLAR", ru: "ЗАДОЛЖЕННОСТЬ В ГОСФОНДЫ И ПО СТРАХОВАНИЮ" },
            type: "P",
            accounts: [
              { code: "6510", name: { uz: "Sug'urtalar bo'yicha qarzlar", ru: "Задолженность по страхованию" }, type: "P" },
              { code: "6520", name: { uz: "Ijtimoiy sug'urta (ijtimoiy soliq) bo'yicha to'lovlar", ru: "Расчёты по социальному налогу" }, type: "P" },
              { code: "6530", name: { uz: "Jamg'arib boriladigan pension badallari", ru: "Накопительные пенсионные взносы" }, type: "P" },
            ],
          },
          {
            headerCode: "6600",
            headerName: { uz: "TA'SISCHILARGA TO'LANADIGAN DAROMADLAR BO'YICHA QARZLAR", ru: "ЗАДОЛЖЕННОСТЬ УЧРЕДИТЕЛЯМ ПО ВЫПЛАТЕ ДОХОДОВ" },
            type: "P",
            accounts: [
              { code: "6610", name: { uz: "To'lanadigan dividendlar bo'yicha qarzlar", ru: "Задолженность по выплате дивидендов" }, type: "P" },
              { code: "6620", name: { uz: "Chiqib ketayotgan ta'sischilarga ulushlari bo'yicha qarzlar", ru: "Задолженность выходящим учредителям" }, type: "P" },
            ],
          },
          {
            headerCode: "6700",
            headerName: { uz: "XODIMLAR BILAN MEHNAT HAQI BO'YICHA HISOB-KITOBLAR", ru: "РАСЧЁТЫ С ПЕРСОНАЛОМ ПО ОПЛАТЕ ТРУДА" },
            type: "P",
            accounts: [
              { code: "6710", name: { uz: "Mehnat haqi bo'yicha xodimlar bilan hisob-kitoblar", ru: "Расчёты с персоналом по оплате труда" }, type: "P" },
              { code: "6720", name: { uz: "Deponentlangan mehnat haqi", ru: "Депонированная заработная плата" }, type: "P" },
            ],
          },
          {
            headerCode: "6800",
            headerName: { uz: "QISQA MUDDATLI KREDITLAR VA QARZLAR", ru: "КРАТКОСРОЧНЫЕ КРЕДИТЫ И ЗАЙМЫ" },
            type: "P",
            accounts: [
              { code: "6810", name: { uz: "Qisqa muddatli bank kreditlari", ru: "Краткосрочные банковские кредиты" }, type: "P" },
              { code: "6820", name: { uz: "Qisqa muddatli qarzlar", ru: "Краткосрочные займы" }, type: "P" },
              { code: "6830", name: { uz: "Uzoq muddatli kredit va qarzlarning joriy qismi", ru: "Текущая часть долгосрочных кредитов" }, type: "P" },
            ],
          },
          {
            headerCode: "6900",
            headerName: { uz: "BOSHQA MAJBURITYATLAR", ru: "ПРОЧИЕ ОБЯЗАТЕЛЬСТВА" },
            type: "P",
            accounts: [
              { code: "6910", name: { uz: "Operativ ijara bo'yicha to'lanadigan to'lovlar", ru: "Платежи по оперативной аренде" }, type: "P" },
              { code: "6920", name: { uz: "To'lanadigan foizlar", ru: "Проценты к оплате" }, type: "P" },
              { code: "6930", name: { uz: "To'lanadigan royalti", ru: "Роялти к оплате" }, type: "P" },
              { code: "6940", name: { uz: "Da'volar bo'yicha to'lanadigan schyotlar", ru: "Счета к оплате по претензиям" }, type: "P" },
              { code: "6950", name: { uz: "Kafolatlar bo'yicha majburiyatlar", ru: "Обязательства по гарантиям" }, type: "P" },
              { code: "6960", name: { uz: "Majburiy ajratmalar bo'yicha qarzlar", ru: "Задолженность по обязательным отчислениям" }, type: "P" },
              { code: "6970", name: { uz: "Hisoblangan to'lovlar bo'yicha qarzlar", ru: "Задолженность по начисленным платежам" }, type: "P" },
              { code: "6990", name: { uz: "Boshqa majburiyatlar", ru: "Прочие обязательства" }, type: "P" },
            ],
          },
        ],
      },
      {
        id: 7,
        title: {
          uz: "7-bo'lim. Uzoq muddatli majburiyatlar",
          ru: "7-я группа. Долгосрочные обязательства",
        },
        groups: [
          {
            headerCode: "7000",
            headerName: { uz: "UZOQ MUDDATLI KREDITLAR VA QARZLAR", ru: "ДОЛГОСРОЧНЫЕ КРЕДИТЫ И ЗАЙМЫ" },
            type: "P",
            accounts: [
              { code: "7010", name: { uz: "Uzoq muddatli bank kreditlari", ru: "Долгосрочные банковские кредиты" }, type: "P" },
              { code: "7020", name: { uz: "Uzoq muddatli qarzlar", ru: "Долгосрочные займы" }, type: "P" },
            ],
          },
          {
            headerCode: "7100",
            headerName: { uz: "MOLIYAVIY IJARA BO'YICHA TO'LANADIGAN MAJBURITYATLAR", ru: "ОБЯЗАТЕЛЬСТВА ПО ФИНАНСОВОЙ АРЕНДЕ" },
            type: "P",
            accounts: [
              { code: "7110", name: { uz: "Moliyaviy ijara bo'yicha majburiyatlar", ru: "Обязательства по финансовой аренде" }, type: "P" },
            ],
          },
          {
            headerCode: "7200",
            headerName: { uz: "UZOQ MUDDATLI OLINGAN BO'NAKLAR VA MAJBURITYATLAR", ru: "ДОЛГОСРОЧНЫЕ ПОЛУЧЕННЫЕ АВАНСЫ И ОБЯЗАТЕЛЬСТВА" },
            type: "P",
            accounts: [
              { code: "7210", name: { uz: "Uzoq muddatli olingan bo'naklar", ru: "Долгосрочные полученные авансы" }, type: "P" },
              { code: "7220", name: { uz: "Uzoq muddatli veksellar", ru: "Долгосрочные векселя" }, type: "P" },
              { code: "7230", name: { uz: "Obligatsiyalar bo'yicha qarzlar", ru: "Задолженность по облигациям" }, type: "P" },
              { code: "7290", name: { uz: "Boshqa uzoq muddatli majburiyatlar", ru: "Прочие долгосрочные обязательства" }, type: "P" },
            ],
          },
          {
            headerCode: "7300",
            headerName: { uz: "KECHIKTIRILGAN MAJBURITYATLAR", ru: "ОТСРОЧЕННЫЕ ОБЯЗАТЕЛЬСТВА" },
            type: "P",
            accounts: [
              { code: "7310", name: { uz: "Vaqtinchalik farqlar bo'yicha kechiktirilgan foyda solig'i majburiyati", ru: "Отсроченный налог на прибыль по временным разницам" }, type: "P" },
              { code: "7320", name: { uz: "Premium va diskontlar bo'yicha kechiktirilgan daromadlar", ru: "Отсроченные доходы по премиям и дисконтам" }, type: "P" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: { uz: "IV QISM. XUSUSIY KAPITAL", ru: "РАЗДЕЛ IV. СОБСТВЕННЫЙ КАПИТАЛ" },
    divisions: [
      {
        id: 8,
        title: {
          uz: "8-bo'lim. Kapital, rezervlar va taqsimlanmagan foyda",
          ru: "8-я группа. Капитал, резервы и нераспределённая прибыль",
        },
        groups: [
          {
            headerCode: "8300",
            headerName: { uz: "USTAV KAPITALI", ru: "УСТАВНЫЙ КАПИТАЛ" },
            type: "P",
            accounts: [
              { code: "8310", name: { uz: "Oddiy aktsiyalar", ru: "Обыкновенные акции" }, type: "P" },
              { code: "8320", name: { uz: "Imtiyozli aktsiyalar", ru: "Привилегированные акции" }, type: "P" },
              { code: "8330", name: { uz: "Pay va ulushlar (Ustav kapitali)", ru: "Паи и доли (Уставный капитал)" }, type: "P" },
            ],
          },
          {
            headerCode: "8400",
            headerName: { uz: "QO'SHILGAN KAPITAL", ru: "ДОБАВЛЕННЫЙ КАПИТАЛ" },
            type: "P",
            accounts: [
              { code: "8410", name: { uz: "Emissiya daromadi", ru: "Эмиссионный доход" }, type: "P" },
              { code: "8420", name: { uz: "Sotib olingan xususiy aktsiyalar", ru: "Выкупленные собственные акции" }, type: "KP" },
            ],
          },
          {
            headerCode: "8500",
            headerName: { uz: "REZERV KAPITALI", ru: "РЕЗЕРВНЫЙ КАПИТАЛ" },
            type: "P",
            accounts: [
              { code: "8510", name: { uz: "Uzoq muddatli aktivlarni qayta baholash bo'yicha tuzatishlar", ru: "Корректировки по переоценке долгосрочных активов" }, type: "P" },
              { code: "8520", name: { uz: "Rezerv kapitali", ru: "Резервный капитал" }, type: "P" },
            ],
          },
          {
            headerCode: "8600",
            headerName: { uz: "SOTIB OLINGAN XUSUSIY AKTSYALAR", ru: "ВЫКУПЛЕННЫЕ СОБСТВЕННЫЕ АКЦИИ" },
            type: "KP",
            accounts: [
              { code: "8610", name: { uz: "Sotib olingan xususiy aktsiyalar", ru: "Выкупленные собственные акции" }, type: "KP" },
            ],
          },
          {
            headerCode: "8700",
            headerName: { uz: "TAQSIMLANMAGAN FOYDA (ZARAR)", ru: "НЕРАСПРЕДЕЛЁННАЯ ПРИБЫЛЬ (УБЫТОК)" },
            type: "P",
            accounts: [
              { code: "8710", name: { uz: "Taqsimlanmagan foyda (yo'naltirilmagan foyda)", ru: "Нераспределённая прибыль" }, type: "P" },
              { code: "8720", name: { uz: "Qoplanmagan zarar", ru: "Некомпенсированный убыток" }, type: "KP" },
            ],
          },
          {
            headerCode: "8800",
            headerName: { uz: "MAQSADLI TUSHUMLAR VA MOLIYALASHTIRISH", ru: "ЦЕЛЕВЫЕ ПОСТУПЛЕНИЯ И ФИНАНСИРОВАНИЕ" },
            type: "P",
            accounts: [
              { code: "8810", name: { uz: "Maqsadli tushumlar", ru: "Целевые поступления" }, type: "P" },
              { code: "8820", name: { uz: "Maqsadli moliyalashtirish", ru: "Целевое финансирование" }, type: "P" },
              { code: "8890", name: { uz: "Boshqa maqsadli tushumlar", ru: "Прочие целевые поступления" }, type: "P" },
            ],
          },
          {
            headerCode: "8900",
            headerName: { uz: "KELGUSI XARAJATLAR VA TO'LOVLAR REZERVI", ru: "РЕЗЕРВ БУДУЩИХ РАСХОДОВ И ПЛАТЕЖЕЙ" },
            type: "P",
            accounts: [
              { code: "8910", name: { uz: "Kelgusi xarajatlar va to'lovlar rezervi", ru: "Резерв будущих расходов и платежей" }, type: "P" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: { uz: "V QISM. MOLIYAVIY NATIJALARNI SHAKLLANTIRISH VA FOYDALANISH", ru: "РАЗДЕЛ V. ФОРМИРОВАНИЕ И ИСПОЛЬЗОВАНИЕ ФИНАНСОВЫХ РЕЗУЛЬТАТОВ" },
    divisions: [
      {
        id: 9,
        title: {
          uz: "9-bo'lim. Daromadlar va xarajatlar",
          ru: "9-я группа. Доходы и расходы",
        },
        groups: [
          {
            headerCode: "9000",
            headerName: { uz: "ASOSIY FAOLIYATDAN DAROMADLAR", ru: "ДОХОДЫ ОТ ОСНОВНОЙ ДЕЯТЕЛЬНОСТИ" },
            type: "D",
            accounts: [
              { code: "9010", name: { uz: "Mahsulot sotishdan daromadlar", ru: "Доходы от реализации продукции" }, type: "D" },
              { code: "9020", name: { uz: "Tovar sotishdan daromadlar", ru: "Доходы от реализации товаров" }, type: "D" },
              { code: "9030", name: { uz: "Ishlar bajarish va xizmatlar ko'rsatishdan daromadlar", ru: "Доходы от выполнения работ и услуг" }, type: "D" },
              { code: "9040", name: { uz: "Sotilgan tovarlarning qaytarilishi va chegirmalar", ru: "Возврат проданных товаров и скидки" }, type: "KD" },
              { code: "9050", name: { uz: "Xaridorlarga berilgan chegirmalar", ru: "Скидки, предоставленные покупателям" }, type: "KD" },
            ],
          },
          {
            headerCode: "9100",
            headerName: { uz: "SOTILGAN MAHSULOT (TOVAR, ISH, XIZMAT)LARNING TANNARXI", ru: "СЕБЕСТОИМОСТЬ РЕАЛИЗОВАННОЙ ПРОДУКЦИИ (ТОВАРОВ, РАБОТ, УСЛУГ)" },
            type: "X",
            accounts: [
              { code: "9110", name: { uz: "Sotilgan mahsulot tannarxi", ru: "Себестоимость реализованной продукции" }, type: "X" },
              { code: "9120", name: { uz: "Sotilgan tovarlar tannarxi", ru: "Себестоимость реализованных товаров" }, type: "X" },
              { code: "9130", name: { uz: "Bajarilgan ishlar va ko'rsatilgan xizmatlar tannarxi", ru: "Себестоимость выполненных работ и услуг" }, type: "X" },
            ],
          },
          {
            headerCode: "9200",
            headerName: { uz: "ASOSIY VOSITALAR VA BOSHQA AKTIVLARNING CHIQIB KETISHI", ru: "ВЫБЫТИЕ ОСНОВНЫХ СРЕДСТВ И ПРОЧИХ АКТИВОВ" },
            type: "D",
            accounts: [
              { code: "9210", name: { uz: "Asosiy vositalarning chiqib ketishi", ru: "Выбытие основных средств" }, type: "D" },
              { code: "9220", name: { uz: "Boshqa aktivlarning chiqib ketishi", ru: "Выбытие прочих активов" }, type: "D" },
            ],
          },
          {
            headerCode: "9300",
            headerName: { uz: "BOSHQA OPERATSION DAROMADLAR", ru: "ПРОЧИЕ ОПЕРАЦИОННЫЕ ДОХОДЫ" },
            type: "D",
            accounts: [
              { code: "9310", name: { uz: "Operativ ijaradan daromadlar", ru: "Доходы от оперативной аренды" }, type: "D" },
              { code: "9320", name: { uz: "Royalitidan daromadlar", ru: "Доходы от роялти" }, type: "D" },
              { code: "9330", name: { uz: "Boshqa operatsion daromadlar", ru: "Прочие операционные доходы" }, type: "D" },
              { code: "9340", name: { uz: "Undirilgan jarimalar, penya va neustoykalar", ru: "Взысканные штрафы, пени и неустойки" }, type: "D" },
              { code: "9350", name: { uz: "O'tgan yillardagi foyda", ru: "Прибыль прошлых лет" }, type: "D" },
              { code: "9360", name: { uz: "Qimmatliklarni qayta baholashdan daromadlar", ru: "Доходы от переоценки ценностей" }, type: "D" },
              { code: "9370", name: { uz: "Hisobdan chiqarilgan debitorlik qarzlari bo'yicha daromadlar", ru: "Доходы по списанной дебиторской задолженности" }, type: "D" },
              { code: "9380", name: { uz: "Tekinga olingan mol-mulk va subsidiyalar", ru: "Безвозмездно полученное имущество и субсидии" }, type: "D" },
              { code: "9390", name: { uz: "Boshqa operatsion daromadlar", ru: "Прочие операционные доходы" }, type: "D" },
            ],
          },
          {
            headerCode: "9400",
            headerName: { uz: "DAVR XARAJATLARI", ru: "РАСХОДЫ ПЕРИОДА" },
            type: "X",
            accounts: [
              { code: "9410", name: { uz: "Sotish xarajatlari", ru: "Расходы по реализации" }, type: "X" },
              { code: "9420", name: { uz: "Ma'muriy xarajatlar", ru: "Административные расходы" }, type: "X" },
              { code: "9430", name: { uz: "Boshqa operatsion xarajatlar", ru: "Прочие операционные расходы" }, type: "X" },
            ],
          },
          {
            headerCode: "9500",
            headerName: { uz: "MOLIYAVIY FAOLIYATDAN DAROMADLAR", ru: "ДОХОДЫ ОТ ФИНАНСОВОЙ ДЕЯТЕЛЬНОСТИ" },
            type: "D",
            accounts: [
              { code: "9510", name: { uz: "Dividendlar ko'rinishidagi daromadlar", ru: "Доходы в виде дивидендов" }, type: "D" },
              { code: "9520", name: { uz: "Foizlar ko'rinishidagi daromadlar", ru: "Доходы в виде процентов" }, type: "D" },
              { code: "9530", name: { uz: "Moliyaviy ijaradan daromadlar", ru: "Доходы от финансовой аренды" }, type: "D" },
              { code: "9540", name: { uz: "Valyuta kurslari farqidan daromadlar", ru: "Доходы от курсовых разниц" }, type: "D" },
              { code: "9550", name: { uz: "Qimmatli qog'ozlar bilan operatsiyalardan daromadlar", ru: "Доходы от операций с ценными бумагами" }, type: "D" },
              { code: "9590", name: { uz: "Moliyaviy faoliyatning boshqa daromadlari", ru: "Прочие доходы от финансовой деятельности" }, type: "D" },
            ],
          },
          {
            headerCode: "9600",
            headerName: { uz: "MOLIYAVIY FAOLIYAT BO'YICHA XARAJATLAR", ru: "РАСХОДЫ ПО ФИНАНСОВОЙ ДЕЯТЕЛЬНОСТИ" },
            type: "X",
            accounts: [
              { code: "9610", name: { uz: "Foizlar ko'rinishidagi xarajatlar", ru: "Расходы в виде процентов" }, type: "X" },
              { code: "9620", name: { uz: "Valyuta kurslari farqidan zarar", ru: "Убыток от курсовых разниц" }, type: "X" },
              { code: "9630", name: { uz: "Qimmatli qog'ozlar bilan operatsiyalardan zarar", ru: "Убыток от операций с ценными бумагами" }, type: "X" },
              { code: "9690", name: { uz: "Moliyaviy faoliyat bo'yicha boshqa xarajatlar", ru: "Прочие расходы по финансовой деятельности" }, type: "X" },
            ],
          },
          {
            headerCode: "9700",
            headerName: { uz: "FAVQULODDA FOYDA (ZARAR)", ru: "ЧРЕЗВЫЧАЙНАЯ ПРИБЫЛЬ (УБЫТОК)" },
            type: "D",
            accounts: [
              { code: "9710", name: { uz: "Favqulodda foyda (zarar)", ru: "Чрезвычайная прибыль (убыток)" }, type: "D" },
            ],
          },
          {
            headerCode: "9800",
            headerName: { uz: "FOYDA SOLIG'I", ru: "НАЛОГ НА ПРИБЫЛЬ" },
            type: "X",
            accounts: [
              { code: "9810", name: { uz: "Foyda solig'i me'yori bo'yicha hisoblangan foyda solig'i", ru: "Налог на прибыль, начисленный по норме" }, type: "X" },
              { code: "9820", name: { uz: "Boshqa soliqlar va yig'imlar", ru: "Прочие налоги и сборы" }, type: "X" },
            ],
          },
          {
            headerCode: "9900",
            headerName: { uz: "YAKUNIY MOLIYAVIY NATIJA", ru: "КОНЕЧНЫЙ ФИНАНСОВЫЙ РЕЗУЛЬТАТ" },
            type: "P",
            accounts: [
              { code: "9910", name: { uz: "Yakuniy moliyaviy natija (Foyda/Zarar)", ru: "Конечный финансовый результат (Прибыль/Убыток)" }, type: "P" },
            ],
          },
        ],
      },
    ],
  },
];
