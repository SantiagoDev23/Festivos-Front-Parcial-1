import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UsuarioServicio } from './usuario-servicio';
import { environment } from '../../environments/environment';

describe('UsuarioServicio', () => {
  let service: UsuarioServicio;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UsuarioServicio);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('iniciarSesion consulta el login con usuario y clave', () => {
    service.iniciarSesion('admin', 'clave').subscribe();
    const peticion = httpMock.expectOne(`${environment.urlBase}usuarios/login/admin/clave`);
    expect(peticion.request.method).toBe('GET');
    peticion.flush({token: 'abc', usuario: {id: 1, nombre: 'Administrador'}});
  });
});
