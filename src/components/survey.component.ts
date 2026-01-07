import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="survey" class="relative py-32 px-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-[80vh] flex flex-col items-center justify-center overflow-visible">
      
      <!-- Premium Background Elements -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 via-rose-600/8 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-700/10 via-amber-600/8 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.05),transparent_70%)]"></div>
      </div>

      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div class="max-w-5xl w-full relative z-10">
        
        <!-- Premium Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-3 mb-8">
            <div class="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500/60"></div>
            <span class="text-amber-500/90 tracking-[0.5em] text-xs font-bold uppercase px-6 py-2.5 bg-neutral-900/80 backdrop-blur-md border border-amber-500/20 rounded-full">
              Your Journey Begins
            </span>
            <div class="h-px w-12 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500/60"></div>
          </div>
          <h2 class="text-5xl md:text-6xl lg:text-7xl font-serif text-neutral-50 mb-6 leading-tight tracking-tight">
            Shape Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 italic">Essence</span>
          </h2>
          <div class="flex items-center justify-center gap-3 mb-8">
            <div class="h-px w-16 bg-gradient-to-r from-transparent via-neutral-600 to-neutral-600"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
            <div class="h-px w-16 bg-gradient-to-l from-transparent via-neutral-600 to-neutral-600"></div>
          </div>
          <p class="text-neutral-300 text-lg md:text-xl max-w-3xl mx-auto mb-6 leading-relaxed font-light">
            We are crafting the ultimate wellness ritual. Share your desires, and help us create a formula that speaks to your needs.
          </p>
          <p class="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 font-serif max-w-2xl mx-auto">
            Share Your Recommendations
          </p>
        </div>

        @if (isLoading()) {
          <div class="flex flex-col items-center justify-center py-32 space-y-8">
            <div class="relative">
              <div class="w-20 h-20 border-4 border-neutral-700 border-t-amber-500 rounded-full animate-spin"></div>
              <div class="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-rose-500 rounded-full animate-spin" style="animation-duration: 1.5s; animation-direction: reverse;"></div>
            </div>
            <p class="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Consulting the Alchemist...</p>
          </div>
        } @else if (result()) {
          <!-- Premium Result View -->
          <div class="bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-2xl border-2 border-neutral-700/50 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden fade-in">
             <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500"></div>
             <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
             <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-3xl"></div>
             
             <div class="relative z-10">
               <div class="flex items-center gap-3 mb-8">
                 <div class="h-px w-12 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
                 <h3 class="text-xs font-bold tracking-widest text-amber-400/80 uppercase">The Oracle Speaks</h3>
                 <div class="h-px flex-1 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
               </div>
               <div class="prose prose-invert prose-lg max-w-none font-serif leading-relaxed whitespace-pre-line text-neutral-200 prose-headings:text-neutral-50 prose-p:text-neutral-300">
                  {{ result() }}
               </div>

               <div class="mt-16 pt-10 border-t border-neutral-700/50 text-center">
                 <p class="text-neutral-400 mb-8 italic text-lg">
                   "Thank you, <span class="text-amber-400 font-semibold not-italic">{{nameInput}}</span>. Your preferences have been archived in the House of Tenjiku. 
                   We will notify <span class="text-rose-400 font-semibold not-italic">{{emailInput}}</span> when this creation comes to life."
                 </p>
                 <button (click)="reset()" class="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors underline decoration-amber-500/50 hover:decoration-amber-400">
                   Submit Another Profile
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                   </svg>
                 </button>
               </div>
             </div>
          </div>
        } @else {
          <!-- Premium Survey Form -->
          <div class="space-y-12">
            
            <!-- SECTION 1: The Seeker -->
            <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl p-10 rounded-3xl border border-neutral-700/50 shadow-2xl relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-10">
                  <div class="h-px w-8 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
                  <h3 class="text-xs font-bold tracking-[0.3em] text-amber-400/90 uppercase">I. The Seeker</h3>
                  <div class="h-px flex-1 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
                </div>
                <div class="grid md:grid-cols-2 gap-8">
                  <div class="space-y-3">
                    <label class="block text-lg font-serif text-neutral-200">Your Name</label>
                    <input 
                      [(ngModel)]="nameInput"
                      type="text" 
                      class="w-full p-4 bg-neutral-800/50 border-b-2 border-neutral-700 focus:border-amber-500 outline-none transition-colors text-neutral-100 placeholder-neutral-500 rounded-t-lg backdrop-blur-sm"
                      placeholder="Enter your name"
                    >
                  </div>
                  <div class="space-y-3">
                     <label class="block text-lg font-serif text-neutral-200">Email Address</label>
                     <input 
                      [(ngModel)]="emailInput"
                      type="email" 
                      class="w-full p-4 bg-neutral-800/50 border-b-2 border-neutral-700 focus:border-amber-500 outline-none transition-colors text-neutral-100 placeholder-neutral-500 rounded-t-lg backdrop-blur-sm"
                      placeholder="For launch updates"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 2: The Vessel -->
            <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl p-10 rounded-3xl border border-neutral-700/50 shadow-2xl relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-2xl"></div>
              <div class="relative z-10">
                 <div class="flex items-center gap-3 mb-10">
                   <div class="h-px w-8 bg-gradient-to-r from-rose-500/60 to-transparent"></div>
                   <h3 class="text-xs font-bold tracking-[0.3em] text-rose-400/90 uppercase">II. The Vessel</h3>
                   <div class="h-px flex-1 bg-gradient-to-r from-rose-500/60 to-transparent"></div>
                 </div>
                 
                 <div class="grid md:grid-cols-2 gap-12">
                   <!-- Source -->
                   <div class="space-y-5">
                      <label class="block text-xl font-serif text-neutral-200">Preferred Source</label>
                      <div class="flex flex-col gap-4">
                        @for (opt of sourceOptions; track opt) {
                          <label class="flex items-center space-x-4 cursor-pointer group p-3 rounded-lg hover:bg-neutral-800/50 transition-colors">
                            <input type="radio" [name]="'source'" [value]="opt" [checked]="selectedSource() === opt" (change)="selectedSource.set(opt); $event.stopPropagation()" class="form-radio text-amber-500 focus:ring-amber-500 h-5 w-5 border-neutral-600 bg-neutral-800">
                            <span class="text-neutral-300 group-hover:text-neutral-100 transition-colors">{{ opt }}</span>
                          </label>
                        }
                      </div>
                   </div>

                   <!-- Experience -->
                   <div class="space-y-5">
                      <label class="block text-xl font-serif text-neutral-200">Experience Level</label>
                       <div class="flex flex-col gap-4">
                        @for (opt of experienceOptions; track opt) {
                          <label class="flex items-center space-x-4 cursor-pointer group p-3 rounded-lg hover:bg-neutral-800/50 transition-colors">
                            <input type="radio" [name]="'exp'" [value]="opt" [checked]="selectedExperience() === opt" (change)="selectedExperience.set(opt); $event.stopPropagation()" class="form-radio text-amber-500 focus:ring-amber-500 h-5 w-5 border-neutral-600 bg-neutral-800">
                            <span class="text-neutral-300 group-hover:text-neutral-100 transition-colors">{{ opt }}</span>
                          </label>
                        }
                      </div>
                   </div>
                 </div>
              </div>
            </div>

            <!-- SECTION 3: The Ritual -->
            <div class="bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-xl p-10 md:p-12 rounded-3xl border-2 border-neutral-700/50 shadow-2xl relative overflow-hidden">
              <!-- Enhanced Background Effects -->
              <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/15 via-purple-400/10 to-transparent rounded-full blur-3xl"></div>
              <div class="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-amber-500/10 via-purple-500/8 to-transparent rounded-full blur-3xl"></div>
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.08),transparent_60%)]"></div>
              
              <div class="relative z-10">
                 <!-- Enhanced Header -->
                 <div class="flex items-center gap-4 mb-12">
                   <div class="h-px w-12 bg-gradient-to-r from-transparent via-purple-500/60 to-purple-500/60"></div>
                   <div class="flex items-center gap-3">
                     <div class="w-2 h-2 rounded-full bg-purple-400/80 shadow-lg shadow-purple-500/30"></div>
                     <h3 class="text-xs font-bold tracking-[0.4em] text-purple-400/90 uppercase">III. The Ritual</h3>
                     <div class="w-2 h-2 rounded-full bg-purple-400/80 shadow-lg shadow-purple-500/30"></div>
                   </div>
                   <div class="h-px flex-1 bg-gradient-to-r from-purple-500/60 to-transparent"></div>
                 </div>
                 
                 <div class="space-y-12">
                    <!-- Packaging - Enhanced Design -->
                    <div class="space-y-6">
                      <div class="flex items-center gap-3 mb-2">
                        <div class="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                        <label class="text-2xl font-serif text-neutral-100 font-semibold">Preferred Format</label>
                      </div>
                      <p class="text-sm text-neutral-400 italic ml-4">Choose how you'd like to receive your elixir</p>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        @for (opt of packagingOptions; track opt) {
                          <button 
                            type="button"
                            (click)="selectedPackaging.set(opt); $event.stopPropagation()"
                            [class.bg-gradient-to-br]="selectedPackaging() === opt"
                            [class.from-amber-500]="selectedPackaging() === opt"
                            [class.via-amber-500]="selectedPackaging() === opt"
                            [class.to-amber-600]="selectedPackaging() === opt"
                            [class.text-neutral-950]="selectedPackaging() === opt"
                            [class.border-amber-400]="selectedPackaging() === opt"
                            [class.shadow-amber-500/40]="selectedPackaging() === opt"
                            [class.ring-2]="selectedPackaging() === opt"
                            [class.ring-amber-500/50]="selectedPackaging() === opt"
                            [class.bg-neutral-800/60]="selectedPackaging() !== opt"
                            [class.text-neutral-300]="selectedPackaging() !== opt"
                            [class.border-neutral-700/50]="selectedPackaging() !== opt"
                            class="group relative py-5 px-6 rounded-2xl transition-all duration-300 font-medium border-2 hover:border-amber-500/50 hover:bg-neutral-800/80 hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] backdrop-blur-sm"
                          >
                            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-white/0 transition-all duration-300"></div>
                            <span class="relative z-10 block text-center font-semibold leading-tight">{{ opt }}</span>
                          </button>
                        }
                      </div>
                    </div>

                    <!-- Dosage & Supply - Enhanced Grid Design -->
                     <div class="grid md:grid-cols-2 gap-10">
                        <!-- Potency -->
                        <div class="space-y-6 bg-neutral-800/30 rounded-2xl p-6 border border-neutral-700/30 backdrop-blur-sm">
                          <div class="flex items-center gap-3 mb-2">
                            <div class="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                            <label class="text-xl font-serif text-neutral-100 font-semibold">Potency</label>
                          </div>
                          <p class="text-xs text-neutral-400 italic ml-4">Strength per serving</p>
                          <div class="flex flex-wrap gap-3 mt-4">
                            @for (opt of dosageOptions; track opt) {
                              <button 
                                type="button"
                                (click)="selectedDosage.set(opt); $event.stopPropagation()"
                                [class.bg-gradient-to-r]="selectedDosage() === opt"
                                [class.from-amber-500]="selectedDosage() === opt"
                                [class.to-amber-600]="selectedDosage() === opt"
                                [class.text-neutral-950]="selectedDosage() === opt"
                                [class.border-amber-400]="selectedDosage() === opt"
                                [class.shadow-amber-500/30]="selectedDosage() === opt"
                                [class.ring-2]="selectedDosage() === opt"
                                [class.ring-amber-500/40]="selectedDosage() === opt"
                                [class.bg-neutral-800/50]="selectedDosage() !== opt"
                                [class.text-neutral-300]="selectedDosage() !== opt"
                                [class.border-neutral-700/50]="selectedDosage() !== opt"
                                class="group relative py-3 px-6 rounded-xl transition-all duration-300 font-semibold border-2 hover:border-amber-500/50 hover:bg-neutral-800/70 hover:shadow-lg hover:shadow-amber-500/15 hover:scale-105 text-sm"
                              >
                                <span class="relative z-10">{{ opt }}</span>
                              </button>
                            }
                          </div>
                        </div>

                        <!-- Supply Size -->
                        <div class="space-y-6 bg-neutral-800/30 rounded-2xl p-6 border border-neutral-700/30 backdrop-blur-sm">
                          <div class="flex items-center gap-3 mb-2">
                            <div class="w-1 h-6 bg-gradient-to-b from-rose-400 to-rose-600 rounded-full"></div>
                            <label class="text-xl font-serif text-neutral-100 font-semibold">Supply Size</label>
                          </div>
                          <p class="text-xs text-neutral-400 italic ml-4">Choose your commitment</p>
                          <div class="flex flex-wrap gap-3 mt-4">
                            @for (opt of packSizeOptions; track opt) {
                              <button 
                                type="button"
                                (click)="selectedPackSize.set(opt); $event.stopPropagation()"
                                [class.bg-gradient-to-r]="selectedPackSize() === opt"
                                [class.from-rose-500]="selectedPackSize() === opt"
                                [class.to-rose-600]="selectedPackSize() === opt"
                                [class.text-neutral-950]="selectedPackSize() === opt"
                                [class.border-rose-400]="selectedPackSize() === opt"
                                [class.shadow-rose-500/30]="selectedPackSize() === opt"
                                [class.ring-2]="selectedPackSize() === opt"
                                [class.ring-rose-500/40]="selectedPackSize() === opt"
                                [class.bg-neutral-800/50]="selectedPackSize() !== opt"
                                [class.text-neutral-300]="selectedPackSize() !== opt"
                                [class.border-neutral-700/50]="selectedPackSize() !== opt"
                                class="group relative py-3 px-6 rounded-xl transition-all duration-300 font-semibold border-2 hover:border-rose-500/50 hover:bg-neutral-800/70 hover:shadow-lg hover:shadow-rose-500/15 hover:scale-105 text-sm"
                              >
                                <span class="relative z-10">{{ opt }}</span>
                              </button>
                            }
                          </div>
                        </div>
                     </div>
                 </div>
              </div>
            </div>


            <!-- SECTION 4: The Essence -->
            <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl p-10 rounded-3xl border border-neutral-700/50 shadow-2xl relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-transparent rounded-full blur-2xl"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-10">
                  <div class="h-px w-8 bg-gradient-to-r from-rose-500/60 to-transparent"></div>
                  <h3 class="text-xs font-bold tracking-[0.3em] text-rose-400/90 uppercase">IV. The Essence</h3>
                  <div class="h-px flex-1 bg-gradient-to-r from-rose-500/60 to-transparent"></div>
                </div>

                <!-- Flavors -->
                <div class="space-y-6 mb-10">
                  <label class="block text-2xl font-serif text-neutral-200">Which flavors speak to your soul?</label>
                  <p class="text-neutral-400 text-sm italic">Select up to 3 from the list below, or write your own custom flavor</p>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    @for (flavor of flavorOptions(); track flavor) {
                      <button 
                        type="button"
                        (click)="toggleFlavor(flavor); $event.stopPropagation()"
                        [class.bg-gradient-to-br]="selectedFlavors().includes(flavor)"
                        [class.from-rose-600]="selectedFlavors().includes(flavor)"
                        [class.to-rose-700]="selectedFlavors().includes(flavor)"
                        [class.text-white]="selectedFlavors().includes(flavor)"
                        [class.border-rose-500/50]="selectedFlavors().includes(flavor)"
                        [class.shadow-rose-500/30]="selectedFlavors().includes(flavor)"
                        [class.bg-neutral-800/50]="!selectedFlavors().includes(flavor)"
                        [class.text-neutral-300]="!selectedFlavors().includes(flavor)"
                        [class.border-neutral-700]="!selectedFlavors().includes(flavor)"
                        class="py-4 px-3 rounded-xl transition-all duration-300 hover:shadow-lg font-medium text-center relative overflow-hidden group border-2 hover:border-rose-500/50"
                      >
                        <span class="relative z-10">{{ flavor }}</span>
                      </button>
                    }
                  </div>
                  
                  <!-- Custom Flavor Input -->
                  <div class="mt-6">
                     <label class="block text-lg font-serif text-neutral-200 mb-3">Or write your own custom flavor:</label>
                     <input 
                       [(ngModel)]="customFlavorInput" 
                       type="text" 
                       placeholder="e.g., Strawberry Basil, Vanilla Chai, etc." 
                       class="w-full p-4 bg-neutral-800/50 border-2 border-neutral-700 rounded-xl focus:border-amber-500 outline-none placeholder-neutral-500 text-neutral-100 backdrop-blur-sm transition-colors"
                     >
                  </div>
                </div>

                <!-- Benefits -->
                <div class="space-y-6">
                  <label class="block text-2xl font-serif text-neutral-200">What is your primary goal?</label>
                  <div class="flex flex-wrap gap-3">
                    @for (need of needOptions; track need) {
                       <button 
                        type="button"
                        (click)="toggleNeed(need); $event.stopPropagation()"
                        [class.ring-2]="selectedNeeds().includes(need)"
                        [class.ring-amber-500]="selectedNeeds().includes(need)"
                        [class.bg-amber-500/20]="selectedNeeds().includes(need)"
                        [class.text-amber-300]="selectedNeeds().includes(need)"
                        [class.border-amber-500/50]="selectedNeeds().includes(need)"
                        class="px-6 py-3 rounded-full border-2 border-neutral-700 text-neutral-300 hover:border-amber-500/50 hover:text-neutral-100 transition-all bg-neutral-800/30 backdrop-blur-sm"
                      >
                        {{ need }}
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 5: The Dream -->
            <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl p-10 rounded-3xl border border-neutral-700/50 shadow-2xl relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl"></div>
              <div class="relative z-10 space-y-5">
                <div class="flex items-center gap-3 mb-6">
                  <div class="h-px w-8 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
                  <label class="block text-2xl font-serif text-neutral-200">V. The Dream</label>
                  <div class="h-px flex-1 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
                </div>
                <textarea 
                  [(ngModel)]="openTextInput"
                  rows="5"
                  class="w-full p-5 bg-neutral-800/50 border-2 border-neutral-700 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder-neutral-500 text-neutral-100 backdrop-blur-sm resize-none"
                  placeholder="Describe your perfect morning ritual or specific dietary needs..."
                ></textarea>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="relative z-20 mt-8">
              <button 
                type="button"
                (click)="submit()"
                [disabled]="!isValid() || isLoading()"
                class="group relative w-full py-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-serif text-xl tracking-widest hover:from-amber-400 hover:via-amber-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all shadow-2xl hover:shadow-amber-500/30 transform hover:scale-[1.02] rounded-xl overflow-hidden font-bold"
                [attr.aria-disabled]="!isValid() || isLoading()"
              >
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></span>
                <span class="relative z-10 pointer-events-none">
                  @if (isLoading()) {
                    Submitting...
                  } @else {
                    SEND TO THE ALCHEMIST
                  }
                </span>
              </button>
              
              <!-- Helper text for incomplete form -->
              @if (!isValid() && !isLoading()) {
                <div class="mt-4 text-center space-y-2">
                  <p class="text-sm text-neutral-400 italic">
                    Please complete all required fields above to submit
                  </p>
                  <!-- Debug info -->
                  <div class="text-xs text-neutral-500 space-y-1">
                    <p>Validation Status:</p>
                    <ul class="list-disc list-inside space-y-0.5">
                      <li>Name: {{ nameInput ? '✓' : '✗' }}</li>
                      <li>Email: {{ emailInput ? '✓' : '✗' }}</li>
                      <li>Source: {{ selectedSource() ? '✓' : '✗' }}</li>
                      <li>Experience: {{ selectedExperience() ? '✓' : '✗' }}</li>
                      <li>Flavors: {{ (selectedFlavors().length > 0 || customFlavorInput.trim()) ? '✓' : '✗' }} 
                        @if (selectedFlavors().length > 0) {
                          ({{ selectedFlavors().length }} selected)
                        }
                        @if (customFlavorInput.trim()) {
                          + custom
                        }
                      </li>
                      <li>Needs: {{ selectedNeeds().length > 0 ? '✓ (' + selectedNeeds().length + ')' : '✗' }}</li>
                      <li>Packaging: {{ selectedPackaging() ? '✓' : '✗' }}</li>
                      <li>Dosage: {{ selectedDosage() ? '✓' : '✗' }}</li>
                      <li>Pack Size: {{ selectedPackSize() ? '✓' : '✗' }}</li>
                    </ul>
                  </div>
                </div>
              }
            </div>

          </div>
        }
      </div>
    </section>
  `
})
export class SurveyComponent {
  
  // Google Apps Script URL
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXynpSqdrFL0BJGGO5X0GAGNleKyEyhdCUGQXkpeug5Nw1xeqs_I53tl_py_a8r2sgiw/exec';
  
  // Options
  flavorOptions = signal(['Yuzu', 'Mixed Berry', 'Mango', 'Blueberry', 'Lychee', 'Pineapple', 'Citrus', 'Strawberry']);
  needOptions = ['Radiant Skin', 'Deep Sleep', 'Joint Health', 'Mental Clarity', 'Hair Health', 'Digestive Harmony'];
  packagingOptions = ['Glass Vials (50ml)', 'Eco-Sachets', 'Large Bottle (500ml)'];
  dosageOptions = ['Light (3g)', 'Standard (5g)', 'Intense (10g)'];
  packSizeOptions = ['7-Day Trial Box', '14-Day Reset', '30 Pack Ritual', '24-Pack Box'];
  sourceOptions = ['Marine (Wild Caught)', 'Marine (Freshwater)', 'Marine (Farm Raised)'];
  experienceOptions = ['New to Collagen', 'Occasional User', 'Daily Ritualist'];

  // State
  nameInput = '';
  emailInput = '';
  selectedFlavors = signal<string[]>([]);
  selectedNeeds = signal<string[]>([]);
  selectedPackaging = signal<string>('');
  selectedDosage = signal<string>('');
  selectedPackSize = signal<string>('');
  selectedSource = signal<string>('Marine (Wild Caught)');
  selectedExperience = signal<string>('New to Collagen');
  
  customFlavorInput = '';
  openTextInput = '';
  
  isLoading = signal(false);
  result = signal<string | null>(null);

  isValid = computed(() => {
    // Flavors: either selected flavors OR custom flavor input (minimum 1)
    const hasFlavors = this.selectedFlavors().length > 0 || this.customFlavorInput.trim().length > 0;
    
    const valid = this.nameInput.length > 0 &&
           this.emailInput.length > 0 &&
           this.selectedSource() !== '' &&
           this.selectedExperience() !== '' &&
           hasFlavors &&
           this.selectedNeeds().length > 0 &&
           this.selectedPackaging() !== '' &&
           this.selectedDosage() !== '' &&
           this.selectedPackSize() !== '';
    
    // Debug logging
    console.log('Validation check:', {
      name: this.nameInput.length > 0,
      email: this.emailInput.length > 0,
      source: this.selectedSource() !== '',
      experience: this.selectedExperience() !== '',
      flavors: hasFlavors,
      selectedFlavors: this.selectedFlavors().length,
      customFlavor: this.customFlavorInput.trim().length > 0,
      needs: this.selectedNeeds().length > 0,
      packaging: this.selectedPackaging() !== '',
      dosage: this.selectedDosage() !== '',
      packSize: this.selectedPackSize() !== '',
      isValid: valid
    });
    
    return valid;
  });

  toggleFlavor(flavor: string) {
    this.selectedFlavors.update(current => {
      if (current.includes(flavor)) {
        return current.filter(f => f !== flavor);
      } else {
        // Max 3 flavors allowed
        if (current.length >= 3) {
          console.warn('Maximum 3 flavors can be selected');
          return current;
        }
        return [...current, flavor];
      }
    });
  }

  toggleNeed(need: string) {
    this.selectedNeeds.update(current => {
      if (current.includes(need)) {
        return current.filter(n => n !== need);
      } else {
        return [...current, need];
      }
    });
  }

  async submit() {
    console.log('Submit button clicked!');
    console.log('Form valid?', this.isValid());
    console.log('Form data:', {
      name: this.nameInput,
      email: this.emailInput,
      source: this.selectedSource(),
      experience: this.selectedExperience(),
      packaging: this.selectedPackaging(),
      dosage: this.selectedDosage(),
      packSize: this.selectedPackSize(),
      flavors: this.selectedFlavors(),
      needs: this.selectedNeeds(),
      openText: this.openTextInput
    });

    if (!this.isValid()) {
      console.warn('Form is not valid, cannot submit');
      return;
    }
  
    this.isLoading.set(true);
    
    try {
      console.log('Submitting to Google Sheets:', this.GOOGLE_SCRIPT_URL);
      
      // Prepare data - keep selected flavors and custom flavor separate
      const formData = {
        timestamp: new Date().toISOString(),
        name: this.nameInput,
        email: this.emailInput,
        source: this.selectedSource(),
        experience: this.selectedExperience(),
        packaging: this.selectedPackaging(),
        dosage: this.selectedDosage(),
        packSize: this.selectedPackSize(),
        flavors: this.selectedFlavors().join(', '), // Selected flavors from the list
        customFlavor: this.customFlavorInput.trim() || '', // Custom flavor as separate field
        needs: this.selectedNeeds().join(', '),
        openText: this.openTextInput || ''
      };

      console.log('Form data to submit:', formData);

      // Method 1: Try GET request (most reliable for Google Apps Script)
      // Google Apps Script Web Apps handle GET requests via e.parameter
      const queryParams = new URLSearchParams();
      Object.keys(formData).forEach(key => {
        queryParams.append(key, formData[key as keyof typeof formData] as string);
      });

      const getUrl = `${this.GOOGLE_SCRIPT_URL}?${queryParams.toString()}`;
      console.log('Submitting via GET:', getUrl);

      // Use fetch with no-cors (Google Apps Script doesn't support CORS by default)
      await fetch(getUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });

      console.log('Data sent to Google Sheets (GET method)');
      
      // Also try POST method as backup
      try {
        const postFormData = new URLSearchParams();
        Object.keys(formData).forEach(key => {
          postFormData.append(key, formData[key as keyof typeof formData] as string);
        });

        await fetch(this.GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: postFormData.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          cache: 'no-cache'
        });
        
        console.log('Data also sent via POST method');
      } catch (postError) {
        console.warn('POST method failed (this is okay, GET should work):', postError);
      }
      // For display message, combine selected flavors and custom flavor
      const allFlavorsForDisplay = [...this.selectedFlavors()];
      if (this.customFlavorInput.trim()) {
        allFlavorsForDisplay.push(this.customFlavorInput.trim());
      }
      const flavors = allFlavorsForDisplay.join(', ');
      const mainFlavor = allFlavorsForDisplay[0] || 'Signature';
      const needs = this.selectedNeeds().join(' and ');
      
      const successMessage = `Greetings, ${this.nameInput}.
    
