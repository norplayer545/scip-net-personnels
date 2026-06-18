const output = document.getElementById("output");
const input = document.getElementById("command");
const inputLine = document.getElementById("input-line");
const terminal = document.getElementById("terminal");

const logo = [
" ███████╗ ██████╗██╗██████╗     ███╗   ██╗███████╗████████╗",
" ██╔════╝██╔════╝██║██╔══██╗    ████╗  ██║██╔════╝╚══██╔══╝",
" ███████╗██║     ██║██████╔╝    ██╔██╗ ██║█████╗     ██║",
" ╚════██║██║     ██║██╔═══╝     ██║╚██╗██║██╔══╝     ██║",
" ███████║╚██████╗██║██║         ██║ ╚████║███████╗   ██║",
" ╚══════╝ ╚═════╝╚═╝╚═╝         ╚═╝  ╚═══╝╚══════╝   ╚═╝"
];

const commands = {
    help: `
AVAILABLE COMMANDS

HELP        Display available commands
VERSION     Show system version
STATUS      Show network status
LOGIN       Authentication service
DATABASE    Database status
ABOUT       System information
CLEAR       Clear terminal
`,

    version: `
SCiP.NET TERMINAL

VERSION : 2.0.0
BUILD   : 2026.06
KERNEL  : FOUNDATION-CORE
`,

    about: `
SECURE CONTAINMENT INFORMATION PROCESSING NETWORK

AUTHORIZED FOUNDATION PERSONNEL ONLY

UNAUTHORIZED ACCESS IS PROHIBITED
`,

    status: `
NETWORK STATUS ........ ONLINE
DATABASE STATUS ....... ONLINE
AUTH SERVICE .......... ONLINE
INCIDENT ARCHIVE ...... ONLINE
PERSONNEL RECORDS ..... ONLINE
`,

    login: `
AUTHENTICATION SERVICE READY

ENTER CREDENTIALS
`,

    database: `
PERSONNEL DATABASE CONNECTED

RECORDS AVAILABLE : 1,284
ERRORS DETECTED   : 0
`,

    cls: "__CLEAR__",
    clear: "__CLEAR__"
};

const history = [];
let historyIndex = -1;

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
        await sleep(300);
        await type(".");
    }

    await sleep(150);
    await println(" [OK]", 2);
}

async function boot() {

    for (const line of logo) {
        await println(line, 1);
        await sleep(15);
    }

    await println("");
    await println(
        "SECURE CONTAINMENT INFORMATION PROCESSING NETWORK",
        4
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
    await println("ACCESS LEVEL: UNCLASSIFIED", 5);
    await println("SYSTEM STATUS: READY", 5);
    await println("");

    inputLine.style.display = "flex";
    input.focus();
}

boot();

document.addEventListener("click", () => {
    input.focus();
});

input.addEventListener("keydown", async (e) => {

    if (e.key === "ArrowUp") {

        e.preventDefault();

        if (history.length === 0)
            return;

        if (historyIndex < history.length - 1)
            historyIndex++;

        input.value =
            history[history.length - 1 - historyIndex];

        return;
    }

    if (e.key === "ArrowDown") {

        e.preventDefault();

        if (historyIndex > 0) {

            historyIndex--;

            input.value =
                history[history.length - 1 - historyIndex];
        }
        else {

            historyIndex = -1;
            input.value = "";
        }

        return;
    }

    if (e.key !== "Enter")
        return;

    const cmd = input.value.trim();

    history.push(cmd);
    historyIndex = -1;

    output.textContent +=
        `admin@scipnet:~$ ${cmd}\n`;

    scrollBottom();

    if (cmd === "") {

        output.textContent += "\n";
    }
    else {

        const command =
            commands[cmd.toLowerCase()];

        if (command === "__CLEAR__") {

            output.textContent = "";

            await println(
                "SCiP.NET TERMINAL CLEARED",
                5
            );

            await println("");
        }
        else if (command) {

            await println(command, 5);
        }
        else {

            await println(
                `ERROR: COMMAND NOT FOUND: ${cmd}`,
                5
            );

            await println(
                "TYPE 'HELP' FOR AVAILABLE COMMANDS",
                5
            );
        }
    }

    input.value = "";

    scrollBottom();
});
