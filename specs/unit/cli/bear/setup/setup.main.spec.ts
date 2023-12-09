import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Mocks } from "@specs/mocks/index.js";
import { Prompts } from "@prompts/index.js";

describe("Cli::Bear::Setup::Main", (): void => {
    let setupSpyOn: jest.SpiedFunction<any> | undefined;
    let promptSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Bear.Setup.Main;

    afterEach((): void => {
        setupSpyOn?.mockReset();
        promptSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            setupSpyOn = jest.spyOn(Cli.Core.Setup.prototype, "run").mockImplementation(() => Promise.resolve());
            promptSpyOn = jest.spyOn(Prompts.ProjectName.prototype, "run").mockImplementation(() => Promise.resolve());

            Mocks.Inquirer.mock({
                projectName: "project",
            });

            const subject = new Subject();

            jest.spyOn(subject["projectName"], "run").mockImplementation(() => Promise.resolve());

            await subject.run();

            expect(setupSpyOn).toHaveBeenCalledTimes(1);
        });
    });
});
