export class _Reflect {
    public static getMetadata<Return>(metadataKey: string, target: any): Return {
        return Reflect.getMetadata(metadataKey, target);
    }
}
