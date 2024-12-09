import { Suspense, useState, use } from "react";

export function UseFetchExample() {
  const [name, setName] = useState("");
  const [characterName, setCharacterName] = useState(null);

  const fetchCharacter = () => {
    return fetch(
      `https://rickandmortyapi.com/api/character/?name=${characterName}`
    ).then((res) => {
      if (res.ok) return res.json();
      return { error: true };
    });
  };

  const handleSearch = () => {
    setCharacterName(name);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Buscar personaje (Ej. Rick)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Buscar
        </button>
      </form>

      <Suspense fallback={<div>Cargando...</div>}>
        {characterName && <ShowCharacter characterPromise={fetchCharacter()} />}
      </Suspense>
    </div>
  );
}

function ShowCharacter({ characterPromise }) {
  const data = use(characterPromise);
  
  if (data.error) {
    return <div>Personaje no encontrado</div>;
  }

  return (
    <div>
      {data.results.map((character) => (
        <div key={character.id}>
          <h3>{character.name}</h3>
          <img src={character.image} alt={character.name} />
          <p>Estado: {character.status}</p>
          <p>Especie: {character.species}</p>
        </div>
      ))}
    </div>
  );
}


// ------------------------------------------------------------

// import { version } from "react";
// import reactLogo from "./assets/react.svg";
// import { UseFetchExample } from "./4_apiUse/UseFetchExample";
// import "./App.css";

// function App() {

//   return (
//     <>
//       <title>{`React ${version}`}</title>
//       <div>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <small>React {version}</small>
//       <UseFetchExample />
//     </>
//   );
// }

// export default App;
