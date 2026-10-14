import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Phone, Plus } from '../components/Icons';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { company } from '../content/siteContent';

type FaqCategory = {
  id: string;
  name: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

const faqCategories: FaqCategory[] = [
  {
    id: 'priser-rot',
    name: 'Priser & ROT-avdrag',
    items: [
      {
        question: 'Är offertförfrågan kostnadsfri?',
        answer:
          'Ja, alltid! Vi lämnar kostnadsfria offerter för både privatpersoner, BRF:er och företag. Vi kommer gärna ut på ett kostnadsfritt hembesök för att bedöma ytorna och lämna ett fast och tydligt pris.'
      },
      {
        question: 'Hur fungerar ROT-avdraget för måleri?',
        answer:
          'Som privatperson kan du få upp till 30 % i skattereduktion på arbetskostnaden för måleri i din bostad eller ditt fritidshus. Vi drar av beloppet direkt på fakturan och sköter all administration gentemot Skatteverket.'
      },
      {
        question: 'Jobbar ni med fasta priser eller löpande timpris?',
        answer:
          'Vi föredrar fast pris i våra offerter så att du som kund vet exakt vad arbetet kommer att kosta utan oväntade tillägg eller överraskningar.'
      },
      {
        question: 'Tillkommer några dolda avgifter som milersättning eller städkostnad?',
        answer:
          'Nej. Våra offerter är fullt specificerade och inkluderar material, underarbete, skyddstäckning, måleri och städning.'
      }
    ]
  },
  {
    id: 'process',
    name: 'Arbetsprocess & Hembesök',
    items: [
      {
        question: 'Hur går ett hembesök till?',
        answer:
          'Vi bokar en tid som passar dig, går igenom rummen eller fasaden, granskar underlagets skick och lyssnar på dina önskemål kring färg och glans. Efter besöket tar vi fram en tydlig offert inom 24–48 timmar.'
      },
      {
        question: 'Måste jag tömma rummet eller flytta möbler innan ni kommer?',
        answer:
          'Det underlättar om mindre prydnader, tavlor och textilier är bortplockade. Större möbler kan ofta samlas i mitten av rummet, så hjälper vi till att täcka in dem ordentligt med kraftig skyddsplast innan arbetet startar.'
      },
      {
        question: 'Hur lång tid brukar ett måleriprojekt ta?',
        answer:
          'Ett enskilt rum tar normalt 2–3 arbetsdagar inklusive torktider för spackel och grundfärg. En hel lägenhet eller villa tar vanligtvis 1–2 veckor. Vi anger alltid en tydlig tidsplan i offerten.'
      },
      {
        question: 'Vilka områden arbetar ni i?',
        answer:
          'Vi har vår hemmabas i Uddevalla och tar regelbundet uppdrag i Trollhättan, Vänersborg, Ljungskile, Lysekil, Stenungsund, Orust, Göteborg och övriga Bohuslän och Västra Götaland.'
      }
    ]
  },
  {
    id: 'material',
    name: 'Underarbete & Färgval',
    items: [
      {
        question: 'Varför är underarbetet så viktigt?',
        answer:
          'Slutresultatet blir aldrig bättre än underlaget. Därför lägger vi stor omsorg på noggrann tvätt, skrapning, spackling och slipning innan måleriet påbörjas. Det ger perfekt släta ytor och maximal livslängd.'
      },
      {
        question: 'Vilka färgmärken och produkter använder ni?',
        answer:
          'Vi använder uteslutande beprövade proffsprodukter från marknadsledande tillverkare (t.ex. Jotun, Alcro och Nordsjö) som är slitstarka, miljömärkta och anpassade för svenskt klimat.'
      },
      {
        question: 'Kan ni hjälpa till att välja kulörer och glansgrad?',
        answer:
          'Ja, absolut! Vi har stor erfarenhet av hur olika kulörer och glansgrader upplevs i olika ljusförhållanden och hjälper gärna till med rådgivning och färgprover.'
      }
    ]
  },
  {
    id: 'garanti',
    name: 'Garanti & Företag/BRF',
    items: [
      {
        question: 'Har ni ansvarsförsäkring och F-skatt?',
        answer:
          'Ja, Penselverket AB är godkänt för F-skatt, momsregistrerat och har full ansvarsförsäkring via etablerat försäkringsbolag för din trygghet.'
      },
      {
        question: 'Uför ni måleri för bostadsrättsföreningar och företag?',
        answer:
          'Ja, vi utför regelbundet måleri av trapphus, gemensamma ytor, källargångar, kontor och kommersiella fastigheter med tydlig tidsplanering som minimerar driftstörningar.'
      },
      {
        question: 'Vad händer om jag upptäcker något som behöver åtgärdas efteråt?',
        answer:
          'Vi genomför alltid en gemensam slutkontroll på plats innan fakturering. Skulle du mot förmodan upptäcka något i efterhand åtgärdar vi det snabbt och utan krångel enligt vår nöjd kund-garanti.'
      }
    ]
  }
];

export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'priser-rot-0': true,
    'process-0': true
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories =
    activeCategory === 'all'
      ? faqCategories
      : faqCategories.filter((c) => c.id === activeCategory);

  return (
    <>
      <PageMeta
        title="Vanliga frågor & svar (FAQ) | Penselverket AB"
        description="Få svar på dina frågor om måleritjänster, priser, ROT-avdrag, underarbete och hur vi arbetar på Penselverket AB."
      />

      <section className="legal-hero">
        <div className="container">
          <div className="legal-meta-bar">
            <span>KUNDSERVICE</span>
            <span className="legal-meta-bar__sep">·</span>
            <span>FAQ</span>
            <span className="legal-meta-bar__sep">·</span>
            <span>SVARSGARANTI 24H</span>
          </div>

          <Reveal>
            <p className="eyebrow">VANLIGA FRÅGOR & SVAR</p>
            <h1 className="legal-hero__title">Allt du behöver veta om Penselverket.</h1>
            <p className="legal-hero__lead">
              Här har vi samlat de vanligaste frågorna och svaren kring hur vi lämnar offerter,
              räknar ut ROT-avdrag, genomför hembesök och säkerställer ett perfekt resultat.
            </p>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="faq-category-pills" role="tablist" aria-label="Filtrera frågor">
            <button
              type="button"
              className={`faq-pill ${activeCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Alla frågor
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-pill ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Questions */}
      <section className="faq-questions-section section--sand">
        <div className="container" style={{ maxWidth: '920px' }}>
          {filteredCategories.map((category) => (
            <div key={category.id} className="faq-category-group">
              <h2 className="faq-category-title">{category.name}</h2>
              <div className="faq-category-list">
                {category.items.map((item, idx) => {
                  const key = `${category.id}-${idx}`;
                  const isOpen = Boolean(openItems[key]);

                  return (
                    <Reveal key={key} delay={idx * 40}>
                      <div className={`faq-card-item ${isOpen ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          className="faq-card-trigger"
                          onClick={() => toggleItem(key)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.question}</span>
                          <span className={`faq-card-icon ${isOpen ? 'is-rotated' : ''}`} aria-hidden="true">
                            <Plus />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="faq-card-content">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="legal-rights-section">
        <div className="container">
          <div className="legal-two-col">
            <Reveal>
              <div>
                <p className="eyebrow">HITTAR DU INTE DITT SVAR?</p>
                <h2>Vi finns här för att svara på dina frågor</h2>
                <p className="lead-copy">
                  Varje projekt är unikt. Beskriv vad du vill ha hjälp med så återkommer vi med personlig rådgivning och en kostnadsfri offert inom 24 timmar.
                </p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link to="/kontakt#offert" className="button button--accent">
                    Begär kostnadsfri offert <ArrowRight />
                  </Link>
                  <a href={`tel:${company.phoneHref}`} className="button button--secondary">
                    Ring {company.phoneDisplay} <Phone />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="legal-cookie-box">
                <p className="eyebrow">DIREKTKONTAKT</p>
                <h3>Prata med målaren direkt</h3>
                <p>
                  Du är alltid välkommen att mejla eller slå en signal till Oliver för frågor om underlag, färg och upplägg.
                </p>
                <ul className="check-list" style={{ marginTop: '18px' }}>
                  <li><strong>Telefon:</strong> <a href={`tel:${company.phoneHref}`}>{company.phoneDisplay}</a></li>
                  <li><strong>E-post:</strong> <a href={`mailto:${company.email}`}>{company.email}</a></li>
                  <li><strong>Plats:</strong> {company.location}</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
