import { Injectable } from '@angular/core';
import { User } from './register.interface';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userUrl = 'http://localhost:3000/';
  


  constructor(private http: HttpClient){}

  getUser(): Observable<User[]>{
      return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(e => console.log('all: ',e)),
        catchError(this.handleError));            
  }

  signUp(user) {
    return this.http.post(`http://127.0.0.1:3000/api/users/register`,  user , { observe: 'response' });
  }
  
  signIn(user) {
    return this.http.post(`http://127.0.0.1:3000/api/users/authenticate`,  user , { observe: 'response' });
  }

  

  private handleError(err: HttpErrorResponse){
    let errorMessage = " ";
    if(err.error instanceof ErrorEvent){
        errorMessage = `An error occured: ${err.error.message}`;
    }
    else{
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}

  
}
