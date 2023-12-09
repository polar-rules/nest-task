import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Mocks } from "@specs/mocks/index.js";
import { Prompts } from "@prompts/index.js";

describe("Cli::Bear::Create::Main", (): void => {
    let createSpyOn: jest.SpiedFunction<any> | undefined;
    let promptSpyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Bear.Create.Main;

    afterEach((): void => {
        createSpyOn?.mockReset();
        promptSpyOn?.mockReset();
        Mocks.Inquirer.clean();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            createSpyOn = jest.spyOn(Cli.Core.Create.prototype, "run").mockImplementation(() => Promise.resolve());
            promptSpyOn = jest.spyOn(Prompts.ProjectName.prototype, "run").mockImplementation(() => Promise.resolve());

            Mocks.Inquirer.mock({
                moduleName: "ExampleName",
                moduleDescription: "ExampleDescription",
            });

            const subject = new Subject();

            await subject.run();

            expect(createSpyOn).toHaveBeenCalledTimes(1);
        });
    });
});
