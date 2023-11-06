import * as chalk from "chalk";

import { Cli } from "@cli/index.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);
    const projectName = process.argv.at(3);
    const task = process.argv.at(projectName ? 4 : 3);

    if (!command) {
        console.error(chalk.default.red("Command is missing"));
        console.info("Example of command:");
        console.info(chalk.default.gray("npx bear-hugs:task run add-users"));

        process.exit(1);
    }

    await new Cli.Commands.Main(<Cli.Commands.Enums.Commands>command, projectName, task).run();
}
