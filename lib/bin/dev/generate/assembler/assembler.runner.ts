import { _Constants } from "./assembler.constants.js";
import { _Main } from "./assembler.main.js";

export async function _Runner(): Promise<void> {
    try {
        const main = new _Main();

        main.configure();
        await main.generate(_Constants.Directories.Paths.lib);
        await main.generate(_Constants.Directories.Paths.specs);
        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
