import { Patches } from "@patches/index.js";

import { _Enums } from "./core.enums.js";
import { _Task } from "./core.task.js";

export class _State {
    public static get tasksList(): _Task[] {
        return Patches.Reflect.getMetadata<_Task[]>(_Enums.MetadataKeys.TasksList, global);
    }

    public static set tasksList(value: _Task[]) {
        Reflect.defineMetadata(_Enums.MetadataKeys.TasksList, value, global);
    }
}
