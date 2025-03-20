import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NoAuthGuard } from '../auth/guards/noAuth.guard';

const routes: Routes = [
  {
    path:'', component:HomeComponent,
  },
  { path: 'login', component: LoginComponent, canActivate:[NoAuthGuard]},

  {
    path:'404', component:NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
