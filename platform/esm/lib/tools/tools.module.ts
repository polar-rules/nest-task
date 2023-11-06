import * as url from "url";
import * as path from "path";

export class _Module {
    public static get isCJS(): boolean {
        return false;
    }

    public static get dirname(): string {
        return path.dirname(url.fileURLToPath(import.meta.url));
    }
}
