import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { AppService } from "../../app.service";

import { _Runner } from "./test-add.runner";

@Decorators.Task({
    name: "TestAdd",
    description: "Some descriptiobn",
    runner: _Runner,
    module: AppModule,
    providers: [AppService],
})
export class _Task {}
