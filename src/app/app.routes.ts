import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { roleGuard } from './core/guard/role.guard';
import { MarketingComponent } from './pages/dashboard/marketing/marketing.component';
import { PengajuanMarketingComponent } from './pages/pengajuan-marketing/pengajuan-marketing.component';
import { AkunMarketingComponent } from './pages/akun/akun-marketing/akun-marketing.component';
import { HistoryPengajuanMarketingComponent } from './pages/history/history-pengajuan-marketing/history-pengajuan-marketing.component';
import { DashboardMarketingComponent } from './pages/dashboard/marketing/dashboard-marketing/dashboard-marketing.component';
import { BranchManagerComponent } from './pages/dashboard/branch-manager/branch-manager.component';
import { BackOfficeComponent } from './pages/dashboard/back-office/back-office.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'mkt',
    canActivate: [authGuard, roleGuard('Marketing')],
    loadComponent: () => MarketingComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => DashboardMarketingComponent
      },
      {
        path: 'pengajuan',
        loadComponent: () => PengajuanMarketingComponent
      },
      {
        path: 'detail-akun',
        loadComponent: () => AkunMarketingComponent
      },
      {
        path: 'history-pengajuan',
        loadComponent: () => HistoryPengajuanMarketingComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'bm',
    canActivate: [authGuard, roleGuard('Branch Manager')],
    loadComponent: () => BranchManagerComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => DashboardMarketingComponent
      },
      {
        path: 'pengajuan',
        loadComponent: () => PengajuanMarketingComponent
      },
      {
        path: 'detail-akun',
        loadComponent: () => AkunMarketingComponent
      },
      {
        path: 'history-pengajuan',
        loadComponent: () => HistoryPengajuanMarketingComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'bo',
    canActivate: [authGuard, roleGuard('Back Office')],
    loadComponent: () => BackOfficeComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => DashboardMarketingComponent
      },
      {
        path: 'pengajuan',
        loadComponent: () => PengajuanMarketingComponent
      },
      {
        path: 'detail-akun',
        loadComponent: () => AkunMarketingComponent
      },
      {
        path: 'history-pengajuan',
        loadComponent: () => HistoryPengajuanMarketingComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: 'dashboard-marketing',
  //   canActivate: [authGuard, roleGuard('Marketing')],
  //   loadComponent: () => import('./pages/dashboard/marketing/marketing.component').then(m => m.MarketingComponent)
  // },
  // {
  //   path: 'dashboard-branch-manager',
  //   canActivate: [authGuard, roleGuard('Branch Manager')],
  //   loadComponent: () => import('./pages/dashboard/branch-manager.component').then(m => m.BranchManagerComponent)
  // },
  // {
  //   path: 'dashboard-back-office',
  //   canActivate: [authGuard, roleGuard('Back Office')],
  //   loadComponent: () => import('./pages/dashboard/back-office.component').then(m => m.BackOfficeComponent)
  // },
  // {
  //   path: 'dashboard-super-admin',
  //   canActivate: [authGuard, roleGuard('Super Admin')],
  //   loadComponent: () => import('./pages/dashboard/super-admin.component').then(m => m.SuperAdminComponent)
  // }
];
