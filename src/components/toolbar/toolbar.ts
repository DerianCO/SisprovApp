import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { GuiaPage } from '../../pages/guia/guia';
@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html'
})
export class ToolbarComponent {

  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl:NavController) {
  }


  showOptions(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones del sistema',
      buttons: [
        {
          text: 'Inicio',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        },{
          text: 'Como usar',
          handler: () => {
            this.navCtrl.setRoot(GuiaPage);
          }
        }
      ]
    });
    actionSheet.present();
  }

}
