import { Cli } from "@cli/index.js";

export async function _Runner(): Promise<void> {
    try {
        const main = new Cli.Dev.Generate.Assembler.Main();

        main.configure();

        await main.generate(Cli.Dev.Generate.Assembler.Constants.Directories.Paths.lib);
        await main.generate(Cli.Dev.Generate.Assembler.Constants.Directories.Paths.specs);

        main.finish();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
