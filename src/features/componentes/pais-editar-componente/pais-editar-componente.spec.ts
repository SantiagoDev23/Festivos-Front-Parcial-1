import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PaisEditarComponente } from './pais-editar-componente';

describe('PaisEditarComponente', () => {
  let component: PaisEditarComponente;
  let fixture: ComponentFixture<PaisEditarComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisEditarComponente],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {encabezado: 'Agregando País', pais: {id: 0, nombre: ''}}},
        {provide: MatDialogRef, useValue: {close: () => {}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisEditarComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('solo es válido cuando el nombre no está vacío', () => {
    expect(component.datosValidos()).toBe(false);
    component.datos.pais.nombre = 'COLOMBIA';
    expect(component.datosValidos()).toBe(true);
  });
});
