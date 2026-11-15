import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { InicioComponent } from './inicio';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra las tres opciones del CRUD', () => {
    const enlaces = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a'));
    expect(enlaces.map(a => a.getAttribute('href'))).toEqual(['/paises', '/tipos', '/festivos']);
  });
});
