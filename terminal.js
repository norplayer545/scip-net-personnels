const output = document.getElementById("output");
const input = document.getElementById("command");
const inputLine = document.getElementById("input-line");
const terminal = document.getElementById("terminal");

/* ===== LOGO ===== */
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

HELP             - SHOW THIS MENU
VERSION          - DISPLAY TERMINAL VERSION
LOGIN            - AUTHENTICATE USER
ACCESS DATABASE  - OPEN DATABASE MODE
CLEAR            - CLEAR TERMINAL SCREEN
EXIT             - CLOSE DATABASE MODE`,

version: `SCIP.NET TERMINAL
VERSION 2.0.0
BUILD 2026.06`
};

/* ===== STATE ===== */
const history = [];
let historyIndex = -1;

let loginState = null;
let loginUser = "";
let authenticated = false;
let databaseMode = false;

/* ===== HELPERS ===== */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scrollBottom() {
    requestAnimationFrame(() => {
        terminal.scrollTop = terminal.scrollHeight;
    });
}

function append(text) {
    output.appendChild(document.createTextNode(text));
    scrollBottom();
}

/* ===== TYPEWRITER ===== */
async function type(text, speed = 8) {
    for (let i = 0; i < text.length; i++) {
        append(text[i]);
        await sleep(speed + rand(0, 3));
    }
}

async function println(text = "") {
    await type(text + "\n");
}

/* ===== SYSTEM CHECK ===== */
async function loadCheck(name) {
    const line = document.createElement("div");
    output.appendChild(line);

    for (let i = 0; i <= 3; i++) {
        line.textContent = `${name}${".".repeat(i)}`;
        scrollBottom();
        await sleep(rand(300, 600));
    }

    line.textContent = `${name} [OK]`;
    scrollBottom();
}

/* ===== BOOT ===== */
async function boot() {
    output.innerHTML = "";

    for (const line of logo) {
        await println(line);
    }

    await println("");
    await println("SECURE CONTAINMENT INFORMATION PROCESSING NETWORK");
    await println("");
    await println("[SYSTEM CHECK]");

    const checks = ["Kernel", "Filesystem", "Database", "Auth Service"];

    for (const c of checks) {
        await loadCheck(c);
    }

    await println("");
    await println("SYSTEM READY");
    await println("");
    await println("Enter 'help' for available commands.");
    await println("");

    inputLine.style.display = "flex";
    input.focus();
}

/* ===== INPUT ===== */
window.addEventListener("DOMContentLoaded", boot);

document.addEventListener("click", () => input.focus());

input.addEventListener("keydown", async e => {

    if (e.key === "Enter") {
        e.preventDefault();

        const cmd = input.value.trim();
        const lower = cmd.toLowerCase();

        history.push(cmd);
        historyIndex = -1;

        const line = document.createElement("div");
        line.textContent = `> ${cmd}`;
        output.appendChild(line);

        input.value = "";

        /* ===== LOGIN FLOW ===== */

        if (loginState === "username") {
            loginUser = cmd;
            loginState = "password";

            await println("PASSWORD:");
            return;
        }

        if (loginState === "password") {

            if (
                loginUser.toLowerCase() === "admin" &&
                cmd === "scpnet"
            ) {
                authenticated = true;

                await println("");
                await println("ACCESS GRANTED");
                await println(`WELCOME, ${loginUser.toUpperCase()}`);
            } else {
                await println("");
                await println("ACCESS DENIED");
            }

            loginState = null;
            loginUser = "";
            return;
        }

/* ===== DATABASE MODE ===== */

/* ===== DATABASE MODE ===== */

if (databaseMode) {

    if (lower === "exit") {

        databaseMode = false;

        await println("DATABASE CLOSED");

        return;
    }


if (lower.startsWith("search ")) {

    const name = cmd.substring(7).trim();


    const template = await openTemplate(
        `template_${name}`
    );


    // Clear terminal screen
    output.innerHTML = "";


    await println(template);

    return;
}


    await println("");
    await println("UNKNOWN DATABASE COMMAND");
    await println("");

    return;
}

        /* ===== COMMANDS ===== */

        if (lower === "login") {

            if (authenticated) {
                await println("ALREADY AUTHENTICATED");
            } else {
                loginState = "username";
                await println("USERNAME:");
            }

        }
        else if (lower === "access database") {

            if (!authenticated) {
                await println("ACCESS DENIED");
                await println("LOGIN REQUIRED");
            } else {

                databaseMode = true;

                await println("DATABASE CONNECTED");
                await println("");
                await println("DATABASE ONLINE");
                await println("");
                await println("TYPE SEARCH ALL TO SEE ALL AVAILABLE FILES");
                await println("");
                await println("CASE SENSITIVE");
            }

        }
        else if (lower === "help") {
            await println(commands.help);
        }
        else if (lower === "version") {
            await println(commands.version);
        }
        else if (lower === "clear") {
            output.innerHTML = "";
        }
        else if (cmd) {
            await println(`UNKNOWN COMMAND: ${cmd}`);
        }

        scrollBottom();
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();

        if (!history.length) return;

        historyIndex = Math.min(
            historyIndex + 1,
            history.length - 1
        );

        input.value =
            history[history.length - 1 - historyIndex];
    }

    if (e.key === "ArrowDown") {
        e.preventDefault();

        if (historyIndex > 0) {
            historyIndex--;

            input.value =
                history[history.length - 1 - historyIndex];
        } else {
            historyIndex = -1;
            input.value = "";
        }
    }
});
