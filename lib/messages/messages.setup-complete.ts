import { _Chalk } from "./messages.chalk.js";

import { _Types } from "./messages.types.js";

export function _SetupComplete({ space }: _Types.SetupComplete.Options): void {
    console.info(_Chalk.green("Your projects setup is completed!"));

    if (!space) {
        return;
    }

    console.info("");
}
