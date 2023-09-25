// import astroConfig from "../../astro.config.mjs";

export function uri(path: string) {
    // return `${astroConfig.base}/${path.replace(/^\//,'')}`
    return `/Totally-Not-a-Bunch-of-Cats/${path.replace(/^\//, '')}`;
}