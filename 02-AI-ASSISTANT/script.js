const chatBox = document.querySelector(".chat-box");
const input = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");



// =========================
// SUARA
// =========================

const sendSound = new Audio("sounds/send.mp3");
const receiveSound = new Audio("sounds/recieve.mp3");



// =========================
// KONFIGURASI
// =========================

const MINIMUM_SCORE = 2;
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOOBC5UeK2redwAw3dMahG-FR4NodxJLMoDQT0p3yOQvvQ969gsLhRtrnifrvGOdGQ/exec";

// Menyimpan topik percakapan terakhir
let lastDetectedTopic = "";



// =========================
// SCROLL CHAT KE BAWAH
// =========================

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}
// =========================
// TOMBOL SCROLL KE BAWAH
// =========================

const scrollBottomButton =
    document.querySelector(
        "#scrollBottomButton"
    );

if (scrollBottomButton) {

    chatBox.addEventListener(
        "scroll",
        function () {

            const isNearBottom =
                chatBox.scrollHeight -
                chatBox.scrollTop -
                chatBox.clientHeight <
                100;

            if (isNearBottom) {

                scrollBottomButton.classList.remove(
                    "show"
                );

            } else {

                scrollBottomButton.classList.add(
                    "show"
                );

            }

        }
    );


    scrollBottomButton.addEventListener(
        "click",
        function () {

            scrollToBottom();

        }
    );

}


// =========================
// NORMALISASI TEKS
// =========================

function normalizeText(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/[?!.,;:()[\]{}]/g, " ")
        .replace(/\s+/g, " ");

}



// =========================
// MENGECEK KATA
// =========================

function containsAny(text, words) {

    for (let i = 0; i < words.length; i++) {

        if (text.includes(words[i])) {
            return true;
        }

    }

    return false;
}



// =========================
// DAFTAR VARIASI TOPIK
// =========================

const topicAliases = {

    office: [
        "microsoft office",
        "ms office",
        "office",
        "word",
        "excel",
        "powerpoint",
        "ppt",
        "mengetik",
        "mengetik cepat",
        "surat",
        "proposal",
        "mail merge",
        "aplikasi perkantoran",
        "perkantoran"
    ],

    design: [
        "desain",
        "design",
        "desain grafis",
        "graphic design",
        "photoshop",
        "corel",
        "corel draw",
        "coreldraw",
        "designer",
        "animator",
        "animasi",
        "content creator",
        "editing gambar",
        "edit gambar",
        "percetakan"
    ],

    website: [
        "website",
        "web",
        "bikin web",
        "buat web",
        "buat website",
        "bikin website",
        "belajar web",
        "belajar website",
        "ngoding",
        "coding",
        "pemrograman",
        "programming",
        "html",
        "php",
        "javascript",
        "js",
        "css",
        "sql",
        "bootstrap",
        "laravel",
        "codeigniter",
        "wordpress",
        "android",
        "aplikasi android"
    ],

    price: [
        "biaya",
        "harga",
        "tarif",
        "bayar",
        "pembayaran",
        "berapa harganya",
        "berapa biayanya",
        "harganya berapa",
        "biayanya berapa",
        "mahal",
        "murah"
    ],

    schedule: [
        "jadwal",
        "kapan belajar",
        "kapan kelas",
        "waktu belajar",
        "jam belajar",
        "jadwal kelas",
        "jadwal kursus",
        "hari belajar",
        "jadwalnya"
    ],

    duration: [
        "berapa lama",
        "durasi",
        "lama belajar",
        "lama kursus",
        "berapa pertemuan",
        "berapa kali pertemuan",
        "berapa menit",
        "90 menit",
        "jumlah pertemuan"
    ],

    registration: [
        "daftar",
        "mendaftar",
        "pendaftaran",
        "registrasi",
        "register",
        "cara daftar",
        "mau daftar",
        "ingin daftar",
        "ikut kursus",
        "menjadi peserta"
    ],

    requirement: [
        "syarat",
        "persyaratan",
        "dokumen",
        "ktp",
        "pas foto",
        "foto 3x4",
        "berkas daftar",
        "dibutuhkan untuk daftar",
        "yang harus dibawa"
    ],

    facility: [
        "fasilitas",
        "benefit",
        "dapat apa",
        "mendapat apa",
        "yang didapat",
        "disediakan",
        "perlengkapan",
        "modul",
        "sertifikat",
        "wifi",
        "komputer"
    ],

    payment: [
        "cicilan",
        "dicicil",
        "bayar cicil",
        "angsuran",
        "bayar lunas",
        "pelunasan",
        "pembayaran kursus"
    ],

    location: [
        "lokasi",
        "alamat",
        "di mana",
        "dimana",
        "tempat",
        "tempat kursus",
        "lokasi kursus",
        "alamat kursus",
        "binar di mana",
        "binar dimana",
        "tegal"
    ],

    contact: [
        "kontak",
        "hubungi",
        "nomor",
        "nomor wa",
        "nomor whatsapp",
        "whatsapp",
        "wa",
        "admin",
        "email",
        "alamat email"
    ],

    instagram: [
        "instagram",
        "ig",
        "media sosial",
        "sosial media"
    ],

    general: [
        "apa itu binar",
        "tentang binar",
        "binar komputer"
    ]

};



