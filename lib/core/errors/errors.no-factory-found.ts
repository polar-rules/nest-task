import { Errors } from "@errors/index.js";

export class _NoFactoryFound extends Errors.Base {
    constructor() {
        super("Unable to locate factory instance!");
    }
}
