import { _Assembler } from "./assembler/index.js";
import { _Jest } from "./jest/index.js";
import { _Enums } from "./generate.enums.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(3);

    if (!command) {
        console.error("Command is missing");
        process.exit(1);
    }

    switch (command) {
        case _Enums.Commands.Assembler:
            await _Assembler.Runner();
            break;
        case _Enums.Commands.Jest:
            await _Jest.Runner();
            break;
    }
}