// =========================
// ALIAS INTENT
// =========================

const intentAliases = {

    price: [
        "biaya",
        "harga",
        "tarif",
        "berapa harga",
        "berapa biaya",
        "harganya berapa",
        "biayanya berapa",
        "bayar berapa",
        "mahal",
        "murah"
    ],

    duration: [
        "berapa lama",
        "durasi",
        "lama",
        "berapa pertemuan",
        "berapa kali",
        "berapa menit",
        "berapa jam"
    ],

    schedule: [
        "jadwal",
        "kapan",
        "hari apa",
        "jam berapa",
        "waktu belajar",
        "waktu kelas"
    ],

    registration: [
        "daftar",
        "mendaftar",
        "pendaftaran",
        "registrasi",
        "register",
        "cara ikut",
        "cara masuk kursus"
    ],

    requirement: [
        "syarat",
        "persyaratan",
        "dokumen",
        "ktp",
        "pas foto",
        "foto",
        "berkas",
        "yang harus dibawa"
    ],

    facility: [
        "fasilitas",
        "dapat apa",
        "mendapat apa",
        "benefit",
        "disediakan",
        "apa saja yang didapat"
    ],

    payment: [
        "cicilan",
        "dicicil",
        "angsuran",
        "bayar lunas",
        "pelunasan"
    ],

    location: [
        "lokasi",
        "alamat",
        "di mana",
        "dimana",
        "tempatnya",
        "tempat kursus"
    ],

    contact: [
        "kontak",
        "hubungi",
        "nomor",
        "nomor wa",
        "whatsapp",
        "wa",
        "email",
        "admin"
    ],

    instagram: [
        "instagram",
        "ig",
        "media sosial",
        "sosial media"
    ],

    courseInfo: [
        "apa saja",
        "materi",
        "belajar apa",
        "mempelajari apa",
        "isi kursus",
        "kursus apa",
        "program apa",
        "ada kursus"
    ],
        beginner: [
        "pemula",
        "masih pemula",
        "baru belajar",
        "baru mulai",
        "belajar dari nol",
        "dari nol",
        "belum bisa komputer",
        "belum bisa",
        "tidak bisa komputer",
        "nggak bisa komputer",
        "belajar komputer",
        "mau belajar komputer",
        "ingin belajar komputer",
        "mulai belajar komputer",
        "cocok untuk saya",
        "cocok buat saya",
        "cocok untuk pemula",
        "cocok buat pemula"
    ]

};



// =========================
// MENENTUKAN TOPIK
// =========================

function detectTopics(text) {

    const detectedTopics = [];

    for (const topic in topicAliases) {

        if (
            containsAny(
                text,
                topicAliases[topic]
            )
        ) {

            detectedTopics.push(topic);

        }

    }

    return detectedTopics;
}



// =========================
// MENENTUKAN INTENT
// =========================

function detectPrimaryIntent(text) {

    const intentPriority = [
    "payment",
    "price",
    "requirement",
    "registration",
    "location",
    "schedule",
    "duration",
    "facility",
    "contact",
    "instagram",
    "beginner",
    "courseInfo"
];

    for (let i = 0; i < intentPriority.length; i++) {

        const intent = intentPriority[i];

        if (
            containsAny(
                text,
                intentAliases[intent]
            )
        ) {

            return intent;

        }

    }

    return null;
}



// =========================
// MENCARI KNOWLEDGE BERDASARKAN TOPIK
// =========================

