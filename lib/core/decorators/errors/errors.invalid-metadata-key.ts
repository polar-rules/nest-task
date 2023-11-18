import { Errors } from "@errors/index.js";

export class _InvalidMetadataKey extends Errors.Base {
    constructor(key: string) {
        super(`Invalid property '${key}' passed into the @Task() decorator`);
    }
}
