import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/service/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-customer',
  templateUrl: './feature-customer.component.html',
  styleUrls: ['./feature-customer.component.css'],
  imports: [FormsModule, CommonModule]
})
export class FeatureCustomerComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;

  selectedCustomer: any = null;
showDetailModal: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.applyFilter();
      },
      error: (err) => console.error(err),
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter((cust) =>
      (cust.user?.name?.toLowerCase() || '').includes(term) ||
      (cust.user?.email?.toLowerCase() || '').includes(term) ||
      (cust.user?.role?.nameRole?.toLowerCase() || '').includes(term) ||
      (cust.nik?.toLowerCase() || '').includes(term) ||
      (cust.pekerjaan?.toLowerCase() || '').includes(term)
    );
    this.currentPage = 1;
  }  
  

  get paginatedCustomers(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  openDetailModal(customerId: string): void {
    this.customerService.getCustomerById(customerId).subscribe({
      next: (data) => {
        this.selectedCustomer = data;
        this.showDetailModal = true;
      },
      error: (err) => {
        console.error("Gagal memuat detail:", err);
        alert('Gagal mengambil data customer.');
      }
    });
  }
  
  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedCustomer = null;
  }
}
