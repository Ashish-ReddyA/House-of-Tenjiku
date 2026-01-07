import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #threeContainer class="absolute inset-0 w-full h-full pointer-events-none"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ThreeSceneComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private particleSystem!: THREE.BufferGeometry;
  private mouse = new THREE.Vector2();
  private targetMouse = new THREE.Vector2();
  private animationId!: number;
  private shapes: THREE.Mesh[] = [];
  private edgeShapes: THREE.Mesh[] = [];
  private torusKnot!: THREE.Mesh;
  private clock = new THREE.Clock();

  ngOnInit() {
    // Initialize Three.js scene
    this.initScene();
    this.createParticles();
    this.createShapes();
    this.createEdgeElements();
    this.animate();
    this.setupEventListeners();
  }

  ngAfterViewInit() {
    // Ensure container is ready
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

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.001);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    this.camera.position.z = 1000;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Handle resize
    window.addEventListener('resize', () => this.resize());
  }

  private createParticles() {
    // Increased particle count with more pink flakes
    const particleCount = 6000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xffa500); // Amber
    const color2 = new THREE.Color(0xe11d48); // Rose/Pink
    const color3 = new THREE.Color(0xec4899); // Bright Pink
    const color4 = new THREE.Color(0xf472b6); // Light Pink

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 2500;
      positions[i3 + 1] = (Math.random() - 0.5) * 2500;
      positions[i3 + 2] = (Math.random() - 0.5) * 2500;

      // Color - bias toward pink/rose colors (70% pink, 30% amber)
      let color;
      const rand = Math.random();
      if (rand < 0.4) {
        // Pure pink/rose
        color = new THREE.Color().lerpColors(color2, color3, Math.random());
      } else if (rand < 0.7) {
        // Light pink
        color = new THREE.Color().lerpColors(color3, color4, Math.random());
      } else if (rand < 0.85) {
        // Rose to pink mix
        color = new THREE.Color().lerpColors(color2, color4, Math.random());
      } else {
        // Some amber mixed in
        const pinkColor = new THREE.Color().lerpColors(color2, color3, Math.random());
        color = new THREE.Color().lerpColors(color1, pinkColor, 0.3);
      }
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Size - pink flakes slightly larger
      sizes[i] = Math.random() * 5 + 1.5;

      // Velocity for dynamic movement
      velocities[i3] = (Math.random() - 0.5) * 0.6;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.6;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.6;
    }

    this.particleSystem = new THREE.BufferGeometry();
    this.particleSystem.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particleSystem.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.particleSystem.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    (this as any).particleVelocities = velocities;

    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(this.particleSystem, particleMaterial);
    this.scene.add(this.particles);
  }

  private createShapes() {
    // Create more geometric shapes for enhanced visuals
    const shapes = [
      { geometry: new THREE.IcosahedronGeometry(40, 0), color: 0xffa500 },
      { geometry: new THREE.OctahedronGeometry(35, 0), color: 0xe11d48 },
      { geometry: new THREE.TetrahedronGeometry(30, 0), color: 0xffa500 },
      { geometry: new THREE.DodecahedronGeometry(45, 0), color: 0xe11d48 },
      { geometry: new THREE.BoxGeometry(50, 50, 50), color: 0xffa500 },
      { geometry: new THREE.SphereGeometry(35, 16, 16), color: 0xe11d48 },
      { geometry: new THREE.ConeGeometry(30, 60, 8), color: 0xffa500 },
      { geometry: new THREE.TorusGeometry(30, 10, 16, 100), color: 0xe11d48 }
    ];

    shapes.forEach((shapeData, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: shapeData.color,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.5,
        wireframe: true,
        emissive: shapeData.color,
        emissiveIntensity: 0.4,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(shapeData.geometry, material);
      
      // Position shapes in a more dynamic pattern
      const angle = (index / shapes.length) * Math.PI * 2;
      const radius = 250 + Math.random() * 100;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle * 2) * radius * 0.6;
      mesh.position.z = (Math.random() - 0.5) * 400;
      
      // Store initial position for animation
      (mesh as any).initialPosition = mesh.position.clone();
      (mesh as any).rotationSpeed = {
        x: 0.01 + Math.random() * 0.01,
        y: 0.01 + Math.random() * 0.01,
        z: 0.005 + Math.random() * 0.005
      };
      
      this.shapes.push(mesh);
      this.scene.add(mesh);
    });

    // Create multiple torus knots for extra visual interest
    for (let i = 0; i < 3; i++) {
      const torusKnotGeometry = new THREE.TorusKnotGeometry(50 + i * 10, 8 + i * 2, 100, 16);
      const torusKnotMaterial = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xffa500 : 0xe11d48,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
        emissive: i % 2 === 0 ? 0xffa500 : 0xe11d48,
        emissiveIntensity: 0.5
      });
      
      const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
      torusKnot.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
      (torusKnot as any).rotationSpeed = {
        x: 0.01 + i * 0.005,
        y: 0.015 + i * 0.005,
        z: 0.005 + i * 0.003
      };
      this.scene.add(torusKnot);
      if (i === 0) this.torusKnot = torusKnot;
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Add more point lights with animation for better illumination
    const light1 = new THREE.PointLight(0xffa500, 2, 1500);
    light1.position.set(100, 100, 100);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0xe11d48, 2, 1500);
    light2.position.set(-100, -100, 100);
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0xffa500, 1.5, 1200);
    light3.position.set(0, 150, -100);
    this.scene.add(light3);

    const light4 = new THREE.PointLight(0xe11d48, 1.5, 1200);
    light4.position.set(150, -150, 0);
    this.scene.add(light4);

    // Add directional light for depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 200, 200);
    this.scene.add(directionalLight);

    // Add spotlights for dramatic effect
    const spotLight1 = new THREE.SpotLight(0xffa500, 2, 1000, Math.PI / 6, 0.5);
    spotLight1.position.set(200, 200, 200);
    this.scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0xe11d48, 2, 1000, Math.PI / 6, 0.5);
    spotLight2.position.set(-200, -200, 200);
    this.scene.add(spotLight2);

    // Store lights for animation
    (this as any).lights = [light1, light2, light3, light4];
    (this as any).spotLights = [spotLight1, spotLight2];
  }

  private createEdgeElements() {
    // Create shapes positioned at the edges of the screen
    const edgePositions = [
      // Top edge
      { x: -800, y: 600, z: -200 },
      { x: -600, y: 700, z: -100 },
      { x: -400, y: 650, z: -150 },
      { x: 400, y: 650, z: -150 },
      { x: 600, y: 700, z: -100 },
      { x: 800, y: 600, z: -200 },
      // Bottom edge
      { x: -800, y: -600, z: -200 },
      { x: -600, y: -700, z: -100 },
      { x: -400, y: -650, z: -150 },
      { x: 400, y: -650, z: -150 },
      { x: 600, y: -700, z: -100 },
      { x: 800, y: -600, z: -200 },
      // Left edge
      { x: -900, y: -500, z: -100 },
      { x: -900, y: -200, z: -150 },
      { x: -850, y: 0, z: -200 },
      { x: -900, y: 200, z: -150 },
      { x: -900, y: 500, z: -100 },
      // Right edge
      { x: 900, y: -500, z: -100 },
      { x: 900, y: -200, z: -150 },
      { x: 850, y: 0, z: -200 },
      { x: 900, y: 200, z: -150 },
      { x: 900, y: 500, z: -100 },
    ];

    const edgeShapeTypes = [
      { geometry: () => new THREE.IcosahedronGeometry(25, 0), color: 0xe11d48 },
      { geometry: () => new THREE.OctahedronGeometry(20, 0), color: 0xec4899 },
      { geometry: () => new THREE.TetrahedronGeometry(18, 0), color: 0xf472b6 },
      { geometry: () => new THREE.SphereGeometry(22, 12, 12), color: 0xe11d48 },
      { geometry: () => new THREE.TorusGeometry(20, 6, 12, 50), color: 0xec4899 },
      { geometry: () => new THREE.ConeGeometry(15, 40, 8), color: 0xf472b6 },
    ];

    edgePositions.forEach((pos, index) => {
      const shapeType = edgeShapeTypes[index % edgeShapeTypes.length];
      const geometry = shapeType.geometry();
      const material = new THREE.MeshStandardMaterial({
        color: shapeType.color,
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
        emissive: shapeType.color,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, pos.y, pos.z);
      
      // Store initial position and rotation speed
      (mesh as any).initialPosition = mesh.position.clone();
      (mesh as any).rotationSpeed = {
        x: 0.015 + Math.random() * 0.01,
        y: 0.015 + Math.random() * 0.01,
        z: 0.01 + Math.random() * 0.005
      };
      (mesh as any).floatSpeed = Math.random() * 0.02 + 0.01;
      
      this.edgeShapes.push(mesh);
      this.scene.add(mesh);
    });
  }

  private setupEventListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  private removeEventListeners() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('scroll', this.onScroll.bind(this));
    window.removeEventListener('resize', this.resize.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Enhanced mouse interaction - affect shapes directly
    const mouseInfluence = 0.3;
    this.shapes.forEach((shape, index) => {
      const initialPos = (shape as any).initialPosition;
      if (initialPos) {
        shape.position.x = initialPos.x + this.targetMouse.x * 100 * mouseInfluence;
        shape.position.y = initialPos.y + this.targetMouse.y * 100 * mouseInfluence;
      }
    });
  }

  private onScroll() {
    const scrollY = window.scrollY;
    this.camera.position.z = 1000 + scrollY * 0.5;
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

    // Smooth mouse movement with enhanced responsiveness
    this.mouse.lerp(this.targetMouse, 0.08);

    // Enhanced camera movement based on mouse
    const cameraDistance = 1000;
    const mouseInfluence = 80;
    this.camera.position.x += (this.mouse.x * mouseInfluence - this.camera.position.x) * 0.08;
    this.camera.position.y += (this.mouse.y * mouseInfluence - this.camera.position.y) * 0.08;
    
    // Add subtle camera rotation
    this.camera.rotation.z = this.mouse.x * 0.1;
    this.camera.lookAt(this.scene.position);

    // Enhanced particle rotation with mouse influence
    if (this.particles) {
      this.particles.rotation.x += 0.0008 + this.mouse.y * 0.0002;
      this.particles.rotation.y += 0.0015 + this.mouse.x * 0.0003;
      this.particles.rotation.z += 0.0003;
    }

    // Enhanced shape animations with individual rotation speeds
    this.shapes.forEach((shape, index) => {
      const rotationSpeed = (shape as any).rotationSpeed;
      if (rotationSpeed) {
        shape.rotation.x += rotationSpeed.x;
        shape.rotation.y += rotationSpeed.y;
        shape.rotation.z += rotationSpeed.z;
      } else {
        shape.rotation.x += 0.01 + index * 0.002;
        shape.rotation.y += 0.01 + index * 0.003;
      }
      
      const initialPos = (shape as any).initialPosition;
      if (initialPos) {
        shape.position.y = initialPos.y + Math.sin(elapsedTime + index) * 30;
        shape.position.x = initialPos.x + Math.cos(elapsedTime + index * 0.7) * 20;
        shape.position.z = initialPos.z + Math.sin(elapsedTime * 0.5 + index) * 25;
      }
    });

    // Animate all torus knots
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusKnotGeometry) {
        const rotationSpeed = (child as any).rotationSpeed;
        if (rotationSpeed) {
          child.rotation.x += rotationSpeed.x;
          child.rotation.y += rotationSpeed.y;
          child.rotation.z += rotationSpeed.z;
        }
        child.position.y += Math.sin(elapsedTime + child.position.x * 0.01) * 0.5;
      }
    });

    // Animate edge shapes
    this.edgeShapes.forEach((shape, index) => {
      const rotationSpeed = (shape as any).rotationSpeed;
      if (rotationSpeed) {
        shape.rotation.x += rotationSpeed.x;
        shape.rotation.y += rotationSpeed.y;
        shape.rotation.z += rotationSpeed.z;
      }
      
      const initialPos = (shape as any).initialPosition;
      const floatSpeed = (shape as any).floatSpeed || 0.01;
      if (initialPos) {
        // Floating animation
        shape.position.y = initialPos.y + Math.sin(elapsedTime * floatSpeed + index) * 30;
        shape.position.x = initialPos.x + Math.cos(elapsedTime * floatSpeed * 0.7 + index) * 20;
        shape.position.z = initialPos.z + Math.sin(elapsedTime * floatSpeed * 0.5 + index) * 25;
        
        // Pulsing glow effect
        const material = shape.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 2 + index) * 0.3;
      }
    });

    // Enhanced light animations
    const lights = (this as any).lights;
    if (lights && lights.length > 0) {
      lights[0].position.x = Math.cos(elapsedTime * 0.5) * 200;
      lights[0].position.y = Math.sin(elapsedTime * 0.5) * 200;
      lights[0].intensity = 2 + Math.sin(elapsedTime) * 0.5;
      
      lights[1].position.x = Math.cos(elapsedTime * 0.5 + Math.PI) * 200;
      lights[1].position.y = Math.sin(elapsedTime * 0.5 + Math.PI) * 200;
      lights[1].intensity = 2 + Math.cos(elapsedTime) * 0.5;
      
      if (lights[2]) {
        lights[2].position.z = Math.sin(elapsedTime * 0.7) * 150;
        lights[2].intensity = 1.5 + Math.sin(elapsedTime * 1.2) * 0.3;
      }
      
      if (lights[3]) {
        lights[3].position.x = Math.cos(elapsedTime * 0.6) * 180;
        lights[3].position.z = Math.sin(elapsedTime * 0.6) * 180;
      }
    }

    // Animate spotlights
    const spotLights = (this as any).spotLights;
    if (spotLights && spotLights.length > 0) {
      spotLights[0].position.x = Math.cos(elapsedTime * 0.4) * 250;
      spotLights[0].position.y = Math.sin(elapsedTime * 0.4) * 250;
      spotLights[1].position.x = Math.cos(elapsedTime * 0.4 + Math.PI) * 250;
      spotLights[1].position.y = Math.sin(elapsedTime * 0.4 + Math.PI) * 250;
    }

    // Enhanced particle animations with velocity
    if (this.particleSystem) {
      const positions = this.particleSystem.attributes.position.array as Float32Array;
      const velocities = (this as any).particleVelocities;
      
      for (let i = 0; i < positions.length; i += 3) {
        if (velocities) {
          positions[i] += velocities[i] + Math.sin(elapsedTime + i * 0.01) * 0.2;
          positions[i + 1] += velocities[i + 1] + Math.cos(elapsedTime + i * 0.01) * 0.2;
          positions[i + 2] += velocities[i + 2] + Math.sin(elapsedTime * 0.5 + i * 0.01) * 0.15;
        } else {
          positions[i + 1] += Math.sin(elapsedTime + i) * 0.15;
        }
        
        // Wrap around boundaries
        if (positions[i] > 1250) positions[i] = -1250;
        if (positions[i] < -1250) positions[i] = 1250;
        if (positions[i + 1] > 1250) positions[i + 1] = -1250;
        if (positions[i + 1] < -1250) positions[i + 1] = 1250;
        if (positions[i + 2] > 1250) positions[i + 2] = -1250;
        if (positions[i + 2] < -1250) positions[i + 2] = 1250;
      }
      this.particleSystem.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

