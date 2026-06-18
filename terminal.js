const output = document.getElementById("output");
const input = document.getElementById("command");

input.style.display = "none";

const bootSequence = [
`███████╗ ██████╗██╗██████╗     ███╗   ██╗███████╗████████╗
██╔════╝██╔════╝██║██╔══██╗    ████╗  ██║██╔════╝╚══██╔══╝
███████╗██║     ██║██████╔╝    ██╔██╗ ██║█████╗     ██║
╚════██║██║     ██║██╔═══╝     ██║╚██╗██║██╔══╝     ██║
███████║╚██████╗██║██║         ██║ ╚████║███████╗   ██║
╚══════╝ ╚═════╝╚═╝╚═╝         ╚═╝  ╚═══╝╚══════╝   ╚═╝`,

"",
"Secure Containment Information Processing Network",
"",
"Initializing SCiP.NET...",
"Loading Foundation Core Services...",
"Loading Personnel Database...",
"Loading Incident Archive...",
"Loading Authentication Services...",
"",
"[ OK ] Personnel Services",
"[ OK ] Records Archive",
"[ OK ] Authentication System",
"[ OK ] Internal Communications",
"",
"System Ready.",
"",
"Type 'help'",
""
];

let line = 0;

function boot() {
    if (line >= bootSequence.length) {
        input.style.display = "block";
        input.focus();
        return;
    }

    output.innerHTML += bootSequence[line] + "\n";
    output.scrollTop = output.scrollHeight;

    line++;

    setTimeout(boot, 250);
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
