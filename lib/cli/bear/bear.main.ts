import * as inquirer from "inquirer";

import { _Run } from "./run/index.js";
import { _Info } from "./info/index.js";
import { _Create } from "./create/index.js";
import { _Setup } from "./setup/index.js";

import { _Types } from "./bear.types.js";
import { _Enums } from "./bear.enums.js";

/**
 * Main class for handling command-line interaction and initiating Bear tasks.
 *
 * @class _Main
 */
export class _Main {
    /**
     * The selected action to perform.
     *
     * @private
     * @type {_Enums.Actions}
     */
    private action!: _Enums.Actions;

    /**
     * Runs the main process, prompting for the action and initiating the corresponding task.
     *
     * @public
     * @async
     * @returns {Promise<void>} A Promise that resolves once the selected task is complete.
     */
    public async run(): Promise<void> {
        await this.promptAction();

        switch (this.action) {
            case _Enums.Actions.Setup:
                await new _Setup.Main().run();
                break;
            case _Enums.Actions.Run:
                await new _Run.Main().run();
                break;
            case _Enums.Actions.Create:
                await new _Create.Main().run();
                break;
            case _Enums.Actions.Info:
                await new _Info.Main().run();
                break;
        }
    }

    /**
     * Prompts the user to select an action.
     *
     * @private
     * @async
     * @returns {Promise<void>} A Promise that resolves once the user selects an action.
     */
    private async promptAction(): Promise<void> {
        const response = await inquirer.default.prompt<_Types.PromptAction>({
            name: "action",
            message: "What do you want to do?",
            type: "list",
            choices: [_Enums.Actions.Info, _Enums.Actions.Run, _Enums.Actions.Create, _Enums.Actions.Setup],
        });

        this.action = response.action;
    }
}
