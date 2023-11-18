import { Errors } from "@errors/index.js";

export class _TaskIsPresentInConfig extends Errors.Base {
    constructor() {
        super("The `task` key declaration is already present in `nest-cli.json`.");
    }
}
