import "reflect-metadata";

import { Factory } from "@factory/index.js";
import { Interfaces } from "@interfaces/index.js";

import { _Errors } from "./errors/index.js";
import { _ProjectConfiguration } from "./project-configuration/index.js";
import { _Perform } from "./core.perform.js";

export class _Main {
    private availableTasks?: Interfaces.General.AnyClass<any, any>[];

    private readonly projectConfiguration: _ProjectConfiguration.Main;

    public constructor(
        private readonly task: string,
        private readonly projectName?: string,
    ) {
        this.projectConfiguration = new _ProjectConfiguration.Main(this.projectName);
    }

    public async run(): Promise<void> {
        await this.load();

        if (!this.availableTasks?.length) {
            throw new _Errors.NoTasksFound();
        }

        const taskClass = this.locateTaskClass();

        if (!taskClass) {
            throw new _Errors.NoSpecificTaskFound(this.task);
        }

        const perform = new _Perform(taskClass);

        await perform.run();
    }

    private locateTaskClass(): Interfaces.General.AnyClass<any, any> | undefined {
        return this.availableTasks?.find((value: Interfaces.General.AnyClass<any, any>): boolean => {
            const name = Reflect.getMetadata("name", value);

            return name === this.task;
        });
    }

    private async load(): Promise<void> {
        await this.projectConfiguration.readAndLoad();
        await import(this.projectConfiguration.entrypointPath);

        this.availableTasks = Factory.Main?.instance?.tasks ?? [];
    }
}
