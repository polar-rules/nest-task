import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";

describe("Bin::Dev::Generate::Jest::Runner", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Dev.Generate.Jest.Runner;

    afterEach((): void => {
        spyOn?.mockClear();
    });

    it("Should exit with an error message when no command is provided", async (): Promise<void> => {
        delete process.argv[4];
        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should not throw when command is not foun", async (): Promise<void> => {
        process.argv[4] = "unknownCommand";
        expect(() => Subject()).not.toThrow();
    });

    it("Should call config", async (): Promise<void> => {
        spyOn = jest.spyOn(Bin.Dev.Generate.Jest.Config, "Runner").mockImplementation(() => Promise.resolve());
        process.argv[4] = Bin.Dev.Generate.Jest.Enums.Commands.Config;

        await Subject();
        expect(spyOn).toBeCalledTimes(1);
    });
});
