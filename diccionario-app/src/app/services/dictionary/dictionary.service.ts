import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDictionaryResponseModel } from 'src/app/interfaces/response-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url:string = environment.URL

  constructor(private http:HttpClient) { }

  loadDictionary():Observable<IDictionaryResponseModel>{
    let urlToHit = this.url + "/getDictionary";
    return this.http.get<IDictionaryResponseModel>(urlToHit);
  }
}
