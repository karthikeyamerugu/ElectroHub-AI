"use strict";


/* ==================================================
   ELECTROHUB AI
   CLOUDFLARE WORKER CONNECTION
================================================== */

const WORKER_URL =
    "https://tight-disk-19cd.karthikmerugu2009.workers.dev";


/* ==================================================
   ELEMENTS
================================================== */

const chatForm =
    document.getElementById("chatForm");

const userInput =
    document.getElementById("userInput");

const sendButton =
    document.getElementById("sendButton");

const chatMessages =
    document.getElementById("chatMessages");

const clearChatButton =
    document.getElementById("clearChat");

const themeToggle =
    document.getElementById("themeToggle");


/* ==================================================
   CHAT
================================================== */

function addMessage(text, sender) {

    const message =
        document.createElement("div");

    message.className =
        "message " + sender;

    message.textContent =
        text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function showTyping() {

    removeTyping();

    const typing =
        document.createElement("div");

    typing.id =
        "typingMessage";

    typing.className =
        "message ai typing-message";

    typing.textContent =
        "ElectroHub AI is thinking...";

    chatMessages.appendChild(typing);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function removeTyping() {

    const typing =
        document.getElementById(
            "typingMessage"
        );

    if (typing) {
        typing.remove();
    }
}


/* ==================================================
   AI REQUEST
================================================== */

async function askAI(question) {

    const response =
        await fetch(
            WORKER_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


    let data;

    try {

        data =
            await response.json();

    } catch (error) {

        throw new Error(
            "Invalid response from AI server."
        );

    }


    if (!response.ok) {

        throw new Error(
            data.error ||
            "AI server returned an error."
        );

    }


    if (
        !data.answer ||
        typeof data.answer !== "string"
    ) {

        throw new Error(
            "AI did not return an answer."
        );

    }


    return data.answer;
}


/* ==================================================
   SEND QUESTION
================================================== */

async function sendQuestion(question) {

    question =
        String(question || "").trim();


    if (!question) {
        return;
    }


    addMessage(
        question,
        "user"
    );


    userInput.value =
        "";


    sendButton.disabled =
        true;


    sendButton.textContent =
        "Thinking...";


    showTyping();


    try {

        const answer =
            await askAI(question);


        removeTyping();


        addMessage(
            answer,
            "ai"
        );

    } catch (error) {

        console.error(
            "ElectroHub AI error:",
            error
        );


        removeTyping();


        addMessage(
            "⚠️ Unable to connect to ElectroHub AI. Please check your internet connection and try again.",
            "ai"
        );

    } finally {

        sendButton.disabled =
            false;


        sendButton.textContent =
            "Send";


        userInput.focus();

    }
}


/* ==================================================
   CHAT FORM
================================================== */

chatForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        sendQuestion(
            userInput.value
        );

    }
);


/* ==================================================
   QUICK QUESTIONS
================================================== */

document
    .querySelectorAll(".quick-btn")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const question =
                    button.dataset.question;

                if (!question) {
                    return;
                }

                sendQuestion(
                    question
                );

            }
        );

    });


/* ==================================================
   FORMULA BUTTONS
================================================== */

document
    .querySelectorAll(".formula-btn")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const question =
                    button.dataset.question;

                if (!question) {
                    return;
                }

                sendQuestion(
                    question
                );

            }
        );

    });


/* ==================================================
   CLEAR CHAT
================================================== */

clearChatButton.addEventListener(
    "click",
    function() {

        chatMessages.innerHTML =
            "";

        addMessage(
            "Hello! I'm ElectroHub AI. Ask me any Electrical & Electronics Engineering question. ⚡",
            "ai"
        );

    }
);


/* ==================================================
   OHM'S LAW
================================================== */

