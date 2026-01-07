import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-floating-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #particleContainer class="absolute inset-0 w-full h-full pointer-events-none"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class FloatingParticlesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particleContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private particleSystem!: THREE.BufferGeometry;
  private animationId!: number;
  private clock = new THREE.Clock();
  private mouse = new THREE.Vector2();
  private targetMouse = new THREE.Vector2();

  ngOnInit() {
    this.initScene();
    this.createParticles();
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
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0005);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 500;

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

  private createParticles() {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1 = new THREE.Color(0xffa500); // Amber
    const color2 = new THREE.Color(0xe11d48); // Rose

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 1000;
      positions[i3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      const colorMix = Math.random();
      const color = new THREE.Color().lerpColors(color1, color2, colorMix);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    this.particleSystem = new THREE.BufferGeometry();
    this.particleSystem.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleSystem.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.particleSystem.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(this.particleSystem, particleMaterial);
    this.scene.add(this.particles);
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

    this.mouse.lerp(this.targetMouse, 0.03);

    this.camera.position.x += (this.mouse.x * 20 - this.camera.position.x) * 0.03;
    this.camera.position.y += (this.mouse.y * 20 - this.camera.position.y) * 0.03;
    this.camera.lookAt(this.scene.position);

    if (this.particles) {
      this.particles.rotation.x += 0.0003;
      this.particles.rotation.y += 0.0005;
    }

    if (this.particleSystem) {
      const positions = this.particleSystem.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + i * 0.01) * 0.2;
        if (positions[i + 1] > 500) {
          positions[i + 1] = -500;
        }
      }
      this.particleSystem.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

