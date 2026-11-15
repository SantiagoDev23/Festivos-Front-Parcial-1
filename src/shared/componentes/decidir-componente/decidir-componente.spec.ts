import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DecidirComponente } from './decidir-componente';

describe('DecidirComponente', () => {
  let component: DecidirComponente;
  let fixture: ComponentFixture<DecidirComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecidirComponente],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {encabezado: '¿Está seguro?', id: 1}},
        {provide: MatDialogRef, useValue: {close: () => {}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecidirComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
