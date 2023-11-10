import fs from "fs/promises";

import { Tools } from "@tools/index.js";
import { Patches } from "@patches/index.js";

import { _Constants } from "./generators.constants.js";
import { _Runner } from "./generators.runner.js";
import { _Task } from "./generators.task.js";

export class _Create {
    private readonly name: Patches.String;

    public constructor(
        name: string,
        private readonly taskPath: string,
        private readonly description?: string,
    ) {
        this.name = new Patches.String(name);
    }

    public async run(): Promise<void> {
        await this.createRunner();
        await this.createTask();
    }

    private async createRunner(): Promise<void> {
        const runner = new _Runner(this.name.toString(), this.taskPath);
        const file = await this.readTemplate(_Constants.Templates.runnerPath);
        const fileAsString = new Patches.String(file.toString());
        const preparedFile = fileAsString.namedInterpolation({
            name: this.name.toPascalCase(),
        });

        await this.createFile(preparedFile.toString(), runner);
    }

    private async createTask(): Promise<void> {
        const task = new _Task(this.name.toString(), this.taskPath);
        const file = await this.readTemplate(_Constants.Templates.taskPath);
        const fileAsString = new Patches.String(file.toString());
        const preparedFile = fileAsString.namedInterpolation({
            name: this.name.toPascalCase(),
            description: this.description ?? _Constants.Create.noDescriptionProvided,
        });

        await this.createFile(preparedFile.toString(), task);
    }

    private async readTemplate(templatePath: string): Promise<Buffer> {
        const resolvedPath = Tools.PathManager.Main.instance.packageResolver(templatePath);

        return await fs.readFile(resolvedPath);
    }

    private async createFile(string: string, resolver: _Runner | _Task): Promise<void> {
        await fs.mkdir(resolver.directory, { recursive: true });
        await fs.writeFile(resolver.path, string);
    }
}
