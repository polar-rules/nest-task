import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { TestRunner } from "./test.runner";

@Decorators.Task({
    name: "TestTask",
    description: "Runner created for test purposes",
    runner: TestRunner,
    module: AppModule,
    providers: [],
})
export class TestTask {}
