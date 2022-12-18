import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AdminDashboard} from '../../interfaces/common/dashboard.interface';

const API_DASHBOARD = environment.apiBaseLink + '/api/dashboard/';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  getAdminDashboard() {
    return this.httpClient.get<{ data: AdminDashboard, message: string, success: boolean }>(API_DASHBOARD + 'admin-dashboard');
  }



}
