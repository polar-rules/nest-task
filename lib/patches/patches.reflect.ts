/**
 * Class providing utility functions for working with metadata using the Reflect API.
 *
 * @class _Reflect
 */
export class _Reflect {
    /**
     * Retrieves metadata associated with a key on a target.
     *
     * @static
     * @template Return - The type of the metadata to retrieve.
     * @param {string} metadataKey - The key for which to retrieve metadata.
     * @param {any} target - The target object or constructor function.
     * @param {string | symbol} [key] - The property key for which to retrieve metadata (optional).
     * @returns {Return} - The retrieved metadata.
     */
    public static getMetadata<Return>(metadataKey: string, target: any, key?: string | symbol): Return {
        if (key) {
            return Reflect.getMetadata(metadataKey, target, key);
        }

        return Reflect.getMetadata(metadataKey, target);
    }
}
