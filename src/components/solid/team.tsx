import { Icon } from "@iconify-icon/solid";
import { type TeamMember, type TeamMembers } from "@script/constants";
import { fetchJson, uri } from "@script/utils";
import { createEffect, createResource, splitProps } from "solid-js";

type BinderProps = {
    class: string;
    url: URL
};

const fetchTeam = async (url: URL) => {
    console.log('fetching team data');
    return fetchJson(url, uri('/api/tm/@All.json'));
}

export const Binder = (props: BinderProps) => {
    const [team, { mutate, refetch }] = createResource<TeamMembers>(props.url, fetchTeam);

    createEffect(() => {
        console.log(team())
    })

    return (
        <section
            className={`flex flex-wrap w-full h-fit justify-around ${props.class}`}
        >
            {
                team() &&
                Object.entries(team()).map(([tag, info], idx) => {
                    const [data, rest] = splitProps(info, ["content"]);
                    console.log("REST", rest, "||", data)
                    return (
                        <Card
                            name={tag}
                            direction={idx % 2 === 0 ? "left" : "right"}
                            {...rest}
                        >
                            {data.content}
                        </Card>
                    );
                })
            }
        </section>
    );
};

type CardProps = {
    name: string;
    children: HTMLElement | never[] | any[] | string;
    direction?: "left" | "right";
} & TeamMember;

const Card = (props: CardProps) => {
    return (
        <div
            className={`w-full p-4 flex items-center flex-col ${props.direction === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            <div className={`mb-4`}>
                <img
                    className={`w-[25rem] rounded-md shadow-sm ${"ml-auto"}`}
                    src={props.img}
                    alt={`${props.name} Profile Picture`}
                />
                {props.personal ? (
                    <a
                        href={props.personal.href}
                        title={props.personal.name}
                        target="_blank"
                        className={`w-full hover:text-blue-300 flex justify-center`}
                    >
                        <em className="text-sm">{props.name}</em>
                    </a>
                ) : (
                    <div className="w-fit mx-auto">
                        <em className="text-sm">{props.name}</em>
                    </div>
                )}
                <div className="flex gap-2 justify-center mt-3">
                    {
                        <strong className="text-sm text-center">
                            {props.titles?.join(" & ")}
                        </strong>
                    }
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full p-8">
                <p className="indent-4">
                    {props.children}
                </p>
                {props.socials && <Socials links={props.socials} />}
            </div>
        </div>
    );
};

type SocialsProps = {
    links: { [key: string]: { href: string, icon: string } };
};

const Socials = (props: SocialsProps) => {
    return (
        <div className="flex flex-col gap-1 justify-center w-full">
            <div className="mt-4 mb-2">
                <div className="w-[40%] h-[3px] mx-auto bg-slate-700/10 text-transparent my-[.1rem] rounded-lg">-</div>
                <div className="w-[20%] h-[3px] mx-auto bg-slate-700/10 text-transparent rounded-lg">-</div>
            </div>
            <div className="flex justify-center gap-3">
                {
                    Object.entries(props.links).map(([name, info]) => (
                        <a
                            href={info.href}
                            target="_blank"
                            title={`${name} ↗`}
                            className="hover:text-blue-300"
                        >

                            <Icon icon={info.icon} inline mode="svg" width="1.25rem" height="1.25rem" />
                        </a>
                    ))
                }
            </div>
        </div>
    );
};
