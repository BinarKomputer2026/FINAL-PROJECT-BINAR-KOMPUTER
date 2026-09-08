const chatBox = document.querySelector(".chat-box");
const input = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");
const sendSound = new Audio("sounds/send.mp3");


function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}


function getAIResponse(userMessage) {

    const text = userMessage.toLowerCase();

    // Jawaban untuk sapaan
    if (
        text.includes("halo") ||
        text.includes("hai") ||
        text.includes("hi") ||
        text.includes("hallo")
    ) {

        return "Halo! 👋 Selamat datang di BINAR Assistant. Ada yang bisa saya bantu?";
    }


    // Jawaban default jika tidak ditemukan
    let answer = "Maaf, saya belum menemukan informasi yang sesuai. Silakan hubungi admin BINAR untuk informasi lebih lanjut.";


    // Mencari jawaban di Knowledge Base
    for (let i = 0; i < knowledgeBase.length; i++) {

        const item = knowledgeBase[i];

        for (let j = 0; j < item.keywords.length; j++) {

            if (text.includes(item.keywords[j])) {

                answer = item.answer;
                break;

            }

        }


        // Kalau sudah menemukan jawaban, berhenti mencari
        if (answer !== "Maaf, saya belum menemukan informasi yang sesuai. Silakan hubungi admin BINAR untuk informasi lebih lanjut.") {
            break;
        }

    }

    return answer;
}


function sendMessage(message = input.value) {

    const userMessage = message.trim();


    if (userMessage !== "") {

        // Suara
        sendSound.play();


        // Bubble user
        const messageElement = document.createElement("div");

        messageElement.classList.add("message", "user-message");

        messageElement.textContent = userMessage;

        chatBox.appendChild(messageElement);

        scrollToBottom();


        // Kosongkan input
        input.value = "";


        // AI menjawab
        setTimeout(function () {

            const answer = getAIResponse(userMessage);


            const aiMessage = document.createElement("div");

            aiMessage.classList.add("message", "ai-message");

            aiMessage.textContent = answer;

            chatBox.appendChild(aiMessage);

            scrollToBottom();

        }, 500);

    }

}


// Klik tombol Kirim
sendButton.addEventListener("click", function () {

    sendMessage();

});


// Tekan Enter
input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});


// Quick Reply
const quickReplies = document.querySelectorAll(".quick-replies button");

quickReplies.forEach(function (button) {

    button.addEventListener("click", function () {

        sendMessage(button.textContent);

    });

});