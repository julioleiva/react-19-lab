import { Suspense, useActionState } from "react";
import { useFormStatus } from "react-dom";



export function UseActionState() {
  const fetchCharacter = async (prevState, formData) => {
    const characterName = formData.get("name");

    console.log(prevState);

    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${characterName}`
    );
    
    if (!response.ok) {
      return { error: true };
    }

    const data = await response.json();
    return data;
  };

  const [characterData, formAction] = useActionState(fetchCharacter, null);

  return (
    <div>
      <form action={formAction}>
        <input
          placeholder="Buscar personaje (Ej. Rick)"
          name="name"
        />
        <SubmitButton />
      </form>

      <Suspense fallback={<div>Cargando...</div>}>
        {characterData && <ShowCharacter data={characterData} />}
      </Suspense>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Buscando..." : "Buscar"}
    </button>
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
