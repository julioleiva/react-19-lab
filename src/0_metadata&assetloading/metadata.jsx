import { useState } from "react";
import { preload, prefetchDNS, preinit, preconnect } from 'react-dom';
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // Prefetch DNS del servidor de donde esperas cargar recursos
  prefetchDNS("https://cdn.jsdelivr.net");

  // Preload de la hoja de estilos y del logo
  preload("https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css", { as: "style" });
  preload(reactLogo, { as: "image" });

  // Preinit de un script para que se descargue y ejecute de inmediato
  preinit("https://example.com/script.js", { as: "script" });

  // Preinit de una hoja de estilos con una alta prioridad
  preinit("https://example.com/extraStyles.css", { as: "style", precedence: "high" });

  // Preconnect al servidor de donde se esperan recursos
  preconnect("https://cdn.jsdelivr.net");

  return (
    <>
      <title>React App</title>

      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <small>React Version</small>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
