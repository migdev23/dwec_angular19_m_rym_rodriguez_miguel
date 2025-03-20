import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path:'', loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)},
  {path:'rickyMorti', loadChildren: () => import('./rickmorty/rickmorty.module').then(m=>m.RickmortyModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
