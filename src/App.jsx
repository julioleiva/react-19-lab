import { version } from "react";
import reactLogo from "./assets/react.svg";
import UseFetchExampleOptimmistic from "./5_forms/UseFetchExampleOptimmistic";

function App() {
  return (
    <>
      <title>{`React ${version}`}</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
      />
      <link
        rel="stylesheet"
        href="../src/App.css"
      />
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <small>React {version}</small>
      <UseFetchExampleOptimmistic />
    </>
  );
}

export default App;
