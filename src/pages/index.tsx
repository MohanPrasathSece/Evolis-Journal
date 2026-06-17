import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Bookmark, Share2, Twitter, Facebook, Linkedin, Link2,
  Clock, CheckCircle2, TrendingUp, TrendingDown, ChevronRight, Heart,
  MessageCircle, ArrowUpRight, Mail, BarChart3, Globe, ShieldCheck,
  Sparkles, BookOpen, Calendar, ChevronDown,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import authorImage from "@/assets/author.jpg";

const utilityLinks = [
  ["Markets", "/markets"], ["Technology", "/technology"], ["Blockchain", "/blockchain"],
  ["AI", "/ai"], ["Economy", "/economy"], ["Research", "/research"],
  ["Opinion", "/opinion"], ["Newsletter", "/newsletter"], ["Videos", "/videos"],
  ["Podcasts", "/podcasts"], ["Events", "/events"], ["About", "/about"], ["Contact", "/contact"],
  ["Careers", "/careers"], ["Press Room", "/press"], ["Global Policy", "/policy"], ["Data Terminals", "/data"],
];

const mainNav = [
  "Latest", "Featured", "Analysis", "Digital Assets", "Fintech",
  "Cybersecurity", "Global Markets", "Startups", "Innovation", "Education",
  "DeFi Pulse", "Tokenomics", "Regulation Desk", "RWA Hub", "Venture Capital",
];

const tickerItems = [
  "Institutional adoption continues to expand",
  "AI tools reshape financial research",
  "Digital asset regulation evolves globally",
  "Blockchain innovation accelerates",
  "Fintech investment remains strong",
];

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "evolution", title: "The Evolution of Digital Finance" },
  { id: "blockchain", title: "Blockchain Technology Explained" },
  { id: "ai-research", title: "AI in Financial Research" },
  { id: "volatility", title: "Market Volatility" },
  { id: "risk", title: "Risk Management" },
  { id: "institutional", title: "Institutional Adoption" },
  { id: "security", title: "Security Considerations" },
  { id: "future", title: "Future Trends" },
  { id: "conclusion", title: "Conclusion" },
];

const relatedArticles = [
  { cat: "Blockchain", title: "Layer-2 Networks and the New Cost of Settlement", summary: "Throughput gains are reshaping fee markets across the ecosystem.", author: "M. Tanaka", date: "Jun 12, 2026", read: "9 min" },
  { cat: "AI", title: "Where Generative Models Are Outperforming Analysts", summary: "A measured look at productivity gains and remaining blind spots.", author: "R. Patel", date: "Jun 10, 2026", read: "11 min" },
  { cat: "Markets", title: "Why Liquidity Quietly Moved On-Chain in Q2", summary: "Trading desks describe a structural shift in venue selection.", author: "S. Lindqvist", date: "Jun 09, 2026", read: "8 min" },
  { cat: "Fintech", title: "Embedded Finance Crosses Into Industrial Software", summary: "B2B platforms quietly become the next distribution layer.", author: "D. Okafor", date: "Jun 08, 2026", read: "7 min" },
  { cat: "Research", title: "What 14 Central Banks Said About Tokenization", summary: "A comparative reading of recent monetary authority papers.", author: "E. Rossi", date: "Jun 07, 2026", read: "12 min" },
  { cat: "Cybersecurity", title: "Hardware Wallets, MPC, and the New Custody Stack", summary: "Custody is no longer a single decision but a layered architecture.", author: "A. Volkov", date: "Jun 05, 2026", read: "10 min" },
  { cat: "Economy", title: "The Quiet Repricing of Real-World Assets", summary: "Tokenized treasuries reveal a maturing market structure.", author: "C. Bianchi", date: "Jun 04, 2026", read: "9 min" },
  { cat: "Opinion", title: "Editorial: Disclosure Standards Must Catch Up", summary: "A call for clearer reporting in algorithmic asset management.", author: "L. Chen", date: "Jun 02, 2026", read: "6 min" },
  { cat: "Startups", title: "Where Pre-Seed Capital Is Flowing in Digital Finance", summary: "An analysis of 312 funded rounds over the past quarter.", author: "J. Park", date: "Jun 01, 2026", read: "8 min" },
  { cat: "Innovation", title: "Zero-Knowledge Proofs Move From Theory to Product", summary: "A look at the first production-grade implementations.", author: "N. Haddad", date: "May 29, 2026", read: "13 min" },
  { cat: "Education", title: "A Reader's Guide to On-Chain Analytics", summary: "Reading flows, holders, and supply curves without the noise.", author: "P. Müller", date: "May 27, 2026", read: "10 min" },
  { cat: "Global Markets", title: "Asia's Quiet Lead in Regulated Stablecoins", summary: "Three jurisdictions, three frameworks, one direction of travel.", author: "K. Sato", date: "May 25, 2026", read: "11 min" },
];

