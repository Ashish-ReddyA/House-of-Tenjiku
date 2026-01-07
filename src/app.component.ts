import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero.component';
import { SurveyComponent } from './components/survey.component';
import { AboutUsComponent } from './components/about-us.component';
import { LogoComponent } from './components/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, SurveyComponent, AboutUsComponent, LogoComponent],
  template: `
    <main class="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-amber-500/30 selection:text-neutral-50">
      
      <!-- Nav Placeholder -->
      <nav class="absolute top-0 w-full p-6 z-50 flex justify-between items-center bg-transparent">
        
        <!-- Logo Section -->
        <app-logo />

        <div class="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-neutral-300">
          <a href="#survey" class="hover:text-amber-400 transition-colors">ESSENCE</a>
          <a href="#philosophy" class="hover:text-amber-400 transition-colors">PHILOSOPHY</a>
          <a href="#" class="hover:text-amber-400 transition-colors">INGREDIENTS</a>
          <a href="#" class="hover:text-amber-400 transition-colors">CONTACT</a>
        </div>
      </nav>

      <app-hero />
      
      <app-survey />
      
      <app-about-us />

      <footer id="footer" class="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-12 border-t border-neutral-800/50 backdrop-blur-sm">
        <div class="container mx-auto px-6 flex flex-col justify-center items-center min-h-screen text-sm text-neutral-400">
          <div class="text-center mb-8">
            <h3 class="text-4xl md:text-6xl font-serif text-neutral-50 mb-6">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Thank You</span>
            </h3>
            <p class="text-neutral-300 text-lg mb-12 max-w-2xl">
              Your journey with House of Tenjiku begins here. We're crafting something extraordinary, just for you.
            </p>
          </div>
          <div class="w-full flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              &copy; 2026 House of Tenjiku. All rights reserved.
            </div>
            <div class="flex space-x-6">
              <a href="#" class="hover:text-amber-400 transition-colors">Instagram</a>
              <a href="#" class="hover:text-amber-400 transition-colors">TikTok</a>
              <a href="#" class="hover:text-amber-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  `
})
export class AppComponent {}