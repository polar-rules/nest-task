import { _Generate } from "./generate/index.js";
import { _Enums } from "./dev.enums.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        console.error("Command is missing");
        process.exit(1);
    }

    switch (command) {
        case _Enums.Commands.Generate:
            await _Generate.Runner();
            break;
    }
}
