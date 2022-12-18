import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private refreshAdmin = new Subject<void>();
  private refreshData = new Subject<void>();

  /**
   * REFRESH GLOBAL DATA
   */
  get refreshData$() {
    return this.refreshData;
  }
  needRefreshData$() {
    this.refreshData.next();
  }

  /**
   * REFRESH ADMIN DATA
   */

  get refreshAdmin$() {
    return this.refreshAdmin;
  }
  needRefreshAdmin$() {
    this.refreshAdmin.next();
  }

}
