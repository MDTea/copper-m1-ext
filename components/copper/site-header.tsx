import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#plus", label: "Copper Plus" },
  { href: "#privacy", label: "Privacy" },
  { href: "#contact", label: "Contact" },
];

// Sticky and slim. On phones the links sit on a second row under the logo;
// from sm up everything fits on one row.
export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background sticky top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 py-2 sm:flex-nowrap sm:py-3">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-36 sm:w-44" />
        </Link>
        <nav
          aria-label="Main"
          className="order-last flex w-full gap-6 pt-1 pb-1 text-sm font-medium sm:order-none sm:ml-auto sm:w-auto sm:p-0"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
