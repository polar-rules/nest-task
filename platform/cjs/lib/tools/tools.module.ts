/**
 * Utility class for module-related operations.
 *
 * @class _Module
 */
export class _Module {
    /**
     * Indicates whether the module is in CommonJS format.
     *
     * @static
     * @readonly
     * @type {boolean}
     */
    public static get isCJS(): boolean {
        return true;
    }

    /**
     * Gets the directory name of the current module.
     *
     * @static
     * @readonly
     * @type {string}
     */
    public static get dirname(): string {
        return __dirname;
    }
}
