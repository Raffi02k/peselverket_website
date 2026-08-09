import type { Service } from '../types';

export const company = {
  legalName: 'Penselverket AB',
  displayName: 'Penselverket',
  contactName: 'Oliver Bingmark',
  phoneDisplay: '070-660 40 49',
  phoneHref: '+46706604049',
  email: 'penselverket@hotmail.com',
  instagramHandle: '@penselverket',
  instagramUrl: 'https://www.instagram.com/penselverket/',
  organisationNumber: '559595-4453',
  location: 'Uddevalla, Västra Götaland',
  serviceArea: 'Uddevalla med omnejd och övriga Västra Götaland efter överenskommelse.'
};

export const services: Service[] = [
  {
    id: 'invandigt',
    title: 'Invändigt måleri',
    shortTitle: 'Invändigt',
    description:
      'Väggar, tak och snickerier med ett noggrant underarbete som ger jämna ytor och ett lugnt helhetsintryck.',
    details: [
      'Målning av väggar och tak',
      'Snickerier, lister och dörrar',
      'Spackling, slipning och grundmålning',
      'Tapetsering efter överenskommelse'
    ],
    image: '/assets/project-kitchen.webp',
    visual: 'image'
  },
  {
    id: 'utvandigt',
    title: 'Utvändigt måleri',
    shortTitle: 'Utvändigt',
    description:
      'Fasader, fönster och utvändiga detaljer behandlas utifrån underlag, skick och projektets förutsättningar.',
    details: [
      'Fasadmålning',
      'Fönster och utvändiga snickerier',
      'Tvätt, skrapning och grundarbete',
      'Kulör- och materialdialog'
    ],
    image: '/assets/service-utvandigt.webp',
    visual: 'image'
  },
  {
    id: 'foretag-brf',
    title: 'Företag & bostadsrättsföreningar',
    shortTitle: 'Företag & BRF',
    description:
      'Planerade måleriinsatser för kontor, fastigheter, gemensamma ytor och verksamhetsmiljöer.',
    details: [
      'Kontor och lokaler',
      'Trapphus och gemensamma utrymmen',
      'Löpande underhåll',
      'Tydlig planering kring verksamheten'
    ],
    image: '/assets/service-foretag-brf.webp',
    visual: 'image'
  }
];

export const processSteps = [
  {
    number: '01',
    title: 'Berätta om projektet',
    text: 'Kontakta Penselverket och beskriv vad som ska målas, var projektet finns och ungefär när arbetet behöver genomföras.'
  },
  {
    number: '02',
    title: 'Genomgång & offert',
    text: 'Omfattning, ytor och förutsättningar gås igenom. Du får ett tydligt upplägg och en offert att ta ställning till.'
  },
  {
    number: '03',
    title: 'Förberedelse & måleri',
    text: 'Ytor skyddas och förbereds utifrån projektets behov. Därefter genomförs måleriarbetet metodiskt och med fokus på detaljerna.'
  },
  {
    number: '04',
    title: 'Slutkontroll & överlämning',
    text: 'Det färdiga arbetet kontrolleras och gås igenom innan projektet avslutas.'
  }
];

export const faqItems = [
  {
    question: 'Vilka områden arbetar Penselverket i?',
    answer:
      'Penselverket utgår från Uddevalla och tar uppdrag i närområdet och andra delar av Västra Götaland efter överenskommelse.'
  },
  {
    question: 'Är offertförfrågan kostnadsfri?',
    answer:
      'Ja. Du kan skicka in en kostnadsfri offertförfrågan med information om projektet. Därefter bedöms vilket underlag som behövs för att lämna en tydlig offert.'
  },
  {
    question: 'Kan jag använda ROT-avdrag?',
    answer:
      'För godkända måleriarbeten kan privatpersoner ha rätt till upp till 30 procent skattereduktion på arbetskostnaden. Rätten till avdrag beror på projektet, bostaden och dina personliga förutsättningar.'
  },
  {
    question: 'Vad kan ingå i underarbetet?',
    answer:
      'Det beror på underlaget och kan exempelvis omfatta skyddstäckning, rengöring, slipning, spackling, lagning och grundmålning.'
  },
  {
    question: 'Hur bokar jag ett arbete?',
    answer:
      'Kontakta Penselverket via telefon, e-post eller offertformuläret och beskriv vad du behöver hjälp med.'
  }
];
