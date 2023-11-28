import { Core } from "@core/index.js";

export namespace _NestCli {
    export const main: Record<string, any> = {
        $schema: "https://json.schemastore.org/nest-cli",
        collection: "@nestjs/schematics",
        sourceRoot: "src",
        compilerOptions: {
            deleteOutDir: true,
        },
    };

    export const project: Record<string, any> = {
        $schema: "https://json.schemastore.org/nest-cli",
        collection: "@nestjs/schematics",
        sourceRoot: "src",
        projects: {
            api: {
                type: "application",
                root: "src/api",
                entryFile: "api/api.runner",
                sourceRoot: "src",
            },
        },
        compilerOptions: {
            deleteOutDir: true,
        },
    };

    export function mockMerge(config?: Record<string, any>): Record<string, any> {
        const read = new Core.ProjectConfiguration.Read();

        return {
            [read.configurationPath]: JSON.stringify(config ?? main),
        };
    }
}
