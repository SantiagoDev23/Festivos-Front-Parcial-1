import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('Festivos');
  });

  it('muestra el menú con las tres opciones del CRUD', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const enlaces = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('mat-toolbar a'));
    expect(enlaces.map(a => a.getAttribute('href'))).toEqual(['/inicio', '/paises', '/tipos', '/festivos']);
  });
});
