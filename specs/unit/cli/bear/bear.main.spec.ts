import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Mocks } from "@specs/mocks/index.js";

describe("Cli::Bear::Main", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Bear.Main;

    afterEach((): void => {
        spyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        for (const action of [
            { action: Cli.Bear.Enums.Actions.Setup, klass: Cli.Bear.Setup },
            { action: Cli.Bear.Enums.Actions.Run, klass: Cli.Bear.Run },
            { action: Cli.Bear.Enums.Actions.Create, klass: Cli.Bear.Create },
            { action: Cli.Bear.Enums.Actions.Info, klass: Cli.Bear.Info },
        ]) {
            it(`Should run the ${action.action} task based on the selected action`, async (): Promise<void> => {
                spyOn = jest.spyOn(action.klass.Main.prototype, "run").mockImplementation(() => Promise.resolve());

                Mocks.Inquirer.mock({
                    action: action.action,
                });

                const subject = new Subject();

                await subject.run();

                expect(spyOn).toHaveBeenCalledTimes(1);
            });
        }
    });
});
