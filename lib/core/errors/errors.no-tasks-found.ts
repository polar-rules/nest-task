import { Errors } from "@errors/index.js";

export class _NoTasksFound extends Errors.Base {
    constructor() {
        super("Unable to locate any tasks!");
    }
}
