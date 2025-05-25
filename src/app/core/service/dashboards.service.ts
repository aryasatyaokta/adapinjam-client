import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { BranchService } from './branch.service';
import { CustomerService } from './customer.service';
import { PegawaiService } from './pegawai.service';
import { PengajuanMarketingService } from './pengajuan-marketing.service';
import { RoleService } from './role.service';
import { PlafonService } from './plafon.service';
import { FeatureService } from './feature.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private branchService: BranchService,
    private customerService: CustomerService,
    private pegawaiService: PegawaiService,
    private pengajuanService: PengajuanMarketingService,
    private roleService: RoleService,
    private plafonService: PlafonService,
    private featureService: FeatureService
  ) {}

  /**
   * Ambil header Authorization
   */
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /**
   * Ambil statistik dashboard hanya untuk fitur yang dimiliki
   */
  getDashboardStats(features: string[]): Observable<any> {
    const headers = this.getAuthHeaders();
    const calls: any = {};

    // Branch
    if (features.includes('GET_ALL_BRANCH')) {
      calls.totalBranches = this.branchService.getAllBranches(headers).pipe(map(res => res.length));
    } else {
      calls.totalBranches = of(0);
    }

    // Customer
    if (features.includes('GET_ALL_CUSTOMER')) {
      calls.totalCustomers = this.customerService.getAllCustomers(headers).pipe(map(res => res.length));
    } else {
      calls.totalCustomers = of(0);
    }

    // Employee
    if (features.includes('GET_ALL_EMPLOYEE')) {
      calls.totalEmployees = this.pegawaiService.getAllEmployees(headers).pipe(map(res => res.length));
    } else {
      calls.totalEmployees = of(0);
    }

    // Pengajuan
    if (features.includes('GET_REVIEW_PENGAJUAN')) {
      calls.totalPengajuan = this.pengajuanService.getReviewHistory(headers).pipe(map(res => res.length));
    } else {
      calls.totalPengajuan = of(0);
    }

    if (features.includes('GET_REVIEW_PENGAJUAN_HISTORY')) {
      calls.totalRiwayatPengajuan = this.pengajuanService.getMyReviewedPengajuan().pipe(map(res => res.length));
    } else {
      calls.totalRiwayatPengajuan = of(0);
    }

    // Roles
    if (features.includes('GET_ALL_ROLES')) {
      calls.totalRoles = this.roleService.getAllRoles(headers).pipe(map(res => res.length));
    } else {
      calls.totalRoles = of(0);
    }

    // Plafon
    if (features.includes('GET_ALL_PLAFON')) {
      calls.totalPlafon = this.plafonService.getAllPlafons(headers).pipe(map(res => res.length));
    } else {
      calls.totalPlafon = of(0);
    }

    // Features
    if (features.includes('GET_ALL_FEATURES')) {
      calls.totalFeatures = this.featureService.getAllFeatures().pipe(map(res => res.length));
    } else {
      calls.totalFeatures = of(0);
    }

    return forkJoin(calls);
  }
}
