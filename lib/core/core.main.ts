import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";

// todo fix this shite
import { Interfaces } from "../interfaces/index.js";

import { _Decorators } from "./decorators/index.js";
import { _Runner } from "./runner/index.js";
import { _Types } from "./core.types.js";
import { _Validators } from "./core.validators.js";

export class _Main {
    public constructor(private readonly task: Interfaces.General.AnyClass<any, any>) {}

    private get Runner(): Interfaces.General.AnyClass<_Runner.Base, any> {
        return Reflect.getMetadata(_Decorators.Enums.Task.MetadataKeys.Runner, this.task);
    }

    private get Module(): Interfaces.General.AnyClass<any, any> {
        return Reflect.getMetadata(_Decorators.Enums.Task.MetadataKeys.Module, this.task);
    }

    private get providers(): Interfaces.General.AnyClass<any, any>[] {
        return Reflect.getMetadata(_Decorators.Enums.Task.MetadataKeys.Providers, this.task);
    }

    private get dependencies(): Interfaces.General.AnyClass<any, any>[] {
        return Reflect.getMetadata("design:paramtypes", this.Runner) ?? [];
    }

    public async run(): Promise<void | never> {
        const app = await NestFactory.create(this.Module);

        const resolvedDependencies = this.dependencies.map(this.resolveDependencies(app, this.providers));

        _Validators.Main.validateDependencies(resolvedDependencies);

        const runner = new this.Runner(...resolvedDependencies);

        await runner.perform(app);
    }

    private resolveDependencies(
        app: INestApplication,
        providers: Interfaces.General.AnyClass<any, any>[],
    ): _Types.Main.ResolveDependencies {
        return function (dependency: Interfaces.General.AnyClass<any, any>): any | undefined {
            const found = providers.find(
                (provider: Interfaces.General.AnyClass<any, any>): boolean => provider.name === dependency.name,
            );

            if (!found) {
                return;
            }

            return app.get(found);
        };
    }
}
