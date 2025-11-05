# TFILiberiaFrontEnd

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Estado del proyecto

### 🔹 Completado
- [x] Estructura base del proyecto
- [x] Configuración inicial de rutas
- [x] Integración de componentes básicos y estilos iniciales
- [x] Página **Home** media implementada (es mas una pagina para libros, de ultima moverla)
- [x] Componente **Login** existente pero vacio

---

### 🔸 En progreso / Pendiente
- [ ] Mejorar la **Home**
- [ ] Crear **Navbar** para navegación principal (a gusto de ustedes)
- [ ] Implementar página de **Login**
- [ ] Página para **ver libros disponibles**
- [ ] Página para **ver socios de la biblioteca**
- [ ] Funcionalidad para **pedir préstamos de libros** (lo medio implemente para probar y testear como funcionaba todo, como si fuera un todo list que ya tenia hecho y adapte)
- [ ] Funcionalidad para **devolver libros**
- [ ] Conectar con backend
- [ ] Agregar validaciones y manejo de errores

---

## GUIA

Lo que entendi... crean las paginas en **/pages**, una vez creada importan la clase a **app.ts** y de ahi para vizualizarlas la ponen en **app.html**, el tema de rutas como en React

En **/servicios** esta la funcionalidad de la lista que hice, la probe y anda, pero no esta implementada porq no tiene sentido

