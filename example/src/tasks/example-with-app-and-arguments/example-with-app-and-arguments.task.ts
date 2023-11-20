import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { _Runner } from "./example-with-app-and-arguments.runner";

@Decorators.Task({
    name: "ExampleWithAppAndArguments",
    description: "Task created for demonstration how you should pass Nest app and arguments together to task",
    runner: _Runner,
    module: AppModule,
    providers: [],
})
export class _Task {}
