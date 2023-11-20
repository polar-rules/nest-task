import { defaultMetadataStorage } from "class-transformer/cjs/storage.js";

import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Abstractions } from "./abstractions/index.js";
import { _Decorators } from "./decorators/index.js";

import { _Types } from "./core.types.js";

export class _Task {
    private nameMemo: string | undefined;

    private descriptionMemo: string | undefined;

    private runnerMemo: Interfaces.General.AnyClass<_Abstractions.Runner> | undefined;

    private dtoMemo: Interfaces.General.AnyClass | undefined;

    private dtoIndexMemo: number | undefined;

    private moduleMemo: Interfaces.General.AnyClass | undefined;

    private providersMemo: Interfaces.General.AnyClass[] | undefined;

    private argsMemo: _Types.Task.Argument[] = [];

    private dtoInitialised: boolean = false;

    private dtoIndexInitialised: boolean = false;

    private argsInitialised: boolean = false;

    public constructor(public readonly task: Interfaces.General.AnyClass) {}

    public get name(): string {
        if (!this.nameMemo) {
            this.nameMemo = Patches.Reflect.getMetadata<string>(
                _Decorators.Enums.Metadata.Descriptable.Name,
                this.task,
            );
        }

        return this.nameMemo;
    }

    public get description(): string {
        if (!this.descriptionMemo) {
            this.descriptionMemo = Patches.Reflect.getMetadata<string>(
                _Decorators.Enums.Metadata.Descriptable.Description,
                this.task,
            );
        }

        return this.descriptionMemo;
    }

    public get runner(): Interfaces.General.AnyClass<_Abstractions.Runner> {
        if (!this.runnerMemo) {
            this.runnerMemo = Patches.Reflect.getMetadata<Interfaces.General.AnyClass<_Abstractions.Runner>>(
                _Decorators.Enums.Metadata.Task.Runner,
                this.task,
            );
        }

        return this.runnerMemo;
    }

    public get dto(): Interfaces.General.AnyClass | undefined {
        if (!this.dtoInitialised) {
            this.dtoInitialised = true;
            this.dtoMemo = Patches.Reflect.getMetadata<Interfaces.General.AnyClass<_Abstractions.Runner> | undefined>(
                _Decorators.Enums.Metadata.Runner.Dto,
                this.runner,
            );
        }

        return this.dtoMemo;
    }

    public get dtoIndex(): number | undefined {
        if (!this.dtoIndexInitialised) {
            this.dtoIndexInitialised = true;
            this.dtoIndexMemo = Patches.Reflect.getMetadata<number | undefined>(
                _Decorators.Enums.Metadata.Runner.DtoIndex,
                this.runner,
            );
        }

        return this.dtoIndexMemo;
    }

    public get module(): Interfaces.General.AnyClass {
        if (!this.moduleMemo) {
            this.moduleMemo = Patches.Reflect.getMetadata<Interfaces.General.AnyClass>(
                _Decorators.Enums.Metadata.Task.Module,
                this.task,
            );
        }

        return this.moduleMemo;
    }

    public get providers(): Interfaces.General.AnyClass[] {
        if (!this.providersMemo) {
            this.providersMemo =
                Patches.Reflect.getMetadata<Interfaces.General.AnyClass[] | undefined>(
                    _Decorators.Enums.Metadata.Task.Providers,
                    this.task,
                ) ?? [];
        }

        return this.providersMemo;
    }

    public get args(): _Types.Task.Argument[] {
        if (!this.argsInitialised) {
            this.argsInitialised = true;

            const argKeys = Patches.Reflect.getMetadata<string[] | undefined>(
                _Decorators.Enums.Metadata.Dto.Property,
                this.dto,
            );

            if (!argKeys?.length) {
                return this.argsMemo;
            }

            if (!this.dto) {
                return this.argsMemo;
            }

            for (const arg of argKeys) {
                const metadata = defaultMetadataStorage.findTypeMetadata(this.dto, arg);

                this.argsMemo.push({ metadata, name: arg, type: metadata.reflectedType.name });
            }
        }

        return this.argsMemo;
    }
}