For your journey, we have envisioned the "Tenjiku ${mainFlavor} Dawn Elixir."
    
This signature blend harmonizes the delicate notes of ${flavors} with the structural purity of our ${this.selectedSource()} collagen. It is a taste of serenity, designed to awaken the senses while working deep within.
    
Specifically crafted to support ${needs}, this formulation offers a ${this.selectedDosage().toLowerCase()} potency to match your experience as a ${this.selectedExperience()}. 
    
Packaged in our ${this.selectedPackaging()}, it fits seamlessly into your life, honoring your wish: "${this.openTextInput || 'for a pure ritual'}".
    
Welcome to the House of Tenjiku.`;

      this.result.set(successMessage);
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      this.result.set(`We encountered an issue while submitting your preferences. Please try again later or contact support. Error: ${error}`);
    } finally {
      this.isLoading.set(false);
    }
  }

  reset() {
    this.nameInput = '';
    this.emailInput = '';
    this.selectedFlavors.set([]);
    this.selectedNeeds.set([]);
    this.selectedPackaging.set('');
    this.selectedDosage.set('');
    this.selectedPackSize.set('');
    this.selectedSource.set('Marine (Wild Caught)');
    this.selectedExperience.set('New to Collagen');
    this.customFlavorInput = '';
    this.openTextInput = '';
    this.result.set(null);
  }
}