import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { _Runner } from "./example.runner";

@Decorators.Task({
    name: "ExampleTask",
    description: "Task create for example purposes only",
    runner: _Runner,
    module: AppModule,
    providers: [],
})
export class _Task {}
