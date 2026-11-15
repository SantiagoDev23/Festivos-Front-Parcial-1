import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';

@Component({
  selector: 'app-inicio',
  imports: [
    RouterLink,
    ReferenciasMaterialModule
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {

}
