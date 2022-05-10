import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDictionaryResponseModel, IResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url:string = environment.URL

  constructor(private http:HttpClient) { }

  loadDictionary():Observable<IDictionaryResponseModel>{
    let urlToHit = this.url + "/getDictionary";
    console.log(urlToHit)
    return this.http.get<IDictionaryResponseModel>(urlToHit);
  }
}
