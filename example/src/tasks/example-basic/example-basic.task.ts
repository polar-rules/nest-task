import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { _Runner } from "./example-basic.runner";

@Decorators.Task({
    name: "ExampleBasic",
    description: "Task created for demonstration how to create basic example of task",
    runner: _Runner,
    module: AppModule,
    providers: [],
})
export class _Task {}
