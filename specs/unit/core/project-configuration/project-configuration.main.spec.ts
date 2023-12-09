import path from "path";

import { jest } from "@jest/globals";

import { Core } from "@core/index.js";
import { Mocks } from "@specs/mocks/index.js";

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
            const subject = new Subject();

            jest.spyOn(subject["read"], "taskConfiguration", "get").mockReturnValue(
                <any>Mocks.NestCli.mainWithTask["task"],
            );
            jest.spyOn(subject["read"], "resolveConfiguration", "get").mockReturnValue(
                <any>Mocks.NestCli.mainWithTask["task"],
            );

            expect(subject.entrypointPath.endsWith(path.join("test-path", "test-entrypoint.js"))).toBeTruthy();
        });

        it("Should throw an error if task configuration is missing", async (): Promise<void> => {
            const subject = new Subject();

            jest.spyOn(subject["read"], "taskConfiguration", "get").mockReturnValue(undefined);

            expect(() => subject.entrypointPath).toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
        });
    });

    describe("#readAndLoad", (): void => {
        it("Should Core::ProjectConfiguration::Read class#run method", async (): Promise<void> => {
            const subject = new Subject();
            const spyOn = jest.spyOn(subject["read"], "run").mockImplementation(() => Promise.resolve());

            await subject.readAndLoad();

            expect(spyOn).toBeCalledTimes(1);
        });
    });
});
