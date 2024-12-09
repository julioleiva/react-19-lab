# Custom components

Los Web Components y React manejan el ciclo de vida de forma diferente, por lo que es importante estar atento a cómo se sincronizan las propiedades y los eventos entre React y el Web Component

## Propiedades complejas: Para pasar objetos complejos como propiedades, siempre es mejor hacerlo a través de referencias (ref) en lugar de directamente en JSX

### Shadow DOM: Si el Web Component usa Shadow DOM, los estilos y eventos que definas desde React podrían no afectar al contenido dentro del Shadow DOM

## Implementación

```js
import React, { useEffect, useRef } from 'react';
import './web-components/my-custom-element';

function App() {
  const customElementRef = useRef(null);

  useEffect(() => {
    // Acceder al Web Component y pasar propiedades si es necesario
    if (customElementRef.current) {
      customElementRef.current.setAttribute('message', '¡Hola desde React!');
    }

    // Escuchar eventos personalizados
    const handleCustomEvent = (event) => {
      console.log('Evento personalizado recibido:', event.detail.message);
    };

    if (customElementRef.current) {
      customElementRef.current.addEventListener('customEvent', handleCustomEvent);
    }

    return () => {
      if (customElementRef.current) {
        customElementRef.current.removeEventListener('customEvent', handleCustomEvent);
      }
    };
  }, []);

  return (
    <div>
      <h1>Integrando un Web Component en React 19</h1>
      <my-custom-element ref={customElementRef}></my-custom-element>
    </div>
  );
}

export default App;
```
