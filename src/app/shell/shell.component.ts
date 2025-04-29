import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule]
})
export class ShellComponent implements AfterViewInit, OnInit {
  features: string[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const features = this.auth.getFeature();
    if (features) {
      this.features = JSON.parse(features);
    }
  }

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    toggleButton?.addEventListener('click', () => {
      wrapper?.classList.toggle('toggled');
    });
  }
}
