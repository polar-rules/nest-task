// import { Core } from "@core/index.js";
//
// export async function _Runner(): Promise<void> {
//     try {
//         const main = new Core.ProjectConfiguration.Main();
//
//         await main.readAndLoad();
//
//         process.exit(0);
//     } catch (e: unknown) {
//         console.error(e);
//         process.exit(1);
//     }
// }

import { Bin } from "@bin/index.js";
import { Core } from "@core/index.js";

describe("Bin::ProjectConfiguration::Runner", (): void => {
    const subject: typeof Bin.ProjectConfiguration.Runner = Bin.ProjectConfiguration.Runner;

    it("Should read `nest-cli.json` configuration", (): void => {});

    it("Should successfully exit process", (): void => {});

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
