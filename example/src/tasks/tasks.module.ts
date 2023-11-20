import { Decorators } from "@bear-hugs/nest-task";

import { _ExampleBasic } from "./example-basic";
import { _ExampleWithApp } from "./example-with-app";
import { _ExampleWithAppAndArguments } from "./example-with-app-and-arguments";
import { _ExampleWithArguments } from "./example-with-arguments";
import { _ExampleWithProviders } from "./example-with-providers";

@Decorators.Module({
    tasks: [
        _ExampleBasic.Task,
        _ExampleWithAppAndArguments.Task,
        _ExampleWithApp.Task,
        _ExampleWithArguments.Task,
        _ExampleWithProviders.Task,
    ],
})
export class _Module {}
