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
import { SuperAdminComponent } from './pages/dashboard/super-admin/super-admin.component';
import { DashboardSaComponent } from './pages/dashboard/super-admin/dashboard-sa/dashboard-sa.component';
import { FeaturePegawaiComponent } from './pages/feature-pegawai/feature-pegawai.component';
import { FeatureBranchComponent } from './pages/feature-branch/feature-branch.component';
import { FeatureCustomerComponent } from './pages/feature-customer/feature-customer.component';
import { FeaturePlafonComponent } from './pages/feature-plafon/feature-plafon.component';
import { branchRoutes } from './pages/feature-branch/branch.routes';
import { ShellComponent } from './shell/shell.component';
import { DashboardComponent } from './pages/dashboards/dashboards.component';
import { FeatureRolefeatureComponent } from './pages/feature-rolefeature/feature-rolefeature.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'landing-page', component: LandingPageComponent},
  {
    path: 'forgot-password',
    loadComponent: () => import('../app/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('../app/pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'verify-email',
    loadComponent: () => import('../app/pages/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('../app/pages/reset-password-cust/reset-password-cust.component').then(m => m.ResetPasswordCustComponent)
  },        
  {
    path: '', component: ShellComponent,  canActivateChild: [authGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pengajuan', component: PengajuanMarketingComponent },
      { path: 'detail-akun', component: AkunMarketingComponent},
      { path: 'history-pengajuan', component: HistoryPengajuanMarketingComponent},
      { path: 'pegawai', component: FeaturePegawaiComponent},
      { path: 'cabang', component: FeatureBranchComponent},
      { path: 'customer', component: FeatureCustomerComponent},
      { path: 'plafon', component: FeaturePlafonComponent},
      { path: 'role-fitur', component: FeatureRolefeatureComponent}
    ],
  }
  // {
  //   path: 'mkt',
  //   canActivate: [authGuard, roleGuard('Marketing')],
  //   loadComponent: () => MarketingComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => DashboardMarketingComponent
  //     },
  //     {
  //       path: 'pengajuan',
  //       loadComponent: () => PengajuanMarketingComponent
  //     },
  //     {
  //       path: 'detail-akun',
  //       loadComponent: () => AkunMarketingComponent
  //     },
  //     {
  //       path: 'history-pengajuan',
  //       loadComponent: () => HistoryPengajuanMarketingComponent
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
  // {
  //   path: 'bm',
  //   canActivate: [authGuard, roleGuard('Branch Manager')],
  //   loadComponent: () => BranchManagerComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => DashboardMarketingComponent
  //     },
  //     {
  //       path: 'pengajuan',
  //       loadComponent: () => PengajuanMarketingComponent
  //     },
  //     {
  //       path: 'detail-akun',
  //       loadComponent: () => AkunMarketingComponent
  //     },
  //     {
  //       path: 'history-pengajuan',
  //       loadComponent: () => HistoryPengajuanMarketingComponent
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
  // {
  //   path: 'bo',
  //   canActivate: [authGuard, roleGuard('Back Office')],
  //   loadComponent: () => BackOfficeComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => DashboardMarketingComponent
  //     },
  //     {
  //       path: 'pengajuan',
  //       loadComponent: () => PengajuanMarketingComponent
  //     },
  //     {
  //       path: 'detail-akun',
  //       loadComponent: () => AkunMarketingComponent
  //     },
  //     {
  //       path: 'history-pengajuan',
  //       loadComponent: () => HistoryPengajuanMarketingComponent
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
  // {
  //   path: 'sa',
  //   canActivate: [authGuard, roleGuard('Super Admin')],
  //   loadComponent: () =>SuperAdminComponent,
  //   children: [
  //     ...branchRoutes,
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => DashboardSaComponent
  //     },
  //     {
  //       path: 'pegawai',
  //       loadComponent: () => FeaturePegawaiComponent
  //     },
  //     {
  //       path: 'customer',
  //       loadComponent: () => FeatureCustomerComponent
  //     },
  //     {
  //       path: 'plafon',
  //       loadComponent: () => FeaturePlafonComponent
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
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
