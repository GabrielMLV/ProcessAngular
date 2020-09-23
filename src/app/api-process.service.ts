import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Search } from './models/search';
import { Process } from './models/process';
import { Files } from './models/files';

declare var UIkit: any;
@Injectable({
  providedIn: 'root'
})
export class ApiProcessService {
  
  URL = "http://localhost:8080/v1/api"; //DEV
  //ULR = "http://localhost:8080/v1/api"; //PROD
  constructor(private httpClient: HttpClient) { }

  getProcess(search: Search) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(this.URL + '/process/search', search, {headers: headers}).pipe(catchError(this.handleError));
  }

  postProcess(process : Process) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(this.URL + '/process', process, {headers: headers}).pipe(catchError(this.handleError));
  }

  postProcessFile(file : File) {
    console.log(file);
    let formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post(this.URL + '/file/uploadFile', formData, {responseType: "json"}).pipe(catchError(this.handleError));
  }

  putProcess(id : number, process: Process) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put(this.URL + '/process/'+id, process, {headers: headers}).pipe(catchError(this.handleError));
  }

  getByIdProcess(id) {
    return this.httpClient.get(this.URL + '/process/'+id).pipe(catchError(this.handleError));
  }

  deleteProcess(id) {
    return this.httpClient.delete(this.URL + '/process/'+id).pipe(catchError(this.handleError));
  }



  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    UIkit.notification(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
