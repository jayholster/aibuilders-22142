import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cpadLogo from "@/assets/cpad-logo-with-text.png";
import { Button } from "@/components/ui/button";
import { useAppProgress } from "@/hooks/useAppProgress";
import { learningModules } from "@/lib/learningModules";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const supportLinks = [
  {
    label: "CPAD Project Support",
    href: "https://forms.gle/71sL56MFsKo1WTKR8",
  },
  {
    label: "Gallery",
    route: "/gallery",
  },
];

const navItems = learningModules.filter((module) => module.id !== "gallery");

const DesktopNavigation = () => {
  const location = useLocation();
  const { reflection } = useAppProgress();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (!isMounted) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLButtonElement>("button[data-active='true']");
    if (activeButton) {
      const offsetLeft = activeButton.offsetLeft - container.clientWidth / 2 + activeButton.clientWidth / 2;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }
  }, [location.pathname, isMounted]);

  return (
    <nav className="sticky top-0 z-40 hidden w-full border-b border-slate-800/80 bg-slate-950/90 text-slate-100 backdrop-blur-lg md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={cpadLogo} alt="CPAD" className="h-12 w-auto" />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-6">
          <div className="flex min-w-[60%] items-center gap-2">
            <div className="flex w-full items-center gap-2 overflow-x-auto pb-1" ref={scrollContainerRef}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.route);
                return (
                  <Button
                    key={item.id}
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    data-active={active}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap rounded-full px-4",
                      active
                        ? "bg-white/15 text-white hover:bg-white/25"
                        : "text-slate-300 hover:bg-white/10"
                    )}
                    asChild
                  >
                    <Link to={item.route}>
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {supportLinks.map((link) =>
              link.href ? (
                <Button
                  key={link.label}
                  size="sm"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/15"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              ) : (
                <Button
                  key={link.label}
                  size="sm"
                  variant={isActive(link.route!) ? "default" : "ghost"}
                  className={cn(
                    "rounded-full px-4",
                    isActive(link.route!)
                      ? "bg-white/15 text-white hover:bg-white/25"
                      : "text-slate-300 hover:bg-white/10"
                  )}
                  asChild
                >
                  <Link to={link.route!}>{link.label}</Link>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
      {reflection && (
        <div className="border-t border-slate-800/80 bg-slate-950/80">
          <div className="mx-auto flex max-w-6xl items-start gap-2 px-6 py-2 text-sm text-slate-300">
            <span className="text-xs uppercase tracking-wide text-slate-400">Your focus</span>
            <p className="line-clamp-2">{reflection}</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DesktopNavigation;
