import { Component } from '@angular/core';
import { Platform, AlertController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NFC, Ndef } from '@ionic-native/nfc';
import { ActionSheetController } from 'ionic-angular';
import { UsersProvider } from '../providers/users/users';
import { Vibration } from '@ionic-native/vibration';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any = HomePage;

  respuesta1:number;
  respuesta2:number;

  //InfoUsuario
  infouser:{username:string,rol:string,first_name:string,last_name:string};
  equipos:Array<{cod:string,tipo_ele:string,desc:string}> = [];

  //InfoErrors
  error:boolean;
  errormsj:string;

  //Status APP
  

  constructor(
    public alertCtrl: AlertController,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private nfc: NFC,
    private ndef: Ndef,
    public actionSheetCtrl: ActionSheetController,
    private users:UsersProvider,
    public toastCtrl: ToastController,
    private vibration: Vibration
    ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();


      nfc.addTagDiscoveredListener().subscribe(nfcData => {
         let responseDataString = JSON.stringify(nfcData); 
         let reponseDataJson = JSON.parse(responseDataString);
         if(this.respuesta1!=undefined){
          this.respuesta2 = this.generateId(reponseDataJson.tag.id);

          this.generateReport(this.respuesta1,1,this.respuesta2);

          this.respuesta1 = undefined;
          this.respuesta2 = undefined;
         }else{
           this.respuesta1 = this.generateId(reponseDataJson.tag.id);
           let confirm = this.alertCtrl.create({
              title: 'Tiene equipo?',
              message: 'Si la persona que desea entrar a la compañia, tiene un equipo de computo porfavor oprima aceptar y escanee el chip NFC del equipo de computo, de lo contrario oprima cancelar.',
              buttons: [
                {
                  text: 'Cancelar',
                  handler: () => {
                    this.generateReport(this.respuesta1,1);
                    this.respuesta1 = undefined;
                  }
                },
                {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Agree clicked');
                  }
                }
              ]
            });
            confirm.present();
         }
      });

    });
  }


  generateReport(iduser:number,idsede:number,idelement:number=undefined){
    if(idelement != undefined){
      this.users.generateWithElement(idsede,iduser,idelement).subscribe(
        data => {
          let datajson = data.json();
          console.log(datajson);
          this.showMessage(datajson);
        }
      );
    }else{
      this.users.generateWithoutElement(idsede,iduser).subscribe(
        data => {
          let datajson = data.json();
          console.log(datajson);
          this.showMessage(datajson);
        }
      );
    }
  }

  showMessage(datajson){
    if(datajson.error){
      this.vibration.vibrate(2000);
      let alert = this.alertCtrl.create({
        title: 'Ocurrio un error!',
        subTitle: datajson.message,
        buttons: ['OK']
      });
      alert.present();

    }else{
      let toast = this.toastCtrl.create({
        message: datajson.message,
        duration: 3000,
        position:'middle'
      });
      toast.present();
    }
  }


  generateId(id):number{
    let newId = "";
    for (var i = 0; i < id.length; i++) {
      if(id[i] < 0){
        let number_positive = -(id[i]);
        newId = newId+""+number_positive;
      }else{
        newId = newId+""+id[i];
      }
    }
    let idNumber = parseInt(newId);
    return idNumber;
  }


}

