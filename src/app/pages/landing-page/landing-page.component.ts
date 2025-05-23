import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  isFaqOpen: boolean = false;

  toggleFaq() {
    this.isFaqOpen = !this.isFaqOpen;
  }
}
