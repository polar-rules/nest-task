import * as fs from "fs/promises";
import * as path from "path";

import cloneDeep from "lodash.clonedeep";

import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";
import { _Read } from "./project-configuration.read.js";
import { _Entrypoint } from "./project-configuration.entrypoint.js";
import { _Module } from "./project-configuration.module.js";
import { _Task } from "./project-configuration.task.js";
import { _Runner } from "./project-configuration.runner.js";

export class _Setup {
    public constructor(private readonly projectName?: string) {}

    public async run(): Promise<void> {
        const read = new _Read(this.projectName);

        await read.run();

        const configuration = read.resolveConfiguration;
        const clonedConfiguration = cloneDeep(configuration);

        await this.createConfiguration(read, clonedConfiguration);
        await this.createEntrypoint(clonedConfiguration);
        await this.createModule(clonedConfiguration);
        await this.createTask(clonedConfiguration);
        await this.createRunner(clonedConfiguration);
    }

    private processProjectAndTryToConfigure(configuration: _Types.Configuration.Approximate): void {
        if ("projects" in configuration) {
            if (!this.projectName) {
                throw new _Errors.ProjectNameIsRequired();
            }

            const projectConfiguration = configuration.projects[this.projectName];

            if (!projectConfiguration) {
                throw new _Errors.MissingProjectConfiguration(this.projectName);
            }

            this.createConfigurationObject(projectConfiguration);

            return;
        }

        this.createConfigurationObject(configuration);
    }

    private createConfigurationObject(
        projectConfiguration: _Types.Configuration.ApproximateProject | _Types.Configuration.Approximate,
    ): void | never {
        if (projectConfiguration?.task) {
            throw new _Errors.TaskIsPresentInConfig();
        }

        const rootPath =
            "root" in projectConfiguration
                ? path.join(projectConfiguration.root, _Constants.Setup.defaultFolderName)
                : _Constants.Setup.defaultConfiguration.path;

        projectConfiguration.task = {
            path: rootPath,
            entryPoint: _Constants.Setup.defaultConfiguration.entryPoint,
        };
    }

    private async createConfiguration(read: _Read, configuration: _Types.Configuration.Approximate): Promise<void> {
        this.processProjectAndTryToConfigure(configuration);

        await this.save(read, configuration);
    }

    private async createEntrypoint(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const entrypoint = new _Entrypoint(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.entrypointPath);

        await this.createFile(file, entrypoint);
    }

    private async createModule(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Module(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.modulePath);

        await this.createFile(file, module);
    }

    private async createTask(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Task(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.taskPath);

        await this.createFile(file, module);
    }

    private async createRunner(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Runner(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.runnerPath);

        await this.createFile(file, module);
    }

    private async readTemplate(templatePath: string): Promise<Buffer> {
        const resolvedPath = Tools.PathManager.Main.instance.packageResolver(templatePath);

        return await fs.readFile(resolvedPath);
    }

    private async createFile(file: Buffer, resolver: _Entrypoint | _Module): Promise<void> {
        await fs.mkdir(resolver.directory, { recursive: true });
        await fs.writeFile(resolver.path, file.toString("utf-8"));
    }

    private async save(read: _Read, configuration: _Types.Configuration.Approximate): Promise<void> {
        await fs.writeFile(read.configurationPath, JSON.stringify(configuration, null, 2));
    }
}
