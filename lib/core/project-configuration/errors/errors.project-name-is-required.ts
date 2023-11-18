import { Errors } from "@errors/index.js";

export class _ProjectNameIsRequired extends Errors.Base {
    constructor() {
        super("You need to select `projectName`.");
    }
}
