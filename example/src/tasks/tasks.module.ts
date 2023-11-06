import { Decorators } from "@bear-hugs/nest-task";

import { TestTask } from "./test/test.task";

@Decorators.Module({
    tasks: [TestTask],
})
export class TasksModule {}
