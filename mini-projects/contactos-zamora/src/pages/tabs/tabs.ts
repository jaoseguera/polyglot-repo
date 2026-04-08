import { Component } from '@angular/core';
import { EventosPage } from '../eventos/eventos';
import { ContactosPage } from '../contactos/contactos';
import { PromocionesPage } from '../promociones/promociones';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // Se establecen las páginas.
  tab1Root: any = EventosPage;
  tab2Root: any = PromocionesPage;
  tab3Root: any = ContactosPage;

  constructor() {

  }
}
