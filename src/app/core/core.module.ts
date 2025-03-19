import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CardComponent } from './components/card/card.component';
import { CollapseComponent } from './components/collapse/collapse.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    BreadcrumbComponent,
    FooterComponent,
    JumbotronComponent,
    CardComponent,
    CollapseComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],

  exports: [LayoutComponent, CollapseComponent, CardComponent, JumbotronComponent]
})
export class CoreModule { }
