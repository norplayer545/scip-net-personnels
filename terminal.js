const output = document.getElementById("output");
const input = document.getElementById("command");
const inputLine = document.getElementById("input-line");
const terminal = document.getElementById("terminal");

/* ===== BIG ASCII BANNER (RESTORED) ===== */
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

const commands = {
help: `
AVAILABLE COMMANDS
HELP
VERSION
STATUS
ABOUT
LOGIN
DATABASE
CLEAR
`,

version: `
SCIP.NET TERMINAL
VERSION 2.0.0
BUILD 2026.06
`,

status: `
NETWORK STATUS .... ONLINE
DATABASE STATUS ... ONLINE
AUTH SERVICE ...... ONLINE
`,

about: `
SECURE CONTAINMENT INFORMATION PROCESSING NETWORK
AUTHORIZED PERSONNEL ONLY
`,

login: `
AUTHENTICATION SERVICE READY
`,

database: `
PERSONNEL DATABASE CONNECTED
ERRORS DETECTED: 0
`
};

const history = [];
let historyIndex = -1;

/* ===== UTIL ===== */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

async function type(text, speed = 5) {
    for (const char of text) {
        output.textContent += char;
        scrollBottom();
        await sleep(speed);
    }
}

async function println(text = "") {
    await type(text + "\n");
}

/* ===== BOOT SEQUENCE ===== */
async function boot() {

    for (const line of logo) {
        await println(line);
    }

    await println("");
    await println("SECURE CONTAINMENT INFORMATION PROCESSING NETWORK");
    await println("");

    await println("INITIALIZING KERNEL... [OK]");
    await println("LOADING CORE MODULES... [OK]");
    await println("VERIFYING FILESYSTEM... [OK]");
    await println("MOUNTING DATABASE... [OK]");
    await println("STARTING AUTH SERVICE... [OK]");
    await println("");

    await println("SYSTEM READY");
    await println("");

    inputLine.style.display = "flex";
    input.focus();
}

/* start */
boot();

/* click refocus */
document.addEventListener("click", () => input.focus());

/* ===== INPUT ===== */
input.addEventListener("keydown", async e => {

    if (e.key === "ArrowUp") {
        e.preventDefault();

        if (!history.length) return;

        if (historyIndex < history.length - 1)
            historyIndex++;

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
    history.push(cmd);
    historyIndex = -1;

    output.textContent += `> ${cmd}\n`;

    const lower = cmd.toLowerCase();

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
