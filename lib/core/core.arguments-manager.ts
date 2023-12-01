import { Patches } from "@patches/index.js";

import { _Enums } from "./core.enums.js";

/**
 * Manages and provides access to metadata related to task arguments and run types.
 *
 * @class
 */
export class _ArgumentsManager {
    /**
     * Retrieves the current task name from global metadata.
     *
     * @static
     * @type {string}
     */
    public static get taskName(): string {
        return Patches.Reflect.getMetadata<string>(_Enums.MetadataKeys.TaskName, global);
    }

    /**
     * Sets the task name in global metadata.
     *
     * @static
     * @param {string} value - The task name to be set.
     */
    public static set taskName(value: string) {
        Reflect.defineMetadata(_Enums.MetadataKeys.TaskName, value, global);
    }

    /**
     * Retrieves the current task arguments from global metadata.
     *
     * @static
     * @type {Record<string, string | number | boolean> | undefined}
     */
    public static get taskArguments(): Record<string, string | number | boolean> | undefined {
        return Patches.Reflect.getMetadata<Record<string, string | number> | undefined>(
            _Enums.MetadataKeys.TaskArguments,
            global,
        );
    }

    /**
     * Sets the task arguments in global metadata.
     *
     * @static
     * @param {Record<string, string | number> | undefined} value - The task arguments to be set.
     */
    public static set taskArguments(value: Record<string, string | number> | undefined) {
        Reflect.defineMetadata(_Enums.MetadataKeys.TaskArguments, value, global);
    }

    /**
     * Retrieves the current run type from global metadata.
     *
     * @static
     * @type {_Enums.RunTypes}
     */
    public static get runType(): _Enums.RunTypes {
        return Patches.Reflect.getMetadata<_Enums.RunTypes>(_Enums.MetadataKeys.RunType, global);
    }

    /**
     * Sets the run type in global metadata.
     *
     * @static
     * @param {_Enums.RunTypes} value - The run type to be set.
     */
    public static set runType(value: _Enums.RunTypes) {
        Reflect.defineMetadata(_Enums.MetadataKeys.RunType, value, global);
    }
}
