import { Component, OnInit } from '@angular/core';
import { Plafon, PlafonService } from '../../core/service/plafon.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-feature-plafon',
  templateUrl: './feature-plafon.component.html',
  styleUrls: ['./feature-plafon.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class FeaturePlafonComponent implements OnInit {
  plafons: Plafon[] = [];
  selectedPlafon: Plafon | null = null;
  plafonForm: FormGroup;
  isEditing = false;

  constructor(private plafonService: PlafonService, private fb: FormBuilder) {
    this.plafonForm = this.fb.group({
      jenisPlafon: [''],
      jumlahPlafon: [0],
      bunga: [0],
    });
  }

  ngOnInit(): void {
    this.loadPlafons();
  }

  loadPlafons() {
    this.plafonService.getAllPlafons().subscribe((data) => {
      this.plafons = data;
    });
  }

  onAdd() {
    this.isEditing = false;
    this.selectedPlafon = null;
    this.plafonForm.reset();
  }

  onEdit(plafon: Plafon) {
    this.isEditing = true;
    this.selectedPlafon = plafon;
    this.plafonForm.patchValue(plafon);
  }

  onSubmit() {
    const formValue = this.plafonForm.value;
    
    // Validasi input
    if (!this.isFormValid()) {
      return;  // Tidak lanjut jika form tidak valid
    }
  
    // Show SweetAlert confirmation before submitting the form
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Ingin menyimpan data plafon?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isEditing && this.selectedPlafon) {
          // Update existing plafon
          this.plafonService.updatePlafon(this.selectedPlafon.idPlafon, formValue).subscribe({
            next: () => {
              Swal.fire(
                'Berhasil!',
                'Data plafon berhasil diperbarui.',
                'success'
              );
              this.loadPlafons();
            },
            error: (err) => {
              Swal.fire(
                'Gagal!',
                'Terjadi kesalahan saat memperbarui data plafon.',
                'error'
              );
            }
          });
        } else {
          // Create new plafon
          this.plafonService.createPlafon(formValue).subscribe({
            next: () => {
              Swal.fire(
                'Berhasil!',
                'Data plafon berhasil ditambahkan.',
                'success'
              );
              this.loadPlafons();
            },
            error: (err) => {
              Swal.fire(
                'Gagal!',
                'Terjadi kesalahan saat menambahkan data plafon.',
                'error'
              );
            }
          });
        }
    
        // Reset the form and clear the selectedPlafon
        this.plafonForm.reset();
        this.selectedPlafon = null;
      } else {
        Swal.fire(
          'Dibatalkan!',
          'Proses penambahan atau perubahan data plafon dibatalkan.',
          'info'
        );
      }
    });
  }
  
  isFormValid(): boolean {
    if (!this.plafonForm.value.jenisPlafon || this.plafonForm.value.jenisPlafon.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Jenis Plafon Harus Dipilih!',
        text: 'Silakan pilih jenis plafon.',
        confirmButtonText: 'Oke',
      });
      return false;
    }
  
    if (this.plafonForm.value.jumlahPlafon <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Jumlah Plafon Harus Lebih Besar dari 0!',
        text: 'Silakan masukkan jumlah plafon yang valid.',
        confirmButtonText: 'Oke',
      });
      return false;
    }
  
    if (this.plafonForm.value.bunga <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Bunga Harus Lebih Besar dari 0!',
        text: 'Silakan masukkan bunga yang valid.',
        confirmButtonText: 'Oke',
      });
      return false;
    }
  
    return true;
  }

  onDelete(plafon: Plafon) {
    // Menampilkan konfirmasi sebelum menghapus
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Ingin menghapus plafon ${plafon.jenisPlafon}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.plafonService.deletePlafon(plafon.idPlafon).subscribe({
          next: () => {
            Swal.fire(
              'Berhasil!',
              'Plafon berhasil dihapus.',
              'success'
            );
            this.loadPlafons(); // Memuat ulang data plafon
          },
          error: (err) => {
            Swal.fire(
              'Gagal!',
              'Terjadi kesalahan saat menghapus data plafon.',
              'error'
            );
          }
        });
      } else {
        Swal.fire(
          'Dibatalkan!',
          'Proses penghapusan data plafon dibatalkan.',
          'info'
        );
      }
    });
  }  

  getColorClass(jenis: string): string {
    switch (jenis.toLowerCase()) {
      case 'bronze':
        return 'bg-bronze';
      case 'silver':
        return 'bg-silver';
      case 'gold':
        return 'bg-gold';
      case 'platinum':
        return 'bg-platinum';
      default:
        return 'bg-secondary';
    }
  }
  
  getIcon(jenis: string): string {
    switch (jenis.toLowerCase()) {
      case 'bronze':
        return 'bi bi-award-fill';
      case 'silver':
        return 'bi bi-gem';
      case 'gold':
        return 'bi bi-trophy-fill';
      case 'platinum':
        return 'bi bi-star-fill';
      default:
        return 'bi bi-box-fill';
    }
  }

  hasFeature(feature: string): boolean {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);  // Periksa jika 'feature' ada dalam array 'features'
  }
  
}
