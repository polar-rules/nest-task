import path from "path";

export namespace _Constants {
    export namespace Templates {
        const templatesFolder: Readonly<string> = path.join("generators", "templates");

        export const runnerPath: Readonly<string> = path.join(templatesFolder, "templates.runner.template");

        export const taskPath: Readonly<string> = path.join(templatesFolder, "templates.task.template");

        export const indexPath: Readonly<string> = path.join(templatesFolder, "templates.index.template");
    }
}
