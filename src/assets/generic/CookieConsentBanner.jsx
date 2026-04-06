import React, { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "aks_cookie_consent_v1";

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!savedConsent) {
        setIsVisible(true);
      }
    } catch (error) {
      // If storage is blocked, keep banner visible for transparency.
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (choice) => {
    try {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({
          choice,
          updatedAt: Date.now(),
        }),
      );
    } catch (error) {
      // Ignore storage errors and still hide banner in current session.
    }

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-[60] w-[92vw] max-w-md rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-sm">
      <h3 className="text-sm font-semibold text-slate-900">Cookies no site</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">
        Usamos cookies para melhorar desempenho, acelerar carregamentos e
        oferecer uma experiencia mais fluida no site.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => saveConsent("necessary")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Apenas necessarios
        </button>
        <button
          type="button"
          onClick={() => saveConsent("accepted")}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
