# Buxgalteriya Master

LOVABLE UCHUN PROMPT — "Hisobchi" (Buxgalteriya o'rganish ilovasi)

Quyidagi matnni to'liq nusxalab Lovable'ga joylashtir.

LOYIHA TAVSIFI

Buxgalteriya kursida o'qiydigan talabalar uchun interaktiv o'rganish ilovasi yarat. Asosiy maqsad — talaba schotlar, pravodkalar (buxgalteriya yozuvlari), BHMS (Buxgalteriya hisobi milliy standartlari) va tegishli qonunlarni tez va tushunib o'rganishi, faqat yodlab emas, mantiqini anglab olishi.

Ilova web-app bo'lsin, mobile-first va to'liq responsive (telefon, planshet, kompyuterda bir xil yaxshi ishlasin). Interfeys tili — foydalanuvchi tanlashi mumkin bo'lgan ikki til: o'zbek va rus (til almashtirish tugmasi bo'lsin, header'da).

Hozircha barcha ma'lumotlar statik (JSON/kod ichida hardcoded) bo'lsin, backend shart emas — lekin kelajakda backend/database ulash oson bo'ladigan qilib struktura tuzilgan bo'lsin (masalan alohida data fayllar, komponentlar orasida aniq bo'linish).

ASOSIY FUNKSIONAL BLOKLAR

1. Modullar tizimi (o'quv yo'li)

Butun kurs **10 ta mavzu (modul)**ga bo'lingan (pastda to'liq ro'yxat)

Modullar ketma-ket ochiladi: 1-modul boshida ochiq, qolganlari qulflangan

Modul holatlari: qulflangan (kulrang, 🔒 belgi), joriy (rangli, faol), o'zlashtirilgan (yashil, ✓ belgi)

Bosh sahifada barcha modullar vertikal ro'yxat/karta ko'rinishida, har birida progress-bar

2. Har bir modul ichida 2 bosqich

a) "O'qish" bo'limi:

Shu modulga oid schotlar ro'yxati — schot raqami, nomi, turi (aktiv/passiv), qisqa tushuntirish

Shu modulga oid pravodkalar ro'yxati — Dt/Kt ko'rinishida, har birida: qanday operatsiya ekanligi (tavsif) va nega aynan shunday Dt/Kt tanlanganligi (mantiqiy izoh, aktiv/passiv o'zgarishi tilida tushuntirilgan)

b) "Test" bo'limi:

Har bir modul uchun 30 ta savol

Savollar taxminan: ~70-75% joriy moduldan, ~25-30% oldingi o'tilgan modullardan (takrorlash/unutmaslik uchun; agar bu 1-modul bo'lsa, albatta 100% shu moduldan)

Savol formatlari xilma-xil bo'lsin:

Tavsif berilib, to'g'ri pravodka (Dt-Kt) tanlash

Pravodka (Dt-Kt) berilib, qanday operatsiya ekanini tanlash

Schot raqami berilib, aktiv/passiv turini tanlash

"Xato pravodkani top" formatidagi savollar

Har javobdan keyin darhol feedback: to'g'ri/xato + qisqa izoh

Test oxirida: natija foizi. Agar 90% yoki undan yuqori bo'lsa — keyingi modul ochiladi va tabriklash ekrani chiqadi. Agar 90% dan past bo'lsa — keyingi modul ochilmaydi, faqat xato qilingan savollar alohida ro'yxatda ko'rsatiladi va "materialni qayta ko'rish" taklif qilinadi (butun testni boshidan emas)

3. "Ma'lumotnoma" bo'limi (alohida, doim ochiq)

Bu bo'lim modul tugashini kutmasdan istalgan vaqtda ochiladi, ichida 2 ta tab:

BHMS — Buxgalteriya hisobi milliy standartlari ro'yxati, har birida nomi va qisqa tushuntirish

Qonunlar — buxgalteriya va soliqqa oid asosiy qonun/kodeks moddalari, qisqa tushuntirish bilan

Har bir pravodka "O'qish" bo'limida ko'rsatilganda, tegishli BHMS/qonun moddasiga havola bo'lishi kerak (masalan "Batafsil: BHMS 4" tugmasi bosilsa Ma'lumotnoma bo'limidagi tegishli joyga o'tadi)

4. Foydalanuvchi profili (User Profile)

