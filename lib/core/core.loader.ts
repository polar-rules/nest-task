import { _ProjectConfiguration } from "./project-configuration/index.js";

/**
 * Manages the loading and configuration of a project using a specified project configuration.
 *
 * @class
 */
export class _Loader {
    /**
     * The project configuration instance associated with the loader.
     *
     * @private
     * @readonly
     * @type {_ProjectConfiguration.Main}
     */
    private readonly projectConfiguration: _ProjectConfiguration.Main;

    /**
     * Constructs a new instance of the _Loader class.
     *
     * @constructor
     * @param {string | undefined} projectName - The name of the project. Optional.
     */
    public constructor(private readonly projectName?: string) {
        this.projectConfiguration = new _ProjectConfiguration.Main(this.projectName);
    }

    /**
     * Asynchronously runs the loader, reading and loading the project configuration and importing the entrypoint.
     *
     * @async
     * @method
     * @returns {Promise<void>} A Promise that resolves when the loader has completed its tasks.
     */
    public async run(): Promise<void> {
        await this.projectConfiguration.readAndLoad();
        await import(this.projectConfiguration.entrypointPath);
    }
}
