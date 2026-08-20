export interface PracticeStep {
  id: number;
  text: { uz: string; ru: string };
  dt: string;
  kt: string;
  summa: number;
  hint: { uz: string; ru: string };
  explain: { uz: string; ru: string };
}

export interface PracticeCase {
  id: string;
  title: { uz: string; ru: string };
  subtitle: { uz: string; ru: string };
  company: string;
  context: { uz: string; ru: string };
  steps: PracticeStep[];
}

export const PRACTICE_CASES: PracticeCase[] = [
  {
    id: "case-production-full",
    title: {
      uz: "Ishlab chiqarish va sotish korxonasining to'liq xo'jalik sikli",
      ru: "Полный хозяйственный цикл производственно-торгового предприятия",
    },
    subtitle: {
      uz: "22 ta bir-biriga bog'liq operatsiya: Ta'sis etishdan moliyaviy natijani aniqlashgacha",
      ru: "22 взаимосвязанные операции: От учреждения до финансового результата",
    },
    company: "‘Grand Texil’ MChJ",
    context: {
      uz: "‘Grand Tekstil’ MChJ yangi tashkil etildi. Quyida korxonaning birinchi chorak davomidagi barcha xo'jalik operatsiyalari zanjiri berilgan. Har bir bosqichni ketma-ket bajarib, Debet (Dt), Kredit (Kt) va Summalarni to'g'ri hisoblang.",
      ru: "ООО ‘Grand Tekstil’ только что было создано. Ниже приведена цепочка хозяйственных операций за первый квартал. Выполняйте каждый шаг последовательно, рассчитывая Дебет (Dt), Кредит (Kt) и Сумму.",
    },
    steps: [
      {
        id: 1,
        text: {
          uz: "1. Ta'sischilar qaroriga ko'ra 100,000,000 so'm miqdorida Ustav kapitali e'lon qilindi.",
          ru: "1. По решению учредителей объявлен Уставный капитал в размере 100,000,000 сум.",
        },
        dt: "4610",
        kt: "8330",
        summa: 100000000,
        hint: {
          uz: "Ta'sischilarning ustav kapitaliga qarzlari (4610) ko'payadi, Ustav kapitali (8330) shakllanadi.",
          ru: "Задолженность учредителей (4610) увеличивается, формируется Уставный капитал (8330).",
        },
        explain: {
          uz: "Dt 4610 — Ta'sischilarning ustav kapitaliga ulushlar bo'yicha qarzi. Kt 8330 — Paichilar va ta'sischilarning ulushlari (Ustav kapitali). Summa: 100,000,000 so'm.",
          ru: "Dt 4610 — Задолженность учредителей по вкладам. Kt 8330 — Уставный капитал. Сумма: 100,000,000 сум.",
        },
      },
      {
        id: 2,
        text: {
          uz: "2. Ta'sischi o'z ulushi hisobidan hisob-kitob raqamiga 60,000,000 so'm pul mablag'i o'tkazdi.",
          ru: "2. Учредитель перечислил 60,000,000 сум на расчетный счет в счет своего вклада.",
        },
        dt: "5110",
        kt: "4610",
        summa: 60000000,
        hint: {
          uz: "Bankdagi hisob-kitob raqami (5110) ko'payadi (Dt), ta'sischi qarzi (4610) kamayadi (Kt).",
          ru: "Расчетный счет (5110) увеличивается (Dt), долг учредителя (4610) уменьшается (Kt).",
        },
        explain: {
          uz: "Dt 5110 — Hisob-kitob raqami. Kt 4610 — Ta'sischilar qarzi kamayishi. Summa: 60,000,000 so'm.",
          ru: "Dt 5110 — Расчетный счет. Kt 4610 — Погашение долга учредителя. Сумма: 60,000,000 сум.",
        },
      },
      {
        id: 3,
        text: {
          uz: "3. Ikkinchi ta'sischi ustav kapitali ulushi hisobiga omborga 40,000,000 so'mlik xom-ashyo (material) topshirdi.",
          ru: "3. Второй учредитель внес сырье (материалы) на склад на 40,000,000 сум в счет доли.",
        },
        dt: "1010",
        kt: "4610",
        summa: 40000000,
        hint: {
          uz: "Xom-ashyo va materiallar (1010) omborga kirim qilinadi (Dt), ta'sischi qarzi (4610) batamom yopiladi (Kt).",
          ru: "Сырье и материалы (1010) приходуются на склад (Dt), долг учредителя (4610) закрывается (Kt).",
        },
        explain: {
          uz: "Dt 1010 — Xom-ashyo va materiallar. Kt 4610 — Ta'sischilar qarzi yopilishi. Summa: 40,000,000 so'm.",
          ru: "Dt 1010 — Сырье и материалы. Kt 4610 — Погашение задолженности учредителя. Сумма: 40,000,000 сум.",
        },
      },
      {
        id: 4,
        text: {
          uz: "4. Qo'shimcha materiallar sotib olish uchun yetkazib beruvchiga bank orqali 10,000,000 so'm bo'nak (avans) to'landi.",
          ru: "4. Перечислен аванс поставщику с расчетного счета за дополнительные материалы — 10,000,000 сум.",
        },
        dt: "4310",
        kt: "5110",
        summa: 10000000,
        hint: {
          uz: "Berilgan avanslar (4310) ko'payadi (Dt), bankdagi pul (5110) kamayadi (Kt).",
          ru: "Выданные авансы (4310) увеличиваются (Dt), расчетный счет (5110) уменьшается (Kt).",
        },
        explain: {
          uz: "Dt 4310 — Berilgan bo'naklar. Kt 5110 — Hisob-kitob raqami. Summa: 10,000,000 so'm.",
          ru: "Dt 4310 — Авансы выданные. Kt 5110 — Расчетный счет. Сумма: 10,000,000 сум.",
        },
      },
      {
        id: 5,
        text: {
          uz: "5. Yetkazib beruvchidan 10,000,000 so'mlik materiallar kelib tushdi va omborga kirim qilindi.",
          ru: "5. Поступили материалы от поставщика на сумму 10,000,000 сум и оприходованы на склад.",
        },
        dt: "1010",
        kt: "6010",
        summa: 10000000,
        hint: {
          uz: "Materiallar (1010) ko'payadi, yetkazib beruvchiga qarz (6010) vujudga keladi.",
          ru: "Материалы (1010) увеличиваются, возникает задолженность поставщику (6010).",
        },
        explain: {
          uz: "Dt 1010 — Xom-ashyo va materiallar. Kt 6010 — Mol etkazib beruvchilarga to'lanadigan schotlar. Summa: 10,000,000 so'm.",
          ru: "Dt 1010 — Материалы. Kt 6010 — Accounts payable. Сумма: 10,000,000 сум.",
        },
      },
      {
        id: 6,
        text: {
          uz: "6. Yetkazib beruvchi bilan o'zaro avans hisob-kitobi (zachet) qilindi.",
          ru: "6. Произведен зачет ранее выданного аванса поставщику.",
        },
        dt: "6010",
        kt: "4310",
        summa: 10000000,
        hint: {
          uz: "Yetkazib beruvchiga qarz (6010) kamayadi (Dt), berilgan avans (4310) yopiladi (Kt).",
          ru: "Долг поставщику (6010) уменьшается (Dt), ранее выданный аванс (4310) закрывается (Kt).",
        },
        explain: {
          uz: "Dt 6010 — Mol etkazib beruvchilar. Kt 4310 — Berilgan bo'naklar. Summa: 10,000,000 so'm.",
          ru: "Dt 6010 — Поставщики. Kt 4310 — Авансы выданные. Сумма: 10,000,000 сум.",
        },
      },
      {
        id: 7,
        text: {
          uz: "7. Ishlab chiqarish uskunasi (asosiy vosita) sotib olish uchun yetkazib beruvchiga 15,000,000 so'm bo'nak berildi.",
          ru: "7. Перечислен аванс 15,000,000 сум за новое производственное оборудование.",
        },
        dt: "4310",
        kt: "5110",
        summa: 15000000,
        hint: {
          uz: "Dt 4310 — Berilgan bo'naklar, Kt 5110 — Hisob-kitob raqami.",
          ru: "Dt 4310 — Авансы выданные, Kt 5110 — Расчетный счет.",
        },
        explain: {
          uz: "Dt 4310, Kt 5110. Summa: 15,000,000 so'm.",
          ru: "Dt 4310, Kt 5110. Сумма: 15,000,000 сум.",
        },
      },
      {
        id: 8,
        text: {
          uz: "8. Korxonaga 15,000,000 so'mlik ishlab chiqarish uskunasi keltirildi (o'rnatish/tayinlash kapital qo'yilmasi).",
          ru: "8. Поступило оборудование стоимостью 15,000,000 сум (капитальные вложения).",
        },
        dt: "0820",
        kt: "6010",
        summa: 15000000,
        hint: {
          uz: "Asosiy vositalarni xarid qilish (0820) ko'payadi, yetkazib beruvchiga qarz (6010) hosil bo'ladi.",
          ru: "Приобретение ОС (0820) увеличивается, возник долг перед поставщиком (6010).",
        },
        explain: {
          uz: "Dt 0820 — Uskunalar xarid qilish. Kt 6010 — Mol etkazib beruvchilar. Summa: 15,000,000 so'm.",
          ru: "Dt 0820 — Приобретение оборудования. Kt 6010 — Поставщики. Сумма: 15,000,000 сум.",
        },
      },
      {
        id: 9,
        text: {
          uz: "9. Uskuna foydalanishga topshirildi va asosiy vosita (0130) tarkibiga o'tkazildi.",
          ru: "9. Оборудование введено в эксплуатацию (0130/0820).",
        },
        dt: "0130",
        kt: "0820",
        summa: 15000000,
        hint: {
          uz: "Asosiy vosita — mashina va uskunalar (0130) ko'payadi, kapital qo'yilma (0820) yopiladi.",
          ru: "Машины и оборудование (0130) увеличивается, капвложения (0820) закрываются.",
        },
        explain: {
          uz: "Dt 0130 — Mashina va uskunalar. Kt 0820 — Uskunalar xarid qilish. Summa: 15,000,000 so'm.",
          ru: "Dt 0130 — Машины и оборудование. Kt 0820 — Приобретение оборудования. Сумма: 15,000,000 сум.",
        },
      },
      {
        id: 10,
        text: {
          uz: "10. Ishlab chiqarish ehtiyojlari uchun ombordan 25,000,000 so'mlik xom-ashyo va materiallar sexga berildi.",
          ru: "10. Со склада в производство отпущено сырья и материалов на 25,000,000 сум.",
        },
        dt: "2010",
        kt: "1010",
        summa: 25000000,
        hint: {
          uz: "Asosiy ishlab chiqarish xarajatlari (2010) ko'payadi (Dt), ombordagi materiallar (1010) kamayadi (Kt).",
          ru: "Основное производство (2010) увеличивается (Dt), материалы на складе (1010) уменьшаются (Kt).",
        },
        explain: {
          uz: "Dt 2010 — Asosiy ishlab chiqarish. Kt 1010 — Xom-ashyo va materiallar. Summa: 25,000,000 so'm.",
          ru: "Dt 2010 — Основное производство. Kt 1010 — Материалы. Сумма: 25,000,000 сум.",
        },
      },
      {
        id: 11,
        text: {
          uz: "11. Ishlab chiqarish uskunasi bo'yicha joriy oy uchun 1,500,000 so'm eskirish (amortizatsiya) hisoblandi.",
          ru: "11. Начислена амортизация производственного оборудования за текущий месяц — 1,500,000 сум.",
        },
        dt: "2010",
        kt: "0230",
        summa: 1500000,
        hint: {
          uz: "Eskirish xarajati ishlab chiqarishga boradi (2010), uskunalar eskirishi (0230) ko'payadi (Kt).",
          ru: "Расходы на амортизацию идут в производство (2010), износ оборудования (0230) растет (Kt).",
        },
        explain: {
          uz: "Dt 2010 — Asosiy ishlab chiqarish. Kt 0230 — Mashina va uskunalar eskirishi. Summa: 1,500,000 so'm.",
          ru: "Dt 2010 — Основное производство. Kt 0230 — Износ оборудования. Сумма: 1,500,000 сум.",
        },
      },
      {
        id: 12,
        text: {
          uz: "12. Ishlab chiqarish xodimlariga 12,000,000 so'm asosiy ish haqi va 3,000,000 so'm mukofot puli hisoblandi (Jami: 15,000,000 so'm).",
          ru: "12. Начислена зарплата 12,000,000 сум и премия 3,000,000 сум рабочим производства (Всего: 15,000,000 сум).",
        },
        dt: "2010",
        kt: "6710",
        summa: 15000000,
        hint: {
          uz: "Ish haqi va mukofot xarajati ishlab chiqarishga o'tadi (2010), xodimlar bilan mehnat haqi qarzi (6710) 15 mln bo'lib shakllanadi.",
          ru: "Затраты на оплату труда идут в производство (2010), задолженность по зарплате (6710) составляет 15 млн.",
        },
        explain: {
          uz: "Dt 2010 — Asosiy ishlab chiqarish. Kt 6710 — Mehnat haqi bo'yicha xodimlar bilan hisoblashishlar. Summa: 15,000,000 so'm.",
          ru: "Dt 2010 — Основное производство. Kt 6710 — Расчеты с персоналом по оплате труда. Сумма: 15,000,000 сум.",
        },
      },
      {
        id: 13,
        text: {
          uz: "13. Jami hisoblangan 15,000,000 so'm ish haqidan 12% JSHDS (daromad solig'i) ushlandi (15,000,000 * 12% = 1,800,000 so'm).",
          ru: "13. Удержан НДФЛ 12% из зарплаты (15,000,000 * 12% = 1,800,000 сум).",
        },
        dt: "6710",
        kt: "6420",
        summa: 1800000,
        hint: {
          uz: "Xodimlar oldidagi ish haqi qarzi kamayadi (6710), byudjetga daromad solig'i qarzi (6420) oshadi.",
          ru: "Долг по зарплате перед сотрудниками уменьшается (6710), долг перед бюджетом по НДФЛ (6420) растет.",
        },
        explain: {
          uz: "Dt 6710 — Xodimlar bilan hisoblashishlar. Kt 6420 — Jismoniy shaxslardan olinadigan daromad solig'i qarzlari (JSHDS). Summa: 1,800,000 so'm.",
          ru: "Dt 6710 — Расчеты по оплате труда. Kt 6420 — Задолженность по НДФЛ. Сумма: 1,800,000 сум.",
        },
      },
      {
        id: 14,
        text: {
          uz: "14. Ish haqidan 0.1% ShNPS (shaxsiy jamg'arib boriladigan pensiya hisobi) ushlandi (15,000,000 * 0.1% = 15,000 so'm).",
          ru: "14. Удержан ИНПС 0.1% из зарплаты (15,000,000 * 0.1% = 15,000 сум).",
        },
        dt: "6710",
        kt: "6520",
        summa: 15000,
        hint: {
          uz: "Ish haqi qarzi kamayadi (6710), ShNPS bo'yicha qarz (6520) hosil bo'ladi.",
          ru: "Долг по зарплате снижается (6710), возникает задолженность по ИНПС (6520).",
        },
        explain: {
          uz: "Dt 6710 — Xodimlar bilan hisoblashishlar. Kt 6520 — Maqsadli davlat jamg'armalariga to'lovlar (ShNPS). Summa: 15,000 so'm.",
          ru: "Dt 6710 — Расчеты по зарплате. Kt 6520 — Задолженность по ИНПС. Сумма: 15,000 сум.",
        },
      },
      {
        id: 15,
        text: {
          uz: "15. Sud ijro varaqasiga ko'ra xodim ish haqidan 2,000,000 so'm aliment ushlanib qolindi.",
          ru: "15. По исполнительному листу удержаны алименты из зарплаты работника на сумму 2,000,000 сум.",
        },
        dt: "6710",
        kt: "6990",
        summa: 2000000,
        hint: {
          uz: "Ish haqi qarzi kamayadi (6710), boshqa majburiyatlar (6990) hosil bo'ladi.",
          ru: "Долг по зарплате уменьшается (6710), возникают прочие обязательства по алиментам (6990).",
        },
        explain: {
          uz: "Dt 6710 — Xodimlar bilan hisoblashishlar. Kt 6990 — Boshqa majburiyatlar (Alimentlar). Summa: 2,000,000 so'm.",
          ru: "Dt 6710 — Расчеты по зарплате. Kt 6990 — Прочие обязательства. Сумма: 2,000,000 сум.",
        },
      },
      {
        id: 16,
        text: {
          uz: "16. Barcha ushlanmalardan so'ng qolgan sof ish haqi summasi (15,000,000 - 1,800,000 - 15,000 - 2,000,000 = 11,185,000 so'm) kassadan to'landi.",
          ru: "16. Чистая зарплата за вычетом всех удержаний (11,185,000 сум) выплачена работникам из кассы.",
        },
        dt: "6710",
        kt: "5010",
        summa: 11185000,
        hint: {
          uz: "15,000,000 - 1,800,000 - 15,000 - 2,000,000 = 11,185,000 so'm. Dt 6710, Kt 5010.",
          ru: "15,000,000 - 1,800,000 - 15,000 - 2,000,000 = 11,185,000 сум. Dt 6710, Kt 5010.",
        },
        explain: {
          uz: "Dt 6710 — Mehnat haqi qarzi uzilishi. Kt 5010 — Kassa. Summa: 11,185,000 so'm.",
          ru: "Dt 6710 — Выплата зарплаты. Kt 5010 — Касса. Сумма: 11,185,000 сум.",
        },
      },
      {
        id: 17,
        text: {
          uz: "17. Tayyor mahsulot sexdan omborga faktik tannarxi bo'yicha (25mln mat + 1.5mln amort + 15mln oylik = 41,500,000 so'm) kirim qilindi.",
          ru: "17. Готовая продукция передана на склад по фактической себестоимости (25млн + 1.5млн + 15млн = 41,500,000 сум).",
        },
        dt: "2810",
        kt: "2010",
        summa: 41500000,
        hint: {
          uz: "Tayyor mahsulotlar (2810) ko'payadi, Asosiy ishlab chiqarish xarajatlari (2010) omborga o'tib yopiladi.",
          ru: "Готовая продукция (2810) растет, затраты основного производства (2010) списываются.",
        },
        explain: {
          uz: "Dt 2810 — Omborga tayyor mahsulot kirimi. Kt 2010 — Asosiy ishlab chiqarish yopilishi. Summa: 41,500,000 so'm.",
          ru: "Dt 2810 — Готовая продукция на складе. Kt 2010 — Закрытие производства. Сумма: 41,500,000 сум.",
        },
      },
      {
        id: 18,
        text: {
          uz: "18. Tayyor mahsulot xaridorga 60,000,000 so'mga sotildi (sotish tushumi e'lon qilindi).",
          ru: "18. Реализована готовая продукция покупателю на сумму 60,000,000 сум (выручка от реализации).",
        },
        dt: "4010",
        kt: "9010",
        summa: 60000000,
        hint: {
          uz: "Xaridorlar qarzi (4010) oshadi (Dt), Sotishdan daromad (9010) shakllanadi (Kt).",
          ru: "Дебиторская задолженность покупателей (4010) растет (Dt), Выручка (9010) начислена (Kt).",
        },
        explain: {
          uz: "Dt 4010 — Xaridorlar va buyurtmachilar. Kt 9010 — Tayyor mahsulotlarni sotishdan daromadlar. Summa: 60,000,000 so'm.",
          ru: "Dt 4010 — Расчеты с покупателями. Kt 9010 — Доходы от реализации. Сумма: 60,000,000 сум.",
        },
      },
      {
        id: 19,
        text: {
          uz: "19. Sotilgan mahsulotning faktik tannarxi (41,500,000 so'm) hisobdan chiqarildi.",
          ru: "19. Списана фактическая себестоимость проданной продукции — 41,500,000 сум.",
        },
        dt: "9110",
        kt: "2810",
        summa: 41500000,
        hint: {
          uz: "Sotilgan tayyor mahsulotlar tannarxi (9110) ko'payadi, ombordagi mahsulot (2810) kamayadi.",
          ru: "Себестоимость реализованной продукции (9110) растет, готовая продукция (2810) списывается.",
        },
        explain: {
          uz: "Dt 9110 — Sotilgan tayyor mahsulotlarning tannarxi. Kt 2810 — Omborga tayyor mahsulotlar. Summa: 41,500,000 so'm.",
          ru: "Dt 9110 — Себестоимость реализованной продукции. Kt 2810 — Готовая продукция. Сумма: 41,500,000 сум.",
        },
      },
      {
        id: 20,
        text: {
          uz: "20. Xaridordan sotilgan mahsulot uchun 60,000,000 so'm pul bankdagi hisob-kitob raqamiga kelib tushdi.",
          ru: "20. Поступила оплата от покупателя на расчетный счет — 60,000,000 сум.",
        },
        dt: "5110",
        kt: "4010",
        summa: 60000000,
        hint: {
          uz: "Hisob-kitob raqami (5110) ko'payadi, xaridor qarzi (4010) yopiladi.",
          ru: "Расчетный счет (5110) растет, задолженность покупателя (4010) закрывается.",
        },
        explain: {
          uz: "Dt 5110 — Hisob-kitob raqami. Kt 4010 — Xaridorlar qarzi uzilishi. Summa: 60,000,000 so'm.",
          ru: "Dt 5110 — Расчетный счет. Kt 4010 — Погашение долга покупателем. Сумма: 60,000,000 сум.",
        },
      },
      {
        id: 21,
        text: {
          uz: "21. Hisobot davri oxirida sotishdan olingan daromad (60,000,000 so'm) 9910-yakuniy moliyaviy natija schotiga yopildi.",
          ru: "21. В конце периода доход от реализации (60,000,000 сум) списан на финансовый результат (9910).",
        },
        dt: "9010",
        kt: "9910",
        summa: 60000000,
        hint: {
          uz: "Sotishdan daromad (9010) debetlanadi, Yakuniy moliyaviy natija (9910) kreditlanadi.",
          ru: "Доход от реализации (9010) дебетуется, Финансовый результат (9910) кредитуется.",
        },
        explain: {
          uz: "Dt 9010 — Sotishdan daromadlar yopilishi. Kt 9910 — Yakuniy moliyaviy natija (Foyda/Zarar). Summa: 60,000,000 so'm.",
          ru: "Dt 9010 — Закрытие доходов. Kt 9910 — Финансовый результат. Сумма: 60,000,000 сум.",
        },
      },
      {
        id: 22,
        text: {
          uz: "22. Sotilgan mahsulot tannarxi xarajati (41,500,000 so'm) 9910-yakuniy moliyaviy natija schotiga yopildi.",
          ru: "22. Себестоимость реализованной продукции (41,500,000 сум) списана на финансовый результат (9910).",
        },
        dt: "9910",
        kt: "9110",
        summa: 41500000,
        hint: {
          uz: "Yakuniy moliyaviy natija (9910) debetlanadi, Sotilgan mahsulot tannarxi (9110) kreditlanadi va yopildi.",
          ru: "Финансовый результат (9910) дебетуется, Себестоимость (9110) кредитуется и закрывается.",
        },
        explain: {
          uz: "Dt 9910 — Yakuniy moliyaviy natija. Kt 9110 — Tannarx yopilishi. Sof foyda: 18,500,000 so'm! Summa: 41,500,000 so'm.",
          ru: "Dt 9910 — Конечный финансовый результат. Kt 9110 — Закрытие себестоимости. Чистая прибыль: 18,500,000 сум! Сумма: 41,500,000 сум.",
        },
      },
    ],
  },
  {
    id: "case-trading-services",
    title: {
      uz: "Savdo va xizmat ko'rsatish korxonasining buxgalteriya operatsiyalari",
      ru: "Бухгалтерские операции торгового предприятия и сферы услуг",
    },
    subtitle: {
      uz: "20 ta bog'liq operatsiya: Tovar harakati, ustama foiz, inkassatsiya va terminal",
      ru: "20 взаимосвязанных операций: Движение товаров, наценка, инкассация и терминал",
    },
    company: "‘Oazis Savdo’ MChJ",
    context: {
      uz: "‘Oazis Savdo’ MChJ chakana va ulgurji savdo hamda servis xizmatlari ko'rsatadi. Korxonaning to'liq bir oylik xo'jalik operatsiyalarini zanjir ko'rinishida bajaring.",
      ru: "ООО ‘Oazis Savdo’ занимается розничной и оптовой торговлей, а также оказывает сервисные услуги. Выполните полный месяц операций по цепочке.",
    },
    steps: [
      {
        id: 1,
        text: {
          uz: "1. Ta'sischi tomonidan ustav kapitaliga hisob-kitob raqamiga 50,000,000 so'm pul o'tkazildi.",
          ru: "1. Учредителем внесен уставный капитал на расчетный счет — 50,000,000 сум.",
        },
        dt: "5110",
        kt: "4610",
        summa: 50000000,
        hint: { uz: "Dt 5110, Kt 4610.", ru: "Dt 5110, Kt 4610." },
        explain: { uz: "Dt 5110, Kt 4610. Summa: 50,000,000 so'm.", ru: "Dt 5110, Kt 4610. Сумма: 50,000,000 сум." },
      },
      {
        id: 2,
        text: {
          uz: "2. Ta'sischilarning ustav kapitali e'lon qilinishi shakllantirildi.",
          ru: "2. Формирование уставного капитала.",
        },
        dt: "4610",
        kt: "8330",
        summa: 50000000,
        hint: { uz: "Dt 4610, Kt 8330.", ru: "Dt 4610, Kt 8330." },
        explain: { uz: "Dt 4610, Kt 8330. Summa: 50,000,000 so'm.", ru: "Dt 4610, Kt 8330. Сумма: 50,000,000 сум." },
      },
      {
        id: 3,
        text: {
          uz: "3. Savdo tovarlari sotib olish uchun yetkazib beruvchiga 20,000,000 so'm bo'nak to'landi.",
          ru: "3. Выдан аванс поставщику за товары — 20,000,000 сум.",
        },
        dt: "4310",
        kt: "5110",
        summa: 20000000,
        hint: { uz: "Dt 4310, Kt 5110.", ru: "Dt 4310, Kt 5110." },
        explain: { uz: "Dt 4310, Kt 5110. Summa: 20,000,000 so'm.", ru: "Dt 4310, Kt 5110. Сумма: 20,000,000 сум." },
      },
      {
        id: 4,
        text: {
          uz: "4. Yetkazib beruvchidan 20,000,000 so'mlik tovarlar kelib tushdi va omborga (2910) kirim qilindi.",
          ru: "4. Поступили товары на склад (2910) от поставщика — 20,000,000 сум.",
        },
        dt: "2910",
        kt: "6010",
        summa: 20000000,
        hint: { uz: "Ombordagi tovarlar (2910) ko'payadi, yetkazib beruvchiga qarz (6010) hosil bo'ladi.", ru: "Товары (2910) приходуются, возникает долг (6010)." },
        explain: { uz: "Dt 2910 — Ombordagi tovarlar. Kt 6010 — Mol etkazib beruvchilar. Summa: 20,000,000 so'm.", ru: "Dt 2910, Kt 6010. Сумма: 20,000,000 сум." },
      },
      {
        id: 5,
        text: {
          uz: "5. Berilgan bo'nak va yetkazib beruvchi qarzi o'zaro zachet qilindi.",
          ru: "5. Произведен зачет аванса поставщику.",
        },
        dt: "6010",
        kt: "4310",
        summa: 20000000,
        hint: { uz: "Dt 6010, Kt 4310.", ru: "Dt 6010, Kt 4310." },
        explain: { uz: "Dt 6010, Kt 4310. Summa: 20,000,000 so'm.", ru: "Dt 6010, Kt 4310. Сумма: 20,000,000 сум." },
      },
      {
        id: 6,
        text: {
          uz: "6. Ombordan 15,000,000 so'mlik tovarlar chakana sotuv do'koniga (2920) o'tkazildi.",
          ru: "6. Товары на 15,000,000 сум переданы в розничный магазин (2920).",
        },
        dt: "2920",
        kt: "2910",
        summa: 15000000,
        hint: { uz: "Chakana savdodagi tovarlar (2920) ko'payadi, ombordagi tovarlar (2910) kamayadi.", ru: "Товары в рознице (2920) растут, товары на складе (2910) снижаются." },
        explain: { uz: "Dt 2920 — Chakana savdodagi tovarlar. Kt 2910 — Ombordagi tovarlar. Summa: 15,000,000 so'm.", ru: "Dt 2920, Kt 2910. Сумма: 15,000,000 сум." },
      },
      {
        id: 7,
        text: {
          uz: "7. Do'konda naqd pulga 10,000,000 so'mlik tovarlar sotildi va pul kassaga tushdi.",
          ru: "7. Реализованы товары за наличные на сумму 10,000,000 сум (поступило в кассу).",
        },
        dt: "5010",
        kt: "9020",
        summa: 10000000,
        hint: { uz: "Kassa (5010) ko'payadi, Tovarlarni sotishdan daromad (9020) shakllanadi.", ru: "Касса (5010) увеличивается, Выручка от продажи товаров (9020) начислена." },
        explain: { uz: "Dt 5010 — Kassa. Kt 9020 — Tovarlarni sotishdan daromadlar. Summa: 10,000,000 so'm.", ru: "Dt 5010, Kt 9020. Сумма: 10,000,000 сум." },
      },
      {
        id: 8,
        text: {
          uz: "8. Sotilgan tovarlarning tannarxi (7,500,000 so'm) hisobdan chiqarildi.",
          ru: "8. Списана себестоимость проданных товаров — 7,500,000 сум.",
        },
        dt: "9120",
        kt: "2920",
        summa: 7500000,
        hint: { uz: "Sotilgan tovarlar tannarxi (9120) oshadi, do'kondagi tovarlar (2920) kamayadi.", ru: "Себестоимость проданных товаров (9120) растет, товары в рознице (2920) списываются." },
        explain: { uz: "Dt 9120 — Sotilgan tovarlarning tannarxi. Kt 2920 — Chakana savdodagi tovarlar. Summa: 7,500,000 so'm.", ru: "Dt 9120, Kt 2920. Сумма: 7,500,000 сум." },
      },
      {
        id: 9,
        text: {
          uz: "9. Do'konda plastik kartochka (terminal) orqali 5,000,000 so'mlik tovarlar sotildi (yo'ldagi pul o'tkazmalari 5710).",
          ru: "9. Проданы товары через терминал на 5,000,000 сум (переводы в пути 5710).",
        },
        dt: "5710",
        kt: "9020",
        summa: 5000000,
        hint: { uz: "Yo'ldagi pul o'tkazmalari/terminal (5710) ko'payadi (Dt), Sotishdan daromad (9020) oshadi (Kt).", ru: "Переводы в пути (5710) растут (Dt), Выручка (9020) увеличивается (Kt)." },
        explain: { uz: "Dt 5710 — Yo'ldagi pul o'tkazmalari. Kt 9020 — Tovarlarni sotishdan daromad. Summa: 5,000,000 so'm.", ru: "Dt 5710, Kt 9020. Сумма: 5,000,000 сум." },
      },
      {
        id: 10,
        text: {
          uz: "10. Terminal orqali tushgan 5,000,000 so'm pul bank tomonidan hisob-kitob raqamiga kelib tushdi.",
          ru: "10. Поступили денежные средства с терминала на расчетный счет — 5,000,000 сум.",
        },
        dt: "5110",
        kt: "5710",
        summa: 5000000,
        hint: { uz: "Hisob-kitob raqami (5110) ko'payadi, Yo'ldagi pul (5710) yopiladi.", ru: "Расчетный счет (5110) увеличивается, Переводы в пути (5710) закрываются." },
        explain: { uz: "Dt 5110 — Hisob-kitob raqami. Kt 5710 — Yo'ldagi pul o'tkazmalari. Summa: 5,000,000 so'm.", ru: "Dt 5110, Kt 5710. Сумма: 5,000,000 сум." },
      },
      {
        id: 11,
        text: {
          uz: "11. Terminal bo'yicha sotilgan tovarlarning tannarxi (3,800,000 so'm) hisobdan chiqarildi.",
          ru: "11. Списана себестоимость товаров, проданных через терминал — 3,800,000 сум.",
        },
        dt: "9120",
        kt: "2920",
        summa: 3800000,
        hint: { uz: "Dt 9120, Kt 2920.", ru: "Dt 9120, Kt 2920." },
        explain: { uz: "Dt 9120, Kt 2920. Summa: 3,800,000 so'm.", ru: "Dt 9120, Kt 2920. Сумма: 3,800,000 сум." },
      },
      {
        id: 12,
        text: {
          uz: "12. Kassadagi naqd puldan 8,000,000 so'm inkassatsiya xizmati orqali bankka topshirish uchun topshirildi (Yo'ldagi pul mablag'lari 5710).",
          ru: "12. Из кассы инкассированы наличные денежные средства для сдачи в банк — 8,000,000 сум.",
        },
        dt: "5710",
        kt: "5010",
        summa: 8000000,
        hint: { uz: "Yo'ldagi pul mablag'lari (5710) oshadi, Kassa (5010) kamayadi.", ru: "Переводы в пути (5710) растут, Касса (5010) уменьшается." },
        explain: { uz: "Dt 5710 — Yo'ldagi pul mablag'lari. Kt 5010 — Kassa. Summa: 8,000,000 so'm.", ru: "Dt 5710, Kt 5010. Сумма: 8,000,000 сум." },
      },
      {
        id: 13,
        text: {
          uz: "13. Inkassatsiya qilingan 8,000,000 so'm pul bankdagi hisob-kitob raqamiga kelib tushdi.",
          ru: "13. Инкассированные деньги зачислены на расчетный счет — 8,000,000 сум.",
        },
        dt: "5110",
        kt: "5710",
        summa: 8000000,
        hint: { uz: "Hisob-kitob raqami (5110) ko'payadi, Yo'ldagi pul (5710) yopiladi.", ru: "Расчетный счет (5110) растет, Переводы в пути (5710) закрываются." },
        explain: { uz: "Dt 5110 — Hisob-kitob raqami. Kt 5710 — Yo'ldagi pul mablag'lari. Summa: 8,000,000 so'm.", ru: "Dt 5110, Kt 5710. Сумма: 8,000,000 сум." },
      },
      {
        id: 14,
        text: {
          uz: "14. Mijozga 4,000,000 so'mlik servis/ta'mirlash xizmatlari ko'rsatildi (bajarilgan ishlar va xizmatlardan daromad 9030).",
          ru: "14. Оказаны сервисные услуги клиенту на сумму 4,000,000 сум (выручка от услуг 9030).",
        },
        dt: "4010",
        kt: "9030",
        summa: 4000000,
        hint: { uz: "Xaridor qarzi (4010) oshadi, Xizmat ko'rsatishdan daromad (9030) ko'payadi.", ru: "Долг покупателя (4010) растет, Доход от услуг (9030) увеличивается." },
        explain: { uz: "Dt 4010 — Xaridorlar qarzi. Kt 9030 — Xizmatlar ko'rsatishdan daromad. Summa: 4,000,000 so'm.", ru: "Dt 4010, Kt 9030. Сумма: 4,000,000 сум." },
      },
      {
        id: 15,
        text: {
          uz: "15. Mijoz ko'rsatilgan xizmat uchun 4,000,000 so'm pulni bank orqali to'ladi.",
          ru: "15. Клиент оплатил оказанные услуги через банк — 4,000,000 сум.",
        },
        dt: "5110",
        kt: "4010",
        summa: 4000000,
        hint: { uz: "Dt 5110, Kt 4010.", ru: "Dt 5110, Kt 4010." },
        explain: { uz: "Dt 5110 — Hisob-kitob raqami. Kt 4010 — Xaridor qarzi uzilishi. Summa: 4,000,000 so'm.", ru: "Dt 5110, Kt 4010. Сумма: 4,000,000 сум." },
      },
      {
        id: 16,
        text: {
          uz: "16. Savdo va xizmat ko'rsatish xodimlariga 6,000,000 so'm ish haqi hisoblandi (Davr xarajatlari / Sotish xarajatlari 9410).",
          ru: "16. Начислена зарплата персоналу торговли — 6,000,000 сум (Расходы по реализации 9410).",
        },
        dt: "9410",
        kt: "6710",
        summa: 6000000,
        hint: { uz: "Sotish xarajatlari (9410) debetlanadi, Mehnat haqi qarzi (6710) kreditlanadi.", ru: "Расходы на продажу (9410) дебетуются, Долг по зарплате (6710) кредитуется." },
        explain: { uz: "Dt 9410 — Sotish xarajatlari. Kt 6710 — Mehnat haqi bo'yicha xodimlar bilan hisoblashishlar. Summa: 6,000,000 so'm.", ru: "Dt 9410, Kt 6710. Сумма: 6,000,000 сум." },
      },
      {
        id: 17,
        text: {
          uz: "17. Ish haqidan 12% JSHDS solig'i ushlandi (6,000,000 * 12% = 720,000 so'm).",
          ru: "17. Удержан НДФЛ 12% из зарплаты (6,000,000 * 12% = 720,000 сум).",
        },
        dt: "6710",
        kt: "6420",
        summa: 720000,
        hint: { uz: "Dt 6710, Kt 6420.", ru: "Dt 6710, Kt 6420." },
        explain: { uz: "Dt 6710 — Xodimlar bilan hisoblashishlar. Kt 6420 — JSHDS qarzi. Summa: 720,000 so'm.", ru: "Dt 6710, Kt 6420. Сумма: 720,000 сум." },
      },
      {
        id: 18,
        text: {
          uz: "18. Qolgan sof ish haqi (6,000,000 - 720,000 = 5,280,000 so'm) bank kartalariga o'tkazib berildi.",
          ru: "18. Чистая зарплата (5,280,000 сум) перечислена на пластиковые карты сотрудников.",
        },
        dt: "6710",
        kt: "5110",
        summa: 5280000,
        hint: { uz: "Mehnat haqi qarzi (6710) yopiladi, Bankdagi pul (5110) kamayadi.", ru: "Долг по зарплате (6710) закрывается, Расчетный счет (5110) уменьшается." },
        explain: { uz: "Dt 6710 — Xodimlar bilan hisoblashishlar. Kt 5110 — Hisob-kitob raqami. Summa: 5,280,000 so'm.", ru: "Dt 6710, Kt 5110. Сумма: 5,280,000 сум." },
      },
      {
        id: 19,
        text: {
          uz: "19. Barcha daromadlar (9020: 15mln + 9030: 4mln = 19,000,000 so'm) 9910-moliyaviy natijaga yopildi.",
          ru: "19. Все доходы (19,000,000 сум) списаны на финансовый результат (9910).",
        },
        dt: "9020",
        kt: "9910",
        summa: 19000000,
        hint: { uz: "Dt 9020 (va 9030), Kt 9910.", ru: "Dt 9020 (и 9030), Kt 9910." },
        explain: { uz: "Dt 9020 — Sotishdan daromadlar. Kt 9910 — Yakuniy moliyaviy natija. Summa: 19,000,000 so'm.", ru: "Dt 9020, Kt 9910. Сумма: 19,000,000 сум." },
      },
      {
        id: 20,
        text: {
          uz: "20. Sotilgan tovarlar tannarxi (9120: 11.3mln) va sotish xarajatlari (9410: 6mln) jami 17,300,000 so'm 9910-moliyaviy natijaga yopildi.",
          ru: "20. Себестоимость и расходы на продажу (всего 17,300,000 сум) списаны на финансовый результат (9910).",
        },
        dt: "9910",
        kt: "9120",
        summa: 17300000,
        hint: { uz: "Dt 9910, Kt 9120 (va 9410). Jami xarajatlar yopildi.", ru: "Dt 9910, Kt 9120 (и 9410). Все расходы списаны." },
        explain: { uz: "Dt 9910 — Yakuniy moliyaviy natija. Kt 9120 / 9410 — Xarajatlar yopilishi. Sof foyda: 1,700,000 so'm! Summa: 17,300,000 so'm.", ru: "Dt 9910, Kt 9120 / 9410. Чистая прибыль: 1,700,000 сум! Сумма: 17,300,000 сум." },
      },
    ],
  },
];