function calculateOhm() {

    const V =
        parseFloat(
            document.getElementById(
                "ohmV"
            ).value
        );

    const I =
        parseFloat(
            document.getElementById(
                "ohmI"
            ).value
        );

    const R =
        parseFloat(
            document.getElementById(
                "ohmR"
            ).value
        );


    const result =
        document.getElementById(
            "ohmResult"
        );


    const values =
        [
            !isNaN(V),
            !isNaN(I),
            !isNaN(R)
        ].filter(Boolean).length;


    if (values !== 2) {

        result.textContent =
            "⚠️ Enter exactly two values.";

        return;
    }


    if (
        !isNaN(V) &&
        !isNaN(I)
    ) {

        if (I === 0) {

            result.textContent =
                "⚠️ Current cannot be zero.";

            return;
        }

        const resistance =
            V / I;

        result.innerHTML =
            "Resistance = <b>" +
            formatNumber(resistance) +
            " Ω</b>";

        return;
    }


    if (
        !isNaN(V) &&
        !isNaN(R)
    ) {

        if (R === 0) {

            result.textContent =
                "⚠️ Resistance cannot be zero.";

            return;
        }

        const current =
            V / R;

        result.innerHTML =
            "Current = <b>" +
            formatNumber(current) +
            " A</b>";

        return;
    }


    if (
        !isNaN(I) &&
        !isNaN(R)
    ) {

        const voltage =
            I * R;

        result.innerHTML =
            "Voltage = <b>" +
            formatNumber(voltage) +
            " V</b>";

    }
}


/* ==================================================
   POWER
================================================== */

function calculatePower() {

    const V =
        parseFloat(
            document.getElementById(
                "powerV"
            ).value
        );

    const I =
        parseFloat(
            document.getElementById(
                "powerI"
            ).value
        );


    const result =
        document.getElementById(
            "powerResult"
        );


    if (
        isNaN(V) ||
        isNaN(I)
    ) {

        result.textContent =
            "⚠️ Enter voltage and current.";

        return;
    }


    const P =
        V * I;


    result.innerHTML =
        "Power = <b>" +
        formatNumber(P) +
        " W</b>";

}


/* ==================================================
   THREE PHASE POWER
================================================== */

function calculateThreePhase() {

    const V =
        parseFloat(
            document.getElementById(
                "threeV"
            ).value
        );

    const I =
        parseFloat(
            document.getElementById(
                "threeI"
            ).value
        );

    const PF =
        parseFloat(
            document.getElementById(
                "threePF"
            ).value
        );


    const result =
        document.getElementById(
            "threeResult"
        );


    if (
        isNaN(V) ||
        isNaN(I) ||
        isNaN(PF)
    ) {

        result.textContent =
            "⚠️ Enter all values.";

        return;
    }


    if (
        PF < 0 ||
        PF > 1
    ) {

        result.textContent =
            "⚠️ Power factor must be between 0 and 1.";

        return;
    }


    const P =
        Math.sqrt(3) *
        V *
        I *
        PF;


    result.innerHTML =
        "Active Power = <b>" +
        formatNumber(P) +
        " W</b><br>" +

        "Power = <b>" +
        formatNumber(P / 1000) +
        " kW</b>";

}


/* ==================================================
   ENERGY & BILL
================================================== */

function calculateBill() {

    const power =
        parseFloat(
            document.getElementById(
                "billPower"
            ).value
        );

    const hours =
        parseFloat(
            document.getElementById(
                "billHours"
            ).value
        );

    const days =
        parseFloat(
            document.getElementById(
                "billDays"
            ).value
        );

    const rate =
        parseFloat(
            document.getElementById(
                "billRate"
            ).value
        );


    const result =
        document.getElementById(
            "billResult"
        );


    if (
        isNaN(power) ||
        isNaN(hours) ||
        isNaN(days) ||
        isNaN(rate)
    ) {

        result.textContent =
            "⚠️ Enter all values.";

        return;
    }


    if (
        power < 0 ||
        hours < 0 ||
        days < 0 ||
        rate < 0
    ) {

        result.textContent =
            "⚠️ Values cannot be negative.";

        return;
    }


    const units =
        power *
        hours *
        days;


    const bill =
        units *
        rate;


    result.innerHTML =
        "Energy = <b>" +
        formatNumber(units) +
        " units</b><br>" +

        "Estimated Bill = <b>₹" +
        formatNumber(bill) +
        "</b>";

}


