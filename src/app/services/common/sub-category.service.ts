import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {SubCategory} from '../../interfaces/common/sub-category.interface';
import {Category} from '../../interfaces/common/category.interface';

const API_SUB_CATEGORY = environment.apiBaseLink + '/api/sub-category/';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addSubCategory
   * insertManySubCategory
   * getAllCategories
   * getSubCategoryById
   * updateSubCategoryById
   * updateMultipleSubCategoryById
   * deleteSubCategoryById
   * deleteMultipleSubCategoryById
   */

  addSubCategory(data: SubCategory) {
    return this.httpClient.post<ResponsePayload>
    (API_SUB_CATEGORY + 'add', data);
  }

  insertManySubCategory(data: SubCategory, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_SUB_CATEGORY + 'insert-many', mData);
  }

  getAllSubCategories(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SubCategory[], count: number, success: boolean }>(API_SUB_CATEGORY + 'get-all', filterData, {params});
  }

  getSubCategoryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory, message: string, success: boolean }>(API_SUB_CATEGORY + id, {params});
  }

  getSubCategoriesByCategoryId(categoryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_SUB_CATEGORY + 'get-all-by-parent/' + categoryId, {params});
  }

  updateSubCategoryById(id: string, data: SubCategory) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_SUB_CATEGORY + 'update/' + id, data);
  }

  updateMultipleSubCategoryById(ids: string[], data: SubCategory) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_SUB_CATEGORY + 'update-multiple', mData);
  }

  changeMultipleSubCategoryStatus(ids: string[], data: Category) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_SUB_CATEGORY + 'change-multiple-sub-category-status', mData);
  }

  deleteSubCategoryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_SUB_CATEGORY + 'delete/' + id, {params});
  }

  deleteMultipleSubCategoryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_SUB_CATEGORY + 'delete-multiple', {ids: ids}, {params});
  }


}
