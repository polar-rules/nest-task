import fs from "fs/promises";

import { Core } from "@core/index.js";
import { Tools } from "@tools/index.js";
import { Patches } from "@patches/index.js";

import { _Constants } from "./generators.constants.js";
import { _Runner } from "./generators.runner.js";
import { _Task } from "./generators.task.js";
import { _Index } from "./generators.index.js";

export class _Create {
    private readonly naming: Core.ProjectConfiguration.Naming;

    private readonly name: Patches.String;

    public constructor(
        name: string,
        convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
        private readonly description: string,
        private readonly taskPath: string,
    ) {
        this.naming = new Core.ProjectConfiguration.Naming(convention);
        this.name = new Patches.String(name);
    }

    public async run(): Promise<void> {
        await this.createRunner();
        await this.createTask();
        await this.createIndex();
    }

    private async createRunner(): Promise<void> {
        const runner = new _Runner(this.naming.folderName(this.name.toString()), this.taskPath);
        const file = await this.readTemplate(_Constants.Templates.runnerPath);
        const fileAsString = new Patches.String(file.toString());
        const preparedFile = fileAsString.namedInterpolation({
            name: this.naming.runnerName(this.name.toString()),
        });

        await this.createFile(preparedFile.toString(), runner);
    }

    private async createTask(): Promise<void> {
        const task = new _Task(this.naming.folderName(this.name.toString()), this.taskPath);
        const file = await this.readTemplate(_Constants.Templates.taskPath);
        const fileAsString = new Patches.String(file.toString());
        const preparedFile = fileAsString.namedInterpolation({
            name: this.name.toPascalCase(),
            description: this.description,
            taskClass: this.naming.taskName(this.name.toString()),
            runnerName: this.naming.runnerName(this.name.toString()),
            runnerFileName: this.naming.runnerFileName(this.name.toString()),
        });

        await this.createFile(preparedFile.toString(), task);
    }

    private async createIndex(): Promise<void> {
        if (!this.naming.isBearHugs) {
            return;
        }

        const index = new _Index(this.naming.folderName(this.name.toString()), this.taskPath);
        const file = await this.readTemplate(_Constants.Templates.indexPath);
        const fileAsString = new Patches.String(file.toString());
        const preparedFile = fileAsString.namedInterpolation({
            className: this.name.toPascalCase(),
            fileName: this.naming.taskFileName(this.name.toString()),
        });

        await this.createFile(preparedFile.toString(), index);
    }

    private async readTemplate(templatePath: string): Promise<Buffer> {
        const resolvedPath = Tools.PathManager.Main.instance.packageResolver(templatePath);

        return await fs.readFile(resolvedPath);
    }

    private async createFile(string: string, resolver: _Runner | _Task | _Index): Promise<void> {
        await fs.mkdir(resolver.directory, { recursive: true });
        await fs.writeFile(resolver.path, string);
    }
}
