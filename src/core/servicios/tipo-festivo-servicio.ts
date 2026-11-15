import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {TipoFestivo} from '../../shared/entidades/TipoFestivo';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TipoFestivoServicio {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}tipos`;
  }

  public listar(): Observable<TipoFestivo[]> {
    return this.http.get<TipoFestivo[]>(this.url);
  }

  public buscar(dato: String): Observable<TipoFestivo[]> {
    return this.http.get<TipoFestivo[]>(`${this.url}/buscar/${dato}`);
  }

  public agregar(tipo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.post<TipoFestivo>(this.url, tipo);
  }

  public modificar(tipo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.put<TipoFestivo>(this.url, tipo);
  }

  public eliminar(idTipo: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${idTipo}`);
  }

}
