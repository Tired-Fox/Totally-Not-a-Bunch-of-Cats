import { HeaderLink } from "./HeaderLink";
import { createSignal } from "solid-js";
import { Toaster } from "solid-toast";
import { menu } from "@script/constants.ts";

type Props = { url: URL };

export const Header = (props: Props) => {
  let openButton: HTMLElement;
  let closeButton: HTMLElement;
  const [open, setOpen] = createSignal(false);
  

  const closeMenu = () => {
    setOpen(false);
    openButton.focus();
    // document.body.classList.remove('overflow-y-hidden');
  };
  const openMenu = () => {
    setOpen(true);
    closeButton.focus();
    // document.body.classList.add('overflow-y-hidden');
  };
  const toggleMenu = () => {
    if (open()) {
        closeMenu();
    } else {
        openMenu()
    }
  };

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && open()) {
        closeMenu();
    }
  });

  return (
    <header className="w-full z-40">
      <div className="w-full max-w-[120ch] mx-auto flex justify-end">
        <div className="mt-2 mr-3 w-12 h-12 bg-slate-100 rounded-full shadow-md border-2 border-dashed border-slate-300  pointer-events-auto">
          <button
            type="button"
            ref={openButton}
            className="toggle-menu w-full h-full flex justify-center items-center"
            onClick={toggleMenu}
            title="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="-5 -7 24 24"
            >
              <path
                fill="currentColor"
                className="w-8 h-8"
                d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-screen flex justify-end z-40 ${
          open() ? "bg-slate-700/20 backdrop-blur-2xl pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <nav
          id="header-nav"
          className={`transition-transform linear duration-200 w-screen md:w-[20rem] h-screen bg-slate-100 md:rounded-l-lg shadow-lg shadow-slate-800 border-y-2 border-l-2 border-dashed border-slate-400 overflow-hidden flex flex-col items-end backdrop-blur-md backdrop-brightness-150 ${open() ? "" : "translate-x-[100vw] border-transparent scale-x-0"}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-12 h-12 mt-4 mr-1">
            <button
              type="button"
              ref={closeButton}
              className="toggle-menu w-full h-full flex justify-center items-center"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="-6 -6 24 24"
              >
                <path
                  fill="currentColor"
                  className="w-8 h-8 text-slate-900"
                  d="m7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485L2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535l3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"
                />
              </svg>
            </button>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <em className="text-slate-700/40 text-3xl font-bold">Menu</em>
            <ul className="mt-2 text-lg list-disc list-inside">
                { menu &&
                    Object.entries(menu).map(([name, info]) => (
                        <li>
                            <HeaderLink href={info.uri} pathname={props.url.pathname} class="h-fit">
                                {name}
                            </HeaderLink>
                        </li>
                    ))
                }
            </ul>
          </div>
        </nav>
      </div>
      <Toaster position="bottom-left" gutter={8} />
    </header>
  );
};
