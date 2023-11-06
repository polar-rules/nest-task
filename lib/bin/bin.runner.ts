import { _Command } from "./command/index.js";
import { _Jarvis } from "./jarvis/index.js";
import { _Enums } from "./bin.enums.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        console.error("Command is missing");
        process.exit(1);
    }

    switch (command) {
        case _Enums.Commands.Jarvis:
            await _Jarvis.Runner();
            break;
        default:
            await _Command.Runner();
            break;
    }
}
