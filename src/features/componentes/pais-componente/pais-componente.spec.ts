import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PaisComponente } from './pais-componente';

describe('PaisComponente', () => {
  let component: PaisComponente;
  let fixture: ComponentFixture<PaisComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisComponente],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
