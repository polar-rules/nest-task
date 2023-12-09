import { Interfaces } from "@interfaces/index.js";
import { Messages } from "@messages/index.js";

import { _Help } from "./help/index.js";
import { _Info } from "./info/index.js";
import { _Create } from "./create/index.js";
import { _Run } from "./run/index.js";
import { _Setup } from "./setup/index.js";

import { _Types } from "./commands.types.js";
import { _Enums } from "./commands.enums.js";

/**
 * Main class for handling command-line commands and their associated tasks.
 * It handles only input coming from CLI.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of _Main.
     *
     * @constructor
     * @param {_Enums.Commands} command - The specified command.
     * @param {_Types.Args} [args] - Optional arguments associated with the command.
     */
    public constructor(
        private readonly command: _Enums.Commands,
        private readonly args?: _Types.Args,
    ) {}

    /**
     * Runs the main process based on the specified command and optional arguments.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the task associated with the command is complete.
     */
    public async run(): Promise<void> {
        switch (this.command) {
            case _Enums.Commands.Help:
                await new _Help.Main().run();
                break;
            case _Enums.Commands.Setup:
                if (!this.args) {
                    Messages.Errors.Missing.Arguments();
                    process.exit(1);
                }

                if (!Interfaces.InstanceOf<_Setup.Types.ExpectedArguments>(this.args, "convention")) {
                    Messages.Errors.Missing.Argument(["convention"]);
                    process.exit(1);
                }

                await new _Setup.Main(this.args.projectName, this.args.convention).run();
                break;
            case _Enums.Commands.Create:
                if (!this.args) {
                    Messages.Errors.Missing.Arguments();
                    process.exit(1);
                }

                if (!Interfaces.InstanceOf<_Create.Types.ExpectedArguments>(this.args, "description")) {
                    Messages.Errors.Missing.Argument(["name", "description"]);
                    process.exit(1);
                }

                await new _Create.Main(this.args?.name, this.args?.description, this.args?.projectName).run();
                break;
            case _Enums.Commands.Run:
                if (!this.args) {
                    Messages.Errors.Missing.Arguments();
                    process.exit(1);
                }

                if (!Interfaces.InstanceOf<_Run.Types.ExpectedArguments>(this.args, "name")) {
                    Messages.Errors.Missing.Argument(["name"]);
                    process.exit(1);
                }

                const { name: taskName, projectName, ...otherArguments } = this.args;

                await new _Run.Main(taskName, projectName, otherArguments).run();
                break;
            case _Enums.Commands.Info:
                await new _Info.Main(this.args?.projectName).run();
                break;
            default:
                Messages.Errors.Missing.Command();
                process.exit(1);
        }
    }
}
