import { Errors } from "@errors/index.js";

export class _NoPackageJson extends Errors.Base {
    constructor() {
        super("No `package.json` was found!");
    }
}
