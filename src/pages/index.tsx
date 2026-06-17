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
  ["Marchés", "/markets"], ["Technologie", "/technology"], ["Blockchain", "/blockchain"],
  ["IA", "/ai"], ["Économie", "/economy"], ["Recherche", "/research"],
  ["Opinion", "/opinion"], ["Newsletter", "/newsletter"], ["Vidéos", "/videos"],
  ["Podcasts", "/podcasts"], ["Événements", "/events"], ["À propos", "/about"], ["Contact", "/contact"],
  ["Carrières", "/careers"], ["Salle de presse", "/press"], ["Politique globale", "/policy"], ["Terminaux de données", "/data"],
];

const mainNav = [
  "Dernier", "À la une", "Analyses", "Actifs numériques", "Fintech",
  "Cybersécurité", "Marchés mondiaux", "Startups", "Innovation", "Éducation",
  "Pouls DeFi", "Tokenomics", "Bureau de régulation", "Pôle RWA", "Capital-risque",
];

const tickerItems = [
  "L'adoption institutionnelle continue de s'étendre",
  "Les outils d'IA redéfinissent la recherche financière",
  "La régulation des actifs numériques évolue mondialement",
  "L'innovation blockchain s'accélère",
  "L'investissement dans la fintech reste soutenu",
];

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "evolution", title: "L'évolution de la finance numérique" },
  { id: "blockchain", title: "La technologie blockchain expliquée" },
  { id: "ai-research", title: "L'IA dans la recherche financière" },
  { id: "volatility", title: "Volatilité du marché" },
  { id: "risk", title: "Gestion des risques" },
  { id: "institutional", title: "Adoption institutionnelle" },
  { id: "security", title: "Considérations de sécurité" },
  { id: "future", title: "Tendances futures" },
  { id: "conclusion", title: "Conclusion" },
];

const relatedArticles = [
  { cat: "Blockchain", title: "Réseaux Layer-2 et nouveau coût de règlement", summary: "Les gains de débit remodèlent les marchés de frais à travers l'écosystème.", author: "M. Tanaka", date: "12 juin 2026", read: "9 min" },
  { cat: "IA", title: "Où les modèles génératifs surpassent les analystes", summary: "Un regard mesuré sur les gains de productivité et les zones d'ombre subsistantes.", author: "R. Patel", date: "10 juin 2026", read: "11 min" },
  { cat: "Marchés", title: "Pourquoi la liquidité s'est déplacée on-chain au T2", summary: "Les bureaux de négociation décrivent un changement structurel de plateforme.", author: "S. Lindqvist", date: "09 juin 2026", read: "8 min" },
  { cat: "Fintech", title: "La finance intégrée s'invite dans les logiciels industriels", summary: "Les plateformes B2B deviennent discrètement la prochaine couche de distribution.", author: "D. Okafor", date: "08 juin 2026", read: "7 min" },
  { cat: "Recherche", title: "Ce que 14 banques centrales ont dit sur la tokenisation", summary: "Une lecture comparative des récents rapports des autorités monétaires.", author: "E. Rossi", date: "07 juin 2026", read: "12 min" },
  { cat: "Cybersécurité", title: "Portefeuilles matériels, MPC et nouvelle gestion de garde", summary: "La garde n'est plus une décision unique mais une architecture multicouche.", author: "A. Volkov", date: "05 juin 2026", read: "10 min" },
  { cat: "Économie", title: "La réévaluation discrète des actifs réels", summary: "Les bons du Trésor tokenisés révèlent une structure de marché mature.", author: "C. Bianchi", date: "04 juin 2026", read: "9 min" },
  { cat: "Opinion", title: "Éditorial : Les normes de divulgation doivent rattraper leur retard", summary: "Un appel à des rapports plus clairs dans la gestion d'actifs algorithmique.", author: "L. Chen", date: "02 juin 2026", read: "6 min" },
  { cat: "Startups", title: "Où va le capital pré-amorçage dans la finance numérique", summary: "Une analyse de 312 tours de table financés au cours du dernier trimestre.", author: "J. Park", date: "01 juin 2026", read: "8 min" },
  { cat: "Innovation", title: "Les preuves à divulgation nulle passent de la théorie au produit", summary: "Un aperçu des premières implémentations de niveau production.", author: "N. Haddad", date: "29 mai 2026", read: "13 min" },
  { cat: "Éducation", title: "Guide de l'analyse on-chain pour le lecteur", summary: "Comprendre les flux, les détenteurs et les courbes d'offre sans bruit parasite.", author: "P. Müller", date: "27 mai 2026", read: "10 min" },
  { cat: "Marchés mondiaux", title: "L'avance discrète de l'Asie sur les stablecoins régulés", summary: "Trois juridictions, trois cadres, une seule direction commune.", author: "K. Sato", date: "25 mai 2026", read: "11 min" },
];

