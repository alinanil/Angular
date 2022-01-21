import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient:HttpClient) { }

  postEmployee(data:any){
    return this.httpClient.post("http://localhost:3000/posts",data)
  }
  getEmployee(){
    return this.httpClient.get("http://localhost:3000/posts")
  }
  updateEmployee(data:any,id:number){
    return this.httpClient.put("http://localhost:3000/posts/"+id,data)
  }
  deleteEmployee(id:number){
    return this.httpClient.delete("http://localhost:3000/posts/"+id)
  }
}