Umumiy progress (necha % kurs o'zlashtirilgan)

Har bir modul bo'yicha statistika (o'tilgan/o'tilmagan, ball)

"Zaif joylar" — talaba eng ko'p xato qilgan pravodkalar/schotlar ro'yxati (test natijalaridan hisoblanadi)

Streak (necha kun ketma-ket mashq qilingani) — motivatsiya uchun

Hozircha statik/local state, keyin backend bilan ulanadi

5. Qo'shimcha — o'rganishni tezlashtiruvchi funksiyalar (qo'sh, tavsiya).



MODULLAR VA PRAVODKALAR (TO'LIQ RO'YXAT)

Har bir modul uchun quyida faqat Dt-Kt kodlari berilgan. Sendan so'ralayotgan narsa: har bir pravodka uchun to'g'ri, aniq tavsif va tushuntirish o'zing yoz — O'zbekiston buxgalteriya schyotlar rejasi (Milliy hisob rejasi) va BHMS'larga asoslanib, quyidagi mantiqda:

Qaysi schot debet, qaysi kredit

Har biri aktiv yoki passiv schot ekanini aniqla

Nega aynan shu tomonga yozilganini (aktiv oshdi/kamaydi, passiv oshdi/kamaydi mantig'ida) sodda tilda tushuntir

Tegishli BHMS raqamini (agar aniq bo'lsa) ko'rsat

Modul 1: Tashkil etish / Ta'sis kapitali 4610-8330, 5110-4610, 0820-4610, 1080-4610, 1010-4610

Modul 2: Asosiy vositalar 01XX-0710, 01XX-0720, 01XX-0820, 9420-02XX, 2010-02XX, 0820-6010, 0710-6010, 0720-6010

Modul 3: TMZ va ta'minotchilar bilan hisob-kitob 2010-6520, 9420-6520, 2910-6010, 4410-6010, 6010-4310, 6010-5110

Modul 4: Mehnat haqi va ijtimoiy sug'urta 6420-6530, 6710-6420, 6420-5110, 6530-5110, 6520-5110, 5010-5110, 6710-5010, 6710-6980, 6980-5110

Modul 5: Avanslar va boshqa hisob-kitoblar 4210-5110, 4210-5010, 6710-4210, 4310-5110, 4730-5910, 6710-4730

Modul 6: Sotish, daromad va QQS 9120-2910, 4010-9020, 4010-6410, 6410-4410, 6410-5110, 5110-4010, 5010-9020

Modul 7: Kredit va moliyaviy majburiyatlar 5110-6310, 6310-4010

Modul 8: Kassa-bank harakatlari 5710-5010, 5720-9020, 5110-5710, 9430-5720

Modul 9: Yo'qotishlar va zaxiralar 5910-2910, 5910-1010, 5910-2810, 9430-5910

Modul 10: Moliyaviy natijani yopish 9910-9420

(Eslatma: manba ro'yxatda 9120-2910 va 4410-6010 ikki marta uchragan — bittadan qoldirilgan, lekin ular ikki xil kontekstda (masalan asosiy vositalar sotib olinganda va TMZ sotib olinganda) ishlatilishi mumkinligini tushuntirishda aytib o't.)

DIZAYN YO'NALISHI

Uslub: buxgalteriya daftari/registr estetikasi — jiddiy, ishonchli, lekin zamonaviy va "og'ir" ko'rinmaydigan

Ranglar: to'q ko'k-yashil rangdagi asosiy fon emas — och qog'oz rangi (masalan #FAF6EA) fon, to'q ko'k-siyoh (#1C2541) matn, zumrad-yashil (#2F6F5E) asosiy urg'u rang (to'g'ri/progress uchun), oltin-xantal (#B8891F) ikkinchi urg'u (diqqat/streak uchun), qizil faqat xato uchun

Shrift: sarlavhalar uchun serif (masalan Fraunces), matn uchun sodda sans-serif (masalan Inter), schot raqamlari va Dt/Kt kodlari uchun monospace shrift (masalan IBM Plex Mono) — bu raqamlarni "rasmiy hujjat" kabi ko'rsatadi

Pastki navigatsiya (mobile uchun) — 3-4 ta asosiy bo'lim: Mavzular, Ma'lumotnoma, Profil

Dt va Kt tomonlar vizual jihatdan aniq farqlansin (masalan Dt — yashil belgi, Kt — to'q ko'k belgi), chunki bu buxgalteriyani vizual o'rganishga yordam beradi

Bo'sh/hali qulflangan modullarga bosilganda xatolik emas, "tez orada" degan tushunarli xabar chiqsin

TEXNIK TALABLAR

To'liq responsive, ayniqsa mobile ekranlarda (390-430px kenglikda) mukammal ishlasin

Barcha matnlar o'zbek va rus tillarida tayyorlansin, til almashtirish global holatda saqlansin

Test progress va foydalanuvchi ma'lumotlari hozircha local state (masalan localStorage yoki ilova ichi state)da saqlansin, real foydalanuvchi autentifikatsiyasi hozircha shart emas

Kod struktura toza va modulli bo'lsin — data (modullar, savollar, BHMS, qonunlar) alohida fayllarda, komponentlardan ajratilgan holda, keyin osongina kengaytirish/backend ulash mumkin bo'lsin

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5d9cb1d8-6073-4132-915b-8f0c5c7f5314).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
