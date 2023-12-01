import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";

import { _Decorators } from "./decorators/index.js";

/**
 * Represents a task within the NestTask application.
 *
 * @class
 */
export class _Task {
    /**
     * Memoized name of the task.
     *
     * @private
     * @type {string | undefined}
     */
    private nameMemo: string | undefined;

    /**
     * Memoized description of the task.
     *
     * @private
     * @type {string | undefined}
     */
    private descriptionMemo: string | undefined;

    /**
     * Memoized runner class associated with the task.
     *
     * @private
     * @type {Interfaces.General.AnyClass | undefined}
     */
    private runnerMemo: Interfaces.General.AnyClass | undefined;

    /**
     * Memoized DTO (Data Transfer Object) class associated with the task.
     *
     * @private
     * @type {Interfaces.General.AnyClass | undefined}
     */
    private dtoMemo: Interfaces.General.AnyClass | undefined;

    /**
     * Memoized DTO index associated with the task.
     *
     * @private
     * @type {number | undefined}
     */
    private dtoIndexMemo: number | undefined;

    /**
     * Memoized application index associated with the task.
     *
     * @private
     * @type {number | undefined}
     */
    private appIndexMemo: number | undefined;

    /**
     * Memoized module class associated with the task.
     *
     * @private
     * @type {Interfaces.General.AnyClass | undefined}
     */
    private moduleMemo: Interfaces.General.AnyClass | undefined;

    /**
     * Memoized array of provider classes associated with the task.
     *
     * @private
     * @type {Interfaces.General.AnyClass[] | undefined}
     */
    private providersMemo: Interfaces.General.AnyClass[] | undefined;

    /**
     * Memoized array of property metadata for arguments associated with the task.
     *
     * @private
     * @type {_Decorators.Types.Property.Property[]}
     */
    private argsMemo: _Decorators.Types.Property.Property[] = [];

    /**
     * Flag indicating whether the DTO is initialized.
     *
     * @private
     * @type {boolean}
     */
    private dtoInitialised: boolean = false;

    /**
     * Flag indicating whether the DTO index is initialized.
     *
     * @private
     * @type {boolean}
     */
    private dtoIndexInitialised: boolean = false;

    /**
     * Flag indicating whether the application index is initialized.
     *
     * @private
     * @type {boolean}
     */
    private appIndexInitialised: boolean = false;

    /**
     * Flag indicating whether the arguments are initialized.
     *
     * @private
     * @type {boolean}
     */
    private argsInitialised: boolean = false;

    /**
     * Constructs a new instance of the _Task class.
     *
     * @constructor
     * @param {Interfaces.General.AnyClass} task - The task class.
     */
    public constructor(public readonly task: Interfaces.General.AnyClass) {}

    /**
     * Retrieves the name of the task.
     *
     * @type {string}
     */
    public get name(): string {
        if (!this.nameMemo) {
            this.nameMemo = Patches.Reflect.getMetadata<string>(
                _Decorators.Enums.Metadata.Descriptable.Name,
                this.task,
            );
        }

        return this.nameMemo;
    }

    /**
     * Retrieves the description of the task.
     *
     * @type {string}
     */
    public get description(): string {
        if (!this.descriptionMemo) {
            this.descriptionMemo = Patches.Reflect.getMetadata<string>(
                _Decorators.Enums.Metadata.Descriptable.Description,
                this.task,
            );
        }

        return this.descriptionMemo;
    }

    /**
     * Retrieves the runner class associated with the task.
     *
     * @type {Interfaces.General.AnyClass}
     */
    public get runner(): Interfaces.General.AnyClass {
        if (!this.runnerMemo) {
            this.runnerMemo = Patches.Reflect.getMetadata<Interfaces.General.AnyClass>(
                _Decorators.Enums.Metadata.Task.Runner,
                this.task,
            );
        }

        return this.runnerMemo;
    }

    /**
     * Retrieves the DTO class associated with the task.
     *
     * @type {Interfaces.General.AnyClass | undefined}
     */
    public get dto(): Interfaces.General.AnyClass | undefined {
        if (!this.dtoInitialised) {
            this.dtoInitialised = true;
            this.dtoMemo = Patches.Reflect.getMetadata<Interfaces.General.AnyClass | undefined>(
                _Decorators.Enums.Metadata.Runner.Dto,
                this.runner,
            );
        }

        return this.dtoMemo;
    }

    /**
     * Retrieves the DTO index associated with the task.
     *
     * @type {number | undefined}
     */
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

    /**
     * Retrieves the application index associated with the task.
     *
     * @type {number | undefined}
     */
    public get appIndex(): number | undefined {
        if (!this.appIndexInitialised) {
            this.appIndexInitialised = true;
            this.appIndexMemo = Patches.Reflect.getMetadata<number | undefined>(
                _Decorators.Enums.Metadata.Runner.AppIndex,
                this.runner,
            );
        }

        return this.appIndexMemo;
    }

    /**
     * Retrieves the module class associated with the task.
     *
     * @type {Interfaces.General.AnyClass}
     */
    public get module(): Interfaces.General.AnyClass {
        if (!this.moduleMemo) {
            this.moduleMemo = Patches.Reflect.getMetadata<Interfaces.General.AnyClass>(
                _Decorators.Enums.Metadata.Task.Module,
                this.task,
            );
        }

        return this.moduleMemo;
    }

    /**
     * Retrieves the array of provider classes associated with the task.
     *
     * @type {Interfaces.General.AnyClass[]}
     */
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

    /**
     * Retrieves the array of property metadata for arguments associated with the task.
     *
     * @type {_Decorators.Types.Property.Property[]}
     */
    public get args(): _Decorators.Types.Property.Property[] {
        if (!this.dto) {
            return this.argsMemo;
        }

        if (!this.argsInitialised) {
            this.argsInitialised = true;

            const args = Patches.Reflect.getMetadata<_Decorators.Types.Property.Property[] | undefined>(
                _Decorators.Enums.Metadata.Dto.Property,
                this.dto,
            );

            if (!args?.length) {
                return this.argsMemo;
            }

            if (!this.dto) {
                return this.argsMemo;
            }

            this.argsMemo = [...args];
        }

        return this.argsMemo;
    }
}
