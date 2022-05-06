import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.page.html',
  styleUrls: ['./lessons-list.page.scss'],
})
export class LessonsListPage implements OnInit {



  constructor(private router: Router, public navController: NavController) { }

  ngOnInit() {
  }

  cargarLeccion(id) {
    this.navController.navigateRoot('lesson-detail')

  }

}
