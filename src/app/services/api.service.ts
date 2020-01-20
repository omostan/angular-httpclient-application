import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  baseUrl = 'http://localhost:3000/students/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Get students data
  getList(): Observable<Student> {
    return this.http.get<Student>(this.baseUrl).pipe(
      retry(2),
      catchError(error => {
        return throwError(this.httpHandleError(error.message || 'Server Error!'));
      })
    );
  }

  // Get single student data by ID
  getItem(id: string | number): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + id).pipe(
      retry(2),
      catchError(error => {
        return throwError(this.httpHandleError(error.message || 'Server Error!'));
      })
    );
  }

  // Create new item
  createItem(item: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, JSON.stringify(item), this.httpOptions).pipe(
      retry(2),
      catchError(error => {
      return throwError(this.httpHandleError(error.message || 'Server Error!'));
      })
    );
  }

  // Update item by id
  updateItem(id, item): Observable<Student> {
    return this.http.put<Student>(this.baseUrl + id, JSON.stringify(item), this.httpOptions).pipe(
      retry(2),
      catchError(error => {
        return throwError(this.httpHandleError(error.message || 'Server Error'));
      })
    );
  }

  // Delete item by id
  deleteItem(id: string) {
    return this.http.delete<Student>(this.baseUrl + id, this.httpOptions).pipe(
      retry(2),
      catchError(error => {
        return throwError(this.httpHandleError(error.message || 'Server Error'));
      })
    );
  }

  // Handle the API errors
  /**
   * Handle Http operation that failed.
   * @param error - HttpErrorResponse
   */
  httpHandleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code: ${error.status}\nMessage: ${error.message}\nBody: ${error.error}`;
    }
    // return an observable with a user-facing error message
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
