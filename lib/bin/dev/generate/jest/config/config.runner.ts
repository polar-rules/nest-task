import { _Main } from "./config.main.js";

export async function _Runner() {
    try {
        const main = new _Main();

        main.configure();
        await main.generate();
        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
