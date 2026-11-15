import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Festivo} from '../../shared/entidades/Festivo';

@Injectable({
  providedIn: 'root',
})

export class FestivoServicio {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}festivos`;
  }

  public listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(this.url);
  }

  public buscar(dato: String): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}/buscar/${dato}`);
  }

  public agregar(festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(this.url, festivo);
  }

  public modificar(festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(this.url, festivo);
  }

  public eliminar(idFestivo: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${idFestivo}`);
  }

}
