import {Component, signal} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {ReferenciasMaterialModule} from '../shared/modulos/referencias-material.module';
import {Usuario} from '../shared/entidades/Usuario';
import {MatDialog} from '@angular/material/dialog';
import {UsuarioServicio} from '../core/servicios/usuario-servicio';
import {LoginComponente} from '../features/componentes/login-componente/login-componente';
import {NgFor, NgIf} from '@angular/common';
import {AutorizacionServicio} from '../core/servicios/autorizacion-servicio';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterModule,
    ReferenciasMaterialModule,
    NgIf,
    NgFor
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Festivos');

  public usuarioActual: Usuario | null = null;

  public opciones = [
    {titulo: 'Países', url: 'paises', icono: 'iconos/Pais.png'},
    {titulo: 'Tipos de Festivo', url: 'tipos', icono: 'iconos/TipoFestivo.png'},
    {titulo: 'Festivos', url: 'festivos', icono: 'iconos/Festivo.png'},
  ];

  constructor(private dialogServicio: MatDialog,
              private usuarioServicio: UsuarioServicio,
              private autorizacionServicio: AutorizacionServicio,
              private router: Router
  ) {
  }


  abrirLogin(): void {
    const dialogRef = this.dialogServicio.open(LoginComponente, {
      width: '400px',
      height: '300px',
      data: {usuario: "", clave: ""}
    });
    dialogRef.afterClosed().subscribe(datos => {
        if (datos) {
          this.usuarioServicio.iniciarSesion(datos.usuario, datos.clave).subscribe(
            {
              next: response => {
                this.usuarioActual = response.usuario;
                localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
                this.autorizacionServicio.guardarToken(response.token);
              },
              error: error => {
                window.alert(error.message);
              }
            }
          );
        }
      }
    );
  }

  cerrarSesion() {
    this.usuarioActual = null;
    this.router.navigate(["/inicio"]);
  }
}
