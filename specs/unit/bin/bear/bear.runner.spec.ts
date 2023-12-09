import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";
import { Cli } from "@cli/index.js";

describe("Bin::Bear::Runner", (): void => {
    let spyOn: jest.SpiedFunction<any> | undefined;

    const Subject = Bin.Bear.Runner;

    afterEach((): void => {
        spyOn?.mockClear();
    });

    it("Should call Cli", async (): Promise<void> => {
        spyOn = jest.spyOn(Cli.Bear.Main.prototype, "run").mockImplementation(() => Promise.resolve());

        await Subject();

        expect(spyOn).toBeCalledTimes(1);
    });
});
