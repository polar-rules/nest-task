import { INestApplication } from "@nestjs/common";

export abstract class _Base {
    public abstract perform(app: INestApplication): Promise<void>;
}
