import { Decorators } from "@bear-hugs/nest-task";

@Decorators.Runner()
export class ExampleBasicRunner {
    public async perform(): Promise<void> {
        console.log("Example basic run!");
    }
}
