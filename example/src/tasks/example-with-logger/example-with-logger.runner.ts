import { Logger } from "@nestjs/common";

import { Decorators } from "@polar-rules/nest-task";

@Decorators.Runner()
export class ExampleWithLoggerRunner {
    public async perform(@Decorators.Logger() logger: Logger): Promise<void> {
        console.info("Example with `logger`!");
        console.info(logger);
        logger.log("Test");
    }
}
