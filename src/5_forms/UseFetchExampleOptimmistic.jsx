import { Suspense, useState, startTransition } from "react";
import { useOptimistic } from "react";

export function UseFetchExampleOptimmistic() {
  const [characterData, setCharacterData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: `Buscando: ${newMessage}`,
        sending: true,
      },
    ]
  );

  const fetchCharacter = async (characterName) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${characterName}`
    );

    if (!response.ok) {
      throw new Error("Personaje no encontrado");
    }

    const data = await response.json();
    return data;
  };

  const sendFormData = async (formData) => {
    const characterName = formData.get("name");

    // startTransition para manejar la actualización optimista
    startTransition(() => {
      addOptimisticMessage(characterName); // Añadimos el mensaje optimista
    });

    try {
      const data = await fetchCharacter(characterName);
      setCharacterData(data);
      setMessages((prev) => [
        ...prev,
        { text: `Personaje encontrado: ${characterName}`, sending: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${error.message}`, sending: false },
      ]);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          sendFormData(formData);
        }}
      >
        <input
          placeholder="Buscar personaje (Ej. Rick)"
          name="name"
        />
        <button type="submit">Buscar</button>
      </form>

      <Suspense fallback={<div>Cargando...</div>}>
        {optimisticMessages.map((message, index) => (
          <div key={index}>
            {message.text}
            {!!message.sending && <small> (Buscando...)</small>}
          </div>
        ))}
      </Suspense>

      {characterData && <ShowCharacter data={characterData} />}
    </div>
  );
}

export function ShowCharacter({ data }) {
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

export default UseFetchExampleOptimmistic;
