import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Download,
  Phone,
  Bot,
  X,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pic from "@/assets/profile5.gif";

import absence from "@/assets/absence2.png";
import appevent from "@/assets/enent organizer.jpeg";
import ordersmanager from "@/assets/ordersmanager.jpeg";

// ————————————————————————————————————————————————
// Portfolio – React + Tailwind + Framer Motion + shadcn/ui + lucide-react
// + Floating Chatbot (bottom-right)
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
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Framer Motion",
  "Laravel",
  "Spring Boot",
  "MySQL",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Git/GitHub",
  "CI/CD",
  "JWT",
  "Zod",
];

// Small helper for keyboard trapping focus inside the chat when opened (simple approach)
function useEscape(handler) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", text: "Salut ! Comment puis‑je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEscape(() => setOpen(false));

  const toggle = () => setOpen((v) => !v);

  // Auto-scroll to bottom when messages change or loading state changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const API_URL = import.meta.env.VITE_N8N_CHATBOT_URL; // e.g. https://your-n8n-domain/webhook/chatbot
  const API_TOKEN = import.meta.env.VITE_N8N_CHATBOT_TOKEN; // optional bearer token if you secure the webhook

  // send() with tolerant response parsing (JSON or Text)
  const send = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg = { id: Date.now(), role: "user", text: userText };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    if (!API_URL) {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "⚠️ API non configurée. Ajoutez VITE_N8N_CHATBOT_URL dans votre .env.",
        },
      ]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
        },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-10).map(({ role, text }) => ({ role, text })),
          source: "portfolio", // routing/analytics in n8n
        }),
      });

      // Build a safe error message with best-effort parsing
      if (!res.ok) {
        const ct = res.headers.get("content-type") || "";
        const errPayload = ct.includes("application/json")
          ? await res.json().catch(() => ({}))
          : await res.text().catch(() => "");
        const details =
          typeof errPayload === "string" ? errPayload : JSON.stringify(errPayload);
        throw new Error(`${res.status} ${res.statusText} — ${details}`);
      }

      // Parse success body (JSON → text field, otherwise text)
      const ct = res.headers.get("content-type") || "";
      let reply = "(Réponse vide)";

      if (ct.includes("application/json")) {
        const data = await res.json().catch(() => ({}));
        reply = data.reply ?? data.text ?? JSON.stringify(data) ?? reply;
      } else {
        reply = await res.text();
      }

      setMessages((m) => [
        ...m,
        { id: Date.now() + 2, role: "bot", text: reply || "(Réponse vide)" },
      ]);
      console.log(reply);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 3, role: "bot", text: `Erreur de chat: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const openEv = () => setOpen(true);
  const toggleEv = () => setOpen((v) => !v);

  window.addEventListener("chat:open", openEv);
  window.addEventListener("chat:toggle", toggleEv);

  return () => {
    window.removeEventListener("chat:open", openEv);
    window.removeEventListener("chat:toggle", toggleEv);
  };
}, []);


  return (
    <>
      {/* Floating button */}
      <motion.button
        aria-label={open ? "Fermer le chatbot" : "Ouvrir le chatbot"}
        onClick={toggle}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-600 to-fuchsia-600 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/20 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -2 }}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-10 w-10" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={`fixed right-[max(1rem,env(safe-area-inset-right))] z-[60] w-92 max-w-sm sm:max-w-md ${
              open ? "bottom-2" : "bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)]"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Fenêtre de chat"
          >
            <div className="relative rounded-[1.25rem] p-[1px] bg-[conic-gradient(from_var(--angle),theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
              <Card className="rounded-[inherit] border border-slate-200/70 bg-gradient-to-b from-white/95 to-white/85 backdrop-blur-xl ring-1 ring-white/60">
                {/* Header */}
                <CardHeader className="relative flex flex-row items-center justify-between py-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                    </span>
                    <span className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent font-semibold">
                      Assistant
                    </span>
                    <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      En ligne
                    </span>
                  </CardTitle>

                  <a
                    size="icon"
                    variant=""
                    aria-label="Fermer la fenêtre"
                    onClick={() => setOpen(false)}
                    className=" w-fit text-purple-800 hover:border-b-2 hover:border"
                  >
                    Fermer
                  </a>

                  {/* Soft divider */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                  />
                </CardHeader>

                <CardContent className="pt-3">
                  {/* Messages area */}
                  <div
                    className="relative mb-3 max-h-72 overflow-y-auto rounded-xl border border-slate-200/70 p-3 text-sm
                             bg-white [background-image:radial-gradient(40%_60%_at_85%_0%,rgba(6,182,212,0.08),transparent_60%),radial-gradient(40%_60%_at_0%_100%,rgba(244,63,94,0.06),transparent_60%)]"
                  >
                    {/* Top sheen */}
                    <span aria-hidden className="pointer-events-none absolute inset-x-4 top-0 h-6 rounded-b-full bg-white/70 blur-xl" />

                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={
                          m.role === "user"
                            ? "ml-auto mb-2 max-w-[85%] rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm"
                            : "mr-auto mb-2 max-w-[85%] rounded-2xl border border-cyan-200/60 bg-gradient-to-br from-cyan-50 to-rose-50 px-3 py-2 text-slate-800 shadow-sm"
                        }
                      >
                        {m.text}
                      </div>
                    ))}

                    {/* Typing indicator (shows while loading) */}
                    {loading && (
                      <div className="mr-auto mt-1 w-fit max-w-[85%] rounded-2xl border border-cyan-200/70 bg-cyan-50 px-3 py-2 text-slate-800 shadow-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-200ms]" />
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-100ms]" />
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                        </span>
                      </div>
                    )}
                    
                    {/* Invisible element at the bottom for scrolling */}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={send} className="group/input flex items-center gap-2">
                    <div className="flex-1 rounded-2xl border border-slate-300 bg-white px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] focus-within:ring-2 focus-within:ring-cyan-400">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Écrivez un message…"
                        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="rounded-2xl bg-gradient-to-br from-cyan-600 to-fuchsia-600 text-white shadow-lg hover:from-cyan-500 hover:to-fuchsia-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400"
                    >
                      {loading ? "Envoi…" : "Envoyer"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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

  const openChat = () => {
  window.dispatchEvent(new Event("chat:open"));
};

  return (
    <div> 
      <div className="bg  rounded-3xl ">
        <div className="min-h-screen  rounded-3xl backdrop-blur-2xl overflow-hidden">
          {/* Animated background (mesh + shimmer + voile conique en rotation) */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Mesh coloré flou */}
            <div className="absolute inset-0 opacity-90" />
            {/* voile conique en rotation lente */}
            <div className="absolute inset-0 animate-spin-slow" />
            {/* shimmer horizontal discret */}
            <div className="absolute inset-0 animate-shimmer" />
          </div>

          {/* Navbar (now fixed) */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-green-800 backdrop-blur supports-[backdrop-filter]:bg-background/70 ">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <a href="#hero" className="flex items-center gap-2 font-semibold">
                Samad
              </a>
              <nav className="hidden gap-1 md:flex">
                {[
                  { id: "about", label: "À propos" },
                  { id: "projects", label: "Projets" },
                  { id: "skills", label: "Compétences" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToId(item.id)}
                    className="group relative mx-1 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.99]"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-xl bg-foreground/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/[0.04]" />
                    <span aria-hidden className="pointer-events-none absolute left-1/2 bottom-1.5 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500))] shadow-[0_0_12px_rgba(99,102,241,0.35)] transition-[width] duration-300 ease-out group-hover:w-8" />
                    <span aria-hidden className="pointer-events-none absolute inset-x-3 top-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-white/10" />
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/DESELMAAR"
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
          {/* Spacer to offset fixed header height (prevents content being hidden) */}
          <div className="h-14 md:h-16" />

          {/* Hero */}
          <section id="hero" className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12">
            <motion.div variants={stagger} initial="hidden" animate="show" className="grid items-center gap-10 md:grid-cols-2">
              <div className="">
                <motion.p
                  variants={fadeUp}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm ring-1  shadow-sm shadow-indigo-500/10 transition-all"
                >
                  Disponible pour missions freelance
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
                  style={{ textShadow: "0 1px 0 rgba(0,0,0,.35), 0 10px 30px rgba(0,0,0,.25)" }}
                >
                  Bonjour, je suis <span className="bg-green-600 bg-clip-text text-transparent">Abdessamad</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground inline-block rounded-xl px-4 py-2 bg-white/70 backdrop-blur-sm supports-[backdrop-filter]:bg-slate-200/90 ring-1 ring-white/20 shadow-sm  text-purple-900 font-semibold"
                >
                  Développeur Full-Stack passionné (React · Laravel · Spring Boot). J'aime construire des interfaces élégantes et des APIs robustes, avec des transitions fluides. <br />
                  <p className="font-bold p-2  rounded-lg "> vous pouvez demander à mon  <button className="underline hover:no-underline" onClick={openChat}>AI agent Chat</button>  tout ce que vous voulez savoir sur mon profil</p> 
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative inline-flex overflow-hidden rounded-2xl p-[2px]">
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))] [animation:spin_8s_linear_infinite]" />
                    <span aria-hidden className="pointer-events-none absolute inset-[-12%] rounded-[inherit] bg-[inherit] blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-70" />
                    <Button onClick={() => scrollToId('projects')} className="relative rounded-[calc(1rem-2px)] bg-gradient-to-br from-cyan-600 to-cyan-700 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-fuchsia-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 transition-colors">
                      <span className="relative inline-flex items-center">Voir mes projets <ArrowRight className="ml-2 h-4 w-4" /></span>
                      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative inline-flex overflow-hidden rounded-2xl p-[2px]">
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))] [animation:spin_8s_linear_infinite]" />
                    <span aria-hidden className="pointer-events-none absolute inset-[-12%] rounded-[inherit] bg-[inherit] blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-60" />
                    <Button asChild variant="outline" className="relative rounded-[calc(1rem-2px)] border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-400">
                      <a href="#contact" className="inline-flex items-center"><Mail className="mr-2 h-4 w-4" /> Me contacter</a>
                    </Button>
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                  </motion.div>

                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative inline-flex overflow-hidden rounded-2xl p-[2px]">
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),theme(colors.rose.500),theme(colors.fuchsia.500),theme(colors.cyan.400),theme(colors.rose.500))] [animation:spin_8s_linear_infinite]" />
                    <span aria-hidden className="pointer-events-none absolute inset-[-12%] rounded-[inherit] bg-[inherit] blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-60" />
                    <Button asChild variant="secondary" className="relative rounded-[calc(1rem-2px)] border-0 bg-slate-900/70 text-white hover:bg-slate-900/60 shadow-lg shadow-rose-500/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-400">
                      <a href="/cv.pdf" download className="inline-flex items-center"><Download className="mr-2 h-4 w-4" /> Télécharger CV</a>
                    </Button>
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Avatar */}
              <motion.div variants={fadeUp} className="relative mx-auto aspect-square w-full max-w-md overflow-">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br  blur-xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-[2rem]   bg-background/70 shadow-xl backdrop-blur">
                  <div className="relative h-80 w-80">
                    <img src={pic} alt="Photo d'Abdessamad" className="relative z-10 h-80 w-80 object-cover rounded-[2rem] ring-1 ring-black/5 dark:ring-white/10" />
                    <div className="absolute inset-0 rounded-[2rem] -z-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35),0_6px_12px_-6px_rgba(0,0,0,0.25)] dark:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.7),0_8px_16px_-8px_rgba(0,0,0,0.55)]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* À propos */}
          <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold sm:text-3xl">À propos</motion.h2>
              <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-muted-foreground inline-block text-purple-900 font-semibold rounded-xl px-4 py-2 bg-white/20 backdrop-blur-sm supports-[backdrop-filter]:bg-slate-200/90  ring-1 ring-white/20 shadow-sm">
                J'orchestre des stacks modernes et maintenables, avec des tests, une CI soignée et un sens affûté de l'UX. Côté backend : APIs REST sécurisées (JWT...) et persistance SQL. Côté frontend : Vite, Zustand, requêtes efficientes, accessibilité et performance.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                {skills.slice(0, 8).map((s) => (
                  <span key={s} className="rounded-full border border-2 bg-background/60 px-3 py-1 text-md text-muted-foreground">{s}</span>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section className="">
            {/* Marquee slider */}
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/60 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/60 to-transparent" />

              <div className="marquee flex w-max items-center">
                <div className="flex items-center gap-10 pr-10">
                  {[...Array(10)].map((_, i) => {
                    const src = new URL(`../assets/${i + 1}.svg`, import.meta.url).href;
                    return (
                      <img key={`a-${i}`} src={src} alt={`logo ${i + 1}`} className="h-14 w-auto opacity-90 transition hover:opacity-100" draggable="false" />
                    );
                  })}
                </div>

                <div className="flex items-center gap-10 pr-10" aria-hidden="true">
                  {[...Array(10)].map((_, i) => {
                    const src = new URL(`../assets/${i + 1}.svg`, import.meta.url).href;
                    return <img key={`b-${i}`} src={src} alt="" className="h-14 w-auto opacity-90" draggable="false" />;
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Projets */}
          <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeUp} className="mb-6 flex items-center justify-between gap-2">
                <h2 className="text-2xl font-bold sm:text-3xl">Projets en vedette</h2>
                <a href="https://github.com/username" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Tous les dépôts</a>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, idx) => (
                  <motion.div key={p.title} variants={fadeUp} custom={idx} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="group">
                    <div className="relative rounded-2xl p-[2px] bg-[conic-gradient(from_var(--angle),theme(colors.cyan.400),theme(colors.fuchsia.500),theme(colors.rose.500),theme(colors.cyan.400))]">
                      <Card className="relative h-full overflow-hidden rounded-[calc(1rem-2px)] border border-border/60 bg-white/5 backdrop-blur-sm supports-[backdrop-filter]:bg-white/10 transition-transform duration-500">
                        <span aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[inherit] blur-2xl bg-[inherit] opacity-30 transition-opacity duration-500 group-hover:opacity-60" />

                        <CardHeader className="space-y-1">
                          <CardTitle className="flex items-center justify-between text-lg">
                            <span className="inline-flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 ring-2 ring-cyan-400/30" />
                              {p.title}
                            </span>
                            {/* <span className="text-xs font-normal text-muted-foreground">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span> */}
                          </CardTitle>
                        </CardHeader>

                        <CardContent>
                          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-rose-500/15">
                            <img className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" src={p.picture} alt="" loading="lazy" />
                            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000" />
                            <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                              <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg,#06b6d4,#22d3ee,#06b6d4)" }} />
                              <span className="absolute left-0 top-1/2 h-1 w-36 -translate-y-1/2 rounded-full bg-cyan-400/90 animate-slide-dot" />
                              <span className="absolute left-0 top-1/2 h-2 w-12 -translate-y-1/2 rounded-full bg-cyan-300/70 blur-sm animate-slide-dot" />
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground">{p.description}</p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                              <span key={t} className="rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground transition-all hover:border-cyan-400/50 hover:text-foreground hover:shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_6px_20px_-6px_rgba(34,211,238,0.35)]">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4">
                            <Button variant="outline" size="sm" asChild className="rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 relative overflow-hidden">
                              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center">
                                Voir le code <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                <span aria-hidden className="absolute bottom-0 left-3 right-3 h-px bg-cyan-400/60 scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Compétences */}
          <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 backdrop-blur-3xl">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(70%_60%_at_50%_40%,black_40%,transparent_100%)]">
              <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 blur-3xl bg-[radial-gradient(45%_45%_at_50%_50%,theme(colors.indigo.500/.45),transparent_60%)]" />
              <div className="absolute -left-8 top-1/3 h-80 w-80 blur-3xl bg-[radial-gradient(40%_40%_at_50%_50%,theme(colors.violet.600/.35),transparent_60%)]" />
              <div className="absolute right-0 bottom-6 h-96 w-96 blur-3xl bg-[radial-gradient(40%_40%_at_50%_50%,theme(colors.fuchsia.500/.30),transparent_60%)]" />
            </div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold sm:text-3xl">Compétences clés</motion.h2>
              <motion.p variants={fadeUp} className="mt-2 text-sm text-muted-foreground">Un mix équilibré front/back pour livrer rapidement et proprement.</motion.p>
              <motion.div variants={fadeUp} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((s) => (
                  <div key={s} className="rounded-2xl border border-2 bg-background/60 p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{s}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Contact */}
          <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-24  backdrop-blur-3xl">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold sm:text-3xl">Contact</motion.h2>
              <motion.p variants={fadeUp} className="mt-2 text-sm text-muted-foreground">Dites‑moi en plus sur votre projet — je réponds vite.</motion.p>

              <motion.form
                variants={fadeUp}
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = Object.fromEntries(new FormData(e.currentTarget));
                  const body = encodeURIComponent(`${data.nom}\n${data.email}\n\n${data.message}`);
                  window.location.href = `mailto:hello@samad.dev?subject=Contact%20portfolio&body=${body}`;
                }}
                className="mt-6 grid gap-4 rounded-2xl border border-2 bg-background/60 p-6 sm:grid-cols-2"
              >
                <div className="sm:col-span-1">
                  <label className="mb-1 block text-xs text-muted-foreground">Nom</label>
                  <input required name="nom" className="w-full rounded-xl border border-2 border-slate-400 bg-transparent px-3 py-2 outline-none ring-offset-background placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-indigo-500" placeholder="Votre nom" />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-1 block text-xs text-muted-foreground">Email</label>
                  <input required type="email" name="email" className="w-full rounded-xl border border-2 border-slate-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="votre@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs text-muted-foreground">Message</label>
                  <textarea required name="message" rows={5} className="w-full resize-none rounded-xl border border-2 border-slate-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Décrivez votre besoin..." />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between">
                  <a href="tel:+212700161503" className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded-md" aria-label="Appeler +212 700161503">
                    <Phone className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span dir="ltr">+212700-161-503</span>
                  </a>

                  <Button type="submit" className="rounded-2xl">
                    Envoyer 
                  </Button>
                </div>
              </motion.form>
            </motion.div>
          </section>

          <footer className="py-8  bg-green-800 ">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground">
              <span>© {year} Samad — Tous droits réservés.</span>
              <a href="#hero" className="underline underline-offset-4">Retour en haut</a>
            </div>
          </footer>
        </div>
      </div>
      {/* Floating Chatbot */}
      <ChatWidget />
    </div>
  );
}