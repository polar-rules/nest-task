import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { _Runner } from "./add-users.runner";

@Decorators.Task({
    name: "AddUsers",
    description: "Description really long",
    runner: _Runner,
    module: AppModule,
    providers: [],
})
export class _Task {}
