import mockFS from "mock-fs";

import { Core } from "@core/index.js";

describe("Core::ProjectConfiguration::Read", (): void => {
    const Subject = Core.ProjectConfiguration.Read;

    describe("#configurationPath", (): void => {
        it("Should return path to `nest-cli.json`", (): void => {
            const subject = new Subject();

            expect(subject.configurationPath.includes("nest-cli.json")).toBeTruthy();
        });
    });

    describe("#resolveConfiguration", (): void => {
        it("Should resolve configuration by `projectName`", async (): Promise<void> => {
            const expectations: Core.ProjectConfiguration.Types.Configuration.ApproximateProject = {
                type: "application",
                root: "src",
                entryFile: "main",
                sourceRoot: "src",
            };
            const config: Core.ProjectConfiguration.Types.Configuration.Approximate = {
                projects: {
                    valid: expectations,
                },
            };
            const subject = new Subject("valid");

            mockFS({
                [subject.configurationPath]: JSON.stringify(config),
            });

            await subject.run();

            expect(subject.resolveConfiguration).toEqual(expectations);
        });

        it("Should resolve configuration to root when `projectName` is missing", async (): Promise<void> => {
            const expectations: Core.ProjectConfiguration.Types.Configuration.Approximate = {
                task: {
                    path: "test-path",
                    entryPoint: "test-entrypoint.ts",
                },
            };
            const subject = new Subject("valid");

            mockFS({
                [subject.configurationPath]: JSON.stringify(expectations),
            });

            await subject.run();

            expect(subject.resolveConfiguration).toEqual(expectations);
        });

        it("Should throw error when `project` key is present but `projectName` is missing", async (): Promise<void> => {
            const config: Core.ProjectConfiguration.Types.Configuration.Approximate = {
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
                [subject.configurationPath]: JSON.stringify(config),
            });

            await subject.run();

            expect(() => subject.resolveConfiguration).toThrow(Core.ProjectConfiguration.Errors.ProjectNameIsRequired);
        });
    });

    describe("#run", (): void => {
        it("Should read `nest-cli.json", async (): Promise<void> => {
            const expectations: Core.ProjectConfiguration.Types.Configuration.Approximate = {
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

            await subject.run();

            expect(subject.configuration).toEqual(expectations);
        });
    });
});