function findKnowledgeItemByTopic(topic) {

    const topicMap = {

        general: [
            "apa itu binar",
            "tentang binar",
            "binar komputer"
        ],

        office: [
            "microsoft office",
            "kursus office",
            "belajar office",
            "materi office"
        ],

        design: [
            "desain grafis",
            "kursus desain",
            "belajar desain",
            "photoshop",
            "corel draw"
        ],

        website: [
            "kursus website",
            "belajar website",
            "html",
            "php",
            "javascript"
        ],

        duration: [
            "berapa lama kursus",
            "durasi kursus",
            "lama kursus",
            "berapa menit pertemuan"
        ],

        schedule: [
            "jadwal kursus",
            "jadwal kelas",
            "jadwal belajar",
            "jadwalnya fleksibel"
        ],

        facility: [
            "fasilitas",
            "fasilitas belajar",
            "benefit kursus"
        ],

        payment: [
            "bisa dicicil",
            "bisa cicil",
            "cicilan",
            "pembayaran cicilan"
        ],

        price: [
            "berapa biaya kursus",
            "berapa harga kursus",
            "biaya kursus",
            "harga kursus"
        ],

        registration: [
            "cara daftar",
            "cara mendaftar",
            "ingin daftar",
            "daftar kursus"
        ],

        location: [
            "lokasi",
            "alamat",
            "lokasi binar",
            "alamat binar"
        ],

        requirement: [
            "syarat daftar",
            "persyaratan daftar",
            "syarat pendaftaran",
            "ktp untuk daftar"
        ],

        contact: [
            "whatsapp binar",
            "wa binar",
            "nomor whatsapp",
            "kontak binar"
        ],

        instagram: [
            "instagram binar",
            "ig binar",
            "instagram",
            "media sosial binar"
        ]

    };



    if (!topicMap[topic]) {
        return null;
    }



    for (let i = 0; i < knowledgeBase.length; i++) {

        const item = knowledgeBase[i];

        for (let j = 0; j < topicMap[topic].length; j++) {

            if (
                item.keywords.includes(
                    topicMap[topic][j]
                )
            ) {

                return item;

            }

        }

    }



    return null;
}



// =========================
// MENCARI KNOWLEDGE DENGAN SCORING
// =========================

function searchKnowledgeBase(text, preferredTopic = null) {

    let bestItem = null;
    let highestScore = 0;



    for (let i = 0; i < knowledgeBase.length; i++) {

        const item = knowledgeBase[i];

        let score = 0;



        for (let j = 0; j < item.keywords.length; j++) {

            const keyword =
                normalizeText(item.keywords[j]);



            if (text.includes(keyword)) {

                if (keyword.length >= 15) {

                    score += 7;

                } else if (keyword.length >= 10) {

                    score += 5;

                } else if (keyword.length >= 6) {

                    score += 3;

                } else {

                    score += 2;

                }

            }

        }



        // Bonus apabila item sesuai dengan topik terakhir
        if (
            preferredTopic &&
            knowledgeItemMatchesTopic(
                item,
                preferredTopic
            )
        ) {

            score += 2;

        }



        if (score > highestScore) {

            highestScore = score;
            bestItem = item;

        }

    }



    return {
        item: bestItem,
        score: highestScore
    };
}



// =========================
// CEK ITEM SESUAI TOPIK
// =========================

function knowledgeItemMatchesTopic(item, topic) {

    if (!topicAliases[topic]) {
        return false;
    }



    for (let i = 0; i < topicAliases[topic].length; i++) {

        const alias =
            topicAliases[topic][i];



        if (
            item.keywords.some(
                keyword =>
                    normalizeText(keyword)
                        .includes(
                            normalizeText(alias)
                        ) ||
                    normalizeText(alias)
                        .includes(
                            normalizeText(keyword)
                        )
            )
        ) {

            return true;

        }

    }



    return false;
}



// =========================
// SAPAAN
// =========================

function isGreeting(text) {

    const greetings = [
        "halo",
        "hai",
        "hi",
        "hallo",
        "halooo",
        "hola",
        "selamat pagi",
        "selamat siang",
        "selamat sore",
        "selamat malam",
        "assalamualaikum",
        "wassalamualaikum",
        "salam"
    ];



    for (let i = 0; i < greetings.length; i++) {

        if (
            text === greetings[i] ||
            text.startsWith(
                greetings[i] + " "
            )
        ) {

            return true;

        }

    }



    return false;
}



// =========================
// MENENTUKAN TOPIK KURSUS
// =========================

function detectCourseTopic(text) {

    if (
        containsAny(
            text,
            topicAliases.office
        )
    ) {

        return "office";

    }



    if (
        containsAny(
            text,
            topicAliases.design
        )
    ) {

        return "design";

    }



    if (
        containsAny(
            text,
            topicAliases.website
        )
    ) {

        return "website";

    }



    return null;
}

// =========================
// MEMBUAT JAWABAN LEBIH NATURAL
// =========================

