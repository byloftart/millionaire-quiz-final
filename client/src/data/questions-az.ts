/**
 * Azərbaycan dilində suallar bazası
 * "Kim milyonçu olmaq istəyir?" trenajoru üçün
 */

import { Question } from './questions';

export const questionsAz: Question[] = [
  // ========== TARİX ==========
  { id: 1, question: "İkinci Dünya müharibəsi hansı ildə başladı?", options: ["1937", "1938", "1939", "1940"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 2, question: "ABŞ-ın ilk prezidenti kim idi?", options: ["Tomas Cefferson", "Corc Vaşinqton", "Abraham Linkoln", "Benjamin Franklin"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 3, question: "Berlin divarı hansı ildə dağıdıldı?", options: ["1987", "1988", "1989", "1990"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 4, question: "Hansı ölkə ilk dəfə insanı kosmosa göndərdi?", options: ["ABŞ", "SSRİ", "Çin", "Almaniya"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 5, question: "Birinci Dünya müharibəsi hansı ildə bitdi?", options: ["1916", "1917", "1918", "1919"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 6, question: "Rusiyanın son imperatoru kim idi?", options: ["III Aleksandr", "II Nikolay", "I Pavel", "II Aleksandr"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 7, question: "Oktyabr inqilabı hansı ildə baş verdi?", options: ["1905", "1914", "1917", "1918"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 8, question: "Qədim Misirin paytaxtı hansı şəhər idi?", options: ["Qahirə", "İsgəndəriyyə", "Memfis", "Luksor"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 9, question: "1492-ci ildə Amerikanı kim kəşf etdi?", options: ["Vasko da Qama", "Xristofor Kolumb", "Americo Vespuççi", "Fernan Magellan"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 10, question: "Roma hansı ildə əsası qoyuldu?", options: ["e.ə. 653", "e.ə. 753", "e.ə. 853", "e.ə. 553"], correctAnswer: 1, category: "Tarix", difficulty: "hard" },
  { id: 11, question: "Ayda ilk insan kim idi?", options: ["Bazz Oldrin", "Nil Armstronq", "Yuri Qaqarin", "Alan Şepard"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 12, question: "SSRİ hansı ildə dağıldı?", options: ["1989", "1990", "1991", "1992"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 13, question: "Gizədə Böyük piramidanı hansı firon tikdirdi?", options: ["Tutanxamon", "II Ramzes", "Xeops", "Amenhotep"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 14, question: "ABŞ Müstəqillik Bəyannaməsi hansı ildə qəbul edildi?", options: ["1774", "1775", "1776", "1777"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 15, question: "Fransız inqilabının lideri kim idi?", options: ["Napoleon", "Robespyer", "XVI Lüdovik", "Marat"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },
  { id: 16, question: "Böyük Vətən müharibəsi hansı ildə başladı?", options: ["1939", "1940", "1941", "1942"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 17, question: "Bizans imperiyasının paytaxtı hansı şəhər idi?", options: ["Roma", "Afina", "Konstantinopol", "İsgəndəriyyə"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 18, question: "\"Kapital\" əsərini kim yazıb?", options: ["Adam Smit", "Karl Marks", "Fridrix Engels", "Con Keyns"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },
  { id: 19, question: "Kulikovo döyüşü hansı ildə oldu?", options: ["1360", "1370", "1380", "1390"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 20, question: "Monqol imperiyasının banisi kim idi?", options: ["Kublay xan", "Çingiz xan", "Tamerlan", "Batı"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 21, question: "Borodino döyüşü hansı ildə baş verdi?", options: ["1810", "1811", "1812", "1813"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 22, question: "Hansı müharibə 100 il davam etdi?", options: ["Qırmızı və Ağ qızılgül müharibəsi", "Yüzillik müharibə", "Otuzillik müharibə", "Yeddiillik müharibə"], correctAnswer: 1, category: "Tarix", difficulty: "easy" },
  { id: 23, question: "Birləşmiş Almaniyanın ilk kansleri kim idi?", options: ["Bismark", "Hitler", "I Vilhelm", "Adenauer"], correctAnswer: 0, category: "Tarix", difficulty: "medium" },
  { id: 24, question: "Vaterlo döyüşü hansı ildə oldu?", options: ["1813", "1814", "1815", "1816"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 25, question: "Rusiyada kəndliləri hansı çar azad etdi?", options: ["I Nikolay", "II Aleksandr", "III Aleksandr", "II Nikolay"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },
  
  // Azərbaycan haqqında suallar
  { id: 36, question: "Azərbaycan SSRİ-dən hansı ildə müstəqillik əldə etdi?", options: ["1989", "1990", "1991", "1992"], correctAnswer: 2, category: "Tarix", difficulty: "easy" },
  { id: 37, question: "Müstəqil Azərbaycanın ilk prezidenti kim idi?", options: ["Heydər Əliyev", "Əbülfəz Elçibəy", "Ayaz Mütəllibov", "İlham Əliyev"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 38, question: "Azərbaycan Xalq Cümhuriyyəti hansı ildə yaradıldı?", options: ["1917", "1918", "1919", "1920"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },
  { id: 39, question: "Şirvan dövlətinin paytaxtı hansı şəhər idi?", options: ["Bakı", "Şamaxı", "Gəncə", "Şuşa"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },
  { id: 40, question: "Bakı Azərbaycanın paytaxtı hansı ildə oldu?", options: ["1918", "1920", "1922", "1925"], correctAnswer: 0, category: "Tarix", difficulty: "medium" },
  { id: 41, question: "Səfəvilər dövlətinin banisi kim idi?", options: ["Şah Abbas", "Şah İsmayıl", "Nadir şah", "I Təhmasib"], correctAnswer: 1, category: "Tarix", difficulty: "hard" },
  { id: 42, question: "Bakıda Qanlı Yanvar faciəsi hansı ildə baş verdi?", options: ["1988", "1989", "1990", "1991"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 43, question: "Hansı Azərbaycan şəhəri türk dünyasının mədəniyyət paytaxtı idi?", options: ["Bakı", "Gəncə", "Şuşa", "Naxçıvan"], correctAnswer: 2, category: "Tarix", difficulty: "medium" },
  { id: 44, question: "Qarabağ müharibəsi hansı ildə başladı?", options: ["1988", "1990", "1991", "1992"], correctAnswer: 0, category: "Tarix", difficulty: "medium" },
  { id: 45, question: "Farslarla mübarizədə Azərbaycanın milli qəhrəmanı kim idi?", options: ["Babək", "Cavad xan", "Hüseyn xan", "Fətəli xan"], correctAnswer: 0, category: "Tarix", difficulty: "medium" },
  { id: 46, question: "Azərbaycan BMT-yə hansı ildə daxil oldu?", options: ["1991", "1992", "1993", "1994"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },
  { id: 47, question: "Qafqaz Albaniyasının qədim paytaxtı hansı Azərbaycan şəhəri idi?", options: ["Bakı", "Qəbələ", "Şəki", "Gəncə"], correctAnswer: 1, category: "Tarix", difficulty: "hard" },
  { id: 48, question: "Bakıda Qız qalası hansı əsrdə tikildi?", options: ["X əsr", "XI əsr", "XII əsr", "XIII əsr"], correctAnswer: 2, category: "Tarix", difficulty: "hard" },
  { id: 49, question: "Bakı xanlığının son xanı kim idi?", options: ["Hüseyn Qulu xan", "Mirzə Məhəmməd xan", "Məhəmməd Həsən xan", "Fətəli xan"], correctAnswer: 0, category: "Tarix", difficulty: "hard" },
  { id: 50, question: "Azərbaycan müasir bayrağını hansı ildə qəbul etdi?", options: ["1918", "1991", "1992", "1993"], correctAnswer: 1, category: "Tarix", difficulty: "medium" },

  // ========== COĞRAFİYA ==========
  { id: 51, question: "Dünyanın ən uzun çayı hansıdır?", options: ["Nil", "Amazon", "Yanszi", "Missisipi"], correctAnswer: 0, category: "Coğrafiya", difficulty: "easy" },
  { id: 52, question: "Dünyanın ən yüksək dağı hansıdır?", options: ["K2", "Everest", "Kançencanqa", "Lhotse"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },
  { id: 53, question: "Hansı okean ən böyükdür?", options: ["Atlantik", "Hind", "Sakit", "Şimali Buzlu"], correctAnswer: 2, category: "Coğrafiya", difficulty: "easy" },
  { id: 54, question: "Fransanın paytaxtı?", options: ["Lion", "Marsel", "Paris", "Tuluz"], correctAnswer: 2, category: "Coğrafiya", difficulty: "easy" },
  { id: 55, question: "Dünyanın ən böyük səhrası hansıdır?", options: ["Saxara", "Qobi", "Kalahari", "Atakama"], correctAnswer: 0, category: "Coğrafiya", difficulty: "easy" },
  { id: 56, question: "Yaponiyanın paytaxtı?", options: ["Osaka", "Tokio", "Kioto", "Naqoya"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },
  { id: 57, question: "Dünyanın ən dərin gölü hansıdır?", options: ["Tanqanika", "Baykal", "Viktoriya", "Miçiqan"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },
  { id: 58, question: "Avstraliyanın paytaxtı?", options: ["Sidney", "Melburn", "Kanberra", "Brisben"], correctAnswer: 2, category: "Coğrafiya", difficulty: "medium" },
  { id: 59, question: "Ən böyük ölkə hansıdır?", options: ["Kanada", "Rusiya", "ABŞ", "Çin"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },
  { id: 60, question: "Braziliyanın paytaxtı?", options: ["Rio-de-Janeyro", "San-Paulu", "Braziliya", "Salvador"], correctAnswer: 2, category: "Coğrafiya", difficulty: "medium" },
  
  // Azərbaycan haqqında suallar
  { id: 86, question: "Azərbaycanın paytaxtı?", options: ["Gəncə", "Bakı", "Sumqayıt", "Lənkəran"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },
  { id: 87, question: "Azərbaycanı hansı dəniz yuyur?", options: ["Qara", "Xəzər", "Aralıq", "Aral"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },
  { id: 88, question: "Azərbaycanın ən yüksək dağı hansıdır?", options: ["Şahdağ", "Bazardüzü", "Tufandağ", "Murovdağ"], correctAnswer: 1, category: "Coğrafiya", difficulty: "medium" },
  { id: 89, question: "Azərbaycanda ikinci ən böyük şəhər hansıdır?", options: ["Sumqayıt", "Gəncə", "Mingəçevir", "Şirvan"], correctAnswer: 1, category: "Coğrafiya", difficulty: "medium" },
  { id: 90, question: "Azərbaycanın ən uzun çayı hansıdır?", options: ["Kür", "Araz", "Qəbirri", "Tərtər"], correctAnswer: 0, category: "Coğrafiya", difficulty: "medium" },
  { id: 91, question: "Azərbaycanda neçə iqlim zonası var?", options: ["7", "9", "11", "13"], correctAnswer: 1, category: "Coğrafiya", difficulty: "hard" },
  { id: 92, question: "Azərbaycanda hansı yarımada yerləşir?", options: ["Krım", "Abşeron", "Taman", "Manqışlaq"], correctAnswer: 1, category: "Coğrafiya", difficulty: "medium" },
  { id: 93, question: "Azərbaycanın ən böyük gölü hansıdır?", options: ["Göygöl", "Maralgöl", "Batabad", "Ağgöl"], correctAnswer: 0, category: "Coğrafiya", difficulty: "hard" },
  { id: 94, question: "Azərbaycan hansı ölkələrlə həmsərhəddir?", options: ["Rusiya, Gürcüstan, Ermənistan, İran, Türkiyə", "Rusiya, Gürcüstan, Türkiyə, İran", "Gürcüstan, Ermənistan, Türkiyə, İran", "Rusiya, Ermənistan, Türkiyə, İraq"], correctAnswer: 0, category: "Coğrafiya", difficulty: "medium" },
  { id: 95, question: "Azərbaycanın ən böyük milli parkı hansıdır?", options: ["Göygöl", "Şirvan", "Altıağac", "Şahdağ"], correctAnswer: 3, category: "Coğrafiya", difficulty: "hard" },
  { id: 96, question: "Hansı Azərbaycan şəhəri xalçaları ilə məşhurdur?", options: ["Şəki", "Quba", "Gəncə", "Şuşa"], correctAnswer: 1, category: "Coğrafiya", difficulty: "medium" },
  { id: 97, question: "Azərbaycanın hansı bölgəsi muxtar respublikadır?", options: ["Naxçıvan", "Qarabağ", "Lənkəran", "Şəki"], correctAnswer: 0, category: "Coğrafiya", difficulty: "medium" },
  { id: 98, question: "Hansı Azərbaycan şəhəri mineral suları ilə məşhurdur?", options: ["Qəbələ", "İsmayıllı", "Naftalan", "Göyçay"], correctAnswer: 2, category: "Coğrafiya", difficulty: "medium" },
  { id: 99, question: "Azərbaycanın ərazisi nə qədərdir?", options: ["76,6 min km²", "86,6 min km²", "96,6 min km²", "106,6 min km²"], correctAnswer: 1, category: "Coğrafiya", difficulty: "hard" },
  { id: 100, question: "Hansı Azərbaycan şəhərinə \"küləklər şəhəri\" deyilir?", options: ["Gəncə", "Bakı", "Sumqayıt", "Lənkəran"], correctAnswer: 1, category: "Coğrafiya", difficulty: "easy" },

  // Digər kateqoriyalar üçün suallar (qısaldılmış versiya)
  // Tam versiya çox böyük olduğu üçün, əsas sualları əlavə edirəm
  
  // ========== ELM ==========
  { id: 101, question: "Günəşə ən yaxın planet hansıdır?", options: ["Venera", "Merkuri", "Mars", "Yer"], correctAnswer: 1, category: "Elm", difficulty: "easy" },
  { id: 102, question: "İnsanda neçə xromosom var?", options: ["44", "46", "48", "50"], correctAnswer: 1, category: "Elm", difficulty: "medium" },
  { id: 103, question: "Tənəffüs üçün hansı qaz lazımdır?", options: ["Azot", "Oksigen", "Karbon qazı", "Hidrogen"], correctAnswer: 1, category: "Elm", difficulty: "easy" },
  
  // ========== İNCƏSƏNƏT ==========
  { id: 151, question: "\"Mona Liza\"nı kim çəkib?", options: ["Rafael", "Da Vinçi", "Mikelancelo", "Bottiçelli"], correctAnswer: 1, category: "İncəsənət", difficulty: "easy" },
  { id: 152, question: "Hansı rəssam qulağını kəsdi?", options: ["Qoqen", "Van Qoq", "Sezan", "Mone"], correctAnswer: 1, category: "İncəsənət", difficulty: "easy" },
  
  // ========== ƏDƏBİYYAT ==========
  { id: 201, question: "\"Hamlet\"i kim yazıb?", options: ["Molyer", "Şekspir", "Rasin", "Kornel"], correctAnswer: 1, category: "Ədəbiyyat", difficulty: "easy" },
  { id: 202, question: "\"Don Kixot\"un müəllifi kimdir?", options: ["Lope de Veqa", "Servantes", "Kalderon", "Tirso"], correctAnswer: 1, category: "Ədəbiyyat", difficulty: "easy" },
  
  // ========== MUSİQİ ==========
  { id: 251, question: "\"Beşinci simfoniya\"nı kim bəstələyib?", options: ["Motsart", "Bethoven", "Bax", "Şopen"], correctAnswer: 1, category: "Musiqi", difficulty: "easy" },
  { id: 252, question: "Hansı alət simli alətdir?", options: ["Fleyta", "Skripka", "Truba", "Saksofon"], correctAnswer: 1, category: "Musiqi", difficulty: "easy" },
  
  // ========== KİNO ==========
  { id: 301, question: "\"Titanik\" filmini kim çəkib?", options: ["Spilberq", "Kameron", "Nolan", "Skorseze"], correctAnswer: 1, category: "Kino", difficulty: "easy" },
  { id: 302, question: "Hansı aktyor \"Terminatorda\" oynayıb?", options: ["Stallone", "Şvartseneqqer", "Van Damm", "Norris"], correctAnswer: 1, category: "Kino", difficulty: "easy" },
  
  // ========== İDMAN ==========
  { id: 351, question: "Futbol komandasında neçə oyunçu olur?", options: ["9", "10", "11", "12"], correctAnswer: 2, category: "İdman", difficulty: "easy" },
  { id: 352, question: "Olimpiya Oyunları neçə ildən bir keçirilir?", options: ["2", "3", "4", "5"], correctAnswer: 2, category: "İdman", difficulty: "easy" },
];

export const categoriesAz = [
  "Tarix",
  "Coğrafiya",
  "Elm",
  "İncəsənət",
  "Ədəbiyyat",
  "Musiqi",
  "Kino",
  "İdman"
];
