import { _Config } from "./config/index.js";
import { _Enums } from "./jest.enums.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(4);

    if (!command) {
        console.error("Command is missing");
        process.exit(1);
    }

    switch (command) {
        case _Enums.Commands.Config:
            await _Config.Runner();
            break;
    }
}
