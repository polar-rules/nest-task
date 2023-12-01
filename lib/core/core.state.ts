import { Patches } from "@patches/index.js";

import { _Enums } from "./core.enums.js";
import { _Task } from "./core.task.js";

/**
 * Manages and provides access to global state information, such as the list of tasks.
 *
 * @class
 */
export class _State {
    /**
     * Retrieves the list of tasks from global metadata.
     *
     * @static
     * @type {_Task[]} - Array of tasks
     */
    public static get tasksList(): _Task[] {
        return Patches.Reflect.getMetadata<_Task[]>(_Enums.MetadataKeys.TasksList, global);
    }

    /**
     * Sets the list of tasks in global metadata.
     *
     * @static
     * @param {_Task[]} value - The list of tasks to be set.
     */
    public static set tasksList(value: _Task[]) {
        Reflect.defineMetadata(_Enums.MetadataKeys.TasksList, value, global);
    }
}
