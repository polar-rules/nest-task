import { Decorators } from "@bear-hugs/nest-task";

import { _Example } from "./example";
import { _AddUsers } from "./add-users";
import { _TestAdd } from "./test-add";

@Decorators.Module({
    tasks: [_Example.Task, _AddUsers.Task, _TestAdd.Task],
})
export class _Module {}