function makeNaturalResponse(answer, topic, text) {
        if (topic === "beginner") {

    return (
        "Tentu 😊 Kalau kamu masih baru belajar komputer, " +
        "kamu bisa mulai dari Microsoft Office Dasar. " +
        "Di program ini kamu belajar Microsoft Office dari dasar, " +
        "jadi cocok untuk yang masih pemula. " +
        "Kalau tertarik, kamu juga bisa langsung daftar melalui " +
        "formulir pendaftaran Binar Komputer ya."
    );
}

    // =========================
    // PENDAFTARAN
    // =========================
    if (topic === "registration") {

        return (
            "Bisa 😊 Kalau kamu mau mendaftar kursus di Binar Komputer, " +
            "kamu bisa mengisi formulir pendaftaran online berikut:\n\n" +
            "https://forms.gle/65VmKs6fR9p9pYqF8"
        );

    }



    // =========================
    // SYARAT PENDAFTARAN
    // =========================
    if (topic === "requirement") {

        return (
            "Untuk pendaftarannya, ada beberapa persyaratan yang perlu disiapkan, " +
            "yaitu fotokopi KTP, 2 lembar pas foto ukuran 3×4, mengisi formulir pendaftaran, " +
            "dan membayar biaya kursus yang diikuti."
        );

    }



    // =========================
    // BIAYA
    // =========================
    if (topic === "price") {

        // Jika user menyebut program tertentu
        if (
            containsAny(text, topicAliases.office) ||
            containsAny(text, topicAliases.design) ||
            containsAny(text, topicAliases.website)
        ) {

            return (
                "Untuk nominal biaya kursusnya, kamu bisa langsung menghubungi " +
                "Binar Komputer melalui WhatsApp di +62 856-0173-0788 ya 😊"
            );

        }

        return (
            "Untuk mengetahui nominal biaya kursus, kamu bisa langsung menghubungi " +
            "Binar Komputer melalui WhatsApp di +62 856-0173-0788 ya 😊"
        );

    }



    // =========================
    // LOKASI
    // =========================
    if (topic === "location") {

        return (
            "Binar Komputer berada di:\n\n" +
            "📍 Jl. Badak IV No.6, Sibata, Mejasem Bar., " +
            "Kec. Kramat, Kabupaten Tegal, Jawa Tengah 52181, Indonesia."
        );

    }



    // =========================
    // JADWAL
    // =========================
    if (topic === "schedule") {

        return (
            "Untuk jadwal belajar, Binar Komputer menerapkan jadwal yang fleksibel " +
            "dan dapat disesuaikan dengan aktivitas peserta."
        );

    }



    // =========================
    // DURASI
    // =========================
    if (topic === "duration") {

        return (
            "Untuk durasinya, setiap pertemuan berlangsung selama 90 menit. " +
            "Khusus Microsoft Office Dasar ada 10–20 pertemuan, sedangkan " +
            "Full Microsoft Office berlangsung selama 24 pertemuan."
        );

    }



    // =========================
    // FASILITAS
    // =========================
    if (topic === "facility") {

        return (
            "Selama mengikuti kursus, kamu mendapatkan fasilitas seperti tempat belajar, " +
            "meja dan kursi, PC atau komputer, WiFi, minuman, modul, sertifikat, " +
            "serta konsultasi materi."
        );

    }



    // =========================
    // PEMBAYARAN
    // =========================
    if (topic === "payment") {

        return (
            "Untuk pembayaran, kursus dengan durasi kurang dari satu bulan " +
            "wajib dibayar lunas. Sementara itu, Paket Privat dengan perkiraan " +
            "durasi belajar 2–3 bulan dapat dibayar secara cicilan."
        );

    }



    // =========================
    // KONTAK
    // =========================
    if (topic === "contact") {

        return (
            "Kalau kamu ingin menghubungi Binar Komputer, bisa melalui WhatsApp " +
            "di +62 856-0173-0788 atau melalui email binar.komputer@gmail.com."
        );

    }



    // =========================
    // INSTAGRAM
    // =========================
    if (topic === "instagram") {

        return (
            "Kamu bisa menemukan Binar Komputer di Instagram @binarkomputer."
        );

    }



    // =========================
    // DEFAULT
    // =========================

    return answer;

}


// =========================
// MENDAPATKAN JAWABAN AI
// =========================

