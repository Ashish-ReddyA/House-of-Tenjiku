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
          <a href="#contact" class="hover:text-amber-400 transition-colors">CONTACT</a>
        </div>
      </nav>

      <app-hero />
      
      <app-survey />
      
      <app-about-us />

      <!-- Contact Section -->
      <section id="contact" class="relative min-h-screen py-32 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 overflow-hidden">
        <!-- Premium Decorative Background Elements -->
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-rose-600/10 to-transparent rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-700/15 via-amber-600/10 to-transparent rounded-full blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.05),transparent_70%)]"></div>
        </div>

        <!-- Subtle Grid Pattern -->
        <div class="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div class="container mx-auto px-6 relative z-10 flex flex-col justify-center min-h-screen">
          <div class="max-w-4xl mx-auto text-center">
            <!-- Header -->
            <div class="inline-flex items-center gap-3 mb-8">
              <div class="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500/60"></div>
              <span class="text-amber-500/90 tracking-[0.5em] text-xs font-bold uppercase px-6 py-2.5 bg-neutral-900/80 backdrop-blur-md border border-amber-500/20 rounded-full">
                Get In Touch
              </span>
              <div class="h-px w-12 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500/60"></div>
            </div>
            
            <h2 class="text-5xl md:text-7xl lg:text-8xl font-serif text-neutral-50 mb-10 leading-tight tracking-tight">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400">Contact Us</span>
            </h2>
            
            <div class="flex items-center justify-center gap-4 mb-12">
              <div class="h-px w-20 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/40"></div>
              <div class="w-2 h-2 rounded-full bg-amber-500/60"></div>
              <div class="h-px w-20 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/40"></div>
            </div>

            <p class="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl mx-auto mb-16 font-light">
              Have questions? Want to learn more? Reach out to us and let's start a conversation about your wellness journey.
            </p>

            <!-- Contact Card -->
            <div class="bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border-2 border-neutral-700/50 shadow-2xl relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500"></div>
              <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
              <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-3xl"></div>
              
              <div class="relative z-10">
                <div class="flex flex-col items-center gap-8">
                  <!-- Email Icon -->
                  <div class="w-24 h-24 bg-gradient-to-br from-amber-500/20 to-rose-600/20 rounded-2xl flex items-center justify-center border-2 border-amber-500/30 backdrop-blur-sm">
                    <svg class="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>

                  <!-- Email Address -->
                  <div class="text-center">
                    <p class="text-neutral-400 text-sm uppercase tracking-wider mb-4">Email Us</p>
                    <a 
                      href="mailto:contact@houseoftenjiku.com" 
                      class="text-2xl md:text-3xl lg:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-300 hover:via-amber-400 hover:to-rose-300 transition-all duration-300 inline-block"
                    >
                      contact@houseoftenjiku.com
                    </a>
                  </div>

                  <!-- Divider -->
                  <div class="flex items-center justify-center gap-4 w-full my-4">
                    <div class="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-700 to-neutral-700"></div>
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
                    <div class="h-px flex-1 bg-gradient-to-l from-transparent via-neutral-700 to-neutral-700"></div>
                  </div>

                  <!-- Message -->
                  <p class="text-neutral-300 text-lg leading-relaxed max-w-2xl font-light italic">
                    We're here to listen, to understand, and to create. Your voice shapes what we build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer id="footer" class="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-12 border-t border-neutral-800/50 backdrop-blur-sm">
        <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <div class="mb-4 md:mb-0">
            &copy; 2026 House of Tenjiku. All rights reserved.
          </div>
          <div class="flex space-x-6">
            <a href="#" class="hover:text-amber-400 transition-colors">Instagram</a>
            <a href="#" class="hover:text-amber-400 transition-colors">TikTok</a>
            <a href="#" class="hover:text-amber-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </main>
  `
})
export class AppComponent {}