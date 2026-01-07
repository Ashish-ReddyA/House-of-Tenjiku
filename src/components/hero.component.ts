import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestService } from '../services/interest.service';
import { ThreeSceneComponent } from './three-scene.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ThreeSceneComponent],
  template: `
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      
      <!-- Enhanced 3D Scene Background -->
      <app-three-scene class="absolute inset-0 z-[1]"></app-three-scene>
      
      <!-- Premium Background Elements -->
      <div class="absolute inset-0 z-[2] w-full h-full opacity-40">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/20 via-rose-600/15 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-rose-700/20 via-amber-600/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.1),transparent_60%)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(28,25,23,0.5)_50%,transparent_100%)]"></div>
      </div>

      <!-- Background Image with Dark Overlay -->
      <div class="absolute inset-0 z-[2] w-full h-full">
        <img 
          src="/House-of-Tenjiku/image2.png" 
          alt="House of Tenjiku Background" 
          class="w-full h-full object-cover opacity-30"
        >
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950/80"></div>
      </div>

      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] z-[2]"></div>

      <!-- Content Container -->
      <div class="relative z-[10] text-center px-4 md:px-6 max-w-6xl fade-in py-4 md:py-6">
        <div class="inline-flex items-center gap-2 mb-3 md:mb-4">
          <div class="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500/60"></div>
          <p class="text-amber-500/90 tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs font-bold uppercase px-3 md:px-6 py-1.5 md:py-2.5 bg-neutral-900/80 backdrop-blur-md border border-amber-500/20 rounded-full">
            Launching Spring 2026
          </p>
          <div class="h-px w-8 md:w-12 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500/60"></div>
        </div>
        
        <div class="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div class="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/40"></div>
          <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500/60"></div>
          <div class="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/40"></div>
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif text-neutral-50 mb-3 md:mb-5 leading-tight tracking-tight">
          House of <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 italic">Tenjiku</span>
        </h1>

        <p class="text-base md:text-lg lg:text-xl text-neutral-300 font-light max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed backdrop-blur-sm px-2">
          We are crafting our signature collagen elixirs based on your voice. 
          Tell us what you desire, and we will create the formula based on your recommendations.
        </p>

        <!-- Product Introduction and Interest Count - Side by Side -->
        <div class="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6 max-w-5xl mx-auto">
          <!-- Product Introduction -->
          <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl border border-neutral-700/50 rounded-xl md:rounded-2xl p-4 md:p-5 flex-1 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-center gap-2 mb-2">
                <svg class="w-5 h-5 md:w-6 md:h-6 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
                <h2 class="text-base md:text-lg lg:text-xl font-serif text-neutral-50 font-bold">
                  Collagen Quick Liquid Shots
                </h2>
              </div>
              <p class="text-xs md:text-sm text-neutral-300 leading-relaxed mb-2">
                Quick and ready-to-drink liquid collagen shots designed for your busy lifestyle.
              </p>
              <div class="flex flex-wrap justify-center gap-2 md:gap-3 text-[10px] md:text-xs text-neutral-400">
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Ready to Drink</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Quick & Convenient</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Premium Collagen</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Interest Count Display with Button -->
          <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl border border-neutral-700/50 rounded-xl md:rounded-2xl p-4 md:p-5 flex-1 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-2xl"></div>
            <div class="relative z-10 flex flex-col items-center justify-center gap-3 md:gap-4">
              <!-- Count Display -->
              <div class="flex items-center gap-3">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <div class="text-center">
                  <div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 font-serif">
                    {{ interestService.interestCount() }}
                  </div>
                  <div class="text-[10px] md:text-xs text-neutral-400 uppercase tracking-wide">
                    People Interested
                  </div>
                </div>
              </div>
              
              <!-- Share Interest Button -->
              @if (interestService.hasClickedInterest()) {
                <button 
                  disabled
                  class="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold text-amber-400 transition-all duration-200 bg-amber-500/20 font-serif tracking-wide md:tracking-widest cursor-not-allowed shadow-lg border-2 border-amber-500/30 rounded-lg md:rounded-xl whitespace-nowrap"
                >
                  <svg class="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  INTEREST SHARED
                </button>
              } @else {
                <button 
                  (click)="incrementInterest()"
                  class="group relative inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold text-neutral-950 transition-all duration-300 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-serif tracking-wide md:tracking-widest hover:from-amber-400 hover:via-amber-300 hover:to-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/40 shadow-xl hover:shadow-amber-500/30 transform hover:scale-105 rounded-lg md:rounded-xl whitespace-nowrap overflow-hidden"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                  <span class="relative z-10 flex items-center gap-1.5 md:gap-2">
                    SHARE YOUR INTEREST
                    <svg class="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:scale-110 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </span>
                </button>
              }
              <p class="text-[10px] md:text-xs text-neutral-400 italic text-center leading-tight">
                Interested in collagen shots which are quick and ready to drink
              </p>
            </div>
          </div>
        </div>

        <button 
          (click)="scrollToSurvey()"
          class="group relative inline-flex items-center justify-center px-8 md:px-12 py-3 md:py-4 text-sm md:text-base font-bold text-neutral-950 transition-all duration-500 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-serif tracking-wide md:tracking-widest hover:from-amber-400 hover:via-amber-300 hover:to-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/40 shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 rounded-xl overflow-hidden mt-2 md:mt-4"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
          <span class="relative z-10 flex items-center gap-3">
            DESIGN YOUR PERFECT BLEND
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </span>
        </button>
      </div>

    </section>
  `,
  styles: []
})
export class HeroComponent {
  constructor(public interestService: InterestService) {}

  incrementInterest() {
    this.interestService.incrementInterest();
  }

  scrollToSurvey() {
    document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
  }
}