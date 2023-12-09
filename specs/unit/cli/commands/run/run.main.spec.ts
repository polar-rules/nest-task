import { jest } from "@jest/globals";

import { Cli } from "@cli/index.js";

describe("Cli::Command::Run::Main", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Cli.Commands.Run.Main;

    afterEach((): void => {
        spyOn?.mockReset();
    });

    describe("#run", (): void => {
        it("Should call CLI", async (): Promise<void> => {
            spyOn = jest.spyOn(Cli.Core.Run.prototype, "run").mockImplementation(() => Promise.resolve());

            const subject = new Subject("moduleNameExample", "descriptionExample", {});

            await subject.run();

            expect(spyOn).toHaveBeenCalledTimes(1);
        });
    });
});
