import { Component, ViewChild, ElementRef, AfterViewInit, OnInit,   HostListener } from '@angular/core';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent {

  @ViewChild('canvas', {static: false})
  canvas: ElementRef;

  public context: CanvasRenderingContext2D;
  public width = 400;
  public height = 400;
  public keyLeft = false;
  public keyRight = false;
  public bounceRatio = 0.85;

  public enemyLeft = false;
  public enemyRight = false;


  public playerPad = {
   type: 'pad', 
   height: 8,
   width: 50,
   posX: 285,
   posY: this.height - 30,
   radius: null,
   velX: 0,
   velY: 1
  };

  public enemyPad = {
    type: 'pad', 
    height: 8,
    width: 50,
    posX: 145,
    posY: 15,
    radius: null,
    velX: 0,
    velY: 1
  };

  public ball = {
    type: 'ball',
    height: 20,
    width: 20,
    radius: 5,
    posX: 247,
    posY: 137,
    velX: 3,
    velY: 3
  };


  @HostListener('window:keydown',['$event'])
  handleKey(event: KeyboardEvent){
    if(event.key == "ArrowLeft"){
      this.keyLeft = true;
    }
    else if(event.key == "ArrowRight"){
      this.keyRight = true;
    }
  }

  @HostListener('window:keyup',['$event'])
  handleEndKey(event: KeyboardEvent){
    if(event.key == "ArrowLeft"){
      this.keyLeft = false;
    }
    else if(event.key == "ArrowRight"){
      this.keyRight = false;
    }
  }


  elements = [this.playerPad,this.enemyPad,this.ball];


  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.initCanvas();
    this.animate();
  }


  initCanvas(){
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;
  }


  addElements(){
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.fillStyle = "white";

    this.context.beginPath();

    this.elements.forEach((element)=>{
      if(element.type == 'pad'){
      this.context.fillRect(element.posX,element.posY,element.width,element.height);
      }
      else if(element.type == 'ball'){
        this.context.arc(element.posX,element.posY,element.radius,0,Math.PI*2);
      }
    })
    this.context.fill();
  }

  animate(){
    requestAnimationFrame(this.animate.bind(this));



    if(this.ball.posX > (this.width - this.ball.radius)){
      this.ball.velX = -this.ball.velX;
    }
    else if(this.ball.posX < this.ball.radius){
      this.ball.velX = -this.ball.velX;
    }

    if(this.ball.posY > (this.height - this.ball.radius)){
      this.ball.velY = -this.ball.velY;
    }
    else if(this.ball.posY < this.ball.radius){
      this.ball.velY = -this.ball.velY;
    }

    this.ball.posX += this.ball.velX;
    this.ball.posY += this.ball.velY;

    if(this.keyLeft){
      this.playerPad.posX -= 5;
    }
    else if(this.keyRight){
      this.playerPad.posX += 5;
    }

    if(this.enemyPad.posX < (this.ball.posX - 25)){
      this.enemyPad.posX += 1.7;
    }
    else{
      this.enemyPad.posX -= 1.7;
    }

    window.setInterval(()=>{
     if(this.bounceRatio < 1){
      this.bounceRatio = 1.15
     } 
     else{
      this.bounceRatio = 0.85;
     }
    },3000)


   this.addElements(); 
}
}