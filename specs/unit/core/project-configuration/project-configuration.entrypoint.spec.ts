import * as path from "path";

import { Core } from "@core/index.js";

describe("Core::ProjectConfiguration::Entrypoint", (): void => {
    const Subject = Core.ProjectConfiguration.Entrypoint;

    describe("#path", (): void => {
        it("Should correctly resolve path", (): void => {
            const task: Core.ProjectConfiguration.Types.Task = {
                path: "test-path",
                entryPoint: "test-entrypoint.ts",
                convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            };
            const subject = new Subject(task);
            const expectations = path.join(task.path, task.entryPoint);

            expect(subject.path.endsWith(expectations)).toBeTruthy();
        });
    });
});
