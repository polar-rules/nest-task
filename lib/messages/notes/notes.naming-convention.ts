import { Transformers } from "@transformers/index.js";

import { _Types } from "./notes.types.js";

/**
 * Display a note about naming conventions based on the configuration in `nest-cli.json`.
 *
 * @param {Object} options - Options object.
 * @param {boolean} options.space - Whether to include a space before the note.
 * @returns {void} - No return value.
 */
export function _NamingConvention({ space }: _Types.SpaceOptions): void {
    console.info(
        Transformers.Prettify(
            "Note: we will create files according to naming `convention` configuration in `nest-cli.json`.",
            "white",
        ),
    );

    if (!space) {
        return;
    }

    console.info();
}
