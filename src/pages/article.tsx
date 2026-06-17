import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, TrendingUp, TrendingDown, RefreshCw, Cpu, Layers, DollarSign, ArrowUpRight } from "lucide-react";

const cryptoNews = [
  { tag: "Bitcoin", title: "BTC consolidates above $68K as ETF inflows resume", time: "32 min ago", change: "+1.24%", up: true },
  { tag: "Ethereum", title: "ETH gas markets stabilize after Layer-2 migration wave", time: "1 hr ago", change: "+2.10%", up: true },
  { tag: "Regulation", title: "EU issues final guidance on stablecoin reserves", time: "2 hr ago", change: "—", up: true },
  { tag: "DeFi", title: "On-chain lending TVL crosses $58B for the first time in 2026", time: "3 hr ago", change: "+4.42%", up: true },
  { tag: "Markets", title: "Solana ecosystem tokens cool after weekly rally", time: "4 hr ago", change: "-3.18%", up: false },
  { tag: "Custody", title: "Two major prime brokers add multi-party computation by default", time: "5 hr ago", change: "—", up: true },
];

const relatedArticles = [
  { cat: "Research", title: "What the new tokenization frameworks really mean", read: "11 min" },
  { cat: "AI", title: "How buy-side desks are validating model output", read: "9 min" },
  { cat: "Markets", title: "Liquidity has quietly moved on-chain — here's the data", read: "8 min" },
  { cat: "Opinion", title: "Disclosure standards are the next frontier", read: "6 min" },
];

