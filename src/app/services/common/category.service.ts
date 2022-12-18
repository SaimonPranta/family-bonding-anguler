import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Category} from '../../interfaces/common/category.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_CATEGORY = environment.apiBaseLink + '/api/category/';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCategory
   * insertManyCategory
   * getAllCategories
   * getCategoryById
   * updateCategoryById
   * updateMultipleCategoryById
   * deleteCategoryById
   * deleteMultipleCategoryById
   */

  addCategory(data: Category) {
    return this.httpClient.post<ResponsePayload>
    (API_CATEGORY + 'add', data);
  }

  insertManyCategory(data: Category, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_CATEGORY + 'insert-many', mData);
  }

  getAllCategories(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Category[], count: number, success: boolean }>(API_CATEGORY + 'get-all', filterData, {params});
  }

  getCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Category, message: string, success: boolean }>(API_CATEGORY + id, {params});
  }

  updateCategoryById(id: string, data: Category) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CATEGORY + 'update/' + id, data);
  }

  changeMultipleCategoryStatus(ids: string[], data: Category) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CATEGORY + 'change-multiple-category-status', mData);
  }

  updateMultipleCategoryById(ids: string[], data: Category) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CATEGORY + 'update-multiple', mData);
  }

  deleteCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }


}
