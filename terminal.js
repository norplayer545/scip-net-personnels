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

/* ===== TYPEWRITER ===== */
async function type(text, speed = 2) {
    for (let i = 0; i < text.length; i++) {
        output.textContent += text[i];
        if (i % 2 === 0) scrollBottom();
        await sleep(speed);
    }
}

async function println(text = "") {
    await type(text + "\n");
}

/* ===== LIGHT STUTTER (FIXED) ===== */
async function stutter() {
    if (Math.random() < 0.35) {
        await sleep(rand(20, 120));
    }
}

/* ===== SYSTEM CHECK ===== */
async function loadCheck(name) {
    let dots = "";

    for (let i = 0; i < 3; i++) {
        await stutter();

        dots += ".";
        output.textContent += `\r${name}${dots}`;
        scrollBottom();

        await sleep(rand(80, 200));
    }

    output.textContent += ` OK\n`;
    scrollBottom();
}

/* ===== BOOT ===== */
async function boot() {

    if (!output) return;

    output.textContent = "";

    /* ===== LOGO (FAST LINE-BY-LINE) ===== */
    for (const line of logo) {
        await stutter();
        await println(line);
    }

    await println("");
    await println("SECURE CONTAINMENT INFORMATION PROCESSING NETWORK");
    await println("");

    /* SYSTEM CHECK */
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

    await println("SYSTEM READY\n");

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
