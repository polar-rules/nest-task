import { Interfaces } from "@interfaces/index.js";

describe("Interfaces::InstanceOf", (): void => {
    const Subject = Interfaces.InstanceOf;

    it("Should return true if the key exists in the object", (): void => {
        const obj = { key: "value" };
        const result = Subject<string>(obj, "key");

        expect(result).toBe(true);
    });

    it("Should return false if the key does not exist in the object", (): void => {
        const obj = { anotherKey: "value" };
        const result = Subject<string>(obj, "key");

        expect(result).toBe(false);
    });

    it("Should return false for an empty object when key is not specified", (): void => {
        const obj = {};
        const result = Subject<Record<string, any>>(obj, "anyKey");

        expect(result).toBe(false);
    });

    it("Should return true for an object with nested properties", (): void => {
        const obj = { nested: { key: "value" } };
        const result = Subject<string>(obj, "nested");

        expect(result).toBe(true);
    });

    it("Should throw an error for null objects", (): void => {
        const nullObject = null;
        expect(() => Subject<any>(nullObject, "key")).toThrow();
    });
});
