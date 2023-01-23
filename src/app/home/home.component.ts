import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from '../global-service.service';
import { GlobeComponent } from '../globe/globe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private renderer: Renderer2;

  constructor(renderer: Renderer2, private router: Router, private global: GlobalServiceService) {
    this.renderer = renderer;
  }

  @ViewChild('globe_container') globe: ElementRef;
  @ViewChild('banner_container') banner: ElementRef;
  @ViewChild('button') button: ElementRef;

  ngOnInit(): void {
    if(this.global.getIntroAnimationState() == true){
      this.router.navigate(['/info']);
    }
  }



  moveItems() {
    this.renderer.setStyle(
      this.globe.nativeElement,
      'animation',
      'translate-right 4s forwards'
    );
    this.renderer.setStyle(
      this.banner.nativeElement,
      'animation',
      'translate-up 2s forwards'
    );
    this.renderer.setStyle(this.button.nativeElement, 'animation', 'translate-up 2s forwards');
    this.global.setIntroAnimationState(true);
    
    setTimeout(()=>{
      this.router.navigate(['/info']);
      document.body.style.overflowY = "visible";
    },2000);
  }
}
