import { en } from "./en";
import { id } from "./id";
import { ru } from "./ru";
import { zh } from "./zh";

export const translations = { en, id, ru, zh };
export type LanguageCode = keyof typeof translations;

export function t(path: string, lang: LanguageCode = "en") {
  return path.split(".").reduce<unknown>((value, key) => {
    if (value && typeof value === "object" && key in value) {
      return (value as Record<string, unknown>)[key];
    }
    return undefined;
  }, translations[lang]) || path;
}
