import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-scroll-product-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #scrollProductContainer class="fixed inset-0 w-full h-full pointer-events-none z-30"></div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 30;
    }
  `]
})
export class ScrollProduct3dComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scrollProductContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private product!: THREE.Group;
  private animationId!: number;
  private clock = new THREE.Clock();

  // Scroll positions for different sections
  private sections: any = {
    hero: { start: 0, end: 1000, x: 0, y: 0, z: 500, scale: 0.6 },
    survey: { start: 1000, end: 2000, x: -350, y: 150, z: 400, scale: 0.5 },
    about: { start: 2000, end: 3000, x: 350, y: -150, z: 350, scale: 0.45 },
    footer: { start: 3000, end: 4000, x: 0, y: -250, z: 300, scale: 0.4 }
  };

  ngOnInit() {
    this.initScene();
    this.createProduct();
    this.animate();
    this.setupScrollListener();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resize();
      this.updateSectionBounds();
      this.onScroll(); // Initialize position
    }, 100);
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

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    this.camera.position.set(0, 0, 800);

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

  private createProduct() {
    this.product = new THREE.Group();

    // Bottle body
    const bottleGeometry = new THREE.CylinderGeometry(25, 30, 90, 32);
    const bottleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
      transmission: 0.95,
      thickness: 2,
      clearcoat: 1,
      clearcoatRoughness: 0.05
    });
    const bottleBody = new THREE.Mesh(bottleGeometry, bottleMaterial);
    this.product.add(bottleBody);

    // Liquid inside (amber/pink gradient)
    const liquidGeometry = new THREE.CylinderGeometry(24, 29, 70, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffa500,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.7,
      emissive: 0xe11d48,
      emissiveIntensity: 0.3
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = 5;
    this.product.add(liquid);

    // Bottle neck
    const neckGeometry = new THREE.CylinderGeometry(10, 25, 35, 32);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.y = 55;
    this.product.add(neck);

    // Cap (rose gold)
    const capGeometry = new THREE.CylinderGeometry(12, 12, 18, 32);
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0xe11d48,
      emissiveIntensity: 0.4
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 72;
    this.product.add(cap);

    // Glow effect
    const glowGeometry = new THREE.CylinderGeometry(27, 32, 92, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.product.add(glow);

    // Petals around the bottle
    for (let i = 0; i < 8; i++) {
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.bezierCurveTo(8, 8, 15, 12, 20, 8);
      petalShape.bezierCurveTo(25, 4, 20, -8, 12, -15);
      petalShape.bezierCurveTo(4, -22, 0, -15, 0, -8);
      petalShape.bezierCurveTo(0, -4, 0, 0, 0, 0);
      
      const petalGeometry = new THREE.ShapeGeometry(petalShape);
      petalGeometry.scale(1.5, 2, 1);
      
      const petalColor = i % 2 === 0 ? 0xe11d48 : 0xffa500;
      const petalMaterial = new THREE.MeshStandardMaterial({
        color: petalColor,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        emissive: petalColor,
        emissiveIntensity: 0.3
      });
      
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      const angle = (i / 8) * Math.PI * 2;
      petal.position.x = Math.cos(angle) * 45;
      petal.position.y = Math.sin(angle * 2) * 20;
      petal.position.z = Math.sin(angle) * 45;
      petal.rotation.z = angle;
      petal.rotation.y = angle;
      
      this.product.add(petal);
    }

    this.scene.add(this.product);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xe11d48, 2, 500);
    pointLight1.position.set(50, 50, 50);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffa500, 2, 500);
    pointLight2.position.set(-50, -50, 50);
    this.scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 50);
    this.scene.add(directionalLight);
  }

  private setupScrollListener() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.updateSectionBounds.bind(this));
    this.updateSectionBounds();
  }

  private updateSectionBounds() {
    const heroHeight = window.innerHeight;
    const surveyHeight = document.getElementById('survey')?.offsetTop || heroHeight;
    const aboutHeight = document.getElementById('philosophy')?.offsetTop || heroHeight * 2;
    const footerHeight = document.body.scrollHeight;

    this.sections = {
      hero: { start: 0, end: heroHeight, x: 0, y: 0, z: 500, scale: 0.6 },
      survey: { start: surveyHeight, end: surveyHeight + heroHeight, x: -350, y: 150, z: 400, scale: 0.5 },
      about: { start: aboutHeight, end: aboutHeight + heroHeight, x: 350, y: -150, z: 350, scale: 0.45 },
      footer: { start: footerHeight - heroHeight, end: footerHeight, x: 0, y: -250, z: 300, scale: 0.4 }
    };
  }

  private removeEventListeners() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    window.removeEventListener('resize', this.updateSectionBounds.bind(this));
    window.removeEventListener('resize', this.resize.bind(this));
  }

  private onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Determine current section and progress
    let currentSection: any = this.sections.hero;
    let nextSection: any = this.sections.survey;
    let progress = 0;

    if (scrollY < this.sections.hero.end) {
      currentSection = this.sections.hero;
      nextSection = this.sections.survey;
      progress = scrollY / this.sections.hero.end;
    } else if (scrollY < this.sections.survey.end) {
      currentSection = this.sections.survey;
      nextSection = this.sections.about;
      progress = (scrollY - this.sections.survey.start) / (this.sections.survey.end - this.sections.survey.start);
    } else if (scrollY < this.sections.about.end) {
      currentSection = this.sections.about;
      nextSection = this.sections.footer;
      progress = (scrollY - this.sections.about.start) / (this.sections.about.end - this.sections.about.start);
    } else {
      currentSection = this.sections.footer;
      nextSection = this.sections.footer;
      progress = 1;
    }

    // Interpolate position, scale, and rotation
    const x = THREE.MathUtils.lerp(currentSection.x, nextSection.x, progress);
    const y = THREE.MathUtils.lerp(currentSection.y, nextSection.y, progress);
    const z = THREE.MathUtils.lerp(currentSection.z, nextSection.z, progress);
    const scale = THREE.MathUtils.lerp(currentSection.scale, nextSection.scale, progress);

    if (this.product) {
      this.product.position.x = x;
      this.product.position.y = y;
      this.product.position.z = z;
      this.product.scale.set(scale, scale, scale);
    }
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

    if (this.product) {
      // Continuous rotation
      this.product.rotation.y += 0.01;
      
      // Floating animation
      this.product.position.y += Math.sin(elapsedTime) * 0.3;
      
      // Animate petals
      this.product.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.ShapeGeometry) {
          child.rotation.z += 0.005;
          child.rotation.y += 0.003;
          const angle = (index / 8) * Math.PI * 2;
          const floatRadius = 5;
          child.position.x = Math.cos(angle + elapsedTime * 0.5) * 45 + Math.cos(elapsedTime + index) * floatRadius;
          child.position.y = Math.sin(angle * 2 + elapsedTime * 0.3) * 20 + Math.sin(elapsedTime * 1.2 + index) * floatRadius;
        }
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}

