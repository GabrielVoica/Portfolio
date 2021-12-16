import { Component, ElementRef, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit, AfterViewInit {

   @ViewChild('canvas') canvasRef: ElementRef;

   @Input() public rotationSpeedX: number = 0.00001;
   @Input() public rotationSpeedY: number = 0.00001;
   @Input() public size: number = 200;
   @Input() public texture: string = "/assets/textures/world.jpg";
   @Input() public cameraZ: number = 1;
   @Input() public fieldOfView: number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.createScene();
    this.startRender();
  }

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private textureImage = this.loader.load(this.texture);
  private geometry = new THREE.SphereGeometry(0.8,64,32);
  private material = new THREE.MeshBasicMaterial({map: this.textureImage}
);

  private sphere: THREE.Mesh = new THREE.Mesh(this.geometry,this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private controls: OrbitControls;

  


  private createScene(){
    //Scene
    this.scene = new THREE.Scene();
    this.scene.add(this.sphere);

    //Camera
    let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      1,100
    );
    this.camera.position.z = 99;
    this.controls = new OrbitControls(this.camera);
  }

  private animateCube(){
    this.sphere.rotation.y += 0.003; 
  }

  private startRender(){
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight);

    let component = this;
    

    (function render(){
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene,component.camera);
      component.controls.update();

    }());
  }


}
