import * as chalk from "chalk";

import { _Help } from "./help/index.js";
import { _Info } from "./info/index.js";
import { _Run } from "./run/index.js";
import { _Setup } from "./setup/index.js";
import { _Enums } from "./commands.enums.js";

export class _Main {
    private readonly args: string[];

    public constructor(
        private readonly command: _Enums.Commands,
        private readonly projectName?: string,
        private readonly task?: string,
        ...args: string[]
    ) {
        this.args = args;
    }

    public async run(): Promise<void> {
        switch (this.command) {
            case _Enums.Commands.Help:
                await new _Help.Main().run();
                break;
            case _Enums.Commands.Setup:
                await new _Setup.Main(this.projectName).run();
                break;
            case _Enums.Commands.Run:
                if (!this.task) {
                    console.error(chalk.default.red("You need to pass `task` name as an argument."));
                    process.exit(1);
                }

                await new _Run.Main(this.task, this.projectName).run();
                break;
            case _Enums.Commands.Info:
                await new _Info.Main(this.projectName).run();
                break;
        }
    }
}
