import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { ExampleRunner } from "./example.runner";

@Decorators.Task({
    name: "ExampleTask",
    description: "Task create for example purposes only",
    runner: ExampleRunner,
    module: AppModule,
    providers: [],
})
export class ExampleTask {}
