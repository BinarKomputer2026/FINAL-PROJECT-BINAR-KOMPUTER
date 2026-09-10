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

// Nilai minimum agar sebuah topik dianggap cocok
const MINIMUM_SCORE = 2;

// Menyimpan topik percakapan terakhir
let lastDetectedTopic = "";


// =========================
// SCROLL CHAT KE BAWAH
// =========================

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
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
// MENGHITUNG KEMIRIPAN KATA
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
// MENENTUKAN TOPIK
// =========================

function detectTopics(text) {

    const detectedTopics = [];

    for (const topic in topicAliases) {

        const aliases = topicAliases[topic];

        if (containsAny(text, aliases)) {
            detectedTopics.push(topic);
        }

    }

    return detectedTopics;
}


// =========================
// MENENTUKAN INTENT UTAMA
// =========================

function detectPrimaryIntent(text) {

    // Prioritas pertanyaan biaya
    if (containsAny(text, topicAliases.price)) {
        return "price";
    }


    // Prioritas pertanyaan cicilan/pembayaran
    if (containsAny(text, topicAliases.payment)) {
        return "payment";
    }


    // Prioritas pertanyaan syarat
    if (containsAny(text, topicAliases.requirement)) {
        return "requirement";
    }


    // Prioritas pendaftaran
    if (containsAny(text, topicAliases.registration)) {
        return "registration";
    }


    // Prioritas lokasi
    if (containsAny(text, topicAliases.location)) {
        return "location";
    }


    // Prioritas jadwal
    if (containsAny(text, topicAliases.schedule)) {
        return "schedule";
    }


    // Prioritas durasi
    if (containsAny(text, topicAliases.duration)) {
        return "duration";
    }


    // Prioritas fasilitas
    if (containsAny(text, topicAliases.facility)) {
        return "facility";
    }


    // Kontak
    if (containsAny(text, topicAliases.contact)) {
        return "contact";
    }


    // Instagram
    if (containsAny(text, topicAliases.instagram)) {
        return "instagram";
    }


    return null;
}


// =========================
// MENCARI ITEM KNOWLEDGE BASE
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
// MENCARI KNOWLEDGE BASE
// DENGAN SISTEM SCORING
// =========================

function searchKnowledgeBase(text) {

    let bestItem = null;
    let highestScore = 0;


    for (let i = 0; i < knowledgeBase.length; i++) {

        const item = knowledgeBase[i];

        let score = 0;


        for (let j = 0; j < item.keywords.length; j++) {

            const keyword = normalizeText(
                item.keywords[j]
            );


            // Keyword panjang mendapat skor lebih tinggi
            if (text.includes(keyword)) {

                if (keyword.length >= 12) {
                    score += 5;
                } else if (keyword.length >= 8) {
                    score += 4;
                } else if (keyword.length >= 5) {
                    score += 3;
                } else {
                    score += 2;
                }

            }

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
            text.startsWith(greetings[i] + " ")
        ) {
            return true;
        }

    }


    return false;
}


// =========================
// MEMBUAT JAWABAN LEBIH NATURAL
// =========================

function makeNaturalResponse(answer, topic, text) {

    let response = answer;


    // Untuk pertanyaan biaya yang sekaligus
    // menyebut program tertentu
    if (
        topic === "price" &&
        (
            containsAny(text, topicAliases.office) ||
            containsAny(text, topicAliases.design) ||
            containsAny(text, topicAliases.website)
        )
    ) {

        response =
            "Untuk nominal biaya kursus tersebut, " +
            "informasinya dapat diperoleh melalui WhatsApp Binar Komputer di +62 856-0173-0788.";

    }


    return response;
}


// =========================
// MENDAPATKAN JAWABAN AI
// =========================

