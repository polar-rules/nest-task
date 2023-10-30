import { jest } from "@jest/globals";

import mockFS from "mock-fs";

import { Core } from "@core/index.js";

import { _Helpers } from "./helpers/index.js";

describe("Core::ProjectConfiguration::Main", (): void => {
    let runSpy: jest.SpiedFunction<any> | undefined;
    let taskConfiguration: jest.SpiedFunction<any> | undefined;

    const Subject = Core.ProjectConfiguration.Main;

    afterEach((): void => {
        runSpy?.mockReset();
        taskConfiguration?.mockReset();
    });

    describe("#entrypointPath", (): void => {
        it("Should return path to entrypoint", async (): Promise<void> => {
            runSpy = jest.spyOn(Core.ProjectConfiguration.Read.prototype, "run");

            const expectations = "test-project/test-path/test.ts";
            const { subject, read, config } = _Helpers.Main.prepare(Subject);

            mockFS({
                [read.configurationPath]: JSON.stringify(config),
            });

            await subject.readAndLoad();

            expect(subject.entrypointPath).toEqual(expectations);
        });

        it("Should throw an error if task configuration is missing", async (): Promise<void> => {
            taskConfiguration = jest
                .spyOn(Core.ProjectConfiguration.Read.prototype, "taskConfiguration", "get")
                .mockReturnValue(undefined);
            const { subject, read, config } = _Helpers.Main.prepare(Subject);

            mockFS({
                [read.configurationPath]: JSON.stringify(config),
            });

            await subject.readAndLoad();

            expect(() => subject.entrypointPath).toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
        });
    });

    describe("#readAndLoad", (): void => {
        it("Should Core::ProjectConfiguration::Read class#run method", async (): Promise<void> => {
            runSpy = jest.spyOn(Core.ProjectConfiguration.Read.prototype, "run");
            const { subject, read, config } = _Helpers.Main.prepare(Subject);

            mockFS({
                [read.configurationPath]: JSON.stringify(config),
            });

            await subject.readAndLoad();

            expect(runSpy).toBeCalled();
        });
    });
});
