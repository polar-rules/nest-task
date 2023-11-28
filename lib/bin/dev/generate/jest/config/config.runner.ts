import { Cli } from "@cli/index.js";

export async function _Runner() {
    try {
        const main = new Cli.Dev.Generate.Jest.Config.Main();

        main.configure();
        await main.generate();
        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
