import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from 'ionic-native';

@Component({
  selector: 'page-contacto.detalles',
  templateUrl: 'contacto.detalles.html'
})

export class ContactoDetallesPage {
  contacto:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contacto = navParams.get('contacto');
  }

  //Método para llamar nativamente.
  llamar(telefono:string){
    CallNumber.callNumber(telefono, true)
      .then(() => console.log('Llamando...'))
      .catch(() => console.log('Error al marcar.'));
  }
}