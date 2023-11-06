import * as chalk from "chalk";

import { Patches } from "@patches/index.js";

export class _Main {
    public constructor() {}

    public async run(): Promise<void> {
        const emptyString = new Patches.String(" ");

        console.info(chalk.default.cyan("Thank you for using @bear-hugs/nest-task!"));

        console.info();

        console.info("@bear-hugs/nest-task is supplied with 2 versions of CLI, basic commands");
        console.info("and interactive assistant.");

        console.info();

        console.info("Basic syntax:");
        console.info(chalk.default.cyan("nest-task <command>"));
        console.info();

        console.info("Commands:");
        console.info(
            chalk.default.cyan("nest-task help"),
            emptyString.times(31),
            "List of available commands, AKA this prompt",
        );
        console.info();

        console.info(
            chalk.default.cyan("nest-task jarvis"),
            emptyString.times(29),
            "Interactive assistant. Can perform the same actions as basic commands",
        );
        console.info(emptyString.times(46), "but in more human friendly way.");
        console.info();

        console.info(
            chalk.default.cyan("nest-task info <project-name>"),
            emptyString.times(16),
            "Provide a list of tasks names and description",
        );
        console.info(
            emptyString.times(3),
            chalk.default.cyan("<project-name>"),
            emptyString.times(28),
            "Optional.",
            "In case your `nest-cli.json` have `projects` key defined.",
        );
        console.info();

        console.info(
            chalk.default.cyan("nest-task run <project-name> <task-name>"),
            emptyString.times(5),
            "Execute the task, can be found by name",
        );
        console.info(
            emptyString.times(3),
            chalk.default.cyan("<project-name>"),
            emptyString.times(28),
            "Optional.",
            "In case your `nest-cli.json` have `projects` key defined.",
        );
        console.info(emptyString.times(46), "This argument should come first before name of the task");
        console.info(
            emptyString.times(3),
            chalk.default.cyan("<task-name>"),
            emptyString.times(31),
            "Required.",
            "Name of the task defined in @Decorators.Task `name` key",
        );
        console.info();

        console.info(
            chalk.default.cyan("nest-task setup <project-name>"),
            emptyString.times(15),
            "Used in purpose to run first initial setup of the @bear-hugs/nest-task.",
        );
        console.info(emptyString.times(46), "Performs 3 basic actions: modify `nest-cli.json`, creates an entrypoint");
        console.info(emptyString.times(46), "for tasks to run and creates an example of task.");
        console.info(
            emptyString.times(3),
            chalk.default.cyan("<project-name>"),
            emptyString.times(28),
            "Optional.",
            "In case your `nest-cli.json` have `projects` key defined.",
        );
    }
}
