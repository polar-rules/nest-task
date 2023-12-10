import { Decorators } from "@polar-rules/nest-task";

import { AppModule } from "../../app.module";

import { ExampleWithLoggerRunner } from "./example-with-logger.runner";

@Decorators.Task({
    name: "ExampleWithLogger",
    description: "Task created for demonstration how you should pass logger to task",
    runner: ExampleWithLoggerRunner,
    module: AppModule,
    providers: [],
})
export class ExampleWithLoggerTask {}
