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
  
}
