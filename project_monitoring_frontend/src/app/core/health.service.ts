import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * HealthService
 * Simple service used to verify backend connectivity by calling the health endpoint.
 * It uses the API base URL interceptor, so it can call relative URLs like '/actuator/health'.
 */
@Injectable({ providedIn: 'root' })
export class HealthService {
  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  ping() {
    // Spring Boot commonly exposes health at /actuator/health
    return this.http.get('/actuator/health').pipe(
      map((resp: any) => {
        // Normalizes the health status into a string
        const status = resp?.status ?? 'UNKNOWN';
        return `Backend health: ${status}`;
      }),
      catchError(() => of('Backend health: UNREACHABLE'))
    );
  }
}
