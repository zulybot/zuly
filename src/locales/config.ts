import i18n from "i18n";

i18n.configure({
  locales: [ "pt-BR", "en-US", "es-ES" ],
  defaultLocale: "en-US",
  directory: "./locales",
  objectNotation: true,
  autoReload: true,
})

export default i18n;