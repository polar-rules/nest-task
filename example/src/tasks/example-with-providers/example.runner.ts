import { Decorators } from "@bear-hugs/nest-task";

@Decorators.Runner()
export class _Runner {
    public async perform(app, args): Promise<void> {
        console.log("Example run!");
        console.log("args", args);
    }
}
