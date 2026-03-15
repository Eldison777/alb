import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react';

type BlogPost = {
  id: number;
  title_en: string;
  title_sq?: string;
  category: string;
  date: string;
  author: string;
  image_url?: string;
  content_en?: string;
  content_sq?: string;
};

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    category: 'Build',
    title_en: 'How We Scope Custom Software Without Slowing Teams Down',
    title_sq: 'Si bejme scoping per custom software pa ngadalesuar ekipet',
    date: 'Mar 15, 2026',
    author: 'AlbShift',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200',
    content_en:
      'Strong software projects usually fail before development starts. They fail in the scoping stage, when everything sounds important and nobody has translated business goals into delivery priorities.\n\nOur approach starts by identifying the workflows that create the most operational drag or the clearest revenue opportunity. Instead of listing dozens of features, we isolate the few capabilities that change how a team works every day.\n\nFrom there we map roles, decisions, data inputs, and handoffs. That gives us a sharper product brief, a better first release, and a roadmap that can evolve without chaos.\n\nThe practical result is simple: teams launch sooner, spend less on the wrong features, and get a product foundation that is easier to maintain and extend.',
    content_sq:
      'Projektet e forta software shpesh deshtojne para se te filloje zhvillimi. Deshtojne ne fazen e scoping-ut, kur cdo gje duket e rendesishme dhe askush nuk i ka kthyer qellimet e biznesit ne prioritete reale.\n\nNe fillojme duke gjetur workflows qe krijojne me shume friksion ose mundesine me te qarte per rritje. Ne vend qe te rendisim dhjetera features, ne izolojme aftesite qe ndryshojne punen e ekipit cdo dite.\n\nPastaj hartojme rolet, vendimet, input-et e te dhenave, dhe handoff-et. Kjo na jep nje brief me te qarte, nje release te pare me te mire, dhe nje roadmap qe mund te zgjerohet pa kaos.',
  },
  {
    id: 2,
    category: 'AI',
    title_en: 'Three AI Automations That Save Time in Growing Businesses',
    title_sq: 'Tre AI automations qe kursejne kohe ne bizneset ne rritje',
    date: 'Mar 10, 2026',
    author: 'AlbShift',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    content_en:
      'The most useful AI work in growing businesses is rarely flashy. It is usually about removing repetitive coordination that drains the team every week.\n\nOne strong use case is lead intake. AI can classify requests, enrich contact data, and route high-intent leads to the right person much faster than manual review.\n\nA second use case is internal knowledge support. When teams need answers across policies, documentation, and past tickets, a well-structured assistant can reduce search time dramatically.\n\nThe third use case is recurring reporting. AI can summarize updates, draft status reports, and prepare cross-team briefings from multiple systems.\n\nThe key is not adding AI everywhere. The key is choosing the workflows where speed, context, and consistency matter most.',
    content_sq:
      'Puna me e dobishme me AI ne bizneset ne rritje zakonisht nuk eshte spektakolare. Ajo heq koordinimin repetitiv qe lodh ekipin cdo jave.\n\nNje rast i forte eshte lead intake. AI mund te klasifikoje kerkesat, te pasuroje te dhenat, dhe te dergoje lead-et me intent te larte te personi i duhur.\n\nRasti i dyte eshte suporti i njohurive te brendshme. Kur ekipet kerkojne pergjigje neper politika, dokumentacion, dhe tickets, nje asistent i mire ul ndjeshem kohen e kerkimit.\n\nRasti i trete eshte reporting-u i perseritur. AI mund te permbledhe update-e, te draftoje raporte, dhe te pergatise briefings nga sisteme te ndryshme.',
  },
  {
    id: 3,
    category: 'Community',
    title_en: 'Why Tech Communities Matter for Serious Brands',
    title_sq: 'Pse komunitetet tech kane rendesi per brandet serioze',
    date: 'Mar 05, 2026',
    author: 'AlbShift Team',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    content_en:
      'A strong technology brand does more than publish work. It creates places where people can learn, meet, and return with trust.\n\nCommunities reduce the distance between brand and audience. They turn passive followers into active participants through events, conversations, and useful resources.\n\nFor companies, this creates a long-term advantage. Better communities attract smarter opportunities, stronger referrals, and higher-quality talent.\n\nThat is why community building should not be treated as an optional marketing layer. It can be a real growth system when the experience is consistent and the value is genuine.',
    content_sq:
      'Nje brand i forte teknologjik ben me shume se sa publikon pune. Ai krijon vende ku njerezit mesojne, takohen, dhe kthehen me besim.\n\nKomunitetet e ulin distancen mes brandit dhe audiences. I kthejne ndjekesit pasive ne pjesemarres aktiv permes eventeve, bisedave, dhe burimeve te dobishme.\n\nPer kompanite kjo krijon avantazh afatgjate. Komunitetet me te mira terheqin mundesi me te mira, referime me te forta, dhe talent me cilesor.',
  },
  {
    id: 4,
    category: 'Build',
    title_en: 'What Founders Actually Need From a Product Partner',
    title_sq: 'Cfare u duhet founders nga nje product partner',
    date: 'Feb 28, 2026',
    author: 'AlbShift',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    content_en:
      'Founders rarely need more meetings, more terminology, or more vague strategic advice. They need a partner who can reduce ambiguity and convert momentum into shipping.\n\nThat means challenging unnecessary scope, clarifying decisions quickly, and building systems that match the stage of the company rather than the ego of the roadmap.\n\nThe best product partnerships create trust through consistency. Deadlines become more believable. Product choices become easier to explain. The team gets calmer because progress is visible.\n\nA good partner does not just add capacity. They improve the quality of movement.',
    content_sq:
      'Founders zakonisht nuk kane nevoje per me shume mbledhje ose terminologji. Kane nevoje per nje partner qe ul paqartesine dhe e kthen momentumin ne shipping.\n\nKjo do te thote te sfidosh scope-in e panevojshem, te qartesosh vendimet shpejt, dhe te ndertosh sisteme qe i pershtaten fazes se kompanise.\n\nPartneritetet me te mira te produktit krijojne besim permes qendrueshmerise. Afatet behen me te besueshme, zgjedhjet e produktit shpjegohen me lehte, dhe ekipi qetesohet sepse progresi shihet.',
  },
];