const comments = [
  { name: "Helena Marsh", time: "2 hours ago", text: "Useful framing on risk management. The distinction between model risk and market risk is too often collapsed in coverage like this." },
  { name: "Daniel Ortiz", time: "5 hours ago", text: "Would love a follow-up specifically on how institutional desks are integrating AI signals with traditional quant workflows." },
  { name: "Yuki Nakamura", time: "Yesterday", text: "The section on tokenization echoes what we're seeing at the desk level. Settlement times are the real story." },
];

const cardImages = [
  "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
  "https://images.unsplash.com/photo-1620266757065-5814239881fd?w=800",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800",
  "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800",
  "https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?w=800",
  "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800",
  "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800",
];

export default function IndexPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToArticle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("input, textarea, select, label, button[type='submit']")) return;
    e.preventDefault();
    navigate("/article");
  };

  return (
    <div
      className="min-h-screen bg-[var(--color-paper)] font-[var(--font-sans)] text-[var(--color-ink)] antialiased"
    >
      <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full bg-[var(--color-accent-red)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="relative z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur">
        <div className="border-b border-[var(--color-rule)] bg-[var(--color-cream)]">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-neutral-600 lg:px-8">
            <nav className="hidden flex-wrap gap-x-5 gap-y-1 md:flex">
              {utilityLinks.map(([label, href]) => (
                <a key={label} href="/article" className="hover:text-[var(--color-ink)] transition-colors">{label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4 ml-auto">
              <a href="/article" className="flex items-center gap-1 hover:text-[var(--color-ink)]"><Search className="h-3.5 w-3.5"/>Search</a>
              <a href="/article" className="hover:text-[var(--color-ink)]">Login</a>
              <a href="/article" className="rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[var(--color-paper)] hover:bg-[var(--color-accent-red)] transition-colors">Subscribe</a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:py-6 lg:px-8">
          <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="hidden text-xs uppercase tracking-[0.18em] text-neutral-500 md:block">
              <div>Wednesday, June 17, 2026</div>
              <div className="mt-1">Vol. XII · Issue 24</div>
            </div>
            <a href="/" className="text-center">
              <div className="font-[var(--font-serif)] text-2xl font-black leading-none tracking-tight sm:text-3xl md:text-5xl">
                Évolis <span className="italic font-light">Journal</span>
              </div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.28em] text-neutral-500 sm:text-[10px] sm:tracking-[0.32em]">
                Independent Analysis · Digital Finance · Market Research
              </div>
            </a>
            <div className="hidden justify-end text-xs uppercase tracking-[0.18em] text-neutral-500 md:flex md:flex-col md:items-end">
              <a href="/article" className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-positive)] animate-pulse" />Markets Open</a>
              <div className="mt-1">BTC 68,420 · ETH 3,812</div>
            </div>
          </div>

          <nav className="mt-5 flex flex-nowrap items-center justify-start gap-x-5 gap-y-2 overflow-x-auto border-y border-[var(--color-rule)] py-3 text-sm font-medium sm:mt-6 sm:flex-wrap sm:justify-center sm:gap-x-7">
            {mainNav.map((item) => (
              <a key={item} href="/article" className="relative shrink-0 whitespace-nowrap text-neutral-700 transition-colors hover:text-[var(--color-accent-red)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-[var(--color-accent-red)] after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100">
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-stretch border-t border-[var(--color-rule)] bg-[var(--color-ink)] text-[var(--color-paper)]">
          <div className="flex shrink-0 items-center gap-2 bg-[var(--color-accent-red)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse"/> Breaking
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="ticker-track flex w-max gap-12 whitespace-nowrap py-2 text-sm">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className="flex items-center gap-3"><span className="text-[var(--color-accent-gold)]">•</span>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div className="section-rise">
            <a href="/article" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">Digital Finance</a>
            <h1 className="mt-4 font-[var(--font-serif)] text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Understanding Artificial Intelligence in Modern Crypto Market Analysis
            </h1>
            <p className="mt-5 font-[var(--font-serif)] text-lg italic text-neutral-700 sm:text-xl md:text-2xl">
              How investors, researchers, and financial institutions are using AI and blockchain technologies to improve market analysis while managing investment risk.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-3">
                <img src={authorImage} alt="Eleanor Vance" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--color-rule)]"/>
                <div>
                  <div className="font-semibold text-[var(--color-ink)]">By <a href="/authors/eleanor-vance" className="underline-offset-2 hover:underline">Eleanor Vance</a></div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Senior Markets Editor</div>
                </div>
              </div>
              <span className="hidden h-8 w-px bg-[var(--color-rule)] md:block"/>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5"/>June 17, 2026</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/>14 min read</span>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-cream)] px-3 py-1 text-xs font-medium text-[var(--color-positive)] ring-1 ring-[var(--color-rule)]"><CheckCircle2 className="h-3.5 w-3.5"/>Editorially Reviewed</span>
            </div>
          </div>
          <figure className="section-rise">
            <img
              src={heroImage}
              alt="Financial newsroom with market dashboards and blockchain visualization"
              width={1600}
              height={1024}
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ring-1 ring-[var(--color-rule)]"
            />
            <figcaption className="mt-3 text-xs italic text-neutral-500">A research desk monitors live market data alongside on-chain analytics. Photograph for Market Frontier Journal.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-[1400px] px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="min-w-0">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--color-rule)] py-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                <Share2 className="h-4 w-4"/> Share this story
              </div>
              <div className="flex items-center gap-2">
                {[Twitter, Facebook, Linkedin, Link2, Bookmark].map((Icon, i) => (
                  <button key={i} aria-label="share" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-rule)] text-neutral-600 transition-all hover:-translate-y-0.5 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
                    <Icon className="h-4 w-4"/>
                  </button>
                ))}
              </div>
            </div>

            <Section id="intro" title="Introduction">
              <p className="drop-cap text-lg leading-[1.8] text-neutral-800">
                The financial industry is undergoing a structural transformation. What began as a niche conversation about distributed ledgers has matured into a parallel infrastructure for global markets, and artificial intelligence is rapidly becoming the lens through which that infrastructure is read. For analysts, the question is no longer whether to incorporate these tools, but how to do so without sacrificing the rigor that defines serious financial research.
              </p>
              <p>This article examines how AI-assisted analysis is being applied across digital asset markets, where it produces genuine insight, and where it remains prone to error. It is written for readers who want to understand the substance of the change rather than the noise around it.</p>
            </Section>

            <Callout title="At a glance">
              AI now influences roughly 41% of institutional trading decisions in digital assets, according to the latest quarterly survey of fifty-two desks.
            </Callout>

            <Section id="evolution" title="The Evolution of Digital Finance">
              <p>Digital finance did not arrive in a single moment. It is the cumulative result of two decades of payments innovation, programmable settlement, and falling computational costs. Each layer of the stack has matured at its own pace, and the result is an ecosystem that resembles the early internet in both its possibility and its fragmentation.</p>
              <p>Three forces dominate the current chapter: tokenization of real-world assets, programmable settlement at near-zero marginal cost, and the integration of machine learning across the analytical pipeline.</p>
            </Section>

            <PullQuote>
              The question is no longer whether AI belongs in market analysis, but how to deploy it without losing the discipline of human judgment.
            </PullQuote>

            <Section id="blockchain" title="Blockchain Technology Explained">
              <p>At its core, a blockchain is a shared record of state — a way for participants who do not trust each other to agree on the order and outcome of transactions without a central operator. The technology is older than most readers realize, and its commercial relevance has only recently caught up with its academic credibility.</p>
              <DefinitionBox term="Settlement Finality" body="The point at which a transaction can no longer be reversed. On modern Layer-1 networks, this typically occurs within seconds rather than days."/>
              <p>What matters for markets is not the cryptographic detail but the economic consequence: settlement that is faster, cheaper, and globally accessible reshapes the structure of liquidity itself.</p>
            </Section>

            <ChartCallout/>

            <Section id="ai-research" title="AI in Financial Research">
              <p>Generative and predictive models are now embedded in the daily workflow of most professional research teams. The strongest use cases are unglamorous: summarization of regulatory filings, sentiment extraction from earnings calls, and the construction of comparable datasets across heterogeneous sources.</p>
              <p>Where models fail is equally instructive. They remain poor at reasoning under regime change, and they often substitute fluency for accuracy. Serious desks treat their output as a draft to be verified, not a conclusion.</p>
            </Section>

            <RelatedReading/>

            <Section id="volatility" title="Market Volatility">
              <p>Digital asset markets remain among the most volatile asset classes in the world, and that volatility is itself becoming a subject of study. Realized volatility has compressed substantially since 2022, but tail events continue to define investor experience.</p>
              <StatGrid/>
            </Section>

            <Section id="risk" title="Risk Management">
              <p>Risk frameworks in digital assets are converging with their traditional counterparts, but with meaningful additions: smart-contract risk, custody risk, and oracle risk all demand explicit treatment. The most disciplined institutions now treat these categories with the same formality as counterparty or liquidity risk.</p>
            </Section>

            <PullQuote>
              Custody is no longer a single decision. It is a layered architecture that must be reasoned about as carefully as any portfolio construction problem.
            </PullQuote>

            <Section id="institutional" title="Institutional Adoption">
              <p>The institutional posture has moved from skepticism to measured participation. Allocations remain modest in percentage terms, but the operational integration — custodians, prime brokerage, reporting — is now mature enough to support meaningful scale.</p>
            </Section>

            <Section id="security" title="Security Considerations">
              <p>Security in digital finance is a moving target. The attack surface has shifted from exchange compromise toward smart-contract exploits and social-engineering of key personnel. Defensive posture has evolved accordingly, with multi-party computation and hardware-isolated signing now considered table stakes.</p>
            </Section>

            <Section id="future" title="Future Trends">
              <p>Three trends are likely to define the next twenty-four months: the regulated emergence of tokenized treasuries, the consolidation of AI-driven research platforms, and the gradual migration of post-trade settlement to programmable infrastructure.</p>
            </Section>

            <Section id="conclusion" title="Conclusion">
              <p>The frontier of digital finance is no longer speculative. It is operational, regulated in growing measure, and increasingly intermediated by software that reasons about its own outputs. For readers of this publication, the imperative is to engage with that change carefully — to use the tools without surrendering to them, and to maintain the analytical discipline that good financial journalism has always required.</p>
              <p className="mt-6 text-sm italic text-neutral-500">Eleanor Vance is Senior Markets Editor at Market Frontier Journal. She covers digital assets, AI, and institutional market structure.</p>
            </Section>

            <div className="mt-12 grid gap-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-cream)] p-8 sm:grid-cols-[auto_1fr]">
              <img src={authorImage} alt="Eleanor Vance" width={120} height={120} loading="lazy" className="h-24 w-24 rounded-full object-cover ring-2 ring-white"/>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">About the Author</div>
                <div className="mt-1 font-[var(--font-serif)] text-2xl font-bold">Eleanor Vance</div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">Senior Markets Editor covering digital finance, AI, and the institutional adoption of blockchain infrastructure. Previously a research director at a London-based macro fund.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <a href="/article" className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 hover:bg-white">All articles</a>
                  <a href="/article" className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 hover:bg-white">Follow newsletter</a>
                  <a href="/article" className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 hover:bg-white">Contact</a>
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-56 lg:self-start">
            <SidebarCard title="Editor's Picks" items={[
              "How institutional desks are pricing tail risk",
              "Inside the new generation of custody architectures",
              "Why disclosure standards lag the market",
            ]}/>
            <SidebarCard title="Trending Stories" items={[
              "Layer-2 economics and the new fee market",
              "AI agents in trading operations",
              "The quiet repricing of real-world assets",
              "Stablecoin frameworks across Asia",
            ]} numbered/>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-[var(--font-serif)] text-lg font-bold">Market Snapshot</h3>
                <BarChart3 className="h-4 w-4 text-neutral-400"/>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ["S&P 500", "5,842.10", "+0.42%", true],
                  ["NASDAQ", "19,210.55", "+0.78%", true],
                  ["BTC / USD", "68,420", "-1.24%", false],
                  ["ETH / USD", "3,812", "+2.10%", true],
                  ["10Y Yield", "4.18%", "-0.04", false],
                ].map(([sym, price, ch, up]) => (
                  <div key={sym as string} className="flex items-center justify-between border-b border-dashed border-[var(--color-rule)] pb-2 last:border-0">
                    <span className="font-medium">{sym}</span>
                    <span className="font-mono text-neutral-700">{price}</span>
                    <span className={`flex items-center gap-1 font-mono text-xs ${up ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`}>
                      {up ? <TrendingUp className="h-3 w-3"/> : <TrendingDown className="h-3 w-3"/>}{ch}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <SidebarCard title="Latest Research" items={["Q2 Digital Asset Flows", "Tokenization Atlas 2026", "AI Adoption in Buy-Side Research"]}/>
            <SidebarCard title="Most Read" items={[
              "The case against retail leverage",
              "What stablecoin reserves actually look like",
              "Why the ETF flows narrative is incomplete",
            ]} numbered/>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <h3 className="font-[var(--font-serif)] text-lg font-bold">Popular Topics</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Bitcoin", "Ethereum", "Tokenization", "AI Models", "Regulation", "Custody", "Stablecoins", "DeFi", "ETFs", "Fed Policy"].map(t => (
                  <a key={t} href="/article" className="rounded-full bg-[var(--color-cream)] px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors">{t}</a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <h3 className="font-[var(--font-serif)] text-lg font-bold">Upcoming Events</h3>
              <ul className="mt-4 space-y-4 text-sm">
                {[
                  ["Jun 24", "MFJ Roundtable: AI in Research", "Virtual"],
                  ["Jul 09", "Tokenization Summit", "Zurich"],
                  ["Jul 22", "Cybersecurity in Custody", "Singapore"],
                ].map(([d, t, loc]) => (
                  <li key={t} className="flex gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[var(--color-ink)] text-center text-[10px] font-bold uppercase tracking-wider text-[var(--color-paper)]">{d}</div>
                    <div className="min-w-0">
                      <div className="font-medium leading-tight">{t}</div>
                      <div className="text-xs text-neutral-500">{loc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[var(--color-ink)] p-6 text-[var(--color-paper)] shadow-sm">
              <Sparkles className="h-5 w-5 text-[var(--color-accent-gold)]"/>
              <h3 className="mt-3 font-[var(--font-serif)] text-xl font-bold">The Weekly Frontier</h3>
              <p className="mt-2 text-sm text-neutral-300">Curated research and analysis, delivered every Sunday.</p>
              <form className="mt-4 flex gap-2">
                <input type="email" placeholder="your@email.com" className="min-w-0 flex-1 rounded-md bg-white/10 px-3 py-2 text-sm placeholder:text-neutral-400 outline-none ring-1 ring-white/10 focus:ring-[var(--color-accent-gold)]"/>
                <button className="rounded-md bg-[var(--color-accent-gold)] px-3 py-2 text-sm font-semibold text-[var(--color-ink)] hover:brightness-110">Join</button>
              </form>
            </div>

            <SidebarCard title="Featured Reports" items={["State of Digital Finance 2026", "Institutional Custody Benchmark", "AI in Capital Markets"]}/>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <h3 className="font-[var(--font-serif)] text-lg font-bold">Quick Navigation</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {sections.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex items-center justify-between text-neutral-600 hover:text-[var(--color-accent-red)]">
                      <span>{s.title}</span><ChevronRight className="h-3.5 w-3.5"/>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 lg:px-8">
        <div className="flex items-end justify-between border-b border-[var(--color-rule)] pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-red)]">More from the Journal</div>
            <h2 className="mt-2 font-[var(--font-serif)] text-3xl font-bold md:text-4xl">Related Articles</h2>
          </div>
          <a href="/article" className="hidden items-center gap-1 text-sm font-medium text-neutral-600 hover:text-[var(--color-ink)] md:flex">View all <ArrowUpRight className="h-4 w-4"/></a>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedArticles.map((a, i) => <ArticleCard key={i} {...a} idx={i}/>)}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 lg:px-8">
        <div className="grid items-center gap-10 rounded-2xl border border-[var(--color-rule)] bg-gradient-to-br from-[var(--color-cream)] to-white p-10 shadow-sm lg:grid-cols-[1.1fr_1fr] lg:p-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-red)]"><Mail className="h-3.5 w-3.5"/>Subscribe</div>
            <h2 className="mt-3 font-[var(--font-serif)] text-4xl font-black leading-tight md:text-5xl">Stay Informed</h2>
            <p className="mt-4 max-w-md text-neutral-600">Receive weekly research, financial technology updates, and educational articles — written for serious readers.</p>
          </div>
          <form className="space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Email Address
              <input type="email" placeholder="your@email.com" className="mt-2 w-full rounded-lg border border-[var(--color-rule)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"/>
            </label>
            <fieldset className="space-y-2">
              <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Interests</legend>
              <div className="flex flex-wrap gap-2">
                {["Digital Assets", "AI", "Markets", "Research", "Regulation"].map(t => (
                  <label key={t} className="cursor-pointer rounded-full border border-[var(--color-rule)] bg-white px-3 py-1.5 text-xs has-[:checked]:border-[var(--color-ink)] has-[:checked]:bg-[var(--color-ink)] has-[:checked]:text-[var(--color-paper)]">
                    <input type="checkbox" className="sr-only"/>{t}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="w-full rounded-lg bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-paper)] transition-all hover:bg-[var(--color-accent-red)] hover:shadow-lg">Subscribe to the Journal</button>
            <p className="text-xs text-neutral-500">By subscribing you agree to our <a href="/privacy" className="underline">privacy policy</a>. Unsubscribe at any time.</p>
          </form>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[900px] px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4">
          <h2 className="font-[var(--font-serif)] text-3xl font-bold">Reader Comments <span className="ml-2 text-base font-normal text-neutral-500">({comments.length})</span></h2>
          <a href="/community" className="text-sm text-neutral-500 hover:text-[var(--color-ink)]">Community guidelines</a>
        </div>

        <form className="mt-6 rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
          <textarea rows={3} placeholder="Add to the discussion…" className="w-full resize-none rounded-lg border border-[var(--color-rule)] bg-[var(--color-cream)] p-3 text-sm outline-none focus:border-[var(--color-ink)]"/>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Comments are moderated.</span>
            <button className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-sm font-semibold text-[var(--color-paper)] hover:bg-[var(--color-accent-red)]">Post Comment</button>
          </div>
        </form>

        <ul className="mt-8 space-y-6">
          {comments.map((c) => (
            <li key={c.name} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-cream)] text-sm font-semibold ring-1 ring-[var(--color-rule)]">
                {c.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="min-w-0 rounded-2xl border border-[var(--color-rule)] bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-xs text-neutral-500">{c.time}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{c.text}</p>
                <div className="mt-3 flex gap-4 text-xs text-neutral-500">
                  <button className="flex items-center gap-1 hover:text-[var(--color-accent-red)]"><Heart className="h-3.5 w-3.5"/>Like</button>
                  <button className="flex items-center gap-1 hover:text-[var(--color-ink)]"><MessageCircle className="h-3.5 w-3.5"/>Reply</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-24 max-w-[900px] px-4 lg:px-8">
        <h2 className="font-[var(--font-serif)] text-3xl font-bold">Frequently Asked</h2>
        <div className="mt-6 divide-y divide-[var(--color-rule)] rounded-2xl border border-[var(--color-rule)] bg-white shadow-sm">
          {[
            ["What is Market Frontier Journal?", "An independent publication covering digital finance, AI, and the institutional infrastructure behind modern markets."],
            ["Who writes for the Journal?", "A small editorial team of working analysts and former buy-side professionals, supported by contributing researchers."],
            ["How is the Journal funded?", "Through reader subscriptions, syndicated research, and a small number of clearly disclosed sponsorships."],
          ].map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
                {q}<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180"/>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="mt-24 border-t border-[var(--color-rule)] bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="font-[var(--font-serif)] text-2xl font-black">Évolis <span className="italic font-light">Journal</span></div>
              <p className="mt-3 max-w-xs text-sm text-neutral-400">Independent analysis on digital finance, blockchain, and AI in capital markets.</p>
              <div className="mt-6 flex gap-3">
                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/15 hover:bg-white/10"><Icon className="h-4 w-4"/></a>
                ))}
              </div>
            </div>
            <FooterCol title="Markets" links={["Equities", "Crypto", "Fixed Income", "FX", "Commodities", "Derivatives", "Indices", "Options Desk"]} base="/markets"/>
            <FooterCol title="Technology" links={["AI", "Blockchain", "Fintech", "Cybersecurity", "Infrastructure", "Quantum Computing", "Web3 stack", "DeFi protocols"]} base="/technology"/>
            <FooterCol title="Research" links={["Reports", "Data", "Methodology", "Archive", "Custom Research", "Quarterly Outlook", "Whitepapers", "On-Chain Metrics"]} base="/research"/>
            <FooterCol title="Company" links={["About", "Newsroom", "Careers", "Contact", "Press", "Advisors", "Sponsorships", "Annual Reports"]} base="/company"/>
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm md:grid-cols-3">
            <FooterCol title="Legal" links={["Privacy", "Terms", "Editorial Policy", "Accessibility", "Sitemap", "Cookie Preferences", "Disclaimers", "Affiliate Disclosures"]} base="/legal" inline/>
            <FooterCol title="Support" links={["Help Center", "Subscriptions", "Account", "Corporate", "Feedback", "API Access", "Contact Support", "Status Board"]} base="/support" inline/>
            <FooterCol title="More" links={["Newsletter", "Archives", "Contact", "Careers", "Events", "Podcast Series", "Video Library", "Merchandise Store"]} base="/" inline/>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row md:items-center">
            <div>© 2026 Évolis Journal. All rights reserved.</div>
            <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5"/> Edition: Global · English</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5"/> Editorial standards verified</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section-rise mt-12 first:mt-0 scroll-mt-44">
      <h2 className="font-[var(--font-serif)] text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <div className="prose-article mt-5 space-y-5 text-[17px] leading-[1.8] text-neutral-800 [&_p]:tracking-[-0.005em]">
        {children}
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-12 border-y border-[var(--color-rule)] py-8 text-center">
      <p className="mx-auto max-w-2xl font-[var(--font-serif)] text-2xl italic leading-snug text-[var(--color-ink)] md:text-3xl">
        “{children}”
      </p>
    </blockquote>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-10 rounded-2xl border-l-4 border-[var(--color-accent-red)] bg-[var(--color-cream)] p-6">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">{title}</div>
      <p className="mt-2 font-[var(--font-serif)] text-xl leading-snug text-[var(--color-ink)]">{children}</p>
    </aside>
  );
}

function DefinitionBox({ term, body }: { term: string; body: string }) {
  return (
    <div className="my-8 rounded-xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500"><BookOpen className="h-3.5 w-3.5"/>Definition</div>
      <div className="mt-2 font-[var(--font-serif)] text-lg font-bold">{term}</div>
      <p className="mt-1 text-sm leading-relaxed text-neutral-700">{body}</p>
      <a href="/glossary" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent-red)]">Open glossary <ChevronRight className="h-3 w-3"/></a>
    </div>
  );
}

function ChartCallout() {
  const bars = [38, 52, 47, 64, 58, 72, 69, 81, 76, 88, 92, 84];
  return (
    <figure className="my-10 rounded-2xl border border-[var(--color-rule)] bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Figure 1 · On-chain settlement volume</div>
          <div className="font-[var(--font-serif)] text-lg font-bold">Tokenized treasury settlement, 12-month trailing</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-[var(--color-positive)]">+218%</div>
          <div className="text-xs text-neutral-500">YoY change</div>
        </div>
      </div>
      <div className="mt-6 flex h-32 items-end gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[var(--color-ink)] to-neutral-500 transition-all hover:from-[var(--color-accent-red)]" style={{ height: `${h}%` }}/>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-neutral-500">Source: MFJ Research. Indexed values, illustrative.</figcaption>
    </figure>
  );
}

function StatGrid() {
  const stats = [
    ["41%", "of desks integrate AI signals"],
    ["$2.4T", "tokenized assets under custody"],
    ["12s", "median settlement on L1"],
    ["3.8x", "research throughput vs. 2022"],
  ];
  return (
    <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(([n, l]) => (
        <div key={l} className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 text-center shadow-sm">
          <div className="font-[var(--font-serif)] text-3xl font-black text-[var(--color-ink)]">{n}</div>
          <div className="mt-1 text-xs leading-tight text-neutral-600">{l}</div>
        </div>
      ))}
    </div>
  );
}

function RelatedReading() {
  return (
    <aside className="my-10 rounded-2xl bg-[var(--color-cream)] p-6">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">Continue Reading</div>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          ["A primer on on-chain analytics", "/education/on-chain"],
          ["How custody architecture has evolved", "/research/custody"],
          ["The state of stablecoin reserves", "/markets/stablecoins"],
          ["AI agents on the buy-side desk", "/ai/agents"],
        ].map(([t, u]) => (
          <li key={t}><a href="/article" className="group flex items-start justify-between gap-2 rounded-lg bg-white p-3 ring-1 ring-[var(--color-rule)] hover:ring-[var(--color-ink)]">
            <span className="text-sm font-medium">{t}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
          </a></li>
        ))}
      </ul>
    </aside>
  );
}

function SidebarCard({ title, items, numbered }: { title: string; items: string[]; numbered?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
      <h3 className="font-[var(--font-serif)] text-lg font-bold">{title}</h3>
      <ul className="mt-3 space-y-3 text-sm">
        {items.map((t, i) => (
          <li key={t} className="flex gap-3 border-b border-dashed border-[var(--color-rule)] pb-3 last:border-0 last:pb-0">
            {numbered && <span className="font-[var(--font-serif)] text-2xl font-black leading-none text-[var(--color-accent-red)]">{String(i+1).padStart(2,"0")}</span>}
            <a href="/article" className="leading-snug text-neutral-700 hover:text-[var(--color-ink)]">{t}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleCard({ cat, title, summary, author, date, read, idx }: { cat: string; title: string; summary: string; author: string; date: string; read: string; idx: number }) {
  return (
    <a href="/article" className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-cream)] ring-1 ring-[var(--color-rule)]">
        <img src={cardImages[idx]} alt="" loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
      </div>
      <div className="mt-4">
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-red)]">{cat}</div>
        <h3 className="mt-2 font-[var(--font-serif)] text-xl font-bold leading-snug transition-colors group-hover:text-[var(--color-accent-red)]">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{summary}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
          <span className="font-medium text-neutral-700">{author}</span><span>·</span><span>{date}</span><span>·</span><span>{read}</span>
        </div>
      </div>
    </a>
  );
}

function FooterCol({ title, links, base, inline }: { title: string; links: string[]; base: string; inline?: boolean }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-gold)]">{title}</div>
      <ul className={inline ? "mt-3 flex flex-wrap gap-x-4 gap-y-2" : "mt-4 space-y-2 text-sm"}>
        {links.map(l => (
          <li key={l}><a href="/article" className="text-neutral-300 hover:text-[var(--color-paper)]">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
