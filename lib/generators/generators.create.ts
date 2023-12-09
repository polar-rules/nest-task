import * as fs from "fs/promises";

import { Core } from "@core/index.js";
import { Tools } from "@tools/index.js";
import { Patches } from "@patches/index.js";

import { _Constants } from "./generators.constants.js";
import { _Runner } from "./generators.runner.js";
import { _Task } from "./generators.task.js";
import { _Index } from "./generators.index.js";

/**
 * Class responsible for generating files related to a new task.
 *
 * @class _Create
 */
export class _Create {
    /**
     * The naming convention for the project.
     *
     * @type {Core.ProjectConfiguration.Naming}
     * @private
     */
    private readonly naming: Core.ProjectConfiguration.Naming;

    /**
     * The name of the module.
     *
     * @type {Patches.String}
     * @private
     */
    private readonly name: Patches.String;

    /**
     * Creates an instance of _Create.
     *
     * @param {string} name - The name of the task.
     * @param {Core.ProjectConfiguration.Abstractions.Enums.Conventions} convention - The naming convention to be used.
     * @param {string} description - The description of the task.
     * @param {string} taskPath - The path where the task files will be created.
     */
    public constructor(
        name: string,
        convention: Core.ProjectConfiguration.Abstractions.Enums.Conventions,
        private readonly description: string,
        private readonly taskPath: string,
    ) {
        this.naming = new Core.ProjectConfiguration.Naming(convention);
        this.name = new Patches.String(name);
    }

    /**
     * Generates the required files for the new task.
     *
     * @returns {Promise<void>}
     */
    public async run(): Promise<void> {
        await Promise.all([this.createRunner(), this.createTask(), this.createIndex()]);
    }

    /**
     * Creates the runner file for the new task.
     *
     * @private
     * @returns {Promise<void>}
     */
    private async createRunner(): Promise<void> {
        const runner = new _Runner(this.naming.folderName(this.name.toString()), this.taskPath);
        const file = await this.readTemplate(_Constants.Templates.runnerPath);
        const fileAsString = new Patches.String(file.toString());
        const preparedFile = fileAsString.namedInterpolation({
            name: this.naming.runnerName(this.name.toString()),
        });

        await this.createFile(preparedFile.toString(), runner);
    }

    /**
     * Creates the task file for the new task.
     *
     * @private
     * @returns {Promise<void>}
     */
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

    /**
     * Creates the index file for the new task.
     *
     * @private
     * @returns {Promise<void>}
     */
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

    /**
     * Reads the content of a template file.
     *
     * @private
     * @param {string} templatePath - The path to the template file.
     * @returns {Promise<Buffer>} - The content of the template file.
     */
    private async readTemplate(templatePath: string): Promise<Buffer> {
        const resolvedPath = Tools.PathManager.Main.instance.packageResolver(templatePath);

        return await fs.readFile(resolvedPath);
    }

    /**
     * Creates a file with the provided content.
     *
     * @private
     * @param {string} string - The content of the file.
     * @param {object} resolver - The resolver instance for determining file paths.
     * @returns {Promise<void>}
     */
    private async createFile(string: string, resolver: _Runner | _Task | _Index): Promise<void> {
        await fs.mkdir(resolver.directory, { recursive: true });
        await fs.writeFile(resolver.path, string);
    }
}
