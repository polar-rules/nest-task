import { Cli } from "@cli/index.js";

export async function _Runner(): Promise<void> {
    await new Cli.Bear.Main().run();
}
