import * as path from "path";

import { _Abstractions } from "./abstractions/index.js";
import { _Types } from "./project-configuration.types.js";

/**
 * Constants related to project configuration.
 *
 * @namespace _Constants
 */
export namespace _Constants {
    /**
     * Name of the configuration file.
     *
     * @type {Readonly<string>}
     */
    export const configurationFileName: Readonly<string> = "nest-cli.json";

    /**
     * Enumerations related to conventions.
     *
     * @type {Readonly<typeof _Abstractions.Enums.Conventions>}
     */
    export const convention: Readonly<typeof _Abstractions.Enums.Conventions> = _Abstractions.Enums.Conventions;

    /**
     * Constants related to the main part of the project.
     *
     * @namespace Main
     */
    export namespace Main {
        /**
         * Path to the compiled folder.
         *
         * @type {Readonly<string>}
         */
        export const compiledFolder: Readonly<string> = "dist";
    }

    /**
     * Constants related to project setup.
     *
     * @namespace Setup
     */
    export namespace Setup {
        /**
         * Default folder name for tasks.
         *
         * @type {Readonly<string>}
         */
        export const defaultFolderName: Readonly<string> = "tasks";

        /**
         * Default configuration for tasks.
         *
         * @type {Readonly<_Types.Task>}
         */
        export const defaultConfiguration: Readonly<_Types.Task> = {
            path: path.join("src", defaultFolderName),
            entryPoint: "main.ts",
            convention: convention.KebabCase,
        };

        /**
         * Path to the module.
         *
         * @type {Readonly<string>}
         */
        export const modulePath: Readonly<string> = "tasks.module.ts";

        /**
         * Directory for example tasks.
         *
         * @type {Readonly<string>}
         */
        export const exampleDirectory: Readonly<string> = "example";

        /**
         * Path to the runner for examples.
         *
         * @type {Readonly<string>}
         */
        export const runnerPath: Readonly<string> = "example.runner.ts";

        /**
         * Path to the task for examples.
         *
         * @type {Readonly<string>}
         */
        export const taskPath: Readonly<string> = "example.task.ts";

        /**
         * Path to the index file.
         *
         * @type {Readonly<string>}
         */
        export const indexPath: Readonly<string> = "index.ts";
    }

    /**
     * Constants related to project templates.
     *
     * @namespace Templates
     */
    export namespace Templates {
        /**
         * Folder containing templates.
         *
         * @type {Readonly<string>}
         */
        const templatesFolder: Readonly<string> = path.join("core", "project-configuration", "templates");

        /**
         * Path to the entrypoint template.
         *
         * @type {Readonly<string>}
         */
        export const entrypointPath: Readonly<string> = path.join(templatesFolder, "templates.entrypoint.template");

        /**
         * Path to the module template.
         *
         * @type {Readonly<string>}
         */
        export const modulePath: Readonly<string> = path.join(templatesFolder, "templates.module.template");

        /**
         * Path to the runner template.
         *
         * @type {Readonly<string>}
         */
        export const runnerPath: Readonly<string> = path.join(templatesFolder, "templates.runner.template");

        /**
         * Path to the task template.
         *
         * @type {Readonly<string>}
         */
        export const taskPath: Readonly<string> = path.join(templatesFolder, "templates.task.template");

        /**
         * Path to the index template.
         *
         * @type {Readonly<string>}
         */
        export const indexPath: Readonly<string> = path.join(templatesFolder, "templates.index.template");
    }
}
