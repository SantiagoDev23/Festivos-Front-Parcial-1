import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LoginComponente } from './login-componente';

describe('LoginComponente', () => {
  let component: LoginComponente;
  let fixture: ComponentFixture<LoginComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponente],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {usuario: '', clave: ''}},
        {provide: MatDialogRef, useValue: {close: () => {}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
