import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map desde rxjs/operators
import { User } from '../../../auth/interface/user';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  authService = inject(AuthService);

  autenticado$: Observable<boolean>;

  constructor() {
    this.autenticado$ = this.authService.currentUser$.pipe(
      map((user: User | null) => user !== null) // Usa map para transformar el observable
    );
  }

  logout(){
    this.authService.logout();
  }
}
