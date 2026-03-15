import { query } from './db';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function seed() {
  console.log('Running schema...');
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  const statements = schema.split(';').map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    await query(stmt);
  }
  console.log('Schema applied.');

  // --- Blog Posts ---
  const blogPosts = [
    {
      title_en: "Why Next.js 15 is a Game Changer for SaaS",
      title_sq: "Pse Next.js 15 është revolucionar për SaaS",
      category: "Tech",
      date: "Mar 15, 2025",
      author: "Drilon A.",
      image_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
      content_en: "",
      content_sq: "",
      sort_order: 1,
    },
    {
      title_en: "Designing for Conversion: The 80/20 Rule",
      title_sq: "Dizajn për Konvertim: Rregulli 80/20",
      category: "Design",
      date: "Mar 10, 2025",
      author: "Besart K.",
      image_url: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800",
      content_en: "",
      content_sq: "",
      sort_order: 2,
    },
    {
      title_en: "How Open Source Drives Commercial Innovation",
      title_sq: "Si Open Source nxit Inovacionin Komercial",
      category: "Impact",
      date: "Mar 05, 2025",
      author: "AlbShift Team",
      image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      content_en: "",
      content_sq: "",
      sort_order: 3,
    },
    {
      title_en: "Scaling PostgreSQL to 1M Concurrent Users",
      title_sq: "Shkallëzimi i PostgreSQL në 1M Përdorues",
      category: "Tech",
      date: "Feb 28, 2025",
      author: "Drilon A.",
      image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
      content_en: "",
      content_sq: "",
      sort_order: 4,
    },
  ];

  console.log('Seeding blog posts...');
  for (const post of blogPosts) {
    await query(
      `INSERT INTO blog_posts (title_en, title_sq, category, date, author, image_url, content_en, content_sq, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT DO NOTHING`,
      [post.title_en, post.title_sq, post.category, post.date, post.author, post.image_url, post.content_en, post.content_sq, post.sort_order]
    );
  }

  // --- Projects ---
  const projects = [
    {
      title_en: "Fintech Platform",
      title_sq: "Platforma Fintech",
      client_en: "NeoBank Europe",
      client_sq: "NeoBank Europe",
      result_en: "+42% Conversion",
      result_sq: "+42% Konvertim",
      tags: ["Next.js", "Go", "AWS"],
      image_url: "https://picsum.photos/seed/fin/800/600",
      sort_order: 1,
    },
    {
      title_en: "E-commerce Engine",
      title_sq: "Motori E-commerce",
      client_en: "Luxury Global",
      client_sq: "Luxury Global",
      result_en: "-60% Load Time",
      result_sq: "-60% Koha e Ngarkimit",
      tags: ["React", "Shopify", "Tailwind"],
      image_url: "https://picsum.photos/seed/shop/800/600",
      sort_order: 2,
    },
    {
      title_en: "SaaS Dashboard",
      title_sq: "Dashboard SaaS",
      client_en: "Cloud Analytics",
      client_sq: "Cloud Analytics",
      result_en: "99.9% Reliability",
      result_sq: "99.9% Besueshmëri",
      tags: ["TypeScript", "Node", "Redis"],
      image_url: "https://picsum.photos/seed/saas/800/600",
      sort_order: 3,
    },
    {
      title_en: "Design System",
      title_sq: "Sistemi i Dizajnit",
      client_en: "GovTech Hub",
      client_sq: "GovTech Hub",
      result_en: "2x Velocity",
      result_sq: "2x Shpejtësi",
      tags: ["Figma", "Stitches", "Storybook"],
      image_url: "https://picsum.photos/seed/ds/800/600",
      sort_order: 4,
    },
  ];

  console.log('Seeding projects...');
  for (const p of projects) {
    await query(
      `INSERT INTO projects (title_en, title_sq, client_en, client_sq, result_en, result_sq, tags, image_url, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT DO NOTHING`,
      [p.title_en, p.title_sq, p.client_en, p.client_sq, p.result_en, p.result_sq, p.tags, p.image_url, p.sort_order]
    );
  }

  // --- Team Members ---
  const teamMembers = [
    {
      name: "Drilon A.",
      role_en: "Founder & Lead Engineer",
      role_sq: "Themelues & Inxhinier Kryesor",
      bio_en: "SaaS architect with 10+ years experience in distributed systems.",
      bio_sq: "Arkitekt SaaS me 10+ vite përvojë në sisteme të shpërndara.",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      grid_size: "lg:col-span-2 lg:row-span-2",
      sort_order: 1,
    },
    {
      name: "Besa K.",
      role_en: "Lead Product Designer",
      role_sq: "Dizajnere Kryesore e Produktit",
      bio_en: "Crafting pixel-perfect UI systems.",
      bio_sq: "Krijon sisteme UI piksel-perfekte.",
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      grid_size: "lg:col-span-1 lg:row-span-1",
      sort_order: 2,
    },
    {
      name: "Arbi H.",
      role_en: "Full-stack Engineer",
      role_sq: "Inxhinier Full-stack",
      bio_en: "TypeScript enthusiast and performance optimizer.",
      bio_sq: "Entuziast i TypeScript dhe optimizues i performancës.",
      image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      grid_size: "lg:col-span-1 lg:row-span-1",
      sort_order: 3,
    },
    {
      name: "Lea M.",
      role_en: "Cloud Architect",
      role_sq: "Arkitekte Cloud",
      bio_en: "Automating infra with high availability.",
      bio_sq: "Automatizim i infrastrukturës me disponueshmëri të lartë.",
      image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      grid_size: "lg:col-span-1 lg:row-span-1",
      sort_order: 4,
    },
    {
      name: "Genti P.",
      role_en: "Frontend Engineer",
      role_sq: "Inxhinier Frontend",
      bio_en: "Building responsive, modern web apps.",
      bio_sq: "Ndërton aplikacione web moderne dhe responsive.",
      image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      grid_size: "lg:col-span-1 lg:row-span-1",
      sort_order: 5,
    },
  ];

  console.log('Seeding team members...');
  for (const m of teamMembers) {
    await query(
      `INSERT INTO team_members (name, role_en, role_sq, bio_en, bio_sq, image_url, grid_size, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT DO NOTHING`,
      [m.name, m.role_en, m.role_sq, m.bio_en, m.bio_sq, m.image_url, m.grid_size, m.sort_order]
    );
  }

  // --- FAQs ---
  const faqs = [
    {
      question_en: "What is your typical project timeline?",
      question_sq: "Cila është afati tipik i projektit?",
      answer_en: "Standard MVP development takes between 6 to 12 weeks depending on complexity. Marketing websites can be delivered in as little as 3 weeks.",
      answer_sq: "Zhvillimi standard i MVP zgjat mes 6 deri 12 javësh varësisht nga kompleksiteti. Faqet e marketingut mund të dorëzohen brenda 3 javësh.",
      sort_order: 1,
    },
    {
      question_en: "Do I own the source code?",
      question_sq: "A jam pronar i kodit burimor?",
      answer_en: "Absolutely. Once final payment is made, you own 100% of the intellectual property and source code. No vendor lock-in.",
      answer_sq: "Absolutisht. Pasi të bëhet pagesa finale, ju zotëroni 100% të pronësisë intelektuale dhe kodit burimor. Pa mbyllje ndaj furnitorit.",
      sort_order: 2,
    },
    {
      question_en: "Which tech stack do you recommend?",
      question_sq: "Cilin stack teknologjik rekomandoni?",
      answer_en: "We primarily work with TypeScript, React/Next.js for the frontend, and Node.js or Go for the backend. We use PostgreSQL for data and AWS/Vercel for deployment.",
      answer_sq: "Ne punojmë kryesisht me TypeScript, React/Next.js për frontend, dhe Node.js ose Go për backend. Përdorim PostgreSQL për të dhënat dhe AWS/Vercel për deploy.",
      sort_order: 3,
    },
    {
      question_en: "Do you offer post-launch maintenance?",
      question_sq: "A ofroni mirëmbajtje pas lançimit?",
      answer_en: "Yes, we provide monthly maintenance packages that cover security patches, performance monitoring, and continuous minor iterations.",
      answer_sq: "Po, ne ofrojmë paketa mujore mirëmbajtjeje që mbulojnë patching sigurie, monitorim performance dhe iterime të vazhdueshme.",
      sort_order: 4,
    },
    {
      question_en: "How do we communicate during the build?",
      question_sq: "Si komunikojmë gjatë ndërtimit?",
      answer_en: "We use a dedicated Slack channel for your project and hold weekly syncs. You also get access to a private dashboard for real-time progress tracking.",
      answer_sq: "Ne përdorim një kanal dedikuar Slack për projektin tuaj dhe mbajmë takime javore. Gjithashtu merrni qasje në një dashboard privat për ndjekje të progresit në kohë reale.",
      sort_order: 5,
    },
    {
      question_en: "What is the 80/20 model exactly?",
      question_sq: "Çfarë është modeli 80/20 saktësisht?",
      answer_en: "It's our engineering philosophy where we identify the 20% of features that drive 80% of business value, ensuring we ship fast and iterate based on real user data.",
      answer_sq: "Është filozofia jonë inxhinierike ku identifikojmë 20% të funksionaliteteve që sjellin 80% të vlerës së biznesit, duke siguruar që dërgojmë shpejt dhe iterojmë bazuar në të dhëna reale.",
      sort_order: 6,
    },
  ];

  console.log('Seeding FAQs...');
  for (const faq of faqs) {
    await query(
      `INSERT INTO faqs (question_en, question_sq, answer_en, answer_sq, sort_order)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT DO NOTHING`,
      [faq.question_en, faq.question_sq, faq.answer_en, faq.answer_sq, faq.sort_order]
    );
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
