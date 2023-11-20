

<p align="center">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
    The ultimate solution to execute simple tasks in <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a>
    environment fully supporting import of <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> classes,
    basic tools and approaches.
</p>

<div style="text-align:center">

  [![Main](https://github.com/bear-hugs/nest-task/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/bear-hugs/nest-task/actions/workflows/main.yml)

</div>

## Description

Nest is a framework for building efficient, scalable <a href="https://nodejs.org" target="_blank">Node.js</a> server-side applications. It uses modern JavaScript, is built with <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

<p>Under the hood, Nest makes use of <a href="https://expressjs.com/" target="_blank">Express</a>, but also, provides compatibility with a wide range of other libraries, like e.g. <a href="https://github.com/fastify/fastify" target="_blank">Fastify</a>, allowing for easy use of the myriad third-party plugins which are available.</p>


Please make sure to read the [Issue Reporting Checklist](https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md#-submitting-an-issue) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Getting started

### Installation

Via `NPM`:

```Bash
npm install @bear-hugs/nest-task
```

Via `Yarn`:

```Bash
yarn add @bear-hugs/nest-task
```

### Help

From command line you can call help prompt to receive a list of available commands:
```Bash
npx nest-task help
```

### Guides

Once you've installed you will have available `nest-task` binary available to run. We recommend you to run `npx` to run
binary, but you choose whatever suits you the best.

Now you need to run:

```Bash
npx nest-task setup --convention kebab-case
```

In case you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project 
name. For example:
```Bash
npx nest-task setup --project-name <project> --convention kebab-case
```

Or run interactive assistant and pick `Setup` option, and then just follow installation steps:
```Bash
npx nest-task jarvis
```

This action will do the following:
- modify the `nest-cli.json` and create new key `task` there
- create the folder `tasks` under `src`
- create `main.ts` and `tasks.module.ts`
- create a simple `example` task for education purposes

### Creating task

To create a task you need to run:
```Bash
npx nest-task create --name <name> --description <description>
```

Or if you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project
name.
```Bash
npx nest-task create --project-name <project> --name <name> --description <description>
```

You can run interactive assistant and pick `create` option and just follow proposed steps to generate task:
```Bash
npx nest-task jarvis
```

### Receiving the list of tasks

To receive a list of tasks
```Bash
npx nest-task info
```

Or if you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project
name.
```Bash
npx nest-task info --project-name <project>
```

You can run interactive assistant and pick `info` option and just follow proposed steps to generate task:
```Bash
npx nest-task jarvis
```

### Running task

To create a task you need to run:
```Bash
npx nest-task run --name <name> <other-arguments>
```

Or if you have `project` key inside your `nest-cli.json` you need to add `--project-name` flag and specify project
name.
```Bash
npx nest-task run --project-name <project> --name <name> <other-arguments>
```

You can run interactive assistant and pick `run` option and just follow proposed steps to generate task:
```Bash
npx nest-task jarvis
```

## Documentation

### Nest integration

In purpose to integrate with Nest.js we modify `nest-cli.json` file located inside your root directory. We add 
key `task` in this file on top level. The object should have the following format:

`<root>/nest.-cli.json`
```json
{
  // other nest.cli declarations
  "task": {
    "path": "src/tasks",
    "entryPoint": "main.ts",
    "convention": "kebab-case"
  }
}
```

------------------------------

#### `path`
Required.

Refers to directory where tasks will be held. By default, we set it to `src/tasks` but you're free to
change it to another directory as you will.

#### `entryPoint`
Required. 

The main file name entrypoint should be present here, this file should be present with in 
directory specified in `path` key. 

#### `conventions` 
Required.

Directive the specifies what kind of file naming convention we should use when using `create`
command. Available options are: `"camel-case"`, `"snake-case"`, `"kebab-case"` or `"bear-hugs"`.

------------------------------

### Entrypoint

Entrypoint file, `main.ts` it's similar to Nest.js `main.ts` file. Basically after you run `npx nest-task setup` you 
don't need to change it, except the cases when you want to use custom paths.

Its implementation is straight forward, and one time. You don't need make changes afterward.

`<root>/src/tasks/main.ts`
```Typescript
import { Factory } from "@bear-hugs/nest-task";

import { TasksModule } from "./tasks.module";

async function main(): Promise<void> {
    const app = await Factory.create(TasksModule);

    await app.run();
}

main();
```

The only thing that you can possibly would like to change here is path to `TasksModule` in case of custom setup.

### TasksModule

The implementation is close to Nest.js `@Module` implementation.

`<root>/src/tasks/tasks.module.ts`
```Typescript
import { Decorators } from "@bear-hugs/nest-task";

import { ExampleTask } from "./example/example.task";

@Decorators.Module({
    tasks: [
        ExampleTask,
    ],
})
export class _Module {}
```

------------------------

#### `tasks`
Required.

Array of `Task` classes.

------------------------------

### Creating task

Defining `Task` class.

`<root>/src/tasks/example/example.task.ts`
```Typescript
import { Decorators } from "@bear-hugs/nest-task";

import { AppModule } from "../../app.module";
import { AppService } from "../../app.service";

import { ExampleRunner } from "./example.runner";

@Decorators.Task({
    name: "Example",
    description: "Task created for demonstration how to create basic example of task",
    runner: ExampleRunner,
    module: AppModule,
    providers: [AppService],
})
export class ExampleTask {}
```

------------------------------

Overall, you already familiar with the syntax of this approach.

#### `name`
Required.

Unique.

Name of the tasks. Should be unique for `@Decorators.Module`. Used to located task, provider information about the task.

#### `description`
Required.

Short description of the task. Even if we do not have any limitation for length, we still recommend to keep it simple
as possible.

#### `runner`
Required.

Your `@Decorators.Runner` class that will be covered in the next step. This class wil be the only class that will be 
executed by the task.

#### `module`
Required.

Main Nest.js application module is required to correctly initialise Nest.js environment.

#### `providers`
Optional.

Array of Nest.js services, entities and just classes that you want to use withing task in a same way as you do this 
within `@Controller`, `@Injectable`, etc.

------------------------------

Defining `Runner` class.

`<root>/src/tasks/example/runner.task.ts`
```Typescript
import { INestApplication } from "@nestjs/common";

import { Decorators } from "@bear-hugs/nest-task";

import { ExampleDto } from "./example.dto";

@Decorators.Runner()
export class _Runner {
    public constructor(private readonly appService: AppService) {}
    
    public async perform(@Decorators.App() app: INestApplication, @Decorators.Arguments() args: ExampleDto): Promise<void> {
        // Your code goes here
    }
}
```
------------------------------

#### `providers`
Are matched from `@Decorators.Task` `providers` field into `constructor` by type. The same way as you do with Nest.js.

#### `app`
By using `@Decorators.App()` for an argument you can pass the Nest.js application variable.

#### `args`
If you need to pass additional arguments from command line to the task you can use `@Decorators.Arguments()` with `DTO`
in a same way as you do for Nest.js `@Controller`.

------------------------------

Defining `DTO` class.

`<root>/src/tasks/example/runner.dto.ts`
```Typescript
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { Decorators } from "@bear-hugs/nest-task";

export class ExampleDto {
    @Decorators.Property()
    @Type(() => String)
    @IsString()
    data: string;

    @Decorators.Property()
    @Type(() => IsNumber)
    @IsNumber()
    userId: number;
}
```

The same way that you do with Nest.js DTO.

**However**

Even due `class-transformer` library do support complex types, as array, object, etc. And theoretically we can do this
too, but we still recommend to use simple primitive types like:
- string
- number
- boolean
- null
- undefined

If you want to use more complex type we recommend to use string and JSON combination.

### Documentation

#### CLI

`@bear-hugs/nest-task` is supplied with 2 versions of CLI, basic commands and interactive assistant.

##### Basic syntax:

`nest-task <command> --<argument-name> <argument-value>`

For example:

`nest-task info --project-name example`

##### Commands:

`help`
List of available commands, AKA this prompt

`jarvis`
Interactive assistant. Can perform the same actions as basic commands but in more human friendly way.

`info`
Provide a list of tasks names and description.

Arguments:
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined.

`run`
Execute the task, can be found by name

Arguments:
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined. This argument should come first before 
name of the task
- `other-arguments` Optional. In case your you need to pass additional arguments to your task you can easily 
achieve this with same syntax as you pass `name` or `project-name`
  - For example: `--userId 3 --bio "I'm awesome"`
- `name` Required. Name of the task defined in `@Decorators.Task` `name` key

`create`
Run this command as a generator to create task boilerplate, that includes `@Decorators.Runner` and `@Decorators.Task`.

Arguments:
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined.
- `name` Required. Expect to receive a task name, which should converted to file name and class name.
- `description` Required. Short description of task. In case if it's a long sentence use `"` to screen it.
  - For example: `--description "The task example"`

`setup`
Used in purpose to run first initial setup of the @bear-hugs/nest-task. Performs 3 basic actions: modify 
`nest-cli.json`, creates an entrypoint for tasks to run and creates an example of task.
- `project-name` Optional. In case your `nest-cli.json` have `projects` key defined. 
- `convention` Required. Specify naming convention for files and classes. Options are `camel-case`, `snake-case`, `kebab-case`, `bear-hugs`
  - `camel-case` - tells us to create files with camel case convention. For example: `camelCase.example.ts`
  - `snake-case` - tells us to create files with snake case convention. For example: `snake_case.example.ts`
  - `kebab-case` - tells us to create files with camel case convention. For example: `kebab-case.example.ts`
  - `bear-hugs` - combination of kebab case and specific class and variable naming.

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md#-submitting-an-issue)
before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Stay in touch

- Author - [Andrii Drozdov](https://github.com/d4ins)

## License

@bear-hugs/nest-task is [MIT licensed](LICENSE).