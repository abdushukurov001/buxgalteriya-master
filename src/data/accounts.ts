export type AccountKind = "active" | "passive" | "contra-active" | "expense" | "income";

export type Account = {
  code: string;
  name: { uz: string; ru: string };
  kind: AccountKind;
  note: { uz: string; ru: string };
};

/** O'zbekiston Respublikasi buxgalteriya hisobi schyotlar rejasi (21-son BHMS bo'yicha rasmiy schyotlar). */
export const ACCOUNTS: Account[] = [
  {
    code: "01xx",
    name: { uz: "Asosiy vositalar (0110-0190 guruhi)", ru: "Основные средства (группа 0110-0190)" },
    kind: "active",
    note: {
      uz: "Asosiy vositalar guruhi: 0110 — yer, 0120 — binolar, 0130 — mashina va uskunalar, 0160 — transport. Kirim — debet, chiqim — kredit.",
      ru: "Группа основных средств: 0110 — земля, 0120 — здания, 0130 — машины и оборудование, 0160 — транспорт. Поступление — дебет, выбытие — кредит.",
    },
  },
  {
    code: "02xx",
    name: { uz: "Asosiy vositalar eskirishi (0210-0290 guruhi)", ru: "Износ основных средств (группа 0210-0290)" },
    kind: "contra-active",
    note: {
      uz: "Kontr-aktiv guruh: eskirish hisoblanganda kreditlanadi, aktiv chiqib ketganda debetlanadi.",
      ru: "Контр-активная группа: начисление износа — кредит, списание при выбытии — дебет.",
    },
  },
  {
    code: "04xx",
    name: { uz: "Nomoddiy aktivlar (0410-0490 guruhi)", ru: "Нематериальные активы (группа 0410-0490)" },
    kind: "active",
    note: {
      uz: "NMA guruhi: patent, litsenziya, dasturiy ta'minot va h.k. Kirim — debet, chiqim — kredit.",
      ru: "Группа НМА: патенты, лицензии, ПО и т.д. Поступление — дебет, выбытие — кредит.",
    },
  },
  {
    code: "05xx",
    name: { uz: "Nomoddiy aktivlar amortizatsiyasi (0510-0590 guruhi)", ru: "Амортизация НМА (группа 0510-0590)" },
    kind: "contra-active",
    note: {
      uz: "Kontr-aktiv guruh: amortizatsiya hisoblanganda kreditlanadi, NMA chiqib ketganda debetlanadi.",
      ru: "Контр-активная группа: начисление амортизации — кредит, списание при выбытии — дебет.",
    },
  },
  {
    code: "0130",
    name: { uz: "Mashina va asbob-uskunalar (Asosiy vositalar)", ru: "Машины и оборудование (Основные средства)" },
    kind: "active",
    note: {
      uz: "Mashina, kompyuter va uskunalar boshlang'ich qiymatda yuritiladi (0110 — yer, 0120 — binolar, 0130 — mashinalar, 0160 — transport). Kirim — debet, chiqim — kredit.",
      ru: "Машины, компьютеры и оборудование учитываются по первоначальной стоимости (0110 — земля, 0120 — здания, 0130 — машины, 0160 — транспорт). Поступление — дебет, выбытие — кредит.",
    },
  },
  {
    code: "0210",
    name: { uz: "Asosiy vositalarning eskirishi (amortizatsiya)", ru: "Износ основных средств (амортизация)" },
    kind: "contra-active",
    note: {
      uz: "Kontr-aktiv schyot (0210-0290): eskirish hisoblanganda kreditlanadi, aktiv sotilganda/hisobdan chiqarilganda debetlanadi.",
      ru: "Контр-активный счёт (0210-0290): начисление износа — кредит, списание при выбытии — дебет.",
    },
  },
  {
    code: "0230",
    name: { uz: "Mashina va asbob-uskunalarning eskirishi", ru: "Износ машин и оборудования" },
    kind: "contra-active",
    note: {
      uz: "Uskuna va mashinalar bo'yicha jamlangan eskirish (kontr-aktiv).",
      ru: "Накопленный износ по машинам и оборудованию (контр-активный).",
    },
  },
  {
    code: "0410",
    name: { uz: "Patentlar, litsenziyalar va nou-xau (Nomoddiy aktivlar)", ru: "Патенты, лицензии и ноу-хау (Нематериальные активы)" },
    kind: "active",
    note: {
      uz: "Nomoddiy aktivlar (litsenziyalar, dasturiy ta'minot). Kirim — debet, chiqim — kredit.",
      ru: "Нематериальные активы (лицензии, ПО). Поступление — дебет, выбытие — кредит.",
    },
  },
  {
    code: "0510",
    name: { uz: "Nomoddiy aktivlar amortizatsiyasi", ru: "Амортизация нематериальных активов" },
    kind: "contra-active",
    note: {
      uz: "Nomoddiy aktivlar bo'yicha jamlangan amortizatsiya (kontr-aktiv).",
      ru: "Накопленная амортизация нематериальных активов (контр-активный).",
    },
  },
  {
    code: "0710",
    name: { uz: "O'rnatiladigan asbob-uskunalar (mahalliy)", ru: "Оборудование к установке (отечественное)" },
    kind: "active",
    note: {
      uz: "Montaj talab qiladigan uskunalar omborga kirim qilinganda 0710 debetlanadi. Montajga berilganda 0720/0810 ga o'tkaziladi.",
      ru: "Оборудование к установке оприходуется по дебету 0710. При передаче в монтаж переносится на 0720/0810.",
    },
  },
  {
    code: "0720",
    name: { uz: "O'rnatiladigan asbob-uskunalar (xorijiy / montajdagilar)", ru: "Оборудование к установке (импортное / в монтаже)" },
    kind: "active",
    note: {
      uz: "Montaj va o'rnatish jarayonidagi asbob-uskunalar. O'rnatib bo'lingach 0810 ga, so'ng 0130 ga o'tkaziladi.",
      ru: "Оборудование в процессе монтажа и установки. После завершения переносится на 0810, затем на 0130.",
    },
  },
  {
    code: "0810",
    name: { uz: "Tugallanmagan qurilish (kapital qo'yilmalar)", ru: "Незавершённое строительство (капвложения)" },
    kind: "active",
    note: {
      uz: "Qurilayotgan va tayyorlanayotgan asosiy vosita obyektiga to'plangan barcha kapital xarajatlar. Ishga tushgach 0130 ga o'tkaziladi.",
      ru: "Все капитальные затраты, накапливаемые по строящемуся объекту ОС. При вводе в эксплуатацию переносится на 0130.",
    },
  },
  {
    code: "0820",
    name: { uz: "Asosiy vositalarni xarid qilish", ru: "Приобретение основных средств" },
    kind: "active",
    note: {
      uz: "Asosiy vositalarni sotib olish xarajatlari to'planadigan aktiv schyot.",
      ru: "Активный счёт для накопления расходов по приобретению основных средств.",
    },
  },
  {
    code: "0830",
    name: { uz: "Nomoddiy aktivlarni xarid qilish", ru: "Приобретение нематериальных активов" },
    kind: "active",
    note: {
      uz: "Nomoddiy aktivlar (litsenziya, dastur) sotib olish xarajatlari to'planadi.",
      ru: "Затраты на приобретение нематериальных активов (лицензий, ПО).",
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
    name: { uz: "Inventar va xo'jalik jihozlari", ru: "Инвентарь и хозяйственные принадлежности" },
    kind: "active",
    note: {
      uz: "Inventarlar va xo'jalik jihozlari zaxirasi.",
      ru: "Запас инвентаря и хозяйственных принадлежностей.",
    },
  },
  {
    code: "1510",
    name: { uz: "Materiallarni tayyorlash va xarid qilish", ru: "Заготовление и приобретение материалов" },
    kind: "active",
    note: {
      uz: "Materiallarni tayyorlash va sotib olish xarajatlarini to'plash schyoti.",
      ru: "Счёт для заготовления и приобретения материалов.",
    },
  },
  {
    code: "1090",
    name: { uz: "Boshqa materiallar", ru: "Прочие материалы" },
    kind: "active",
    note: {
      uz: "Chiqindi, metallolom va boshqa qaytariladigan materiallar zaxirasi.",
      ru: "Запас отходов, металлолома и прочих возвратных материалов.",
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
    code: "2310",
    name: { uz: "Yordamchi ishlab chiqarish", ru: "Вспомогательное производство" },
    kind: "active",
    note: {
      uz: "Yordamchi sex va bo'linmalar xarajatlarini hisobga olish schyoti.",
      ru: "Учёт затрат вспомогательных цехов и подразделений.",
    },
  },
  {
    code: "2510",
    name: { uz: "Umumishlab chiqarish xarajatlari", ru: "Общепроизводственные расходы" },
    kind: "active",
    note: {
      uz: "Sex va umumishlab chiqarish ehtiyojlari uchun xarajatlar.",
      ru: "Затраты на цеховые и общепроизводственные нужды.",
    },
  },
  {
    code: "2810",
    name: { uz: "Ombordagi tayyor mahsulot", ru: "Готовая продукция на складе" },
    kind: "active",
    note: {
      uz: "Ishlab chiqarilgan va sotishga tayyor mahsulot zaxirasi.",
      ru: "Запас изготовленной и готовой к продаже продукции.",
    },
  },
  {
    code: "2610",
    name: { uz: "Ishlab chiqarishdagi brak", ru: "Брак в производстве" },
    kind: "active",
    note: {
      uz: "Yaroqsiz mahsulot xarajatlari debetda to'planadi, qoplanadigan summalar kreditda hisobdan chiqariladi.",
      ru: "Затраты по браку собираются по дебету, возмещения списываются по кредиту.",
    },
  },
  {
    code: "2910",
    name: { uz: "Ombordagi tovarlar", ru: "Товары на складе" },
    kind: "active",
    note: {
      uz: "Qayta sotish uchun sotib olingan tovarlar. Sotilganda tannarx sifatida hisobdan chiqariladi.",
      ru: "Товары, купленные для перепродажи. При продаже списываются в себестоимость.",
    },
  },
  {
    code: "2920",
    name: { uz: "Chakana savdodagi tovarlar", ru: "Товары в розничной торговле" },
    kind: "active",
    note: {
      uz: "Chakana savdo shoxobchasiga o'tkazilgan tovarlar.",
      ru: "Товары, переданные в розничную торговлю.",
    },
  },
  {
    code: "4010",
    name: { uz: "Xaridorlar va buyurtmachilardan olinadigan schyotlar", ru: "Счета к получению от покупателей и заказчиков" },
    kind: "active",
    note: {
      uz: "Debitorlik qarzi: xaridor bizga qarzdor. Qarz paydo bo'lsa — debet, to'lansa — kredit.",
      ru: "Дебиторская задолженность: покупатель должен нам. Возникновение — дебет, погашение — кредит.",
    },
  },
  {
    code: "4210",
    name: { uz: "Mehnat haqi bo'yicha berilgan bo'naklar", ru: "Авансы по оплате труда" },
    kind: "active",
    note: {
      uz: "Xodimlarga ish haqi hisobidan oldindan berilgan avanslar.",
      ru: "Авансы, выданные работникам в счёт заработной платы.",
    },
  },
  {
    code: "4220",
    name: { uz: "Xizmat safarlariga berilgan bo'naklar (hisobdor summalar)", ru: "Авансы на командировочные расходы (подотчёт)" },
    kind: "active",
    note: {
      uz: "Xizmat safari va xo'jalik xarajatlari uchun hisobdor shaxsga berilgan avans.",
      ru: "Аванс, выданный подотчётному лицу на командировку и хозрасходы.",
    },
  },
  {
    code: "4310",
    name: { uz: "Mol yetkazib beruvchilar va pudratchilarga berilgan bo'naklar", ru: "Авансы, выданные поставщикам и подрядчикам" },
    kind: "active",
    note: {
      uz: "Oldindan to'langan pul — ta'minotchi bizga tovar/xizmat qarzdor bo'lib qoladi.",
      ru: "Предоплата — поставщик остаётся должен нам товар/услугу.",
    },
  },
  {
    code: "4410",
    name: { uz: "Byudjetga bo'nak to'lovlari (kiruvchi QQS)", ru: "Авансовые платежи в бюджет (входящий НДС)" },
    kind: "active",
    note: {
      uz: "Kirim QQS va boshqa avans soliq to'lovlari — kelajakda majburiyatdan hisobga olinadi.",
      ru: "Входящий НДС и авансовые налоговые платежи — в будущем зачитываются из обязательства.",
    },
  },
  {
    code: "4610",
    name: { uz: "Ustav kapitaliga ta'sischilarning ulushlari bo'yicha qarzi", ru: "Задолженность учредителей по вкладам в уставный капитал" },
    kind: "active",
    note: {
      uz: "Ta'sis hujjatida e'lon qilingan, lekin hali kiritilmagan ulush — ta'sischi qarzi.",
      ru: "Объявленный, но ещё не внесённый вклад — долг учредителя.",
    },
  },
  {
    code: "4730",
    name: { uz: "Moddiy zararni qoplash bo'yicha xodimlarning qarzi", ru: "Задолженность персонала по возмещению ущерба" },
    kind: "active",
    note: {
      uz: "Aybdor xodimga yuklangan kamomad summasi — u qoplab berishi kerak.",
      ru: "Сумма недостачи, отнесённая на виновное лицо — подлежит возмещению.",
    },
  },
  {
    code: "5010",
    name: { uz: "Kassadagi pul mablag'lari", ru: "Денежные средства в кассе" },
    kind: "active",
    note: {
      uz: "Naqd pul. Kirim — debet, chiqim — kredit. Qoldiq faqat debet bo'ladi.",
      ru: "Наличные деньги. Приход — дебет, расход — кредит. Остаток только дебетовый.",
    },
  },
  {
    code: "4710",
    name: {
      uz: "Moddiy zarar yetkazganlik uchun xodimlarning qarzi",
      ru: "Задолженность персонала за причинённый материальный ущерб",
    },
    kind: "active",
    note: {
      uz: "Aybdor xodimdan undiriladigan zarar summasi — debitorlik qarzi.",
      ru: "Сумма ущерба, взыскиваемая с виновного работника — дебиторская задолженность.",
    },
  },
  {
    code: "4860",
    name: { uz: "Da'volar bo'yicha olinadigan schotlar", ru: "Счета к получению по претензиям" },
    kind: "active",
    note: {
      uz: "Yetkazib beruvchiga qo'yilgan da'vo summasi — undiriladigan debitorlik.",
      ru: "Сумма претензии к поставщику — дебиторская задолженность к взысканию.",
    },
  },
  {
    code: "5110",
    name: { uz: "Hisob-kitob schyotidagi pul mablag'lari", ru: "Денежные средства на расчётном счёте" },
    kind: "active",
    note: {
      uz: "Bankdagi milliy valyutadagi mablag'. Tushum — debet, to'lov — kredit.",
      ru: "Средства в банке в нацвалюте. Поступление — дебет, платёж — кредит.",
    },
  },
  {
    code: "5530",
    name: { uz: "Boshqa maxsus schyotlar (Korporativ bank kartasi)", ru: "Прочие спецсчета (Корпоративная банковская карта)" },
    kind: "active",
    note: {
      uz: "Korporativ bank kartasidagi (KBK) pul mablag'lari.",
      ru: "Денежные средства на корпоративной банковской карте (КБК).",
    },
  },
  {
    code: "5710",
    name: { uz: "Yo'ldagi pul mablag'lari (o'tkazmalar)", ru: "Денежные переводы в пути" },
    kind: "active",
    note: {
      uz: "Kassadan chiqqan, lekin bank hisobiga hali tushmagan pul (inkassatsiya).",
      ru: "Деньги, сданные из кассы, но ещё не зачисленные банком (инкассация).",
    },
  },
  {
    code: "5910",
    name: { uz: "Kamomadlar va qiymatliklarning buzilishidan yo'qotishlar", ru: "Недостачи и потери от порчи ценностей" },
    kind: "active",
    note: {
      uz: "Tranzit (yig'uvchi) aktiv schyot: kamomad avval bu yerga yig'iladi, keyin aybdorga yoki xarajatga yopiladi.",
      ru: "Транзитный активный счёт: недостача сначала собирается здесь, затем относится на виновного или в расходы.",
    },
  },
  {
    code: "6010",
    name: { uz: "Mol yetkazib beruvchilar va pudratchilarga to'lanadigan schyotlar", ru: "Счета к оплате поставщикам и подрядчикам" },
    kind: "passive",
    note: {
      uz: "Kreditorlik qarzi: biz ta'minotchiga qarzdormiz. Qarz oshsa — kredit, to'lansa — debet.",
      ru: "Кредиторская задолженность перед поставщиком. Рост — кредит, погашение — дебет.",
    },
  },
  {
    code: "6310",
    name: { uz: "Xaridorlar va buyurtmachilardan olingan bo'naklar", ru: "Авансы, полученные от покупателей и заказчиков" },
    kind: "passive",
    note: {
      uz: "Oldindan olingan pul daromad emas, majburiyat: biz tovar/xizmat qarzdormiz.",
      ru: "Полученная предоплата — не доход, а обязательство поставить товар/услугу.",
    },
  },
  {
    code: "6410",
    name: { uz: "Byudjetga to'lovlar bo'yicha qarzlar (QQS, foyda solig'i)", ru: "Задолженность по налогам в бюджет (НДС, налог на прибыль)" },
    kind: "passive",
    note: {
      uz: "Soliq majburiyati: hisoblanganda kredit, hisobga olinganda yoki to'langanda debet.",
      ru: "Налоговое обязательство: начисление — кредит, зачёт или уплата — дебет.",
    },
  },
  {
    code: "6420",
    name: { uz: "Jismoniy shaxslardan ushlab qolinadigan daromad solig'i", ru: "Удержанный НДФЛ" },
    kind: "passive",
    note: {
      uz: "Xodim daromadidan ushlangan soliq — korxona uni byudjetga o'tkazishi shart.",
      ru: "Налог, удержанный из дохода работника — предприятие обязано перечислить его в бюджет.",
    },
  },
  {
    code: "6430",
    name: { uz: "Boshqa soliqlar bo'yicha qarzdorlik (aylanma soliq)", ru: "Задолженность по прочим налогам (налог с оборота)" },
    kind: "passive",
    note: {
      uz: "Aylanma solig'i hisoblanganda kredit, byudjetga to'langanda debet.",
      ru: "Начисление налога с оборота — кредит, уплата в бюджет — дебет.",
    },
  },
  {
    code: "6510",
    name: { uz: "Sug'urtalar bo'yicha qarzlar (FSS / Dekret)", ru: "Задолженность по страхованию (ФСС / декретные)" },
    kind: "passive",
    note: {
      uz: "FSS hisobidan homiladorlik va tug'ish (dekret) nafaqasi hamda sug'urta to'lovlari.",
      ru: "Расчёты по страхованию и пособиям по беременности и родам.",
    },
  },
  {
    code: "6520",
    name: { uz: "Ijtimoiy sug'urta (ijtimoiy soliq) bo'yicha to'lovlar", ru: "Расчёты по социальному налогу" },
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
    name: { uz: "Xodimlar bilan mehnat haqi bo'yicha hisob-kitoblar", ru: "Расчёты с персоналом по оплате труда" },
    kind: "passive",
    note: {
      uz: "Hisoblangan oylik — kredit (majburiyat oshdi), to'langan yoki ushlangan summa — debet.",
      ru: "Начисленная зарплата — кредит, выплата или удержание — дебет.",
    },
  },
  {
    code: "6720",
    name: { uz: "Deponentlangan mehnat haqi", ru: "Депонированная заработная плата" },
    kind: "passive",
    note: {
      uz: "Belgilangan muddatda olinmagan mehnat haqi majburiyati.",
      ru: "Не полученная в срок заработная плата.",
    },
  },
  {
    code: "6810",
    name: { uz: "Qisqa muddatli bank kreditlari", ru: "Краткосрочные банковские кредиты" },
    kind: "passive",
    note: {
      uz: "Qisqa muddatli kreditlar va zaymlar.",
      ru: "Краткосрочные банковские кредиты и займы.",
    },
  },
  {
    code: "6980",
    name: { uz: "Boshqa majburiyatlar (kasaba uyushmasi / ijro varaqalari)", ru: "Прочие обязательства (профсоюз / исполнительные листы)" },
    kind: "passive",
    note: {
      uz: "Ish haqidan ushlangan kasaba uyushmasi badallari va boshqa ijro varaqalari majburiyatlari.",
      ru: "Профсоюзные взносы и удержания по исполнительным листам.",
    },
  },
  {
    code: "6990",
    name: { uz: "Boshqa majburiyatlar", ru: "Прочие обязательства" },
    kind: "passive",
    note: {
      uz: "Boshqa majburiyatlar va to'lanadigan xizmatlar.",
      ru: "Прочие обязательства и услуги к оплате.",
    },
  },
  {
    code: "8330",
    name: { uz: "Pay va ulushlar (Ustav kapitali)", ru: "Паи и доли (Уставный капитал)" },
    kind: "passive",
    note: {
      uz: "Egalar oldidagi majburiyat — ta'sis hujjatidagi e'lon qilingan kapital.",
      ru: "Обязательство перед собственниками — объявленный в уставе капитал.",
    },
  },
  {
    code: "8710",
    name: { uz: "Taqsimlanmagan foyda", ru: "Нераспределённая прибыль" },
    kind: "passive",
    note: {
      uz: "Korxonaning to'plangan sof foydasi.",
      ru: "Накопленная чистая прибыль предприятия.",
    },
  },
  {
    code: "9010",
    name: { uz: "Mahsulot sotishdan daromadlar", ru: "Доходы от реализации продукции" },
    kind: "income",
    note: {
      uz: "Tayyor mahsulot sotishdan tushgan daromad.",
      ru: "Выручка от реализации готовой продукции.",
    },
  },
  {
    code: "9020",
    name: { uz: "Tovar sotishdan daromadlar", ru: "Доходы от реализации товаров" },
    kind: "income",
    note: {
      uz: "Daromad schyoti passiv xarakterli: daromad kreditga yoziladi.",
      ru: "Счёт дохода пассивный по характеру: доход отражается по кредиту.",
    },
  },
  {
    code: "9110",
    name: { uz: "Sotilgan mahsulot tannarxi", ru: "Себестоимость реализованной продукции" },
    kind: "expense",
    note: {
      uz: "Sotilgan tayyor mahsulotning ishlab chiqarish tannarxi.",
      ru: "Себестоимость реализованной готовой продукции.",
    },
  },
  {
    code: "9120",
    name: { uz: "Sotilgan tovarlar tannarxi", ru: "Себестоимость реализованных товаров" },
    kind: "expense",
    note: {
      uz: "Xarajat schyoti aktiv xarakterli: xarajat debetga yoziladi.",
      ru: "Счёт расходов активный по характеру: расход отражается по дебету.",
    },
  },
  {
    code: "9210",
    name: { uz: "Asosiy vositalarning chiqib ketishi", ru: "Выбытие основных средств" },
    kind: "income",
    note: {
      uz: "Asosiy vositalarni sotish/hisobdan chiqarish operatsiyalari.",
      ru: "Операции по реализации/выбытию основных средств.",
    },
  },
  {
    code: "9310",
    name: { uz: "Operativ ijaradan daromadlar", ru: "Доходы от оперативной аренды" },
    kind: "income",
    note: {
      uz: "Mol-mulkni ijaraga berishdan olingan daromadlar.",
      ru: "Доходы от сдачи имущества в аренду.",
    },
  },
  {
    code: "9410",
    name: { uz: "Sotish xarajatlari", ru: "Расходы по реализации" },
    kind: "expense",
    note: {
      uz: "Mahsulot/tovarlarni sotish va reklama bilan bog'liq xarajatlar.",
      ru: "Расходы на реализацию и рекламу товаров.",
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
  {
    code: "9380",
    name: { uz: "Tekin (qaytarilmaydigan) moliyaviy yordam", ru: "Безвозмездная финансовая помощь" },
    kind: "income",
    note: {
      uz: "Boshqa operatsion daromad: qaytarilmaydigan yordam olinganda kreditlanadi.",
      ru: "Прочий операционный доход: при получении безвозмездной помощи кредитуется.",
    },
  },
  {
    code: "9820",
    name: { uz: "Foyda solig'i va boshqa soliqlar xarajatlari", ru: "Расходы по налогу на прибыль и прочим налогам" },
    kind: "expense",
    note: {
      uz: "Aylanma soliq va shunga o'xshash soliqlar hisoblanganda debetlanadi.",
      ru: "Дебетуется при начислении налога с оборота и подобных налогов.",
    },
  },
  {
    code: "014",
    name: { uz: "Foydalanishdagi inventar va jihozlar (balansdan tashqari)", ru: "Инвентарь и принадлежности в эксплуатации (забалансовый)" },
    kind: "active",
    note: {
      uz: "Balansdan tashqari schyot: foydalanishga berilgan inventar nazorat uchun shu yerda yuritiladi (bir tomonlama yozuv).",
      ru: "Забалансовый счёт: переданный в эксплуатацию инвентарь учитывается здесь для контроля (односторонняя запись).",
    },
  },
];

export const ACCOUNT_MAP: Record<string, Account> = Object.fromEntries(
  ACCOUNTS.map((a) => [a.code, a]),
);

export function isActiveKind(kind: AccountKind) {
  return kind === "active" || kind === "expense";
}