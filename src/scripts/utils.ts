// import astroConfig from "../../astro.config.mjs";
class Error {
    message: string;
    constructor(message: string) {
        this.message = message
    }
}

export function uri(path: string) {
    return `/Totally-Not-a-Bunch-of-Cats/${path ? path?.replace(/^\//, '') : path}`;
}