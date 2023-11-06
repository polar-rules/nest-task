import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Enums } from "./core.enums.js";

export class _State {
    public static get tasksList(): Interfaces.General.AnyClass<any, any>[] {
        return Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>[]>(
            _Enums.MetadataKeys.TasksList,
            global,
        );
    }

    public static set tasksList(value: Interfaces.General.AnyClass<any, any>[]) {
        Reflect.defineMetadata(_Enums.MetadataKeys.TasksList, value, global);
    }
}
