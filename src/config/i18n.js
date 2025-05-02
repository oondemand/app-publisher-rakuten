import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ptBrLogin from "../_locales/pt_br/login.json";
import ptBrRecoverPassword from "../_locales/pt_br/recoverPassword.json";

import enUsLogin from "../_locales/en_us/login.json";
import enUsRecoverPassword from "../_locales/en_us/recoverPassword.json";

import enUsHome from "../_locales/en_us/home.json";
import ptBrHome from "../_locales/pt_br/home.json";
import ptBrTaxDocuments from "../_locales/pt_br/taxDocuments.json";
import enUsTaxDocuments from "../_locales/en_us/taxDocuments.json";
function loadInitialLanguage() {
  const localStorageLang = localStorage.getItem("@app-publisher-language");

  if (localStorageLang) {
    return localStorageLang;
  }

  const implementedLanguages = ["pt-BR", "en-US"];
  const browserLang = navigator.language;

  if (!implementedLanguages.includes(browserLang)) return "pt-BR";

  return implementedLanguages;
}

i18n.use(initReactI18next).init({
  lng: loadInitialLanguage() ?? "pt-BR",
  fallbacklng: "pt-BR",
  resources: {
    "en-US": {
      translation: {
        login: enUsLogin,
        recoverPassword: enUsRecoverPassword,
        home: enUsHome,
        taxDocuments: enUsTaxDocuments,
      },
    },
    "pt-BR": {
      translation: {
        login: ptBrLogin,
        recoverPassword: ptBrRecoverPassword,
        home: ptBrHome,
        taxDocuments: ptBrTaxDocuments,
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
