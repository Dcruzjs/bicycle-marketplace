import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bicycle, BicycleDB, BicycleResponse, BicyclesResponse } from './interfaces/Bicycle.interface';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {
  URL = "http://localhost:8181"

  bicycles: BicycleDB[] = []

  constructor(
    private _http:HttpClient
  ) { }

  create(Obj:Bicycle):Observable<BicycleResponse>{
    return this._http.post<BicycleResponse>(`${this.URL}/new`,Obj)
  }

  getAll():Observable<BicyclesResponse>{
    return this._http.get<BicyclesResponse>(this.URL)
  }
  getAllIn():Observable<BicyclesResponse>{
    return this._http.get<BicyclesResponse>(this.URL)
      // .subscribe( (resp:any) => {
      //   // console.log(resp.resp)
      //   this.bicycles = resp.resp
      //   console.log(this.bicycles)
      // })
  }

  getOne(id:string):Observable<BicycleResponse>{
    return this._http.get<BicycleResponse>(`${this.URL}/${id}`)
  }

  update(id:string,Obj:BicycleDB):Observable<BicycleResponse>{
    return this._http.put<BicycleResponse>(`${this.URL}/${id}`, Obj)
  }

  delete(id:string):any{
    return this._http.delete(`${this.URL}/remove/${id}`)
  }
}
