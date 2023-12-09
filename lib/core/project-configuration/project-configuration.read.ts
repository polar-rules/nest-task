import * as path from "path";
import * as fs from "fs/promises";

import { Patches } from "@patches/index.js";
import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";

/**
 * Represents a class for reading project configuration.
 *
 * @class
 */
export class _Read {
    /**
     * The parsed project configuration.
     *
     * @type {_Types.Configuration.Approximate}
     */
    public configuration!: _Types.Configuration.Approximate;

    /**
     * Creates an instance of `_Read`.
     *
     * @constructor
     * @param {string} [projectName] - The name of the project.
     */
    public constructor(private readonly projectName?: string) {}

    /**
     * Get the path to the project configuration file.
     *
     * @type {string}
     */
    public get configurationPath(): string {
        const root = Tools.PathManager.Main.instance.projectRoot;
        return path.join(root, _Constants.configurationFileName);
    }

    /**
     * Get the task configuration from the resolved configuration.
     *
     * @throws {_Errors.ProjectNameIsRequired} Throws an error if the project name is required but not provided.
     * @throws {_Errors.MissingProjectConfiguration} Throws an error if the project configuration is missing.
     * @type {_Types.Task | undefined | never}
     */
    public get taskConfiguration(): _Types.Task | undefined | never {
        return this.resolveConfiguration?.task;
    }

    /**
     * Resolve the project configuration.
     *
     * @throws {_Errors.ProjectNameIsRequired} Throws an error if the project name is required but not provided.
     * @throws {_Errors.MissingProjectConfiguration} Throws an error if the project configuration is missing.
     * @type {_Types.Configuration.Approximate | never}
     */
    public get resolveConfiguration(): _Types.Configuration.Approximate | never {
        if ("projects" in this.configuration) {
            if (!this.projectName) {
                throw new _Errors.ProjectNameIsRequired();
            }

            const projectConfiguration = this.configuration.projects[this.projectName];

            if (!projectConfiguration) {
                throw new _Errors.MissingProjectConfiguration(this.projectName);
            }

            return projectConfiguration;
        }

        return this.configuration;
    }

    /**
     * Read and parse the project configuration file.
     *
     * @throws {_Errors.MissingNestCli} Throws an error if the Nest CLI configuration is missing.
     * @returns {Promise<void>}
     */
    public async run(): Promise<void> {
        try {
            const file = await fs.readFile(this.configurationPath);
            this.configuration = Patches.Json.parse<_Types.Configuration.Approximate>(file.toString("utf-8"));
        } catch (e) {
            throw new _Errors.MissingNestCli();
        }
    }
}
