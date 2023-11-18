import { Abstractions, Decorators } from "@bear-hugs/nest-task";

@Decorators.Runner()
export class _Runner extends Abstractions.Runner {
    public async perform(): Promise<void> {
        // Write your code here
    }
}
