import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RoleService } from '../../core/service/role.service';
import { FeatureService } from '../../core/service/feature.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


declare var bootstrap: any;

@Component({
  selector: 'app-feature-rolefeature',
  templateUrl: './feature-rolefeature.component.html',
  styleUrls: ['./feature-rolefeature.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FeatureRolefeatureComponent {
  roles: any[] = [];
  features: any[] = [];
  featuresForRole: any[] = [];
  selectedRoleId: number | null = null;
  selectedFeatureIds: number[] = [];
  newRoleName: string = '';

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadAllFeatures();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  loadAllFeatures(): void {
    this.featureService.getAllFeatures().subscribe((data) => {
      this.features = data;
    });
  }

  addRoleModal(): void {
    this.newRoleName = ''; // Reset input field
    this.selectedFeatureIds = []; // Reset selected checkboxes
  
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('addRoleModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  addRole(): void {
    Swal.fire({
      title: 'Yakin ingin menambahkan role ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Tambahkan',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        const newRole = {
          name: this.newRoleName,
          featureIds: this.selectedFeatureIds
        };
        this.roleService.createRoleWithFeatures(newRole, this.selectedFeatureIds).subscribe(() => {
          this.loadRoles();
          this.newRoleName = '';
          this.selectedFeatureIds = [];
          this.closeModal();
          Swal.fire('Berhasil!', 'Role berhasil ditambahkan.', 'success');
        });
      }
    });
  }
  

  closeModal(): void {
    const modalElement = document.getElementById('addRoleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  closeUpdateRoleModal(): void {
    const modalElement = document.getElementById('updateRoleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }

  loadFeaturesForRole(roleId: number): void {
    this.selectedRoleId = roleId;
    this.roleService.getFeaturesByRole(roleId).subscribe((data) => {
      this.featuresForRole = data;

      if (isPlatformBrowser(this.platformId)) {
        const modalElement = document.getElementById('featuresModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }
    });
  }

  onFeatureChange(featureId: number, event: any): void {
    if (event.target.checked) {
      this.selectedFeatureIds.push(featureId);
    } else {
      const index = this.selectedFeatureIds.indexOf(featureId);
      if (index > -1) {
        this.selectedFeatureIds.splice(index, 1);
      }
    }
  }

  openUpdateRoleModal(roleId: number): void {
    this.selectedRoleId = roleId;
    this.newRoleName = '';
    this.selectedFeatureIds = []; // Reset dulu
  
    this.roleService.getRoleById(roleId).subscribe(({role, features}) => {
      this.newRoleName = role.nameRole;
      this.selectedFeatureIds = (features ?? []).map((feature: any) => feature.id);
  
      if (isPlatformBrowser(this.platformId)) {
        const modalElement = document.getElementById('updateRoleModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }
    });
  }
  
  updateRole(): void {
    Swal.fire({
      title: 'Yakin ingin mengubah role ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Ubah',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed && this.selectedRoleId !== null) {
        const updatedRole = {
          name: this.newRoleName,
          featureIds: this.selectedFeatureIds
        };
  
        this.roleService.updateRoleWithFeatures(this.selectedRoleId, updatedRole, this.selectedFeatureIds).subscribe(() => {
          this.loadRoles();
          this.selectedFeatureIds = [];
          this.closeUpdateRoleModal();
          Swal.fire('Berhasil!', 'Role berhasil diperbarui.', 'success');
        });
      }
    });
  }
  
  
  
}
