import { INestApplication } from "@nestjs/common";

import { Decorators } from "@polar-rules/nest-task";

@Decorators.Runner()
export class ExampleWithAppRunner {
    public async perform(@Decorators.App() app: INestApplication): Promise<void> {
        console.info("Example with `app`!");
        console.info(app);
    }
}