const comments = [
  { name: "Helena Marsh", time: "Il y a 2 heures", text: "Cadrage utile sur la gestion des risques. La distinction entre le risque de modèle et le risque de marché est trop souvent éludée dans les reportages de ce genre." },
  { name: "Daniel Ortiz", time: "Il y a 5 heures", text: "J'aimerais beaucoup un suivi sur la manière dont les pupitres institutionnels intègrent les signaux de l'IA avec les flux quantitatifs traditionnels." },
  { name: "Yuki Nakamura", time: "Hier", text: "La section sur la tokenisation fait écho à ce que nous voyons sur le terrain. Les délais de règlement sont la vraie nouveauté." },
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
              <a href="/article" className="flex items-center gap-1 hover:text-[var(--color-ink)]"><Search className="h-3.5 w-3.5"/>Rechercher</a>
              <a href="/article" className="hover:text-[var(--color-ink)]">Connexion</a>
              <a href="/article" className="rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[var(--color-paper)] hover:bg-[var(--color-accent-red)] transition-colors">S'abonner</a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:py-6 lg:px-8">
          <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="hidden text-xs uppercase tracking-[0.18em] text-neutral-500 md:block">
              <div>Mercredi 17 juin 2026</div>
              <div className="mt-1">Vol. XII · Numéro 24</div>
            </div>
            <a href="/" className="text-center">
              <div className="font-[var(--font-serif)] text-2xl font-black leading-none tracking-tight sm:text-3xl md:text-5xl">
                Évolis <span className="italic font-light">Journal</span>
              </div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.28em] text-neutral-500 sm:text-[10px] sm:tracking-[0.32em]">
                Analyses indépendantes · Finance numérique · Recherche sur les marchés
              </div>
            </a>
            <div className="hidden justify-end text-xs uppercase tracking-[0.18em] text-neutral-500 md:flex md:flex-col md:items-end">
              <a href="/article" className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-positive)] animate-pulse" />Marchés Ouverts</a>
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
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse"/> Flash
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
            <a href="/article" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">Finance numérique</a>
            <h1 className="mt-4 font-[var(--font-serif)] text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Comprendre l'intelligence artificielle dans l'analyse moderne du marché des crypto-actifs
            </h1>
            <p className="mt-5 font-[var(--font-serif)] text-lg italic text-neutral-700 sm:text-xl md:text-2xl">
              Comment les investisseurs, les chercheurs et les institutions financières utilisent l'IA et la blockchain pour améliorer l'analyse du marché tout en gérant le risque.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-3">
                <img src={authorImage} alt="Eleanor Vance" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--color-rule)]"/>
                <div>
                  <div className="font-semibold text-[var(--color-ink)]">Par <a href="/authors/eleanor-vance" className="underline-offset-2 hover:underline">Eleanor Vance</a></div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Rédactrice en chef des marchés</div>
                </div>
              </div>
              <span className="hidden h-8 w-px bg-[var(--color-rule)] md:block"/>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5"/>17 juin 2026</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/>14 min de lecture</span>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-cream)] px-3 py-1 text-xs font-medium text-[var(--color-positive)] ring-1 ring-[var(--color-rule)]"><CheckCircle2 className="h-3.5 w-3.5"/>Revue éditoriale validée</span>
            </div>
          </div>
          <figure className="section-rise">
            <img
              src={heroImage}
              alt="Salle de rédaction financière avec tableaux de bord et visualisations blockchain"
              width={1600}
              height={1024}
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ring-1 ring-[var(--color-rule)]"
            />
            <figcaption className="mt-3 text-xs italic text-neutral-500">Un bureau de recherche surveille les données du marché en direct ainsi que les analyses on-chain. Photographie pour Évolis Journal.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-[1400px] px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="min-w-0">
            <div className="mb-8 flex items-center justify-between border-y border-[var(--color-rule)] py-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                <Share2 className="h-4 w-4"/> Partager cette histoire
              </div>
              <div className="flex items-center gap-2">
                {[Twitter, Facebook, Linkedin, Link2, Bookmark].map((Icon, i) => (
                  <button key={i} aria-label="partager" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-rule)] text-neutral-600 transition-all hover:-translate-y-0.5 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
                    <Icon className="h-4 w-4"/>
                  </button>
                ))}
              </div>
            </div>

            <Section id="intro" title="Introduction">
              <p className="drop-cap text-lg leading-[1.8] text-neutral-800">
                Le secteur financier traverse une transformation structurelle. Ce qui a commencé comme une discussion de niche sur les registres distribués est devenu une infrastructure parallèle pour les marchés mondiaux, et l'intelligence artificielle devient rapidement la grille de lecture de cette infrastructure. Pour les analystes, la question n'est plus d'intégrer ou non ces outils, mais comment le faire sans sacrifier la rigueur de la recherche financière.
              </p>
              <p>Cet article examine comment l'analyse assistée par l'IA est appliquée sur les marchés d'actifs numériques, là où elle produit de réelles perspectives et là où elle reste sujette aux erreurs. Il est rédigé pour les lecteurs désireux de comprendre la substance du changement plutôt que le bruit qui l'entoure.</p>
            </Section>

            <Callout title="En un coup d'œil">
              L'IA influence désormais environ 41 % des décisions de négociation institutionnelles sur les actifs numériques, selon la dernière enquête trimestrielle menée auprès de cinquante-deux pupitres.
            </Callout>

            <Section id="evolution" title="L'évolution de la finance numérique">
              <p>La finance numérique n'est pas apparue en un instant. Elle est le résultat cumulé de deux décennies d'innovation en matière de paiements, de règlements programmables et de baisse des coûts informatiques. Chaque couche s'est développée à son propre rythme, créant un écosystème qui rappelle le début de l'internet tant par ses possibilités que par sa fragmentation.</p>
              <p>Trois forces dominent la période actuelle : la tokenisation d'actifs réels, le règlement programmable à coût marginal quasi nul et l'intégration du machine learning tout au long du pipeline analytique.</p>
            </Section>

            <PullQuote>
              La question n'est plus de savoir si l'IA a sa place dans l'analyse de marché, mais comment la déployer sans perdre la discipline du jugement humain.
            </PullQuote>

            <Section id="blockchain" title="La technologie blockchain expliquée">
              <p>À la base, une blockchain est un registre d'état partagé — un moyen pour des participants qui ne se font pas confiance de s'accorder sur l'ordre et l'issue de transactions sans opérateur central. Cette technologie est plus ancienne qu'on ne le pense, et sa pertinence commerciale n'a que récemment rattrapé sa crédibilité académique.</p>
              <DefinitionBox term="Finalité du règlement" body="Le point à partir duquel une transaction ne peut plus être annulée. Sur les réseaux de niveau 1 modernes, cela se produit généralement en quelques secondes plutôt qu'en jours."/>
              <p>Ce qui compte pour les marchés n'est pas le détail cryptographique mais les conséquences économiques : un règlement plus rapide, moins cher et accessible mondialement redéfinit la structure même de la liquidité.</p>
            </Section>

            <ChartCallout/>

            <Section id="ai-research" title="L'IA dans la recherche financière">
              <p>Les modèles génératifs et prédictifs font désormais partie intégrante du travail quotidien de la plupart des équipes de recherche professionnelles. Les cas d'usage les plus solides sont parfois les moins spectaculaires : résumé des dépôts réglementaires, analyse de sentiment lors des conférences téléphoniques et création de bases de données comparables à partir de sources hétérogènes.</p>
              <p>Les faiblesses des modèles sont tout aussi instructives. Ils restent peu performants pour raisonner face à des changements de régime et remplacent souvent la précision par la fluidité d'expression. Les équipes sérieuses traitent leurs résultats comme des ébauches à vérifier, non comme des vérités absolues.</p>
            </Section>

            <RelatedReading/>

            <Section id="volatility" title="Volatilité du marché">
              <p>Les marchés d'actifs numériques restent parmi les plus volatils au monde, et cette volatilité devient elle-même un sujet d'étude. La volatilité réalisée s'est nettement tassée depuis 2022, mais les événements extrêmes continuent de définir l'expérience des investisseurs.</p>
              <StatGrid/>
            </Section>

            <Section id="risk" title="Gestion des risques">
              <p>Les cadres de gestion du risque pour les actifs numériques convergent avec leurs homologues traditionnels, avec des ajouts de taille : le risque de contrat intelligent, le risque de garde et le risque d'oracle exigent un traitement explicite. Les institutions les plus rigoureuses traitent désormais ces catégories avec la même formalité que les risques de contrepartie ou de liquidité.</p>
            </Section>

            <PullQuote>
              La garde n'est plus une décision unique. C'est une architecture multicouche qui doit être pensée avec autant de soin que la construction d'un portefeuille.
            </PullQuote>

            <Section id="institutional" title="Adoption institutionnelle">
              <p>La posture des institutions est passée du scepticisme à une participation mesurée. Les allocations restent modestes en pourcentage, mais l'intégration opérationnelle — dépositaires, courtage principal, rapports — est désormais mûre pour soutenir une échelle significative.</p>
            </Section>

            <Section id="security" title="Considérations de sécurité">
              <p>La sécurité dans la finance numérique est une cible mouvante. La surface d'attaque s'est déplacée des plateformes d'échange vers les failles de contrats intelligents et l'ingénierie sociale visant le personnel clé. La posture défensive a évolué en conséquence, faisant du calcul multipartite (MPC) et des signatures isolées matériellement des standards incontournables.</p>
            </Section>

            <Section id="future" title="Tendances futures">
              <p>Trois tendances majeures devraient définir les vingt-quatre prochains mois : l'émergence réglementée des bons du Trésor tokenisés, la consolidation des plateformes de recherche basées sur l'IA, et la migration progressive des règlements post-marché vers des infrastructures programmables.</p>
            </Section>

            <Section id="conclusion" title="Conclusion">
              <p>La frontière de la finance numérique n'est plus spéculative. Elle est opérationnelle, de plus en plus régulée, et gérée en grande partie par des logiciels qui optimisent leurs propres résultats. Pour les lecteurs de cette publication, l'impératif est d'aborder ce changement avec rigueur — d'utiliser ces outils sans s'y abandonner, et de conserver la discipline analytique que le journalisme financier de qualité a toujours exigée.</p>
              <p className="mt-6 text-sm italic text-neutral-500">Eleanor Vance est rédactrice en chef des marchés chez Évolis Journal. Elle couvre les actifs numériques, l'IA et les structures de marché institutionnelles.</p>
            </Section>

            <div className="mt-12 grid gap-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-cream)] p-8 sm:grid-cols-[auto_1fr]">
              <img src={authorImage} alt="Eleanor Vance" width={120} height={120} loading="lazy" className="h-24 w-24 rounded-full object-cover ring-2 ring-white"/>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">À propos de l'auteure</div>
                <div className="mt-1 font-[var(--font-serif)] text-2xl font-bold">Eleanor Vance</div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">Rédactrice en chef des marchés couvrant la finance numérique, l'IA et l'adoption institutionnelle des infrastructures blockchain. Anciennement directrice de recherche pour un fonds macroéconomique basé à Londres.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <a href="/article" className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 hover:bg-white">Tous les articles</a>
                  <a href="/article" className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 hover:bg-white">Suivre la newsletter</a>
                  <a href="/article" className="rounded-full border border-[var(--color-rule)] px-3 py-1.5 hover:bg-white">Contact</a>
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-56 lg:self-start">
            <SidebarCard title="Choix de la rédaction" items={[
              "Comment les bureaux institutionnels évaluent le risque extrême",
              "Au cœur de la nouvelle génération d'architectures de garde",
              "Pourquoi les normes de divulgation sont à la traîne sur le marché",
            ]}/>
            <SidebarCard title="Articles populaires" items={[
              "L'économie du Layer-2 et le nouveau marché des frais",
              "Les agents d'IA dans les opérations de trading",
              "La réévaluation discrète des actifs du monde réel (RWA)",
              "Les cadres réglementaires des stablecoins en Asie",
            ]} numbered/>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-[var(--font-serif)] text-lg font-bold">Aperçu du marché</h3>
                <BarChart3 className="h-4 w-4 text-neutral-400"/>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ["S&P 500", "5 842.10", "+0.42%", true],
                  ["NASDAQ", "19 210.55", "+0.78%", true],
                  ["BTC / USD", "68 420", "-1.24%", false],
                  ["ETH / USD", "3 812", "+2.10%", true],
                  ["Taux 10 ans", "4.18%", "-0.04", false],
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

            <SidebarCard title="Dernières recherches" items={["Flux d'actifs numériques du T2", "Atlas de la Tokenisation 2026", "Adoption de l'IA dans la recherche acheteurs"]}/>
            <SidebarCard title="Les plus lus" items={[
              "Le dossier contre l'effet de levier pour les particuliers",
              "À quoi ressemblent réellement les réserves de stablecoins",
              "Pourquoi le récit des flux d'ETF est incomplet",
            ]} numbered/>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <h3 className="font-[var(--font-serif)] text-lg font-bold">Sujets populaires</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Bitcoin", "Ethereum", "Tokenisation", "Modèles d'IA", "Régulation", "Garde", "Stablecoins", "DeFi", "ETF", "Politique de la Fed"].map(t => (
                  <a key={t} href="/article" className="rounded-full bg-[var(--color-cream)] px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors">{t}</a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <h3 className="font-[var(--font-serif)] text-lg font-bold">Événements à venir</h3>
              <ul className="mt-4 space-y-4 text-sm">
                {[
                  ["24 Juin", "Table ronde MFJ : L'IA dans la recherche", "Virtuel"],
                  ["09 Juil", "Sommet de la Tokenisation", "Zurich"],
                  ["22 Juil", "Cybersécurité de la garde", "Singapour"],
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
              <h3 className="mt-3 font-[var(--font-serif)] text-xl font-bold">La Frontière Hebdomadaire</h3>
              <p className="mt-2 text-sm text-neutral-300">Recherches et analyses sélectionnées, livrées chaque dimanche.</p>
              <form className="mt-4 flex gap-2">
                <input type="email" placeholder="votre@email.com" className="min-w-0 flex-1 rounded-md bg-white/10 px-3 py-2 text-sm placeholder:text-neutral-400 outline-none ring-1 ring-white/10 focus:ring-[var(--color-accent-gold)]"/>
                <button className="rounded-md bg-[var(--color-accent-gold)] px-3 py-2 text-sm font-semibold text-[var(--color-ink)] hover:brightness-110">Rejoindre</button>
              </form>
            </div>

            <SidebarCard title="Rapports vedettes" items={["État de la finance numérique 2026", "Indice de référence de la garde institutionnelle", "L'IA sur les marchés de capitaux"]}/>

            <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
              <h3 className="font-[var(--font-serif)] text-lg font-bold">Navigation rapide</h3>
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
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-red)]">Plus du Journal</div>
            <h2 className="mt-2 font-[var(--font-serif)] text-3xl font-bold md:text-4xl">Articles associés</h2>
          </div>
          <a href="/article" className="hidden items-center gap-1 text-sm font-medium text-neutral-600 hover:text-[var(--color-ink)] md:flex">Tout voir <ArrowUpRight className="h-4 w-4"/></a>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedArticles.map((a, i) => <ArticleCard key={i} {...a} idx={i}/>)}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[1400px] px-4 lg:px-8">
        <div className="grid items-center gap-10 rounded-2xl border border-[var(--color-rule)] bg-gradient-to-br from-[var(--color-cream)] to-white p-10 shadow-sm lg:grid-cols-[1.1fr_1fr] lg:p-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent-red)]"><Mail className="h-3.5 w-3.5"/>S'abonner</div>
            <h2 className="mt-3 font-[var(--font-serif)] text-4xl font-black leading-tight md:text-5xl">Restez informé</h2>
            <p className="mt-4 max-w-md text-neutral-600">Recevez chaque semaine des recherches, des actualités technologiques financières et des articles éducatifs — conçus pour les lecteurs sérieux.</p>
          </div>
          <form className="space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Adresse e-mail
              <input type="email" placeholder="votre@email.com" className="mt-2 w-full rounded-lg border border-[var(--color-rule)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"/>
            </label>
            <fieldset className="space-y-2">
              <legend className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Intérêts</legend>
              <div className="flex flex-wrap gap-2">
                {["Actifs numériques", "IA", "Marchés", "Recherche", "Régulation"].map(t => (
                  <label key={t} className="cursor-pointer rounded-full border border-[var(--color-rule)] bg-white px-3 py-1.5 text-xs has-[:checked]:border-[var(--color-ink)] has-[:checked]:bg-[var(--color-ink)] has-[:checked]:text-[var(--color-paper)]">
                    <input type="checkbox" className="sr-only"/>{t}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="w-full rounded-lg bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-paper)] transition-all hover:bg-[var(--color-accent-red)] hover:shadow-lg">S'abonner au Journal</button>
            <p className="text-xs text-neutral-500">En vous abonnant, vous acceptez notre <a href="/privacy" className="underline">politique de confidentialité</a>. Désabonnez-vous à tout moment.</p>
          </form>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-[900px] px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4">
          <h2 className="font-[var(--font-serif)] text-3xl font-bold">Commentaires des lecteurs <span className="ml-2 text-base font-normal text-neutral-500">({comments.length})</span></h2>
          <a href="/community" className="text-sm text-neutral-500 hover:text-[var(--color-ink)]">Directives de la communauté</a>
        </div>

        <form className="mt-6 rounded-2xl border border-[var(--color-rule)] bg-white p-5 shadow-sm">
          <textarea rows={3} placeholder="Ajouter à la discussion…" className="w-full resize-none rounded-lg border border-[var(--color-rule)] bg-[var(--color-cream)] p-3 text-sm outline-none focus:border-[var(--color-ink)]"/>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Les commentaires sont modérés.</span>
            <button className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-sm font-semibold text-[var(--color-paper)] hover:bg-[var(--color-accent-red)]">Publier le commentaire</button>
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
                  <button className="flex items-center gap-1 hover:text-[var(--color-accent-red)]"><Heart className="h-3.5 w-3.5"/>J'aime</button>
                  <button className="flex items-center gap-1 hover:text-[var(--color-ink)]"><MessageCircle className="h-3.5 w-3.5"/>Répondre</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-24 max-w-[900px] px-4 lg:px-8">
        <h2 className="font-[var(--font-serif)] text-3xl font-bold">Questions fréquentes</h2>
        <div className="mt-6 divide-y divide-[var(--color-rule)] rounded-2xl border border-[var(--color-rule)] bg-white shadow-sm">
          {[
            ["Qu'est-ce que Évolis Journal ?", "Une publication indépendante couvrant la finance numérique, l'IA et l'infrastructure institutionnelle des marchés modernes."],
            ["Qui écrit pour le Journal ?", "Une petite équipe éditoriale d'analystes professionnels et d'anciens experts de la finance, appuyée par des chercheurs partenaires."],
            ["Comment le Journal est-il financé ?", "Grâce aux abonnements des lecteurs, à la vente d'études de marché et à quelques partenariats explicitement mentionnés."],
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
              <p className="mt-3 max-w-xs text-sm text-neutral-400">Analyses indépendantes sur la finance numérique, la blockchain et l'IA dans les marchés financiers.</p>
              <div className="mt-6 flex gap-3">
                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/15 hover:bg-white/10"><Icon className="h-4 w-4"/></a>
                ))}
              </div>
            </div>
            <FooterCol title="Marchés" links={["Actions", "Crypto", "Titres fixes", "Forex", "Matières premières", "Produits dérivés", "Indices", "Options"]} base="/markets"/>
            <FooterCol title="Technologie" links={["IA", "Blockchain", "Fintech", "Cybersécurité", "Infrastructure", "Calcul quantique", "Web3", "Protocoles DeFi"]} base="/technology"/>
            <FooterCol title="Recherche" links={["Rapports", "Données", "Méthodologie", "Archives", "Recherche personnalisée", "Perspectives trimestrielles", "Livres blancs", "Mesures on-chain"]} base="/research"/>
            <FooterCol title="Entreprise" links={["À propos", "Salle de presse", "Carrières", "Contact", "Presse", "Conseillers", "Partenariats", "Rapports annuels"]} base="/company"/>
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm md:grid-cols-3">
            <FooterCol title="Juridique" links={["Confidentialité", "Conditions", "Politique éditoriale", "Accessibilité", "Plan du site", "Préférences de cookies", "Clauses de non-responsabilité", "Divulgations d'affiliation"]} base="/legal" inline/>
            <FooterCol title="Support" links={["Centre d'aide", "Abonnements", "Compte", "Entreprise", "Commentaires", "Accès API", "Contacter le support", "État des services"]} base="/support" inline/>
            <FooterCol title="Plus" links={["Newsletter", "Archives", "Contact", "Carrières", "Événements", "Séries de podcasts", "Vidéothèque", "Boutique"]} base="/" inline/>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row md:items-center">
            <div>© 2026 Évolis Journal. Tous droits réservés.</div>
            <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5"/> Édition: Globale · Français</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5"/> Normes éditoriales vérifiées</div>
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
        « {children} »
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
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500"><BookOpen className="h-3.5 w-3.5"/>Définition</div>
      <div className="mt-2 font-[var(--font-serif)] text-lg font-bold">{term}</div>
      <p className="mt-1 text-sm leading-relaxed text-neutral-700">{body}</p>
      <a href="/glossary" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent-red)]">Ouvrir le lexique <ChevronRight className="h-3 w-3"/></a>
    </div>
  );
}

