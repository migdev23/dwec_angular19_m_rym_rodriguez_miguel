import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { User } from '../interface/user';
import { UserRole } from '../models/userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private usersUrl = '/auth/simulateapi/users.json'; // Ruta al archivo JSON

  constructor(private http: HttpClient, private router: Router) {
    if(this.isAuthenticated())
      this.currentUserSubject.next(this.getCurrentUser());
    else
      this.currentUserSubject.next(null)
  }

  login(username: string, password: string): Observable<User | { error: string, message: string }> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username);

        if (user && bcrypt.compareSync(password, user.password)) {
          const authenticatedUser: User = {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role as UserRole
          };
          sessionStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
          this.router.navigate(['']);
          this.currentUserSubject.next(authenticatedUser);
          return authenticatedUser;
        } else {
          throw new Error('Usuario o contraseña incorrectos');
        }
      }),
      catchError(() => {
        return of({ error: '401', message: 'Usuario o contraseña incorrectos' });
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
