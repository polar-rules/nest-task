import mockFS from "mock-fs";
import FileSystem from "mock-fs/lib/filesystem.js";

import { Core } from "@core/index.js";
import { Tools } from "@tools/index.js";
import { Generators } from "@generators/index.js";
import { Cli } from "@cli/index.js";

export namespace _Templates {
    export function mockSetupMerge(): FileSystem.DirectoryItems {
        const entrypointPath = Tools.PathManager.Main.instance.packageResolver(
            Core.ProjectConfiguration.Constants.Templates.entrypointPath,
        );
        const modulePath = Tools.PathManager.Main.instance.packageResolver(
            Core.ProjectConfiguration.Constants.Templates.modulePath,
        );
        const taskPath = Tools.PathManager.Main.instance.packageResolver(
            Core.ProjectConfiguration.Constants.Templates.taskPath,
        );
        const runnerPath = Tools.PathManager.Main.instance.packageResolver(
            Core.ProjectConfiguration.Constants.Templates.runnerPath,
        );
        const indexPath = Tools.PathManager.Main.instance.packageResolver(
            Core.ProjectConfiguration.Constants.Templates.indexPath,
        );

        return {
            [entrypointPath]: "",
            [modulePath]: "",
            [taskPath]: "",
            [runnerPath]: "",
            [indexPath]: "",
        };
    }

    export function mockGeneratorMerge(): FileSystem.DirectoryItems {
        const indexPath = Tools.PathManager.Main.instance.packageResolver(Generators.Constants.Templates.indexPath);
        const runnerPath = Tools.PathManager.Main.instance.packageResolver(Generators.Constants.Templates.runnerPath);
        const taskPath = Tools.PathManager.Main.instance.packageResolver(Generators.Constants.Templates.taskPath);

        return {
            [indexPath]: "indexTemplate",
            [runnerPath]: "runnerTemplate",
            [taskPath]: "taskTemplate",
        };
    }

    export function mockAssemblerMerge(): FileSystem.DirectoryItems {
        return {
            [Cli.Dev.Generate.Assembler.Constants.Template.location]: "indexTemplate",
        };
    }

    export function mockSetup(): void {
        mockFS(mockSetupMerge());
    }

    export function mockGenerators(): void {
        mockFS(mockGeneratorMerge());
    }

    export function clean(): void {
        mockFS.restore();
    }
}
