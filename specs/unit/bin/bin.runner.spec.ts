import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";

describe("Bin::Runner", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Runner;

    afterEach((): void => {
        spyOn?.mockClear();
    });

    it("Should exit with an error message when no command is provided", async (): Promise<void> => {
        delete process.argv[2];

        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should execute _Command.Runner when the command is not recognized", async (): Promise<void> => {
        process.argv[2] = "unknownCommand";
        spyOn = jest.spyOn(Bin.Command, "Runner").mockImplementation(() => Promise.resolve());

        await Subject();

        expect(spyOn).toHaveBeenCalledTimes(1);
    });

    it("Should execute _Bear.Runner when the command is _Enums.Commands.Bear", async (): Promise<void> => {
        process.argv[2] = Bin.Enums.Commands.Bear;
        spyOn = jest.spyOn(Bin.Bear, "Runner").mockImplementation(() => Promise.resolve());

        await Subject();
        expect(spyOn).toHaveBeenCalledTimes(1);
    });
});
