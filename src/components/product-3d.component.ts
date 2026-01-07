import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-product-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #productContainer class="w-full h-full pointer-events-auto"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class Product3dComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('productContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @Input() autoRotate: boolean = true;
  @Input() interactive: boolean = true;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private bottle!: THREE.Group;
  private animationId!: number;
  private mouse = new THREE.Vector2();
  private targetRotation = new THREE.Vector2();
  private clock = new THREE.Clock();

  ngOnInit() {
    this.initScene();
    this.createBottle();
    this.animate();
    if (this.interactive) {
      this.setupEventListeners();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resize();
    }, 0);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.removeEventListeners();
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initScene() {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 200);

    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => this.resize());
  }

  private createBottle() {
    this.bottle = new THREE.Group();

    // Bottle body (cylindrical)
    const bottleGeometry = new THREE.CylinderGeometry(20, 25, 80, 32);
    const bottleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
      transmission: 0.9,
      thickness: 2,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });
    const bottleBody = new THREE.Mesh(bottleGeometry, bottleMaterial);
    bottleBody.position.y = 0;
    this.bottle.add(bottleBody);

    // Liquid inside
    const liquidGeometry = new THREE.CylinderGeometry(19, 24, 60, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffa500,
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.6,
      emissive: 0xffa500,
      emissiveIntensity: 0.2
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = 10;
    this.bottle.add(liquid);

    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(8, 20, 30, 32);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.y = 50;
    this.bottle.add(neck);

    // Cap
    const capGeometry = new THREE.CylinderGeometry(10, 10, 15, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xffa500,
      emissiveIntensity: 0.3
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 67.5;
    this.bottle.add(cap);

    // Add glow effect
    const glowGeometry = new THREE.CylinderGeometry(22, 27, 82, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffa500,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.bottle.add(glow);

    this.scene.add(this.bottle);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffa500, 1, 500);
    pointLight1.position.set(50, 50, 50);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe11d48, 1, 500);
    pointLight2.position.set(-50, -50, 50);
    this.scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 50);
    this.scene.add(directionalLight);
  }

  private setupEventListeners() {
    const container = this.containerRef.nativeElement;
    container.addEventListener('mousemove', this.onMouseMove.bind(this));
    container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  private removeEventListeners() {
    const container = this.containerRef.nativeElement;
    container.removeEventListener('mousemove', this.onMouseMove.bind(this));
    container.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
    window.removeEventListener('resize', this.resize.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.targetRotation.x = this.mouse.y * 0.5;
    this.targetRotation.y = this.mouse.x * 0.5;
  }

  private onMouseLeave() {
    this.targetRotation.set(0, 0);
  }

  private resize() {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    if (this.bottle) {
      // Smooth rotation based on mouse
      if (this.interactive) {
        this.bottle.rotation.x += (this.targetRotation.x - this.bottle.rotation.x) * 0.1;
        this.bottle.rotation.y += (this.targetRotation.y - this.bottle.rotation.y) * 0.1;
      }

      // Auto rotation
      if (this.autoRotate) {
        this.bottle.rotation.y += 0.005;
      }

      // Floating animation
      this.bottle.position.y = Math.sin(elapsedTime) * 5;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

