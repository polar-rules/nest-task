import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";

describe("Bin::Dev::Generate::Runner", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Dev.Generate.Runner;

    afterEach((): void => {
        spyOn?.mockClear();
    });

    it("Should exit with an error message when no command is provided", async (): Promise<void> => {
        delete process.argv[3];
        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should not throw when command is not foun", async (): Promise<void> => {
        process.argv[3] = "unknownCommand";
        expect(() => Subject()).not.toThrow();
    });

    it("Should call assembler", async (): Promise<void> => {
        spyOn = jest.spyOn(Bin.Dev.Generate.Assembler, "Runner").mockImplementation(() => Promise.resolve());
        process.argv[3] = Bin.Dev.Generate.Enums.Commands.Assembler;

        await Subject();
        expect(spyOn).toBeCalledTimes(1);
    });

    it("Should call jest", async (): Promise<void> => {
        spyOn = jest.spyOn(Bin.Dev.Generate.Jest, "Runner").mockImplementation(() => Promise.resolve());
        process.argv[3] = Bin.Dev.Generate.Enums.Commands.Jest;

        await Subject();
        expect(spyOn).toBeCalledTimes(1);
    });
});
