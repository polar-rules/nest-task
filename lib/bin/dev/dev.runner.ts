import { Messages } from "@messages/index.js";

import { _Generate } from "./generate/index.js";
import { _Enums } from "./dev.enums.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        Messages.Dev.Errors.Missing.Command("first");
    }

    switch (command) {
        case _Enums.Commands.Generate:
            await _Generate.Runner();
            break;
    }
}
