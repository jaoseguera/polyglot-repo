import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from 'ionic-native';

@Component({
  selector: 'page-eventos-detalles',
  templateUrl: 'evento.detalles.html'
})

export class EventoDetallesPage {
  evento:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.evento = navParams.get('evento');
  }

  //Método para llamar nativamente.
  llamar(telefono:string){
    CallNumber.callNumber(telefono, true)
      .then(() => console.log('Llamando...'))
      .catch(() => console.log('Error al marcar.'));
  }
}
