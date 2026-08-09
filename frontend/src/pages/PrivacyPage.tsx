import { company } from '../content/siteContent';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';

export function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Integritetspolicy | Penselverket AB"
        description="Information om hur Penselverket AB behandlar personuppgifter i samband med kontakt- och offertförfrågningar."
      />
      <section className="legal-page section-pad">
        <div className="container legal-page__grid">
          <Reveal>
            <p className="eyebrow">Integritet</p>
            <h1>Så behandlas dina uppgifter.</h1>
            <p className="legal-page__updated">Senast uppdaterad: augusti 2026</p>
          </Reveal>
          <Reveal delay={100}>
            <article className="legal-copy">
              <h2>Personuppgiftsansvarig</h2>
              <p>{company.legalName}, organisationsnummer {company.organisationNumber}, är ansvarig för de personuppgifter som lämnas via webbplatsen.</p>

              <h2>Vilka uppgifter samlas in?</h2>
              <p>Kontaktformuläret kan samla in namn, telefonnummer, e-postadress, ort, projekttyp, önskad starttid och den projektbeskrivning du själv lämnar.</p>

              <h2>Varför behandlas uppgifterna?</h2>
              <p>Uppgifterna används för att läsa, bedöma och besvara din kontakt- eller offertförfrågan samt för att kunna följa upp den fortsatta dialogen.</p>

              <h2>Hur länge sparas uppgifterna?</h2>
              <p>Uppgifterna sparas inte längre än vad som behövs för att hantera förfrågan och eventuella krav som följer av avtal, bokföring eller annan tillämplig lagstiftning.</p>

              <h2>Delning med andra</h2>
              <p>Uppgifter säljs inte. Tekniska leverantörer kan behandla uppgifter för att driva e-post och webbplats, men endast i den omfattning som krävs för tjänsten.</p>

              <h2>Dina rättigheter</h2>
              <p>Du kan begära information om vilka uppgifter som behandlas, rättelse av felaktiga uppgifter eller radering när det är tillämpligt.</p>

              <h2>Kontakt i integritetsfrågor</h2>
              <p>Kontakta <a href={`mailto:${company.email}`}>{company.email}</a> och skriv att ärendet gäller personuppgifter.</p>

              <h2>Cookies och analys</h2>
              <p>Denna version av webbplatsen använder inga marknadsföringscookies eller externa analysspårare som standard. Därför visas ingen cookie-banner.</p>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
