import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";
import { Cli } from "@cli/index.js";

describe("Bin::Dev::Assembler::Runner", (): void => {
    let configureSpyOne: jest.SpiedFunction<any> | undefined;
    let generateSpyOne: jest.SpiedFunction<any> | undefined;
    let finishSpyOne: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Dev.Generate.Assembler.Runner;

    afterEach((): void => {
        configureSpyOne?.mockClear();
        generateSpyOne?.mockClear();
        finishSpyOne?.mockClear();
    });

    it("Should exit with error Main will throw error", async (): Promise<void> => {
        configureSpyOne = jest.spyOn(Cli.Dev.Generate.Assembler.Main.prototype, "configure").mockImplementation(() => {
            throw new Error();
        });
        await Subject();

        expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("Should exit successfully Main", async (): Promise<void> => {
        configureSpyOne = jest
            .spyOn(Cli.Dev.Generate.Assembler.Main.prototype, "configure")
            .mockImplementation(() => {});
        generateSpyOne = <any>(
            jest
                .spyOn(Cli.Dev.Generate.Assembler.Main.prototype, "generate")
                .mockImplementation(() => Promise.resolve())
        );
        finishSpyOne = jest.spyOn(Cli.Dev.Generate.Assembler.Main.prototype, "finish").mockImplementation(() => {});

        await Subject();

        expect(process.exit).toHaveBeenCalledWith(0);
    });
});
