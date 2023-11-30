/**
 * Namespace containing types related to run tasks.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Namespace containing types related to adding arguments.
     *
     * @namespace AddArgument
     */
    export namespace AddArgument {
        /**
         * Interface representing a prompt for deciding whether to add an argument.
         *
         * @interface Prompt
         */
        export interface Prompt {
            /**
             * User's decision on whether to add an argument.
             *
             * @type {string}
             */
            shouldAddArgument: string;
        }
    }

    /**
     * Namespace containing types related to additional arguments.
     *
     * @namespace AdditionalArgument
     */
    export namespace AdditionalArgument {
        /**
         * Interface representing a prompt for providing additional argument details.
         *
         * @interface Prompt
         */
        export interface Prompt {
            /**
             * The key or name of the additional argument.
             *
             * @type {string}
             */
            argumentKey: string;

            /**
             * The value of the additional argument.
             *
             * @type {string}
             */
            argumentValue: string;
        }
    }
}
