import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutSaComponent } from '../../../layout/layout-sa/layout-sa.component';

@Component({
  standalone: true,
  imports: [LayoutSaComponent, CommonModule, FormsModule],
  templateUrl: './super-admin.component.html'
})
export class SuperAdminComponent {}