function getAIResponse(userMessage) {

    const text =
        normalizeText(userMessage);



    // =========================
    // SAPAAN
    // =========================

    if (isGreeting(text)) {

        lastDetectedTopic = "";

        return (
            "Halo! 👋 Selamat datang di Binar Komputer Assistant. " +
            "Ada yang bisa saya bantu mengenai program kursus, " +
            "jadwal, pendaftaran, atau informasi lainnya?"
        );

    }



    // =========================
    // DETEKSI TOPIK
    // =========================

    const detectedTopics =
        detectTopics(text);



    const courseTopic =
        detectCourseTopic(text);



    // =========================
    // DETEKSI INTENT
    // =========================

    const primaryIntent =
        detectPrimaryIntent(text);



    // =========================
    // JIKA ADA INTENT + TOPIK KURSUS
    // =========================

    if (
        primaryIntent &&
        courseTopic
    ) {

        // Simpan topik kursus
        lastDetectedTopic =
            courseTopic;



        // Durasi
        if (
            primaryIntent === "duration"
        ) {

            const result =
                searchKnowledgeBase(
                    text,
                    courseTopic
                );



            if (
                result.item &&
                result.score >= MINIMUM_SCORE
            ) {

                return makeNaturalResponse(
                    result.item.answer,
                    "duration",
                    text
                );

            }



            // Kalau informasi durasi spesifik belum ada
            if (
                courseTopic === "office"
            ) {

                return (
                    "Untuk Microsoft Office, " +
                    "Kursus Dasar memiliki 10–20 pertemuan, " +
                    "sedangkan Full Microsoft Office memiliki " +
                    "24 pertemuan. Setiap pertemuan berlangsung " +
                    "selama 90 menit."
                );

            }

        }



        // Biaya
        if (
            primaryIntent === "price"
        ) {

            return makeNaturalResponse(
                "",
                "price",
                text
            );

        }

    }



   // =========================
// JIKA ADA INTENT SPESIFIK
// =========================

if (primaryIntent) {

    if (primaryIntent === "beginner") {
        lastDetectedTopic = "office";

        return makeNaturalResponse(
            "",
            "beginner",
            text
        );
    }

    const specificItem =
        findKnowledgeItemByTopic(
            primaryIntent
        );

    if (specificItem) {

        lastDetectedTopic =
            courseTopic || primaryIntent;

        return makeNaturalResponse(
            specificItem.answer,
            primaryIntent,
            text
        );
    }
}   // ← INI YANG KURANG

// =========================
// JIKA HANYA MENYEBUT TOPIK
// =========================

if (
    detectedTopics.length > 0
) {

    // Jika ada topik kursus
    if (courseTopic) {

        const topicItem =
            findKnowledgeItemByTopic(
                courseTopic
            );

        if (topicItem) {

            lastDetectedTopic =
                courseTopic;

            return makeNaturalResponse(
                topicItem.answer,
                courseTopic,
                text
            );
        }
    }



        // Cari menggunakan scoring
        const result =
            searchKnowledgeBase(
                text,
                lastDetectedTopic
            );



        if (
            result.item &&
            result.score >= MINIMUM_SCORE
        ) {

            return makeNaturalResponse(
                result.item.answer,
                "",
                text
            );

        }

    }



    // =========================
    // PERTANYAAN LANJUTAN
    // =========================

    if (
        lastDetectedTopic
    ) {

        const contextualText =
            text + " " +
            topicAliases[lastDetectedTopic].join(" ");



        const contextualResult =
            searchKnowledgeBase(
                contextualText,
                lastDetectedTopic
            );



        if (
            contextualResult.item &&
            contextualResult.score >= MINIMUM_SCORE
        ) {

            return makeNaturalResponse(
                contextualResult.item.answer,
                "",
                text
            );

        }

    }



    // =========================
    // PENCARIAN TERAKHIR
    // =========================

    const result =
        searchKnowledgeBase(
            text,
            lastDetectedTopic
        );



    if (
        result.item &&
        result.score >= MINIMUM_SCORE
    ) {

        return makeNaturalResponse(
            result.item.answer,
            "",
            text
        );

    }



    // =========================
    // JAWABAN DEFAULT
    // =========================

    return (
        "Maaf, saya belum menemukan informasi yang sesuai " +
        "dalam Knowledge Base Binar Komputer. " +
        "Jika pertanyaannya berkaitan dengan kursus, " +
        "pendaftaran, biaya, fasilitas, jadwal, atau informasi " +
        "Binar Komputer lainnya, silakan coba gunakan kata kunci " +
        "yang lebih spesifik atau hubungi admin."
    );

}



// =========================
// FORMAT JAWABAN
// =========================

function formatAIResponse(answer) {

    return answer
        .replace(/\n/g, "<br>")
        .replace(
            /(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );

}



// =========================
// WAKTU
// =========================

function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}

// =========================
// SIMPAN RIWAYAT KE GOOGLE SHEETS
// =========================

function saveChatToGoogleSheet(
    question,
    answer,
    status = "Terjawab"
) {

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
            question: question,
            answer: answer,
            status: status
        })
    }).catch(function (error) {

        console.error(
            "Gagal menyimpan riwayat:",
            error
        );

    });

}

// =========================
// TOMBOL COPY
// =========================

