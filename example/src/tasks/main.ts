import { Factory } from "@polar-rules/nest-task";

import { TasksModule } from "./tasks.module";

async function main(): Promise<void> {
    const app = await Factory.create(TasksModule);

    await app.run();
}

main();
