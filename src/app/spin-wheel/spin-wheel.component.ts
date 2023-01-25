import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spin-wheel',
  templateUrl: './spin-wheel.component.html',
  styleUrls: ['./spin-wheel.component.scss']
})
export class SpinWheelComponent implements OnInit {

  constructor() { }

  @Output() gameEmitter = new EventEmitter<string>();

  ngOnInit(): void {
  }

  deg = 0;
  spinNum = 2850;

  rotate(){
   this.deg += this.spinNum;
   document.getElementById('box').style.transform = "rotate("+this.deg+"deg)";
  }
}
