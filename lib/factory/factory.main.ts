import { Interfaces } from "@interfaces/index.js";
import { Core } from "@core/index.js";

/**
 * Main class responsible for creating an instance of the Core App and loading a modules, tasks in
 * purpose to run them or provide information about tasks.
 *
 * @class _Main
 */
export class _Main {
    /**
     * Creates an instance of the Core App and loads the specified module.
     *
     * @static
     * @async
     * @param {Interfaces.General.AnyClass} module - The module to be loaded.
     * @returns {Promise<Core.App>} A promise that resolves to an instance of the Core App.
     */
    public static async create(module: Interfaces.General.AnyClass): Promise<Core.App> {
        const app = new Core.App();

        await app.load(module);

        return app;
    }
}
