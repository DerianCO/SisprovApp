import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform} from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersProvider]
})
export class HomePage {

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    ) {
    
  }

}

