import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PromocionesService } from '../../providers/promociones';
import { CallNumber } from 'ionic-native';

@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html'
})
export class PromocionesPage {
  promociones: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public promocionesService:PromocionesService) {
    this.promocionesService.obtenerPromociones().then(result => {
      this.promociones = result;
    });
  }

  //Método para llamar nativamente.
  llamar(telefono:string){
    CallNumber.callNumber(telefono, true)
      .then(() => console.log('Llamando...'))
      .catch(() => console.log('Error al marcar.'));
  }
}
