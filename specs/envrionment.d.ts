declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DOCKER?: "true" | "false";
        }
    }
}

export {};
