# Festivos

Front de la API de Festivos. Permite administrar (CRUD) los **países**, los **tipos de festivo** y los **festivos** de cada país.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Requisitos

- Node.js y npm.
- La API de Festivos corriendo en `http://localhost:8080` (la URL base se configura en `src/environments/environment.ts`).
- Un usuario registrado en la tabla `usuario` de la base de datos: la API pide iniciar sesión (JWT) para consultar y modificar.

## Estructura

```
src/
├── app/                      Configuración, rutas y componente raíz
├── core/
│   ├── guardas/              Guarda de las rutas
│   ├── interceptores/        Envía el token en cada petición
│   └── servicios/            Servicios que consumen la API
├── features/componentes/     Pantallas: inicio, login, países, tipos de festivo y festivos
└── shared/
    ├── componentes/          Diálogo de confirmación
    ├── entidades/            Interfaces de las entidades
    └── modulos/              Referencias a Angular Material
```

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

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
