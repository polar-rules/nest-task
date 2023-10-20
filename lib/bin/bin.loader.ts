import * as Loader from "ora";

export class _Loader {
    private ora!: Loader.Ora;

    public start(text: string): void {
        this.ora = (<any>Loader?.default ?? Loader)({ text }).start();
    }

    public message(text: string): void {
        this.ora.text = text;
    }

    public finish(text: string): void {
        this.ora.succeed(text);
    }
}
