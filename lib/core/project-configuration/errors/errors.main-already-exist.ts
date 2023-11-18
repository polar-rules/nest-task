import { Errors } from "@errors/index.js";

export class _MainAlreadyExist extends Errors.Base {
    constructor(path: string) {
        super(`File \`${path}\` already exists!`);
    }
}
