import { INestApplication } from "@nestjs/common";

import { Decorators } from "@bear-hugs/nest-task";

import { ExampleWithAppAndArgumentsDto } from "./example-with-app-and-arguments.dto";

@Decorators.Runner()
export class ExampleWithAppAndArgumentsRunner {
    public async perform(
        @Decorators.App() app: INestApplication,
        @Decorators.Arguments() args: ExampleWithAppAndArgumentsDto,
    ): Promise<void> {
        console.info("Example with `app` and `args`!");
        console.info(`args`);
        console.info(args);
        console.info(`app`);
        console.info(app);
    }
}
