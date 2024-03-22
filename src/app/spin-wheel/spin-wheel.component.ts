import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spin-wheel',
  templateUrl: './spin-wheel.component.html',
  styleUrls: ['./spin-wheel.component.scss']
})
export class SpinWheelComponent implements OnInit {

  constructor() { }

  @ViewChild('arrow') arrowElement: ElementRef;

  @Output() gameEmitter = new EventEmitter<string>();

  ngOnInit(): void {
  }

  timesSpinned = 0;

  deg = 0;
  spinNum = 2400;

  rotate(){
   this.deg += this.spinNum;
   document.getElementById('box').style.transform = "rotate("+this.deg+"deg)";
   setTimeout(()=>{
   this.timesSpinned++;
   this.setSelectedGame();
   },5400)
  }

  setSelectedGame(){
    switch(this.timesSpinned){
      case 1:
        this.gameEmitter.emit('search');
        break;
      case 2:
        this.gameEmitter.emit('bitcolor');
        break;
      case 3:
        this.gameEmitter.emit('pong');
        break;
      case 4:
        this.gameEmitter.emit('search');
        break;
      case 5:
        this.gameEmitter.emit('bitcolor');
        break;
      case 6:
        this.gameEmitter.emit('pong');
        break;
      case 7:
        this.gameEmitter.emit('bitcolor');
        break;
      case 8:
        this.gameEmitter.emit('bitcolor');
        break;
      case 9:
        this.gameEmitter.emit('bitcolor');
        break;
    }
  }


}
