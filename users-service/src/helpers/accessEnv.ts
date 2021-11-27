// Accesses a variable inside of process.env, throwing an error if it's not found.
// ALways run this method in advance (i.e upon initialization) so that the error is thrown as early as possible
// Caching the values improves performace -- accessing process.env many times is bad

const cache: { [key: string]: string} = {};

const accessEnv = (key: string, defaultValue: string) => {
    if (!(key in process.env) || typeof process.env[key] === undefined) {
        if (defaultValue) return defaultValue;
        throw new Error(`${key} not found in process.env!`);
    }

    if (!(key in cache)) {
        cache[key] = <string>process.env[key];
    }

    return cache[key];
};

export default accessEnv;
