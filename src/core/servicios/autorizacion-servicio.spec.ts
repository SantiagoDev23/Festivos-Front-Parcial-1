import { TestBed } from '@angular/core/testing';

import { AutorizacionServicio } from './autorizacion-servicio';

describe('AutorizacionServicio', () => {
  let service: AutorizacionServicio;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizacionServicio);
  });

  afterEach(() => localStorage.clear());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('guarda, entrega y elimina el token', () => {
    service.guardarToken('abc');
    expect(service.obtenerToken()).toBe('abc');
    expect(service.estaAutenticado()).toBe(true);
    service.cerrarSesion();
    expect(service.obtenerToken()).toBeNull();
    expect(service.estaAutenticado()).toBe(false);
  });
});
