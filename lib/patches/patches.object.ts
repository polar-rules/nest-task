/**
 * Class providing utility functions related to objects.
 *
 * @class _Object
 */
export class _Object extends Object {
    /**
     * Retrieves type-safe keys from an object.
     *
     * @static
     * @template Obj - The type of the object.
     * @param {Obj} object - The object from which to retrieve keys.
     * @returns {Array<keyof Obj>} - An array of type-safe keys.
     */
    public static typeSafeKeys<Obj extends object>(object: Obj): (keyof Obj)[] {
        return Object.keys(object) as (keyof Obj)[];
    }
}
