import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { IComentario, ILeccion, IPregunta, ITerm } from 'src/app/interfaces/lesson-interface';
import { IUser } from 'src/app/interfaces/user-interfaces';
import { DatabaseService } from 'src/app/services/database/database.service';
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

  puntaje: number = 0;


  // Lesson 1
  // preguntas - respuesta
  lec1preg1selectedResponse: string = ""
  lec1preg1Response: string = "Gracias"
  // preguntas - respuesta
  lec1preg2selectedResponse: string = ""
  lec1preg2Response: string = "Hola/Adios"
  // preguntas - respuesta
  lec1preg3selectedResponse: string = ""
  lec1preg3Response: string = "Chico"
  // preguntas - respuesta
  lec1preg4selectedResponse: string = ""
  lec1preg4Response: string = "none"
  // preguntas - respuesta
  lec1preg5selectedResponse: string = ""
  lec1preg5Response: string = "none"

  // Lesson 2
  // preguntas - respuesta
  lec2preg1selectedResponse: string = ""
  lec2preg1Response: string = "Mentiroso"
  // preguntas - respuesta
  lec2preg2selectedResponse: string = ""
  lec2preg2Response: string = "Trabajador"
  // preguntas - respuesta
  lec2preg3selectedResponse: string = ""
  lec2preg3Response: string = "Flaco"
  // preguntas - respuesta
  lec2preg4selectedResponse: string = ""
  lec2preg4Response: string = "none"
  // preguntas - respuesta
  lec2preg5selectedResponse: string = ""
  lec2preg5Response: string = "none"

  // Lesson 3
  // preguntas - respuesta
  lec3preg1selectedResponse: string = ""
  lec3preg1Response: string = "Mentiroso"
  // preguntas - respuesta
  lec3preg2selectedResponse: string = ""
  lec3preg2Response: string = "none"
  // preguntas - respuesta
  lec3preg3selectedResponse: string = ""
  lec3preg3Response: string = "none"
  // preguntas - respuesta
  lec3preg4selectedResponse: string = ""
  lec3preg4Response: string = "none"
  // preguntas - respuesta
  lec3preg5selectedResponse: string = ""
  lec3preg5Response: string = "none"

  // Lesson 4
  // preguntas - respuesta
  lec4preg1selectedResponse: string = ""
  lec4preg1Response: string = "Trabajador"
  // preguntas - respuesta
  lec4preg2selectedResponse: string = ""
  lec4preg2Response: string = "Flaco"
  // preguntas - respuesta
  lec4preg3selectedResponse: string = ""
  lec4preg3Response: string = "bailar"
  // preguntas - respuesta
  lec4preg4selectedResponse: string = ""
  lec4preg4Response: string = "Frío"
  // preguntas - respuesta
  lec4preg5selectedResponse: string = ""
  lec4preg5Response: string = "none"

  // Lesson 5
  // preguntas - respuesta
  lec5preg1selectedResponse: string = ""
  lec5preg1Response: string = "none"
  // preguntas - respuesta
  lec5preg2selectedResponse: string = ""
  lec5preg2Response: string = "none"
  // preguntas - respuesta
  lec5preg3selectedResponse: string = ""
  lec5preg3Response: string = "none"
  // preguntas - respuesta
  lec5preg4selectedResponse: string = ""
  lec5preg4Response: string = "none"
  // preguntas - respuesta
  lec5preg5selectedResponse: string = ""
  lec5preg5Response: string = "none"

  // Lesson 6
  // preguntas - respuesta
  lec6preg1selectedResponse: string = ""
  lec6preg1Response: string = "none"
  // preguntas - respuesta
  lec6preg2selectedResponse: string = ""
  lec6preg2Response: string = "none"
  // preguntas - respuesta
  lec6preg3selectedResponse: string = ""
  lec6preg3Response: string = "none"
  // preguntas - respuesta
  lec6preg4selectedResponse: string = ""
  lec6preg4Response: string = "none"
  // preguntas - respuesta
  lec6preg5selectedResponse: string = ""
  lec6preg5Response: string = "none"

  // Lesson 7
  // preguntas - respuesta
  lec7preg1selectedResponse: string = ""
  lec7preg1Response: string = "none"
  // preguntas - respuesta
  lec7preg2selectedResponse: string = ""
  lec7preg2Response: string = "none"
  // preguntas - respuesta
  lec7preg3selectedResponse: string = ""
  lec7preg3Response: string = "none"
  // preguntas - respuesta
  lec7preg4selectedResponse: string = ""
  lec7preg4Response: string = "none"
  // preguntas - respuesta
  lec7preg5selectedResponse: string = ""
  lec7preg5Response: string = "none"


  /**
   * de momento se quedan las alternativas en duro, pero se debe considerar crear un servicio que: 
   * genere una lista de palabras diferentes a la correcta para cada pregunta, eso, o tomar 
   * cantidad N de palabras al azar del diccionario, y de manera aleatoria repartirlas como 
   * alternativas, puede producir el problema de duplicidad si no validamos bien.
   */
