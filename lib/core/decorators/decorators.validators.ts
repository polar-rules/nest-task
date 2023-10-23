import { _Errors } from "./errors/index.js";

import { _Enums } from "./decorators.enums.js";
import { _Constants } from "./decorators.constants.js";

export namespace _Validators {
    export namespace Task {
        function validateModuleKey(key: _Enums.Task.MetadataKeys): void | never {
            if (_Constants.Task.metadataKeys.includes(key)) {
                return;
            }

            throw new _Errors.InvalidMetadataKey(key);
        }

        export function validateModuleKeys(keys: _Enums.Task.MetadataKeys[]): void | never {
            keys.forEach(validateModuleKey);
        }
    }
}