function getAIResponse(userMessage) {

    const text = normalizeText(userMessage);


    // =========================
    // SAPAAN
    // =========================

    if (isGreeting(text)) {

        lastDetectedTopic = "";

        return "Halo! 👋 Selamat datang di Binar Komputer Assistant. Ada yang bisa saya bantu mengenai program kursus, jadwal, pendaftaran, atau informasi lainnya?";
    }


    // =========================
    // DETEKSI INTENT UTAMA
    // =========================

    const primaryIntent =
        detectPrimaryIntent(text);


    // =========================
    // DETEKSI TOPIK
    // =========================

    const detectedTopics =
        detectTopics(text);


    // =========================
    // JIKA ADA INTENT SPESIFIK
    // =========================

    if (primaryIntent) {

        const specificItem =
            findKnowledgeItemByTopic(primaryIntent);


        if (specificItem) {

            lastDetectedTopic = primaryIntent;

            return makeNaturalResponse(
                specificItem.answer,
                primaryIntent,
                text
            );

        }

    }


    // =========================
    // JIKA HANYA MENYEBUT TOPIK
    // =========================

    if (detectedTopics.length > 0) {

        // Jika hanya satu topik terdeteksi
        if (detectedTopics.length === 1) {

            const topic =
                detectedTopics[0];


            const topicItem =
                findKnowledgeItemByTopic(topic);


            if (topicItem) {

                lastDetectedTopic = topic;

                return makeNaturalResponse(
                    topicItem.answer,
                    topic,
                    text
                );

            }

        }


        // Jika ada beberapa topik,
        // gunakan pencarian Knowledge Base
        const result =
            searchKnowledgeBase(text);


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
    // PENCARIAN KNOWLEDGE BASE
    // =========================

    const result =
        searchKnowledgeBase(text);


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
    // KONTEKS PERTANYAAN SEBELUMNYA
    // =========================

    if (lastDetectedTopic) {

        const previousTopicItem =
            findKnowledgeItemByTopic(
                lastDetectedTopic
            );


        if (previousTopicItem) {

            return previousTopicItem.answer;

        }

    }


    // =========================
    // JAWABAN DEFAULT
    // =========================

    return (
        "Maaf, informasi tersebut belum tersedia " +
        "dalam Knowledge Base Binar Komputer. " +
        "Untuk mendapatkan informasi yang lebih tepat, " +
        "silakan hubungi admin Binar Komputer melalui WhatsApp."
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

    return now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
    });

}


// =========================
// TOMBOL COPY
// =========================

function createCopyButton(answer) {

    const button =
        document.createElement("button");


    button.classList.add("copy-button");

    button.textContent = "📋 Copy";


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


    button.classList.add("admin-button");

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
                encodeURIComponent(message);


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

function getSuggestedQuestions(userMessage) {

    const text =
        normalizeText(userMessage);


    // Microsoft Office
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


    // Desain
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


    // Website
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


    // Biaya
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


    // Pendaftaran
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


    // Lokasi
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

function createSuggestions(userMessage) {

    const suggestions =
        getSuggestedQuestions(
            userMessage
        );


    const container =
        document.createElement("div");


    container.classList.add(
        "suggestions"
    );


    const title =
        document.createElement("div");


    title.classList.add(
        "suggestions-title"
    );


    title.textContent =
        "💡 Mungkin kamu juga ingin tahu:";


    container.appendChild(title);


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

                    sendMessage(question);

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
        document.createElement("div");


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

function sendMessage(message = input.value) {

    const userMessage =
        message.trim();


    if (userMessage === "") {
        return;
    }


    // =========================
    // SUARA SEND
    // =========================

    sendSound.currentTime = 0;

    sendSound.play().catch(() => {});


    // =========================
    // BUBBLE USER
    // =========================

    const userBubble =
        document.createElement("div");


    userBubble.classList.add(
        "message",
        "user-message"
    );


    userBubble.textContent =
        userMessage;


    const userTime =
        document.createElement("div");


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
            // AI MEMBERIKAN JAWABAN
            // =========================

            setTimeout(
                function () {

                    typingBubble.remove();


                    const answer =
                        getAIResponse(
                            userMessage
                        );


                    // =========================
                    // SUARA RECEIVE
                    // =========================

                    receiveSound.currentTime = 0;

                    receiveSound.play().catch(() => {});


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


            if (!confirmClear) {
                return;
            }


            // Reset konteks percakapan
            lastDetectedTopic = "";


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

        if (event.key === "Enter") {

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