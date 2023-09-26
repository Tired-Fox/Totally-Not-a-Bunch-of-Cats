// import astroConfig from "../../astro.config.mjs";
class Error {
    message: string;
    constructor(message: string) {
        this.message = message
    }
}

export function uri(path: string) {
    if (!path) {
        throw new Error(`uri helper function expects a path: ${path}`);
    }
    return `/Totally-Not-a-Bunch-of-Cats/${path?.replace(/^\//, '')}`;
}