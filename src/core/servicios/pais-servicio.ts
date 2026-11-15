import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Pais} from '../../shared/entidades/Pais';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaisServicio {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}paises`;
  }

  public listar(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.url);
  }

  public buscar(dato: String): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.url}/buscar/${dato}`);
  }

  public agregar(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.url, pais);
  }

  public modificar(pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(this.url, pais);
  }

  public eliminar(idPais: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${idPais}`);
  }

}
