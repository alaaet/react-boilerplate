import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

function getLang()
{
 if (navigator.languages != undefined) 
 return navigator.languages[0]; 
 else 
 return navigator.language;
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: getLang(),
    debug: false,
    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/public/locales/{{lng}}/{{ns}}.json",
    },
  });

export { i18n };
