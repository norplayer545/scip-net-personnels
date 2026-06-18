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
help: `AVAILABLE COMMANDS
HELP
VERSION
STATUS
ABOUT
LOGIN
DATABASE
CLEAR`,

version: `SCIP.NET TERMINAL
VERSION 2.0.0
BUILD 2026.06`,

status: `NETWORK STATUS .... ONLINE
DATABASE STATUS ... ONLINE
AUTH SERVICE ...... ONLINE`,

about: `SECURE CONTAINMENT INFORMATION PROCESSING NETWORK
AUTHORIZED PERSONNEL ONLY`,

login: `AUTHENTICATION SERVICE READY`,

database: `PERSONNEL DATABASE CONNECTED
ERRORS DETECTED: 0`
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

/* ===== OUTPUT HELPERS ===== */
function appendText(text) {
    output.appendChild(document.createTextNode(text));
    scrollBottom();
}

/* ===== TYPEWRITER ===== */
async function type(text, speed = 2) {
    for (let i = 0; i < text.length; i++) {
        appendText(text[i]);

        if (i % 2 === 0) {
            scrollBottom();
        }

        await sleep(speed);
    }
}

async function println(text = "") {
    await type(text + "\n");
}

/* ===== LIGHT STUTTER ===== */
async function stutter() {
    if (Math.random() < 0.35) {
        await sleep(rand(20, 120));
    }
}

/* ===== SYSTEM CHECK (FIXED) ===== */
async function loadCheck(name) {

    const line = document.createElement("div");
    output.appendChild(line);

    for (let i = 0; i <= 3; i++) {

        await stutter();

        line.textContent = `${name}${".".repeat(i)}`;

        scrollBottom();

        await sleep(rand(80, 200));
    }

    line.textContent = `${name} [OK]`;

    scrollBottom();
}

/* ===== BOOT ===== */
async function boot() {

    if (!output) return;

    output.innerHTML = "";

    for (const line of logo) {
        await stutter();
        await println(line);
    }

    await println("");
    await println("SECURE CONTAINMENT INFORMATION PROCESSING NETWORK");
    await println("");

    await println("[SYSTEM CHECK]");

    const checks = [
        "Kernel",
        "Filesystem",
        "Database",
        "Auth Service"
    ];

    for (const c of checks) {
        await loadCheck(c);
    }

    await println("");
    await println("SYSTEM READY");
    await println("");

    inputLine.style.display = "flex";
    input.focus();
}

/* ===== START ===== */
window.addEventListener("DOMContentLoaded", () => {
    boot();
});

/* ===== INPUT ===== */
document.addEventListener("click", () => input.focus());

input.addEventListener("keydown", async e => {

    if (e.key === "ArrowUp") {
        e.preventDefault();

        if (!history.length) return;

        if (historyIndex < history.length - 1) {
            historyIndex++;
        }

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

    appendText(`> ${cmd}\n`);

    if (lower === "clear") {
        output.innerHTML = "";
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
