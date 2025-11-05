import { Injectable, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * PUBLIC_INTERFACE
 * ApiConfigService
 * Provides the base URL for the backend API. It resolves the value in the following order:
 * 1) window.__env.apiBaseUrl (if present; allows runtime override via public/env.js)
 * 2) Node/SSR environment variables (ANGULAR_APP_API_BASE_URL or VITE_API_BASE_URL)
 * 3) Angular environment file fallback (environment.apiBaseUrl)
 *
 * You can override at runtime by providing a public/env.js file that sets:
 *   window.__env = { apiBaseUrl: 'https://your-api-url' }
 */
@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  // PUBLIC_INTERFACE
  getBaseUrl(): string {
    // 1) Runtime browser override via window.__env
    if (this.isBrowser()) {
      const w = this.document.defaultView as any;
      const fromWindow = w && w.__env && (w.__env.apiBaseUrl as string | undefined);
      if (fromWindow && typeof fromWindow === 'string' && fromWindow.trim().length > 0) {
        return this.normalizeBaseUrl(fromWindow);
      }
    }

    // 2) SSR/Node env variables (useful for server-side rendering or previews)
    try {
      // Guard for browser
      const nodeEnv = (globalThis as any)?.process?.env;
      const fromNodeEnv =
        nodeEnv?.ANGULAR_APP_API_BASE_URL ??
        nodeEnv?.VITE_API_BASE_URL ??
        nodeEnv?.NG_APP_API_BASE_URL ??
        undefined;
      if (fromNodeEnv && typeof fromNodeEnv === 'string' && fromNodeEnv.trim().length > 0) {
        return this.normalizeBaseUrl(fromNodeEnv);
      }
    } catch {
      // ignore if process.env not available
    }

    // 3) Angular compile-time environment fallback
    return this.normalizeBaseUrl(environment.apiBaseUrl ?? 'http://localhost:3001');
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private normalizeBaseUrl(url: string): string {
    // Remove trailing slash for consistent concatenation
    return url.replace(/\/+$/, '');
  }
}
