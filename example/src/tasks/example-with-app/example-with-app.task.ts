import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { _Runner } from "./example-with-app.runner";

@Decorators.Task({
    name: "ExampleWithApp",
    description: "Task create for demonstration how you should pass Nest app to task",
    runner: _Runner,
    module: AppModule,
    providers: [],
})
export class _Task {}
