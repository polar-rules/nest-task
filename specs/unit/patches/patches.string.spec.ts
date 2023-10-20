import { faker } from "@faker-js/faker";

import { Patches } from "@patches/index.js";

describe("Patches::String", (): void => {
    const Subject = Patches.String;

    describe("#namedInterpolation", (): void => {
        it("Will replace single value", (): void => {
            const name = faker.person.fullName();
            const expectation = `Hello my name is ${name}`;
            const stringTemplate = "Hello my name is $name";

            const subject = new Subject(stringTemplate);

            expect(subject.namedInterpolation({ name }).toString()).toEqual(expectation);
        });

        it("Will replace multiple values", (): void => {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            const expectation = `Hello my name is ${name} and my email is ${email}`;
            const stringTemplate = "Hello my name is $name and my email is $email";

            const subject = new Subject(stringTemplate);

            expect(subject.namedInterpolation({ name, email }).toString()).toEqual(expectation);
        });

        it("Will not replace value, if there is no match", (): void => {
            const email = faker.internet.email();
            const expectation = "Hello my name is $name";

            const subject = new Subject(expectation);

            expect(subject.namedInterpolation({ email }).toString()).toEqual(expectation);
        });

        it("Will replace a value, if arguments is nullable", (): void => {
            const expectation = "Hello my name is ";
            const value = "Hello my name is $name";

            const subject = new Subject(value);

            expect(subject.namedInterpolation(<any>{ name: undefined }).toString()).toEqual(expectation);
        });
    });

    describe("#capitalize", (): void => {
        it("Will capitalize a letter", (): void => {
            const expectation = "Hello!";
            const value = "hello!";

            const subject = new Subject(value);

            expect(subject.capitalize().toString()).toEqual(expectation);
        });

        it("The letter will be capitalised if it's already capitalized", (): void => {
            const expectation = "Hello!";

            const subject = new Subject(expectation);

            expect(subject.capitalize().toString()).toEqual(expectation);
        });

        it("Will not raised error if symbol is not capitalizable", (): void => {
            const expectation = "!Hello!";

            const subject = new Subject(expectation);

            expect(subject.capitalize().toString()).toEqual(expectation);
        });
    });

    describe("#lowerlize", (): void => {
        it("Will lowerlize a letter", (): void => {
            const expectation = "hello!";
            const value = "Hello!";

            const subject = new Subject(value);

            expect(subject.lowerlize().toString()).toEqual(expectation);
        });

        it("The letter will be lowerlized if it's already lowerlized", (): void => {
            const expectation = "hello!";

            const subject = new Subject(expectation);

            expect(subject.lowerlize().toString()).toEqual(expectation);
        });

        it("Will not raised error if symbol is not lowerlizable", (): void => {
            const expectation = "!Hello!";

            const subject = new Subject(expectation);

            expect(subject.lowerlize().toString()).toEqual(expectation);
        });
    });

    describe("#toSnakeCase", (): void => {
        it("Will convert camelCase", (): void => {
            const expectation = "camel_case";
            const value = "camelCase";

            const subject = new Subject(value);

            expect(subject.toSnakeCase().toString()).toEqual(expectation);
        });

        it("Will convert PascalCase", (): void => {
            const expectation = "pascal_case";
            const value = "PascalCase";

            const subject = new Subject(value);

            expect(subject.toSnakeCase().toString()).toEqual(expectation);
        });

        it("Will convert kebab-case", (): void => {
            const expectation = "kebab_case";
            const value = "kebab-case";

            const subject = new Subject(value);

            expect(subject.toSnakeCase().toString()).toEqual(expectation);
        });

        it("Will keep snake_case", (): void => {
            const expectation = "pascal_case";

            const subject = new Subject(expectation);

            expect(subject.toSnakeCase().toString()).toEqual(expectation);
        });

        it("Will property interact with numbers in string", (): void => {
            const expectation = "1_camel_1_case_1";
            const value = "1camel1Case1";

            const subject = new Subject(value);

            expect(subject.toSnakeCase().toString()).toEqual(expectation);
        });

        it("Will property interact with special symbols in string", (): void => {
            const expectation = "camel_case";
            const value = "&camel!Case@";

            const subject = new Subject(value);

            expect(subject.toSnakeCase().toString()).toEqual(expectation);
        });
    });

    describe("#toCamelCase", (): void => {
        it("Will convert snake_case", (): void => {
            const expectation = "snakeCase";
            const value = "snake_case";

            const subject = new Subject(value);

            expect(subject.toCamelCase().toString()).toEqual(expectation);
        });

        it("Will convert PascalCase", (): void => {
            const expectation = "pascalCase";
            const value = "PascalCase";

            const subject = new Subject(value);

            expect(subject.toCamelCase().toString()).toEqual(expectation);
        });

        it("Will convert kebab-case", (): void => {
            const expectation = "kebabCase";
            const value = "kebab-case";

            const subject = new Subject(value);

            expect(subject.toCamelCase().toString()).toEqual(expectation);
        });

        it("Will keep camelCase", (): void => {
            const expectation = "camelCase";
            const value = "camelCase";

            const subject = new Subject(value);

            expect(subject.toCamelCase().toString()).toEqual(expectation);
        });

        it("Will property interact with numbers in string", (): void => {
            const expectation = "1Snake1Case1";
            const value = "1snake1_case1";

            const subject = new Subject(value);

            expect(subject.toCamelCase().toString()).toEqual(expectation);
        });

        it("Will property interact with special symbols in string", (): void => {
            const expectation = "snakeCase";
            const value = "&snake!_case@";

            const subject = new Subject(value);

            expect(subject.toCamelCase().toString()).toEqual(expectation);
        });
    });

    describe("#toPascalCase", (): void => {
        it("Will convert snake_case", (): void => {
            const expectation = "SnakeCase";
            const value = "snake_case";

            const subject = new Subject(value);

            expect(subject.toPascalCase().toString()).toEqual(expectation);
        });

        it("Will convert kebab-case", (): void => {
            const expectation = "KebabCase";
            const value = "kebab-case";

            const subject = new Subject(value);

            expect(subject.toPascalCase().toString()).toEqual(expectation);
        });

        it("Will convert camelCase", (): void => {
            const expectation = "CamelCase";
            const value = "camelCase";

            const subject = new Subject(value);

            expect(subject.toPascalCase().toString()).toEqual(expectation);
        });

        it("Will keep PascalCase", (): void => {
            const expectation = "PascalCase";
            const value = "PascalCase";

            const subject = new Subject(value);

            expect(subject.toPascalCase().toString()).toEqual(expectation);
        });
    });

    describe("#toKebabCase", (): void => {
        it("Will convert snake_case", (): void => {
            const expectation = "snake-case";
            const value = "snake_case";

            const subject = new Subject(value);

            expect(subject.toKebabCase().toString()).toEqual(expectation);
        });

        it("Will convert PascalCase", (): void => {
            const expectation = "pascal-case";
            const value = "PascalCase";

            const subject = new Subject(value);

            expect(subject.toKebabCase().toString()).toEqual(expectation);
        });

        it("Will convert camelCase", (): void => {
            const expectation = "camel-case";
            const value = "camelCase";

            const subject = new Subject(value);

            expect(subject.toKebabCase().toString()).toEqual(expectation);
        });

        it("Will keep kebab-case", (): void => {
            const expectation = "kebab-case";
            const value = "kebab-case";

            const subject = new Subject(value);

            expect(subject.toKebabCase().toString()).toEqual(expectation);
        });
    });
});
