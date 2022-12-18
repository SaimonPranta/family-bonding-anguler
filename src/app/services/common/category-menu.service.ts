import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryMenu} from '../../interfaces/common/category-menu';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';


const API_CATEGORY_MENU = environment.apiBaseLink + '/api/category-menu/';

@Injectable({
  providedIn: 'root'
})
export class CategoryMenuService {

  private categoryMenu: CategoryMenu[] = [];
  private categoryMenuReqCount = 0;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * CATEGORY MENU
   */
  addCategoryMenu(data: CategoryMenu) {
    return this.httpClient.post<ResponsePayload>
    (API_CATEGORY_MENU + 'add', data);
  }

  getAllCategoryMenus() {
    return this.httpClient.get<{ data: CategoryMenu[], count: number, success: boolean }>(API_CATEGORY_MENU + 'get-all');
  }

  getCategoryMenuById(id: string) {
    // let params = new HttpParams();
    // if (select) {
    //   params = params.append('select', select);
    // }
    return this.httpClient.get<{ data: CategoryMenu, message: string, success: boolean }>(API_CATEGORY_MENU + id);
  }

  updateCategoryMenuById(id: string, data: CategoryMenu) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY_MENU + 'update/' + id, data);
  }

  deleteCategoryMenuById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY_MENU + 'delete/' + id, {params});
  }


  /**
   * HTTP NO REPEAT
   */
  getAllCategoryMenuNoRepeat(): Observable<{ data: CategoryMenu[] }> {
    return new Observable((observer) => {
      if (this.categoryMenu && this.categoryMenu.length > 0) {
        observer.next({data: this.categoryMenu});
        observer.complete();
      } else {
        this.httpClient.get<{ data: CategoryMenu[], message: string }>(API_CATEGORY_MENU + 'get-all-category-menu')
          .subscribe((res) => {
            this.categoryMenu = res.data;
            observer.next({data: this.categoryMenu});
            observer.complete();
          }, error => {
            console.log(error);
          });
      }
    });
  }


}
