import { Decorators } from "@bear-hugs/nest-task";

@Decorators.Runner()
export class TestRunner {
    public async perform(): Promise<void> {
        console.log("Example run!");
    }
}
