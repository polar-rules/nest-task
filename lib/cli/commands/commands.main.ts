import * as chalk from "chalk";

import { _Help } from "./help/index.js";
import { _Info } from "./info/index.js";
import { _Create } from "./create/index.js";
import { _Run } from "./run/index.js";
import { _Setup } from "./setup/index.js";
import { _Types } from "./commands.types.js";
import { _Enums } from "./commands.enums.js";

export class _Main {
    public constructor(
        private readonly command: _Enums.Commands,
        private readonly otherArguments?: _Types.OtherArguments,
    ) {}

    public async run(): Promise<void> {
        switch (this.command) {
            case _Enums.Commands.Help:
                await new _Help.Main().run();
                break;
            case _Enums.Commands.Setup:
                await new _Setup.Main(this.otherArguments?.projectName).run();
                break;
            case _Enums.Commands.Create:
                if (!this.otherArguments) {
                    console.error(
                        chalk.default.red("Missing arguments. Please use `nest-task help` for more information"),
                    );
                    process.exit(1);
                }

                if (!("name" in this.otherArguments)) {
                    console.error(chalk.default.red("You need to pass `--name` name as an argument."));
                    process.exit(1);
                }

                if (!("description" in this.otherArguments)) {
                    console.error(chalk.default.red("You need to pass `--description` name as an argument."));
                    process.exit(1);
                }

                await new _Create.Main(
                    this.otherArguments?.name,
                    this.otherArguments?.description,
                    this.otherArguments?.projectName,
                ).run();
                break;
            case _Enums.Commands.Run:
                if (!this.otherArguments) {
                    console.error(
                        chalk.default.red("Missing arguments. Please use `nest-task help` for more information"),
                    );
                    process.exit(1);
                }

                if (!("name" in this.otherArguments)) {
                    console.error(chalk.default.red("You need to pass `--name` name as an argument."));
                    process.exit(1);
                }

                await new _Run.Main(this.otherArguments?.name, this.otherArguments?.projectName).run();
                break;
            case _Enums.Commands.Info:
                await new _Info.Main(this.otherArguments?.projectName).run();
                break;
        }
    }
}
