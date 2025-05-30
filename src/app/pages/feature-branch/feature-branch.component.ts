import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../core/service/branch.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-feature-branch',
  templateUrl: './feature-branch.component.html',
  styleUrl: './feature-branch.component.css',
  imports: [CommonModule, FormsModule]
})
export class FeatureBranchComponent implements OnInit {
  branches: any[] = [];
  filteredBranches: any[] = [];
  currentPage = 1;
  pageSize = 5;
  searchQuery = '';
  showModal = false;
  branchToEdit: any = {};

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (data) => {
        console.log('Branches data:', data);
        this.branches = data;
        this.applySearch();
      },
      error: (err) => console.error('Gagal memuat cabang', err)
    });
  }

  applySearch(): void {
    this.filteredBranches = this.branches.filter(branch =>
      branch.branch?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
  }

  getPaginatedBranches(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredBranches.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBranches.length / this.pageSize);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addBranch(): void {
    this.branchToEdit = {};
    this.showModal = true;
  }

  editBranch(branch: any): void {
    this.branchToEdit = { ...branch };
    console.log('Edit branch:', this.branchToEdit);
    this.showModal = true;
  }

  saveBranch(): void {
    // Validasi input
    if (!this.isFormValid()) {
      return;  // Tidak lanjut jika input tidak valid
    }
  
    // Show SweetAlert confirmation before saving branch data
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Ingin menyimpan data cabang?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Check if we are editing an existing branch or creating a new one
        if (this.branchToEdit.id) {
          // Edit existing branch
          this.branchService.updateBranch(this.branchToEdit.id, this.branchToEdit).subscribe({
            next: () => {
              Swal.fire(
                'Berhasil!',
                'Data cabang berhasil diperbarui.',
                'success'
              );
              this.loadBranches();
              this.showModal = false;
            },
            error: (err) => {
              Swal.fire(
                'Gagal!',
                'Terjadi kesalahan saat memperbarui data cabang.',
                'error'
              );
            }
          });
        } else {
          // Create new branch
          this.branchService.createBranch(this.branchToEdit).subscribe({
            next: () => {
              Swal.fire(
                'Berhasil!',
                'Data cabang berhasil ditambahkan.',
                'success'
              );
              this.loadBranches();
              this.showModal = false;
            },
            error: (err) => {
              Swal.fire(
                'Gagal!',
                'Terjadi kesalahan saat menambahkan data cabang.',
                'error'
              );
            }
          });
        }
      } else {
        Swal.fire(
          'Dibatalkan!',
          'Proses penambahan atau perubahan data cabang dibatalkan.',
          'info'
        );
      }
    });
  }

  isFormValid(): boolean {
    if (!this.branchToEdit.branch || this.branchToEdit.branch.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Data Tidak Lengkap!',
        text: 'Lengkapi Dulu Fieldnya',
        confirmButtonText: 'Oke',
      });
      return false;
    }
    return true;
  }
  

  closeModal(): void {
    this.showModal = false;
  }

  hasFeature(feature: string): boolean {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);  // Periksa jika 'feature' ada dalam array 'features'
  }
  
}
