import { Errors } from "@errors/index.js";

export class _MissingNestCli extends Errors.Base {
    constructor() {
        super("Unable to locate `nest-cli.json`.");
    }
}
