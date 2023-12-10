import { Decorators } from "@polar-rules/nest-task";

import { AppModule } from "../../app.module";

import { ExampleDeprecatedRunner } from "./example-deprecated.runner";

@Decorators.Task({
    name: "ExampleDeprecated",
    description: "Task created for demonstration deprecation should be passed",
    runner: ExampleDeprecatedRunner,
    module: AppModule,
    deprecated: true,
})
export class ExampleDeprecatedTask {}
