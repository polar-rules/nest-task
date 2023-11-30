import { _Errors } from "./errors/index.js";
import { _Types } from "./decorators.types.js";
import { _Constants } from "./decorators.constants.js";

/**
 * Namespace containing validators for decorators
 * .
 * @namespace _Validators
 */
export namespace _Validators {
    /**
     * Namespace containing validators for descriptable metadata.
     *
     * @namespace Descriptable
     */
    export namespace Descriptable {
        /**
         * Validate if the provided keys match descriptable metadata keys.
         *
         * @function keys
         * @param {(_Types.Task.MetadataKeys | _Types.Module.MetadataKeys)[]} keys - The keys to validate.
         * @returns {void} Throws an error if validation fails.
         * @throws {_Errors.InvalidMetadataKey} Throws an error for invalid metadata keys.
         */
        export function keys(keys: (_Types.Task.MetadataKeys | _Types.Module.MetadataKeys)[]): void | never {
            _Constants.Descriptable.metadataKeys.forEach((key: _Types.DescriptableKeys): void => {
                if (keys.includes(key)) {
                    return;
                }

                throw new _Errors.InvalidMetadataKey(key);
            });
        }
    }

    /**
     * Namespace containing validators for task metadata.
     *
     * @namespace Task
     */
    export namespace Task {
        /**
         * Validate if the provided keys match task metadata keys.
         *
         * @function keys
         * @param {_Types.Task.MetadataKeys[]} keys - The keys to validate.
         * @returns {void} Throws an error if validation fails.
         * @throws {_Errors.InvalidMetadataKey} Throws an error for invalid metadata keys.
         */
        export function keys(keys: _Types.Task.MetadataKeys[]): void | never {
            _Constants.Task.metadataKeys.forEach((key: _Types.Task.MetadataKeys): void => {
                if (_Constants.Task.optionalMetadataKeys.includes(key)) {
                    return;
                }

                if (keys.includes(key)) {
                    return;
                }

                throw new _Errors.InvalidMetadataKey(key);
            });
        }
    }

    /**
     * Namespace containing validators for module metadata.
     *
     * @namespace Module
     */
    export namespace Module {
        /**
         * Validate if the provided keys match module metadata keys.
         *
         * @function keys
         * @param {_Types.Module.MetadataKeys[]} keys - The keys to validate.
         * @returns {void} Throws an error if validation fails.
         * @throws {_Errors.InvalidMetadataKey} Throws an error for invalid metadata keys.
         */
        export function keys(keys: _Types.Module.MetadataKeys[]): void | never {
            _Constants.Module.metadataKeys.forEach((key: _Types.Module.MetadataKeys): void => {
                if (keys.includes(key)) {
                    return;
                }

                throw new _Errors.InvalidMetadataKey(key);
            });
        }
    }
}
