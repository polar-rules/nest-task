import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";
import { Cli } from "@cli/index.js";

describe("Bin::Command::Runner", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Command.Runner;

    afterEach((): void => {
        spyOn?.mockClear();
    });

    it("Should exit with an error message when no command is provided", async (): Promise<void> => {
        delete process.argv[2];

        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should exit with an error message when arguments supplied without value", async (): Promise<void> => {
        (<any>process.argv[3]) = "test";
        (<any>process.argv[4]) = "--argumentWithoutValue";

        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should call Cli", async (): Promise<void> => {
        (<any>process.argv[3]) = "test";
        (<any>process.argv[4]) = "--arg";
        (<any>process.argv[5]) = "value";

        spyOn = jest.spyOn(Cli.Commands.Main.prototype, "run").mockImplementation(() => Promise.resolve());

        await Subject();

        expect(spyOn).toBeCalledTimes(1);
    });
});