function createCopyButton(answer) {

    const button =
        document.createElement("button");



    button.classList.add(
        "copy-button"
    );

    button.textContent =
        "📋 Copy";



    button.addEventListener(
        "click",
        async function () {

            try {

                await navigator.clipboard.writeText(
                    answer
                );



                button.textContent =
                    "✓ Copied!";



                setTimeout(
                    function () {

                        button.textContent =
                            "📋 Copy";

                    },
                    1500
                );



            } catch (error) {

                button.textContent =
                    "Gagal copy";

            }

        }
    );



    return button;
}



// =========================
// TOMBOL HUBUNGI ADMIN
// =========================

function createAdminButton() {

    const button =
        document.createElement("button");



    button.classList.add(
        "admin-button"
    );

    button.textContent =
        "💬 Hubungi Admin";



    button.addEventListener(
        "click",
        function () {

            const phoneNumber =
                "6285601730788";



            const message =
                "Halo Binar Komputer, saya ingin bertanya mengenai kursus.";



            const whatsappURL =
                "https://wa.me/" +
                phoneNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );



            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );



    return button;
}



// =========================
// PERTANYAAN OTOMATIS
// =========================

function getSuggestedQuestions(
    userMessage
) {

    const text =
        normalizeText(
            userMessage
        );



    if (
        containsAny(
            text,
            topicAliases.office
        )
    ) {

        return [
            "Berapa lama kursus Microsoft Office?",
            "Apa saja materi Microsoft Office?",
            "Berapa biaya kursus?"
        ];

    }



    if (
        containsAny(
            text,
            topicAliases.design
        )
    ) {

        return [
            "Apa saja materi kursus Desain?",
            "Berapa biaya kursus?",
            "Bagaimana cara daftar?"
        ];

    }



    if (
        containsAny(
            text,
            topicAliases.website
        )
    ) {

        return [
            "Apa saja materi kursus Website?",
            "Berapa biaya kursus?",
            "Bagaimana cara daftar?"
        ];

    }



    if (
        containsAny(
            text,
            topicAliases.price
        )
    ) {

        return [
            "Bisa bayar secara cicilan?",
            "Apa saja fasilitas kursus?",
            "Bagaimana cara daftar?"
        ];

    }



    if (
        containsAny(
            text,
            topicAliases.registration
        )
    ) {

        return [
            "Apa syarat pendaftaran?",
            "Berapa biaya kursus?",
            "Di mana lokasi Binar Komputer?"
        ];

    }



    if (
        containsAny(
            text,
            topicAliases.location
        )
    ) {

        return [
            "Apa saja kursus yang tersedia?",
            "Berapa biaya kursus?",
            "Bagaimana cara daftar?"
        ];

    }



    return [
        "Apa saja kursus yang tersedia?",
        "Berapa biaya kursus?",
        "Bagaimana cara daftar?"
    ];

}



// =========================
// MEMBUAT SARAN PERTANYAAN
// =========================

function createSuggestions(
    userMessage
) {

    const suggestions =
        getSuggestedQuestions(
            userMessage
        );



    const container =
        document.createElement(
            "div"
        );



    container.classList.add(
        "suggestions"
    );



    const title =
        document.createElement(
            "div"
        );



    title.classList.add(
        "suggestions-title"
    );



    title.textContent =
        "💡 Mungkin kamu juga ingin tahu:";



    container.appendChild(
        title
    );



    suggestions.forEach(
        function (question) {

            const button =
                document.createElement(
                    "button"
                );



            button.classList.add(
                "suggestion-button"
            );



            button.textContent =
                question;



            button.addEventListener(
                "click",
                function () {

                    sendMessage(
                        question
                    );

                }
            );



            container.appendChild(
                button
            );

        }
    );



    return container;
}



// =========================
// TYPING INDICATOR
// =========================

function createTypingIndicator() {

    const typingBubble =
        document.createElement(
            "div"
        );



    typingBubble.classList.add(
        "message",
        "ai-message",
        "typing-bubble"
    );



    typingBubble.innerHTML = `
        <span class="typing-text">
            Binar Assistant sedang mengetik
        </span>

        <span class="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </span>
    `;



    return typingBubble;
}



// =========================
// MENGIRIM PESAN
// =========================

