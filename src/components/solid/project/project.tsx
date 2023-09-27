import { toTitleCase, uri } from "@script/utils";
import type { CollectionEntry } from "astro:content";
import { createEffect, createSignal } from "solid-js";
import "@style/animations.css";
import "@style/custom.css";

type Props = {
  posts: CollectionEntry<"project">[];
};

export function Projects(props: Props) {
  let dialog: HTMLDialogElement;
  const [groupBy, setGroupBy] = createSignal<"platforms" | "tags">("platforms");
  const [selected, setSelected] = createSignal<CollectionEntry<"project">>();
  const [groups, setGroups] = createSignal<{
    [key: string]: CollectionEntry<"project">[];
  }>({});

  const genGroups = (by: "platforms" | "tags") => {
    let ngroups: { [key: string]: CollectionEntry<"project">[] } = {};
    const groupByAssign = (key: string, post: CollectionEntry<"project">) => {
      if (!groups.hasOwnProperty(key)) {
        ngroups[key] = [post];
      } else {
        ngroups[key].push(post);
      }
    };

    for (const post of props.posts) {
      const refer = post.data[by];
      if (!refer) {
        groupByAssign("other", post);
      } else if (refer instanceof Array) {
        if (refer.length === 0) {
          groupByAssign("other", post);
        } else {
          for (const platform of refer) {
            if (!groups.hasOwnProperty(platform)) {
              ngroups[platform] = [post];
            } else {
              ngroups[platform].push(post);
            }
          }
        }
      }
    }
    setGroups(ngroups);
  };

  genGroups(groupBy());

  createEffect(() => {
    genGroups(groupBy());
  });
  // onChange={(e) => setGroupBy(e.target.value)}
  return (
    <div className="my-4">
      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="search"
          className="placeholder:text-slate-300/70 py-1 px-2 rounded-md outline-none focus:ring-2 ring-slate-300 ring-offset-1 border-2 border-dashed border-slate-700/30 w-[25%] focus:w-[50%] transition-[width] duration-200 text-sm"
        />
      </div> */}
      <div className="flex gap-6 flex-wrap">
        {props.posts.map((post) => {
          console.log(post);
          return (
            <a
              href={uri(`${post.collection}/${post.slug}`)}
              className="relative aspect-[5/8] w-[10rem] border border-solid borrder-black rounded-md overflow-hidden shadow-sm shadow-slate-700/60 hover:ring-2 ring-slate-300 ring-offset-1"
            >
              <div className="w-full h-full absolute top-0 left-0 backdrop-blur-[3px] bg-slate-700/5 z-10 text-white flex items-end justify-center py-[25%] font-bold tracking-wide">
                {post.data.title}
              </div>
              <img
                src={uri(post.data.heroImage)}
                className="w-full h-full"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
