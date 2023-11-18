import { Errors } from "@errors/index.js";

export class _TaskIsMissing extends Errors.Base {
    constructor() {
        super("The `task` key declaration is missing in `nest-cli.json`.");
    }
}
