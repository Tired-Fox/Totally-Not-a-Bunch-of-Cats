import type { JSX } from "solid-js/jsx-runtime";

type Props = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { pathname: string, children: any };

export const HeaderLink = ({
  href,
  pathname,
  class: className,
  children,
  ...props
}: Props) => {
  const isActive = href === pathname || href === pathname?.replace(/\/$/, "");

  return (
    <a
      href={href as string}
      class={`${className} inline-block hover:text-blue-300 ${
        isActive ? "underline font-bold" : ""
      }`}
      {...props}
    >
      {children && children}
    </a>
  );
};
