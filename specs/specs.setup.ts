import { Libraries } from "@lib/lib.libraries.js";
import { Lifecycles } from "@specs/lifecycles/index.js";

beforeEach(async (): Promise<void> => {
    await Libraries.initialise();

    Lifecycles.Process.Before.Each.exit();
    Lifecycles.Console.Before.Each.global();
    Lifecycles.Essentials.Before.Each.prepareArgv();
});

afterEach((): void => {
    Lifecycles.Process.After.Each.clean();
    Lifecycles.Console.After.Each.clean();
    Lifecycles.Essentials.After.Each.restoreArgv();
    Lifecycles.Fs.After.Each.clean();
});
