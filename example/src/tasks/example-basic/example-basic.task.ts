import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";

import { ExampleBasicRunner } from "./example-basic.runner";

@Decorators.Task({
    name: "ExampleBasic",
    description: "Task created for demonstration how to create basic example of task",
    runner: ExampleBasicRunner,
    module: AppModule,
    providers: [],
})
export class ExampleBasicTask {}
