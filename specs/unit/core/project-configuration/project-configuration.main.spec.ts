import mockFS from "mock-fs";

import { Core } from "@core/index.js";

describe("Core::ProjectConfiguration::Main", (): void => {
    const Subject: typeof Core.ProjectConfiguration.Main = Core.ProjectConfiguration.Main;

    describe("#readAndLoad", (): void => {
        it("Should read and load config when projects are present", async (): Promise<void> => {
            const readNestjsConfiguration = new Core.ReadNestjsConfiguration();
            const expectations: Core.Types.ApproximateNativeConfiguration = {
                projects: {
                    valid: {
                        type: "application",
                        root: "src",
                        entryFile: "main",
                        sourceRoot: "src",
                    },
                },
            };

            const subject = new Subject();

            mockFS({
                [readNestjsConfiguration.configurationPath]: JSON.stringify(expectations),
            });

            await subject.readAndLoad();

            expect(subject["config"]).toEqual(expectations);
        });

        it("Should fallback to default config when projects are missing", async (): Promise<void> => {
            const readNestjsConfiguration = new Core.ReadNestjsConfiguration();
            const expectations = Core.ProjectConfiguration.Constants.defaultConfig;

            const subject = new Subject();

            mockFS({
                [readNestjsConfiguration.configurationPath]: JSON.stringify({}),
            });

            await subject.readAndLoad();

            expect(subject["config"]).toEqual(expectations);
        });
    });
});
