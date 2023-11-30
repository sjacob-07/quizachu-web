import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public baseUrl = "https://api.quizachu.com/api/v1";
  //public baseUrl = "http://localhost:3000/api/v1";

  public token = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  private _handleError(error: HttpErrorResponse): any {
    let err = error;
    return throwError(err);
  }

  getData(urlLookup: string):Observable<any>{
    let url = this.baseUrl + urlLookup;
    return this.http.get(url, {headers: this.getHeaders()}).pipe(catchError(this._handleError))
  }

  postData(urlLookup: any, body:any):Observable<any> {
    let url = this.baseUrl + urlLookup;
    let bodyString = JSON.stringify(body);
    return this.http.post(url, bodyString, {headers: this.getHeaders()}).pipe(catchError(this._handleError))
  }

  putData(urlLookup: any, body:any):Observable<any> {
    let url = this.baseUrl + urlLookup;
    let bodyString = JSON.stringify(body);
    return this.http.put(url, bodyString, {headers: this.getHeaders()}).pipe(catchError(this._handleError))
  }

  deleteData(urlLookup:any) {
    let url = this.baseUrl + urlLookup;
    return this.http.delete(url, {headers: this.getHeaders()}).pipe(catchError(this._handleError))
  }


  getHeaders():any {
    let httpHeaders = new HttpHeaders({
      'content-type': 'application/json'
    });
		if (window.localStorage.getItem('token')) {
			httpHeaders = httpHeaders.set('X-User-Token', window.localStorage.getItem('token')!);
      httpHeaders = httpHeaders.set('X-User-EmployeeCode', window.localStorage.getItem('employee_id')!);
		}
		return httpHeaders;
	}

	setToken(token:any) {
		this.token = token;
	}
}
