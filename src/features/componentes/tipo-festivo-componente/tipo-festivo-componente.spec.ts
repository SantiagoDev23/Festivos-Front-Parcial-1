import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TipoFestivoComponente } from './tipo-festivo-componente';

describe('TipoFestivoComponente', () => {
  let component: TipoFestivoComponente;
  let fixture: ComponentFixture<TipoFestivoComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFestivoComponente],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoFestivoComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
