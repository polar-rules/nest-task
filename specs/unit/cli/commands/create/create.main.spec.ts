import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";

describe("Cli::Command::Create::Main", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Commands.Create.Main;

    afterEach((): void => {
        spyOn?.mockReset();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            spyOn = jest.spyOn(Cli.Core.Create.prototype, "run").mockImplementation(() => Promise.resolve());

            const subject = new Subject("moduleName", "description", "projectExample");

            await subject.run();

            expect(spyOn).toHaveBeenCalledTimes(1);
        });
    });
});
