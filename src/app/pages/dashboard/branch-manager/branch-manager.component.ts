import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutBmComponent } from '../../../layout/layout-bm/layout-bm.component';

@Component({
  standalone: true,
  imports: [LayoutBmComponent, CommonModule, FormsModule],
  templateUrl: './branch-manager.component.html'
})
export class BranchManagerComponent {}
