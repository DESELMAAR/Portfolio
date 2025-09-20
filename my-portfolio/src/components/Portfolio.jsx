
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download, Rocket, Sparkles, Moon, Sun, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pic from "@/assets/pic.png";

import absence from "@/assets/absence2.png";
import appevent from "@/assets/enent organizer.jpeg";
import ordersmanager from "@/assets/ordersmanager.jpeg";

// ————————————————————————————————————————————————
// Portfolio – React + Tailwind + Framer Motion + shadcn/ui + lucide-react
// ————————————————————————————————————————————————

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const projects = [
  {
    title: "Gestion d'Absences",
    picture: absence,
    description:
      "Application Full‑Stack (Spring Boot + React) pour gérer classes, profs, emplois du temps et absences.",
    tags: ["React", "Spring Boot", "JWT", "Tailwind"],
    link: "https://github.com/username/projet_gestion_absences",
  },
  {
    title: "App Événements",
    picture: appevent,
    description:
      "Plateforme d'événements (création, réservation, likes) avec filtres, upload et FormData.",
    tags: ["React", "Vite", "Node", "MongoDB"],
    link: "https://github.com/username/appevent",
  },
  {
    title: "Food Delivery API",
    picture: ordersmanager,
    description:
      "API Laravel 11 (Spatie Permissions) – rôles Admin/Restaurant/Client, menus et commandes.",
    tags: ["Laravel 11", "MySQL", "REST", "Spatie"],
    link: "https://github.com/username/food-delivery-api",
  },
];

