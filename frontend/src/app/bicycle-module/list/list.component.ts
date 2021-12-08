import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BicycleService } from '../bicycle.service';
import { Bicycle, BicycleDB, BicycleResponse, BicyclesResponse } from '../interfaces/Bicycle.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {


  bicycles: BicycleDB[] = []
  // bicyclesIn: BicycleDB[] = this._bicycleService.bicycles
  errorMsg = ""

  @Output() validateSessionEvent = new EventEmitter<boolean>();

  validateSession() {
    this.validateSessionEvent.emit(true);
  }

  // bicycles: Bicycle[] = [
  //   {
  //     title:"Mountain Bike",
  //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero vel aperiam adipisci explicabo dignissimos quis, reprehenderit excepturi. Maiores a vel repellat, perferendis non quisquam eos! Quam, amet. Atque, sequi facilis?",
  //     location: "Seattle, CA",
  //     price:350,
  //   },
  //   {
  //     title:"string",
  //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero vel aperiam adipisci explicabo dignissimos quis, reprehenderit excepturi. Maiores a vel repellat, perferendis non quisquam eos! Quam, amet. Atque, sequi facilis?",
  //     location: "Seattle, CA",
  //     price:350,
  //   },
  
  // ] 

  constructor(
    private _bicycleService: BicycleService ,
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._bicycleService.getAll()
      .subscribe(
        (resp:any) => {
          this.bicycles = resp.resp},
        error => this.errorMsg = error
      )
    this._bicycleService.getAllIn()

    this.validateSession()
  }

  loadAll(){
    this._bicycleService.getAll()
      .subscribe(
        (resp:any) => {
          this.bicycles = resp.resp},
        error => this.errorMsg = error
      )
  }
  // loadAllIn(){
  //   this._bicycleService.getAllIn()
  // }

}
