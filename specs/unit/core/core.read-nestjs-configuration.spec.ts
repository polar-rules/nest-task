import mockFS from "mock-fs";

import { Core } from "@core/index.js";

describe("Core::ReadNestjsConfiguration", (): void => {
    const Subject = Core.ReadNestjsConfiguration;

    describe("#configurationPath", (): void => {
        it("Should return path to `nest-cli.json`", (): void => {
            const subject = new Subject();

            expect(subject.configurationPath.includes("nest-cli.json")).toBeTruthy();
        });
    });

    describe("#configurationPath", (): void => {
        it("Should read `nest-cli.json", async (): Promise<void> => {
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
                [subject.configurationPath]: JSON.stringify(expectations),
            });

            const results = await subject.read();

            expect(results).toEqual(expectations);
        });
    });
});
