const output = document.getElementById("output");
const input = document.getElementById("command");

input.style.display = "none";

const logo = [
"███████╗ ██████╗██╗██████╗     ███╗   ██╗███████╗████████╗",
"██╔════╝██╔════╝██║██╔══██╗    ████╗  ██║██╔════╝╚══██╔══╝",
"███████╗██║     ██║██████╔╝    ██╔██╗ ██║█████╗     ██║",
"╚════██║██║     ██║██╔═══╝     ██║╚██╗██║██╔══╝     ██║",
"███████║╚██████╗██║██║         ██║ ╚████║███████╗   ██║",
"╚══════╝ ╚═════╝╚═╝╚═╝         ╚═╝  ╚═══╝╚══════╝   ╚═╝"
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed = 15) {
    for (const char of text) {
        output.innerHTML += char;
        await sleep(speed);
    }

    output.innerHTML += "\n";
    output.scrollTop = output.scrollHeight;
}

async function loadingLine(text) {
    output.innerHTML += text;

    for (let i = 0; i < 3; i++) {
        await sleep(350);
        output.innerHTML += ".";
        output.scrollTop = output.scrollHeight;
    }

    await sleep(250);

    output.innerHTML += " [OK]\n";
    output.scrollTop = output.scrollHeight;
}

async function boot() {

    // Draw logo line-by-line and character-by-character
    for (const line of logo) {
        await typeText(line, 1);
        await sleep(50);
    }

    await sleep(300);

    output.innerHTML += "\n";

    await typeText("Secure Containment Information Processing Network", 8);

    output.innerHTML += "\n";

    await loadingLine("Initializing SCiP.NET");
    await loadingLine("Loading Foundation Core Services");
    await loadingLine("Loading Personnel Database");
    await loadingLine("Loading Incident Archive");
    await loadingLine("Loading Authentication Services");
    await loadingLine("Loading Internal Communications");

    output.innerHTML += "\n";

    await typeText("System Ready.", 10);

    output.innerHTML += "\n";

    input.style.display = "block";
    input.focus();
}

boot();

input.addEventListener("keydown", (e) => {

    if (e.key !== "Enter") return;

    const cmd = input.value.trim();

    output.innerHTML += `> ${cmd}\n`;

    switch (cmd.toLowerCase()) {

        case "help":
            output.innerHTML +=
`Available Commands

help
version
clear

`;
            break;

        case "version":
            output.innerHTML +=
`SCiP.NET v1.0

`;
            break;

        case "clear":
            output.innerHTML = "";
            break;

        default:
            output.innerHTML +=
`Unknown Command

`;
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
});
