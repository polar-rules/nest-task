import { _Constants } from "./assembler.constants";
import { _Main } from "./assembler.main";

export async function _Runner(): Promise<void> {
    try {
        const main = new _Main();

        await main.loadPackages();

        await main.generate(_Constants.Directories.Paths.lib);
        await main.generate(_Constants.Directories.Paths.specs);

        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
