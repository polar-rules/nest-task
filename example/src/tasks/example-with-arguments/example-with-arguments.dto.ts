import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { Decorators } from "@bear-hugs/nest-task";

export class _Dto {
    @Decorators.Property()
    @Type(() => String)
    @IsString()
    data: string;

    @Decorators.Property()
    @Type(() => IsNumber)
    @IsNumber()
    userId: number;
}
