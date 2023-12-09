import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";

describe("Bin::Dev::Runner", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Dev.Runner;

    afterEach((): void => {
        spyOn?.mockClear();
    });

    it("Should exit with an error message when no command is provided", async (): Promise<void> => {
        delete process.argv[2];

        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should not throw when command is not foun", async (): Promise<void> => {
        process.argv[2] = "unknownCommand";
        expect(() => Subject()).not.toThrow();
    });

    it("Should call runner", async (): Promise<void> => {
        spyOn = jest.spyOn(Bin.Dev.Generate, "Runner").mockImplementation(() => Promise.resolve());
        process.argv[2] = Bin.Dev.Enums.Commands.Generate;

        await Subject();
        expect(spyOn).toBeCalledTimes(1);
    });
});
