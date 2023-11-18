import { Abstractions, Decorators } from "@bear-hugs/nest-task";
import { AppService } from "../../app.service";

@Decorators.Runner()
export class _Runner extends Abstractions.Runner {
    constructor(private readonly appService: AppService) {
        super();
    }

    public async perform(): Promise<void> {
        console.log("appService", this.appService);
        // Write your code here
    }
}
