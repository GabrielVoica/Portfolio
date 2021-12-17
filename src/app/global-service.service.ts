import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  private introAnimationFired: boolean = false;

  constructor() { }

  getIntroAnimationState(){
    return this.introAnimationFired;
  }

  setIntroAnimationState(value: boolean){
    this.introAnimationFired = value;
  }
}
