import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/notfound.component';
import { CoreModule } from "../core/core.module";
import { CardComponent } from './components/card/card.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CollapseComponent } from './components/collapse/collapse.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    CardComponent,
    JumbotronComponent,
    CollapseComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule,
    FormsModule
  ],
  exports:[CardComponent,CollapseComponent]
})
export class PagesModule { }
