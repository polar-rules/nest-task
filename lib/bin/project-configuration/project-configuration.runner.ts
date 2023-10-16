import { Core } from "@core/index.js";

export async function _Runner(): Promise<void> {
    try {
        const main = new Core.ProjectConfiguration.Main();

        await main.readAndLoad();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
