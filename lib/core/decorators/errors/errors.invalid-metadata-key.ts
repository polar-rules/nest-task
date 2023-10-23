export class _InvalidMetadataKey extends Error {
    constructor(key: string) {
        super(`Invalid property '${key}' passed into the @Task() decorator`);
    }
}
