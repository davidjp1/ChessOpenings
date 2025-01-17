import { useEffect, useState } from 'react';

import CookieWarning from '../components/utils/CookieWarning';
import Navbar from '../components/navbar/Navbar';
import { analytics } from '../firebase';
import { DataProvider } from '../context/data-context';
import { SettingsProvider } from '../context/settings-context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [showCookieWarning, setShowCookieWarning] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showWarning = window.localStorage.getItem('cookieWarning');
      setShowCookieWarning(showWarning === null);
      analytics();
    }
  }, []);

  function handleCookieWarning() {
    window.localStorage.setItem('cookieWarning', false);
    setShowCookieWarning(false);
  }

  return (
    <SettingsProvider>
      <div className="app">
        <Navbar />
        <div className="main">
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </div>
        {showCookieWarning && (
          <CookieWarning
            onConfirm={handleCookieWarning}
            text="This site uses local storage and cookies to improve the user experience and provide some functionality. By continuing to use the site you agree that you are comfortable with this. Information about what is stored is listed on the help page."
            buttonText="Got it"
            customButtonStyles={{ maxWidth: '300px', marginTop: '10px', textAlign: 'center' }}
          />
        )}
      </div>
    </SettingsProvider>
  );
}

export default MyApp;
