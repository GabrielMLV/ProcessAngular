import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
declare var UIkit: any;
@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }

  getAddress(cep: String) {
    return this.httpClient.get('https://viacep.com.br/ws/'+cep.trim()+'/json/').pipe(catchError(this.handleError));
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
