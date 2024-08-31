import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  getData(){
    let url ='https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }
  getProduct(){
    let url ='https://fakestoreapi.com/products';
    return this.http.get(url);
  }
}
