export class _Base extends Error {
    public readonly custom: boolean = true;

    public constructor(text: string) {
        super(text);
    }
}
