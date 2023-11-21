import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";

import { ExampleWithArgumentsRunner } from "./example-with-arguments.runner";

@Decorators.Task({
    name: "ExampleTaskWithArguments",
    description: "Task created for demonstration how you should pass arguments to task",
    runner: ExampleWithArgumentsRunner,
    module: AppModule,
    providers: [],
})
export class ExampleWithArgumentsTask {}
