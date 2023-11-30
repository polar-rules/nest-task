/**
 * Checks if a given key exists in an object, indicating whether the object is an instance of the specified type.
 *
 * @function _InstanceOf
 * @param {any} object - The object to check.
 * @param {any} key - The key to check in the object.
 * @returns {boolean} - A boolean indicating whether the object is an instance of the specified type.
 * @template Return - The type to check for.
 */
export function _InstanceOf<Return>(object: any, key: any): object is Return {
    return key in object;
}
