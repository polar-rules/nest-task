import { Transformers } from "@transformers/index.js";

import { _Types } from "./notes.types.js";

export function _UpdateTaskModule({ space }: _Types.SpaceOptions): void {
    if (space) {
        console.info();
    }

    console.info(
        Transformers.Prettify("Note: Don't forget to update `task.module.ts` file to include new runner!", "white"),
    );
}
