import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ptBrLogin from "../_locales/pt_br/login.json";
import ptBrRecoverPassword from "../_locales/pt_br/recoverPassword.json";

import enUsLogin from "../_locales/en_us/login.json";
import enUsRecoverPassword from "../_locales/en_us/recoverPassword.json";

import enUsHome from "../_locales/en_us/home.json";
import ptBrHome from "../_locales/pt_br/home.json";

i18n.use(initReactI18next).init({
  lng: "pt_br",
  fallbacklng: "pt_br",
  resources: {
    en_us: {
      translation: {
        login: enUsLogin,
        recoverPassword: enUsRecoverPassword,
        home: enUsHome,
      },
    },
    pt_br: {
      translation: {
        login: ptBrLogin,
        recoverPassword: ptBrRecoverPassword,
        home: ptBrHome,
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
