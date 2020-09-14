import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";


import { DataService } from '../data/data.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model ={
      username:'',
      password:''
  }
  postError: boolean;
  postErrorMessage: string;
  successMessage: string;

  errorMessage: String; 

  constructor(private dataService: DataService) { }

  onSubmit(form: NgForm){
    console.log("In onSubmit()", form.valid);
    if(form.valid){
      this.dataService.signIn(this.model).subscribe(
      (result:any) => {
        if(result.status==200){
          this.successMessage="Login Successful"
        }
      },
      error => this.onHttpError(error)
    );
    }
    else{
      this.postError = true;
      this.postErrorMessage = "Please fix above errors";
    }
  }
  private onHttpError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if(err.status==400){
      console.log("error is:",err);
      this.postErrorMessage=err.error.message;
    }
    // if (err.error instanceof ErrorEvent) {
      
    //   // A client-side or network error occurred. Handle it accordingly.
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    // }
    // console.error(errorMessage);
    return throwError(errorMessage);
  }


  ngOnInit(): void {  
  }

}
