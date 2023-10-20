import path from "node:path";
import mockFS from "mock-fs";

import { Core } from "@core/index.js";
import { Tools } from "@tools/index.js";

describe("Core::ProjectConfiguration::Main", (): void => {
    const Subject: typeof Core.ProjectConfiguration.Main = Core.ProjectConfiguration.Main;

    describe("#readAndLoad", (): void => {
        const root = Tools.PathManager.Main.instance.projectRoot;
        const configFilePath = path.join(root, Core.ProjectConfiguration.Constants.configurationFile);

        it("Should read and load config when projects are present", async (): Promise<void> => {
            const expectations: Core.ProjectConfiguration.Types.ApproximateConfiguration = {
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
                [configFilePath]: JSON.stringify(expectations),
            });

            await subject.readAndLoad();

            expect(subject["config"]).toEqual(expectations);
        });

        it("Should fallback to default config when projects are missing", async (): Promise<void> => {
            const expectations = Core.ProjectConfiguration.Constants.defaultConfig;

            const subject = new Subject();

            mockFS({
                [configFilePath]: JSON.stringify({}),
            });

            await subject.readAndLoad();

            expect(subject["config"]).toEqual(expectations);
        });
    });
});
