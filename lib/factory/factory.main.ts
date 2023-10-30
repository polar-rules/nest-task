import "reflect-metadata";

import { Interfaces } from "@interfaces/index.js";

export class _Main {
    public static instance?: _Main;

    public static async create(module: Interfaces.General.AnyClass<any, any>): Promise<_Main> {
        this.instance = new _Main();

        await this.instance.load(module);

        return this.instance;
    }

    public tasks: Interfaces.General.AnyClass<any, any>[] | undefined;

    private getTasks(module: Interfaces.General.AnyClass<any, any>): void {
        this.tasks = Reflect.getMetadata("tasks", module);
    }

    private async load(module: Interfaces.General.AnyClass<any, any>): Promise<void> {
        this.getTasks(module);
    }
}
