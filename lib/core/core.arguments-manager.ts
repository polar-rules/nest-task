import "reflect-metadata";

import { Patches } from "@patches/index.js";

import { _Enums } from "./core.enums.js";

export class _ArgumentsManager {
    public static get taskName(): string {
        return Patches.Reflect.getMetadata<string>(_Enums.MetadataKeys.TaskName, global);
    }

    public static set taskName(value: string) {
        Reflect.defineMetadata(_Enums.MetadataKeys.TaskName, value, global);
    }

    public static get runType(): _Enums.RunTypes {
        return Patches.Reflect.getMetadata<_Enums.RunTypes>(_Enums.MetadataKeys.RunType, global);
    }

    public static set runType(value: _Enums.RunTypes) {
        Reflect.defineMetadata(_Enums.MetadataKeys.RunType, value, global);
    }
}
