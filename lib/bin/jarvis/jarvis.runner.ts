import { Cli } from "@cli/index.js";

export async function _Runner(): Promise<void> {
    await new Cli.Jarvis.Main().run();
}
