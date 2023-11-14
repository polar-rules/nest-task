import { Decorators } from "@bear-hugs/nest-task";

import { _Example } from "./example/";

@Decorators.Module({
    tasks: [_Example.Task],
})
export class _Module {}
