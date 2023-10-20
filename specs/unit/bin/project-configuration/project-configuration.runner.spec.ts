import { Bin } from "@bin/index.js";
import { Core } from "@core/index.js";

describe("Bin::ProjectConfiguration::Runner", (): void => {
    const subject: typeof Bin.ProjectConfiguration.Runner = Bin.ProjectConfiguration.Runner;

    xit("Should successfully exit process", (): void => {
        const spyOnReadAndLoad = jest
            .spyOn(Core.ProjectConfiguration.Main.prototype, "readAndLoad")
            .mockReturnValue(<any>true);
        const spyOnProcess = jest.spyOn(process, "exit");

        subject();

        expect(spyOnProcess).toBeCalledWith(0);

        spyOnReadAndLoad.mockClear();
        spyOnProcess.mockClear();
    });

    it("Should stop process with status 1 when error raised", (): void => {
        const spyOnReadAndLoad = jest
            .spyOn(Core.ProjectConfiguration.Main.prototype, "readAndLoad")
            .mockImplementation(() => {
                throw new Error();
            });
        const spyOnProcess = jest.spyOn(process, "exit");

        subject();

        expect(spyOnProcess).toBeCalledWith(1);

        spyOnReadAndLoad.mockClear();
        spyOnProcess.mockClear();
    });
});
