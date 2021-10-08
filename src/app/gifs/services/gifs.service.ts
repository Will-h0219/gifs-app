import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'RAsidvA7PvMhiGBxIhEkbUZKXYiJLulI';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]; // romper la referencia con el operador spread ...
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('lastResult')!) || [];
  }

  buscarGifs( query: string ) {
    query = query.trim().toLowerCase();

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('lastResult', JSON.stringify(this.resultados));
      })
  }
}
