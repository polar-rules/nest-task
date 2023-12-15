import camelCaseType from "lodash.camelcase";
import snakeCaseType from "lodash.snakecase";
import kebabCaseType from "lodash.kebabcase";

import { Interfaces } from "@interfaces/index.js";

/**
 * Wrapper around libraries in purpuse to import them. The problem that some libraries incorrectly work and
 * conflicts between `await import` syntax.
 *
 * @class _Start
 */
export class Libraries {
    /**
     * Lodash libraries is store under this variable. We assume that developer need to call `initialise` firstly.
     *
     * @type {Interfaces.Libraries.Lodash} Lodash related libraries
     */
    public static lodash: Interfaces.Libraries.Lodash;

    private static isInitialised: boolean = false;

    /**
     * Initialise all libraries
     *
     * @returns {Promise<void>} A Promise that resolves when the initialisation is completed.
     */
    public static async initialise(): Promise<void> {
        if (this.isInitialised) {
            return;
        }

        await this.initialiseLodash();

        this.isInitialised = true;
    }

    /**
     * Initialise `lodash` libraries
     *
     * @returns {Promise<void>} A Promise that resolves when the initialisation is completed.
     */
    private static async initialiseLodash(): Promise<void> {
        const camelCase = await import("lodash.camelcase");
        const snakeCase = await import("lodash.snakecase");
        const kebabCase = await import("lodash.kebabcase");

        this.lodash = {
            camelCase: (camelCase.default ?? camelCase) as unknown as typeof camelCaseType,
            snakeCase: (snakeCase.default ?? snakeCase) as unknown as typeof snakeCaseType,
            kebabCase: (kebabCase.default ?? kebabCase) as unknown as typeof kebabCaseType,
        };
    }
}
