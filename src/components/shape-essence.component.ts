import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Petals3dComponent } from './petals-3d.component';

@Component({
  selector: 'app-shape-essence',
  standalone: true,
  imports: [CommonModule, Petals3dComponent],
  template: `
    <section id="essence" class="relative py-40 min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
      
      <!-- 3D Petals Background -->
      <app-petals-3d [intensity]="1.8" color="amber" class="absolute inset-0 z-[1]"></app-petals-3d>
      
      <!-- Premium Decorative Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full z-[2] opacity-30">
        <div class="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/20 via-rose-600/15 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-rose-700/20 via-amber-600/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.08),transparent_60%)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(28,25,23,0.4)_50%,transparent_100%)]"></div>
      </div>

      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 z-[2] opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div class="container mx-auto px-6 relative z-[10]">
        
        <!-- Premium Header Section -->
        <div class="text-center max-w-5xl mx-auto mb-24">
          <h2 class="text-5xl md:text-7xl lg:text-8xl font-serif text-neutral-50 mb-10 leading-[1.1] tracking-tight">
            Shape Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 italic">Essence</span>
          </h2>
          <div class="flex items-center justify-center gap-4 mb-10">
            <div class="h-px w-20 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/40"></div>
            <div class="w-2 h-2 rounded-full bg-amber-500/60"></div>
            <div class="h-px w-20 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/40"></div>
          </div>
          <p class="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl mx-auto font-light">
            Discover the pillars that define your wellness journey. Each element shapes your unique path to renewal and vitality.
          </p>
        </div>

        <!-- Premium Main Content Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          
          <!-- Card 1: Intention -->
          <div class="group relative bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl rounded-3xl p-10 border border-neutral-700/50 hover:border-amber-500/40 transition-all duration-700 shadow-2xl hover:shadow-amber-500/10 transform hover:-translate-y-3 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-amber-500/20 backdrop-blur-sm">
                <svg class="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-3xl md:text-4xl font-serif text-neutral-50 mb-5 tracking-tight">Intention</h3>
              <p class="text-neutral-400 leading-relaxed mb-8 text-lg">
                Set your purpose. Define what wellness means to you—whether it's radiant skin, joint mobility, or inner vitality.
              </p>
              <div class="flex items-center text-amber-400 font-semibold text-sm tracking-wider group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 2: Ritual -->
          <div class="group relative bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl rounded-3xl p-10 border border-neutral-700/50 hover:border-rose-500/40 transition-all duration-700 shadow-2xl hover:shadow-rose-500/10 transform hover:-translate-y-3 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-rose-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-rose-500/20 backdrop-blur-sm">
                <svg class="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 class="text-3xl md:text-4xl font-serif text-neutral-50 mb-5 tracking-tight">Ritual</h3>
              <p class="text-neutral-400 leading-relaxed mb-8 text-lg">
                Create your daily practice. Transform a simple moment into a sacred act of self-care and renewal.
              </p>
              <div class="flex items-center text-rose-400 font-semibold text-sm tracking-wider group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 3: Transformation -->
          <div class="group relative bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl rounded-3xl p-10 border border-neutral-700/50 hover:border-purple-500/40 transition-all duration-700 shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-3 overflow-hidden md:col-span-2 lg:col-span-1">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20 backdrop-blur-sm">
                <svg class="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-3xl md:text-4xl font-serif text-neutral-50 mb-5 tracking-tight">Transformation</h3>
              <p class="text-neutral-400 leading-relaxed mb-8 text-lg">
                Witness the evolution. From the first sip to lasting change, track your journey toward radiant wellness.
              </p>
              <div class="flex items-center text-purple-400 font-semibold text-sm tracking-wider group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 4: Harmony - Premium Featured Card -->
          <div class="group relative bg-gradient-to-br from-amber-600/20 via-neutral-900 to-neutral-900 rounded-3xl p-12 md:p-14 border-2 border-amber-500/30 hover:border-amber-400/50 transition-all duration-700 shadow-2xl hover:shadow-amber-500/20 transform hover:-translate-y-3 overflow-hidden md:col-span-2">
            <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-transparent rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-3xl"></div>
            <div class="relative z-10">
              <div class="w-24 h-24 bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border-2 border-amber-400/30 backdrop-blur-sm shadow-lg shadow-amber-500/20">
                <svg class="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-4xl md:text-5xl font-serif text-neutral-50 mb-6 tracking-tight">Harmony</h3>
              <p class="text-neutral-300 leading-relaxed mb-10 text-xl max-w-2xl">
                Balance is the essence of wellness. Align your body, mind, and spirit through mindful choices and premium nourishment.
              </p>
              <div class="flex items-center text-amber-300 font-semibold text-sm tracking-wider group-hover:gap-4 transition-all">
                <span class="text-lg">Discover Balance</span>
                <svg class="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Card 5: Essence -->
          <div class="group relative bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl rounded-3xl p-10 border border-neutral-700/50 hover:border-rose-500/40 transition-all duration-700 shadow-2xl hover:shadow-rose-500/10 transform hover:-translate-y-3 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-rose-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-rose-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-rose-500/20 backdrop-blur-sm">
                <svg class="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-3xl md:text-4xl font-serif text-neutral-50 mb-5 tracking-tight">Essence</h3>
              <p class="text-neutral-400 leading-relaxed mb-8 text-lg">
                Your unique signature. Blend flavors, set potency, and craft a formula that resonates with your authentic self.
              </p>
              <div class="flex items-center text-rose-400 font-semibold text-sm tracking-wider group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </div>

        </div>

        <!-- Premium Call to Action Section -->
        <div class="relative max-w-6xl mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-600/15 to-amber-500/10 rounded-[2.5rem] blur-3xl"></div>
          <div class="relative bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-2xl rounded-[2.5rem] p-16 md:p-20 border-2 border-neutral-700/50 shadow-2xl overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-3xl"></div>
            
            <div class="text-center relative z-10">
              <h3 class="text-4xl md:text-6xl lg:text-7xl font-serif text-neutral-50 mb-8 leading-tight tracking-tight">
                Begin Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 italic">Journey</span>
              </h3>
              <div class="flex items-center justify-center gap-3 mb-10">
                <div class="h-px w-16 bg-gradient-to-r from-transparent via-neutral-600 to-neutral-600"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
                <div class="h-px w-16 bg-gradient-to-l from-transparent via-neutral-600 to-neutral-600"></div>
              </div>
              <p class="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Every essence is unique. Start shaping yours today by sharing your vision and preferences.
              </p>
              <button 
                (click)="scrollToSurvey()"
                class="group relative inline-flex items-center justify-center px-14 py-6 text-lg font-bold text-neutral-950 transition-all duration-500 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-serif tracking-widest hover:from-amber-400 hover:via-amber-300 hover:to-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/40 shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 rounded-xl overflow-hidden"
              >
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                <span class="relative z-10 flex items-center gap-3">
                  SHAPE YOUR ESSENCE
                  <svg class="w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ShapeEssenceComponent {
  scrollToSurvey() {
    document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
  }
}

