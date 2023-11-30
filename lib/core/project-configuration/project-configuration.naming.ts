import { Patches } from "@patches/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Constants } from "./project-configuration.constants.js";

/**
 * Represents a naming utility for various conventions.
 *
 * @class
 */
export class _Naming {
    /**
     * Creates an instance of `_Naming`.
     *
     * @constructor
     * @param {_Abstractions.Enums.Conventions} convention - The naming convention to follow.
     */
    public constructor(private readonly convention: _Abstractions.Enums.Conventions) {}

    /**
     * Checks if the convention is BearHugs.
     *
     * @type {boolean}
     */
    public get isBearHugs(): boolean {
        return this.convention === _Constants.convention.BearHugs;
    }

    /**
     * Generates a task name based on the convention.
     *
     * @param {string} taskName - The original task name.
     * @returns {string} The generated task name.
     */
    public taskName(taskName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "_Task";
            default:
                return `${this.toPascalCase(taskName)}Task`;
        }
    }

    /**
     * Generates a runner name based on the convention.
     *
     * @param {string} runnerName - The original runner name.
     * @returns {string} The generated runner name.
     */
    public runnerName(runnerName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "_Runner";
            default:
                return `${this.toPascalCase(runnerName)}Runner`;
        }
    }

    /**
     * Generates a module name based on the convention.
     *
     * @param {string} moduleName - The original module name.
     * @returns {string} The generated module name.
     */
    public moduleName(moduleName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "_Module";
            default:
                return `${this.toPascalCase(moduleName)}Module`;
        }
    }

    /**
     * Generates a folder name based on the convention.
     *
     * @param {string} entityName - The original entity name.
     * @returns {string} The generated folder name.
     */
    public folderName(entityName: string): string {
        const entityNamePatch = new Patches.String(entityName);

        switch (this.convention) {
            case _Constants.convention.BearHugs:
            case _Constants.convention.KebabCase:
                return entityNamePatch.lowerlize().toKebabCase().toString();
            case _Constants.convention.CamelCase:
                return entityNamePatch.lowerlize().toCamelCase().toString();
            default:
                return entityNamePatch.lowerlize().toSnakeCase().toString();
        }
    }

    /**
     * Generates a runner file name based on the convention.
     *
     * @param {string} entityName - The original entity name.
     * @returns {string} The generated runner file name.
     */
    public runnerFileName(entityName: string): string {
        return `${this.folderName(entityName)}.runner`;
    }

    /**
     * Generates a task file name based on the convention.
     *
     * @param {string} entityName - The original entity name.
     * @returns {string} The generated task file name.
     */
    public taskFileName(entityName: string): string {
        return `${this.folderName(entityName)}.task`;
    }

    /**
     * Generates an import statement from based on the convention.
     *
     * @param {string} entityName - The original entity name.
     * @returns {string} The generated import statement.
     */
    public importFrom(entityName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "";
            default:
                return this.taskFileName(entityName);
        }
    }

    /**
     * Generates an import entity based on the convention.
     *
     * @param {string} entityName - The original entity name.
     * @returns {string} The generated import entity.
     */
    public importEntity(entityName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return `_${this.toPascalCase(entityName)}`;
            default:
                return `${this.toPascalCase(entityName)}Task`;
        }
    }

    /**
     * Generates a usage entity based on the convention.
     *
     * @param {string} entityName - The original entity name.
     * @returns {string} The generated usage entity.
     */
    public usageEntity(entityName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return `_${this.toPascalCase(entityName)}.Task`;
            default:
                return `${this.toPascalCase(entityName)}Task`;
        }
    }

    /**
     * Converts a string to PascalCase.
     *
     * @private
     * @param {string} entityName - The original entity name.
     * @returns {string} The converted PascalCase string.
     */
    private toPascalCase(entityName: string): string {
        const patch = new Patches.String(entityName);

        return patch.toPascalCase().toString();
    }
}
