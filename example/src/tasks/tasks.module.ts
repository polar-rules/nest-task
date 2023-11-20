import { Decorators } from "@bear-hugs/nest-task";

import { _Example } from "./example";
import { _ExampleWithApp } from "./example-with-app";
import { _ExampleWithArguments } from "./example-with-arguments";

@Decorators.Module({
    tasks: [_ExampleWithApp.Task, _ExampleWithArguments.Task],
})
export class _Module {}