const skills = [
  "React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion",
  "Laravel", "Spring Boot", "MySQL", "PostgreSQL", "Redis",
  "Docker", "Git/GitHub", "CI/CD", "JWT", "Zod",
];

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen dark:from-zinc-950 dark:to-zinc-900 text-foreground selection:bg-indigo-500/30">
      {/* Animated background (mesh + shimmer + voile conique en rotation) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Mesh coloré flou */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(40% 60% at 20% 10%, #06b6d4 0%, transparent 60%),\
               radial-gradient(35% 55% at 80% 0%, #a78bfa 0%, transparent 60%),\
               radial-gradient(45% 65% at 50% 100%, #fb7185 0%, transparent 60%),\
               radial-gradient(30% 50% at 0% 80%, #22c55e 0%, transparent 60%)",
            filter: "blur(42px)",
          }}
        />

        {/* voile conique en rotation lente */}
        <div
          className="absolute inset-0 animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #ffffff10, #0000 30%, #ffffff10 60%, #0000 100%)",
          }}
        />

        {/* shimmer horizontal discret */}
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            backgroundSize: "40% 100%",
            maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 ">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-2 font-semibold">
            <Rocket className="h-5 w-5" /> Samad · Portfolio
          </a>
          <nav className="hidden gap-6 md:flex">
            {[
              { id: "about", label: "À propos" },
              { id: "projects", label: "Projets" },
              { id: "skills", label: "Compétences" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="text-sm text-muted-foreground font-semibold transition hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl  transition hover:bg-accent"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl  transition hover:bg-accent"
            >
              <Linkedin className="h-4 w-4" />
            </a>
      
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="mx-auto max-w-6xl px-4 pt-16 sm:pt-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.p variants={fadeUp} className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Disponible pour missions freelance
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
            >
              Bonjour, je suis <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">Abdessamad </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              Développeur Full‑Stack passionné (React · Laravel · Spring Boot). J'aime construire des interfaces élégantes et des APIs robustes, avec des transitions fluides.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              {/* CTA 1 */}
              <div className="relative inline-flex overflow-hidden rounded-2xl p-[2px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-[conic-gradient(at_top_left,theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))] animate-[spin_6s_linear_infinite]"
                />
                <Button
                  onClick={() => scrollToId("projects")}
                  className="relative rounded-[calc(1rem-2px)] bg-cyan-700"
                >
                  Voir mes projets <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* CTA 2 */}
              <div className="relative inline-flex overflow-hidden rounded-2xl p-[2px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-[conic-gradient(at_top_left,theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))] animate-[spin_6s_linear_infinite]"
                />
                <Button
                  variant="outline"
                  asChild
                  className="relative rounded-[calc(1rem-2px)] border-0 bg-cyan-700 text-white hover:bg-cyan-700/90 focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <a href="#contact" className="inline-flex items-center">
                    <Mail className="mr-2 h-4 w-4" /> Me contacter
                  </a>
                </Button>
              </div>

              {/* CTA 3 */}
              <div className="relative inline-flex overflow-hidden rounded-2xl p-[2px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-[conic-gradient(at_top_left,theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))] animate-[spin_6s_linear_infinite]"
                />
                <Button
                  variant="secondary"
                  asChild
                  className="relative rounded-[calc(1rem-2px)] border-0 bg-cyan-700 text-white hover:bg-cyan-700/90 focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <a href="/cv.pdf" download className="inline-flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Télécharger CV
                  </a>
                </Button>
              </div>

            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div variants={fadeUp} className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-rose-500/20 blur-xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-[2rem] border border-border/50 border-2 border-cyan-500 bg-background/70 shadow-xl backdrop-blur">
              <img src={pic} alt="Photo d'Abdessamad" className="h-full w-full object-cover rounded-[2rem]" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* À propos */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold sm:text-3xl">À propos</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-muted-foreground">
            J'orchestre des stacks modernes et maintenables, avec des tests, une CI soignée et un sens affûté de l'UX.
            Côté backend : APIs REST sécurisées (JWT, RBAC) et persistance SQL. Côté frontend : Vite, Zustand, requêtes efficientes, accessibilité et performance.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            {skills.slice(0, 8).map((s) => (
              <span key={s} className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projets */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.div variants={fadeUp} className="mb-6 flex items-center justify-between gap-2">
            <h2 className="text-2xl font-bold sm:text-3xl">Projets en vedette</h2>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Tous les dépôts
            </a>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, idx) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                custom={idx}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <Card className="group h-full overflow-hidden rounded-2xl border border-border/60">
                  <CardHeader className="space-y-1">
                    <CardTitle className="flex items-center justify-between text-lg">
                      {p.title}
                      <span className="text-xs font-normal text-muted-foreground">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Image + animation du trait/dot */}
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-rose-500/15">
                      <img className="h-full w-full object-cover" src={p.picture} alt="" />

                      {/* Barre cyan + dot qui glisse en continu */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                        {/* piste légère */}
                        <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg,#06b6d4,#22d3ee,#06b6d4)" }} />
                        {/* dot */}
                        <span className="absolute left-0 top-1/2 h-1 w-32 -translate-y-1/2 rounded-full bg-cyan-400/80 animate-slide-dot" />
                        {/* halo */}
                        <span className="absolute left-0 top-1/2 h-2 w-10 -translate-y-1/2 rounded-full bg-cyan-300/60 blur-sm animate-slide-dot" />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full border border-border/60 bg-background/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild className="rounded-xl">
                        <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center">
                          Voir le code <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Compétences */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold sm:text-3xl">Compétences clés</motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-sm text-muted-foreground">
            Un mix équilibré front/back pour livrer rapidement et proprement.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <div key={s} className="rounded-2xl border border-border/60 bg-background/60 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border/60"><Sparkles className="h-4 w-4" /></span>
                  <span className="font-medium">{s}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-24">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold sm:text-3xl">Contact</motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-sm text-muted-foreground">
            Dites‑moi en plus sur votre projet — je réponds vite.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              const body = encodeURIComponent(`${data.nom}\n${data.email}\n\n${data.message}`);
              window.location.href = `mailto:hello@samad.dev?subject=Contact%20portfolio&body=${body}`;
            }}
            className="mt-6 grid gap-4 rounded-2xl border border-border/60 bg-background/60 p-6 sm:grid-cols-2"
          >
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-muted-foreground">Nom</label>
              <input required name="nom" className="w-full rounded-xl border border-border/60 bg-transparent px-3 py-2 outline-none ring-offset-background placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-indigo-500" placeholder="Votre nom" />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-muted-foreground">Email</label>
              <input required type="email" name="email" className="w-full rounded-xl border border-border/60 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="votre@email.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs text-muted-foreground">Message</label>
              <textarea required name="message" rows={5} className="w-full resize-none rounded-xl border border-border/60 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Décrivez votre besoin..." />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" /> +212 XX XX XX XX
              </div>
              <Button type="submit" className="rounded-2xl">
                Envoyer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground">
          <span>© {year} Samad — Tous droits réservés.</span>
          <a href="#hero" className="underline underline-offset-4">Retour en haut</a>
        </div>
      </footer>
    </div>
  );
}
