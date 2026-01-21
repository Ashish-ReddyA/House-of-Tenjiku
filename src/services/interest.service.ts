import { Injectable, signal } from '@angular/core';

export interface InterestSubmission {
  email?: string;
  recommendation: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private readonly STORAGE_KEY = 'tenjiku_interest_data';
  private readonly VISITED_KEY = 'tenjiku_has_visited';
  private readonly CLICKED_INTEREST_KEY = 'tenjiku_has_clicked_interest';

  // Signals for reactive updates
  interestCount = signal<number>(0);
  submissions = signal<InterestSubmission[]>([]);
  hasClickedInterest = signal<boolean>(false);

  constructor() {
    this.loadFromStorage();
    this.checkIfClicked();
  }

  private checkIfClicked() {
    this.hasClickedInterest.set(localStorage.getItem(this.CLICKED_INTEREST_KEY) === 'true');
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Ensure count is at least 84, continue from there
        const currentCount = data.count || 0;
        this.interestCount.set(Math.max(currentCount, 84));
        this.submissions.set(data.submissions || []);
        // Update storage if we adjusted the count
        if (currentCount < 84) {
          this.saveToStorage();
        }
      } else {
        // Initialize with base count of 84
        this.interestCount.set(84);
        this.submissions.set([]);
        this.saveToStorage();
      }
    } catch (e) {
      console.error('Error loading interest data:', e);
      this.interestCount.set(84);
      this.submissions.set([]);
    }
  }

  private saveToStorage() {
    try {
      const data = {
        count: this.interestCount(),
        submissions: this.submissions()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving interest data:', e);
    }
  }

  hasVisited(): boolean {
    return localStorage.getItem(this.VISITED_KEY) === 'true';
  }

  markAsVisited() {
    localStorage.setItem(this.VISITED_KEY, 'true');
  }

  incrementInterest(): boolean {
    // Check if user has already clicked
    if (this.hasClickedInterest()) {
      return false; // Already clicked, don't increment
    }

    // Mark as clicked
    localStorage.setItem(this.CLICKED_INTEREST_KEY, 'true');
    this.hasClickedInterest.set(true);

    // Increment count
    this.interestCount.update(count => count + 1);
    this.saveToStorage();
    return true;
  }

  submitInterest(recommendation: string, email?: string): void {
    const submission: InterestSubmission = {
      email,
      recommendation: recommendation.trim(),
      timestamp: Date.now()
    };

    this.submissions.update(current => [...current, submission]);
    this.interestCount.update(count => count + 1);
    this.saveToStorage();
  }

  getRecentSubmissions(limit: number = 5): InterestSubmission[] {
    return this.submissions()
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
}