//  Modelo propuesto para las preguntas: 
  // questionario:any = [
  //   {
  //     pregunta: "",
  //     alternativas: [
  //       {
  //         alternativa: "",
  //       },
  //       {
  //         alternativa: "",
  //       },
  //       {
  //         alternativa: "",
  //       },
  //       {
  //         alternativa: "",
  //       },
  //     ],
  //     respuesta: "Azul"
  //   }
  // ]

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
              private dicService: DictionaryService,
              private dbService: DatabaseService) { }

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
    
    // cargamos los datos del usuario:
    
    this.dbService.loadUserInSession().then( resp => {
      this.inSessionUser = resp;
    });
    
    this.comentario.idUser = this.inSessionUser.idUser; // de momento el usuario en duro, a cambiar al momento de iniciar con el manejo de servicios.

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

  async alertaLeccion(mensaje) {

    const alert = await this.alertController.create({
      header: 'Resultado leccion',
      message: mensaje,
      buttons:
        [
          {
            text: 'Volver al inicio',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              this.navController.navigateRoot('/home');
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

  leccionReview(){

    switch(this.leccion.idLeccion){
      case 1: {
        if (this.lec1preg1selectedResponse === this.lec1preg1Response){
          this.puntaje += 1;
        }
        if (this.lec1preg2selectedResponse === this.lec1preg2Response){
          this.puntaje += 1;
        }
        if (this.lec1preg3selectedResponse === this.lec1preg3Response){
          this.puntaje += 1;
        }
        if (this.lec1preg4selectedResponse === this.lec1preg4Response){
          this.puntaje += 1;
        }
        if (this.lec1preg5selectedResponse === this.lec1preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 3); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (parseFloat(percent.toFixed(2)) >= 0.6){
          this.alertaLeccion("pasaste con: " + percent)
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
        }else {
          this.alertaLeccion("coperaste con: " + percent)

        }

        this.puntaje = 0;
        
        break;
      }

      case 2: {
        if (this.lec2preg1selectedResponse == this.lec2preg1Response){
          this.puntaje += 1;
        }
        if (this.lec2preg2selectedResponse == this.lec2preg2Response){
          this.puntaje += 1;
        }
        if (this.lec2preg3selectedResponse == this.lec2preg3Response){
          this.puntaje += 1;
        }
        if (this.lec2preg4selectedResponse == this.lec2preg4Response){
          this.puntaje += 1;
        }
        if (this.lec2preg5selectedResponse == this.lec2preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 3); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (percent >= 0.6){
          this.alertaLeccion("pasaste")
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
        }else {
          this.alertaLeccion("coperaste")

        }

        this.puntaje = 0;
        
        break;
      }

      case 3: {
        if (this.lec3preg1selectedResponse == this.lec3preg1Response){
          this.puntaje += 1;
        }
        if (this.lec3preg2selectedResponse == this.lec3preg2Response){
          this.puntaje += 1;
        }
        if (this.lec3preg3selectedResponse == this.lec3preg3Response){
          this.puntaje += 1;
        }
        if (this.lec3preg4selectedResponse == this.lec3preg4Response){
          this.puntaje += 1;
        }
        if (this.lec3preg5selectedResponse == this.lec3preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 1); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (percent >= 0.6){
          this.alertaLeccion("pasaste")
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
        }else {
          this.alertaLeccion("coperaste")

        }

        this.puntaje = 0;
        
        break;
      }

      case 4: {
        if (this.lec4preg1selectedResponse == this.lec4preg1Response){
          this.puntaje += 1;
        }
        if (this.lec4preg2selectedResponse == this.lec4preg2Response){
          this.puntaje += 1;
        }
        if (this.lec4preg3selectedResponse == this.lec4preg3Response){
          this.puntaje += 1;
        }
        if (this.lec4preg4selectedResponse == this.lec4preg4Response){
          this.puntaje += 1;
        }
        if (this.lec4preg5selectedResponse == this.lec4preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 4); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (percent >= 0.6){
          this.alertaLeccion("pasaste")
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
        }else {
          this.alertaLeccion("coperaste")

        }

        this.puntaje = 0;
        
        break;
      }

      case 5: {
        if (this.lec5preg1selectedResponse == this.lec5preg1Response){
          this.puntaje += 1;
        }
        if (this.lec5preg2selectedResponse == this.lec5preg2Response){
          this.puntaje += 1;
        }
        if (this.lec5preg3selectedResponse == this.lec5preg3Response){
          this.puntaje += 1;
        }
        if (this.lec5preg4selectedResponse == this.lec5preg4Response){
          this.puntaje += 1;
        }
        if (this.lec5preg5selectedResponse == this.lec5preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 0); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (percent >= 0.6){
          this.alertaLeccion("pasaste")
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
        }else {
          this.alertaLeccion("coperaste")

        }

        this.puntaje = 0;
        
        break;
      }

      case 6: {
        if (this.lec6preg1selectedResponse == this.lec6preg1Response){
          this.puntaje += 1;
        }
        if (this.lec6preg2selectedResponse == this.lec6preg2Response){
          this.puntaje += 1;
        }
        if (this.lec6preg3selectedResponse == this.lec6preg3Response){
          this.puntaje += 1;
        }
        if (this.lec6preg4selectedResponse == this.lec6preg4Response){
          this.puntaje += 1;
        }
        if (this.lec6preg5selectedResponse == this.lec6preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 0); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (percent >= 0.6){
          this.alertaLeccion("pasaste")
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
        }else {
          this.alertaLeccion("coperaste")

        }

        this.puntaje = 0;
        
        break;
      }

      case 7: {
        if (this.lec7preg1selectedResponse == this.lec7preg1Response){
          this.puntaje += 1;
        }
        if (this.lec7preg2selectedResponse == this.lec7preg2Response){
          this.puntaje += 1;
        }
        if (this.lec7preg3selectedResponse == this.lec7preg3Response){
          this.puntaje += 1;
        }
        if (this.lec7preg4selectedResponse == this.lec7preg4Response){
          this.puntaje += 1;
        }
        if (this.lec7preg5selectedResponse == this.lec7preg5Response){
          this.puntaje += 1;
        }

        var percent = (this.puntaje / 0); // el calculo es this.puntaje obtenido dividido en la cant de preguntas, 

        percent.toFixed(2);

        if (percent >= 0.6){
          this.approveLesson(this.inSessionUser.idUser, this.leccion.idLeccion);
          this.alertaLeccion("pasaste")
        }else {
          this.alertaLeccion("coperaste")

        }
        
        this.puntaje = 0;
        break;
      }

    }
    
  }

  approveLesson(idUser, idLesson){
    this.serviceUsuario.approvedLesson(idUser, idLesson).subscribe(resp => {
      if (resp.data == 1){
        console.log("Leccion actualizada")

      } else {
        console.log("Error")
      }
    })
  }
}
