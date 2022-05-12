import fs from "fs"

const ptLocale = JSON.parse(fs.readFileSync("./src/locales/pt-BR.json", "utf8"));
const enLocale = JSON.parse(fs.readFileSync("./src/locales/en-US.json", "utf8"));
const esLocale = JSON.parse(fs.readFileSync("./src/locales/es-ES.json", "utf8"));

interface Locales {
    [locale: string]: Record<string, string>
}

const Locales: Locales = {
  "pt_br": ptLocale,
  "en_us": enLocale,
  "es_es": esLocale,
}

export default Locales;