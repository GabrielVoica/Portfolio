import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(private titleService: Title){

  }

  public setTitle(title: string){
    this.titleService.setTitle(title);
  }

  public ngOnInit(){
    this.setTitle('Gabriel Voica | Dev');
  }


}
