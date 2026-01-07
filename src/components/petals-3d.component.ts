import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-petals-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #petalsContainer class="absolute inset-0 w-full h-full pointer-events-none"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class Petals3dComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('petalsContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @Input() intensity: number = 1;
  @Input() color: string = 'rose'; // 'rose' | 'amber' | 'mixed'

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private petals: THREE.Group[] = [];
  private animationId!: number;
  private mouse = new THREE.Vector2();
  private targetMouse = new THREE.Vector2();
  private clock = new THREE.Clock();

  ngOnInit() {
    this.initScene();
    this.createPetals();
    this.animate();
    this.setupEventListeners();
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
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0003);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    this.camera.position.z = 800;

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

  private createPetalShape(): THREE.Shape {
    const shape = new THREE.Shape();
    // Create a more realistic petal shape using bezier curves
    shape.moveTo(0, 0);
    // Top right curve
    shape.bezierCurveTo(3, 2, 8, 8, 12, 6);
    // Top peak
    shape.bezierCurveTo(16, 4, 18, 0, 17, -4);
    // Right side curve
    shape.bezierCurveTo(16, -8, 12, -12, 8, -16);
    // Bottom curve
    shape.bezierCurveTo(4, -20, 0, -18, 0, -14);
    // Left side back to start
    shape.bezierCurveTo(0, -10, 0, -5, 0, 0);
    shape.closePath();
    return shape;
  }

  private getColor(): number {
    switch(this.color) {
      case 'rose':
        return 0xe11d48;
      case 'amber':
        return 0xffa500;
      default: // mixed
        return Math.random() > 0.5 ? 0xe11d48 : 0xffa500;
    }
  }

  private createPetals() {
    // Massively increased flower count - peanut sized
    const petalCount = Math.floor(400 * this.intensity);
    
    for (let i = 0; i < petalCount; i++) {
      const petalGroup = new THREE.Group();
      
      // Create multiple petals for a flower
      const petalCountPerFlower = 5 + Math.floor(Math.random() * 4);
      const baseColor = this.getColor();
      
      for (let j = 0; j < petalCountPerFlower; j++) {
        const petalGeometry = new THREE.ShapeGeometry(this.createPetalShape());
        // Reduced to peanut size - much smaller scale
        const scaleX = 0.4 + Math.random() * 0.3;
        const scaleY = 0.4 + Math.random() * 0.3;
        petalGeometry.scale(scaleX, scaleY, 1);
        
        const colorVariation = new THREE.Color(baseColor);
        // Add more color variation
        if (Math.random() > 0.5) {
          colorVariation.lerp(new THREE.Color(0xffffff), Math.random() * 0.4);
        } else {
          colorVariation.lerp(new THREE.Color(0xffd700), Math.random() * 0.2);
        }
        
        const petalMaterial = new THREE.MeshStandardMaterial({
          color: colorVariation,
          transparent: true,
          opacity: 0.8 + Math.random() * 0.2,
          side: THREE.DoubleSide,
          emissive: colorVariation,
          emissiveIntensity: 0.3 + Math.random() * 0.2,
          metalness: 0.2,
          roughness: 0.6
        });
        
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        const angle = (j / petalCountPerFlower) * Math.PI * 2;
        petal.rotation.z = angle;
        
        // Add slight curve to petals
        petal.rotation.y = Math.sin(angle) * 0.3;
        
        // Much smaller radius for peanut-sized flowers
        const radius = 0.8 + Math.random() * 0.4;
        petal.position.y = Math.sin(angle) * radius;
        petal.position.x = Math.cos(angle) * radius;
        
        // Store individual petal animation
        (petal as any).baseRotation = angle;
        (petal as any).floatOffset = Math.random() * Math.PI * 2;
        
        petalGroup.add(petal);
      }
      
      // Position the flower group - spread out more densely
      petalGroup.position.x = (Math.random() - 0.5) * 2500;
      petalGroup.position.y = (Math.random() - 0.5) * 2500;
      petalGroup.position.z = (Math.random() - 0.5) * 1200;
      
      // Scale down the entire flower group to peanut size
      petalGroup.scale.set(0.15, 0.15, 0.15);
      
      // Store animation properties
      (petalGroup as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01
      };
      (petalGroup as any).floatSpeed = Math.random() * 0.5 + 0.3;
      (petalGroup as any).initialPosition = petalGroup.position.clone();
      
      this.petals.push(petalGroup);
      this.scene.add(petalGroup);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe11d48, 1, 1000);
    pointLight1.position.set(200, 200, 200);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffa500, 1, 1000);
    pointLight2.position.set(-200, -200, 200);
    this.scene.add(pointLight2);
  }

  private setupEventListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private removeEventListeners() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('resize', this.resize.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
    
    this.mouse.lerp(this.targetMouse, 0.05);

    // Camera follows mouse subtly
    this.camera.position.x += (this.mouse.x * 30 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouse.y * 30 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    // Animate petals
    this.petals.forEach((petalGroup, index) => {
      const rotationSpeed = (petalGroup as any).rotationSpeed;
      const floatSpeed = (petalGroup as any).floatSpeed;
      const initialPos = (petalGroup as any).initialPosition;
      
      if (rotationSpeed) {
        petalGroup.rotation.x += rotationSpeed.x;
        petalGroup.rotation.y += rotationSpeed.y;
        petalGroup.rotation.z += rotationSpeed.z;
      }
      
      if (initialPos) {
        petalGroup.position.y = initialPos.y + Math.sin(elapsedTime * floatSpeed + index) * 60;
        petalGroup.position.x = initialPos.x + Math.cos(elapsedTime * floatSpeed * 0.7 + index) * 40;
        
        // Rotate around center with mouse influence
        const angle = elapsedTime * 0.1 + index;
        const radius = 150;
        petalGroup.position.x += Math.cos(angle + this.mouse.x) * radius * 0.015;
        petalGroup.position.z += Math.sin(angle + this.mouse.y) * radius * 0.015;
      }
      
      // Animate individual petals in the flower
      petalGroup.children.forEach((petal, petalIndex) => {
        if (petal instanceof THREE.Mesh) {
          const baseRotation = (petal as any).baseRotation;
          const floatOffset = (petal as any).floatOffset;
          
          // Gentle swaying
          petal.rotation.z = baseRotation + Math.sin(elapsedTime * 0.5 + floatOffset) * 0.1;
          petal.rotation.y = Math.sin(baseRotation + elapsedTime * 0.3 + floatOffset) * 0.2;
          
          // Floating motion
          const floatY = Math.sin(elapsedTime * 0.8 + floatOffset) * 2;
          petal.position.y += floatY * 0.1;
        }
      });
    });

    this.renderer.render(this.scene, this.camera);
  }
}

