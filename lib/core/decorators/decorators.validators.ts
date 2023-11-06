import { _Errors } from "./errors/index.js";
import { _Types } from "./decorators.types.js";
import { _Constants } from "./decorators.constants.js";

export namespace _Validators {
    export namespace Descriptable {
        export function keys(keys: (_Types.Task.MetadataKeys | _Types.Module.MetadataKeys)[]): void | never {
            _Constants.Descriptable.metadataKeys.forEach((key: _Types.DescriptableKeys): void => {
                if (keys.includes(key)) {
                    return;
                }

                throw new _Errors.InvalidMetadataKey(key);
            });
        }
    }

    export namespace Task {
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

    export namespace Module {
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
