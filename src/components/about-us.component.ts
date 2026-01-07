import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="philosophy" class="relative py-32 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200 overflow-hidden">
      <!-- Premium Decorative Background Elements -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-rose-600/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-700/15 via-amber-600/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.05),transparent_70%)]"></div>
      </div>

      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div class="container mx-auto px-6 relative z-10">
        
        <!-- Part 1: The Origin -->
        <div class="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div class="order-2 md:order-1">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-px w-8 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
              <h2 class="text-4xl md:text-6xl font-serif text-neutral-50 leading-tight tracking-tight">
                The Journey to <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 italic">Tenjiku</span>
              </h2>
              <div class="h-px flex-1 bg-gradient-to-r from-amber-500/60 to-transparent"></div>
            </div>
            <div class="flex items-center gap-3 mb-8">
              <div class="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/40 to-amber-500/40"></div>
              <div class="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
              <div class="h-px w-12 bg-gradient-to-l from-transparent via-amber-500/40 to-amber-500/40"></div>
            </div>
            <p class="text-neutral-300 text-lg leading-relaxed mb-6 font-light">
              In ancient lore, "Tenjiku" was the name given to the "Heavenly Land"—a mythical destination of wisdom and purity. It represents the ultimate journey for the seeker.
            </p>
            <p class="text-neutral-300 text-lg leading-relaxed font-light">
              House of Tenjiku was born from this pursuit. We are not merely a beverage company; we are modern alchemists bridging the gap between ancient Eastern wellness rituals and cutting-edge nutritional science. Our first offering, a pristine marine collagen elixir, is designed to be the foundation of your daily renewal.
            </p>
          </div>
          <div class="order-1 md:order-2 relative">
             <div class="absolute inset-0 border-2 border-amber-500/30 translate-x-4 translate-y-4 rounded-2xl"></div>
             <img src="https://picsum.photos/id/431/600/500" alt="Tea Ceremony Ritual" class="w-full h-auto rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl relative z-10 opacity-90">
          </div>
        </div>

        <!-- Part 2: Co-Creation (Customer Interest) -->
        <div class="bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl rounded-3xl p-10 md:p-14 border border-neutral-700/50 shadow-2xl mb-32 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-3xl"></div>
           <div class="max-w-5xl mx-auto text-center relative z-10">
              <div class="inline-flex items-center gap-3 mb-6">
                <div class="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500/60"></div>
                <span class="text-amber-500/90 tracking-[0.5em] text-xs font-bold uppercase px-6 py-2.5 bg-neutral-900/80 backdrop-blur-md border border-amber-500/20 rounded-full">Our Philosophy</span>
                <div class="h-px w-12 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500/60"></div>
              </div>
              <h3 class="text-4xl md:text-5xl font-serif text-neutral-50 mb-8 leading-tight">Designed by You, Crafted by Us</h3>
              <div class="flex items-center justify-center gap-3 mb-10">
                <div class="h-px w-16 bg-gradient-to-r from-transparent via-neutral-600 to-neutral-600"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-amber-500/60"></div>
                <div class="h-px w-16 bg-gradient-to-l from-transparent via-neutral-600 to-neutral-600"></div>
              </div>
              <p class="text-neutral-300 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto font-light">
                True wellness is personal. Unlike traditional houses that dictate what you need, we believe the cure lies within the desires of the seeker.
              </p>
              <div class="grid md:grid-cols-3 gap-6 text-left">
                <div class="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm p-8 rounded-2xl border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-300">
                   <div class="text-3xl mb-4">👂</div>
                   <h4 class="font-serif text-amber-400 mb-3 text-xl">We Listen</h4>
                   <p class="text-sm text-neutral-400 leading-relaxed">Every survey submission is analyzed. Your flavor preferences and wellness goals directly influence our final formula.</p>
                </div>
                <div class="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm p-8 rounded-2xl border border-neutral-700/50 hover:border-rose-500/30 transition-all duration-300">
                   <div class="text-3xl mb-4">⚗️</div>
                   <h4 class="font-serif text-rose-400 mb-3 text-xl">We Adapt</h4>
                   <p class="text-sm text-neutral-400 leading-relaxed">Our potency levels and supply sizes are flexible, evolving based on the collective voice of our community.</p>
                </div>
                <div class="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm p-8 rounded-2xl border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-300">
                   <div class="text-3xl mb-4">✨</div>
                   <h4 class="font-serif text-amber-400 mb-3 text-xl">We Deliver</h4>
                   <p class="text-sm text-neutral-400 leading-relaxed">The result is a collagen shot that doesn't just work—it resonates with your lifestyle and tastes.</p>
                </div>
              </div>
           </div>
        </div>

        <!-- Part 3: Ingredients & Purity -->
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="relative">
             <div class="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-transparent rounded-full blur-2xl"></div>
             <img src="https://picsum.photos/id/530/600/600" alt="Pure Ingredients" class="w-full h-auto rounded-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-4 border-amber-500/30 relative z-10">
          </div>
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="h-px w-8 bg-gradient-to-r from-rose-500/60 to-transparent"></div>
              <h2 class="text-4xl md:text-6xl font-serif text-neutral-50 leading-tight tracking-tight">
                Uncompromising <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Purity</span>
              </h2>
              <div class="h-px flex-1 bg-gradient-to-r from-rose-500/60 to-transparent"></div>
            </div>
            <div class="flex items-center gap-3 mb-10">
              <div class="h-px w-12 bg-gradient-to-r from-transparent via-rose-500/40 to-rose-500/40"></div>
              <div class="w-1.5 h-1.5 rounded-full bg-rose-500/60"></div>
              <div class="h-px w-12 bg-gradient-to-l from-transparent via-rose-500/40 to-rose-500/40"></div>
            </div>
            <ul class="space-y-8">
              <li class="flex items-start">
                <span class="text-amber-400 mr-4 text-2xl">✦</span>
                <div>
                  <h4 class="text-xl font-serif text-neutral-200 mb-2">Wild-Caught Marine Source</h4>
                  <p class="text-neutral-400 leading-relaxed">Sourced ethically from deep-sea waters, ensuring the highest bioavailability and zero antibiotic exposure.</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-rose-400 mr-4 text-2xl">✦</span>
                <div>
                  <h4 class="text-xl font-serif text-neutral-200 mb-2">Potent Hydrolysis</h4>
                  <p class="text-neutral-400 leading-relaxed">Our advanced peptide structure ensures rapid absorption, targeting skin elasticity and joint health from within.</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-amber-400 mr-4 text-2xl">✦</span>
                <div>
                  <h4 class="text-xl font-serif text-neutral-200 mb-2">Flavor as Medicine</h4>
                  <p class="text-neutral-400 leading-relaxed">We don't mask ingredients; we celebrate them. We use real botanicals like Yuzu and Matcha to create a sensory ritual, not just a supplement.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutUsComponent {}