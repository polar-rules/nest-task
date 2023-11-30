import { Errors } from "@errors/index.js";

/**
 * Represents an error class indicating the absence of configuration for a provided project name.
 *
 * @class _MissingProjectConfiguration
 * @extends Errors.Base
 */
export class _MissingProjectConfiguration extends Errors.Base {
    /**
     * Creates a new instance of the `_MissingProjectConfiguration` error.
     *
     * @constructor
     * @param {string} projectName - The name of the missing project configuration.
     */
    constructor(projectName: string) {
        super(`Provided project name: \`${projectName}\` is missing inside of \`nest-cli.json\`.`);
    }
}
