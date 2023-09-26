/* Sample videos: https://gist.github.com/jsturgis/3b19447b304616f18657 
https://developers.google.com/youtube/iframe_api_reference
*/

export { image, video } from "./core";
import '../../../styles/custom.css';

import { createSignal, type Accessor, Show, splitProps, createEffect } from "solid-js";

import { CarrouselContainer, type MetaData } from "./types";
import { CarrouselContent } from "./content";
import type { HTMLAttributes } from "astro/types";

export const CarrouselWrapper = (props: {
  idx: number;
  selected: number;
  children?: any;
}) => {
  return (
    <div
      className={`transition-opacity duration-200 absolute top-0 left-0 w-full h-fit aspect-video rounded-md ${
        props.idx === props.selected
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {props.children}
    </div>
  );
};

type ButtonProps = {
  select: () => void;
  idx: number;
  selected: number;
  title?: string;
};
export const CarrouselButton = (props: ButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded-full h-2 text-transparent transition-[width] duration-200 leading-[0] ${
        props.idx === props.selected
          ? "w-[60%] bg-slate-500"
          : "w-[1rem] bg-slate-500/30"
      }`}
      onClick={props.select}
      title={props.title || "" + (props.idx + 1)}
    >
      -
    </button>
  );
};

/*
    System for having thin slices and having them grow into view
    Each slice can be anything as long as it can be dynamically sized

    focused == 60%
    gap==.25rem
    slices will just fill remaining space
    
*/
type Props = HTMLAttributes<"section"> & {
  content: CarrouselContainer[];
  speed?: number;
  "no-arrows"?: boolean;
  loop?: boolean;
  children?: HTMLElement | never[];
};

/**
 * @param {CarrouselContainer[]} content The list of items to show in the carrousel.
 * These can be images, videos, and youtube videos. Use the `image`, `video`, and `youtube`
 * helper methods to construct content.
 * @param {?number} speed If present the carrousel will automatically go to the next
 * piece of content after the speed (duration) has ended. This only applies to images.
 * @param {?boolean} no-arrow Hide the carrousel arrows
 * @param {?HTMLElement} children The single element to display at the end of the carrousel
 */
export const Carrousel = (props: Props) => {
  let wrapper: HTMLDivElement;
  const [selected, setSelected] = createSignal(0);
  const [hasChildren, setHasChildren] = createSignal(false);
  const [data, style, rest] = splitProps(
    props,
    ["content", "children"],
    ["class"]
  );

  let lastInterval: NodeJS.Timer;
  createEffect(() => {
    setHasChildren(data.children !== undefined && data.children.children.length > 0);
  })

  // If there is a speed and there is a child node and the child node is the current
  // content. Set an interval that will autoscroll
  createEffect(() => {
    if (props.speed && hasChildren() && selected() === data.content.length) {
        lastInterval = setInterval(() => {
            clearInterval(lastInterval);
            next()
        }, props.speed)
    } else if (lastInterval) {
        clearInterval(lastInterval);
    }
  })

  const next = () => {
    if (props.loop) {
        setSelected(
          (selected() + 1) % (data.content.length + (hasChildren() ? 1 : 0))
        );
    }
  };

  const previous = () => {
    const max = data.content.length + (hasChildren() ? 1 : 0);
    let prev = (selected() - 1) % max;
    if (prev < 0) {
      prev = max + prev;
    }
    setSelected(prev);
  };

  return (
    <section className={`${style.class} w-full my-2 hover-arrows`} {...rest}>
      <div
        ref={wrapper}
        className="w-full relative shadow-md shadow-slate-700/30 rounded-md overflow-x-hidden"
      >
        {!props["no-arrows"] && (
          <button
            className="carrousel-arrow transition-opacity opacity-0 duration-100 absolute top-[50%] left-2 w-fit h-fit z-20 bg-slate-100/20 pointer-events-auto rounded-full p-2 hover:bg-slate-100"
            onClick={previous}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        <div className="w-full aspect-video"></div>
        <For each={data.content}>
          {(content: CarrouselContainer, idx: Accessor<number>) => (
            <CarrouselWrapper idx={idx()} selected={selected()}>
              <CarrouselContent
                content={content}
                metadata={{
                  idx: idx(),
                  selected: selected(),
                  active: idx() === selected(),
                  timeout: props.speed,
                }}
                next={() =>
                  setSelected(
                    (idx() + 1) %
                      (data.content.length + (hasChildren() ? 1 : 0))
                  )
                }
              />
            </CarrouselWrapper>
          )}
        </For>
        <Show when={hasChildren()}>
          <CarrouselWrapper idx={data.content.length} selected={selected()}>
            {data.children}
          </CarrouselWrapper>
        </Show>

        {!props["no-arrows"] && (
          <button
            className="carrousel-arrow transition-opacity duration-100 opacity-0 absolute top-[50%] right-2 w-fit h-fit z-20 bg-slate-100/20 pointer-events-auto rounded-full p-2 hover:bg-slate-100"
            onClick={next}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex w-full gap-1 px-6 mt-2 justify-center items-center">
        <For each={data.content}>
          {(cnt: CarrouselContainer, idx: Accessor<number>) => (
            <CarrouselButton
              idx={idx()}
              selected={selected()}
              select={() => setSelected(idx())}
              title={cnt.anchor.label}
            />
          )}
        </For>
        <Show when={hasChildren()}>
          <button
            type="button"
            className={`rounded-full text-transparent transition-[width] duration-200 leading-[0] w-4 h-4 font-bold leading-none flex justify-center items-center ml-1 ${
              data.content.length === selected()
                ? "bg-slate-500 text-slate-200"
                : "bg-slate-500/30 text-slate-950"
            }`}
            onClick={() => {
              if (data.content.length !== selected()) {
                setSelected(data.content.length);
              }
            }}
            title="More Content"
          ></button>
        </Show>
      </div>
    </section>
  );
};
