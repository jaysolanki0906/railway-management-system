import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,private loaderService :LoaderService) {}

  get<T>(path: string, options?: { params?: HttpParams }): Observable<T> {
    this.loaderService.show();
    return this.http.get<T>(`${this.apiUrl}/${path}`, options).pipe(finalize(()=>{this.loaderService.hide()}));
  }  

  post<T>(path: string, body: any): Observable<T> {
    this.loaderService.show()
    return this.http.post<T>(`${this.apiUrl}/${path}`, body).pipe(finalize(()=>{this.loaderService.hide()}));
  }

  patch<T>(path: string, body: any): Observable<T> {
    this.loaderService.show();
    return this.http.patch<T>(`${this.apiUrl}/${path}`, body).pipe(finalize(()=>{this.loaderService.hide()}));
  }
  put<T>(path: string, body: any): Observable<T> {
    this.loaderService.show();
    return this.http.put<T>(`${this.apiUrl}/${path}`, body).pipe(finalize(()=>(this.loaderService.hide())));
  }

  delete<T>(path: string): Observable<T> {
    this.loaderService.show();
    return this.http.delete<T>(`${this.apiUrl}/${path}`).pipe(finalize(()=>{this.loaderService.hide()}));
  }
}