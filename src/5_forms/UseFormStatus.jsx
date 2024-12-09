import { useFormStatus } from "react-dom";
import { useEffect } from "react";

function Submit() {
  const { pending, data, method, action } = useFormStatus();

  useEffect(() => {
    console.log("Form Status:");
    console.log("Pending:", pending);
    if (data) {
      console.log("Data:", Object.fromEntries(data));
    }
    console.log("Method:", method);
    console.log("Action:", action);
  }, [pending, data, method, action]);

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

const formAction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

const UseFormStatus = () => {
  return (
    <form action={formAction} method="POST">
      <input type="text" name="name" placeholder="Your name" />
      <input type="email" name="email" placeholder="Your email" />
      <Submit />
    </form>
  );
};

export default UseFormStatus;



// Control total del envío: Permite hacer validaciones, llamadas API o cualquier lógica antes de procesar el envío del formulario.

// Asincronía: Al permitir usar funciones asíncronas, es posible gestionar estados como el de carga (pending), manejar errores, etc., sin bloquear la interfaz.

// Evitar redireccionamientos: Ya no es necesario enviar el formulario a una URL externa para manejar el procesamiento, lo que permite que toda la lógica permanezca en l aplicación React.