import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { SpinWheelComponent } from '../spin-wheel/spin-wheel.component';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  constructor(private global: GlobalServiceService, private router: Router) { }

  selectedGame = "";

  ngOnInit(): void {
    if(this.global.getIntroAnimationState() == false){
      this.router.navigate(['']);
    }
  }

  setGame(game: string){
    this.selectedGame = game;
  }

}
