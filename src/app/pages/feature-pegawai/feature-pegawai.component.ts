import { Component, OnInit } from '@angular/core';
import { PegawaiService } from '../../core/service/pegawai.service';
import { BranchService } from '../../core/service/branch.service';
import { RoleService } from '../../core/service/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-feature-pegawai',
  templateUrl: './feature-pegawai.component.html',
  styleUrls: ['./feature-pegawai.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FeaturePegawaiComponent implements OnInit {
  employees: any[] = [];
  searchQuery: string = '';
  showModal = false;
  roles: any[] = [];
  branches: any[] = [];
  statusOptions = ['ACTIVE', 'CDT', 'CUTI', 'RESIGN'];
  employeeToEdit: any = {
    name: '',
    nip: '',
    email: '',
    role: '',
    branch: '',
    statusEmployee: 'ACTIVE'
  };

  currentPage: number = 1;  // Current page
  itemsPerPage: number = 3; // Items per page
  totalPages: number = 1;   // Total pages

  constructor(
    private pegawaiService: PegawaiService,
    private branchService: BranchService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadRoles();
    this.loadBranches();
  }

  loadEmployees() {
    this.pegawaiService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.calculateTotalPages();
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (err) => {
        console.error('Error fetching branches:', err);
      }
    });
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });
  }

  addEmployee() {
    this.employeeToEdit = {
      id: '',
      name: '',
      nip: '',
      email: '',
      role: { id: '' }, 
      branch: { id: '' },
      statusEmployee: 'ACTIVE'
    };
    
    this.showModal = true;
  }

  editEmployee(employee: any) {
    Promise.all([
      this.roleService.getAllRoles().toPromise(),
      this.branchService.getAllBranches().toPromise()
    ]).then(([roles, branches]) => {
      this.roles = roles;
      this.branches = branches;
  
      this.employeeToEdit = {
        id: employee.id,
        nip: employee.nip,
        name: employee.user?.name || '',
        email: employee.user?.email || '',
        role: this.roles.find(r => r.id === employee.user?.role?.id) || null,
        branch: this.branches.find(b => b.id === employee.branch?.id) || null,
        statusEmployee: employee.statusEmployee || 'ACTIVE'
      };
  
      this.showModal = true;
    }).catch(err => {
      console.error("Failed to load roles or branches", err);
    });
  }

  closeModal() {
    this.showModal = false;
  }

  saveEmployee() {
    // Check if form is valid
    if (!this.isFormValid()) return;
  
    // Show SweetAlert confirmation before saving data
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Ingin menambah atau mengedit data pegawai?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Prepare employee data
        const employeeData = {
          user: {
            name: this.employeeToEdit.name,
            email: this.employeeToEdit.email,
            role: this.employeeToEdit.role,
          },
          nip: this.employeeToEdit.nip,
          branch: this.employeeToEdit.branch,
          statusEmployee: this.employeeToEdit.statusEmployee
        };
  
        // Add or update employee
        if (this.employeeToEdit.id) {
          // Edit existing employee
          this.pegawaiService.updateEmployee(this.employeeToEdit.id, employeeData).subscribe({
            next: () => {
              Swal.fire(
                'Berhasil!',
                'Data pegawai berhasil diperbarui.',
                'success'
              );
              this.loadEmployees();
              this.closeModal();
            },
            error: (err) => {
              Swal.fire(
                'Gagal!',
                'Terjadi kesalahan saat memperbarui data pegawai.',
                'error'
              );
            }
          });
        } else {
          // Add new employee
          this.pegawaiService.addEmployee(employeeData).subscribe({
            next: () => {
              Swal.fire(
                'Berhasil!',
                'Data pegawai berhasil ditambahkan.',
                'success'
              );
              this.loadEmployees();
              this.closeModal();
            },
            error: (err) => {
              Swal.fire(
                'Gagal!',
                'Terjadi kesalahan saat menambahkan data pegawai.',
                'error'
              );
            }
          });
        }
      } else {
        Swal.fire(
          'Dibatalkan!',
          'Proses penambahan atau perubahan data pegawai dibatalkan.',
          'info'
        );
      }
    });
  }  

  isFormValid() {
    if (!this.employeeToEdit.name || !this.employeeToEdit.email || !this.employeeToEdit.nip || !this.employeeToEdit.role || !this.employeeToEdit.branch) {
      alert("Please fill in all the required fields!");
      return false;
    }
    return true;
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.pegawaiService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  searchEmployees() {
    if (!this.searchQuery) {
      return this.employees;
    }

    const query = this.searchQuery.toLowerCase();
    return this.employees.filter(emp =>
      (emp.user?.name?.toLowerCase().includes(query)) ||
      (emp.user?.email?.toLowerCase().includes(query)) ||
      (emp.nip?.toLowerCase().includes(query))
    );
  }

  // Returns the employees for the current page
  getPaginatedEmployees() {
    const filteredEmployees = this.searchEmployees();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }

  // Changes the page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  // Calculates the total number of pages based on the number of items and items per page
  calculateTotalPages() {
    const filteredEmployees = this.searchEmployees();
    this.totalPages = Math.ceil(filteredEmployees.length / this.itemsPerPage);
  }
}
