import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";

import { ExampleWithAppRunner } from "./example-with-app.runner";

@Decorators.Task({
    name: "ExampleWithApp",
    description: "Task created for demonstration how you should pass Nest app to task",
    runner: ExampleWithAppRunner,
    module: AppModule,
    providers: [],
})
export class ExampleWithAppTask {}
