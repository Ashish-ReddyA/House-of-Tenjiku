import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestService } from '../services/interest.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden bg-rose-50 text-stone-900">
      
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 w-full h-full">
        <img 
          src="/image2.png" 
          alt="House of Tenjiku Background" 
          class="w-full h-full object-cover"
        >
        <!-- Very light overlay to ensure text contrast without hiding the beautiful image -->
        <div class="absolute inset-0 bg-gradient-to-b from-rose-50/10 via-transparent to-rose-50/20"></div>
        <div class="absolute inset-0 bg-white/10 mix-blend-soft-light"></div>
      </div>

      <!-- Content Container -->
      <div class="relative z-20 text-center px-6 max-w-4xl fade-in pt-10 md:pt-0">
        <p class="text-rose-900 tracking-[0.3em] text-sm md:text-base mb-6 font-semibold uppercase drop-shadow-sm bg-white/60 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
          Launching Spring 2026
        </p>
        
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-rose-900 to-transparent mx-auto mb-8"></div>

        <p class="text-xl md:text-2xl text-stone-800 font-normal max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md bg-white/30 backdrop-blur-[2px] rounded-lg p-4">
          We are crafting our signature collagen elixirs based on your voice. 
          Tell us what you desire, and we will create the formula based on your recommendations.
        </p>

        <!-- Product Introduction and Interest Count - Side by Side -->
        <div class="flex flex-col md:flex-row gap-6 mb-6 max-w-5xl mx-auto">
          <!-- Product Introduction -->
          <div class="bg-white/80 backdrop-blur-sm border-2 border-rose-200 rounded-lg p-5 md:p-6 flex-1 drop-shadow-md">
            <div class="flex items-center justify-center gap-3 mb-3 md:mb-4">
              <svg class="w-6 h-6 md:w-7 md:h-7 text-rose-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              <h2 class="text-xl md:text-2xl lg:text-3xl font-serif text-rose-900 font-bold">
                Collagen Quick Liquid Shots
              </h2>
            </div>
            <p class="text-sm md:text-base lg:text-lg text-stone-700 leading-relaxed mb-3 md:mb-4">
              Quick and ready-to-drink liquid collagen shots designed for your busy lifestyle. 
              No mixing, no waiting—just pure wellness in every sip.
            </p>
            <div class="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-stone-600">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-rose-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Ready to Drink</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-rose-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Quick & Convenient</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-rose-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Premium Collagen</span>
              </div>
            </div>
          </div>

          <!-- Interest Count Display with Button -->
          <div class="bg-white/70 backdrop-blur-sm border-2 border-rose-200 rounded-lg p-5 md:p-6 flex-1 drop-shadow-md">
            <div class="flex flex-col items-center justify-center gap-5 md:gap-6">
              <!-- Count Display -->
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 md:w-10 md:h-10 text-rose-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <div class="text-center">
                  <div class="text-4xl md:text-5xl font-bold text-rose-900 font-serif">
                    {{ interestService.interestCount() }}
                  </div>
                  <div class="text-xs md:text-sm text-stone-600 uppercase tracking-wide mt-1">
                    People Interested
                  </div>
                </div>
              </div>
              
              <!-- Share Interest Button -->
              @if (interestService.hasClickedInterest()) {
                <button 
                  disabled
                  class="inline-flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold text-rose-900 transition-all duration-200 bg-rose-100 font-serif tracking-widest cursor-not-allowed shadow-lg border-2 border-rose-300 whitespace-nowrap"
                >
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  INTEREST SHARED
                </button>
              } @else {
                <button 
                  (click)="incrementInterest()"
                  class="group relative inline-flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold text-white transition-all duration-200 bg-rose-900 font-serif tracking-widest hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                >
                  SHARE YOUR INTEREST
                  <svg class="w-4 h-4 ml-2 transition-transform group-hover:scale-110 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              }
            </div>
            <p class="text-xs text-stone-500 mt-4 italic text-center">
              Interested in collagen shots which are quick and ready to drink
            </p>
          </div>
        </div>

        <button 
          (click)="scrollToSurvey()"
          class="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-rose-900 font-serif tracking-widest hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900 shadow-xl"
        >
          DESIGN YOUR PERFECT BLEND
          <svg class="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
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