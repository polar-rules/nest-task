import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Mocks } from "@specs/mocks/index.js";
import { Prompts } from "@prompts/index.js";

describe("Cli::Bear::Run::Main", (): void => {
    let runSpyOn: jest.SpiedFunction<any> | undefined;
    let promptSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Bear.Run.Main;

    afterEach((): void => {
        runSpyOn?.mockReset();
        promptSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            runSpyOn = jest.spyOn(Cli.Core.Run.prototype, "run").mockImplementation(() => Promise.resolve());
            promptSpyOn = jest.spyOn(Prompts.ProjectName.prototype, "run").mockImplementation(() => Promise.resolve());

            Mocks.Inquirer.mock({
                projectName: "project",
                taskName: "TaskExample",
            });

            const subject = new Subject();

            jest.spyOn(subject["projectName"], "run").mockImplementation(() => Promise.resolve());
            jest.spyOn(subject["taskName"], "run").mockImplementation(() => Promise.resolve());

            await subject.run();

            expect(runSpyOn).toHaveBeenCalledTimes(1);
        });
    });
});
