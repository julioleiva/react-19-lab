import { createContext, useState, use } from "react";
import "./theme.css";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

// --------------------------------------------

const Card = () => {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <>
      {/* NO FUNCIONA */}
      {/* <link
      rel="stylesheet"
      href="./theme.css"
    /> */}
      <div className={`card ${theme === "light" ? "light" : "dark"}`}>
        <h1>Theme Card</h1>
        <p>Hello!! use() hook</p>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>
    </>
  );
};

//   --------------------------------------------

const Theme = () => {
  return (
    <ThemeProvider>
      <Card />
    </ThemeProvider>
  );
};

export { Theme };
