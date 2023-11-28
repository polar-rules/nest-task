import mockFS from "mock-fs";
import FileSystem from "mock-fs/lib/filesystem.js";

import { Core } from "@core/index.js";
import { Tools } from "@tools/index.js";

import { _Types } from "./mocks.types.js";

export namespace _Templates {
    export function resolveTemplates(): _Types.Templates.Templates {
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
            entrypointPath,
            modulePath,
            taskPath,
            runnerPath,
            indexPath,
        };
    }

    export function mockMerge(): FileSystem.DirectoryItems {
        const templates = resolveTemplates();

        return {
            [templates.modulePath]: "",
            // [templates.modulePath]: mockFS.load(
            //     path.resolve(
            //         Tools.Module.dirname,
            //         "..",
            //         "core",
            //         "project-configuration",
            //         "templates",
            //         "templates.module.template",
            //     ),
            // ),
            [templates.taskPath]: "",
            [templates.runnerPath]: "",
            [templates.indexPath]: "",
        };
    }

    export function mock(): void {
        mockFS(mockMerge());
    }

    export function clean(): void {
        mockFS.restore();
    }
}
