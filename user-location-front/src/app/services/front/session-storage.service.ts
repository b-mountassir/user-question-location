import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() { }

  onSignOut(): void {
    sessionStorage.remove('AUTH_TOKEN');
  }

  public setKey(key: string, value): void {
    sessionStorage.setItem(key, value);
  }

  public getKey(key: string): string | null {
    return sessionStorage.getItem(key);
  }
}


