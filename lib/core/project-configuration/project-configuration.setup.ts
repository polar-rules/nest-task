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

/**
 * Represents a setup class for creating project configuration files and related files.
 * @class
 */
export class _Setup {
    /**
     * Naming utility for various conventions.
     *
     * @private
     * @type {_Naming}
     */
    private readonly naming: _Naming;

    /**
     * Creates an instance of `_Setup`.
     *
     * @constructor
     * @param {_Abstractions.Enums.Conventions} convention - The naming convention to follow.
     * @param {string} [projectName] - The name of the project.
     */
    public constructor(
        private readonly convention: _Abstractions.Enums.Conventions,
        private readonly projectName?: string,
    ) {
        this.naming = new _Naming(convention);
    }

    /**
     * Run the setup process to create project configuration files and related files.
     *
     * @returns {Promise<void>}
     */
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

    /**
     * Process the project and attempt to configure it.
     *
     * @private
     * @param {_Types.Configuration.Approximate} configuration - The project configuration to process.
     */
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

    /**
     * Create a configuration object based on project configuration.
     *
     * @private
     * @param {(_Types.Configuration.ApproximateProject | _Types.Configuration.Approximate)} projectConfiguration -
     * The project configuration to create the object from.
     * @throws {_Errors.TaskIsPresentInConfig} Throws an error if the task is already present in the configuration.
     */
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

    /**
     * Create the project configuration file.
     *
     * @private
     * @param {_Read} read - The read instance to access existing configuration.
     * @param {_Types.Configuration.Approximate} configuration - The new configuration to be saved.
     * @returns {Promise<void>}
     */
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

    /**
     * Create the entrypoint file.
     *
     * @private
     * @param {_Types.Configuration.Approximate} configuration - The project configuration.
     * @returns {Promise<void>}
     */
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

    /**
     * Create the module file.
     *
     * @private
     * @param {_Types.Configuration.Approximate} configuration - The project configuration.
     * @returns {Promise<void>}
     */
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

    /**
     * Create the task file.
     *
     * @private
     * @param {_Types.Configuration.Approximate} configuration - The project configuration.
     * @returns {Promise<void>}
     */
    private async createTask(configuration: _Types.Configuration.Approximate): Promise<void> {
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

    /**
     * Create the runner file.
     *
     * @private
     * @param {_Types.Configuration.Approximate} configuration - The project configuration.
     * @returns {Promise<void>}
     */
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

    /**
     * Create the index file.
     *
     * @private
     * @param {_Types.Configuration.Approximate} configuration - The project configuration.
     * @returns {Promise<void>}
     */
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

    /**
     * Read the template file.
     *
     * @private
     * @param {string} templatePath - The path to the template file.
     * @returns {Promise<Buffer>}
     */
    private async readTemplate(templatePath: string): Promise<Buffer> {
        const resolvedPath = Tools.PathManager.Main.instance.packageResolver(templatePath);

        return await fs.readFile(resolvedPath);
    }

    /**
     * Create a file using the provided content and resolver.
     *
     * @private
     * @param {string} file - The content of the file to be created.
     * @param {_Entrypoint | _Module | _Runner | _Index} resolver - The file resolver instance.
     * @returns {Promise<void>}
     */
    private async createFile(file: string, resolver: _Entrypoint | _Module | _Runner | _Index): Promise<void> {
        await fs.mkdir(resolver.directory, { recursive: true });
        await fs.writeFile(resolver.path, file);
    }

    /**
     * Save the updated configuration to the configuration file.
     *
     * @private
     * @param {_Read} read - The read instance to access existing configuration path.
     * @param {_Types.Configuration.Approximate} configuration - The updated configuration.
     * @returns {Promise<void>}
     */
    private async save(read: _Read, configuration: _Types.Configuration.Approximate): Promise<void> {
        await fs.writeFile(read.configurationPath, JSON.stringify(configuration, null, 2));
    }
}
