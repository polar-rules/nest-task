import * as path from "path";
import * as fs from "fs/promises";

import { Patches } from "@patches/index.js";
import { Tools } from "@tools/index.js";

import { _Errors } from "./errors/index.js";
import { _Types } from "./project-configuration.types.js";
import { _Constants } from "./project-configuration.constants.js";

export class _Read {
    public configuration!: _Types.Configuration.Approximate;

    public constructor(private readonly projectName?: string) {}

    public get configurationPath(): string {
        const root = Tools.PathManager.Main.instance.projectRoot;

        return path.join(root, _Constants.configurationFileName);
    }

    public get taskConfiguration(): _Types.Task | undefined | never {
        return this.resolveConfiguration?.task;
    }

    public get resolveConfiguration(): _Types.Configuration.Approximate | never {
        if ("projects" in this.configuration) {
            if (!this.projectName) {
                throw new _Errors.ProjectNameIsRequired();
            }

            const projectConfiguration = this.configuration.projects[this.projectName];

            if (!projectConfiguration) {
                throw new _Errors.MissingProjectConfiguration(this.projectName);
            }

            return projectConfiguration;
        }

        return this.configuration;
    }

    public async run(): Promise<void> {
        const file = await fs.readFile(this.configurationPath);

        this.configuration = Patches.Json.parse<_Types.Configuration.Approximate>(file.toString("utf-8"));
    }
}
