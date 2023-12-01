import { _Enums } from "./bear.enums.js";

/**
 * Namespace containing types related to Bear tasks.
 *
 * @namespace _Types
 */
export namespace _Types {
    /**
     * Interface representing a prompt for selecting a Bear task action.
     *
     * @interface PromptAction
     */
    export interface PromptAction {
        /**
         * The selected Bear task action.
         *
         * @type {_Enums.Actions}
         */
        action: _Enums.Actions;
    }
}
