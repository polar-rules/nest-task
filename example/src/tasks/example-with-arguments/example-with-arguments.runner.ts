import { Decorators } from "@bear-hugs/nest-task";

import { ExampleWithArgumentsDto } from "./example-with-arguments.dto";

@Decorators.Runner()
export class ExampleWithArgumentsRunner {
    public async perform(@Decorators.Arguments() args: ExampleWithArgumentsDto): Promise<void> {
        console.log("Example run with `args`!");
        console.log(args);
    }
}
