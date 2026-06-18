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

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function print(text) {
    output.innerHTML += text + "\n";
    output.scrollTop = output.scrollHeight;
}

async function loadingLine(text) {
    output.innerHTML += text;

    for (let i = 0; i < 3; i++) {
        await sleep(400);
        output.innerHTML += ".";
    }

    await sleep(200);
    output.innerHTML += " [OK]\n";
}

async function boot() {

    // Logo loads line by line
    for (const line of logo) {
        await print(line);
        await sleep(120);
    }

    await print("");
    await print("Secure Containment Information Processing Network");
    await print("");

    await loadingLine("Initializing SCiP.NET");
    await loadingLine("Loading Foundation Core Services");
    await loadingLine("Loading Personnel Database");
    await loadingLine("Loading Incident Archive");
    await loadingLine("Loading Authentication Services");

    await print("");
    await print("System Ready.");
    await print("");

    input.style.display = "block";
    input.focus();
}

boot();

input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const cmd = input.value.trim();

    output.innerHTML += "> " + cmd + "\n";

    switch (cmd.toLowerCase()) {
        case "help":
            output.innerHTML +=
                "help\nversion\nclear\n";
            break;

        case "version":
            output.innerHTML +=
                "SCiP.NET v1.0\n";
            break;

        case "clear":
            output.innerHTML = "";
            break;

        default:
            output.innerHTML +=
                "Unknown Command\n";
    }

    input.value = "";
});
