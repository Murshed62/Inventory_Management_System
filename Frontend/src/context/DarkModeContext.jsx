import { useContext, useEffect, useState, createContext } from 'react';

const darkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    let isDarkMode = localStorage.getItem('isDarkMode');
    if (isDarkMode === 'true') return true;
    else if (isDarkMode === 'false') return false;
    isDarkMode = window.matchMedia('(prefers-color-scheme:dark').matches;
    localStorage.setItem('isDarkMode', isDarkMode);
    return isDarkMode;
  });
  useEffect(() => {
    if (isDarkMode) document.documentElement.dataset.theme = 'IMS-Dark';
    else document.documentElement.dataset.theme = 'IMS-Light';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    localStorage.setItem('isDarkMode', !isDarkMode);
    setIsDarkMode((isDark) => !isDark);
  };
  return (
    <darkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(darkModeContext);
  if (context === undefined)
    throw new Error('Context is used outside of prodiver');
  return context;
};

export { DarkModeProvider, useDarkMode };
