# Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

The dev server is configured to run on port `3000`. Once running, open your browser at:
- http://localhost:3000/

The application will automatically reload whenever you modify source files.

## Backend API Base URL Configuration

This frontend uses a centralized configuration to determine the backend API base URL. The URL is resolved in the following order:

1. Runtime browser override via `window.__env.apiBaseUrl` (loaded from `public/env.js`)
2. Node/SSR environment variables: `ANGULAR_APP_API_BASE_URL`, `VITE_API_BASE_URL`, or `NG_APP_API_BASE_URL`
3. Angular environment fallback from `src/environments/environment.ts`

Default value: `http://localhost:3001`

### Recommended ways to set the API base URL

- Runtime (no rebuild):
  - Edit `project_monitoring_frontend/public/env.js` and set:
    ```js
    window.__env = { apiBaseUrl: 'https://your-backend.example.com' };
    ```
  - This is ideal for previews or deployments where you want to switch endpoints without rebuilding.

- Build-time (SSR or CI environments):
  - Set one of:
    - `ANGULAR_APP_API_BASE_URL`
    - `VITE_API_BASE_URL`
    - `NG_APP_API_BASE_URL`
  - These will be picked up during SSR or when available on the Node side.

- Source default:
  - Update `src/environments/environment.ts` (and `environment.prod.ts` for production defaults) to change the fallback value.

Note: If your backend enforces CORS, ensure it allows requests from the frontend origin (http://localhost:3000 in development). CORS settings must be configured on the backend.

## HTTP Client and Interceptor

- The app provides `HttpClient` with an interceptor (`apiBaseUrlInterceptor`) that automatically prefixes relative URLs (e.g., `/actuator/health`) with the configured base URL.
- A sample `HealthService` demonstrates usage by calling `/actuator/health`. The `AppComponent` shows a basic connectivity message.

## Code scaffolding

Generate a new component:

```bash
ng generate component component-name
```

List available schematics:

```bash
ng generate --help
```

## Building

To build the project:

```bash
ng build
```

Build artifacts are stored in the `dist/` directory. The production build is optimized.

## Running unit tests

To execute unit tests using [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing:

```bash
ng e2e
```

Angular CLI does not include an e2e framework by default. Choose one that suits your needs.

## Additional Resources

For more on Angular CLI usage and commands, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
