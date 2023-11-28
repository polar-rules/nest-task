import { _Ora } from "./abstractions.ora.js";

export abstract class _Loader {
    public constructor() {}

    protected ora: _Ora = new _Ora();

    public abstract finish(): void;

    public configure(): void {
        this.ora.start("Configuring");
    }
}