/* ==================================================
   TRANSFORMER EMF
================================================== */

function calculateEMF() {

    const f =
        parseFloat(
            document.getElementById(
                "emfF"
            ).value
        );

    const N =
        parseFloat(
            document.getElementById(
                "emfN"
            ).value
        );

    const flux =
        parseFloat(
            document.getElementById(
                "emfFlux"
            ).value
        );


    const result =
        document.getElementById(
            "emfResult"
        );


    if (
        isNaN(f) ||
        isNaN(N) ||
        isNaN(flux)
    ) {

        result.textContent =
            "⚠️ Enter all values.";

        return;
    }


    if (
        f < 0 ||
        N < 0 ||
        flux < 0
    ) {

        result.textContent =
            "⚠️ Values cannot be negative.";

        return;
    }


    const E =
        4.44 *
        f *
        N *
        flux;


    result.innerHTML =
        "EMF = <b>" +
        formatNumber(E) +
        " V</b>";

}


/* ==================================================
   MOTOR SPEED & SLIP
================================================== */

function calculateMotor() {

    const f =
        parseFloat(
            document.getElementById(
                "motorF"
            ).value
        );

    const poles =
        parseFloat(
            document.getElementById(
                "motorPoles"
            ).value
        );

    const rotorSpeed =
        parseFloat(
            document.getElementById(
                "motorSpeed"
            ).value
        );


    const result =
        document.getElementById(
            "motorResult"
        );


    if (
        isNaN(f) ||
        isNaN(poles) ||
        isNaN(rotorSpeed)
    ) {

        result.textContent =
            "⚠️ Enter all values.";

        return;
    }


    if (
        f <= 0 ||
        poles <= 0
    ) {

        result.textContent =
            "⚠️ Frequency and poles must be greater than zero.";

        return;
    }


    const synchronousSpeed =
        (120 * f) /
        poles;


    const slip =
        (
            (
                synchronousSpeed -
                rotorSpeed
            ) /
            synchronousSpeed
        ) * 100;


    result.innerHTML =
        "Synchronous Speed = <b>" +
        formatNumber(synchronousSpeed) +
        " rpm</b><br>" +

        "Slip = <b>" +
        formatNumber(slip) +
        "%</b>";

}


/* ==================================================
   NUMBER FORMATTER
================================================== */

function formatNumber(value) {

    if (!Number.isFinite(value)) {
        return "0";
    }

    return Number(
        value.toFixed(6)
    ).toLocaleString(
        "en-IN"
    );
}


/* ==================================================
   THEME
================================================== */

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        themeToggle.textContent =
            "☀️";

    } else {

        document.body.classList.remove(
            "light-mode"
        );

        themeToggle.textContent =
            "🌙";
    }
}


const savedTheme =
    localStorage.getItem(
        "electrohub-theme"
    ) || "dark";


setTheme(
    savedTheme
);


themeToggle.addEventListener(
    "click",
    function() {

        const isLight =
            document.body.classList.contains(
                "light-mode"
            );


        const newTheme =
            isLight
                ? "dark"
                : "light";


        setTheme(
            newTheme
        );


        localStorage.setItem(
            "electrohub-theme",
            newTheme
        );

    }
);


/* ==================================================
   START MESSAGE
================================================== */

addMessage(
    "Hello! I'm ElectroHub AI. Ask me any Electrical & Electronics Engineering question. ⚡",
    "ai"
);


/* ==================================================
   SERVICE WORKER STATUS
================================================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function() {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )
                .then(function() {

                    console.log(
                        "⚡ ElectroHub AI service worker registered."
                    );

                })
                .catch(function(error) {

                    console.error(
                        "Service worker registration failed:",
                        error
                    );

                });

        }
    );

}


console.log(
    "⚡ ElectroHub AI started."
);

console.log(
    "Worker:",
    WORKER_URL
);
