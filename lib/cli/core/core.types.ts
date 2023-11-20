import { Core } from "@core/index.js";
import { Messages } from "@messages/index.js";

export namespace _Types {
    export namespace Info {
        export type ProcessTasks = (task: Core.Task) => Messages.Types.FoundTasks.Options;
    }
}
