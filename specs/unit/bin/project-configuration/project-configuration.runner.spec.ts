import { jest } from "@jest/globals";

import { Bin } from "@bin/index.js";
import { Core } from "@core/index.js";

describe("Bin::ProjectConfiguration::Runner", (): void => {
    let readAndLoadSpy: jest.SpiedFunction<any> | undefined;
    let exitSpy: jest.SpiedFunction<any> | undefined;

    const subject = Bin.ProjectConfiguration.Runner;

    beforeEach((): void => {
        exitSpy = <jest.SpiedFunction<any>>jest.spyOn(process, "exit");
    });

    afterEach((): void => {
        readAndLoadSpy?.mockReset();
        exitSpy?.mockReset();
    });

    xit("Should successfully exit process", (): void => {
        readAndLoadSpy = jest.spyOn(Core.ProjectConfiguration.Main.prototype, "readAndLoad").mockReturnValue(<any>true);

        subject();
        expect(exitSpy).toBeCalledWith(0);
    });

    it("Should stop process with status 1 when error raised", (): void => {
        readAndLoadSpy = jest.spyOn(Core.ProjectConfiguration.Main.prototype, "readAndLoad").mockImplementation(() => {
            throw new Error();
        });

        subject();
        expect(exitSpy).toBeCalledWith(1);
    });
});
