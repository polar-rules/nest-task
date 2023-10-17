import Loader, { Ora } from "ora";

export class _Loader {
    private ora!: Ora;

    public start(text: string): void {
        this.ora = Loader({ text }).start();
    }

    public message(text: string): void {
        this.ora.text = text;
    }

    public finish(text: string): void {
        this.ora.succeed(text);
    }
}
