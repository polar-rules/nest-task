import fs from "fs/promises";

import { Generators } from "@generators/index.js";
import { Core } from "@core/index.js";

import { Configs } from "@specs/configs/index.js";
import { Mocks } from "@specs/mocks/index.js";

describe("Generators::Create", (): void => {
    const Subject = Generators.Create;

    beforeEach((): void => {
        Mocks.Tools.PathManager.projectRootMock();
        Mocks.Fs.merge(Mocks.Core.ProjectConfiguration.Read.fsMerge());
        Mocks.Templates.mockGenerators();
    });

    describe("#run", (): void => {
        it("Should create index file if bear-hugs conventions", async (): Promise<void> => {
            const name = "example";
            const taskPath = Configs.Constants.Folders.tmp;

            const naming = new Core.ProjectConfiguration.Naming(
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );
            const index = new Generators.Index(naming.folderName(name), taskPath);

            Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);

            const subject = new Subject(
                name,
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
                "Example description",
                taskPath,
            );

            await subject.run();

            const file = await fs.readFile(index.path);

            expect(file.toString("utf-8")).not.toBeUndefined();
        });

        it("Should not create index file if it's any other conventions except bear-hugs", async (): Promise<void> => {
            const name = "example";
            const taskPath = Configs.Constants.Folders.tmp;

            const naming = new Core.ProjectConfiguration.Naming(
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
            );
            const index = new Generators.Index(naming.folderName(name), taskPath);

            Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);

            const subject = new Subject(
                name,
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
                "Example description",
                taskPath,
            );

            await subject.run();

            expect(() => fs.access(index.path)).rejects.toThrow();
        });

        it("Should create runner", async (): Promise<void> => {
            const name = "example";
            const taskPath = Configs.Constants.Folders.tmp;

            const naming = new Core.ProjectConfiguration.Naming(
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );
            const runner = new Generators.Runner(naming.folderName(name), taskPath);

            Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);

            const subject = new Subject(
                name,
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
                "Example description",
                taskPath,
            );

            await subject.run();

            const file = await fs.readFile(runner.path);

            expect(file.toString("utf-8")).not.toBeUndefined();
        });

        it("Should create task", async (): Promise<void> => {
            const name = "example";
            const taskPath = Configs.Constants.Folders.tmp;

            const naming = new Core.ProjectConfiguration.Naming(
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
            );
            const task = new Generators.Task(naming.folderName(name), taskPath);

            Mocks.Tools.PathManager.findPackageJsonMock(Mocks.Tools.PathManager.projectRoot);

            const subject = new Subject(
                name,
                Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
                "Example description",
                taskPath,
            );

            await subject.run();

            const file = await fs.readFile(task.path);

            expect(file.toString("utf-8")).not.toBeUndefined();
        });
    });
});
