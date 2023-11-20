import { Decorators } from "@bear-hugs/nest-task";

import { _Dto } from "./example-with-arguments.dto";

@Decorators.Runner()
export class _Runner {
    public async perform(@Decorators.Arguments() args: _Dto): Promise<void> {
        console.log("Example run with `args`!");
        console.log(args);
    }
}
