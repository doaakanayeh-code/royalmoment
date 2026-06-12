import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // جلب الثيم المحفوظ من المتصفح، أو اعتماد "light" كوضع افتراضي
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("app_mode") || "light";
  });

  // حفظ الثيم الجديد في الـ localStorage كلما تغير
  useEffect(() => {
    localStorage.setItem("app_mode", mode);
  }, [mode]);

  // دالة ذكية لتبديل الوضع بسهولة
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};