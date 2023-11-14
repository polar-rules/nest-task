import { _Enums } from "./abstractions.enums.js";

export namespace _Types {
    export namespace FileResolver {
        export interface ApproximateTask {
            path: string;
            entryPoint: string;
            convention: _Enums.Conventions;
        }
    }
}
