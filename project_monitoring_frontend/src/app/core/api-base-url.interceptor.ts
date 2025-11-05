import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiConfigService } from './api-config.service';

/**
 * PUBLIC_INTERFACE
 * apiBaseUrlInterceptor
 * Intercepts outgoing HTTP requests and prefixes the URL with the configured API base URL
 * when the request URL is relative (starts with "/").
 *
 * This keeps code clean by allowing service methods to call endpoints like "/actuator/health"
 * without worrying about environment-specific base URLs.
 */
export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiConfig = inject(ApiConfigService);
  const url = req.url || '';
  // Only prefix relative URLs ("/..."). If absolute (http/https), leave unchanged.
  if (/^\/(?!\/)/.test(url)) {
    const base = apiConfig.getBaseUrl();
    const newUrl = `${base}${url}`;
    const cloned = req.clone({ url: newUrl });
    return next(cloned);
  }
  return next(req);
};
