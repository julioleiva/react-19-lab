

## Funciones de optimización (preload, prefetchDNS, preinit, preconnect) desde react-dom.

1. **`prefetchDNS()`**: Resuelve anticipadamente el DNS de `https://cdn.jsdelivr.net`, reduciendo la latencia cuando se necesiten recursos de ese servidor.
   
   ```js
   prefetchDNS("https://cdn.jsdelivr.net");
   ```

2. **`preload()`**: Pre-carga recursos, como la hoja de estilos de PicoCSS y el logo de React, para que estén listos antes de que el navegador los necesite.

   ```js
   preload("https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css", { as: "style" });
   preload(reactLogo, { as: "image" });
   ```

3. **`preinit()`**: No solo descarga, sino que también ejecuta un script o aplica una hoja de estilos tan pronto como se descarguen. En este ejemplo, un script y una hoja de estilos se descargan y ejecutan inmediatamente.

   ```js
   preinit("https://example.com/script.js", { as: "script" });
   preinit("https://example.com/extraStyles.css", { as: "style", precedence: "high" });
   ```

   - **`precedence: "high"`**: Prioriza esta hoja de estilos sobre otras que tengan menor precedencia, lo que significa que sus estilos pueden sobrescribir los de otras hojas con precedencia más baja.

4. **`preconnect()`**: Establece una conexión anticipada al servidor `https://cdn.jsdelivr.net`, lo que puede reducir la latencia al cargar recursos de este servidor.

   ```js
   preconnect("https://cdn.jsdelivr.net");
   ```

### Uso en eventos:
Estas funciones también pueden ser utilizadas dentro de manejadores de eventos para que la carga anticipada ocurra cuando sea necesario. Por ejemplo:

```jsx
import { preconnect, preinit } from 'react-dom';

function StartButton() {
  const onClick = () => {
    // Preconnect a un servidor cuando el usuario hace clic
    preconnect("https://example.com");

    // Preinit de un script justo antes de iniciar un proceso
    preinit("https://example.com/wizard.js", { as: "script" });
    startWizard();
  };

  return <button onClick={onClick}>Start Wizard</button>;
}
```

### Ventajas:
- **`prefetchDNS`**: Acelera la resolución DNS de servidores externos, ideal para cuando esperas realizar múltiples solicitudes a un servidor externo.
- **`preload`**: Descarga recursos anticipadamente, útil para imágenes, fuentes, y hojas de estilos.
- **`preinit`**: Ejecuta recursos externos como scripts o aplica estilos tan pronto como se descarguen, reduciendo el tiempo de ejecución de funciones clave.
- **`preconnect`**: Establece conexiones tempranas con servidores externos, ideal para sitios que cargan recursos de múltiples dominios.

Usando estas funciones de `react-dom`, optimizas el rendimiento de tu aplicación anticipando la carga, conexión y ejecución de recursos.