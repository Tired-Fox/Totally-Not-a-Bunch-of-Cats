import { uri } from "@script/utils";
import type { APIRoute } from "astro";

export type TeamMember = {
    img: string,
    titles: string[],
    personal?: {name: string, href: string},
    socials?: {[key: string]: {href: string, icon: string}}
    content: string
}

const teamMembers: {[key: string]: TeamMember} = {
    "@Zachary Boehm": {
        img: uri("blog-placeholder-2.jpg"),
        titles: ["Programmer", "Website Designer"],
        personal: {
            name: "Tired-Fox Landing",
            href: "https://tired-fox.github.io/Tired-Fox/",
        },
        socials: {
            github: {
                href: "https://github.com/Tired-Fox",
                icon: "mdi:github",
            },
        },
        content: "Bibendum arcu vitae elementum curabitur vitae nunc. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo. Pellentesque sit amet porttitor eget. Egestas congue quisque egestas diam. Sit amet facilisis magna etiam. Ac tortor dignissim convallis aenean et tortor at. Risus in hendrerit gravida rutrum quisque non tellus orci. Scelerisque felis imperdiet proin fermentum leo. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Sed turpis tincidunt id aliquet risus feugiat in ante. Id eu nisl nunc mi ipsum faucibus. Praesent tristique magna sit amet purus gravida."
    },
    "@John Doe": {
        img: uri("blog-placeholder-4.jpg"),
        titles: ["Programmer"],
        socials: {
            github: {
                href: "https://github.com/Tired-Fox",
                icon: "mdi:github",
            },
            youtube: {
                href: "https://youtube.com",
                icon: "mdi:youtube",
            },
        },
        content: "Phasellus vestibulum lorem sed risus ultricies tristique nulla. Suscipit adipiscing bibendum est ultricies integer. Volutpat est velit egestas dui id ornare arcu odio. Ut sem nulla pharetra diam sit. Vulputate mi sit amet mauris commodo quis imperdiet. Adipiscing at in tellus integer feugiat scelerisque varius. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Varius vel pharetra vel turpis nunc eget lorem dolor. Sed risus ultricies tristique nulla aliquet."
    }
};

export const GET: APIRoute = async ({params, request}) => {
    return new Response(
        JSON.stringify(teamMembers)
    )
}