function sendMessage(
    message = input.value
) {

    const userMessage =
        message.trim();



    if (
        userMessage === ""
    ) {

        return;

    }

    // =========================
    // SUARA SEND
    // =========================

    sendSound.currentTime = 0;

    sendSound.play().catch(
        () => {}
    );

// =========================
// BUBBLE USER
// =========================

const userBubble =
    document.createElement(
        "div"
    );



userBubble.classList.add(
    "message",
    "user-message"
);



userBubble.textContent =
    userMessage;



const userTime =
    document.createElement(
        "div"
    );



userTime.classList.add(
    "message-time"
);



userTime.textContent =
    getCurrentTime();



userBubble.appendChild(
    userTime
);



chatBox.appendChild(
    userBubble
);

saveUserHistory(
    "user",
    userMessage
);

scrollToBottom();

input.value = "";
    
    // =========================
    // TYPING INDICATOR
    // =========================

    setTimeout(
        function () {

            const typingBubble =
                createTypingIndicator();



            chatBox.appendChild(
                typingBubble
            );



            scrollToBottom();



            // =========================
            // AI MENJAWAB
            // =========================

            setTimeout(
                function () {

                    typingBubble.remove();



                    const answer =
                        getAIResponse(
                            userMessage
                        );

                    saveChatToGoogleSheet(
    userMessage,
    answer,
    "Terjawab"
);

                    // =========================
                    // SUARA RECEIVE
                    // =========================

                    receiveSound.currentTime = 0;

                    receiveSound.play().catch(
                        () => {}
                    );



                    // =========================
                    // BUBBLE AI
                    // =========================

                    const aiBubble =
                        document.createElement(
                            "div"
                        );



                    aiBubble.classList.add(
                        "message",
                        "ai-message"
                    );



                    // =========================
                    // JAWABAN
                    // =========================

                    const answerText =
                        document.createElement(
                            "div"
                        );



                    answerText.innerHTML =
                        formatAIResponse(
                            answer
                        );



                    aiBubble.appendChild(
                        answerText
                    );



                    // =========================
                    // TOMBOL AKSI
                    // =========================

                    const actionArea =
                        document.createElement(
                            "div"
                        );



                    actionArea.classList.add(
                        "message-actions"
                    );



                    actionArea.appendChild(
                        createCopyButton(
                            answer
                        )
                    );



                    actionArea.appendChild(
                        createAdminButton()
                    );



                    aiBubble.appendChild(
                        actionArea
                    );



                    // =========================
                    // PERTANYAAN OTOMATIS
                    // =========================

                    aiBubble.appendChild(
                        createSuggestions(
                            userMessage
                        )
                    );



                    // =========================
                    // TIMESTAMP
                    // =========================

                    const aiTime =
                        document.createElement(
                            "div"
                        );



                    aiTime.classList.add(
                        "message-time"
                    );



                    aiTime.textContent =
                        getCurrentTime();



                    aiBubble.appendChild(
                        aiTime
                    );



                    chatBox.appendChild(
                        aiBubble
                    );

                    saveUserHistory(
                    "ai",
                    answer
                    );


                    scrollToBottom();



                },
                1000
            );



        },
        500
    );

}



// =========================
// DARK MODE
// =========================

const darkModeButton =
    document.querySelector(
        "#darkModeButton"
    );



if (darkModeButton) {

    darkModeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );



            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                darkModeButton.textContent =
                    "☀️";



                darkModeButton.title =
                    "Light Mode";

            } else {

                darkModeButton.textContent =
                    "🌙";



                darkModeButton.title =
                    "Dark Mode";

            }

        }
    );

}



// =========================
// CLEAR CHAT
// =========================

const clearChatButton =
    document.querySelector(
        "#clearChatButton"
    );



if (clearChatButton) {

    clearChatButton.addEventListener(
        "click",
        function () {

            const confirmClear =
                confirm(
                    "Yakin ingin menghapus semua percakapan?"
                );



            if (
                !confirmClear
            ) {

                return;

            }



            // Reset konteks
            lastDetectedTopic =
                "";



            chatBox.innerHTML = `
                <div class="message ai-message">
                    Halo! 👋 Selamat datang di Binar Komputer Assistant.
                    Ada yang bisa saya bantu?
                </div>

                <div class="quick-replies">

                    <button>
                        📚 Info Kursus
                    </button>

                    <button>
                        📅 Jadwal Kelas
                    </button>

                    <button>
                        📍 Lokasi
                    </button>

                </div>
            `;



            // Aktifkan kembali quick reply
            const newQuickReplies =
                chatBox.querySelectorAll(
                    ".quick-replies button"
                );



            newQuickReplies.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            sendMessage(
                                button.textContent
                            );

                        }
                    );

                }
            );



            input.value = "";

            input.focus();

            scrollToBottom();

        }
    );

}



// =========================
// TOMBOL KIRIM
// =========================

sendButton.addEventListener(
    "click",
    function () {

        sendMessage();

    }
);



// =========================
// ENTER UNTUK KIRIM
// =========================

input.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);



