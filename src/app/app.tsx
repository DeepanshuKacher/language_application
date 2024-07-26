"use client";

import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { getLocalStorage, setLocalStorage, Theme, ThemeContext } from "@/utils";
import { NavBar } from "@components/NavBar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    (async () => {
      const retreveValue: any = await getLocalStorage("theme");
      if (retreveValue) {
        setTheme(retreveValue);
      }

      setLoading(false);
    })();
  }, []);

  const toggleDarkMode = async () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    await setLocalStorage("theme", theme);

    const data = await getLocalStorage("theme");
  };

  if (loading)
    return (
      <html lang="en">
        <body className={inter.className}>
          <Container
            style={{
              height: "100vh",
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner />
          </Container>
        </body>
      </html>
    );
  else {
    return (
      <html lang="en" data-bs-theme={theme}>
        <body className={inter.className}>
          <ThemeContext.Provider
            value={{
              theme,
              toggleTheme: toggleDarkMode,
            }}
          >
            <UserProvider>
              <NavBar />
              {children}
            </UserProvider>
          </ThemeContext.Provider>
        </body>
      </html>
    );
  }
};

export default App;
