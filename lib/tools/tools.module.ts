import * as url from "url";
import * as path from "path";

export class _Module {
    public static get isCJS(): boolean {
        try {
            return Boolean(__dirname);
        } catch {
            return false;
        }
    }

    public static get dirname(): string {
        try {
            return __dirname;
        } catch {
            return path.dirname(url.fileURLToPath(eval("import.meta.url")));
        }
    }
}
