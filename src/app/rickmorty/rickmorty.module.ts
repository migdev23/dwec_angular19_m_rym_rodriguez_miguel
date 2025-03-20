import { PagesModule } from './../pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RickmortyRoutingModule } from './rickmorty-routing.module';
import { CharactersComponent } from './components/characters/characters.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { CoreModule } from "../core/core.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CharactersComponent,
    EpisodesComponent,
    SearchLocationComponent
  ],
  imports: [
    CommonModule,
    RickmortyRoutingModule,
    HttpClientModule,
    CoreModule,
    PagesModule,
    FormsModule
]
})
export class RickmortyModule { }
