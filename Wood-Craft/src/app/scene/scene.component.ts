import {
  Component,
  type OnInit,
  Input,
  type ElementRef,
  ViewChild,
  type OnChanges,
  type SimpleChanges,
  AfterViewInit,
} from "@angular/core"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

@Component({
  selector: "app-scene",
  standalone: true,
  template: '<canvas #canvas></canvas>',
  styles: [`
    canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  `]
})
export class SceneComponent implements OnInit, OnChanges, AfterViewInit {
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
  }

  ngAfterViewInit() {
    this.onWindowResize();
    window.addEventListener("resize", () => this.onWindowResize());
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["customText"] && this.font) {
      this.updateText();
    }
  }

  private initScene() {
    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Initialize scene
    this.scene = new THREE.Scene();
    
    // Initialize camera with wider field of view
    this.camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 3; // Moved camera closer

    // Initialize controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffd700, 1); // Yellow light
    pointLight.position.set(-5, -5, 2);
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
    // Create wooden part with more detailed material
    const woodMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc19a6b,
      roughness: 0.5,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25
    });

    const woodGeometry = new THREE.BoxGeometry(2, 0.8, 0.1);
    const woodMesh = new THREE.Mesh(woodGeometry, woodMaterial);
    this.keychain.add(woodMesh);

    // Create metal ring with more metallic material
    const ringGeometry = new THREE.TorusGeometry(0.2, 0.03, 32, 32);
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc0c0c0,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(1.2, 0.3, 0);
    this.keychain.add(ringMesh);

    // Position and rotate keychain
    this.keychain.position.set(0, 0, -1);
    this.keychain.rotation.x = Math.PI / 8;
    this.keychain.scale.set(1.2, 1.2, 1.2);

    this.updateText();
  }

  private updateText() {
    if (this.textMesh) {
      this.keychain.remove(this.textMesh);
    }

    const textGeometry = new TextGeometry(this.customText, {
      font: this.font,
      size: 0.15,
      depth: 0.05,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.005,
      bevelOffset: 0,
      bevelSegments: 5
    });

    const textMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a3728,
      roughness: 0.5,
      metalness: 0.1
    });

    this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textGeometry.computeBoundingBox();
    
    const textWidth = textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x;
    this.textMesh.position.set(-textWidth / 2, -0.15, 0.06);
    
    this.keychain.add(this.textMesh);
  }

  private createStars() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(geometry, material);
    this.scene.add(stars);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.keychain) {
      // Smooth floating animation
      this.keychain.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}

