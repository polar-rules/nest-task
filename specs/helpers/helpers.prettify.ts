export namespace _Prettify {
    export function removeANSICodes(string: string): string {
        return string.replace(/\x1B\[\d+m/g, "");
    }
}
