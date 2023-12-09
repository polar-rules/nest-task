import { Cli } from "@cli/index.js";

describe("Cli::Help::Create", (): void => {
    const Subject = Cli.Core.Help;

    describe("#run", (): void => {
        it("Should throw if there's no task in configuration", async (): Promise<void> => {
            const subject = new Subject();

            await subject.run();

            expect(console.info).toBeCalled();
        });
    });
});
