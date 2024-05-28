import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const TelegramContext = createContext(null)

export const TelegramProvider = ({children}) => {
  const [webApp, setWebApp] = useState(null)
  
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    const app = window?.Telegram?.WebApp;
    if (app) {
      app.ready();
      app.expand();
      setWebApp(app);
    }
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);