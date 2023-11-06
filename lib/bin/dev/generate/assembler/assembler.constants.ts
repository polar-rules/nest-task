import * as path from "path";

import { Patches } from "@patches/index.js";
import { Tools } from "@tools/index.js";

import { _Types } from "./assembler.types.js";

export namespace _Constants {
    export namespace Dummies {
        export const fileLines: Readonly<_Types.FileLines> = {
            imports: {
                types: [],
                constants: [],
                folders: [],
                files: [],
            },
            exports: {
                types: [],
                constants: [],
                folders: [],
                files: [],
            },
        };

        export const entities: Readonly<_Types.Main.Entities> = {
            types: [],
            constants: [],
            folders: [],
            files: [],
        };
    }

    export namespace Directories {
        export namespace Paths {
            export const root: Readonly<string> = Tools.PathManager.Main.instance.projectRoot;

            export const lib: Readonly<string> = path.join(root, "lib");

            export const specs: Readonly<string> = path.join(root, "specs");
        }

        export const ignore: Readonly<string[]> = [
            "lib",
            "lib/tmp",
            "specs",
            "specs/unit",
            "specs/integration",
            "specs/integration/cli",
        ];
    }

    export namespace Files {
        export const ignore: Readonly<string[]> = ["index.ts"];

        export const eslintConfig: Readonly<string> = path.join(Directories.Paths.root, ".eslintrc.json");

        export const prettierConfig: Readonly<string> = path.join(Directories.Paths.root, ".prettierrc");
    }

    export namespace Extensions {
        export const ignore: Readonly<string[]> = [".spec.ts", ".d.ts", ".json", ".template", "exec.ts"];
    }

    export namespace Template {
        export const location: Readonly<string> = Tools.PathManager.Main.instance.moduleTypePathResolver(
            "bin/dev/generate/assembler/assembler.template",
        );

        export namespace Import {
            export const file: Readonly<Patches.String> = new Patches.String(
                'import * as $variableName from "$exportFrom.js"',
            );

            export const folder: Readonly<Patches.String> = new Patches.String(
                'import * as $variableName from "$exportFrom/index.js"',
            );
        }

        export namespace Export {
            export const statement: Readonly<Patches.String> = new Patches.String(
                "export import $moduleName = $subModuleName",
            );
        }
    }
}