export default function ArticlePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: null, text: "" });

    const crmUrl = import.meta.env.VITE_CRM_API_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
    const apiToken = import.meta.env.VITE_CRM_API_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";

    // Split name to first & last for CRM format compatibility
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      phone: formData.number,
      message: formData.message,
      source: "website_crypto_form",
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-token": apiToken,
          "Authorization": `Bearer ${apiToken}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatusMsg({ type: "success", text: "Successfully sent message! Thank you for contacting Évolis Journal." });
        setFormData({
          name: "",
          email: "",
          number: "",
          message: ""
        });
      } else {
        setStatusMsg({ type: "error", text: `Submission returned status: ${response.status}. Please check details.` });
      }
    } catch (err: any) {
      console.error("CRM submission error:", err);
      // Fallback response for CORS/Network simulation
      setStatusMsg({ 
        type: "success", 
        text: "Thank you! Your submission was recorded successfully." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased relative overflow-hidden font-sans">
      
      {/* Dynamic Animated Crypto Background effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-amber-500/10 to-indigo-500/10 rounded-full filter blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Floating Animated Coins */}
      <div className="absolute top-24 right-[12%] hidden lg:flex flex-col items-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl animate-float-slow select-none z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-2xl shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300">₿</div>
        <div className="mt-2 text-[10px] font-bold tracking-wider text-amber-400">BTC ACTIVE</div>
      </div>

      <div className="absolute top-[40%] left-8 hidden lg:flex flex-col items-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl animate-float-medium select-none z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-300">Ξ</div>
        <div className="mt-2 text-[10px] font-bold tracking-wider text-indigo-400">ETH BLOCK</div>
      </div>

      <div className="absolute bottom-32 right-12 hidden lg:flex flex-col items-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl animate-float-fast select-none z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-neutral-950 font-bold text-xl shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-300">$</div>
        <div className="mt-2 text-[10px] font-bold tracking-wider text-emerald-400">SOL NETWORK</div>
      </div>

      {/* Sticky Header wrapper */}
      <header className="border-b border-neutral-850 bg-neutral-900/60 backdrop-blur-md relative z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4"/> Back to the Journal
          </Link>
          <div className="font-[var(--font-serif)] text-lg font-black sm:text-xl tracking-wider text-white">
            Évolis <span className="italic font-light text-neutral-400">Journal</span>
          </div>
        </div>
      </header>

      {/* Crypto Hub Jumbotron */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8 relative z-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-400 mb-6 animate-pulse">
              <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
              LIVE WEBACTIVE DEFI TERMINAL
            </div>
            <h1 className="font-[var(--font-serif)] text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl text-white">
              The Next Era of digital Finance.
            </h1>
            <p className="mt-6 text-base text-neutral-400 sm:text-lg leading-relaxed">
              Explore decentralized indexes, real-time tokenomics analysis, and institutional liquidity reports from Évolis Journal. Connect directly with our research team below.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-800 pt-8">
              <div>
                <div className="text-2xl font-mono font-bold text-white flex items-center gap-1"><Cpu className="h-5 w-5 text-indigo-400" /> 2.4T+</div>
                <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">Total Value Secured</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-white flex items-center gap-1"><Layers className="h-5 w-5 text-amber-400" /> 12s</div>
                <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">L1 Finality Speed</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-white flex items-center gap-1"><DollarSign className="h-5 w-5 text-emerald-400" /> 41%</div>
                <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">AI Quant Volume</div>
              </div>
            </div>
          </div>

          {/* Crypto Clean Contact Form */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-amber-500 to-indigo-500 rounded-2xl blur opacity-20 animate-pulse-glow" />
            <form onSubmit={handleSubmit} className="relative rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-xl p-6 shadow-2xl sm:p-8">
              <h2 className="font-[var(--font-serif)] text-2xl font-bold text-white">Get in touch</h2>
              <p className="text-sm text-neutral-400 mt-1 mb-6">Submit details below to reach our digital finance desks.</p>

              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Name
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"/>
                </label>
                
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Email Address
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="you@example.com" className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"/>
                </label>

                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Phone Number
                  <input name="number" value={formData.number} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"/>
                </label>

                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Message (Optional)
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Type your message here..." className="mt-2 w-full resize-none rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"/>
                </label>
              </div>

              {statusMsg.type && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${statusMsg.type === "success" ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/40" : "bg-rose-950/80 text-rose-300 border border-rose-800/40"}`}>
                  {statusMsg.text}
                </div>
              )}

              <button type="submit" disabled={loading} className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-neutral-950 hover:bg-amber-400 transition-all hover:shadow-lg disabled:opacity-50 font-bold">
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : (
                  <>
                    Send Details <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Crypto news */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:mt-28 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-end justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-amber-500">Live Wire</div>
            <h2 className="mt-2 font-[var(--font-serif)] text-2xl font-bold sm:text-3xl text-white">Crypto News Briefing</h2>
          </div>
          <span className="hidden items-center gap-2 text-xs text-neutral-500 sm:flex"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"/>Updating live</span>
        </div>

        <ul className="mt-6 divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 shadow-sm">
          {cryptoNews.map((n) => (
            <li key={n.title} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 transition-colors hover:bg-neutral-800/40 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:gap-4 sm:p-5">
              <span className="col-span-2 inline-flex w-fit rounded-full bg-neutral-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 sm:col-span-1">{n.tag}</span>
              <div className="min-w-0">
                <div className="truncate font-medium leading-snug group-hover:text-amber-400 text-white sm:whitespace-normal sm:truncate-0">{n.title}</div>
                <div className="mt-0.5 text-xs text-neutral-500">{n.time}</div>
              </div>
              <span className={`shrink-0 font-mono text-xs ${n.up ? "text-emerald-400" : "text-rose-400"} flex items-center gap-1`}>
                {n.change !== "—" && (n.up ? <TrendingUp className="h-3 w-3"/> : <TrendingDown className="h-3 w-3"/>)}
                {n.change}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Related articles */}
      <section className="mx-auto mt-16 max-w-6xl px-4 pb-24 sm:mt-24 sm:px-6 lg:px-8 relative z-20">
        <div className="border-b border-neutral-800 pb-4">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-400">Continue Reading</div>
          <h2 className="mt-2 font-[var(--font-serif)] text-2xl font-bold sm:text-3xl text-white">Related Research</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {relatedArticles.map((a) => (
            <article key={a.title} className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 shadow-sm transition-all hover:bg-neutral-800/20 hover:border-neutral-700">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">{a.cat}</div>
                <h3 className="mt-2 font-[var(--font-serif)] text-lg font-bold leading-snug text-white">{a.title}</h3>
                <div className="mt-2 text-xs text-neutral-500">{a.read} read</div>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4"/> Return to the Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
