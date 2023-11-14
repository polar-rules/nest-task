import * as chalk from "chalk";

import { _Help } from "./help/index.js";
import { _Info } from "./info/index.js";
import { _Create } from "./create/index.js";
import { _Run } from "./run/index.js";
import { _Setup } from "./setup/index.js";
import { _Types } from "./commands.types.js";
import { _Enums } from "./commands.enums.js";
import { Interfaces } from "@interfaces/index.js";

export class _Main {
    public constructor(
        private readonly command: _Enums.Commands,
        private readonly args?: _Types.Args,
    ) {}

    public async run(): Promise<void> {
        switch (this.command) {
            case _Enums.Commands.Help:
                await new _Help.Main().run();
                break;
            case _Enums.Commands.Setup:
                if (!this.args) {
                    console.error(
                        chalk.default.red("Missing arguments. Please use `nest-task help` for more information"),
                    );
                    process.exit(1);
                }

                if (!Interfaces.InstanceOf<_Setup.Types.ExpectedArguments>(this.args, "convention")) {
                    console.error(chalk.default.red("You need to pass `--convention` name as an argument."));
                    process.exit(1);
                }

                await new _Setup.Main(this.args.projectName, this.args.convention).run();
                break;
            case _Enums.Commands.Create:
                if (!this.args) {
                    console.error(
                        chalk.default.red("Missing arguments. Please use `nest-task help` for more information"),
                    );
                    process.exit(1);
                }

                if (!Interfaces.InstanceOf<_Create.Types.ExpectedArguments>(this.args, "description")) {
                    console.error(
                        chalk.default.red("You need to pass `--name` and `--description` names as an argument."),
                    );
                    process.exit(1);
                }

                await new _Create.Main(this.args?.name, this.args?.description, this.args?.projectName).run();
                break;
            case _Enums.Commands.Run:
                if (!this.args) {
                    console.error(
                        chalk.default.red("Missing arguments. Please use `nest-task help` for more information"),
                    );
                    process.exit(1);
                }

                if (!Interfaces.InstanceOf<_Run.Types.ExpectedArguments>(this.args, "name")) {
                    console.error(chalk.default.red("You need to pass `--name` name as an argument."));
                    process.exit(1);
                }

                const { name: taskName, projectName, ...otherArguments } = this.args;

                await new _Run.Main(taskName, projectName, otherArguments).run();
                break;
            case _Enums.Commands.Info:
                await new _Info.Main(this.args?.projectName).run();
                break;
        }
    }
}
