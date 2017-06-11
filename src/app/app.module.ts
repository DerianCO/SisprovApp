import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NFC,Ndef } from '@ionic-native/nfc';
import { Vibration } from '@ionic-native/vibration';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Providers
import { UsersProvider } from '../providers/users/users';

//Imports
import { HttpModule } from '@angular/http';

//Pages
import { GuiaPage } from '../pages/guia/guia';
import { LoginPage } from '../pages/login/login';

//Components
import { ToolbarComponent } from '../components/toolbar/toolbar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuiaPage,
    LoginPage,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuiaPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NFC,
    Ndef,
    UsersProvider,
    Vibration
  ]
})
export class AppModule {}
