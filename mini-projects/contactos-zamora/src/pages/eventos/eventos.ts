import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventosService } from '../../providers/eventos';
import { EventoDetallesPage } from '../evento.detalles/evento.detalles';

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html'
})
export class EventosPage {
  cadenaBusqueda:string = "";
  eventos:any;

  constructor(public navCtrl: NavController, public eventosService:EventosService) {
    this.inicializar();
  }
  //Inicializa con toda la lista de eventos
  inicializar(){
    this.eventosService.obtenerTodos().then(result => {
      this.eventos = result;
    });
  }
  //Muestra la página de Detalles y le envía como parámetro al evento
  verDetalles(evento){
    this.navCtrl.push(EventoDetallesPage, {
      evento:evento
    });
  }
  //Filtra la lista. Envía como parámetro la cadena de búsqueda
  filtrarEventos(){
    this.eventos = this.eventosService.filtrar(this.cadenaBusqueda);
  }
}
