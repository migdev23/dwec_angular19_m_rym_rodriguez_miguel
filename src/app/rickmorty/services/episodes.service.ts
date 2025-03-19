import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/episode';
export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
