import { Decorators } from "@polar-rules/nest-task";

import { AppModule } from "../../app.module";

import { ExampleWithAppAndArgumentsRunner } from "./example-with-app-and-arguments.runner";

@Decorators.Task({
    name: "ExampleWithAppAndArguments",
    description: "Task created for demonstration how you should pass Nest app and arguments together to task",
    runner: ExampleWithAppAndArgumentsRunner,
    module: AppModule,
    providers: [],
})
export class ExampleWithAppAndArgumentsTask {}
