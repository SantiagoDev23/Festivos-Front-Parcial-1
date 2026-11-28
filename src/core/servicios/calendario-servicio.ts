import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FestivoFecha} from '../../shared/entidades/FestivoFecha';

@Injectable({
  providedIn: 'root',
})
export class CalendarioServicio {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}calendario`;
  }

  public verificar(idPais: number, anio: number, mes: number, dia: number): Observable<string> {
    return this.http.get(`${this.url}/verificar/${idPais}/${anio}/${mes}/${dia}`, {responseType: 'text'});
  }

  public listarFestivos(idPais: number, anio: number): Observable<FestivoFecha[]> {
    return this.http.get<FestivoFecha[]>(`${this.url}/festivos/${idPais}/${anio}`);
  }

}
