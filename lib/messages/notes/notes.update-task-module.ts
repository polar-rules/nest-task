import { Transformers } from "@transformers/index.js";

import { _Types } from "./notes.types.js";

/**
 * Displays a note to remind users to update the `task.module.ts` file to include a new runner.
 *
 * @function _UpdateTaskModule
 * @param {object} options - Options for controlling spacing.
 * @param {boolean} options.space - Whether to include a space before the note.
 */
export function _UpdateTaskModule({ space }: _Types.SpaceOptions): void {
    if (space) {
        console.info();
    }

    console.info(
        Transformers.Prettify("Note: Don't forget to update `task.module.ts` file to include new runner!", "white"),
    );
}
