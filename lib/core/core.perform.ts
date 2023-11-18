import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { INestApplication, Logger } from "@nestjs/common";

import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Decorators } from "./decorators/index.js";
import { _Types } from "./core.types.js";
import { _Validators } from "./core.validators.js";
import { _ArgumentsManager } from "./core.arguments-manager.js";

export class _Perform {
    private readonly name: string;

    private readonly logger: Logger = new Logger("NestTask::Core::Perform");

    public constructor(private readonly task: Interfaces.General.AnyClass<any, any>) {
        this.name = Patches.Reflect.getMetadata<string>(_Decorators.Enums.Metadata.Descriptable.Name, task);
    }

    public async run(): Promise<void | never> {
        const { Runner, Module, providers, dependencies } = this.prepareMetadata();
        const app = await NestFactory.create(Module);

        const resolvedDependencies = dependencies.map(this.resolveDependencies(app, providers));

        _Validators.Perform.validateDependencies(resolvedDependencies);

        const runner = new Runner(...resolvedDependencies);

        this.logger.log(`${this.name} starting execution...`);

        await runner.perform(app, _ArgumentsManager.taskArguments);

        this.logger.log(`${this.name} execution is done`);
    }

    private prepareMetadata(): _Types.Perform.PrepareMetadata {
        const Runner = Patches.Reflect.getMetadata<Interfaces.General.AnyClass<_Abstractions.Runner, any>>(
            _Decorators.Enums.Metadata.Task.Runner,
            this.task,
        );
        this.logger.log(`${this.name} runner has been loaded`);
        const Module = Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>>(
            _Decorators.Enums.Metadata.Task.Module,
            this.task,
        );
        this.logger.log(`${this.name} module has been loaded`);
        const providers =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>[]>(
                _Decorators.Enums.Metadata.Task.Providers,
                this.task,
            ) ?? [];

        for (const provider of providers) {
            this.logger.log(`${this.name} provider ${provider.name} has been loaded`);
        }

        const dependencies =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>[]>(
                _Decorators.Enums.Metadata.BuildIn.ParamTypes,
                Runner,
            ) ?? [];

        this.logger.log(`${this.name} dependencies initialized`);

        return {
            Runner,
            Module,
            providers,
            dependencies,
        };
    }

    private resolveDependencies(
        app: INestApplication,
        providers: Interfaces.General.AnyClass<any, any>[],
    ): _Types.Perform.ResolveDependencies {
        const logger = this.logger;
        const name = this.name;

        return function (dependency: Interfaces.General.AnyClass<any, any>, index: number): any | undefined {
            logger.log(`${name} initialising dependency ${dependency.name}`);

            const found = providers.find(
                (provider: Interfaces.General.AnyClass<any, any>): boolean => provider.name === dependency.name,
            );

            if (!found) {
                logger.error(`${name} couldn't resolve dependency at index [${index}]`);
                return undefined;
            }

            return app.get(found);
        };
    }
}
