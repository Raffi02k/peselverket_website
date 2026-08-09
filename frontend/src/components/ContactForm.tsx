import { FormEvent, useMemo, useState } from 'react';
import { company } from '../content/siteContent';
import { ArrowRight, Check, Mail, Phone } from './Icons';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  preferredStart: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitState = 'idle' | 'submitting' | 'sent' | 'preview' | 'error';

const WEB3FORMS_ACCESS_KEY = 'd3b5efa0-71db-4377-adae-a614eb39b371';

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  location: '',
  projectType: '',
  preferredStart: '',
  message: '',
  consent: false,
  website: ''
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Ange ditt namn.';
  if (values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Ange ett giltigt telefonnummer.';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Ange en giltig e-postadress.';
  if (!values.projectType) errors.projectType = 'Välj typ av projekt.';
  if (values.message.trim().length < 20) errors.message = 'Beskriv projektet med minst 20 tecken.';
  if (!values.consent) errors.consent = 'Du behöver godkänna behandlingen av personuppgifter.';
  return errors;
}

function buildSubject(values: FormValues) {
  const parts = ['Ny offertforfragan', values.projectType, values.name];
  if (values.location.trim()) {
    parts.push(values.location.trim());
  }
  return parts.join(' | ');
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setServerMessage('');

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error');
      const firstError = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstError?.focus();
      return;
    }

    setSubmitState('submitting');

    // Honeypot spam check
    if (values.website) {
      setSubmitState('sent');
      setServerMessage('Tack! Din offertförfrågan har skickats.');
      setValues(initialValues);
      return;
    }

    try {
      const submission = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: buildSubject(values),
        from_name: 'Penselverket Webbplats',
        replyto: values.email,
        botcheck: values.website,
        name: values.name,
        email: values.email,
        phone: values.phone,
        location: values.location || 'Ej angivet',
        project_type: values.projectType,
        preferred_start: values.preferredStart || 'Ej angivet',
        message: values.message,
        source: 'Penselverket hemsida',
        page: typeof window !== 'undefined' ? window.location.href : 'okand sida'
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(submission)
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (payload.success) {
        setSubmitState('sent');
        setServerMessage('Tack! Din förfrågan är skickad. Penselverket kan nu kontakta dig via telefon eller e-post.');
        setValues(initialValues);
      } else {
        throw new Error(payload.message || 'Förfrågan kunde inte skickas just nu.');
      }
    } catch (error) {
      setSubmitState('error');
      setServerMessage(
        error instanceof Error
          ? error.message
          : 'Ett ovantat fel uppstod. Kontrollera din internetanslutning och forsok igen.'
      );
    }
  };

  return (
    <form className="contact-form" id="offert" noValidate onSubmit={onSubmit}>
      <div className="contact-form__intro">
        <div>
          <p className="eyebrow">Kostnadsfri offertförfrågan</p>
          <h2>Berätta om ditt projekt.</h2>
        </div>
        <p>Fält markerade med * är obligatoriska. Ju tydligare underlag, desto enklare blir nästa steg.</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Namn *</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Telefonnummer *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">E-post *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="location">Postnummer eller ort</label>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="postal-code"
            value={values.location}
            onChange={(event) => update('location', event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="projectType">Typ av projekt *</label>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(event) => update('projectType', event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'project-type-error' : undefined}
          >
            <option value="">Välj ett alternativ</option>
            <option>Invändigt måleri</option>
            <option>Utvändigt måleri</option>
            <option>Företag eller BRF</option>
            <option>Tapetsering</option>
            <option>Annat</option>
          </select>
          {errors.projectType && <span className="field-error" id="project-type-error">{errors.projectType}</span>}
        </div>

        <div className="field">
          <label htmlFor="preferredStart">Önskad ungefärlig start</label>
          <input
            id="preferredStart"
            name="preferredStart"
            type="text"
            placeholder="Exempel: oktober 2026"
            value={values.preferredStart}
            onChange={(event) => update('preferredStart', event.target.value)}
          />
        </div>

        <div className="field field--full">
          <label htmlFor="message">Beskriv projektet *</label>
          <textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Vad ska målas, ungefär hur stora är ytorna och finns det något särskilt att ta hänsyn till?"
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          />
          <span className="field-hint" id="message-hint">Lägg gärna till ungefärlig omfattning och nuvarande skick.</span>
          {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
        </div>

        <div className="field field--honeypot" aria-hidden="true">
          <label htmlFor="website">Webbplats</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </div>

        <div className="field field--full consent-field">
          <label>
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update('consent', event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
            />
            <span>
              Jag godkänner att Penselverket behandlar uppgifterna för att hantera min förfrågan. Läs mer i{' '}
              <a href="/integritet">integritetspolicyn</a>. *
            </span>
          </label>
          {errors.consent && <span className="field-error" id="consent-error">{errors.consent}</span>}
        </div>
      </div>

      <div className="contact-form__submit">
        <button className="button button--accent" type="submit" disabled={submitState === 'submitting'}>
          {submitState === 'submitting' ? 'Skickar…' : 'Skicka offertförfrågan'}
          {submitState === 'submitting' ? <span className="spinner" aria-hidden="true" /> : <ArrowRight />}
        </button>
        <p>
          Du kan också ringa <a href={`tel:${company.phoneHref}`}><Phone />{company.phoneDisplay}</a> eller mejla{' '}
          <a href={`mailto:${company.email}`}><Mail />{company.email}</a>.
        </p>
      </div>

      <p className="small-copy">
        Formuläret skickas säkert via Web3Forms och går direkt vidare till Penselverkets e-post.
      </p>

      {hasErrors && submitState === 'error' && !serverMessage && (
        <div className="form-message form-message--error" role="alert">
          Kontrollera de markerade fälten och försök igen.
        </div>
      )}

      {serverMessage && (
        <div
          className={`form-message ${submitState === 'sent' ? 'form-message--success' : submitState === 'preview' ? 'form-message--preview' : 'form-message--error'}`}
          role="status"
        >
          {submitState === 'sent' && <Check />}
          <div>
            <strong>{submitState === 'sent' ? 'Förfrågan skickad' : submitState === 'preview' ? 'Förhandsvisningsläge' : 'Något gick fel'}</strong>
            <p>{serverMessage}</p>
          </div>
        </div>
      )}
    </form>
  );
}
