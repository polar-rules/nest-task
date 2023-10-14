export class _Object extends Object {
    public static typeSafeKeys<Obj extends object>(object: Obj): (keyof Obj)[] {
        return Object.keys(object) as (keyof Obj)[];
    }
}
