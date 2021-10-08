import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) {}

  buscar(argumento: string) {
    this.gifsService.buscarGifs(argumento);
  }
}
