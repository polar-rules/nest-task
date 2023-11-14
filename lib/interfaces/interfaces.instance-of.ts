export function _InstanceOf<Return>(object: any, key: any): object is Return {
    return key in object;
}
