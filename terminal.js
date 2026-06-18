const output = document.getElementById("output");
const input = document.getElementById("command");
const inputLine = document.getElementById("input-line");
const terminal = document.getElementById("terminal");

const logo = [
"███████╗ ██████╗██╗██████╗     ███╗   ██╗███████╗████████╗",
"██╔════╝██╔════╝██║██╔══██╗    ████╗  ██║██╔════╝╚══██╔══╝",
"███████╗██║     ██║██████╔╝    ██╔██╗ ██║█████╗     ██║",
"╚════██║██║     ██║██╔═══╝     ██║╚██╗██║██╔══╝     ██║",
"███████║╚██████╗██║██║         ██║ ╚████║███████╗   ██║",
"╚══════╝ ╚═════╝╚═╝╚═╝         ╚═╝  ╚═══╝╚══════╝   ╚═╝"
];

const commands = {
    help: `
AVAILABLE COMMANDS

HELP
VERSION
CLEAR
ABOUT
STATUS
LOGIN
DATABASE
`,

    version: `
SCiP.NET
Version 2.0.0
Build 2026.06
`,

    about: `
SECURE CONTAINMENT INFORMATION
PROCESSING NETWORK

AUTHORIZED FOUNDATION ACCESS ONLY
`,

    status: `
NETWORK STATUS: ONLINE
DATABASE STATUS: ONLINE
AUTH SERVICES: ONLINE
ARCHIVE STATUS: ONLINE
`,

    login: `
AUTHENTICATION SERVICE READY
ENTER CREDENTIALS
`,

    database: `
PERSONNEL DATABASE CONNECTED
0 ERRORS DETECTED
`
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

async function type(text, speed = 15) {
    for (const char of text) {
        output.textContent += char;
        scrollBottom();
        await sleep(speed);
    }
}

async function println(text = "", speed = 15) {
    await type(text + "\n", speed);
}

async function loading(text) {
    await type(text);

    for (let i = 0; i < 3; i++) {
        await sleep(350);
        await type(".");
    }

    await sleep(150);

    await println(" [OK]", 2);
}

async function boot() {

    for (const line of logo) {
        await println(line, 1);
        await sleep(25);
    }

    await println("");
    await println(
        "SECURE CONTAINMENT INFORMATION PROCESSING NETWORK",
        5
    );

    await println("");
    await sleep(400);

    await loading("INITIALIZING KERNEL");
    await loading("LOADING FOUNDATION CORE");
    await loading("VERIFYING FILESYSTEM");
    await loading("MOUNTING PERSONNEL DATABASE");
    await loading("LOADING INCIDENT ARCHIVE");
    await loading("STARTING AUTHENTICATION SERVICE");
    await loading("ESTABLISHING SECURE CONNECTION");
    await loading("CHECKING SYSTEM INTEGRITY");

    await println("");
    await println("SYSTEM READY", 10);
    await println("");

    inputLine.style.display = "flex";
    input.focus();
}

boot();

input.addEventListener("keydown", async (e) => {

    if (e.key !== "Enter")
        return;

    const cmd = input.value.trim();

    output.textContent += `> ${cmd}\n`;

    if (cmd === "") {
        output.textContent += "\n";
    }
    else if (cmd.toLowerCase() === "clear") {
        output.textContent = "";
    }
    else if (commands[cmd.toLowerCase()]) {
        await println(commands[cmd.toLowerCase()]);
    }
    else {
        await println(
            `ERROR: UNKNOWN COMMAND '${cmd.toUpperCase()}'`
        );
    }

    input.value = "";

    scrollBottom();
});