const BlogArticle: React.FC<{ t: any; lang: 'en' | 'sq' }> = ({ lang }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const articleId = useMemo(() => {
    const match = window.location.pathname.match(/^\/blog\/(\d+)/);
    return match ? Number(match[1]) : null;
  }, []);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }

    const fallback = FALLBACK_POSTS.find((item) => item.id === articleId) || null;
    setPost(fallback);

    const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/blog/${articleId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const merged = {
          ...fallback,
          ...data,
          content_en: data.content_en || fallback?.content_en || '',
          content_sq: data.content_sq || fallback?.content_sq || '',
          image_url: data.image_url || fallback?.image_url || '',
        };
        setPost(merged);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [articleId]);

  useEffect(() => {
    if (!post) return;

    const title = lang === 'sq' && post.title_sq ? post.title_sq : post.title_en;
    const content = lang === 'sq' && post.content_sq ? post.content_sq : post.content_en;
    document.title = `${title} | AlbShift Insights`;

    const description = (content || '').split('\n\n')[0]?.slice(0, 155) || title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/blog/${post.id}`;
  }, [lang, post]);

  const content = post
    ? (lang === 'sq' && post.content_sq ? post.content_sq : post.content_en || '')
        .split('\n\n')
        .filter(Boolean)
    : [];
  const title = post ? (lang === 'sq' && post.title_sq ? post.title_sq : post.title_en) : 'Article';

  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-10 md:py-14">
      <div className="max-w-4xl mx-auto">
        <a
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-crimson-600 mb-8"
        >
          <ArrowLeft size={16} /> Back to insights
        </a>

        {loading ? (
          <div className="glass rounded-[2rem] p-10">Loading article...</div>
        ) : !post ? (
          <div className="glass rounded-[2rem] p-10">Article not found.</div>
        ) : (
          <article className="glass rounded-[2.5rem] overflow-hidden border border-white/5">
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={title}
                width={1200}
                height={700}
                loading="eager"
                className="w-full aspect-[16/8] object-cover"
              />
            ) : null}
            <div className="p-6 md:p-10 lg:p-14">
              <div className="inline-flex items-center rounded-full bg-crimson-600/10 text-crimson-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] mb-5">
                {post.category}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight">{title}</h1>
              <div className="flex flex-wrap gap-5 mt-6 mb-10 text-sm opacity-60 font-semibold">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} /> {post.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} /> {post.author}
                </span>
              </div>
              <div className="space-y-6 text-base sm:text-lg leading-8 opacity-90 max-w-none">
                {content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogArticle;
