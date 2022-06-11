import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumento } from 'src/app/interfaces/documento';
import { IDownloadDocumentResponseModel, IResponseModel } from 'src/app/interfaces/response-interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  url : string = environment.URL

  constructor(private http: HttpClient) { }

  uploadDocument(doc:IDocumento):Observable<IResponseModel>{
    let urlToHit = this.url + "/uploadFile";
    return this.http.post<IResponseModel>(urlToHit, doc);
  }

  downloadDocuments(id:number):Observable<IDownloadDocumentResponseModel>{
    let urlToHit = this.url + "/getDocuments?idLesson=" + id;
    return this.http.get<IDownloadDocumentResponseModel>(urlToHit)
  }
}
