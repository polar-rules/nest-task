import { Core } from "@core/index.js";

export async function _Runner(): Promise<void> {
    try {
        const setup = new Core.Setup.Main();

        await setup.write();

        process.exit(0);
    } catch (e: unknown) {
        console.error(e);
        process.exit(1);
    }
}