// =========================
// QUICK REPLY
// =========================

const quickReplies =
    document.querySelectorAll(
        ".quick-replies button"
    );



quickReplies.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                sendMessage(
                    button.textContent
                );

            }
        );

    }
);
// =========================
// MENU DROPDOWN
// =========================

const menuButton = document.querySelector("#menuButton");
const menuDropdown = document.querySelector("#menuDropdown");

if (menuButton && menuDropdown) {

    menuButton.addEventListener("click", function (event) {

        event.stopPropagation();

        menuDropdown.classList.toggle("show");

    });


    document.addEventListener("click", function (event) {

        if (
            !menuDropdown.contains(event.target) &&
            event.target !== menuButton
        ) {

            menuDropdown.classList.remove("show");

        }

    });

}
// =========================
// RIWAYAT CHAT USER
// =========================

const CHAT_HISTORY_KEY = "binarAIChatHistory";

const chatHistoryButton = document.querySelector("#chatHistoryButton");
const historyModal = document.querySelector("#historyModal");
const closeHistoryButton = document.querySelector("#closeHistoryButton");
const historyList = document.querySelector("#historyList");


function saveUserHistory(role, text) {

    try {

        const history = JSON.parse(
            localStorage.getItem(CHAT_HISTORY_KEY) || "[]"
        );

        history.push({
            role: role,
            text: text,
            time: new Date().toLocaleString("id-ID")
        });

        // Simpan maksimal 100 pesan
        const limitedHistory = history.slice(-100);

        localStorage.setItem(
            CHAT_HISTORY_KEY,
            JSON.stringify(limitedHistory)
        );

    } catch (error) {

        console.error(
            "Gagal menyimpan riwayat chat:",
            error
        );

    }

}


function showChatHistory() {

    if (!historyList) return;

    historyList.innerHTML = "";

    let history = [];

    try {

        history = JSON.parse(
            localStorage.getItem(CHAT_HISTORY_KEY) || "[]"
        );

    } catch (error) {

        history = [];

    }


    if (history.length === 0) {

        historyList.innerHTML = `
            <p class="empty-history">
                Belum ada riwayat chat.
            </p>
        `;

        return;

    }


    history.forEach(function(item) {

        const historyItem = document.createElement("div");

        historyItem.className =
            "history-item " +
            (item.role === "user" ? "user" : "ai");


        const roleText =
            item.role === "user"
                ? "Kamu"
                : "Binar Komputer Assistant";


        historyItem.innerHTML = `
            <div class="history-role">
                ${roleText}
            </div>

            <div>
                ${item.text}
            </div>

            <div class="history-time">
                ${item.time}
            </div>
        `;


        historyList.appendChild(historyItem);

    });

}


if (chatHistoryButton && historyModal) {

    chatHistoryButton.addEventListener(
        "click",
        function() {

            showChatHistory();

            historyModal.classList.add("show");

            if (menuDropdown) {
                menuDropdown.classList.remove("show");
            }

        }
    );

}


if (closeHistoryButton && historyModal) {

    closeHistoryButton.addEventListener(
        "click",
        function() {

            historyModal.classList.remove("show");

        }
    );

}


if (historyModal) {

    historyModal.addEventListener(
        "click",
        function(event) {

            if (event.target === historyModal) {

                historyModal.classList.remove("show");

            }

        }
    );

}

// =========================
// HAPUS RIWAYAT CHAT USER
// =========================

const deleteHistoryButton =
    document.querySelector(
        "#deleteHistoryButton"
    );


if (deleteHistoryButton) {

    deleteHistoryButton.addEventListener(
        "click",
        function () {

            const confirmDelete =
                confirm(
                    "Yakin ingin menghapus semua riwayat chat?"
                );


            if (!confirmDelete) {
                return;
            }


            localStorage.removeItem(
                CHAT_HISTORY_KEY
            );


            if (historyList) {

                historyList.innerHTML = `
                    <p class="empty-history">
                        Belum ada riwayat chat.
                    </p>
                `;

            }


            if (menuDropdown) {

                menuDropdown.classList.remove(
                    "show"
                );

            }


            alert(
                "Riwayat chat berhasil dihapus."
            );

        }
    );

}
// =========================
// TOMBOL KEMBALI KE WEBSITE
// =========================

const backHomeButton =
    document.querySelector("#backHomeButton");

if (backHomeButton) {

    backHomeButton.addEventListener(
        "click",
        function (event) {

            if (
                window.location.pathname.includes(
                    "/02-AI-ASSISTANT/"
                )
            ) {

                event.preventDefault();

                window.location.href =
                    "../01-WEBSITE/index.html";
            }

        }
    );

}