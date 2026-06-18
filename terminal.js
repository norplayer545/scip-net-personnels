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

function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

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

/* ===== BOOT ===== */
async function boot() {

    if (!output) {
        console.error("OUTPUT NOT FOUND");
        return;
    }

    output.textContent = "";

    for (const line of logo) {
        await println(line);
    }

    await println("");
    await println("SECURE CONTAINMENT INFORMATION PROCESSING NETWORK");
    await println("");

    await println("[SYSTEM CHECK]");
    await println("Kernel ........ OK");
    await println("Filesystem .... OK");
    await println("Database ...... OK");
    await println("Auth Service .. OK");
    await println("");

    await println("SYSTEM READY\n");

    inputLine.style.display = "flex";
    input.focus();
}

/* ===== SAFE STARTUP (IMPORTANT FIX) ===== */
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
