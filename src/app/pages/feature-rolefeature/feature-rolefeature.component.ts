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
  searchRoleText: string = '';

  private restrictedFeatures = ['GET_REVIEW_PENGAJUAN', 'GET_REVIEW_PENGAJUAN_HISTORY', 'REVIEW_PENGAJUAN'];
  private allowedRolesForRestrictedFeatures = ['Marketing', 'Branch Manager', 'Back Office'];


  groupedFeatures: { [key: string]: any[] } = {};
  featuresForRoleGrouped: { [key: string]: any[] } = {};

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadAllFeatures();
    this.setupModalEventListener();
  }

  setupModalEventListener(): void {
  if (isPlatformBrowser(this.platformId)) {
    const modalElement = document.getElementById('addRoleModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.newRoleName = '';
        this.selectedFeatureIds = [];
      });
    }
  }
}

  get filteredRoles(): any[] {
    if (!this.searchRoleText.trim()) return this.roles;
    return this.roles.filter(role =>
      role.nameRole.toLowerCase().includes(this.searchRoleText.toLowerCase())
    );
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  loadAllFeatures(): void {
    this.featureService.getAllFeatures().subscribe((data) => {
      this.features = data;
      this.groupFeatures();
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
  // Validasi fitur terbatas
  const selectedRestrictedFeatures = this.features.filter(f =>
    this.restrictedFeatures.includes(f.name) && this.selectedFeatureIds.includes(f.id)
  );

  if (selectedRestrictedFeatures.length > 0 && !this.allowedRolesForRestrictedFeatures.includes(this.newRoleName)) {
    Swal.fire({
      icon: 'warning',
      title: 'Tidak Diizinkan!',
      text: 'Fitur review pengajuan hanya boleh ditambahkan ke role: Marketing, Branch Manager, atau Back Office.'
    });
    return;
  }

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

      // Kelompokkan fitur berdasarkan kategori (seperti groupedFeatures)
      const groupKeywords = [
        { key: 'BRANCH', keyword: 'BRANCH' },
        { key: 'CUSTOMER', keyword: 'CUSTOMER' },
        { key: 'EMPLOYEE', keyword: 'EMPLOYEE' },
        { key: 'ROLES_FEATURES', keyword: 'ROLES_FEATURES' },
        { key: 'PENGAJUAN', keyword: 'PENGAJUAN' },
        { key: 'PLAFON', keyword: 'PLAFON' },
        { key: 'ROLES', keyword: 'ROLES' },
        { key: 'FEATURES', keyword: 'FEATURES' }
      ];

      this.featuresForRoleGrouped = {}; // Reset group

      for (const feature of data) {
        let matchedGroup = 'OTHERS';
        for (const group of groupKeywords) {
          if (feature.name.includes(group.keyword)) {
            matchedGroup = group.key;
            break;
          }
        }

        if (!this.featuresForRoleGrouped[matchedGroup]) {
          this.featuresForRoleGrouped[matchedGroup] = [];
        }

        this.featuresForRoleGrouped[matchedGroup].push(feature);
      }

      // Tampilkan modal
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
  // Validasi fitur terbatas
  const selectedRestrictedFeatures = this.features.filter(f =>
    this.restrictedFeatures.includes(f.name) && this.selectedFeatureIds.includes(f.id)
  );

  if (selectedRestrictedFeatures.length > 0 && !this.allowedRolesForRestrictedFeatures.includes(this.newRoleName)) {
    Swal.fire({
      icon: 'warning',
      title: 'Tidak Diizinkan!',
      text: 'Fitur review pengajuan hanya boleh dimiliki oleh role: Marketing, Branch Manager, atau Back Office.'
    });
    return;
  }

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

  
  hasFeature(feature: string): boolean {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);  // Periksa jika 'feature' ada dalam array 'features'
  }

  groupFeatures(): void {
    const groupKeywords = [
      { key: 'BRANCH', keyword: 'BRANCH' },
      { key: 'CUSTOMER', keyword: 'CUSTOMER' },
      { key: 'EMPLOYEE', keyword: 'EMPLOYEE' },
      { key: 'ROLES_FEATURES', keyword: 'ROLES_FEATURES' },
      { key: 'PENGAJUAN', keyword: 'PENGAJUAN' },
      { key: 'PLAFON', keyword: 'PLAFON' },
      { key: 'ROLES', keyword: 'ROLES' },
      { key: 'FEATURES', keyword: 'FEATURES' }
    ];

    this.groupedFeatures = {};

    for (const feature of this.features) {
      let matchedGroup = 'OTHERS'; // Default group if no match

      for (const group of groupKeywords) {
        if (feature.name.includes(group.keyword)) {
          matchedGroup = group.key;
          break;
        }
      }

      if (!this.groupedFeatures[matchedGroup]) {
        this.groupedFeatures[matchedGroup] = [];
      }

      this.groupedFeatures[matchedGroup].push(feature);
    }
  }

  deleteRole(roleId: number): void {
      Swal.fire({
        title: 'Anda yakin?',
        text: 'Role ini akan dihapus beserta semua fitur yang terkait.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          this.roleService.deleteRoleById(roleId).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Role berhasil dihapus.',
                timer: 1500,
                showConfirmButton: false
              });
              this.loadRoles();
            },
            error: (err) => {
              console.error('Gagal menghapus role:', err);
              Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat menghapus role.'
              });
            }
          });
        }
      });
    }

  
}

