import fs from "fs/promises";

import { Tools } from "@tools/index.js";
import { Configs } from "@specs/configs/index.js";

export namespace _Essentials {
    const tmpPath = Tools.PathManager.Main.instance.pathResolver(Configs.Constants.Folders.tmp);

    export namespace Before {
        export async function all(): Promise<void> {
            await fs.mkdir(tmpPath, { recursive: true });
        }
    }

    export namespace After {
        export async function all(): Promise<void> {
            await fs.rm(tmpPath, { recursive: true, force: true });
        }
    }
}
