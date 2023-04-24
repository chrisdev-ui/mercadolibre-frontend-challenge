# Project Documentation: Mercadolibre Vite App

## ¿Por qué elegimos Vite como entorno de construcción para nuestra aplicación web?

[Vite](https://vitejs.dev/guide/) es un entorno de construcción rápido y liviano para aplicaciones web modernas. Se utiliza en este proyecto para compilar y empaquetar el código fuente del lado del cliente y del lado del servidor. Además, Vite tiene integración con React y otros frameworks populares, lo que lo hace una buena opción para aplicaciones modernas de una sola página (SPA) que requieren un tiempo de construcción rápido y un proceso de desarrollo ágil.

En particular, en este proyecto se utilizó Vite para:

Compilar y optimizar el código de React del lado del cliente y del servidor, utilizando el plugin @vitejs/plugin-react.
Generar diferentes archivos de salida para el lado del cliente y del servidor, mediante los scripts build:client y build:server.
Proporcionar una experiencia de desarrollo rápida y fluida con vite preview y vite build.
Permitir la integración con herramientas de pruebas como vitest.
En resumen, Vite es una herramienta esencial para construir aplicaciones modernas de una sola página (SPA) de manera eficiente, y permite una experiencia de desarrollo ágil y rápida.

## Requerimientos

- Caja de búsqueda

- Resultados de la búsqueda

- Detalle del producto

Las vistas son navegables de manera independiente y cuentan con su propia url:

- Caja de Búsqueda: ​ “/”

- Resultados de la búsqueda:​ “/items?search=”

- Detalle del producto: ​ “/items/:id”

En la vista de caja de búsqueda, debería poder ingresar el producto a buscar y al enviar el formulario navegar a la vista de Resultados de búsqueda, visualizando solo 4 productos. Luego, al hacer clic sobre uno de ellos,
debería navegar a la vista de Detalle de Producto.

Dado un id de producto, debería poder ingresar directamente a la vista de detalle de producto.

## Instalación

Asegúrate de tener instalado [Node.js](https://nodejs.org/en) en tu equipo.

```javascript
$ node -v
```

Clona este repositorio en tu ordernador, entra a la carpeta `mercadolibre-vite-app`, instala las dependencias y ejecuta el proyecto en modo de desarrollo con los siguientes comandos:

```javascript
$ cd mercadolibre-vite-app
$ npm install
$ npm run dev
```

## Scripts npm

```javascript
$ npm run dev
```

- Inicia el servidor en modo de desarrollo.

```javascript
$ npm run build
```

- Limpia la carpeta dist y compila tanto el cliente como el servidor en la carpeta dist.

```javascript
$ npm run build:client
```

- Compila el cliente y lo guarda en la carpeta dist/client.

```javascript
$ npm run build:server
```

- Compila el servidor en el modo SSR y lo guarda en la carpeta dist/server.

```javascript
$ npm run serve
```

- Inicia el servidor en modo de producción.

```javascript
$ npm run debug
```

- Inicia el servidor en modo de depuración.

```javascript
$ npm run lint
```

- Ejecuta ESLint para detectar errores de sintaxis y estilo de código.

```javascript
$ npm run lint:fix
```

- Ejecuta ESLint y trata de corregir los errores de sintaxis y estilo de código.

```javascript
$ npm run test
```

- Ejecuta las pruebas de la aplicación usando Vitest.

```javascript
$ npm run coverage
```

- Genera el reporte de cobertura de las pruebas.

```javascript
$ npm run format
```

- Formatea los archivos usando Prettier.

```javascript
$ npm run preview
```

- Inicia un servidor de vista previa de la aplicación.

Mas información sobre como hacer deploy de la aplicación en producción [Vite en producción](https://vitejs.dev/guide/build.html)

## Estructura del proyecto:

### Dependencias

- `axios`: Cliente HTTP para hacer peticiones a APIs.
- `express`: Framework de Node.js para manejar peticiones HTTP.
- `listhen`: Biblioteca para manejar eventos de forma asíncrona.
- `react`: Biblioteca de JavaScript para crear interfaces de usuario.
- `react-dom`: Biblioteca de JavaScript para manipular el DOM en React.
- `react-router-dom`: Biblioteca para manejar el enrutamiento en una aplicación de React.
- `react-toastify`: Biblioteca para mostrar notificaciones en una aplicación de React.
- `sirv`: Biblioteca para servir archivos estáticos.

### Dependencias de desarrollo

- `@testing-library/jest-dom`: Biblioteca de pruebas para Jest.
- `@testing-library/react`: Biblioteca de pruebas para React.
- `@testing-library/user-event`: Biblioteca para simular eventos del usuario en pruebas de React.
- `@types/node`: Tipos para Node.js.
- `@types/react`: Tipos para React.
- `@types/react-dom`: Tipos para React DOM.
- `@typescript-eslint/eslint-plugin`: Plugin de ESLint para TypeScript.
- `@typescript-eslint/parser`: Parser de ESLint para TypeScript.
- `@vitejs/plugin-react`: Plugin de Vite para React.
- `@vitest/coverage-c8`: Plugin de Vitest para generar reportes de cobertura.
- `@vitest/ui`: Interfaz gráfica para Vitest.
- `eslint`: Herramienta para detectar errores de sintaxis y estilo de código.
- `eslint-plugin-react`: Plugin de ESLint para React.
- `eslint-plugin-react-hooks`: Plugin de ESLint para detectar problemas comunes con los hooks de React.
- `eslint-plugin-react-refresh`: Plugin de ESLint para el modo de recarga rápida de React.
- `happy-dom`: Biblioteca para emular el DOM en pruebas.
- `prettier`: Herramienta para formatear código.
- `sass`: Preprocesador de CSS.
- `typescript`: Superset de JavaScript que agrega tipos estáticos opcionales.
- `vite`: Build tool para aplicaciones de JavaScript.
- `vitest`: Framework de pruebas para aplicaciones de JavaScript.

### Proyecto

- .vscode
- coverage
- public
- dist/
  - client/
  - server/
- src/
  - assets/
  - common/
    - constants/
    - styles/
    - utils/
  - components/
    - BreadCrumb/
    - Detail/
    - Item/
    - Loader/
    - Searchbox/
  - pages/
    - Home/
    - ItemDetails/
    - Items/
    - NotFound/
  - RootLayout.tsx
  - index.scss
  - entry-client.tsx
  - entry-server.tsx
  - Router.tsx
- .prettierrc
- .eslintrc.json
- package.json
- server.js
- vite.config.js
