// src/context/LanguageContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { Language, translations } from "@/translations/translations";

// Definimos la forma del contexto
interface LanguageContextType {
  language: Language;
  t: typeof translations.es;
  toggleLanguage: () => void;
}

// Creamos el contexto
const LanguageContext = createContext<LanguageContextType | null>(null);

// Este componente envuelve toda la app y provee el idioma
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Estado del idioma actual, empieza en español
  const [language, setLanguage] = useState<Language>("es");

  // Función para cambiar entre español e inglés
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  // t son las traducciones del idioma actual
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
// En vez de escribir useContext(LanguageContext) en cada archivo,
// escribimos useLanguage()
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
}