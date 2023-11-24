import * as Loader from "ora";

export class _Loader {
    private ora!: Loader.Ora;

    private get Ora(): Loader.OraLike {
        return typeof Loader === "function" ? Loader : (<Loader.Default>Loader).default;
    }

    public start(text: string): void {
        this.ora = this.Ora({ text }).start();
    }

    public message(text: string): void {
        this.ora.text = text;
    }

    public finish(text: string): void {
        this.ora.succeed(text);
    }
}
