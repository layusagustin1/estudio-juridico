import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, LockKeyhole, MapPin } from 'lucide-react';

// Completar con el checkout real de Mercado Pago antes de publicar.
export const MERCADO_PAGO_LINK = '';

const CONSULTA_VALUE = '$60.000';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  modality: '',
  reason: '',
};

export default function EntrevistaForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = ['name', 'phone', 'email', 'modality'];
    if (requiredFields.some((field) => !form[field].trim())) {
      setError('Completá todos los campos obligatorios para continuar.');
      return;
    }

    setError('');
    if (!MERCADO_PAGO_LINK) {
      setError('El pago todavía no está disponible. Escribinos para coordinar la entrevista.');
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      window.location.assign(MERCADO_PAGO_LINK);
    }, 450);
  };

  return (
    <main className="min-h-[100dvh] bg-background text-primary">
      <header className="border-b border-border bg-primary px-5 py-5 text-primary-foreground sm:px-8">
        <div className="mx-auto flex max-w-[980px] items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground/75 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <ArrowLeft size={15} aria-hidden="true" />
            Volver al sitio
          </a>
          <span className="font-display text-lg italic text-accent">Fernando Layús</span>
        </div>
      </header>

      <section className="px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-[980px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:gap-16">
          <div>
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-accent">Entrevista profesional</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[.9] tracking-[-0.04em]">Hablemos de tu situación.</h1>
            <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-muted-foreground">
              Coordiná una entrevista con Fernando Layús y recibí una primera orientación clara para definir el próximo paso.
            </p>
            <div className="mt-8 space-y-4 text-xs text-muted-foreground">
              <p className="flex items-center gap-3"><MapPin size={16} className="text-accent" aria-hidden="true" /> Presencial a coordinar o por videollamada.</p>
              <p className="flex items-center gap-3"><LockKeyhole size={16} className="text-accent" aria-hidden="true" /> La información se trata con reserva profesional.</p>
            </div>
          </div>

          <div className="border border-border bg-card p-6 shadow-[0_18px_50px_hsl(var(--primary)/.08)] sm:p-9">
            <div className="mb-7 border-b border-border pb-5">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.16em] text-accent">Datos de la entrevista</p>
              <h2 className="mt-3 font-display text-3xl leading-none">Completá tus datos</h2>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <label className="block">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Nombre completo *</span>
                <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} type="text" name="name" autoComplete="name" data-testid="input-interview-name" placeholder="Tu nombre y apellido" className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Teléfono / WhatsApp *</span>
                  <input required value={form.phone} onChange={(event) => updateField('phone', event.target.value)} type="tel" name="phone" autoComplete="tel" data-testid="input-interview-phone" placeholder="Tu número" className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" />
                </label>
                <label className="block">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Correo electrónico *</span>
                  <input required value={form.email} onChange={(event) => updateField('email', event.target.value)} type="email" name="email" autoComplete="email" data-testid="input-interview-email" placeholder="tu@email.com" className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" />
                </label>
              </div>

              <label className="block">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Modalidad *</span>
                <select required value={form.modality} onChange={(event) => updateField('modality', event.target.value)} name="modality" data-testid="select-interview-modality" className="mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-primary outline-none focus:border-accent focus:ring-0">
                  <option value="" disabled>Elegí una modalidad</option>
                  <option value="presencial">Presencial a coordinar</option>
                  <option value="videollamada">Videollamada</option>
                </select>
              </label>

              <label className="block">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Breve descripción del motivo de la consulta <span className="normal-case tracking-normal">(opcional)</span></span>
                <textarea value={form.reason} onChange={(event) => updateField('reason', event.target.value)} name="reason" rows={4} data-testid="input-interview-reason" placeholder="Podés contarnos brevemente qué necesitás conversar..." className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm leading-6 text-primary outline-none placeholder:text-muted-foreground/65 focus:border-accent focus:ring-0" />
              </label>

              {error && <p role="alert" className="border-l-2 border-[#9f2f2f] bg-[#9f2f2f]/5 px-3 py-2 text-xs text-[#842626]">{error}</p>}

              <div className="border border-border bg-secondary p-4 sm:p-5">
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Resumen de facturación</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="text-sm text-primary">Entrevista profesional</p>
                  <p className="font-display text-2xl text-primary" data-testid="text-interview-price">Valor: {CONSULTA_VALUE}</p>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">El pago se procesa de forma segura a través de Mercado Pago.</p>
              </div>

              <button type="submit" disabled={submitting} data-testid="button-interview-payment" className="group flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                <LockKeyhole size={16} aria-hidden="true" />
                {submitting ? 'Preparando el pago…' : 'Continuar al pago'}
                {!submitting && <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />}
              </button>
              <p className="flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground"><Check size={13} className="text-accent" aria-hidden="true" /> Tus datos se utilizan solo para coordinar la entrevista.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}