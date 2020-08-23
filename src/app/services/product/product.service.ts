import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Response } from '../../interfaces/response'
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, retryWhen, mergeMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
    return throwError(
      'Something bad happened; please try again later.');
  }

  getProduct(sku: string): Observable<Response>{
    //return this.http.get<Response>(`http://localhost:3000/api/products/bySku/${sku}`)
    return this.http.get<Response>(`api/products/bySku/${sku}`)
      .pipe(
        retryWhen(errors => errors.pipe(
          mergeMap(error => {
            if(error.status === 400){
              this.toastr.error(error.error.message);
              console.log("Error 400. Retrying...")
              return of(error).pipe(
                delay(500)
              );
            }
            this.toastr.error('Something bad happened; please try again later.');
            return this.handleError(error);
          })
        ))
      );
  }

  getMultipleProducts(skuArray: string): Observable<Response>{
    //return this.http.get<Response>(`http://localhost:3000/api/products/${skuArray}`)
    return this.http.get<Response>(`api/products/${skuArray}`)
    .pipe(
      retryWhen(errors => errors.pipe(
        mergeMap(error => {
          if(error.status === 400){
            this.toastr.error(error.error.message);
            console.log("Error 400. Retrying...")
            return of(error).pipe(
              delay(500)
            );
          }
          this.toastr.error('Something bad happened; please try again later.');
          return this.handleError(error);
        })
      ))
    );
  }
}
