import { Transformers } from "@transformers/index.js";

import { _Types } from "./notes.types.js";

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
