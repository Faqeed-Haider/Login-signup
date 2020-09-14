import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../data/register.interface';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: User = {
    username: null,
    firstName: null,
    lastName: null,
    password: null 
  };
  postError: boolean;
  postErrorMessage: string;
  errorMessage: String; 

  constructor(private dataService: DataService) { }

  onSubmit(form: NgForm){
    console.log("In onSubmit()", form.valid);
    console.log(this.users);
    if(form.valid){
      this.dataService.signUp(this.users).subscribe(
      result => console.log("success", result),
      error => this.onHttpError(error)
    );
    }
    else{
      this.postError = true;
      this.postErrorMessage = "Please fix above errors";
    }
  }
  // onHttpError(error: any): void {
    // throw new Error('Method not implemented.');
  // }
  private onHttpError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  ngOnInit(): void {
    // this.dataService.getUser().subscribe({
    //   next: users => {
    //     this.users = this.users;
    //   },
    //   error: err => this.errorMessage = err 
    // });     
  }
}

