import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TipoFestivoEditarComponente } from './tipo-festivo-editar-componente';

describe('TipoFestivoEditarComponente', () => {
  let component: TipoFestivoEditarComponente;
  let fixture: ComponentFixture<TipoFestivoEditarComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFestivoEditarComponente],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {encabezado: 'Agregando Tipo de Festivo', tipo: {id: 0, tipo: ''}}},
        {provide: MatDialogRef, useValue: {close: () => {}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoFestivoEditarComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
