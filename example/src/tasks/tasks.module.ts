import { Decorators } from "@bear-hugs/nest-task";

import { _Example } from "./example";
import { _ExampleWithArguments } from "./example-with-arguments";

@Decorators.Module({
    tasks: [_ExampleWithArguments.Task],
})
export class _Module {}
