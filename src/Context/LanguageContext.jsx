import React, { createContext, useState, useEffect } from "react";
import i18n from "i18next";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. عند إقلاع التطبيق، نبحث أولاً إن كان هناك لغة محفوظة سابقاً في المتصفح، وإلا نختار الإنجليزية كافتراضي
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("saved_lang") || "en";
  });

  const [dir, setDir] = useState(() => {
    const initialLang = localStorage.getItem("saved_lang") || "en";
    return initialLang === "ar" ? "rtl" : "ltr";
  });

  // 2. تحديث الإعدادات وتطبيقها فوراً بناءً على القيمة الابتدائية المحفوظة
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.body.dir = dir;
    document.body.style.fontFamily = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif'";
  }, [lang, dir]);

  // 3. دالة تغيير اللغة (نقوم بحفظ الخيار الجديد داخل الـ localStorage)
  const changeLanguage = (newLang) => {
    localStorage.setItem("saved_lang", newLang); // السطر السحري للحفظ في المتصفح
    
    setLang(newLang);
    const newDir = newLang === "ar" ? "rtl" : "ltr";
    setDir(newDir);
  };

  const isRtl = dir === "rtl";

  return (
    <LanguageContext.Provider value={{ lang, dir, changeLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};