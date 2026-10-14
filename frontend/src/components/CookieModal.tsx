import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon } from './Icons';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'penselverket_cookie_consent';

export function CookieModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user already saved preferences
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        // ignore
      }
    }

    // Listen to open event from footer or anywhere
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-cookie-modal', handleOpen);
    return () => window.removeEventListener('open-cookie-modal', handleOpen);
  }, []);

  const saveAndClose = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    saveAndClose({ necessary: true, analytics: true, marketing: true });
  };

  const handleSaveSelected = () => {
    saveAndClose(preferences);
  };

  if (!isOpen) return null;

  return (
    <div className="cookie-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="cookie-modal">
        <button
          type="button"
          className="cookie-modal__close"
          onClick={() => setIsOpen(false)}
          aria-label="Stäng cookie-inställningar"
        >
          <CloseIcon />
        </button>

        <div className="cookie-modal__header">
          <h2 id="cookie-title">Cookie-inställningar</h2>
          <p>
            Välj vilka cookies du tillåter. Läs mer i vår{' '}
            <Link to="/integritet" onClick={() => setIsOpen(false)}>
              integritetspolicy
            </Link>
            .
          </p>
        </div>

        <div className="cookie-modal__body">
          {/* Nödvändiga */}
          <div className="cookie-item">
            <div className="cookie-item__text">
              <h3>Nödvändiga</h3>
              <p>Krävs för att sajten ska fungera, t.ex. säkerhet och dina cookie-val. Kan inte stängas av.</p>
            </div>
            <div className="cookie-item__switch cookie-item__switch--disabled" aria-label="Nödvändiga cookies (alltid aktiva)">
              <span className="cookie-switch__track is-checked">
                <span className="cookie-switch__thumb" />
              </span>
            </div>
          </div>

          {/* Analys */}
          <div className="cookie-item">
            <div className="cookie-item__text">
              <h3>Analys</h3>
              <p>Hjälper oss förstå hur sajten används så att vi kan förbättra den (Google Analytics, Plausible).</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.analytics}
              className="cookie-item__switch"
              onClick={() =>
                setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
              }
              aria-label="Tillåt analys-cookies"
            >
              <span className={`cookie-switch__track ${preferences.analytics ? 'is-checked' : ''}`}>
                <span className="cookie-switch__thumb" />
              </span>
            </button>
          </div>

          {/* Marknadsföring */}
          <div className="cookie-item">
            <div className="cookie-item__text">
              <h3>Marknadsföring</h3>
              <p>Används för att mäta och anpassa annonser i sociala medier (Meta Pixel).</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.marketing}
              className="cookie-item__switch"
              onClick={() =>
                setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
              }
              aria-label="Tillåt marknadsförings-cookies"
            >
              <span className={`cookie-switch__track ${preferences.marketing ? 'is-checked' : ''}`}>
                <span className="cookie-switch__thumb" />
              </span>
            </button>
          </div>
        </div>

        <div className="cookie-modal__footer">
          <button type="button" className="button button--secondary" onClick={handleAcceptAll}>
            Acceptera alla
          </button>
          <button type="button" className="button button--accent" onClick={handleSaveSelected}>
            Spara val
          </button>
        </div>
      </div>
    </div>
  );
}

export function openCookieModal() {
  window.dispatchEvent(new CustomEvent('open-cookie-modal'));
}
