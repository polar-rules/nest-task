import { Factory } from "@bear-hugs/nest-task";

import { _Module } from "./tasks.module";

async function main(): Promise<void> {
    const app = await Factory.create(_Module);

    await app.run();
}

main();