function ChartCallout() {
  const bars = [38, 52, 47, 64, 58, 72, 69, 81, 76, 88, 92, 84];
  return (
    <figure className="my-10 rounded-2xl border border-[var(--color-rule)] bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Figure 1 · Volume de règlement on-chain</div>
          <div className="font-[var(--font-serif)] text-lg font-bold">Règlement des bons du Trésor tokenisés, sur 12 mois</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-[var(--color-positive)]">+218%</div>
          <div className="text-xs text-neutral-500">Variation annuelle</div>
        </div>
      </div>
      <div className="mt-6 flex h-32 items-end gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[var(--color-ink)] to-neutral-500 transition-all hover:from-[var(--color-accent-red)]" style={{ height: `${h}%` }}/>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-neutral-500">Source : Recherche MFJ. Valeurs indexées, illustratif.</figcaption>
    </figure>
  );
}

function StatGrid() {
  const stats = [
    ["41%", "des bureaux intègrent les signaux de l'IA"],
    ["2.4T$", "d'actifs tokenisés sous garde"],
    ["12s", "temps de règlement médian sur L1"],
    ["3.8x", "rendement de recherche vs. 2022"],
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
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">Continuer la lecture</div>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          ["Une introduction aux analyses on-chain", "/education/on-chain"],
          ["Comment l'architecture de garde a évolué", "/research/custody"],
          ["L'état des réserves de stablecoins", "/markets/stablecoins"],
          ["Les agents d'IA dans les bureaux d'achat", "/ai/agents"],
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
