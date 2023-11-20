import { Logger } from "@nestjs/common";

import { Interfaces } from "@interfaces/index.js";
import { Patches } from "@patches/index.js";
import { Errors } from "@errors/index.js";
import { Messages } from "@messages/index.js";

import { _Errors } from "./errors/index.js";
import { _Decorators } from "./decorators/index.js";
import { _Enums } from "./core.enums.js";
import { _Task } from "./core.task.js";
import { _ArgumentsManager } from "./core.arguments-manager.js";
import { _Perform } from "./core.perform.js";
import { _State } from "./core.state.js";

export class _App {
    private tasks: _Task[] = [];

    private readonly logger: Logger = new Logger("NestTask::Core::App");

    public constructor() {
        this.logger.log("Starting NestTask application...");
    }

    public async run(): Promise<void> {
        try {
            if (!this.tasks?.length) {
                throw new _Errors.NoTasksFound();
            }

            switch (_ArgumentsManager.runType) {
                case _Enums.RunTypes.Run:
                    await this.handleRun();
                    break;
                case _Enums.RunTypes.Info:
                    this.handleInfo();
                    break;
            }
        } catch (e: unknown) {
            if (Interfaces.InstanceOf<Errors.Base>(e, "custom")) {
                Messages.Errors.Prettify(e);
            }

            Messages.Errors.Unhandled(e);
        }
    }

    public async load(module: Interfaces.General.AnyClass): Promise<void> {
        this.getTasks(module);

        for (const task of this.tasks) {
            const name = Patches.Reflect.getMetadata<string>(_Decorators.Enums.Metadata.Descriptable.Name, task);

            this.logger.log(`Tasks::Module is loading ${name}`);
        }

        this.logger.log("Tasks::Module tasks has been loaded");
    }

    private getTasks(module: Interfaces.General.AnyClass): void {
        const tasks =
            Patches.Reflect.getMetadata<Interfaces.General.AnyClass[]>(
                _Decorators.Enums.Metadata.Module.Tasks,
                module,
            ) ?? [];

        this.tasks = tasks.map((task: Interfaces.General.AnyClass): _Task => new _Task(task));
    }

    private locateTaskClass(): _Task | undefined {
        return this.tasks.find((value: _Task): boolean => {
            const name = Patches.Reflect.getMetadata<string>(_Decorators.Enums.Metadata.Descriptable.Name, value.task);

            return name === _ArgumentsManager.taskName;
        });
    }

    private async handleRun(): Promise<void> {
        const taskClass = this.locateTaskClass();

        if (!taskClass) {
            throw new _Errors.NoSpecificTaskFound(_ArgumentsManager.taskName);
        }

        const perform = new _Perform(taskClass);

        await perform.run();
    }

    private handleInfo(): void {
        _State.tasksList = this.tasks;
    }
}
