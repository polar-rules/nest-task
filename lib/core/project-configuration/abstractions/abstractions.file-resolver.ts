import { _Types } from "./abstractions.types.js";

export abstract class _FileResolver {
    public constructor(protected readonly task: _Types.FileResolver.ApproximateTask) {}

    public abstract get path(): string;

    public abstract get directory(): string;
}
