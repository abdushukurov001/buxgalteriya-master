export type EntryItem = {
  id: number;
  debit: string;
  credit: string;
  description: {
    uz: string;
    ru: string;
  };
};

export type EntrySection = {
  id: string;
  title: {
    uz: string;
    ru: string;
  };
  accounts: string;
  entries: EntryItem[];
};

export const TOP_100_ENTRIES: EntrySection[] = [
  {
    id: "I",
    title: {
      uz: "I. Asosiy vositalar va Nomoddiy aktivlar",
      ru: "I. Основные средства и Нематериальные активы",
    },
    accounts: "0100, 0200, 0400, 0800",
    entries: [
      {
        id: 1,
        debit: "0810",
        credit: "6010",
        description: {
          uz: "Yetkazib beruvchidan asosiy vosita (AV) sotib olindi (tadbirlar/montajsiz).",
          ru: "Приобретено основное средство (ОС) от поставщика (без монтажа).",
        },
      },
      {
        id: 2,
        debit: "0810",
        credit: "6990",
        description: {
          uz: "Asosiy vositani yetkazib berish boʻyicha transport va boshqa xizmatlar koʻrsatildi.",
          ru: "Отражены транспортные и прочие услуги по доставке основного средства.",
        },
      },
      {
        id: 3,
        debit: "0710",
        credit: "6010",
        description: {
          uz: "Oʻrnatiladigan/montaj talab qiladigan asbob-uskunalar sotib olindi va omborga kirim qilindi.",
          ru: "Приобретено и оприходовано на склад оборудование к установке (требующее монтажа).",
        },
      },
      {
        id: 4,
        debit: "0720",
        credit: "0710",
        description: {
          uz: "Asbob-uskuna ombordan montaj qilish va oʻrnatish uchun topshirildi.",
          ru: "Оборудование передано со склада в монтаж и установку.",
        },
      },
      {
        id: 5,
        debit: "0810",
        credit: "0720",
        description: {
          uz: "Oʻrnatilgan va montaj qilingan asbob-uskuna ob'ekt qiymatiga oʻtkazildi.",
          ru: "Установленное и смонтированное оборудование включено в стоимость объекта.",
        },
      },
      {
        id: 6,
        debit: "0810",
        credit: "6990",
        description: {
          uz: "AV oʻrnatish boʻyicha pudratchilar koʻrsatgan xizmatlar summasi aks ettirildi.",
          ru: "Отражена стоимость услуг подрядчиков по монтажу основного средства.",
        },
      },
      {
        id: 7,
        debit: "0130 (0100)",
        credit: "0810",
        description: {
          uz: "AV montaj va tayyorlash ishlari tugab, foydalanishga topshirildi (boshlangʻich qiymat shakllandi).",
          ru: "Завершён монтаж ОС и объект введён в эксплуатацию (сформирована первоначальная стоимость).",
        },
      },
      {
        id: 8,
        debit: "0830",
        credit: "6010",
        description: {
          uz: "Nomoddiy aktivlar (litsenziya, dasturiy ta'minot) sotib olindi.",
          ru: "Приобретены нематериальные активы (лицензия, программное обеспечение).",
        },
      },
      {
        id: 9,
        debit: "0410",
        credit: "0830",
        description: {
          uz: "Nomoddiy aktivlar rasmiylashtirilib, foydalanishga topshirildi.",
          ru: "Нематериальные активы оформлены и введены в эксплуатацию.",
        },
      },
      {
        id: 10,
        debit: "2010 (2310, 9410)",
        credit: "0210",
        description: {
          uz: "Asosiy vositalarga amortizatsiya hisoblandi (tayinlanishiga qarab).",
          ru: "Начислена амортизация основных средств (в зависимости от назначения).",
        },
      },
      {
        id: 11,
        debit: "2010 (9410)",
        credit: "0510",
        description: {
          uz: "Nomoddiy aktivlar amortizatsiyasi hisoblandi.",
          ru: "Начислена амортизация нематериальных активов.",
        },
      },
      {
        id: 12,
        debit: "0190",
        credit: "0100",
        description: {
          uz: "Hisobdan chiqarilayotgan (sotilayotgan) AVning boshlangʻich qiymati koʻchirildi.",
          ru: "Списана первоначальная стоимость выбывающего (продаваемого) ОС.",
        },
      },
      {
        id: 13,
        debit: "0210",
        credit: "0190",
        description: {
          uz: "Hisobdan chiqarilayotgan AV boʻyicha jamlangan amortizatsiya oʻchirildi.",
          ru: "Списана накопленная амортизация выбывающего основного средства.",
        },
      },
      {
        id: 14,
        debit: "9210",
        credit: "0190",
        description: {
          uz: "Hisobdan chiqarilayotgan AVning qoldiq qiymati hisobdan chiqarish subschotiga oʻtkazildi.",
          ru: "Перенесена остаточная стоимость ОС на счёт выбытия.",
        },
      },
      {
        id: 15,
        debit: "9210",
        credit: "6990",
        description: {
          uz: "AVni hisobdan chiqarish/demontaj boʻyicha xizmatlar xarajatga olindi.",
          ru: "Отражены расходы по демонтажу/ликвидации основного средства.",
        },
      },
      {
        id: 16,
        debit: "1010",
        credit: "9210",
        description: {
          uz: "AV demontajidan chiqqan yaroqli materiallar omborga kirim qilindi.",
          ru: "Оприходованы материалы, полученные от демонтажа основных средств.",
        },
      },
      {
        id: 17,
        debit: "9210",
        credit: "9310",
        description: {
          uz: "AV sotilganda realizatsiya qilishdan olingan daromad aks ettirildi.",
          ru: "Отражён доход от реализации основного средства.",
        },
      },
      {
        id: 18,
        debit: "9430",
        credit: "9210",
        description: {
          uz: "AVni sotish/hisobdan chiqarishdan koʻrilgan zarar aks ettirildi.",
          ru: "Отражён убыток от реализации/выбытия основного средства.",
        },
      },
    ],
  },
  {
    id: "II",
    title: {
      uz: "II. Materiallar va Tovar-moddiy zaxiralar",
      ru: "II. Материалы и Товарно-материальные запасы",
    },
    accounts: "1000, 1500, 2800, 2900",
    entries: [
      {
        id: 19,
        debit: "1010",
        credit: "6010",
        description: {
          uz: "Yetkazib beruvchidan xomashyo va materiallar omborga kirim qilindi.",
          ru: "Оприходованы сырьё и материалы от поставщика на склад.",
        },
      },
      {
        id: 20,
        debit: "1010",
        credit: "6990",
        description: {
          uz: "Materiallarni olib kelish boʻyicha transport-yuklash xarajatlari aks ettirildi.",
          ru: "Отражены транспортно-заготовительные расходы по доставке материалов.",
        },
      },
      {
        id: 21,
        debit: "1010",
        credit: "1510",
        description: {
          uz: "Tayyorlangan materiallar amaldagi tannarxi boʻyicha omborga kirim qilindi.",
          ru: "Оприходованы заготовленные материалы по фактической себестоимости.",
        },
      },
      {
        id: 22,
        debit: "1080",
        credit: "1010",
        description: {
          uz: "Materiallar qayta ishlashga (daval xomashyosi sifatida) berildi.",
          ru: "Переданы материалы в переработку (как давальческое сырьё).",
        },
      },
      {
        id: 23,
        debit: "2010",
        credit: "1010",
        description: {
          uz: "Materiallar asosiy ishlab chiqarishga sarflandi.",
          ru: "Списаны материалы на основное производство.",
        },
      },
      {
        id: 24,
        debit: "2310",
        credit: "1010",
        description: {
          uz: "Materiallar yordamchi ishlab chiqarishga sarflandi.",
          ru: "Списаны материалы на вспомогательное производство.",
        },
      },
      {
        id: 25,
        debit: "2510",
        credit: "1010",
        description: {
          uz: "Materiallar umumishlab chiqarish ehtiyojlariga berildi.",
          ru: "Списаны материалы на общепроизводственные нужды.",
        },
      },
      {
        id: 26,
        debit: "9410",
        credit: "1010",
        description: {
          uz: "Materiallar sotuv (maʼmuriy) boʻlimi ehtiyojlariga sarflandi.",
          ru: "Списаны материалы на административные нужды / расходы по реализации.",
        },
      },
      {
        id: 27,
        debit: "2810",
        credit: "2010",
        description: {
          uz: "Ishlab chiqarishdan tayyor mahsulot omborga kirim qilindi (amaldagi tannarx).",
          ru: "Оприходована готовая продукция из производства на склад (по фактической себестоимости).",
        },
      },
      {
        id: 28,
        debit: "2910",
        credit: "6010",
        description: {
          uz: "Sotib olingan tovarlar omborga (ulgurji savdo) kirim qilindi.",
          ru: "Оприходованы покупные товары на оптовый склад.",
        },
      },
      {
        id: 29,
        debit: "2920",
        credit: "2910",
        description: {
          uz: "Tovarlar ulgurji ombordan chakana savdo shoxobchasiga oʻtkazildi.",
          ru: "Переданы товары из оптового склада в розничную торговую точку.",
        },
      },
      {
        id: 30,
        debit: "2920",
        credit: "2980",
        description: {
          uz: "Chakana savdoda tovar ustamasi aks ettirildi.",
          ru: "Отражена торговая наценка в розничной торговле.",
        },
      },
      {
        id: 31,
        debit: "9110",
        credit: "2810",
        description: {
          uz: "Sotilgan tayyor mahsulotning ishlab chiqarish tannarxi hisobdan chiqarildi.",
          ru: "Списана себестоимость реализованной готовой продукции.",
        },
      },
      {
        id: 32,
        debit: "9120",
        credit: "2910 (2920)",
        description: {
          uz: "Sotilgan tovarlarning xarid qiymati (tannarxi) hisobdan chiqarildi.",
          ru: "Списана покупная стоимость (себестоимость) реализованных товаров.",
        },
      },
      {
        id: 33,
        debit: "9430",
        credit: "1010 (2810)",
        description: {
          uz: "Tovar-moddiy zaxiralarning kamomadi va buzilishidan koʻrilgan zarar.",
          ru: "Списан убыток от недостачи и порчи товарно-материальных ценностей.",
        },
      },
      {
        id: 34,
        debit: "1010 (2810)",
        credit: "9380",
        description: {
          uz: "Inventarizatsiya natijasida aniqlangan ortiqcha materiallar kirim qilindi.",
          ru: "Оприходованы излишки материалов, выявленные в результате инвентаризации.",
        },
      },
    ],
  },
  {
    id: "III",
    title: {
      uz: "III. Ishlab chiqarish va Xarajatlar hisobi",
      ru: "III. Производство и Учёт расходов",
    },
    accounts: "2000, 2300, 2500, 9400",
    entries: [
      {
        id: 35,
        debit: "2010",
        credit: "6710",
        description: {
          uz: "Asosiy ishlab chiqarish ishchilariga ish haqi hisoblandi.",
          ru: "Начислена заработная плата рабочим основного производства.",
        },
      },
      {
        id: 36,
        debit: "2010",
        credit: "6520",
        description: {
          uz: "Asosiy ishchilar ish haqidan ijtimoiy soliq hisoblandi.",
          ru: "Начислен социальный налог с заработной платы рабочих основного производства.",
        },
      },
      {
        id: 37,
        debit: "2510",
        credit: "6710",
        description: {
          uz: "Sex va umumishlab chiqarish xodimlariga ish haqi hisoblandi.",
          ru: "Начислена заработная плата цеховому и общепроизводственному персоналу.",
        },
      },
      {
        id: 38,
        debit: "2510",
        credit: "6990",
        description: {
          uz: "Sex ehtiyojlari uchun kommunal va elektr energiyasi xizmatlari hisoblandi.",
          ru: "Отражены коммунальные услуги и электроэнергия на цеховые нужды.",
        },
      },
      {
        id: 39,
        debit: "2010",
        credit: "2510",
        description: {
          uz: "Umumishlab chiqarish xarajatlari ishlab chiqarish tannarxiga taqsimlandi.",
          ru: "Распределены общепроизводственные расходы на себестоимость продукции.",
        },
      },
      {
        id: 40,
        debit: "2010",
        credit: "2310",
        description: {
          uz: "Yordamchi ishlab chiqarish xizmatlari asosiy ishlab chiqarishga kiritildi.",
          ru: "Включены услуги вспомогательного производства в основное производство.",
        },
      },
      {
        id: 41,
        debit: "9410",
        credit: "6710",
        description: {
          uz: "Ma'muriy va boshqaruv xodimlariga ish haqi hisoblandi.",
          ru: "Начислена заработная плата административно-управленческому персоналу.",
        },
      },
      {
        id: 42,
        debit: "9410",
        credit: "6520",
        description: {
          uz: "Ma'muriy xodimlar ish haqidan ijtimoiy soliq hisoblandi.",
          ru: "Начислен социальный налог с зарплаты административного персонала.",
        },
      },
      {
        id: 43,
        debit: "9410",
        credit: "6990",
        description: {
          uz: "Idora (ofis) icarasi va kommunal xizmatlar xarajatga olindi.",
          ru: "Отражены расходы на аренду офиса и коммунальные услуги.",
        },
      },
      {
        id: 44,
        debit: "9410",
        credit: "6010",
        description: {
          uz: "Ofis uchun aloqa, internet va konsalting xizmatlari aks ettirildi.",
          ru: "Отражены услуги связи, интернета и консалтинга для офиса.",
        },
      },
      {
        id: 45,
        debit: "9420",
        credit: "6010 (6990)",
        description: {
          uz: "Mahsulotni sotish va reklama xarajatlari hisoblandi.",
          ru: "Отражены расходы на рекламу и реализацию продукции.",
        },
      },
      {
        id: 46,
        debit: "9910",
        credit: "9410",
        description: {
          uz: "Davr xarajatlari (ma'muriy) moliyaviy natijaga yopildi.",
          ru: "Списаны административные расходы периода на финансовый результат.",
        },
      },
      {
        id: 47,
        debit: "9910",
        credit: "9420",
        description: {
          uz: "Sotish xarajatlari yil/davr oxirida moliyaviy natijaga yopildi.",
          ru: "Списаны расходы на реализацию на финансовый результат в конце периода.",
        },
      },
    ],
  },
  {
    id: "IV",
    title: {
      uz: "IV. Pul mablagʻlari",
      ru: "IV. Денежные средства",
    },
    accounts: "5000, 5100, 5200, 5500",
    entries: [
      {
        id: 48,
        debit: "5110",
        credit: "4010",
        description: {
          uz: "Xaridordan hisob-kitob varaqasiga pul tushdi.",
          ru: "Поступила оплата от покупателя на расчётный счёт.",
        },
      },
      {
        id: 49,
        debit: "5110",
        credit: "6310",
        description: {
          uz: "Xaridordan oldindan toʻlov (avans) olindi.",
          ru: "Получена предоплата (аванс) от покупателя.",
        },
      },
      {
        id: 50,
        debit: "6010",
        credit: "5110",
        description: {
          uz: "Yetkazib beruvchiga bajarilgan ish/tovar uchun pul oʻtkazildi.",
          ru: "Перечислены денежные средства поставщику за товары/услуги.",
        },
      },
      {
        id: 51,
        debit: "4310",
        credit: "5110",
        description: {
          uz: "Yetkazib beruvchiga boʻlajak tovarlar uchun avans oʻtkazildi.",
          ru: "Перечислен аванс поставщику под предстоящую поставку.",
        },
      },
      {
        id: 52,
        debit: "5010",
        credit: "5110",
        description: {
          uz: "Bankdan kassaga naqd pul olindi (ish haqi, xoʻjalik xarajatlariga).",
          ru: "Получены наличные деньги из банка в кассу (на зарплату, хозяйственные расходы).",
        },
      },
      {
        id: 53,
        debit: "5110",
        credit: "5010",
        description: {
          uz: "Kassadagi naqd pul tushumi bankka topshirildi.",
          ru: "Сдана наличная выручка из кассы в банк.",
        },
      },
      {
        id: 54,
        debit: "6710",
        credit: "5010 (5110)",
        description: {
          uz: "Xodimlarga naqd pulda (yoki plastikka) ish haqi toʻlandi.",
          ru: "Выплачена заработная плата сотрудникам наличными (или на карту).",
        },
      },
      {
        id: 55,
        debit: "5210",
        credit: "4010",
        description: {
          uz: "Valyuta hisobvaragʻiga xorijiy xaridordan pul tushdi.",
          ru: "Поступила валютная выручка от иностранного покупателя.",
        },
      },
      {
        id: 56,
        debit: "5530",
        credit: "5110",
        description: {
          uz: "Korporativ bank kartasi (KBK) hisobiga pul oʻtkazildi.",
          ru: "Перечислены средства на корпоративную банковскую карту (КБК).",
        },
      },
      {
        id: 57,
        debit: "4220",
        credit: "5010 (5530)",
        description: {
          uz: "Hisobdor shaxsga xoʻjalik yoki xizmat safari uchun pul berildi.",
          ru: "Выданы денежные средства подотчётному лицу на командировку или хозяйственные нужды.",
        },
      },
      {
        id: 58,
        debit: "1010 (9410)",
        credit: "4220",
        description: {
          uz: "Hisobdor shaxs topshirgan boʻnak hisoboti (avansoviy otchet) tasdiqlandi.",
          ru: "Утверждён авансовый отчёт подотчётного лица.",
        },
      },
      {
        id: 59,
        debit: "5010",
        credit: "4220",
        description: {
          uz: "Hisobdor shaxs ishlatilmay qolgan avansni kassaga qaytardi.",
          ru: "Возвращён неиспользованный остаток аванса подотчётным лицом в кассу.",
        },
      },
      {
        id: 60,
        debit: "6610",
        credit: "5110",
        description: {
          uz: "Muassislarga dividendlar bank orqali toʻlab berildi.",
          ru: "Выплачены дивиденды учредителям через банк.",
        },
      },
      {
        id: 61,
        debit: "5110",
        credit: "6810",
        description: {
          uz: "Bankdan qisqa muddatli kredit/sodda ssuda olindi.",
          ru: "Получен краткосрочный банковский кредит.",
        },
      },
      {
        id: 62,
        debit: "6810",
        credit: "5110",
        description: {
          uz: "Bank kreditining asosiy qarzi qaytarildi.",
          ru: "Погашен основной долг по банковскому кредиту.",
        },
      },
      {
        id: 63,
        debit: "9610",
        credit: "6920",
        description: {
          uz: "Bank kreditidan foydalanganlik uchun foizlar hisoblandi.",
          ru: "Начислены проценты за пользование банковским кредитом.",
        },
      },
    ],
  },
  {
    id: "V",
    title: {
      uz: "V. Hisob-kitoblar, Debitorlik va Kreditorlik qarzlari",
      ru: "V. Расчёты, Дебиторская и Кредиторская задолженность",
    },
    accounts: "4000, 4200, 4300, 6000, 6300, 6900",
    entries: [
      {
        id: 64,
        debit: "4010",
        credit: "9010 (9020)",
        description: {
          uz: "Xaridorga mahsulot/tovar sotildi va unga debyutorlik qarzi yozildi.",
          ru: "Отражена реализация продукции/товаров покупателю и возникновение дебиторской задолженности.",
        },
      },
      {
        id: 65,
        debit: "6310",
        credit: "4010",
        description: {
          uz: "Avval olingan avans oʻzaro hisob-kitob orqali yopildi (zachyot).",
          ru: "Зачтён ранее полученный аванс от покупателя.",
        },
      },
      {
        id: 66,
        debit: "6010",
        credit: "4310",
        description: {
          uz: "Avval berilgan avans tovarlar kelgach oʻzaro yopildi (zachyot).",
          ru: "Зачтён ранее выданный аванс поставщику.",
        },
      },
      {
        id: 67,
        debit: "9430",
        credit: "4010",
        description: {
          uz: "Umidsiz debitorlik qarzlari zarar sifatiga hisobdan chiqarildi.",
          ru: "Списана безнадёжная дебиторская задолженность на убытки.",
        },
      },
      {
        id: 68,
        debit: "6010",
        credit: "9350",
        description: {
          uz: "Muddati oʻtgan kreditorlik qarzi daromadga olindi.",
          ru: "Списана кредиторская задолженность с истекшим сроком давности в доход.",
        },
      },
      {
        id: 69,
        debit: "4820",
        credit: "9310",
        description: {
          uz: "Boshqa tashkilotlarga berilgan ijaradan daromad hisoblandi.",
          ru: "Начислен доход от сдачи имущества в оперативную аренду.",
        },
      },
      {
        id: 70,
        debit: "9620",
        credit: "6010",
        description: {
          uz: "Xorijiy valyutadagi kreditorlik qarzini qayta baholashdan salbiy kurs farqi.",
          ru: "Отражена отрицательная курсовая разница при переоценке кредиторской задолженности.",
        },
      },
      {
        id: 71,
        debit: "6010",
        credit: "9540",
        description: {
          uz: "Xorijiy valyutadagi qarzlarni qayta baholashdan ijobiy kurs farqi.",
          ru: "Отражена положительная курсовая разница при переоценке кредиторской задолженности.",
        },
      },
    ],
  },
  {
    id: "VI",
    title: {
      uz: "VI. Soliqlar va Majburiy toʻlovlar boʻyicha hisob-kitoblar",
      ru: "VI. Расчёты по налогам и обязательным платежам",
    },
    accounts: "6400, 6500",
    entries: [
      {
        id: 72,
        debit: "4410 (1010)",
        credit: "6010",
        description: {
          uz: "Xarid qilingan tovar/xizmatlar boʻyicha QQS aks ettirildi (kiruvchi QQS).",
          ru: "Отражён входной НДС по приобретённым товарам/услугам.",
        },
      },
      {
        id: 73,
        debit: "9010",
        credit: "6410",
        description: {
          uz: "Sotilgan mahsulot/xizmatdan QQS hisoblandi (chiquvchi QQS).",
          ru: "Начислен НДС с реализации товаров/услуг.",
        },
      },
      {
        id: 74,
        debit: "6410",
        credit: "4410",
        description: {
          uz: "Kiruvchi QQS hisobga (zachyotga) olindi.",
          ru: "Принят к зачёту входной НДС.",
        },
      },
      {
        id: 75,
        debit: "6410",
        credit: "5110",
        description: {
          uz: "QQS boʻyicha soliq budjetga toʻlab berildi.",
          ru: "Перечислен НДС в бюджет.",
        },
      },
      {
        id: 76,
        debit: "6710",
        credit: "6410",
        description: {
          uz: "Xodimlarning ish haqidan jismoniy shaxslar daromad solig'i (JSHDS) ushlandi.",
          ru: "Удержан НДФЛ из заработной платы работников.",
        },
      },
      {
        id: 77,
        debit: "6710",
        credit: "6530",
        description: {
          uz: "Ish haqidan INPS (shaxsiy jamgʻarib boriladigan pensiya) ushlandi.",
          ru: "Удержаны накопительные пенсионные взносы (ИНПС) из зарплаты.",
        },
      },
      {
        id: 78,
        debit: "9810",
        credit: "6410",
        description: {
          uz: "Yil/davr oxirida foyda solig'i hisoblandi.",
          ru: "Начислен налог на прибыль в конце периода.",
        },
      },
      {
        id: 79,
        debit: "9430",
        credit: "6410",
        description: {
          uz: "Mol-mulk solig'i va Yer solig'i xarajatga hisoblandi.",
          ru: "Начислен налог на имущество и земельный налог.",
        },
      },
      {
        id: 80,
        debit: "9430",
        credit: "6410",
        description: {
          uz: "Suv resurslaridan foydalanganlik uchun soliq hisoblandi.",
          ru: "Начислен налог за пользование водными ресурсами.",
        },
      },
      {
        id: 81,
        debit: "6410",
        credit: "5110",
        description: {
          uz: "Budjetga tegishli soliqlar va yig'imlar o'tkazib berildi.",
          ru: "Перечислены налоги и сборы в бюджет.",
        },
      },
      {
        id: 82,
        debit: "6520",
        credit: "5110",
        description: {
          uz: "Ijtimoiy soliq budjetga o'tkazildi.",
          ru: "Перечислен социальный налог в бюджет.",
        },
      },
    ],
  },
  {
    id: "VII",
    title: {
      uz: "VII. Ustav kapitali va Xususiy kapital",
      ru: "VII. Уставный капитал и Собственный капитал",
    },
    accounts: "8300, 8400, 8500, 8600",
    entries: [
      {
        id: 83,
        debit: "4610",
        credit: "8330",
        description: {
          uz: "Ta'sischilarning ustav kapitaliga ulush qoʻshish boʻyicha qarzi aks ettirildi.",
          ru: "Отражена задолженность учредителей по вкладам в уставный капитал.",
        },
      },
      {
        id: 84,
        debit: "5110",
        credit: "4610",
        description: {
          uz: "Ta'sischi Ustav kapitaliga ulush sifatida pul mablagʻi kiritdi.",
          ru: "Внесён вклад учредителем в уставный капитал денежными средствами.",
        },
      },
      {
        id: 85,
        debit: "0130 (1010)",
        credit: "4610",
        description: {
          uz: "Ta'sischi Ustav kapitaliga mol-mulk/material koʻrinishida ulush kiritdi.",
          ru: "Внесён вклад учредителем в уставный капитал имуществом/материалами.",
        },
      },
      {
        id: 86,
        debit: "8710",
        credit: "6610 (6810)",
        description: {
          uz: "Sof foydadan ta'sischilarga dividendlar hisoblandi.",
          ru: "Начислены дивиденды учредителям за счёт чистой прибыли.",
        },
      },
      {
        id: 87,
        debit: "6610",
        credit: "6410",
        description: {
          uz: "Dividend toʻlash paytida dividend soligʻi ushlab qolindi.",
          ru: "Удержан налог на дивиденды при выплате.",
        },
      },
      {
        id: 88,
        debit: "8710",
        credit: "8330",
        description: {
          uz: "Sof foyda hisobidan ustav kapitali oshirildi.",
          ru: "Увеличен уставный капитал за счёт чистой прибыли.",
        },
      },
      {
        id: 89,
        debit: "8710",
        credit: "8520",
        description: {
          uz: "Sof foyda hisobidan zaxira kapitali shakllantirildi.",
          ru: "Сформирован резервный капитал за счёт чистой прибыли.",
        },
      },
    ],
  },
  {
    id: "VIII",
    title: {
      uz: "VIII. Daromadlar, Xarajatlar va Yillik Moliyaviy Natija",
      ru: "VIII. Доходы, Расходы и Годовой Финансовый Результат",
    },
    accounts: "9000, 9100, 9300, 9500, 9600, 9700, 9900",
    entries: [
      {
        id: 90,
        debit: "9010",
        credit: "9910",
        description: {
          uz: "Mahsulot sotishdan olingan sof tushum moliyaviy natijaga (foydaga) olindi.",
          ru: "Закрыта выручка от реализации продукции на финансовый результат (прибыль).",
        },
      },
      {
        id: 91,
        debit: "9020",
        credit: "9910",
        description: {
          uz: "Tovarlar sotishdan olingan sof tushum foydaga koʻchirildi.",
          ru: "Закрыта выручка от реализации товаров на финансовый результат.",
        },
      },
      {
        id: 92,
        debit: "9030",
        credit: "9910",
        description: {
          uz: "Xizmat koʻrsatish va ishlar bajarishdan daromad yopildi.",
          ru: "Закрыта выручка от оказания услуг и работ на финансовый результат.",
        },
      },
      {
        id: 93,
        debit: "9910",
        credit: "9110",
        description: {
          uz: "Sotilgan mahsulot tannarxi moliyaviy natijaga (zararga) yopildi.",
          ru: "Списана себестоимость реализованной продукции на финансовый результат (убыток).",
        },
      },
      {
        id: 94,
        debit: "9910",
        credit: "9120",
        description: {
          uz: "Sotilgan tovarlar tannarxi moliyaviy natijaga yopildi.",
          ru: "Списана себестоимость реализованных товаров на финансовый результат.",
        },
      },
      {
        id: 95,
        debit: "9310",
        credit: "9910",
        description: {
          uz: "Asosiy vositalarni sotishdan olingan boshqa operatsion daromad yopildi.",
          ru: "Закрыты прочие операционные доходы на финансовый результат.",
        },
      },
      {
        id: 96,
        debit: "9510",
        credit: "9910",
        description: {
          uz: "Olingan foizlar koʻrinishidagi moliyaviy daromadlar yopildi.",
          ru: "Закрыты финансовые доходы на финансовый результат.",
        },
      },
      {
        id: 97,
        debit: "9910",
        credit: "9610",
        description: {
          uz: "Kredit va qarzlar boʻyicha toʻlangan foiz xarajatlari yopildi.",
          ru: "Списаны финансовые расходы по процентам на финансовый результат.",
        },
      },
      {
        id: 98,
        debit: "9910",
        credit: "9810",
        description: {
          uz: "Foyda soligʻi xarajati moliyaviy natijaga koʻchirildi.",
          ru: "Списан расход по налогу на прибыль на финансовый результат.",
        },
      },
      {
        id: 99,
        debit: "9910",
        credit: "8710",
        description: {
          uz: "Yil yakunida: Olingan sof foyda taqsimlanmagan foyda schotiga koʻchirildi.",
          ru: "В конце года: Отражена чистая прибыль на счёт нераспределённой прибыли.",
        },
      },
      {
        id: 100,
        debit: "8710",
        credit: "9910",
        description: {
          uz: "Yil yakunida: Yil davomida koʻrilgan sof zarar hisobdan chiqarildi.",
          ru: "В конце года: Списан чистый убыток за счёт нераспределённой прибыли.",
        },
      },
    ],
  },
];
