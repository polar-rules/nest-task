import * as url from "url";
import * as path from "path";

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
        return false;
    }

    /**
     * Gets the directory name of the current module.
     *
     * @static
     * @readonly
     * @type {string}
     */
    public static get dirname(): string {
        return path.dirname(url.fileURLToPath(import.meta.url));
    }
}
