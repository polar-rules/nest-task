import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Mocks } from "@specs/mocks/index.js";
import { Prompts } from "@prompts/index.js";

describe("Cli::Bear::Info::Main", (): void => {
    let infoSpyOn: jest.SpiedFunction<any> | undefined;
    let promptSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Bear.Info.Main;

    afterEach((): void => {
        infoSpyOn?.mockReset();
        promptSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            infoSpyOn = jest.spyOn(Cli.Core.Info.Start.prototype, "run").mockImplementation(() => Promise.resolve());
            promptSpyOn = jest.spyOn(Prompts.ProjectName.prototype, "run").mockImplementation(() => Promise.resolve());

            Mocks.Inquirer.mock({
                projectName: "project",
            });

            const subject = new Subject();

            jest.spyOn(subject["projectName"], "run").mockImplementation(() => Promise.resolve());

            await subject.run();

            expect(infoSpyOn).toHaveBeenCalledTimes(1);
        });
    });
});
