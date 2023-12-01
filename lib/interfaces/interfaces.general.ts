/**
 * Namespace containing utility types related to general programming.
 *
 * @namespace _General
 */
export namespace _General {
    /**
     * Generic interface representing a class constructor.
     *
     * @interface AnyClass
     * @template Instance - The type of the class instance.
     * @template Arguments - The type of the class constructor arguments.
     */
    export interface AnyClass<Instance = any, Arguments extends any[] = any> {
        /**
         * Constructor signature for a class.
         *
         * @constructor
         * @param {...Arguments} args - The constructor arguments.
         * @returns {Instance} - An instance of the class.
         */
        new (...args: Arguments): Instance;
    }
}
