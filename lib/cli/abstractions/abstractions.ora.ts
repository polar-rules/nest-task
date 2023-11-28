import * as Ora from "ora";

export class _Ora {
    private ora!: Ora.Ora;

    private get Ora(): Ora.OraLike {
        return typeof Ora === "function" ? Ora : (<Ora.Default>Ora).default;
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
