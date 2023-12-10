import { Decorators } from "@polar-rules/nest-task";

import { AppService } from "../../app.service";

@Decorators.Runner()
export class ExampleDeprecatedRunner {
    public constructor(private readonly appService: AppService) {}

    public async perform(): Promise<void> {
        console.log("Example with `providers`!");
        console.log(this.appService);
    }
}
