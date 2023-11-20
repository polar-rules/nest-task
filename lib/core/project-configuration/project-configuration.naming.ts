import { Patches } from "@patches/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Constants } from "./project-configuration.constants.js";

export class _Naming {
    public constructor(private readonly convention: _Abstractions.Enums.Conventions) {}

    public get isBearHugs(): boolean {
        return this.convention === _Constants.convention.BearHugs;
    }

    public taskName(taskName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "_Task";
            default:
                return `${this.toPascalCase(taskName)}Task`;
        }
    }

    public runnerName(runnerName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "_Runner";
            default:
                return `${this.toPascalCase(runnerName)}Runner`;
        }
    }

    public moduleName(moduleName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "_Module";
            default:
                return `${this.toPascalCase(moduleName)}Module`;
        }
    }

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

    public runnerFileName(entityName: string): string {
        return `${this.folderName(entityName)}.runner`;
    }

    public taskFileName(entityName: string): string {
        return `${this.folderName(entityName)}.task`;
    }

    public importFrom(entityName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return "";
            default:
                return this.taskFileName(entityName);
        }
    }

    public importEntity(entityName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return `_${this.toPascalCase(entityName)}`;
            default:
                return `${this.toPascalCase(entityName)}Task`;
        }
    }

    public usageEntity(entityName: string): string {
        switch (this.convention) {
            case _Constants.convention.BearHugs:
                return `_${this.toPascalCase(entityName)}.Task`;
            default:
                return `${this.toPascalCase(entityName)}Task`;
        }
    }

    private toPascalCase(entityName: string): string {
        const patch = new Patches.String(entityName);

        return patch.toPascalCase().toString();
    }
}
