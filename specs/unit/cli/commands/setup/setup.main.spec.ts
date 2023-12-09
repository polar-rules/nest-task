import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";
import { Core } from "@core/index.js";

describe("Cli::Command::Setup::Main", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Commands.Setup.Main;

    afterEach((): void => {
        spyOn?.mockReset();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            spyOn = jest.spyOn(Cli.Core.Setup.prototype, "run").mockImplementation(() => Promise.resolve());

            const subject = new Subject(
                "projectExample",
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );

            await subject.run();

            expect(spyOn).toHaveBeenCalledTimes(1);
        });
    });
});
