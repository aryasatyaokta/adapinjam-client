import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutBoComponent } from '../../../layout/layout-bo/layout-bo.component';

@Component({
  standalone: true,
  imports: [LayoutBoComponent, CommonModule, FormsModule],
  templateUrl: './back-office.component.html'
})
export class BackOfficeComponent {}
