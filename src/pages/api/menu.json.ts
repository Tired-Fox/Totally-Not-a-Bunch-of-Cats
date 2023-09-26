import { uri } from "@script/utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({params, request}) => {
    return new Response(
        JSON.stringify({
            Home: { uri: uri('/') },
            Blog: { uri: uri('/blog/') },
            Team: { uri: uri('/team/') }
        })
    )
}