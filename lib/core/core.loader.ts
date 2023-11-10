import { _ProjectConfiguration } from "./project-configuration/index.js";

export class _Loader {
    private readonly projectConfiguration: _ProjectConfiguration.Main;

    public constructor(private readonly projectName?: string) {
        this.projectConfiguration = new _ProjectConfiguration.Main(this.projectName);
    }

    public async run(): Promise<void> {
        await this.projectConfiguration.readAndLoad();
        await import(this.projectConfiguration.entrypointPath);
    }
}
