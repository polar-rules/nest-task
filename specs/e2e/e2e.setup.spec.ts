import * as childProcess from "child_process";
import * as path from "path";
import * as fs from "fs/promises";

import { Core } from "@core/index.js";

import { Configs } from "@specs/configs/index.js";
import { Tools } from "@tools/index.js";
import { Lifecycles } from "@specs/lifecycles/index.js";

describe("Setup", (): void => {
    const tmpPath = Tools.PathManager.Main.instance.pathResolver(Configs.Constants.Folders.tmp);
    const sampleProjectPath = Tools.PathManager.Main.instance.pathResolver(
        path.join(Configs.Constants.Folders.specs, Configs.Constants.Project.sampleDirectory),
    );

    beforeAll(async (): Promise<void> => {
        await Lifecycles.E2E.Essentials.Before.all();
    });

    afterAll(async (): Promise<void> => {
        await Lifecycles.E2E.Essentials.After.all();
    });

    for (const convention of [
        Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs,
        Core.ProjectConfiguration.Abstractions.Enums.Conventions.SnakeCase,
        Core.ProjectConfiguration.Abstractions.Enums.Conventions.KebabCase,
        Core.ProjectConfiguration.Abstractions.Enums.Conventions.CamelCase,
    ]) {
        describe(`When conventions are ${convention}`, (): void => {
            xit("Should be able to setup", async (): Promise<void> => {
                const dummyProjectName = `setup-${convention}-project`;
                const dummyProjectPath = path.join(tmpPath, dummyProjectName);

                await fs.cp(sampleProjectPath, dummyProjectPath, { recursive: true });

                process.chdir(dummyProjectPath);

                const currentWorkingDirectory = childProcess.execSync("pwd").toString("utf-8");
                expect(currentWorkingDirectory.includes(dummyProjectPath)).toBeTruthy();

                const projectFilesAndFolders = await fs.readdir(dummyProjectPath);
                expect(projectFilesAndFolders.includes("node_modules")).toBeTruthy();

                childProcess.execSync(`npx nest-task setup --convention ${convention}`);

                const tasksPath = path.join("src", "tasks");
                const tasksFiles = await fs.readdir(tasksPath);

                expect(tasksFiles.includes("example")).toBeTruthy();
                expect(tasksFiles.includes("main.ts")).toBeTruthy();
                expect(tasksFiles.includes("tasks.module.ts")).toBeTruthy();

                const exampleTaskPath = path.join(tasksPath, "example");
                const exampleTaskFiles = await fs.readdir(exampleTaskPath);

                if (convention === Core.ProjectConfiguration.Abstractions.Enums.Conventions.BearHugs) {
                    expect(exampleTaskFiles.includes("index.ts"));
                }

                expect(exampleTaskFiles.includes("example.runner.ts")).toBeTruthy();
                expect(exampleTaskFiles.includes("example.task.ts")).toBeTruthy();
            });
        });
    }
});
