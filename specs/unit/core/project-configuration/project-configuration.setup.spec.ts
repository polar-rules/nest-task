import * as fs from "fs/promises";
import mockFS from "mock-fs";

import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

import { _Fails } from "./fails/index.js";
import { _Helpers } from "./helpers/index.js";

describe("Core::ProjectConfiguration::Setup", (): void => {
    const Subject = Core.ProjectConfiguration.Setup;

    beforeEach((): void => {
        Mocks.FindPackageJson.Mocks.module.mockImplementation(() => Mocks.FindPackageJson.Mocks.defaultBehaviour);
    });

    afterEach((): void => {
        Mocks.FindPackageJson.clean();
    });

    describe("#run", (): void => {
        describe("When `task` is defined on root level", (): void => {
            it("Should write configuration to `nest-cli.json`", async (): Promise<void> => {
                const {
                    read,
                    subject,
                    defaultConfig,
                    entrypointTemplatePath,
                    moduleTemplatePath,
                    taskTemplatePath,
                    runnerTemplatePath,
                    indexTemplatePath,
                } = _Helpers.Setup.Root.prepare(Subject);

                mockFS({
                    [read.configurationPath]: JSON.stringify(defaultConfig),
                    [entrypointTemplatePath]: "",
                    [moduleTemplatePath]: "",
                    [taskTemplatePath]: "",
                    [runnerTemplatePath]: "",
                    [indexTemplatePath]: "",
                });

                await subject.run();
                await read.run();

                const keys = Object.keys(read.configuration);

                expect(keys.includes("task")).toBeTruthy();
            });

            it("Should write a template file", async (): Promise<void> => {
                const {
                    read,
                    subject,
                    defaultConfig,
                    entrypointTemplatePath,
                    moduleTemplatePath,
                    taskTemplatePath,
                    runnerTemplatePath,
                    indexTemplatePath,
                } = _Helpers.Setup.Root.prepare(Subject);
                const expectations = "template";

                mockFS({
                    [read.configurationPath]: JSON.stringify(defaultConfig),
                    [entrypointTemplatePath]: expectations,
                    [moduleTemplatePath]: "",
                    [taskTemplatePath]: "",
                    [runnerTemplatePath]: "",
                    [indexTemplatePath]: "",
                });

                await subject.run();
                await read.run();

                if (!read.configuration.task) {
                    _Fails.NoTask();
                }

                const main = new Core.ProjectConfiguration.Entrypoint(read.configuration.task);
                const file = await fs.readFile(main.path);

                expect(file.toString("utf-8")).toEqual(expectations);
            });
        });

        describe("When `projects` key is present", (): void => {
            it("Should write configuration to `nest-cli.json` ", async (): Promise<void> => {
                const {
                    read,
                    subject,
                    defaultConfig,
                    entrypointTemplatePath,
                    moduleTemplatePath,
                    taskTemplatePath,
                    runnerTemplatePath,
                    indexTemplatePath,
                } = _Helpers.Setup.Projects.prepare(Subject, "valid");

                mockFS({
                    [read.configurationPath]: JSON.stringify(defaultConfig),
                    [entrypointTemplatePath]: "",
                    [moduleTemplatePath]: "",
                    [taskTemplatePath]: "",
                    [runnerTemplatePath]: "",
                    [indexTemplatePath]: "",
                });

                await subject.run();
                await read.run();

                const keys = Object.keys(read.resolveConfiguration);

                expect(keys.includes("task")).toBeTruthy();
            });
        });
    });
});
