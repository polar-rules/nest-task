import * as fs from "fs/promises";
import * as path from "path";

import cloneDeep from "lodash.clonedeep";

import { Tools } from "@tools/index.js";
import { Patches } from "@patches/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Errors } from "./errors/index.js";
import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";
import { _Read } from "./project-configuration.read.js";
import { _Entrypoint } from "./project-configuration.entrypoint.js";
import { _Module } from "./project-configuration.module.js";
import { _Naming } from "./project-configuration.naming.js";
import { _Task } from "./project-configuration.task.js";
import { _Runner } from "./project-configuration.runner.js";
import { _Index } from "./project-configuration.index.js";

export class _Setup {
    private readonly naming: _Naming;

    public constructor(
        private readonly convention: _Abstractions.Enums.Conventions,
        private readonly projectName?: string,
    ) {
        this.naming = new _Naming(convention);
    }

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
        await this.createIndex(clonedConfiguration);
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
            convention: this.convention ?? _Constants.Setup.defaultConfiguration.convention,
        };
    }

    private async createConfiguration(read: _Read, configuration: _Types.Configuration.Approximate): Promise<void> {
        this.processProjectAndTryToConfigure(configuration);

        const clonedConfiguration = cloneDeep(read.configuration);

        if (this.projectName) {
            if (!clonedConfiguration.projects) {
                throw new _Errors.MissingProjectConfiguration(this.projectName);
            }

            const project = clonedConfiguration.projects[this.projectName];

            if (!project) {
                throw new _Errors.MissingProjectConfiguration(this.projectName);
            }

            project.task = <_Types.Task>configuration.task;
        } else {
            clonedConfiguration.task = <_Types.Task>configuration.task;
        }

        await this.save(read, clonedConfiguration);
    }

    private async createEntrypoint(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const entrypoint = new _Entrypoint(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.entrypointPath);
        const fileAsString = new Patches.String(file.toString("utf-8"));
        const replacedFile = fileAsString.namedInterpolation({ moduleName: this.naming.moduleName("Tasks") });

        await this.createFile(replacedFile.toString(), entrypoint);
    }

    private async createModule(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Module(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.modulePath);
        const fileAsString = new Patches.String(file.toString("utf-8"));
        const replacedFile = fileAsString.namedInterpolation({
            importEntity: this.naming.importEntity("Example"),
            importFrom: this.naming.importFrom("Example"),
            usageEntity: this.naming.usageEntity("Example"),
            moduleName: this.naming.moduleName("Tasks"),
        });

        await this.createFile(replacedFile.toString(), module);
    }

    private async createTask(configuration: _Types.Configuration.Approximate): Promise<void> {
        console.debug("++++", configuration);
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Task(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.taskPath);
        const fileAsString = new Patches.String(file.toString("utf-8"));
        const replacedFile = fileAsString.namedInterpolation({
            taskName: this.naming.taskName("Example"),
            runnerName: this.naming.runnerName("Example"),
        });

        await this.createFile(replacedFile.toString(), module);
    }

    private async createRunner(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Runner(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.runnerPath);
        const fileAsString = new Patches.String(file.toString("utf-8"));
        const replacedFile = fileAsString.namedInterpolation({ runnerName: this.naming.runnerName("Example") });

        await this.createFile(replacedFile.toString(), module);
    }

    private async createIndex(configuration: _Types.Configuration.Approximate): Promise<void> {
        if (!this.naming.isBearHugs) {
            return;
        }

        if (!configuration.task) {
            throw new _Errors.TaskIsMissing();
        }

        const module = new _Index(configuration.task);
        const file = await this.readTemplate(_Constants.Templates.indexPath);
        const fileAsString = new Patches.String(file.toString("utf-8"));
        const replacedFile = fileAsString.namedInterpolation({ taskName: "Example" });

        await this.createFile(replacedFile.toString(), module);
    }

    private async readTemplate(templatePath: string): Promise<Buffer> {
        console.debug("----", templatePath);
        const resolvedPath = Tools.PathManager.Main.instance.packageResolver(templatePath);

        return await fs.readFile(resolvedPath);
    }

    private async createFile(file: string, resolver: _Entrypoint | _Module | _Runner | _Index): Promise<void> {
        await fs.mkdir(resolver.directory, { recursive: true });
        await fs.writeFile(resolver.path, file);
    }

    private async save(read: _Read, configuration: _Types.Configuration.Approximate): Promise<void> {
        await fs.writeFile(read.configurationPath, JSON.stringify(configuration, null, 2));
    }
}
