import { _Ora } from "./abstractions.ora.js";

/**
 * Abstract class representing a loader with pre-defined methods for handling
 * configurations.
 *
 * @abstract
 * @class _Loader
 */
export abstract class _Loader {
    /**
     * Creates an instance of _Loader.
     *
     * @constructor
     */
    public constructor() {}

    /**
     * Instance of the Ora abstraction for loading messages.
     *
     * @protected
     * @type {_Ora}
     */
    protected ora: _Ora = new _Ora();

    /**
     * Abstract method to be implemented by subclasses for finishing loader tasks.
     *
     * @abstract
     * @returns {void}
     */
    public abstract finish(): void;

    /**
     * Configures the loader by starting a loading message.
     *
     * @public
     * @returns {void}
     */
    public configure(): void {
        this.ora.start("Configuring");
    }
}
