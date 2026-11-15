import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FestivoEditarComponente } from './festivo-editar-componente';

describe('FestivoEditarComponente', () => {
  let component: FestivoEditarComponente;
  let fixture: ComponentFixture<FestivoEditarComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivoEditarComponente],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            encabezado: 'Agregando Festivo',
            paises: [{id: 1, nombre: 'COLOMBIA'}],
            tipos: [{id: 1, tipo: 'Fijo'}],
            festivo: {id: 0, pais: {id: 0, nombre: ''}, nombre: '', dia: 0, mes: 0, diasPascua: 0, tipo: {id: 0, tipo: ''}}
          }
        },
        {provide: MatDialogRef, useValue: {close: () => {}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivoEditarComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('es válido solo con nombre, país y tipo', () => {
    expect(component.datosValidos()).toBe(false);
    component.datos.festivo.nombre = 'Navidad';
    component.datos.festivo.pais = {id: 1, nombre: 'COLOMBIA'};
    expect(component.datosValidos()).toBe(false);
    component.datos.festivo.tipo = {id: 1, tipo: 'Fijo'};
    expect(component.datosValidos()).toBe(true);
  });
});
