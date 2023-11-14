import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";

import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Decorators } from "./decorators/index.js";
import { _Types } from "./core.types.js";
import { _Validators } from "./core.validators.js";
import { _ArgumentsManager } from "./core.arguments-manager.js";

export class _Perform {
    public constructor(private readonly task: Interfaces.General.AnyClass<any, any>) {}

    public async run(): Promise<void | never> {
        const { Runner, Module, providers, dependencies } = this.prepareMetadata();
        const app = await NestFactory.create(Module);

        const resolvedDependencies = dependencies.map(this.resolveDependencies(app, providers));

        _Validators.Perform.validateDependencies(resolvedDependencies);

        const runner = new Runner(...resolvedDependencies);

        await runner.perform(app, _ArgumentsManager.taskArguments);
    }

    private prepareMetadata(): _Types.Perform.PrepareMetadata {
        const Runner = Patches.Reflect.getMetadata<Interfaces.General.AnyClass<_Abstractions.Runner, any>>(
            _Decorators.Enums.Metadata.Task.Runner,
            this.task,
        );
        const Module = Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>>(
            _Decorators.Enums.Metadata.Task.Module,
            this.task,
        );
        const providers =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>[]>(
                _Decorators.Enums.Metadata.Task.Providers,
                this.task,
            ) ?? [];
        const dependencies =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass<any, any>[]>(
                _Decorators.Enums.Metadata.BuildIn.ParamTypes,
                Runner,
            ) ?? [];

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
        return function (dependency: Interfaces.General.AnyClass<any, any>): any | undefined {
            const found = providers.find(
                (provider: Interfaces.General.AnyClass<any, any>): boolean => provider.name === dependency.name,
            );

            if (!found) {
                return undefined;
            }

            return app.get(found);
        };
    }
}
