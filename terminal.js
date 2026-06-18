const output = document.getElementById("output");
const input = document.getElementById("command");
const inputLine = document.getElementById("input-line");
const terminal = document.getElementById("terminal");

/* ===== ASCII LOGO ===== */
const logo = [
"███████╗ ██████╗██╗██████╗     ███╗   ██╗███████╗████████╗",
"██╔════╝██╔════╝██║██╔══██╗    ████╗  ██║██╔════╝╚══██╔══╝",
"███████╗██║     ██║██████╔╝    ██╔██╗ ██║█████╗     ██║",
"╚════██║██║     ██║██╔═══╝     ██║╚██╗██║██╔══╝     ██║",
"███████║╚██████╗██║██║         ██║ ╚████║███████╗   ██║",
"╚══════╝ ╚═════╝╚═╝╚═╝         ╚═╝  ╚═══╝╚══════╝   ╚═╝",
"",
"        scip.net.personnels"
];

/* ===== COMMANDS ===== */
const commands = {
help: `AVAILABLE COMMANDS\nHELP\nVERSION\nSTATUS\nABOUT\nLOGIN\nDATABASE\nCLEAR`,

version: `SCIP.NET TERMINAL\nVERSION 2.0.0\nBUILD 2026.06`,

status: `NETWORK STATUS .... ONLINE\nDATABASE STATUS ... ONLINE\nAUTH SERVICE ...... ONLINE`,

about: `SECURE CONTAINMENT INFORMATION PROCESSING NETWORK\nAUTHORIZED PERSONNEL ONLY`,

login: `AUTHENTICATION SERVICE READY`,

database: `PERSONNEL DATABASE CONNECTED\nERRORS DETECTED: 0`
};

/* ===== STATE ===== */
const history = [];
let historyIndex = -1;

/* ===== CORE ===== */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

/* ===== TYPEWRITER (UNCHANGED) ===== */
async function type(text, speed = 2) {
    for (let i = 0; i < text.length; i++) {
        output.textContent += text[i];
        if (i % 2 === 0) scrollBottom();
        await sleep(speed);
    }
}

async function println(text = "") {

    // SMALL CHANCE OF BOOT LAG EVEN INSIDE PRINT
    if (Math.random() < 0.15) {
        await sleep(rand(120, 600));
    }

    await type(text + "\n");
}

/* ===== BOOT WITH STUTTERS ===== */
async function boot() {

    if (!output) {
        console.error("OUTPUT NOT FOUND");
        return;
    }

    output.textContent = "";

    /* LOGO WITH STUTTERS */
    for (const line of logo) {

        if (Math.random() < 0.35) {
            await println("[SYSTEM BUFFERING...]");
            await sleep(rand(200, 900));
        }

        await println(line);
    }

    await println("");

    await println("SECURE CONTAINMENT INFORMATION PROCESSING NETWORK");
    await println("");

    /* SYSTEM CHECK WITH FREEZES */
    await println("[SYSTEM CHECK]");

    const checks = [
        "Kernel ........ OK",
        "Filesystem .... OK",
        "Database ...... OK",
        "Auth Service .. OK"
    ];

    for (const c of checks) {

        if (Math.random() < 0.4) {
            await println("[DELAY DETECTED - RETRYING MODULE]");
            await sleep(rand(300, 1100));
        }

        await println(c);
    }

    await println("");

    if (Math.random() < 0.5) {
        await println("[WARNING] SYSTEM TIMING DESYNC DETECTED");
        await sleep(rand(400, 1200));
    }

    await println("SYSTEM READY\n");

    inputLine.style.display = "flex";
    input.focus();
}

/* ===== SAFE STARTUP ===== */
window.addEventListener("DOMContentLoaded", () => {
    boot();
});

/* ===== INPUT ===== */
document.addEventListener("click", () => input.focus());

input.addEventListener("keydown", async e => {

    if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!history.length) return;

        if (historyIndex < history.length - 1) historyIndex++;

        input.value = history[history.length - 1 - historyIndex];
        return;
    }

    if (e.key === "ArrowDown") {
        e.preventDefault();

        if (historyIndex > 0) {
            historyIndex--;
            input.value = history[history.length - 1 - historyIndex];
        } else {
            historyIndex = -1;
            input.value = "";
        }
        return;
    }

    if (e.key !== "Enter") return;

    const cmd = input.value.trim();
    const lower = cmd.toLowerCase();

    history.push(cmd);
    historyIndex = -1;

    output.textContent += `> ${cmd}\n`;

    if (lower === "clear") {
        output.textContent = "";
    }
    else if (commands[lower]) {
        await println(commands[lower]);
    }
    else if (cmd !== "") {
        await println(`UNKNOWN COMMAND: ${cmd}`);
    }

    input.value = "";
    scrollBottom();
});
