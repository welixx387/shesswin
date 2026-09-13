"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Курсы", href: "/debuts" },
  { label: "Дебюты", href: "/#openings" },
  { label: "Задачи", href: null },
  { label: "Рейтинг", href: null },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border-subtle bg-bg-primary/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo animate={false} size={26} />

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a
                  href={link.href}
                  className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <span className="flex cursor-default items-center gap-1.5 text-sm font-medium text-text-secondary/50">
                  {link.label}
                  <span className="rounded-full border border-border-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-text-secondary/60">
                    скоро
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="/debuts" size="md" pulse>
            Начать бесплатно
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full glass text-text-primary md:hidden"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 bg-bg-primary/98 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              className="flex flex-col gap-2 px-6 py-10"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-4 text-lg font-medium text-text-primary transition-colors hover:bg-white/[0.05]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-4 text-lg font-medium text-text-secondary/50">
                      {link.label}
                      <span className="rounded-full border border-border-subtle px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                        скоро
                      </span>
                    </span>
                  )}
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="mt-4"
              >
                <Button href="/debuts" size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
                  Начать бесплатно
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
