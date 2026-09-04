import { type FormEvent, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import heroPanelImage from '@/assets/fernando-layus-cordoba.jpg';
import heroBackgroundImage from '@/assets/hero-cordoba.jpg';
import contactBackgroundImage from '@/assets/contact-cordoba.jpg';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Landmark,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import EntrevistaForm from '@/components/EntrevistaForm.jsx';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

// Keep the office's public contact details centralized for easy updates.
const CONTACT = {
  email: 'contacto@estudiopenalcordoba.com',
  location: 'Cruz del Eje, Córdoba',
  whatsapp: 'http://wa.link/errzvy',
};

const WHATSAPP_NUMBER = '543549434996';

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const practiceAreas = [
  {
    number: '01',
    title: 'Derecho Penal',
    description: 'Defensa y representación en investigaciones, denuncias, detenciones y procesos penales, con revisión de la situación y estrategia desde el primer momento.',
    localNote: 'Desde Cruz del Eje, coordinamos con rapidez la atención vinculada al Complejo Penitenciario. Cuando el establecimiento lo autoriza, también podemos organizar entrevistas con personas privadas de su libertad y sus familias.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Derecho Civil',
    description: 'Asesoramiento para ordenar conflictos, reclamos y decisiones patrimoniales con una mirada práctica, clara y orientada a resultados.',
    icon: Scale,
  },
  {
    number: '03',
    title: 'Derecho Administrativo',
    description: 'Acompañamiento frente a trámites, decisiones y conflictos con organismos públicos, cuidando tus derechos en cada instancia.',
    icon: Landmark,
  },
  {
    number: '04',
    title: 'Derecho Notarial',
    description: 'Orientación profesional para actos, documentos y decisiones notariales, con atención al detalle y seguridad jurídica.',
    icon: FileText,
  },
];

const faqs = [
  {
    question: '¿Qué hago si detuvieron a un familiar?',
    answer: 'Mantené la calma y buscá asistencia letrada cuanto antes. No es necesario resolver la situación por teléfono con la dependencia: un abogado puede presentarse, conocer el motivo de la detención y cuidar que se respeten las garantías de la persona.',
  },
  {
    question: '¿Puedo consultar aunque todavía no haya una denuncia formal?',
    answer: 'Sí. Una consulta temprana permite ordenar la información, anticipar escenarios y evitar decisiones que puedan complicar una futura defensa. La conversación inicial es confidencial.',
  },
  {
    question: '¿Atienden casos fuera de Córdoba Capital?',
    answer: 'La primera orientación puede coordinarse a distancia. Cuando la situación requiere presencia, evaluamos el alcance geográfico y la urgencia para organizar la intervención correspondiente.',
  },
];

function scrollToContact() {
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [whatsappMenuOpen, setWhatsappMenuOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden bg-background">
      <div className="contact-strip px-5 py-2.5 text-primary-foreground sm:px-8">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 text-[11px] font-medium tracking-[0.08em]">
          <p className="font-mono-custom uppercase text-primary-foreground/75">Atención penal · Cruz del Eje y Córdoba</p>
          <a
             href={CONTACT.whatsapp}
             target="_blank"
             rel="noreferrer"
            data-testid="link-top-urgent-whatsapp"
            className="flex items-center gap-1.5 text-primary-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <MessageCircle size={13} aria-hidden="true" />
            <span>Escribir ahora</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-primary-foreground/10 bg-primary/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <a href="#inicio" data-testid="link-brand-home" className="group flex items-center gap-3 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors group-hover:border-accent group-hover:text-accent">
              <Landmark size={19} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block text-[13px] font-semibold uppercase tracking-[0.18em]">Fernando Layús</span>
              <span className="mt-1 block font-display text-[17px] italic text-accent">Abogado</span>
            </span>
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            <a href="#sobre-mi" data-testid="link-nav-about" className="text-[13px] font-medium text-primary-foreground/70 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Sobre mí</a>
            <a href="#especialidades" data-testid="link-nav-practice" className="text-[13px] font-medium text-primary-foreground/70 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Especialidades</a>
            <a href="#metodo" data-testid="link-nav-method" className="text-[13px] font-medium text-primary-foreground/70 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Cómo trabajamos</a>
            <a href="#preguntas" data-testid="link-nav-faq" className="text-[13px] font-medium text-primary-foreground/70 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Preguntas frecuentes</a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
               href={CONTACT.whatsapp}
               target="_blank"
               rel="noreferrer"
              data-testid="link-header-whatsapp"
              className="flex items-center gap-2 border border-primary-foreground/25 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.11em] text-primary-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="/entrevista"
              data-testid="link-header-interview"
              className="bg-accent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.11em] text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Agendar entrevista
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            data-testid="button-mobile-menu"
            className="flex h-10 w-10 items-center justify-center border border-primary-foreground/25 text-primary-foreground sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {mobileOpen && (
          <nav aria-label="Navegación móvil" className="border-t border-primary-foreground/15 bg-secondary px-5 py-5 sm:hidden">
            <div className="flex flex-col gap-1">
              {[
                ['Sobre mí', '#sobre-mi', 'link-mobile-about'],
                ['Especialidades', '#especialidades', 'link-mobile-practice'],
                ['Cómo trabajamos', '#metodo', 'link-mobile-method'],
                ['Preguntas frecuentes', '#preguntas', 'link-mobile-faq'],
                ['Agendar entrevista', '/entrevista', 'link-mobile-interview'],
              ].map(([label, href, testId]) => (
                <a key={href} href={href} onClick={closeMobile} data-testid={testId} className="border-b border-border/70 py-3 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{label}</a>
              ))}
              <button type="button" onClick={() => { closeMobile(); scrollToContact(); }} data-testid="button-mobile-contact" className="mt-4 flex items-center justify-center gap-2 bg-accent py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Hablar con el estudio <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </nav>
        )}
      </header>
      <main>
        <section
          id="inicio"
          className="hero-architecture relative border-b border-border/80"
          style={{ backgroundImage: `linear-gradient(90deg, hsl(var(--background) / .95) 0%, hsl(var(--background) / .86) 43%, hsl(var(--background) / .58) 100%), url(${heroBackgroundImage})` }}
        >
          <div className="mx-auto grid min-h-[620px] max-w-[1280px] items-stretch lg:grid-cols-[1.06fr_.94fr]">
            <div className="flex flex-col justify-center px-5 py-20 sm:px-8 lg:py-28">
              <div className="reveal flex items-center gap-3 font-mono-custom text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-9 bg-accent" />
                Primera respuesta. Defensa seria.
              </div>
              <h1 data-testid="text-hero-heading" className="reveal reveal-delay-1 mt-7 max-w-[690px] font-display text-[clamp(2.8rem,6vw,5.9rem)] uppercase leading-[0.91] tracking-[-0.025em] text-primary">
                  ABOGADO EN CRUZ DEL EJE,<br />
                  CÓRDOBA:<br />
                  <em className="text-accent">DEFENSA FIRME</em>
              </h1>
               <p data-testid="text-hero-description" className="reveal reveal-delay-2 mt-8 max-w-[560px] text-[16px] leading-7 text-muted-foreground sm:text-[18px]">
                  Fernando Layús, abogado con trayectoria en el Poder Judicial, brinda asesoramiento y representación en Derecho Penal, Civil, Administrativo y Notarial. Desde Cruz del Eje, coordina atención en Córdoba Capital y toda la provincia junto a sus asociados.
              </p>
               <div data-testid="text-local-penal-presence" className="reveal reveal-delay-2 mt-6 max-w-[570px] border-l-2 border-accent bg-background/55 px-4 py-3.5 text-sm leading-6 text-primary">
                 <p className="flex items-center gap-2 font-semibold"><MapPin size={16} className="shrink-0 text-accent" aria-hidden="true" /> Una cercanía concreta para una situación urgente</p>
                 <p className="mt-1.5 text-muted-foreground">La proximidad al Complejo Penitenciario permite coordinar con rapidez la revisión de la situación y, cuando el establecimiento lo autoriza, entrevistas con personas privadas de su libertad y sus familias.</p>
               </div>
              <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" onClick={scrollToContact} data-testid="button-hero-consult" className="group flex items-center justify-center gap-3 bg-accent px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.13em] text-accent-foreground transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Necesito orientación <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
                <a href="#especialidades" data-testid="link-hero-practice" className="group flex items-center justify-center gap-2 px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.13em] text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  Ver especialidades <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-primary/15 pt-5 text-[11px] font-medium text-muted-foreground">
                <span className="flex items-center gap-2"><LockKeyhole size={14} className="text-accent" aria-hidden="true" /> Conversación confidencial</span>
                <span className="flex items-center gap-2"><Clock3 size={14} className="text-accent" aria-hidden="true" /> Respuesta inicial clara</span>
              </div>
            </div>
            <div className="hero-panel relative m-5 min-h-[380px] overflow-hidden border border-primary-foreground/20 bg-primary lg:my-14 lg:mr-8 lg:ml-2 lg:min-h-[500px]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,231,216,.24),rgba(239,231,216,.04)_42%,rgba(239,231,216,.9)_100%)]" />
              <img src={heroPanelImage} alt="Interior de un edificio histórico de Córdoba" width="760" height="469" className="h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-black sm:p-10">
                <div className="flex justify-between font-mono-custom text-[10px] uppercase tracking-[0.16em] text-black/70">
                  <span className="bg-[#efe7d8]/65 px-2 py-1">31° 25′ S · 64° 11′ O</span>
                </div>
                <div>
                  <div className="mb-5 h-px w-14 bg-accent" />
                  <p className="max-w-[250px] bg-[#efe7d8]/80 p-4 font-display text-4xl leading-none text-black sm:text-5xl">La primera decisión también es parte de la defensa.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 items-center gap-2 bg-accent px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-accent-foreground lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground" /> Córdoba · Argentina
          </div>
        </section>

        <section className="border-b border-border bg-secondary">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {[
              ['01', 'Escucha sin atajos', 'Antes de opinar, entendemos el contexto.'],
               ['02', 'Coordinación rápida', 'Revisamos lo importante y ordenamos la urgencia.'],
               ['03', 'Presencia territorial', 'Cruz del Eje, el Complejo Penitenciario y Córdoba.'],
            ].map(([number, title, description]) => (
              <div key={number} data-testid={`text-principle-${number}`} className="flex gap-4 py-6 sm:px-7 sm:py-8 first:sm:pl-0 last:sm:pr-0">
                <span className="font-mono-custom text-[11px] text-accent">{number}</span>
                <div><p className="text-sm font-semibold text-primary">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div>
              </div>
            ))}
          </div>
        </section>

         <section id="sobre-mi" aria-labelledby="cobertura-heading" className="scroll-mt-24 border-b border-border bg-secondary px-5 py-16 sm:px-8 lg:py-20">
           <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-20">
             <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Sobre mí</p>
                <h2 id="cobertura-heading" className="mt-4 max-w-[500px] font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[.92] tracking-[-0.035em] text-primary">Experiencia para defenderte con claridad.</h2>
                <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-muted-foreground">Soy Fernando Layús, abogado oriundo de Cruz del Eje, con trayectoria en el Poder Judicial. Trabajo con una mirada cercana y resolutiva: escucho el problema, ordeno las alternativas y construyo una respuesta jurídica a la medida de cada persona.</p>
             </div>
             <div className="grid gap-6 text-sm leading-6 text-muted-foreground sm:grid-cols-3">
               <div className="border-l border-accent pl-4"><p className="font-semibold text-primary">Cruz del Eje</p><p className="mt-1">Origen y atención con conocimiento de la región.</p></div>
               <div className="border-l border-accent pl-4"><p className="font-semibold text-primary">Córdoba Capital</p><p className="mt-1">Intervención ante fiscalías, juzgados y tribunales.</p></div>
               <div className="border-l border-accent pl-4"><p className="font-semibold text-primary">Toda la provincia</p><p className="mt-1">Coordinación con asociados según cada necesidad.</p></div>
             </div>
           </div>
         </section>

        <section id="especialidades" className="scroll-mt-24 bg-background px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Áreas de intervención</p>
                <h2 data-testid="text-practice-heading" className="mt-5 max-w-[380px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.92] tracking-[-0.035em] text-primary">Defender también es <em className="text-accent">anticiparse.</em></h2>
                <p className="mt-7 max-w-[360px] text-[15px] leading-7 text-muted-foreground">Cada asunto jurídico exige atención al detalle, lectura del contexto y una estrategia clara que se adapte a lo que está ocurriendo.</p>
                <a href="#contacto" data-testid="link-practice-contact" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Consultar por mi situación <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
              <div className="border-t border-primary">
                 {practiceAreas.map(({ number, title, description, localNote, icon: Icon }) => (
                  <article key={number} data-testid={`card-practice-${number}`} className="group relative grid grid-cols-[32px_1fr_40px] items-center gap-3 border border-transparent border-b-border py-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/70 hover:bg-secondary/70 hover:shadow-[0_14px_30px_hsl(var(--primary)/.1)] sm:grid-cols-[60px_1fr_44px] sm:gap-7">
                    <span className="font-mono-custom text-[11px] text-accent">{number}</span>
                     <div><h3 className="flex items-center gap-3 text-[19px] font-semibold tracking-[-0.02em] text-primary">{title}<Icon size={18} strokeWidth={1.5} className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></h3><p className="mt-2 max-w-[560px] text-sm leading-6 text-muted-foreground">{description}</p>{localNote && <p data-testid="text-penal-local-note" className="mt-3 flex max-w-[620px] gap-2 border-l border-accent/70 pl-3 text-[13px] leading-5 text-primary"><MapPin size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /><span>{localNote}</span></p>}</div>
                    <a href={whatsappLink(`Hola! Busco un abogado de ${title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp sobre ${title}`} data-testid={`link-practice-whatsapp-${number}`} className="flex h-10 w-10 items-center justify-center border border-border text-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"><MessageCircle size={16} aria-hidden="true" /></a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="scroll-mt-24 bg-primary px-5 py-24 text-primary-foreground sm:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Cómo trabajamos</p>
                <h2 data-testid="text-method-heading" className="mt-5 max-w-[470px] font-display text-[clamp(2.8rem,5vw,5.1rem)] leading-[.91] tracking-[-0.035em]">Seriedad para <em className="text-accent">lo urgente.</em></h2>
                 <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-primary-foreground/65">No prometemos certezas donde no las hay. Sí ofrecemos presencia, criterio y una explicación honesta de las alternativas, con coordinación territorial cuando hace falta.</p>
              </div>
              <div className="grid gap-0 border-t border-primary-foreground/20">
                {[
                  ['01', 'Nos contactás', 'Podés escribir por WhatsApp o completar el formulario. Contanos qué ocurrió, sin necesidad de usar lenguaje técnico.'],
                  ['02', 'Ordenamos la situación', 'Revisamos los datos importantes: dónde está la persona, qué autoridad intervino y qué actuaciones existen.'],
                  ['03', 'Definimos el próximo paso', 'Te explicamos qué conviene hacer ahora y coordinamos la intervención que corresponda.'],
                ].map(([number, title, description]) => (
                  <div key={number} data-testid={`text-method-step-${number}`} className="grid gap-3 border-b border-primary-foreground/20 py-7 sm:grid-cols-[60px_1fr] sm:gap-8">
                    <span className="font-mono-custom text-[11px] text-accent">{number}</span>
                    <div><h3 className="text-xl font-medium">{title}</h3><p className="mt-2 max-w-[500px] text-sm leading-6 text-primary-foreground/60">{description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="legal-grid bg-secondary px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Si está pasando ahora</p>
                <h2 data-testid="text-emergency-heading" className="mt-5 max-w-[420px] font-display text-[clamp(2.7rem,5vw,4.8rem)] leading-[.92] tracking-[-0.035em] text-primary">Tres cosas para hacer <em className="text-accent">ya.</em></h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  [FileText, 'Guardá la información', 'Mensajes, citaciones y actas pueden ser relevantes. No borres ni alteres nada.'],
                  [LockKeyhole, 'No declares sin asesoría', 'Tenés derecho a conocer la imputación y a contar con defensa antes de declarar.'],
                  [MessageCircle, 'Escribinos', 'Una consulta temprana permite actuar con más herramientas y menos incertidumbre.'],
                ].map(([Icon, title, description], index) => {
                  const StepIcon = Icon;
                  return <div key={title as string} data-testid={`card-emergency-${index + 1}`} className="border-l border-accent pl-4"><StepIcon size={19} className="text-accent" strokeWidth={1.5} aria-hidden="true" /><h3 className="mt-4 text-sm font-semibold text-primary">{title as string}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{description as string}</p></div>;
                })}
              </div>
            </div>
          </div>
        </section>

         <section className="bg-background px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-[980px]">
            <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-20">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Lo que importa</p>
                <p className="mt-5 font-display text-4xl leading-[.95] text-primary">Una voz clara cuando más cuesta pensar.</p>
              </div>
               <div className="grid gap-8">
                 {[
                   ['ML', '“Nos explicaron cada paso sin minimizar lo que estaba pasando. En un momento de mucha angustia, sentir que alguien estaba realmente atento hizo una diferencia enorme.”', 'María L.', 'Córdoba Capital · consulta familiar'],
                   ['JG', '“Pudimos hablar con claridad desde el primer llamado. La estrategia fue concreta y siempre supimos cuál era el próximo paso.”', 'Julián G.', 'Córdoba Capital · asistencia a detenido'],
                   ['AP', '“La escucha y la reserva fueron fundamentales. Nos acompañaron con seriedad, sin prometer resultados imposibles.”', 'Ana P.', 'Villa Allende · consulta penal'],
                 ].map(([initials, quote, name, context], index) => (
                   <figure key={name} data-testid={`card-testimonial-${index + 1}`} className="relative border-t-2 border-accent pt-7">
                     <blockquote data-testid={index === 0 ? 'text-testimonial' : undefined} className="font-display text-[clamp(1.65rem,2.7vw,2.5rem)] leading-[1.08] tracking-[-0.02em] text-primary">{quote}</blockquote>
                     <figcaption className="mt-7 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-8 w-8 rounded-full bg-secondary text-center font-mono-custom text-[10px] leading-8 text-accent">{initials}</span><span><strong className="font-semibold text-primary">{name}</strong><br />{context}</span></figcaption>
                   </figure>
                 ))}
               </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="scroll-mt-24 border-y border-border bg-secondary px-5 py-24 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Antes de escribir</p>
              <h2 data-testid="text-faq-heading" className="mt-5 max-w-[380px] font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[.92] tracking-[-0.035em] text-primary">Preguntas que aparecen <em className="text-accent">primero.</em></h2>
            </div>
            <div className="border-t border-primary">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="border-b border-border">
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} data-testid={`button-faq-${index + 1}`} className="flex w-full items-center justify-between gap-5 py-6 text-left text-[15px] font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    {faq.question}<ChevronDown size={18} className={`shrink-0 text-accent transition-transform ${openFaq === index ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {openFaq === index && <p data-testid={`text-faq-answer-${index + 1}`} className="max-w-[650px] pb-6 pr-8 text-sm leading-6 text-muted-foreground">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="scroll-mt-24 border-t-4 border-accent bg-primary bg-cover bg-center px-5 py-20 text-primary-foreground sm:px-8 lg:py-28"
          style={{ backgroundImage: `linear-gradient(90deg, hsl(var(--primary) / .94) 0%, hsl(var(--primary) / .87) 100%), url(${contactBackgroundImage})` }}
        >
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div className="text-primary-foreground">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">Primer contacto</p>
              <h2 data-testid="text-contact-heading" className="mt-5 max-w-[470px] font-display text-[clamp(3rem,6vw,6rem)] leading-[.88] tracking-[-0.04em]">Contanos qué está pasando.</h2>
              <p className="mt-7 max-w-[380px] text-[15px] leading-7 text-primary-foreground/65">La información que compartas se trata con reserva. Dejanos un medio para responderte y te contactaremos para entender mejor la situación.</p>
                <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp" className="mt-9 inline-flex items-center gap-3 border-b border-accent pb-2 text-xs font-semibold uppercase tracking-[0.13em] text-primary-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">También podés escribir por WhatsApp <MessageCircle size={16} aria-hidden="true" /></a>
            </div>
            <div className="bg-background p-6 sm:p-9">
              {sent ? (
                <div data-testid="status-contact-success" className="flex min-h-[360px] flex-col justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check size={23} aria-hidden="true" /></span>
                  <h3 className="mt-7 font-display text-4xl leading-none text-primary">Recibimos tu mensaje.</h3>
                  <p className="mt-4 max-w-[390px] text-sm leading-6 text-muted-foreground">Gracias por escribirnos. Revisaremos la información y nos pondremos en contacto por el medio que indicaste.</p>
                  <button type="button" onClick={() => setSent(false)} data-testid="button-contact-new-message" className="mt-8 flex w-fit items-center gap-2 border-b border-accent pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Enviar otro mensaje <ArrowUpRight size={15} aria-hidden="true" /></button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Nombre</span><input required type="text" name="name" data-testid="input-contact-name" placeholder="¿Cómo te llamamos?" className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" /></label>
                    <label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">WhatsApp o teléfono</span><input required type="tel" name="phone" data-testid="input-contact-phone" placeholder="Un número para responderte" className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" /></label>
                  </div>
                  <label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">¿En qué podemos ayudarte?</span><textarea required name="message" rows={5} data-testid="input-contact-message" placeholder="Contanos brevemente qué ocurrió..." className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm leading-6 text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" /></label>
                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-2 text-[11px] leading-5 text-muted-foreground"><LockKeyhole size={13} className="shrink-0 text-accent" aria-hidden="true" /> Tu consulta se trata con reserva.</p><button type="submit" data-testid="button-contact-submit" className="group flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">Enviar consulta <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" /></button></div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary px-5 py-10 text-primary-foreground sm:px-8">
       <div className="mx-auto flex max-w-[1280px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
         <div>
            <a href="#inicio" data-testid="link-footer-home" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/30"><Landmark size={17} strokeWidth={1.5} aria-hidden="true" /></span><span className="leading-none"><span className="block text-[12px] font-semibold uppercase tracking-[0.17em]">Fernando Layús</span><span className="mt-1 block font-display text-base italic text-accent">Abogado penalista</span></span></a>
            <p className="mt-5 flex items-center gap-2 text-xs text-primary-foreground/55"><MapPin size={13} aria-hidden="true" /> {CONTACT.location} · Atención presencial con cita previa</p>
         </div>
         <div className="flex flex-col gap-3 text-left text-xs text-primary-foreground/60 sm:items-end sm:text-right">
           <a href={`mailto:${CONTACT.email}`} data-testid="link-footer-email" className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{CONTACT.email}</a>
           <p className="font-mono-custom text-[10px] uppercase tracking-[0.14em]">Defensa penal · Atención con reserva</p>
         </div>
       </div>
        <div className="mx-auto mt-9 flex max-w-[1280px] flex-col gap-4 border-t border-primary-foreground/15 pt-5 text-[10px] text-primary-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <p id="aviso-legal">La información de este sitio es general y no constituye asesoramiento jurídico para un caso particular.</p>
          <div className="flex gap-5 uppercase tracking-[0.12em]">
            <a href="#aviso-legal" data-testid="link-footer-legal" className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Aviso legal</a>
            <a href="#aviso-legal" data-testid="link-footer-privacy" className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Privacidad</a>
          </div>
        </div>
     </footer>
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
        {whatsappMenuOpen && (
          <div role="menu" aria-label="Opciones de contacto por WhatsApp" className="w-[min(320px,calc(100vw-2.5rem))] overflow-hidden border border-border bg-background p-2 shadow-[0_18px_45px_hsl(var(--primary)/.2)]">
             <a href="https://wa.me/543549434996?text=Hola%2C%20necesito%20asistencia%20urgente%20por%20una%20detenci%C3%B3n.%20%C2%BFPodr%C3%ADan%20ayudarme%3F" target="_blank" rel="noopener noreferrer" role="menuitem" data-testid="link-whatsapp-detention" className="flex items-center gap-3 bg-[#9f2f2f] px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#842626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><LockKeyhole size={15} aria-hidden="true" /> Detención o traslado</a>
             <a href="https://wa.me/543549434996?text=Hola%2C%20quisiera%20realizar%20una%20consulta%20general%20o%20recibir%20asesoramiento." target="_blank" rel="noopener noreferrer" role="menuitem" data-testid="link-whatsapp-general" className="mt-2 flex items-center gap-3 bg-slate-700 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><MessageCircle size={15} aria-hidden="true" /> Consulta general o asesoramiento</a>
          </div>
        )}
        <button type="button" onClick={() => setWhatsappMenuOpen((value) => !value)} aria-expanded={whatsappMenuOpen} aria-haspopup="menu" data-testid="button-floating-whatsapp" aria-label={whatsappMenuOpen ? 'Cerrar opciones de WhatsApp' : 'Abrir opciones de WhatsApp'} className="flex items-center gap-2 bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-accent-foreground shadow-[0_8px_30px_rgba(21,36,53,.18)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><MessageCircle size={17} aria-hidden="true" /><span className="hidden sm:inline">{whatsappMenuOpen ? 'Cerrar WhatsApp' : 'WhatsApp'}</span><span className="sm:hidden">WhatsApp</span></button>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/entrevista" component={EntrevistaForm} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;