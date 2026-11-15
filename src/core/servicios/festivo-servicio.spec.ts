import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { FestivoServicio } from './festivo-servicio';
import { environment } from '../../environments/environment';

describe('FestivoServicio', () => {
  let service: FestivoServicio;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FestivoServicio);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listar debe consultar festivos con GET', () => {
    service.listar().subscribe();
    const peticion = httpMock.expectOne(`${environment.urlBase}festivos`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush([]);
  });

  it('eliminar debe enviar DELETE con el id', () => {
    service.eliminar(5).subscribe();
    const peticion = httpMock.expectOne(`${environment.urlBase}festivos/5`);
    expect(peticion.request.method).toBe('DELETE');
    peticion.flush(null);
  });
});
