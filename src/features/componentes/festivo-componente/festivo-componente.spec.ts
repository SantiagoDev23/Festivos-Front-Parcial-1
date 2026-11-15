import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FestivoComponente } from './festivo-componente';

describe('FestivoComponente', () => {
  let component: FestivoComponente;
  let fixture: ComponentFixture<FestivoComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivoComponente],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivoComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
