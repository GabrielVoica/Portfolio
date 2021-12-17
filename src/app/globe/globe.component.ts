import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
})
export class GlobeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;

  @Input() public rotationSpeedX: number = 0.00001;
  @Input() public rotationSpeedY: number = 0.00001;
  @Input() public size: number = 200;
  @Input() public texture: string = '/assets/textures/world.jpg';
  @Input() public cameraZ: number = 1;
  @Input() public fieldOfView: number = 1;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.createScene();
    this.startRender();
  }

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private textureImage = this.loader.load(this.texture);
  private geometry = new THREE.SphereGeometry(0.4, 64, 32);
  private material = new THREE.MeshStandardMaterial({ map: this.textureImage });
  private degrees = 0;
  

  private sphere: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private orbital = new THREE.Mesh(
    new THREE.SphereGeometry(0.01, 24, 12),
    new THREE.MeshStandardMaterial({
      metalness: 1,  
    })
  );

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;


  private createScene() {
    //Scene
    this.scene = new THREE.Scene();
    this.scene.add(this.sphere);

    this.orbital.position.x = -0.55;
    this.orbital.position.y = 0;

  
    const light = new THREE.PointLight(0xfffffff, 3, 450);
    light.position.set(100, 100, 100);
    this.scene.add(light);

    this.scene.add(this.orbital);

    //Camera
    let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      1,
      100
    );
    this.camera.position.z = 99;
    this.scene.rotateY(-1.2);
  }

  private animateCube() {
    this.sphere.rotation.y += 0.003;
  }

  private animateOrbital(degrees: number){
    if(degrees == 360){
      degrees = -1;
    }

    this.orbital.position.x += Math.sin(degrees * Math.PI /180) / 100;
    this.orbital.position.y += Math.cos(degrees * Math.PI / 180) / 100;
  }

  private startRender() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component = this;

    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.animateOrbital(component.degrees);
      component.degrees+= 1;
      component.renderer.render(component.scene, component.camera);
    })();
  }
}
