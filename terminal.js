const output = document.getElementById("output");
const input = document.getElementById("command");

input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const cmd = input.value.trim();

    output.innerHTML += "\n> " + cmd;

    switch (cmd.toLowerCase()) {
        case "help":
            output.innerHTML += "\nhelp\nversion\nclear";
            break;

        case "version":
            output.innerHTML += "\nSCiP.NET v1.0";
            break;

        case "clear":
            output.innerHTML = "";
            break;

        default:
            output.innerHTML += "\nUnknown Command";
    }

    input.value = "";
});
