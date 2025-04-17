import { Component } from '@angular/core';
import { LayoutMarketingComponent } from '../../../layout/layout-marketing/layout-marketing.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [LayoutMarketingComponent, CommonModule, FormsModule],
  templateUrl: './marketing.component.html'
})
export class MarketingComponent {}
