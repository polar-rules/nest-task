import { Decorators } from "@polar-rules/nest-task";

import { ExampleBasicTask } from "./example-basic/example-basic.task";
import { ExampleWithAppTask } from "./example-with-app/example-with-app.task";
import { ExampleWithAppAndArgumentsTask } from "./example-with-app-and-arguments/example-with-app-and-arguments.task";
import { ExampleWithArgumentsTask } from "./example-with-arguments/example-with-arguments.task";
import { ExampleWithProvidersTask } from "./example-with-providers/example-with-providers.task";
import { ExampleDeprecatedTask } from "./example-deprecated/example-deprecated.task";
import { ExampleWithLoggerTask } from "./example-with-logger/example-with-logger.task";

@Decorators.Module({
    tasks: [
        ExampleBasicTask,
        ExampleWithAppTask,
        ExampleWithAppAndArgumentsTask,
        ExampleWithArgumentsTask,
        ExampleWithProvidersTask,
        ExampleDeprecatedTask,
        ExampleWithLoggerTask,
    ],
})
export class TasksModule {}
