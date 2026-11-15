import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TipoFestivoServicio } from './tipo-festivo-servicio';
import { environment } from '../../environments/environment';

describe('TipoFestivoServicio', () => {
  let service: TipoFestivoServicio;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TipoFestivoServicio);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listar debe consultar tipos con GET', () => {
    service.listar().subscribe();
    const peticion = httpMock.expectOne(`${environment.urlBase}tipos`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush([]);
  });

  it('eliminar debe enviar DELETE con el id', () => {
    service.eliminar(5).subscribe();
    const peticion = httpMock.expectOne(`${environment.urlBase}tipos/5`);
    expect(peticion.request.method).toBe('DELETE');
    peticion.flush(null);
  });
});
