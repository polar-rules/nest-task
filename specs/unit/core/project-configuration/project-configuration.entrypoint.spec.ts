import * as path from "path";

import { Core } from "@core/index.js";

import { Mocks } from "@specs/mocks/index.js";

describe("Core::ProjectConfiguration::Entrypoint", (): void => {
    const Subject = Core.ProjectConfiguration.Entrypoint;

    describe("#path", (): void => {
        it("Should do", (): void => {
            const task: Core.ProjectConfiguration.Types.Task = {
                path: "test-path",
                entryPoint: "test-entrypoint.ts",
                convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            };
            const subject = new Subject(task);
            const expectations = path.join(Mocks.FindPackageJson.projectRoot, task.path, task.entryPoint);

            expect(subject.path).toEqual(expectations);
        });
    });
});
