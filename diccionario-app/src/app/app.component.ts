import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IUser } from './interfaces/user-interfaces';
import { DatabaseService } from 'src/app/services/database/database.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: IUser;
  constructor(
    private navController:NavController,
    private dbService: DatabaseService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.dbService.loadUserInSession().then((resp: any) => {

      this.user = resp;

    }, (error) => {
      console.log("Peter: " + error)
    })

  }

  goTo(direccion){
    this.navController.navigateRoot(direccion)
  }
}

