export class _Reflect {
    public static getMetadata<Return>(metadataKey: string, target: any, key?: string | symbol): Return {
        if (key) {
            return Reflect.getMetadata(metadataKey, target, key);
        }

        return Reflect.getMetadata(metadataKey, target);
    }
}
