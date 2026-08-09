import { useState } from 'react';
import { faqItems } from '../content/siteContent';
import { Plus } from './Icons';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqItems.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div className={`faq-item ${open ? 'is-open' : ''}`} key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <Plus />
              </button>
            </h3>
            <div id={panelId} className="faq-panel" role="region" aria-labelledby={buttonId} hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
