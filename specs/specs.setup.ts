import { Lifecycles } from "@specs/lifecycles/index.js";

beforeAll((): void => {
    Lifecycles.Process.Before.All.exit();
});

afterAll((): void => {
    Lifecycles.Process.After.All.clean();
});

beforeEach(async (): Promise<void> => {
    Lifecycles.Console.Before.Each.global();
    Lifecycles.Essentials.Before.Each.prepareArgv();
});

afterEach((): void => {
    Lifecycles.Console.After.Each.clean();
    Lifecycles.Essentials.After.Each.restoreArgv();
    Lifecycles.Fs.After.Each.clean();
});
