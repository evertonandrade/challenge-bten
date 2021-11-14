import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { LocalStorageAuth } from '../utils/local-storage-auth';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = `${environment.apiUrl}/api`;
  localStorageUtil: LocalStorageAuth;

  constructor(private http: HttpClient) {
    this.localStorageUtil = new LocalStorageAuth();
  }

  signIn(user: User) {
    const randomToken = () => {
      return [
        `${Math.random().toString(16).substr(2)}`,
        `${Math.random().toString(16).substr(2)}`,
        `${Math.random().toString(16).substr(2)}`,
      ].join('.');
    };

    const response = {
      success: true,
      data: {
        accessToken: randomToken(),
        expiresIn: 7000,
        userToken: {
          id: uuidv4(),
          email: user.email,
          claims: [],
        },
      },
    };

    let obs = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });

    return obs;
  }

  signUp(user: User): Observable<any> {
    const randomToken = () => {
      return [
        `${Math.random().toString(16).substr(2)}`,
        `${Math.random().toString(16).substr(2)}`,
        `${Math.random().toString(16).substr(2)}`,
      ].join('.');
    };

    const response = {
      success: true,
      data: {
        accessToken: randomToken(),
        expiresIn: 7000,
        userToken: {
          id: uuidv4(),
          email: user.email,
          claims: [],
        },
      },
    };

    let obs = new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 1000);
    });

    return obs;
  }

  get isLoggedIn(): boolean {
    return !!this.localStorageUtil.getUser();
  }
}
