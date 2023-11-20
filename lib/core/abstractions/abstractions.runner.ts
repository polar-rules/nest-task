// import { INestApplication } from "@nestjs/common";

export abstract class _Runner {
    public abstract perform(args?: object): Promise<void>;
}
