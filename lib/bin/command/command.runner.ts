import * as chalk from "chalk";

import { Cli } from "@cli/index.js";
import { Patches } from "@patches/index.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        console.error(chalk.default.red("Command is missing!"));
        console.info();
        console.info(chalk.default.gray("Call `npx nest-task help` for additional information."));

        process.exit(1);
    }

    const otherArguments = process.argv.slice(3);
    const argumentKeys = otherArguments.filter((item: string): boolean => item.includes("--"));
    const keyValuePair = argumentKeys.map((key: string): [string, string] => {
        const indexOfArgument = otherArguments.indexOf(key);
        const value = otherArguments[indexOfArgument + 1];

        if (!value) {
            console.error(`Cannot find value for argument \`${key}\`.`);
            process.exit(1);
        }

        const patchedKey = new Patches.String(key.replace("--", ""));

        return [patchedKey.toCamelCase().toString(), value];
    });

    const mappedArray = new Map<string, string>(keyValuePair);
    const mappedArguments = Object.fromEntries(mappedArray);

    await new Cli.Commands.Main(<Cli.Commands.Enums.Commands>command, mappedArguments).run();
}
