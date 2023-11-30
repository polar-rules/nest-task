import { Errors } from "@errors/index.js";

/**
 * Custom error class for cases where no `package.json` file is found.
 *
 * @class _NoPackageJson
 * @extends {Errors.Base}
 */
export class _NoPackageJson extends Errors.Base {
    /**
     * Creates an instance of _NoPackageJson.
     *
     * @constructor
     * @description This error is thrown when no `package.json` file is found.
     */
    constructor() {
        super("No `package.json` was found!");
    }
}
