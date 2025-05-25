import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlafonService } from '../../core/service/plafon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  isFaqOpen: boolean = false;
  isFaqOpen1: boolean = false;
  isFaqOpen2: boolean = false;
  isFaqOpen3: boolean = false;
  isFaqOpen4: boolean = false;
  isFaqOpen5: boolean = false;
  
  activeSection: string = 'hero';

  toggleFaq() {
    this.isFaqOpen = !this.isFaqOpen;
  }
  toggleFaq1() {
    this.isFaqOpen1 = !this.isFaqOpen1;
  }
  toggleFaq2() {
    this.isFaqOpen2 = !this.isFaqOpen2;
  }
  toggleFaq3() {
    this.isFaqOpen3 = !this.isFaqOpen3;
  }
  toggleFaq4() {
    this.isFaqOpen4 = !this.isFaqOpen4;
  }
  toggleFaq5() {
    this.isFaqOpen5 = !this.isFaqOpen5;
  }

  plafons: any[] = []; // pakai any[]
  visiblePlafons: any[] = [];
  currentIndex = 0;
  itemsPerPage = 2;

  imageUrls: string[] = [
    'assets/img/bronze.png',
    'assets/img/silver.png',
    'assets/img/gold.png',
    'assets/img/platinum.png'
  ];

  constructor(private plafonService: PlafonService) {}

  ngOnInit(): void {
    this.plafonService.getAllPlafons().subscribe((data) => {
      this.plafons = data;
      this.updateVisiblePlafons();
    });
  }

  updateVisiblePlafons(): void {
    this.visiblePlafons = this.plafons.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  next(): void {
    if (this.currentIndex + this.itemsPerPage < this.plafons.length) {
      this.currentIndex += this.itemsPerPage;
      this.updateVisiblePlafons();
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
      this.updateVisiblePlafons();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    Swal.fire({
      icon: 'info',
      title: 'Perbaikan Aplikasi',
      text: 'Aplikasi sedang dalam perbaikan.',
      confirmButtonText: 'OK'
    });
  }

  scrollToSection(sectionId: string, event: Event) {
  event.preventDefault();
  this.activeSection = sectionId;

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

setActive(sectionId: string) {
  this.activeSection = sectionId;
}


}
