import { Interfaces } from "@interfaces/index.js";
import { Messages } from "@messages/index.js";

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
        private readonly args?: _Types.Args,
    ) {}

    public async run(): Promise<void> {
        switch (this.command) {
            case _Enums.Commands.Help:
                await new _Help.Main().run();
                break;
            case _Enums.Commands.Setup:
                if (!this.args) {
                    Messages.Errors.Missing.Arguments();
                }

                if (!Interfaces.InstanceOf<_Setup.Types.ExpectedArguments>(this.args, "convention")) {
                    Messages.Errors.Missing.Argument(["convention"]);
                }

                await new _Setup.Main(this.args.projectName, this.args.convention).run();
                break;
            case _Enums.Commands.Create:
                if (!this.args) {
                    Messages.Errors.Missing.Arguments();
                }

                if (!Interfaces.InstanceOf<_Create.Types.ExpectedArguments>(this.args, "description")) {
                    Messages.Errors.Missing.Argument(["name", "description"]);
                }

                await new _Create.Main(this.args?.name, this.args?.description, this.args?.projectName).run();
                break;
            case _Enums.Commands.Run:
                if (!this.args) {
                    Messages.Errors.Missing.Arguments();
                }

                if (!Interfaces.InstanceOf<_Run.Types.ExpectedArguments>(this.args, "name")) {
                    Messages.Errors.Missing.Argument(["name"]);
                }

                const { name: taskName, projectName, ...otherArguments } = this.args;

                await new _Run.Main(taskName, projectName, otherArguments).run();
                break;
            case _Enums.Commands.Info:
                await new _Info.Main(this.args?.projectName).run();
                break;
            default:
                Messages.Errors.Missing.Command();
        }
    }
}
