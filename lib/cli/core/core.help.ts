import { Messages } from "@messages/index.js";
import { Core } from "@core/index.js";
import { Patches } from "@patches/index.js";
/**
 * Class responsible for displaying help information about the @polar-rules/nest-task CLI.
 *
 * @class _Help
 */
export class _Help {
    /**
     * Creates an instance of _Help.
     *
     * @constructor
     */
    public constructor() {}

    /**
     * Runs the process of displaying help information.
     *
     * @returns {Promise<void>}
     */
    public async run(): Promise<void> {
        const emptyString = new Patches.String(" ");

        console.info(Messages.Chalk.cyan("Thank you for using @polar-rules/nest-task!"));

        console.info();

        console.info(
            "@polar-rules/nest-task is supplied with 2 versions of CLI, basic commands and interactive assistant.",
        );

        console.info();

        console.info("Basic syntax:");
        console.info();
        console.info(Messages.Chalk.cyan("nest-task <command>"));
        console.info();

        console.info("Commands:");
        console.info();
        console.info(Messages.Chalk.cyan("nest-task help"));
        console.info("List of available commands, AKA this prompt");
        console.info();

        console.info(Messages.Chalk.cyan("nest-task bear"));
        console.info(
            "Interactive assistant. Can perform the same actions as basic commands but in more human friendly way.",
        );
        console.info();

        console.info(Messages.Chalk.cyan("nest-task info --project-name <project-name>"));
        console.info("Provide a list of tasks names and description.");
        console.info();
        console.info(emptyString.times(3), Messages.Chalk.cyan("<project-name>"), emptyString.times(10), "Optional.");
        console.info(
            emptyString.times(28),
            "In case your",
            Messages.Chalk.cyan("`nest-cli.json`"),
            "have",
            Messages.Chalk.cyan("`projects`"),
            "key defined.",
        );
        console.info();

        console.info(Messages.Chalk.cyan("nest-task run --projectName <project-name> --name <name> <other-argument>"));
        console.info("Execute the task, can be found by name");
        console.info();
        console.info(emptyString.times(3), Messages.Chalk.cyan("<project-name>"), emptyString.times(10), "Optional.");
        console.info(
            emptyString.times(28),
            "In case your",
            Messages.Chalk.cyan("`nest-cli.json`"),
            "have",
            Messages.Chalk.cyan("`projects`"),
            "key defined.",
        );
        console.info(emptyString.times(28), "This argument should come first before name of the task");
        console.info(emptyString.times(3), Messages.Chalk.cyan("<other-arguments>"), emptyString.times(7), "Optional.");
        console.info(
            emptyString.times(28),
            "In case your you need to pass additional arguments to your task you can easily achieve this with same syntax as you pass <name>",
        );
        console.info(emptyString.times(28), "For example:");
        console.info(emptyString.times(28), Messages.Chalk.cyan('--userId 3 --bio "I\'m awesome"'));
        console.info(emptyString.times(3), Messages.Chalk.cyan("<name>"), emptyString.times(18), "Required.");
        console.info(
            emptyString.times(28),
            "Name of the task defined in",
            Messages.Chalk.cyan("@Decorators.Task"),
            Messages.Chalk.cyan("`name`"),
            "key",
        );
        console.info();

        console.info(
            Messages.Chalk.cyan(
                "nest-task create --projectName <project-name> --name <name> --description <description>",
            ),
        );
        console.info(
            "Run this command as a generator to create task boilerplate, that includes",
            Messages.Chalk.cyan("@Decorators.Runner"),
            "and",
            Messages.Chalk.cyan("@Decorators.Task."),
        );
        console.info();
        console.info(emptyString.times(3), Messages.Chalk.cyan("<project-name>"), emptyString.times(10), "Optional.");
        console.info(
            emptyString.times(28),
            "In case your",
            Messages.Chalk.cyan("`nest-cli.json`"),
            "have",
            Messages.Chalk.cyan("`projects`"),
            "key defined.",
        );
        console.info(emptyString.times(3), Messages.Chalk.cyan("<name>"), emptyString.times(18), "Required.");
        console.info(
            emptyString.times(28),
            "Expect to receive a task name, which should converted to file name and class name.",
        );
        console.info(emptyString.times(3), Messages.Chalk.cyan("<description>"), emptyString.times(11), "Required.");
        console.info(
            emptyString.times(28),
            "Short description of task. In case if it's a long sentence use",
            Messages.Chalk.cyan('`"`'),
            "to screen it.",
        );
        console.info(emptyString.times(28), "For example:");
        console.info(emptyString.times(28), Messages.Chalk.cyan('--description "The task example"'));
        console.info();

        console.info(Messages.Chalk.cyan("nest-task setup --projectName <project-name> --convention <convention>"));
        console.info(
            "Used in purpose to run first initial setup of the",
            Messages.Chalk.cyan("@polar-rules/nest-task."),
        );
        console.info(
            "Performs 3 basic actions: modify",
            Messages.Chalk.cyan("`nest-cli.json`,"),
            "creates an entrypoint for tasks to run and creates an example of task.",
        );
        console.info();
        console.info(emptyString.times(3), Messages.Chalk.cyan("<project-name>"), emptyString.times(10), "Optional.");
        console.info(
            emptyString.times(28),
            "In case your",
            Messages.Chalk.cyan("`nest-cli.json`"),
            "have",
            Messages.Chalk.cyan("`projects`"),
            "key defined.",
        );
        console.info(emptyString.times(3), Messages.Chalk.cyan("<convention>"), emptyString.times(12), "Required.");
        console.info(
            emptyString.times(28),
            "Specify naming convention for files and classes. Options are",
            Object.values(Core.ProjectConfiguration.Constants.convention).join(", "),
        );
    }
}
