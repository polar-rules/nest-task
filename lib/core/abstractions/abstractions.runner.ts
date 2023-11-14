import { INestApplication } from "@nestjs/common";

export abstract class _Runner {
    public abstract perform(app: INestApplication, args?: Record<string, string | number>): Promise<void>;
}
