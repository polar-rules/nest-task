import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { Decorators } from "@polar-rules/nest-task";

export class ExampleWithArgumentsDto {
    @Decorators.Property()
    @Type(() => String)
    @IsString()
    data: string;

    @Decorators.Property()
    @Type(() => IsNumber)
    @IsNumber()
    userId: number;
}
