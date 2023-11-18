import { Errors } from "@errors/index.js";

export class _MissingName extends Errors.Base {
    public constructor() {
        super("Could retrieve module name while executing script!");
    }
}
