import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { AppService } from "../../app.service";

import { ExampleWithProvidersRunner } from "./example-with-providers.runner";

@Decorators.Task({
    name: "ExampleWithProvider",
    description: "Task created for demonstration how you should pass providers to task",
    runner: ExampleWithProvidersRunner,
    module: AppModule,
    providers: [AppService],
})
export class ExampleWithProvidersTask {}
