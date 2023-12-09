import * as path from "path";

import { Core } from "@core/index.js";
import { Configs } from "@specs/configs/index.js";

describe("Core::ProjectConfiguration::Module", (): void => {
    const Subject = Core.ProjectConfiguration.Module;

    describe("#path", (): void => {
        it("Should correctly resolve path", (): void => {
            const entryPoint = "example";
            const subject = new Subject({
                entryPoint,
                path: Configs.Constants.Folders.tmp,
                convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            });

            expect(subject.path.endsWith(path.join(Configs.Constants.Folders.tmp, "tasks.module.ts"))).toBeTruthy();
        });

        it("Should throw when no task", (): void => {
            const subject = new Subject(<any>undefined);

            expect(() => subject.path).toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
        });
    });

    describe("#directory", (): void => {
        it("Should correctly resolve path", (): void => {
            const entryPoint = "example";
            const subject = new Subject({
                entryPoint,
                path: Configs.Constants.Folders.tmp,
                convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            });

            expect(subject.directory.endsWith(path.join(Configs.Constants.Folders.tmp))).toBeTruthy();
        });

        it("Should throw when no task", (): void => {
            const subject = new Subject(<any>undefined);

            expect(() => subject.directory).toThrow(Core.ProjectConfiguration.Errors.TaskIsMissing);
        });
    });
});
