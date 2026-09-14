"use strict";

/* =========================================
   ElectroHub AI
   Frontend prototype
   ========================================= */

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const themeBtn = document.getElementById("themeBtn");
const statusText = document.getElementById("status");

const quickButtons = document.querySelectorAll(".quick-btn");
const toolCards = document.querySelectorAll(".tool-card");


/* =========================================
   ADD MESSAGE
   ========================================= */

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";

    if (type === "user") {

        message.innerHTML = `
            <div class="bubble"></div>
        `;

    } else {

        message.innerHTML = `
            <div class="message-icon">⚡</div>
            <div class="bubble"></div>
        `;
    }

    const bubble = message.querySelector(".bubble");

    bubble.textContent = text;

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}


/* =========================================
   DEMO AI RESPONSE
   ========================================= */

function getDemoResponse(question) {

    const q = question.toLowerCase();

    if (q.includes("ohm")) {

        return "Ohm's Law states that V = I × R. Voltage is equal to current multiplied by resistance. For example, if current is 2 A and resistance is 5 Ω, voltage is 10 V.";

    }

    if (q.includes("transformer")) {

        return "A transformer is a static electrical device that transfers AC electrical energy from one circuit to another through electromagnetic induction. It can increase or decrease AC voltage.";

    }

    if (q.includes("faraday")) {

        return "Faraday's law says that an emf is induced in a circuit whenever the magnetic flux linking the circuit changes. In simple terms: changing magnetic flux produces voltage.";

    }

    if (q.includes("power factor")) {

        return "Power factor is the ratio of real power to apparent power. For a sinusoidal AC circuit, power factor = cos φ, where φ is the phase angle between voltage and current.";

    }

    if (q.includes("formula")) {

        return "Some useful EEE formulas: V = IR, P = VI, P = I²R, P = V²/R, f = 1/T, synchronous speed Ns = 120f/P, and energy = power × time.";

    }

    if (q.includes("ac") && q.includes("dc")) {

        return "AC changes its direction periodically, while DC flows mainly in one direction. Household mains supply is AC, while a battery provides DC.";

    }

    if (q.includes("machine")) {

        return "Electrical machines mainly include transformers, DC machines, induction motors, synchronous machines and special machines. Motors convert electrical energy into mechanical energy, while generators convert mechanical energy into electrical energy.";

    }

    if (q.includes("power system")) {

        return "A power system consists mainly of generation, transmission, distribution and utilization. Important topics include transformers, transmission lines, substations, protection and power factor improvement.";

    }

    return "I received your question. This is the first frontend version of ElectroHub AI. The real AI engine will be connected in the next step. For now, try one of the EEE quick questions above.";

}


/* =========================================
   SEND QUESTION
   ========================================= */

function sendQuestion(question) {

    const text = question.trim();

    if (text === "") {
        return;
    }

    addMessage(text, "user");

    userInput.value = "";

    statusText.textContent = "Thinking...";

    sendBtn.disabled = true;

    setTimeout(() => {

        const response = getDemoResponse(text);

        addMessage(response, "ai");

        statusText.textContent = "Ready to help";

        sendBtn.disabled = false;

        userInput.focus();

    }, 500);
}


/* =========================================
   SEND BUTTON
   ========================================= */

sendBtn.addEventListener("click", () => {

    sendQuestion(userInput.value);

});


/* =========================================
   ENTER KEY
   ========================================= */

userInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        sendQuestion(userInput.value);

    }

});


/* =========================================
   QUICK QUESTIONS
   ========================================= */

quickButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const question = button.dataset.question;

        if (question) {
            sendQuestion(question);
        }

    });

});


/* =========================================
   TOOL CARDS
   ========================================= */

toolCards.forEach((card) => {

    card.addEventListener("click", () => {

        const question = card.dataset.question;

        if (question) {
            sendQuestion(question);
        }

    });

});


/* =========================================
   DARK / LIGHT MODE
   ========================================= */

function updateThemeIcon() {

    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";

    }

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "electrohub-theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();

});


/* =========================================
   LOAD SAVED THEME
   ========================================= */

const savedTheme =
    localStorage.getItem("electrohub-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

}

updateThemeIcon();