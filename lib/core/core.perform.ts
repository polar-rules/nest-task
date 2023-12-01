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

/**
 * Handles the execution of a task, including dependency resolution and argument handling.
 *
 * @class
 */
export class _Perform {
    /**
     * Logger instance for the _Perform class.
     *
     * @private
     * @readonly
     * @type {Logger}
     */
    private readonly logger: Logger = new Logger("NestTask::Core::Perform");

    /**
     * Constructs a new instance of the _Perform class.
     *
     * @constructor
     * @param { _Task } task - The task to be executed.
     */
    public constructor(private readonly task: _Task) {}

    /**
     * Asynchronously runs the task, handling dependencies, validation, and execution.
     *
     * @async
     * @method
     * @returns {Promise<void | never>} A Promise that resolves when the task has been executed.
     */
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

    /**
     * Resolves dependencies based on the provided application and providers.
     *
     * @private
     * @method
     * @param {INestApplication} app - The Nest application instance.
     * @param {Interfaces.General.AnyClass[]} providers - The providers associated with the task.
     * @returns {_Types.Perform.ResolveDependencies} A function to resolve dependencies for the task.
     */
    private resolveDependencies(
        app: INestApplication,
        providers: Interfaces.General.AnyClass[],
    ): _Types.Perform.ResolveDependencies {
        const logger = this.logger;
        const name = this.task.name;

        return function (dependency: Interfaces.General.AnyClass, index: number): any | undefined {
            logger.log(`${name} initializing dependency ${dependency.name}`);

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

    /**
     * Resolves and handles arguments for the task.
     *
     * @async
     * @private
     * @method
     * @param {INestApplication} app - The Nest application instance.
     * @returns {Promise<_Types.Perform.Argument[]>} An array of resolved arguments for the task.
     */
    private async resolveArguments(app: INestApplication): Promise<_Types.Perform.Argument[]> {
        const args: _Types.Perform.Argument[] = [];

        await this.handleDtoArgument(args);
        await this.handleAppArgument(app, args);

        return args;
    }

    /**
     * Handles the application argument if specified in the task.
     *
     * @async
     * @private
     * @method
     * @param {INestApplication} app - The Nest application instance.
     * @param {_Types.Perform.Argument[]} args - The array of arguments for the task.
     */
    private async handleAppArgument(app: INestApplication, args: _Types.Perform.Argument[]): Promise<void> {
        if (this.task.appIndex === undefined) {
            return;
        }

        args[this.task.appIndex] = app;
    }

    /**
     * Handles the DTO (Data Transfer Object) argument if specified in the task.
     *
     * @async
     * @private
     * @method
     * @param {_Types.Perform.Argument[]} args - The array of arguments for the task.
     */
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

            switch (arg.type) {
                case "boolean":
                    dto[arg.name] = Boolean(argument);
                    break;
                case "number":
                    dto[arg.name] = Number(argument);
                    break;
                case "string":
                case "undefined":
                case "null":
                default:
                    dto[arg.name] = argument;
                    break;
            }
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
