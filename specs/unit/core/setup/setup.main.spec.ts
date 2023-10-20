import mockFS from "mock-fs";

import { Core } from "@core/index.js";

describe("Core::Setup::Main", (): void => {
    const Subject = Core.Setup.Main;

    describe("#write", (): void => {
        it("Should write configuration to `nest-cli.json`", async (): Promise<void> => {
            const readNestjsConfiguration = new Core.ReadNestjsConfiguration();
            const subject = new Subject();
            const defaultConfig: Core.Types.ApproximateNativeConfiguration = {
                projects: {
                    valid: {
                        type: "application",
                        root: "src",
                        entryFile: "main",
                        sourceRoot: "src",
                    },
                },
            };

            mockFS({
                [readNestjsConfiguration.configurationPath]: JSON.stringify(defaultConfig),
            });

            await subject.write();

            const configuration = await readNestjsConfiguration.read();
            const keys = Object.keys(configuration);

            expect(keys.includes("task")).toBeTruthy();
        });
    });
});
