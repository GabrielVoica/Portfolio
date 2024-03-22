import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor() { }

  @Input() selectedGame: String = '';

  ngOnInit(): void {
  }

  setSelectedGame(game: String){
    this.selectedGame = game;
  }


}
