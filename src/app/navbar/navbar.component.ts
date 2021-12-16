import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  
})
export class NavbarComponent implements OnInit {

  @ViewChild('roundDeco') roundDeco: ElementRef;

  @ViewChild('home') home: ElementRef;
  @ViewChild('projects') projects: ElementRef;
  @ViewChild('contact') contact: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  animateNav(e: Event, link: string){

    switch(link){
      case "home":
        this.renderer.addClass(e.target,'active');
        this.renderer.removeClass(this.projects.nativeElement,'active');
        this.renderer.removeClass(this.contact.nativeElement,'active');
        this.renderer.setStyle(this.roundDeco.nativeElement,'animation','animate-active-home 0.2s forwards');
        setTimeout(()=>{
        this.renderer.setStyle(this.roundDeco.nativeElement,'top','12px');
        },500);
      break;

      case "projects":
        this.renderer.addClass(e.target,'active');
        this.renderer.removeClass(this.home.nativeElement,'active');
        this.renderer.removeClass(this.contact.nativeElement,'active');
        this.renderer.setStyle(this.roundDeco.nativeElement,'animation','animate-active-projects 0.2s forwards');
        setTimeout(()=>{
        this.renderer.setStyle(this.roundDeco.nativeElement,'top','90px');
        },500);
      break;

      case "contact":
        this.renderer.addClass(e.target,'active');
        this.renderer.removeClass(this.home.nativeElement,'active');
        this.renderer.removeClass(this.projects.nativeElement,'active');
        this.renderer.setStyle(this.roundDeco.nativeElement,'animation','animate-active-contact 0.2s forwards');
        setTimeout(()=>{
        this.renderer.setStyle(this.roundDeco.nativeElement,'top','150px');
        },500);
      break;

    }
  }

}
