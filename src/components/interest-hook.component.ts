import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterestService } from '../services/interest.service';

@Component({
  selector: 'app-interest-hook',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="interest-hook" class="py-24 px-6 bg-gradient-to-b from-stone-50 to-white">
      <div class="max-w-6xl mx-auto">
        
        <!-- Header Section -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-serif text-stone-900 mb-6">
            Share Your Recommendations
          </h2>
          <p class="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Help us shape our quick and ready collagen shots. Your voice matters, and we want to hear what you'd like to see.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-start">
          
          <!-- Form Section -->
          <div class="bg-white border border-stone-200 rounded-lg p-8 shadow-sm">
            <h3 class="text-2xl font-serif text-stone-900 mb-6">Share Your Interest</h3>
            
            <form (ngSubmit)="onSubmit()" class="space-y-6">
              
              <!-- Email (Optional) -->
              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2 uppercase tracking-wide">
                  Email (Optional - for updates)
                </label>
                <input 
                  [(ngModel)]="email"
                  name="email"
                  type="email"
                  class="w-full p-3 bg-stone-50 border border-stone-200 rounded focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-colors"
                  placeholder="your@email.com"
                >
              </div>

              <!-- Recommendation -->
              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2 uppercase tracking-wide">
                  Your Recommendation or Interest
                </label>
                <textarea 
                  [(ngModel)]="recommendation"
                  name="recommendation"
                  rows="5"
                  required
                  class="w-full p-3 bg-stone-50 border border-stone-200 rounded focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none transition-colors resize-none"
                  placeholder="Tell us what you'd like to see in our collagen shots... (e.g., flavors, benefits, packaging, etc.)"
                ></textarea>
                <p class="text-xs text-stone-500 mt-2">
                  Share your ideas, preferences, or what excites you about quick collagen shots.
                </p>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                [disabled]="!recommendation.trim() || isSubmitting()"
                class="w-full py-4 bg-rose-900 text-white font-serif text-lg tracking-widest hover:bg-rose-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                @if (isSubmitting()) {
                  <span class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                } @else {
                  Submit My Interest
                }
              </button>

              @if (showSuccess()) {
                <div class="bg-rose-50 border border-rose-200 rounded-lg p-4 text-center">
                  <p class="text-rose-900 font-semibold">✓ Thank you! Your interest has been recorded.</p>
                </div>
              }

            </form>
          </div>

          <!-- Recent Submissions & Transparency Section -->
          <div class="space-y-6">
            <div class="bg-stone-50 border border-stone-200 rounded-lg p-8">
              <h3 class="text-2xl font-serif text-stone-900 mb-6">Community Voice</h3>
              <p class="text-sm text-stone-600 mb-6">
                See what others are saying. We value transparency and want you to see how your voice contributes to our creation.
              </p>
              
              @if (recentSubmissions().length > 0) {
                <div class="space-y-4 max-h-96 overflow-y-auto">
                  @for (submission of recentSubmissions(); track submission.timestamp) {
                    <div class="bg-white p-4 rounded border border-stone-100 shadow-sm">
                      <p class="text-sm text-stone-700 italic mb-2">"{{ submission.recommendation }}"</p>
                      <p class="text-xs text-stone-400">
                        {{ getTimeAgo(submission.timestamp) }}
                      </p>
                    </div>
                  }
                </div>
              } @else {
                <div class="text-center py-8 text-stone-400 italic">
                  <p>Be the first to share your thoughts!</p>
                </div>
              }
            </div>

            <!-- Transparency Note -->
            <div class="bg-rose-50/50 border border-rose-100 rounded-lg p-6">
              <h4 class="text-sm font-bold text-rose-900 uppercase tracking-wide mb-2">Our Commitment to Transparency</h4>
              <p class="text-sm text-stone-600 leading-relaxed">
                Every submission is counted. Every voice matters. The interest counter you see updates in real-time, 
                and we're committed to showing you exactly how many people are interested in quick, ready-to-drink collagen shots.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class InterestHookComponent implements OnInit {
  isSubmitting = signal(false);
  showSuccess = signal(false);
  
  email = '';
  recommendation = '';
  
  recentSubmissions = signal<Array<{recommendation: string; timestamp: number}>>([]);

  constructor(public interestService: InterestService) {
    // Update recent submissions when interest service updates
    effect(() => {
      const submissions = this.interestService.getRecentSubmissions(5);
      this.recentSubmissions.set(submissions);
    });
  }

  ngOnInit() {
    // Component is always visible now, no need for visibility check
  }

  async onSubmit() {
    if (!this.recommendation.trim()) return;

    this.isSubmitting.set(true);
    this.showSuccess.set(false);

    // Simulate a brief submission delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Submit to service
    this.interestService.submitInterest(
      this.recommendation,
      this.email.trim() || undefined
    );

    // Reset form and show success
    this.recommendation = '';
    this.email = '';
    this.isSubmitting.set(false);
    this.showSuccess.set(true);

    // Hide success message after 5 seconds
    setTimeout(() => {
      this.showSuccess.set(false);
    }, 5000);
  }

  getTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }
}

