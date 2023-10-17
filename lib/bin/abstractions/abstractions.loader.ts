import { _Loader as _BinLoader } from "@bin/bin.loader.js";

export abstract class _Loader {
    public constructor() {}

    protected ora: _BinLoader = new _BinLoader();

    public abstract finish(): void;

    public configure(): void {
        this.ora.start("Configuring");
    }
}
