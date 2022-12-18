import {Subscription} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import {Order} from 'src/app/interfaces/common/order.interface';
import {FilterData} from 'src/app/interfaces/core/filter-data';
import {OrderService} from 'src/app/services/common/order.service';
import {Pagination} from 'src/app/interfaces/core/pagination';
import {NgClassService} from 'src/app/services/core/ng-class.service';
import {DashboardService} from '../../../services/common/dashboard.service';
import {AdminDashboard} from '../../../interfaces/common/dashboard.interface';

export type ChartOptions = {
  // series: ApexAxisChartSeries;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  // public chartOptions1: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptions>;

  // Store Data
  adminDashboard: AdminDashboard = null;
  orders: Order[] = []

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    public ngClassService: NgClassService,
    private router: Router,
    private adminService: AdminService,
    private orderService: OrderService,
    private dashboardService: DashboardService,
  ) {

    // this.chartOptions1 = {
    //   series: [
    //     {
    //       name: "My-series",
    //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar"
    //   },
    //   title: {
    //     text: "My First Angular Chart"
    //   },
    //   xaxis: {
    //     categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
    //   }
    // };
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.getAllOrders();
    this.getAdminDashboard()
  }

  /**
   * HTTP REQ HANDLE
   * getAllOrders()
   * getAdminDashboard()
   */

  private getAllOrders() {
    const pagination: Pagination = {
      pageSize: Number(5),
      currentPage: 0
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      orderId: 1,
      phoneNo: 1,
      city: 1,
      paymentType: 1,
      grandTotal: 1,
      checkoutDate: 1,
      orderStatus: 1,
      paymentStatus: 1,
      createdAt: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: null,
      select: mSelect,
      sort: {createdAt: -1}
    }


    this.subDataOne = this.orderService.getAllOrders(filterData, null)
      .subscribe(res => {
        this.orders = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getAdminDashboard() {
    this.subDataOne = this.dashboardService.getAdminDashboard()
      .subscribe(res => {
        if (res.success) {
          this.adminDashboard = res.data;
          console.log('dash board', this.adminDashboard)
        }
      }, error => {
        console.log(error);
      });
  }
}
