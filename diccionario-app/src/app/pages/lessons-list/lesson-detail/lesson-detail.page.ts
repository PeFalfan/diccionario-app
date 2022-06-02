import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { IComentario, ILeccion, IPregunta, ITerm } from 'src/app/interfaces/lesson-interface';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';
import { UserService } from 'src/app/services/user/usuario.service';


@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.page.html',
  styleUrls: ['./lesson-detail.page.scss'],

})
export class LessonDetailPage implements OnInit {

  leccion: ILeccion
  preguntas: Array<IPregunta>
  inSessionUser : IUser
  /**
   * de momento se quedan las alternativas en duro, pero se debe considerar crear un servicio que: 
   * genere una lista de palabras diferentes a la correcta para cada pregunta, eso, o tomar 
   * cantidad N de palabras al azar del diccionario, y de manera aleatoria repartirlas como 
   * alternativas, puede producir el problema de duplicidad si no validamos bien.
   */

  alternativas:any = [
    {
      word:'algo 1',
      traslation: 'traduccion 1'
    },
    {
      word:'algo 2',
      traslation: 'traduccion 2'
    },
    {
      word:'algo 3',
      traslation: 'traduccion 3'
    },
    {
      word:'algo 4',
      traslation: 'traduccion 4'
    },
    {
      word:'algo 5',
      traslation: 'traduccion 5'
    },
    {
      word:'algo 6',
      traslation: 'traduccion 6'
    },
    {
      word:'algo 7',
      traslation: 'traduccion 7'
    },
    {
      word:'algo 8',
      traslation: 'traduccion 8'
    },
    {
      word:'algo 9',
      traslation: 'traduccion 9'
    },
    {
      word:'algo 10',
      traslation: 'traduccion 10'
    },
    {
      word:'algo 11',
      traslation: 'traduccion 11'
    },
    {
      word:'algo 1',
      traslation: 'traduccion 1'
    },
    {
      word:'algo 2',
      traslation: 'traduccion 2'
    },
    {
      word:'algo 3',
      traslation: 'traduccion 3'
    },
    {
      word:'algo 4',
      traslation: 'traduccion 4'
    },
    {
      word:'algo 5',
      traslation: 'traduccion 5'
    },
    {
      word:'algo 6',
      traslation: 'traduccion 6'
    },
    {
      word:'algo 7',
      traslation: 'traduccion 7'
    },
    {
      word:'algo 8',
      traslation: 'traduccion 8'
    },
    {
      word:'algo 9',
      traslation: 'traduccion 9'
    },
    {
      word:'algo 10',
      traslation: 'traduccion 10'
    },
    {
      word:'algo 11',
      traslation: 'traduccion 11'
    }
  ]

  comentario:IComentario = {
    idCommentary: 0,
    commentary: '',
    idLesson: 0,
    idUser: 0,
    creationDate: undefined
  }

  constructor(private alertController: AlertController, 
              public navController: NavController, 
              private serviceUsuario: UserService,
              private dicService: DictionaryService) { }

  ngOnInit() {
    try {
      const params = history.state;
      if (params.data != undefined) {
        this.leccion = params.data
        this.preguntas = this.leccion.preguntas
      }
      else {
        console.log('error al cargar leccion')
      }
    } catch (error) {
      console.log('error al cargar leccion')
    }

    this.comentario.idLesson = this.leccion.idLeccion;
    this.comentario.idUser = 1; // de momento el usuario en duro, a cambiar al momento de iniciar con el manejo de servicios.

    //this.alternativas.sort((a, b) => a.word < b.word ? -1 : a.word > b.word ? 1 : 0)
  }

  aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
}

// Eventualmente hay que utilizar este servicio para cargar palabras aleatorias del back, que se utilizarán como alternativas.
/*loadDictionary(){
  this.dicService.loadDictionary().subscribe((resp:IDictionaryResponseModel) => {
    this.alternativas = resp.data
  })
}*/

  async alertaLeccion() {

    const alert = await this.alertController.create({
      header: '¿Esta seguro de enviar la lección?',
      message: "No podrá volver atrás después de este paso",
      buttons:
        [
          {
            text: 'Volver',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Cancelar');
            }
          }, {
            text: 'Continuar',
            id: 'confirm-button',
            handler: () => {
              console.log('OK');
              this.navController.navigateRoot('lessons-list')
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async alertaCancelar() {

    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea abandonar la lección?',
      message: "Perdera todos los avances sin enviar",
      buttons:
        [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Cancelar');
            }
          }, {
            text: 'Salir de la lección',
            id: 'confirm-button',
            handler: () => {
              console.log('OK');
              this.navController.navigateRoot('lessons-list')
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  async alertaComentario() {

    const alert = await this.alertController.create({
      header: 'Ingrese su comentario:',
      inputs: [
        {
          name: 'comentario',
          type: 'textarea',
          placeholder: 'Comentario'
        }],

      buttons:
        [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Cancelar');
            }
          }, {
            text: 'Enviar comentario',
            id: 'confirm-button',
            handler: (alertData) => {
              console.log('OK');
              this.comentario.commentary = alertData.comentario;
              console.log(this.comentario.commentary);
              this.guardarComentario()
            }
          }
        ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }


  guardarComentario() {
    this.serviceUsuario.createComment(this.comentario).subscribe(resp => {
      if (Number(resp.data) == 1) {
        alert('comentario ok')
      }
      else {
        alert('comentario no ok')
      }
    })
  }
}




