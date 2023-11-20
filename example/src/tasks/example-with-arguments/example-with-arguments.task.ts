import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { _Runner } from "./example-with-arguments.runner";

@Decorators.Task({
    name: "ExampleTaskWithArguments",
    description: "Task create for demonstration how you should pass arguments to task",
    runner: _Runner,
    module: AppModule,
    providers: [],
})
export class _Task {}
