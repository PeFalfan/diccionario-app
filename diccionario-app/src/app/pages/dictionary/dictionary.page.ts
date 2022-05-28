import { Component, OnInit } from '@angular/core';
import { IDictionary } from 'src/app/interfaces/leccion';
import { IDictionaryResponseModel } from 'src/app/interfaces/response-interfaces';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

  dictionary: IDictionary

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.loadDictionary();
  }

  loadDictionary(){
    this.dictionaryService.loadDictionary().subscribe((resp:IDictionaryResponseModel) => {
      this.dictionary = resp.data;
    })
  }

  playAudio(audiobase64:string){
    var snd = new Audio("data:audio/wav;base64," + audiobase64);
    snd.play();
  }

}
