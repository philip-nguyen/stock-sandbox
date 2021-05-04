import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = "Mgx0dlvuQZYrKA7_C8Wt3g";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",

        ns: ["default"],
        defaultNS: "default",

        supportedLngs: ["en", "zh", "vi", "ar", "de", "ko", "fr", "ms", "bn", "it", "ja", "es", "zh-TW", "ru", "uk", "pt"],

        backend: {
            loadPath: loadPath
        }
    })