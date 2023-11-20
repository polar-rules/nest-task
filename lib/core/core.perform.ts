import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { INestApplication, Logger } from "@nestjs/common";

import { validateOrReject, ValidationError } from "class-validator";

import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Errors } from "./errors/index.js";
import { _Decorators } from "./decorators/index.js";
import { _Types } from "./core.types.js";
import { _Task } from "./core.task.js";
import { _Validators } from "./core.validators.js";
import { _ArgumentsManager } from "./core.arguments-manager.js";

export class _Perform {
    private readonly logger: Logger = new Logger("NestTask::Core::Perform");

    public constructor(private readonly task: _Task) {}

    public async run(): Promise<void | never> {
        const dependencies =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass[]>(
                _Decorators.Enums.Metadata.BuildIn.ParamTypes,
                this.task.runner,
            ) ?? [];
        const app = await NestFactory.create(this.task.module);

        for (const provider of this.task.providers) {
            this.logger.log(`${this.task.name} provider ${provider.name} has been loaded`);
        }

        const resolvedDependencies = dependencies.map(this.resolveDependencies(app, this.task.providers));

        _Validators.Perform.validateDependencies(resolvedDependencies);

        this.logger.log(`${this.task.name} dependencies initialized`);

        const runner = new this.task.runner(...resolvedDependencies);

        this.logger.log(`${this.task.name} starting execution...`);

        const args = await this.resolveArguments(app);

        await runner.perform(...args);

        this.logger.log(`${this.task.name} execution is done`);
    }

    private resolveDependencies(
        app: INestApplication,
        providers: Interfaces.General.AnyClass[],
    ): _Types.Perform.ResolveDependencies {
        const logger = this.logger;
        const name = this.task.name;

        return function (dependency: Interfaces.General.AnyClass, index: number): any | undefined {
            logger.log(`${name} initialising dependency ${dependency.name}`);

            const found = providers.find(
                (provider: Interfaces.General.AnyClass): boolean => provider.name === dependency.name,
            );

            if (!found) {
                logger.error(`${name} couldn't resolve dependency at index [${index}]`);
                return undefined;
            }

            return app.get(found);
        };
    }

    private async resolveArguments(app: INestApplication): Promise<_Types.Perform.Argument[]> {
        const args: _Types.Perform.Argument[] = [];

        await this.handleDtoArgument(args);
        await this.handleAppArgument(app, args);

        return args;
    }

    private async handleAppArgument(app: INestApplication, args: _Types.Perform.Argument[]): Promise<void> {
        if (this.task.appIndex === undefined) {
            return;
        }

        args[this.task.appIndex] = app;
    }

    private async handleDtoArgument(args: _Types.Perform.Argument[]): Promise<void> {
        if (!this.task.dto) {
            return;
        }

        if (this.task.dtoIndex === undefined) {
            return;
        }

        const dto = new this.task.dto();

        for (const arg of this.task.args) {
            if (!_ArgumentsManager.taskArguments) {
                continue;
            }

            const argument = _ArgumentsManager.taskArguments[arg.name];

            if (argument === undefined) {
                dto[arg.name] = argument;
                continue;
            }

            if (argument === null) {
                dto[arg.name] = argument;
                continue;
            }

            if (!arg.metadata.reflectedType) {
                dto[arg.name] = argument;
                continue;
            }

            dto[arg.name] = arg.metadata.reflectedType(argument);
        }

        try {
            await validateOrReject(dto);
            args[this.task.dtoIndex] = dto;
        } catch (e: unknown) {
            if (Array.isArray(e)) {
                const isNotValidationError = e
                    .map((error: unknown): boolean => error instanceof ValidationError)
                    .some((error: boolean): boolean => !error);

                if (isNotValidationError) {
                    throw e;
                }

                const errors = e.reduce(
                    (acc: Record<string, string[]>, error: ValidationError): Record<string, string[]> => {
                        if (!error.constraints) {
                            return acc;
                        }

                        acc[error.property] = Object.values(error.constraints);

                        return acc;
                    },
                    {},
                );

                throw new _Errors.Validation(errors);
            }

            throw e;
        }
    }
}
