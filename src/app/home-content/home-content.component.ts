import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  constructor(private global: GlobalServiceService, private router: Router) { }

  ngOnInit(): void {
    if(this.global.getIntroAnimationState() == false){
      this.router.navigate(['']);
    }
  }

}
