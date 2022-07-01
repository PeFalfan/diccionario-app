import { Component, OnInit } from '@angular/core';
import { IDictionary, ITerm } from 'src/app/interfaces/lesson-interface';
import { IDictionaryResponseModel } from 'src/app/interfaces/response-interfaces';
import { DictionaryService } from 'src/app/services/dictionary/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

  dictionary: IDictionary = {
    terms: []
  }

  filteredTerms: Array<ITerm> = []

  aTerms: Array<ITerm> = []
  bTerms: Array<ITerm> = []
  cTerms: Array<ITerm> = []
  dTerms: Array<ITerm> = []
  eTerms: Array<ITerm> = []
  fTerms: Array<ITerm> = []
  gTerms: Array<ITerm> = []
  hTerms: Array<ITerm> = []
  iTerms: Array<ITerm> = []
  jTerms: Array<ITerm> = []
  kTerms: Array<ITerm> = []
  lTerms: Array<ITerm> = []
  mTerms: Array<ITerm> = []
  nTerms: Array<ITerm> = []
  oTerms: Array<ITerm> = []
  pTerms: Array<ITerm> = []
  qTerms: Array<ITerm> = []
  rTerms: Array<ITerm> = []
  sTerms: Array<ITerm> = []
  tTerms: Array<ITerm> = []
  uTerms: Array<ITerm> = []
  vTerms: Array<ITerm> = []
  wTerms: Array<ITerm> = []
  xTerms: Array<ITerm> = []
  yTerms: Array<ITerm> = []
  zTerms: Array<ITerm> = []

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.loadDictionary();


  }

  loadDictionary() {
    this.dictionaryService.loadDictionary().subscribe((resp: IDictionaryResponseModel) => {
      this.dictionary = resp.data;

      this.groupByFirstCharacter()
    })
  }

  groupByFirstCharacter() {

    console.log("Termino: ")

    console.log("caracter: " + this.dictionary.terms[0].word.charAt(0))


    this.dictionary.terms.forEach(element => {
      switch (element.word.charAt(0).toLowerCase()) {
        case 'a':

          console.log("Termino en A: " + element.word)
          this.aTerms.push(element);
          this.aTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'b':
          this.bTerms.push(element);
          this.bTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'c':
          this.cTerms.push(element);
          this.cTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'd':
          this.dTerms.push(element);
          this.dTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'e':
          this.eTerms.push(element);
          this.eTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'f':
          this.fTerms.push(element);
          this.fTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'g':
          this.gTerms.push(element);
          this.gTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'h':
          this.hTerms.push(element);
          this.hTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'i':
          this.iTerms.push(element);
          this.iTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'j':
          this.jTerms.push(element);
          this.jTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'k':
          this.kTerms.push(element);
          this.kTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'l':
          this.lTerms.push(element);
          this.lTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'm':
          this.mTerms.push(element);
          this.mTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'n':
          this.nTerms.push(element);
          this.nTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'o':
          this.oTerms.push(element);
          this.oTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'p':
          this.pTerms.push(element);
          this.pTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'q':
          this.qTerms.push(element);
          this.qTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'r':
          this.rTerms.push(element);
          this.rTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 's':
          this.sTerms.push(element);
          this.sTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 't':
          this.tTerms.push(element);
          this.tTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'u':
          this.uTerms.push(element);
          this.uTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'v':
          this.vTerms.push(element);
          this.vTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'w':
          this.wTerms.push(element);
          this.wTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'x':
          this.xTerms.push(element);
          this.xTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'y':
          this.yTerms.push(element);
          this.yTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;

        case 'z':
          this.zTerms.push(element);
          this.zTerms.sort((a, b) => a.word.localeCompare(b.word));
          break;
      }
    })

  }

  playAudio(audiobase64: string) {
    var snd = new Audio("data:audio/wav;base64," + audiobase64);
    snd.play();
  }

}
