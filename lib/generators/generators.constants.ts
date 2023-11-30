import path from "path";

/**
 * Namespace for constants related to templates.
 *
 * @namespace _Constants.Templates
 */
export namespace _Constants {
    export namespace Templates {
        /**
         * The base folder path for templates.
         *
         * @type {Readonly<string>}
         */
        const templatesFolder: Readonly<string> = path.join("generators", "templates");

        /**
         * The path to the runner template.
         *
         * @type {Readonly<string>}
         */
        export const runnerPath: Readonly<string> = path.join(templatesFolder, "templates.runner.template");

        /**
         * The path to the task template.
         *
         * @type {Readonly<string>}
         */
        export const taskPath: Readonly<string> = path.join(templatesFolder, "templates.task.template");

        /**
         * The path to the index template.
         *
         * @type {Readonly<string>}
         */
        export const indexPath: Readonly<string> = path.join(templatesFolder, "templates.index.template");
    }
}
