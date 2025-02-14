import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

@Component({
  selector: "app-scene",
  standalone: true,
  template: "<canvas #canvas></canvas>",
  styles: ["canvas { width: 100%; height: 100%; }"],
})
export class SceneComponent implements OnInit, OnChanges {
  @ViewChild("canvas", { static: true }) private canvasRef!: ElementRef;
  @Input() customText = "Your Message";

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private keychain!: THREE.Group;
  private textMesh!: THREE.Mesh;
  private font!: Font;

  ngOnInit() {
    this.initScene();
    this.loadFont();
    this.createStars();
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["customText"] && this.font) {
      this.updateText();
    }
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    this.keychain = new THREE.Group();
    this.scene.add(this.keychain);
  }

  private loadFont() {
    const loader = new FontLoader();
    loader.load("assets/fonts/helvetiker_regular.typeface.json", (font) => {
      this.font = font;
      this.createKeychain();
    });
  }

  private createKeychain() {
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0xc19a6b,
      roughness: 0.8,
      metalness: 0.2,
    });

    const woodGeometry = new THREE.BoxGeometry(2, 0.8, 0.1);
    const woodMesh = new THREE.Mesh(woodGeometry, woodMaterial);
    this.keychain.add(woodMesh);

    this.updateText();

    const ringGeometry = new THREE.TorusGeometry(0.2, 0.03, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      roughness: 0.3,
      metalness: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(1.2, 0.3, 0);
    this.keychain.add(ringMesh);
  }

  private updateText() {
    if (this.textMesh) {
      this.keychain.remove(this.textMesh);
    }

    const textGeometry = new TextGeometry(this.customText, {
      font: this.font,
      size: 0.2,
      depth: 0.05,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3728 });
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
    this.textMesh.position.set(-0.8, -0.15, 0.06);
    this.keychain.add(this.textMesh);
  }

  private createStars() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const stars = new THREE.Points(geometry, material);
    this.scene.add(stars);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.keychain.position.y = Math.sin(Date.now() * 0.001) * 0.1;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}