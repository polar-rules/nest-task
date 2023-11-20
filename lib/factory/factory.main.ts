import "reflect-metadata";

import { Interfaces } from "@interfaces/index.js";
import { Core } from "@core/index.js";

export class _Main {
    public static async create(module: Interfaces.General.AnyClass): Promise<Core.App> {
        const app = new Core.App();

        await app.load(module);

        return app;
    }
}
